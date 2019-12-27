const fs = require('fs');
const path = require('path');
const crypto = require('crypto-js');
const axios = require('axios').default;
const apikey = require('../../configs/apikey');
const { Version, BusStops, BusRoute, RouteStops } = require('../');

module.exports = class Bus {
  constructor() {
  }

  async Start() {
    await this._stopOfRoute();
  }

  static async getEstimatedTime(name) {
    let data = (await Bus._getPtx({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/${name}`,
        params: {
          $top: '1000',
          $format: 'JSON'
        }
      })).data, result = [];

    data.forEach(route => {
      result.push({
        direction: route.Direction,
        estimates: (route.Estimates ? route.Estimates : false),
        nextTime: route.NextBusTime,
        name: {
          zh_tw: route.StopName.Zh_tw,
          en: route.StopName.En
        },
        stopid: route.StopUID,
        sequence: route.StopSequence,
        status: route.StopStatus
      });
    });

    return result;
  }

  static async getRealTime(name) {
    let data = (await Bus._getPtx({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Taoyuan/${name}`,
        params: {
          $top: '1000',
          $format: 'JSON'
        }
      })).data, result;

    data.forEach(route => {
      let bus = {
        plateNumber: route.PlateNumb,
        name: {
          zh_tw: route.RouteName.Zh_tw,
          en: route.RouteName.En
        },
        position: {
          latitude: route.BusPosition.PositionLat,
          longitude: route.BusPosition.PositionLon,
        },
        status: {
          bus: route.BusStatus,
          duty: route.DutyStatus
        },
        direction: route.direction,
        speed: route.speed
      };

    });
  }

  static async getStopOfRoute() {
    let data = await BusRoute.findAll({
      include: [{
        model: BusStops,
        as: 'busstops',
        required: false,
        attributes: ['uid', 'zh_tw_name', 'en_name', 'latitude', 'longitude'],
        through: {
          model: RouteStops,
          as: 'routestops',
          attributes: ['sequence', 'boarding'],
        }
      }]
    });

    data = JSON.parse(JSON.stringify(data));
    data.forEach(route => {
      route.stops = route.busstops;
      route.name = {
        zh_tw: route.zh_tw_name,
        en: route.en_name
      };

      route.stops.forEach(stop => {
        stop.sequence = stop.routestops.sequence;
        stop.boarding = stop.routestops.boarding;
        stop.name = {
          zh_tw: stop.zh_tw_name,
          en: stop.en_name
        };
        delete stop.routestops;
        delete stop.zh_tw_name;
        delete stop.en_name;
      });

      delete route.zh_tw_name;
      delete route.en_name;
      delete route.updatedAt;
      delete route.createdAt;
      delete route.busstops;
      delete route.id;
    });

    return data;
  }

  async _stopOfRoute() {
    let latestVersion = (await Bus._getPtx({url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/DataVersion/City/Taoyuan', params: { $format: 'JSON' }})).data.VersionID;
    let [ dbVersion ] = await Version.findOrCreate({
      where: { name: 'BusRoute', version: latestVersion },
      defaults: {
        name: 'BusRoute',
        version: -1
      }
    });

    if(latestVersion > dbVersion.version) {
      let data = (await this._getStopOfRouteData()).map(obj => {
        let _data = {
          uid: obj.RouteUID,
          name: {
            zh_tw: obj.RouteName.Zh_tw,
            en: obj.RouteName.En
          },
          direction: obj.Direction,
          stops: obj.Stops.map(stop => ({
            uid: stop.StopUID,
            name: {
              zh_tw: stop.StopName.Zh_tw,
              en: stop.StopName.En
            },
            boarding: stop.StopBoarding,
            sequence: stop.StopSequence,
            position: [ stop.StopPosition.PositionLat, stop.StopPosition.PositionLon ]
          })),
          update: obj.UpdateTime,
          version: obj.VersionID
        };

        return _data;
      });

      await BusRoute.destroy({ where: {}, truncate: true });
      await BusStops.destroy({ where: {}, truncate: true });
      await RouteStops.destroy({ where: {}, truncate: true });

      for(let bus of data) {

        let [ route ] = await BusRoute.findOrCreate({
          where: { uid: bus.uid, direction: bus.direction },
          defaults: {
            uid: bus.uid,
            direction: bus.direction,
            zh_tw_name: bus.name.zh_tw,
            en_name: bus.name.en
          }
        });

        for(let stop of bus.stops) {
          let [ stops ] = await BusStops.findOrCreate({
            where: { uid: stop.uid },
            defaults: {
              uid: stop.uid,
              boarding: stop.boarding,
              zh_tw_name: stop.name.zh_tw,
              en_name: stop.name.en,
              latitude: stop.position[0],
              longitude: stop.position[1]
            }
          });

          await RouteStops.create({
            routeid: route.id,
            stopid: stops.id,
            sequence: stop.sequence,
            boarding: stop.boarding
          });

        }

      }

      dbVersion.version = latestVersion;
      dbVersion.save();
    }

    return setTimeout(this._stopOfRoute, 24 * 60 * 60 * 1000);
  }

  async _getStopOfRouteData() {
    const _Bus = ['132', '133', '172', '9025'];

    let data = [...JSON.parse(await fs.readFileSync(path.resolve('./storage/bus/ust-bus-route.json')))];

    for(let name of _Bus) {
      data.push(...(await Bus._getPtx({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Taoyuan/${name}`,
        params: {
          $top: '1000',
          $format: 'JSON'
        }
      })).data);
    }

    return data;
  }

  static async _getPtx(_params) {
    const { url, params } = _params;
    const Now = (new Date()).toUTCString(), Signature = crypto.enc.Base64.stringify(crypto.HmacSHA1(`date: ${Now}`, apikey.ptx.key));

    return await axios.get(url, {
      params,
      headers: {
        Authorization: `hmac username="${ apikey.ptx.id }", algorithm="hmac-sha1", headers="date", signature="${ Signature }"`,
        date: Now
      }
    });
  }
};