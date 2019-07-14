"use strict";

const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { resultData } = require("../../common/utils");

router.post("/query", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};

  Object.assign(ret, resultData, {
    "data": {
        "page": {
            "pageNum": 1,
            "pageSize": 20,
            "total": 2
        },
        "standardLogisticsCosts": [
            {
                "id": 1,
                "dcType": "非FDC/城市仓/本地仓",
                "businessTypeID": 1,
                "businessType": "仓配一体-普通",
                "endCity": "天津市",
                "endProvince": "天津",
                "endProvinceID": "2",
                "endRegion": "华北",
                "endCityID": 3,
                "operater": "liuhua",
                "routeType": "一区（同省）",
                "startCity": "北京市",
                "startCityID": 72,
                "startProvince": "北京",
                "startProvinceID": "1",
                "startRegion": "华北",
                "firstWeight": "1.00",
                "firstPrice": "1.00",
                "additionalWeight": "1.00",
                "additionalPrice": "1.00",
                "createTime": "2018-10-10",
                "updateTime": "2018-10-10",
            },
            {
                "id": 2,
                "dcType": "非FDC/城市仓/本地仓",
                "businessTypeID": 2,
                "businessType": "仓配一体-普通",
                "endCity": "天津市",
                "endProvince": "天津",
                "endProvinceID": "2",
                "endRegion": "华北",
                "endCityID": 3,
                "operater": "liuhua",
                "routeType": "一区（同省）",
                "startCity": "北京市",
                "startCityID": 72,
                "startProvince": "北京",
                "startProvinceID": "1",
                "startRegion": "华北",
                "firstWeight": "1.00",
                "firstPrice": "1.00",
                "additionalWeight": "1.00",
                "additionalPrice": "1.00",
                "createTime": "2018-10-10",
                "updateTime": "2018-10-10",
            }
        ]
    }
  });

  res.send(ret);
});

router.post('/create', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: null
  });

  res.send(ret);
});

router.post('/update', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: null
  });

  res.send(ret);
});

router.post('/delete', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: null
  });

  res.send(ret);
});

module.exports = router;
