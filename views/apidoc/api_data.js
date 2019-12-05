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
  }
] });
