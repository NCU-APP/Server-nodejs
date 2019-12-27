define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./views/apidoc/main.js",
    "group": "D___Code_Server_nodejs_views_apidoc_main_js",
    "groupTitle": "D___Code_Server_nodejs_views_apidoc_main_js",
    "name": ""
  },
  {
    "type": "Estimate",
    "url": "Estimate",
    "title": "Estimate",
    "group": "Types",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "stopid",
            "description": "<p>站牌ID</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "direction",
            "description": "<p>去返程[0:'去程',1:'返程',2:'迴圈',255:'未知'].</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "estimates",
            "description": "<p>到站時間預估 (若無爲 false) [{PlateNumb: string, IsLastBus: boolean, EstimateTime: integer}]</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "name",
            "description": "<p>站牌名稱 {zh_tw: {string}, en: {string}}</p>"
          },
          {
            "group": "Parameter",
            "type": "time",
            "optional": false,
            "field": "nextTime",
            "description": "<p>下一班公車到達時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sequence",
            "description": "<p>路線經過站牌之順序</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運']</p>"
          }
        ]
      }
    },
    "filename": "./routes/api/v1/bus.js",
    "groupTitle": "Types",
    "name": "EstimateEstimate"
  },
  {
    "type": "Route",
    "url": "Route",
    "title": "Route",
    "group": "Types",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "uid",
            "description": "<p>UID.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "direction",
            "description": "<p>去返程[0:'去程',1:'返程',2:'迴圈',255:'未知'].</p>"
          },
          {
            "group": "Parameter",
            "type": "array[<a href=\"#api-Types-StopsStops\">Stops</a>]",
            "optional": false,
            "field": "stops",
            "description": "<p>所有經過站牌.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "name",
            "description": "<p>路線名稱 {zh_tw: {string}, en: {string}}</p>"
          }
        ]
      }
    },
    "filename": "./routes/api/v1/bus.js",
    "groupTitle": "Types",
    "name": "RouteRoute"
  },
  {
    "type": "Stops",
    "url": "Stops",
    "title": "Stops",
    "group": "Types",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "uid",
            "description": "<p>UID.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "latitude",
            "description": "<p>緯度</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "longitude",
            "description": "<p>經度</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sequence",
            "description": "<p>路線經過站牌之順序</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "boarding",
            "description": "<p>上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車']</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "name",
            "description": "<p>站牌名稱 {zh_tw: {string}, en: {string}}</p>"
          }
        ]
      }
    },
    "filename": "./routes/api/v1/bus.js",
    "groupTitle": "Types",
    "name": "StopsStops"
  },
  {
    "type": "GET",
    "url": "/api/v1/board/listings",
    "title": "Listings",
    "description": "<p>更新使用者prefer看板和取得所有看板</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "usr_id",
            "defaultValue": "780f05b8-1735-11ea-8d71-362b9e155667",
            "description": "<p>使用者id</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "udpatepref",
            "defaultValue": "true",
            "description": "<p>要不要更新使用者追蹤的看板</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "prefboard",
            "defaultValue": "1,3,4",
            "description": "<p>使用者看板的狀態，用“,”分隔</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "version",
            "defaultValue": "1",
            "description": "<p>使用者看板的版本</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example",
          "content": "{\n  \"usr_id\": \"780f05b8-1735-11ea-8d71-362b9e155667\",\n  \"udpatepref\": true,\n  \"prefboard\": \"1,3,4\",\n  \"version\": 1\n}",
          "type": "json"
        }
      ]
    },
    "name": "Listings",
    "group": "board",
    "version": "0.1.0",
    "sampleRequest": [
      {
        "url": "/api/v1/board/listings"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "version",
            "description": "<p>看板的版本</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "uptodate",
            "description": "<p>是否爲最新版本</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>用“,”分隔</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "name",
            "description": "<p>所有看板</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "udpatepref",
            "description": "<p>更新使用者追蹤的列表是否成功</p>"
          }
        ]
      }
    },
    "filename": "./routes/api/v1/board.js",
    "groupTitle": "board"
  },
  {
    "type": "GET",
    "url": "/docs",
    "title": "getDocs",
    "description": "<p>取得APIDoc生成的Documentation</p>",
    "name": "getDocs",
    "group": "docs",
    "version": "0.1.0",
    "sampleRequest": [
      {
        "url": "/docs"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "html",
            "optional": false,
            "field": "index",
            "description": "<p>index page</p>"
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "docs"
  },
  {
    "type": "GET",
    "url": "/api/v1/traffic/bus/estimate/:busid",
    "title": "EstimateTime",
    "description": "<p>市區公車之預估到站資料</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "busid",
            "defaultValue": "null",
            "description": "<p>繁體中文路線名稱，如'132'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example",
          "content": "{\n  \"busid\": 132\n}",
          "type": "json"
        }
      ]
    },
    "name": "EstimateTime",
    "group": "traffic",
    "version": "0.1.0",
    "sampleRequest": [
      {
        "url": "/api/v1/traffic/estimate/0"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "array[<a href=\"#api-Types-EstimateEstimate\">Estimate</a>]",
            "optional": false,
            "field": "data",
            "description": "<p>市區公車之預估到站資料</p>"
          }
        ]
      }
    },
    "filename": "./routes/api/v1/bus.js",
    "groupTitle": "traffic"
  },
  {
    "type": "GET",
    "url": "/api/v1/traffic/bus/route/:version",
    "title": "RouteList",
    "description": "<p>市區公車之路線站序資料</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "version",
            "defaultValue": "null",
            "description": "<p>使用者的版本</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example",
          "content": "{\n  \"version\": 361\n}",
          "type": "json"
        }
      ]
    },
    "name": "RouteList",
    "group": "traffic",
    "version": "0.1.0",
    "sampleRequest": [
      {
        "url": "/api/v1/traffic/bus/route/0"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "version",
            "description": "<p>路線站序的版本</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "uptodate",
            "description": "<p>是否爲最新版本</p>"
          },
          {
            "group": "Success 200",
            "type": "array[<a href=\"#api-Types-RouteRoute\">Route</a>]",
            "optional": false,
            "field": "routes",
            "description": "<p>各個公車的路線資料</p>"
          }
        ]
      }
    },
    "filename": "./routes/api/v1/bus.js",
    "groupTitle": "traffic"
  }
] });
