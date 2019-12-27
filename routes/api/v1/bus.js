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
 * @api {Estimate} Estimate Estimate
 * @apiGroup Types
 * @apiVersion 0.1.0
 * @apiParam {string} stopid 站牌ID
 * @apiParam {number} direction 去返程[0:'去程',1:'返程',2:'迴圈',255:'未知'].
 * @apiParam {array} estimates 到站時間預估 (若無爲 false) [{PlateNumb: string, IsLastBus: boolean, EstimateTime: integer}]
 * @apiParam {object} name 站牌名稱 {zh_tw: {string}, en: {string}}
 * @apiParam {time} nextTime 下一班公車到達時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
 * @apiParam {number} sequence 路線經過站牌之順序
 * @apiParam {number} status 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運']
 */

/**
 * 市區公車之路線站序資料
 * @api {GET} /api/v1/traffic/bus/route/:version RouteList
 * @apiDescription 市區公車之路線站序資料
 * @apiParam {int} version=null 使用者的版本
 * @apiParamExample {json} Example
 * {
 *   "version": 361
 * }
 * @apiName RouteList
 * @apiGroup traffic
 * @apiVersion  0.1.0
 * @apiSampleRequest /api/v1/traffic/bus/route/0
 * @apiSuccess {boolean} result
 * @apiSuccess {int} version 路線站序的版本
 * @apiSuccess {boolean} uptodate 是否爲最新版本
 * @apiSuccess {array[[Route](#api-Types-RouteRoute)]} routes 各個公車的路線資料
 */
router.get('/route/:version', async (res, req) => {
  if(!res.params.version) {
    return req.status(401).send({ result: false }).end();
  }

  const version = Number.parseInt(res.params.version);
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

router.get('/time/:busid', async (res, req) => {

});

/**
 * 市區公車之預估到站資料
 * @api {GET} /api/v1/traffic/bus/estimate/:busid EstimateTime
 * @apiDescription 市區公車之預估到站資料
 * @apiParam {int} busid=null 繁體中文路線名稱，如'132'
 * @apiParamExample {json} Example
 * {
 *   "busid": 132
 * }
 * @apiName EstimateTime
 * @apiGroup traffic
 * @apiVersion  0.1.0
 * @apiSampleRequest /api/v1/traffic/estimate/0
 * @apiSuccess {boolean} result
 * @apiSuccess {array[[Estimate](#api-Types-EstimateEstimate)]} data 市區公車之預估到站資料
 */
router.get('/estimate/:busid', async (res, req) => {
  const name = res.params.busid;
  let result = {result: true};

  try {
    result.data = await Bus.getEstimatedTime(name);
  } catch(e) {
    result.result = false;
  }

  req.send(result).end();
});

module.exports = router;