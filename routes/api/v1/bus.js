const express = require('express');
const { Version, sequelize } = require('./../../../models');
const Bus = require('../../../models/bus');

let router = express.Router();

/**
 * @api {Route} Route Route
 * @apiGroup Types
 * @apiVersion 0.1.0
 * @apiParam {string} uid UID.
 * @apiParam {number} direction 去返程[0:'去程',1:'返程',2:'迴圈',255:'未知'].
 * @apiParam {array[[Stops](#api-Types-StopsStops)]} stops 所有經過站牌.
 * @apiParam {object} name 路線名稱 {zh_tw: {string}, en: {string}}
 */

/**
 * @api {Stops} Stops Stops
 * @apiGroup Types
 * @apiVersion 0.1.0
 * @apiParam {string} uid UID.
 * @apiParam {number} latitude 緯度
 * @apiParam {number} longitude 經度
 * @apiParam {number} sequence 路線經過站牌之順序
 * @apiParam {number} boarding 上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車']
 * @apiParam {object} name 站牌名稱 {zh_tw: {string}, en: {string}}
 */

/**
 * 市區公車之路線站序資料
 * @api {GET} /api/v1/traffic/bus/route RouteList
 * @apiDescription 市區公車之路線站序資料
 * @apiParam {int} version=361 使用者的版本
 * @apiParamExample {json} Example
 * {
 *   "version": 361
 * }
 * @apiName RouteList
 * @apiGroup traffic
 * @apiVersion  0.1.0
 * @apiSampleRequest /api/v1/traffic/bus/route
 * @apiSuccess {boolean} result
 * @apiSuccess {int} version 路線站序的版本
 * @apiSuccess {boolean} uptodate 是否爲最新版本
 * @apiSuccess {array[[Route](#api-Types-RouteRoute)]} routes 各個公車的路線資料
 */
router.get('/route', async (res, req) => {
  const { version } = res.body;
  let result = {};

  let latestVersion = await Version.max('version', { where: { name: 'BusRoute' } });

  if(latestVersion > Number.parseInt(version)) {
    result.routes = await Bus.getStopOfRoute();
    result.uptodate = false;
  } else {
    result.uptodate = true;
  }

  result.result = true;
  result.version = latestVersion;

  req.send(result).end();
});

router.get('/time', async (res, req) => {
  const { name } = res.body;

  let t = (await Bus._getPtx({
    url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Taoyuan/${name}`,
    params: {
      $top: '1000',
      $format: 'JSON'
    }
  })).data;

  req.send((await Bus._getPtx({
    url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Taoyuan/${name}`,
    params: {
      $top: '1000',
      $format: 'JSON'
    }
  })).data).end();
});

module.exports = router;