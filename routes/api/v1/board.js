const express = require('express');
const { User, Version, Board, PreferBoard, sequelize } = require('./../../../models');

let router = express.Router();


/**
 * 更新使用者prefer看板和取得所有看板
 * @api {GET} /api/v1/board/listings Listings
 * @apiDescription 更新使用者prefer看板和取得所有看板
 * @apiParam {string} usr_id="780f05b8-1735-11ea-8d71-362b9e155667" 使用者id
 * @apiParam {boolean} udpatepref=true 要不要更新使用者追蹤的看板
 * @apiParam {string} prefboard="1,3,4" 使用者看板的狀態，用“,”分隔
 * @apiParam {int} version=1 使用者看板的版本
 * @apiParamExample {json} Example
 * {
 *   "usr_id": "780f05b8-1735-11ea-8d71-362b9e155667",
 *   "udpatepref": true,
 *   "prefboard": "1,3,4",
 *   "version": 1
 * }
 * @apiName Listings
 * @apiGroup board
 * @apiVersion  0.1.0
 * @apiSampleRequest /api/v1/board/listings
 * @apiSuccess {boolean} result
 * @apiSuccess {int} version 看板的版本
 * @apiSuccess {boolean} uptodate 是否爲最新版本
 * @apiSuccess {string} id 用“,”分隔
 * @apiSuccess {array} name 所有看板
 * @apiSuccess {boolean} udpatepref 更新使用者追蹤的列表是否成功
 */
router.get('/listings', async (res, req) => {
  const { usr_id, updatepref, prefboard, version } = res.body;
  let result = {};

  if(updatepref === 'true') {
    const prefids = prefboard.split(','), user_id = await User.findOne({ where: { uid: usr_id } });

    try {
      await PreferBoard.bulkCreate(prefids.map(el => ({ user_id: user_id.id, board_id: el }) ));
      result.udpatepref = true;
    } catch(e) {
      result.udpatepref = false;
    }
  }

  let latestVersion = await Version.max('version', { where: { table_name: 'Boards' } });

  if(latestVersion > Number.parseInt(version)) {
    let allBoard = await Board.findAll();

    result.id = allBoard.map(el => el.id).join(',');
    result.name = allBoard.map(el => el.name);
    result.uptodate = false;
  } else {
    result.uptodate = true;
  }

  result.result = true;
  result.version = latestVersion;

  req.send(result).end();
});

router.get('/', (req, res) => {
  res.send(['八卦', '資工']);
  res.end();
});

router.post('/', (req, res) => {
  res.send(req.body);
  res.end();
});

module.exports = router;