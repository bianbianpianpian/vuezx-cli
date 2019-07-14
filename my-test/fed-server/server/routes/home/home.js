"use strict";

const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { resultData } = require("../../common/utils");

// 所有角色
router.get("/getRoleInfo", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};

  Object.assign(ret, resultData, {
    data: [
      {
        "label": "角色1",
        "des": '角色描述1',
        "value": '1',
      },
      {
        "label": "角色2",
        "des": '角色描述2',
        "value": '2',
      },
      {
        "label": "角色3",
        "des": '角色描述3',
        "value": '3',
      }
    ]
  });

  res.send(ret);
});

// 所有系统
router.get("/getSystemInfo", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};

  Object.assign(ret, resultData, {
    data: [
      {
        "label": "系统1",
        "des": '系统描述1',
        "value": '1',
      },
      {
        "label": "系统2",
        "des": '系统描述2',
        "value": '2',
      },
      {
        "label": "系统3",
        "des": '系统描述3',
        "value": '3',
      }
    ]
  });

  res.send(ret);
});

// 权限
router.post("/getPrmInfo", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};
  let data;

  if (params.subsystemID == 1) {
    data = {
      data: [
        {
          "label": "权限1",
          "des": "权限描述1",
          "value": '1',
        },
        {
          "label": "权限2",
          "des": "权限描述2",
          "value": '2',
        },
        {
          "label": "权限3",
          "des": "权限描述3",
          "value": '3',
        }
      ]
    }
  }
  if (params.subsystemID == 2) {
    data = {
      data: [
        {
          "label": "权限4",
          "des": "权限描述4",
          "value": '4',
        },
        {
          "label": "权限5",
          "des": "权限描述5",
          "value": '5',
        },
        {
          "label": "权限6",
          "des": "权限描述6",
          "value": '6',
        }
      ]
    }
  }
  if (params.subsystemID == 3) {
    data = {
      data: [
        {
          "label": "权限7",
          "des": "权限描述7",
          "value": '7',
        },
        {
          "label": "权限8",
          "des": "权限描述8",
          "value": '8',
        },
        {
          "label": "权限9",
          "des": "权限描述9",
          "value": '9',
        }
      ]
    }
  }

  Object.assign(ret, resultData, data);

  res.send(ret);
});

// 所有模块
router.get("/getModelInfo", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};

  Object.assign(ret, resultData, {
    data: [
      {
        "label": "模块1",
        "des": '模块描述1',
        "value": '1',
      },
      {
        "label": "模块2",
        "des": '模块描述2',
        "value": '2',
      },
      {
        "label": "模块3",
        "des": '模块描述3',
        "value": '3',
      }
    ]
  });

  res.send(ret);
});

// 注销
router.get("/usp/logout", function(req, res) {
  res.type("json");
  let params = req.body, ret = {};

  Object.assign(ret, resultData, {
    data: 'http://www.baidu.com'
  });

  res.send(ret);
});


module.exports = router;
