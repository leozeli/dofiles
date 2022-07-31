/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** multi chrome_background ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/background.ts */58);


/***/ }),
/* 1 */
/*!***************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/ApiClient.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _superagent = _interopRequireDefault(__webpack_require__(/*! superagent */ 35));

	var _querystring = _interopRequireDefault(__webpack_require__(/*! querystring */ 33));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	* @module ApiClient
	* @version 0.0.7
	*/

	/**
	* Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
	* application to use this class directly - the *Api and model classes provide the public API for the service. The
	* contents of this file should be regarded as internal but are documented for completeness.
	* @alias module:ApiClient
	* @class
	*/
	var ApiClient = /*#__PURE__*/function () {
	  function ApiClient() {
	    _classCallCheck(this, ApiClient);

	    /**
	     * The base URL against which to resolve every API call's (relative) path.
	     * @type {String}
	     * @default https://web2.temp-mail.org/api/v1
	     */
	    this.basePath = 'https://web2.temp-mail.org/api/v1'.replace(/\/+$/, '');
	    /**
	     * The authentication methods to be included for all API calls.
	     * @type {Array.<String>}
	     */

	    this.authentications = {
	      'jwtAuth': {
	        type: 'bearer'
	      } // JWT

	    };
	    /**
	     * The default HTTP headers to be included for all API calls.
	     * @type {Array.<String>}
	     * @default {}
	     */

	    this.defaultHeaders = {};
	    /**
	     * The default HTTP timeout for all API calls.
	     * @type {Number}
	     * @default 60000
	     */

	    this.timeout = 60000;
	    /**
	     * If set to false an additional timestamp parameter is added to all API GET calls to
	     * prevent browser caching
	     * @type {Boolean}
	     * @default true
	     */

	    this.cache = true;
	    /**
	     * If set to true, the client will save the cookies from each server
	     * response, and return them in the next request.
	     * @default false
	     */

	    this.enableCookies = false;
	    /*
	     * Used to save and return cookies in a node.js (non-browser) setting,
	     * if this.enableCookies is set to true.
	     */

	    if (typeof window === 'undefined') {
	      this.agent = new _superagent["default"].agent();
	    }
	    /*
	     * Allow user to override superagent agent
	     */


	    this.requestAgent = null;
	    /*
	     * Allow user to add superagent plugins
	     */

	    this.plugins = null;
	  }
	  /**
	  * Returns a string representation for an actual parameter.
	  * @param param The actual parameter.
	  * @returns {String} The string representation of <code>param</code>.
	  */


	  _createClass(ApiClient, [{
	    key: "paramToString",
	    value: function paramToString(param) {
	      if (param == undefined || param == null) {
	        return '';
	      }

	      if (param instanceof Date) {
	        return param.toJSON();
	      }

	      if (ApiClient.canBeJsonified(param)) {
	        return JSON.stringify(param);
	      }

	      return param.toString();
	    }
	    /**
	    * Returns a boolean indicating if the parameter could be JSON.stringified
	    * @param param The actual parameter
	    * @returns {Boolean} Flag indicating if <code>param</code> can be JSON.stringified
	    */

	  }, {
	    key: "buildUrl",
	    value:
	    /**
	     * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
	     * NOTE: query parameters are not handled here.
	     * @param {String} path The path to append to the base URL.
	     * @param {Object} pathParams The parameter values to append.
	     * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
	     * @returns {String} The encoded path with parameter values substituted.
	     */
	    function buildUrl(path, pathParams, apiBasePath) {
	      var _this = this;

	      if (!path.match(/^\//)) {
	        path = '/' + path;
	      }

	      var url = this.basePath + path; // use API (operation, path) base path if defined

	      if (apiBasePath !== null && apiBasePath !== undefined) {
	        url = apiBasePath + path;
	      }

	      url = url.replace(/\{([\w-\.]+)\}/g, function (fullMatch, key) {
	        var value;

	        if (pathParams.hasOwnProperty(key)) {
	          value = _this.paramToString(pathParams[key]);
	        } else {
	          value = fullMatch;
	        }

	        return encodeURIComponent(value);
	      });
	      return url;
	    }
	    /**
	    * Checks whether the given content type represents JSON.<br>
	    * JSON content type examples:<br>
	    * <ul>
	    * <li>application/json</li>
	    * <li>application/json; charset=UTF8</li>
	    * <li>APPLICATION/JSON</li>
	    * </ul>
	    * @param {String} contentType The MIME content type to check.
	    * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
	    */

	  }, {
	    key: "isJsonMime",
	    value: function isJsonMime(contentType) {
	      return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
	    }
	    /**
	    * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
	    * @param {Array.<String>} contentTypes
	    * @returns {String} The chosen content type, preferring JSON.
	    */

	  }, {
	    key: "jsonPreferredMime",
	    value: function jsonPreferredMime(contentTypes) {
	      for (var i = 0; i < contentTypes.length; i++) {
	        if (this.isJsonMime(contentTypes[i])) {
	          return contentTypes[i];
	        }
	      }

	      return contentTypes[0];
	    }
	    /**
	    * Checks whether the given parameter value represents file-like content.
	    * @param param The parameter to check.
	    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
	    */

	  }, {
	    key: "isFileParam",
	    value: function isFileParam(param) {
	      // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
	      if (true) {
	        var fs;

	        try {
	          fs = __webpack_require__(/*! fs */ 39);
	        } catch (err) {}

	        if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
	          return true;
	        }
	      } // Buffer in Node.js


	      if (typeof Buffer === 'function' && param instanceof Buffer) {
	        return true;
	      } // Blob in browser


	      if (typeof Blob === 'function' && param instanceof Blob) {
	        return true;
	      } // File in browser (it seems File object is also instance of Blob, but keep this for safe)


	      if (typeof File === 'function' && param instanceof File) {
	        return true;
	      }

	      return false;
	    }
	    /**
	    * Normalizes parameter values:
	    * <ul>
	    * <li>remove nils</li>
	    * <li>keep files and arrays</li>
	    * <li>format to string with `paramToString` for other cases</li>
	    * </ul>
	    * @param {Object.<String, Object>} params The parameters as object properties.
	    * @returns {Object.<String, Object>} normalized parameters.
	    */

	  }, {
	    key: "normalizeParams",
	    value: function normalizeParams(params) {
	      var newParams = {};

	      for (var key in params) {
	        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
	          var value = params[key];

	          if (this.isFileParam(value) || Array.isArray(value)) {
	            newParams[key] = value;
	          } else {
	            newParams[key] = this.paramToString(value);
	          }
	        }
	      }

	      return newParams;
	    }
	    /**
	    * Builds a string representation of an array-type actual parameter, according to the given collection format.
	    * @param {Array} param An array parameter.
	    * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
	    * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
	    * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
	    */

	  }, {
	    key: "buildCollectionParam",
	    value: function buildCollectionParam(param, collectionFormat) {
	      if (param == null) {
	        return null;
	      }

	      switch (collectionFormat) {
	        case 'csv':
	          return param.map(this.paramToString, this).join(',');

	        case 'ssv':
	          return param.map(this.paramToString, this).join(' ');

	        case 'tsv':
	          return param.map(this.paramToString, this).join('\t');

	        case 'pipes':
	          return param.map(this.paramToString, this).join('|');

	        case 'multi':
	          //return the array directly as SuperAgent will handle it as expected
	          return param.map(this.paramToString, this);

	        case 'passthrough':
	          return param;

	        default:
	          throw new Error('Unknown collection format: ' + collectionFormat);
	      }
	    }
	    /**
	    * Applies authentication headers to the request.
	    * @param {Object} request The request object created by a <code>superagent()</code> call.
	    * @param {Array.<String>} authNames An array of authentication method names.
	    */

	  }, {
	    key: "applyAuthToRequest",
	    value: function applyAuthToRequest(request, authNames) {
	      var _this2 = this;

	      authNames.forEach(function (authName) {
	        var auth = _this2.authentications[authName];

	        switch (auth.type) {
	          case 'basic':
	            if (auth.username || auth.password) {
	              request.auth(auth.username || '', auth.password || '');
	            }

	            break;

	          case 'bearer':
	            if (auth.accessToken) {
	              var localVarBearerToken = typeof auth.accessToken === 'function' ? auth.accessToken() : auth.accessToken;
	              request.set({
	                'Authorization': 'Bearer ' + localVarBearerToken
	              });
	            }

	            break;

	          case 'apiKey':
	            if (auth.apiKey) {
	              var data = {};

	              if (auth.apiKeyPrefix) {
	                data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
	              } else {
	                data[auth.name] = auth.apiKey;
	              }

	              if (auth['in'] === 'header') {
	                request.set(data);
	              } else {
	                request.query(data);
	              }
	            }

	            break;

	          case 'oauth2':
	            if (auth.accessToken) {
	              request.set({
	                'Authorization': 'Bearer ' + auth.accessToken
	              });
	            }

	            break;

	          default:
	            throw new Error('Unknown authentication type: ' + auth.type);
	        }
	      });
	    }
	    /**
	     * Deserializes an HTTP response body into a value of the specified type.
	     * @param {Object} response A SuperAgent response object.
	     * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
	     * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
	     * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
	     * all properties on <code>data<code> will be converted to this type.
	     * @returns A value of the specified type.
	     */

	  }, {
	    key: "deserialize",
	    value: function deserialize(response, returnType) {
	      if (response == null || returnType == null || response.status == 204) {
	        return null;
	      } // Rely on SuperAgent for parsing response body.
	      // See http://visionmedia.github.io/superagent/#parsing-response-bodies


	      var data = response.body;

	      if (data == null || _typeof(data) === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
	        // SuperAgent does not always produce a body; use the unparsed response as a fallback
	        data = response.text;
	      }

	      return ApiClient.convertToType(data, returnType);
	    }
	    /**
	     * Invokes the REST service using the supplied settings and parameters.
	     * @param {String} path The base URL to invoke.
	     * @param {String} httpMethod The HTTP method to use.
	     * @param {Object.<String, String>} pathParams A map of path parameters and their values.
	     * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
	     * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
	     * @param {Object.<String, Object>} formParams A map of form parameters and their values.
	     * @param {Object} bodyParam The value to pass as the request body.
	     * @param {Array.<String>} authNames An array of authentication type names.
	     * @param {Array.<String>} contentTypes An array of request MIME types.
	     * @param {Array.<String>} accepts An array of acceptable response MIME types.
	     * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
	     * constructor for a complex type.
	     * @param {String} apiBasePath base path defined in the operation/path level to override the default one
	     * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
	     */

	  }, {
	    key: "callApi",
	    value: function callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType, apiBasePath) {
	      var _this3 = this;

	      var url = this.buildUrl(path, pathParams, apiBasePath);
	      var request = (0, _superagent["default"])(httpMethod, url);

	      if (this.plugins !== null) {
	        for (var index in this.plugins) {
	          if (this.plugins.hasOwnProperty(index)) {
	            request.use(this.plugins[index]);
	          }
	        }
	      } // apply authentications


	      this.applyAuthToRequest(request, authNames); // set query parameters

	      if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
	        queryParams['_'] = new Date().getTime();
	      }

	      request.query(this.normalizeParams(queryParams)); // set header parameters

	      request.set(this.defaultHeaders).set(this.normalizeParams(headerParams)); // set requestAgent if it is set by user

	      if (this.requestAgent) {
	        request.agent(this.requestAgent);
	      } // set request timeout


	      request.timeout(this.timeout);
	      var contentType = this.jsonPreferredMime(contentTypes);

	      if (contentType) {
	        // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
	        if (contentType != 'multipart/form-data') {
	          request.type(contentType);
	        }
	      }

	      if (contentType === 'application/x-www-form-urlencoded') {
	        request.send(_querystring["default"].stringify(this.normalizeParams(formParams)));
	      } else if (contentType == 'multipart/form-data') {
	        var _formParams = this.normalizeParams(formParams);

	        for (var key in _formParams) {
	          if (_formParams.hasOwnProperty(key)) {
	            var _formParamsValue = _formParams[key];

	            if (this.isFileParam(_formParamsValue)) {
	              // file field
	              request.attach(key, _formParamsValue);
	            } else if (Array.isArray(_formParamsValue) && _formParamsValue.length && this.isFileParam(_formParamsValue[0])) {
	              // multiple files
	              _formParamsValue.forEach(function (file) {
	                return request.attach(key, file);
	              });
	            } else {
	              request.field(key, _formParamsValue);
	            }
	          }
	        }
	      } else if (bodyParam !== null && bodyParam !== undefined) {
	        if (!request.header['Content-Type']) {
	          request.type('application/json');
	        }

	        request.send(bodyParam);
	      }

	      var accept = this.jsonPreferredMime(accepts);

	      if (accept) {
	        request.accept(accept);
	      }

	      if (returnType === 'Blob') {
	        request.responseType('blob');
	      } else if (returnType === 'String') {
	        request.responseType('string');
	      } // Attach previously saved cookies, if enabled


	      if (this.enableCookies) {
	        if (typeof window === 'undefined') {
	          this.agent._attachCookies(request);
	        } else {
	          request.withCredentials();
	        }
	      }

	      return new Promise(function (resolve, reject) {
	        request.end(function (error, response) {
	          if (error) {
	            var err = {};

	            if (response) {
	              err.status = response.status;
	              err.statusText = response.statusText;
	              err.body = response.body;
	              err.response = response;
	            }

	            err.error = error;
	            reject(err);
	          } else {
	            try {
	              var data = _this3.deserialize(response, returnType);

	              if (_this3.enableCookies && typeof window === 'undefined') {
	                _this3.agent._saveCookies(response);
	              }

	              resolve({
	                data: data,
	                response: response
	              });
	            } catch (err) {
	              reject(err);
	            }
	          }
	        });
	      });
	    }
	    /**
	    * Parses an ISO-8601 string representation or epoch representation of a date value.
	    * @param {String} str The date value as a string.
	    * @returns {Date} The parsed date object.
	    */

	  }, {
	    key: "hostSettings",
	    value:
	    /**
	      * Gets an array of host settings
	      * @returns An array of host settings
	      */
	    function hostSettings() {
	      return [{
	        'url': "https://web2.temp-mail.org/{basePath}",
	        'description': "Temp-Mail free API",
	        'variables': {
	          basePath: {
	            'description': "No description provided",
	            'default_value': "api/v1"
	          }
	        }
	      }];
	    }
	  }, {
	    key: "getBasePathFromSettings",
	    value: function getBasePathFromSettings(index) {
	      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var servers = this.hostSettings(); // check array index out of bound

	      if (index < 0 || index >= servers.length) {
	        throw new Error("Invalid index " + index + " when selecting the host settings. Must be less than " + servers.length);
	      }

	      var server = servers[index];
	      var url = server['url']; // go through variable and assign a value

	      for (var variable_name in server['variables']) {
	        if (variable_name in variables) {
	          var variable = server['variables'][variable_name];

	          if (!('enum_values' in variable) || variable['enum_values'].includes(variables[variable_name])) {
	            url = url.replace("{" + variable_name + "}", variables[variable_name]);
	          } else {
	            throw new Error("The variable `" + variable_name + "` in the host URL has invalid value " + variables[variable_name] + ". Must be " + server['variables'][variable_name]['enum_values'] + ".");
	          }
	        } else {
	          // use default value
	          url = url.replace("{" + variable_name + "}", server['variables'][variable_name]['default_value']);
	        }
	      }

	      return url;
	    }
	    /**
	    * Constructs a new map or array model from REST data.
	    * @param data {Object|Array} The REST data.
	    * @param obj {Object|Array} The target object or array.
	    */

	  }], [{
	    key: "canBeJsonified",
	    value: function canBeJsonified(str) {
	      if (typeof str !== 'string' && _typeof(str) !== 'object') return false;

	      try {
	        var type = str.toString();
	        return type === '[object Object]' || type === '[object Array]';
	      } catch (err) {
	        return false;
	      }
	    }
	  }, {
	    key: "parseDate",
	    value: function parseDate(str) {
	      if (isNaN(str)) {
	        return new Date(str);
	      }

	      return new Date(+str);
	    }
	    /**
	    * Converts a value to the specified type.
	    * @param {(String|Object)} data The data to convert, as a string or object.
	    * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
	    * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
	    * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
	    * all properties on <code>data<code> will be converted to this type.
	    * @returns An instance of the specified type or null or undefined if data is null or undefined.
	    */

	  }, {
	    key: "convertToType",
	    value: function convertToType(data, type) {
	      if (data === null || data === undefined) return data;

	      switch (type) {
	        case 'Boolean':
	          return Boolean(data);

	        case 'Integer':
	          return parseInt(data, 10);

	        case 'Number':
	          return parseFloat(data);

	        case 'String':
	          return String(data);

	        case 'Date':
	          return ApiClient.parseDate(String(data));

	        case 'Blob':
	          return data;

	        default:
	          if (type === Object) {
	            // generic object, return directly
	            return data;
	          } else if (typeof type.constructFromObject === 'function') {
	            // for model type like User and enum class
	            return type.constructFromObject(data);
	          } else if (Array.isArray(type)) {
	            // for array type like: ['String']
	            var itemType = type[0];
	            return data.map(function (item) {
	              return ApiClient.convertToType(item, itemType);
	            });
	          } else if (_typeof(type) === 'object') {
	            // for plain object type like: {'String': 'Integer'}
	            var keyType, valueType;

	            for (var k in type) {
	              if (type.hasOwnProperty(k)) {
	                keyType = k;
	                valueType = type[k];
	                break;
	              }
	            }

	            var result = {};

	            for (var k in data) {
	              if (data.hasOwnProperty(k)) {
	                var key = ApiClient.convertToType(k, keyType);
	                var value = ApiClient.convertToType(data[k], valueType);
	                result[key] = value;
	              }
	            }

	            return result;
	          } else {
	            // for unknown type, return the data directly
	            return data;
	          }

	      }
	    }
	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj, itemType) {
	      if (Array.isArray(data)) {
	        for (var i = 0; i < data.length; i++) {
	          if (data.hasOwnProperty(i)) obj[i] = ApiClient.convertToType(data[i], itemType);
	        }
	      } else {
	        for (var k in data) {
	          if (data.hasOwnProperty(k)) obj[k] = ApiClient.convertToType(data[k], itemType);
	        }
	      }
	    }
	  }]);

	  return ApiClient;
	}();
	/**
	 * Enumeration of collection format separator strategies.
	 * @enum {String}
	 * @readonly
	 */


	ApiClient.CollectionFormatEnum = {
	  /**
	   * Comma-separated values. Value: <code>csv</code>
	   * @const
	   */
	  CSV: ',',

	  /**
	   * Space-separated values. Value: <code>ssv</code>
	   * @const
	   */
	  SSV: ' ',

	  /**
	   * Tab-separated values. Value: <code>tsv</code>
	   * @const
	   */
	  TSV: '\t',

	  /**
	   * Pipe(|)-separated values. Value: <code>pipes</code>
	   * @const
	   */
	  PIPES: '|',

	  /**
	   * Native array. Value: <code>multi</code>
	   * @const
	   */
	  MULTI: 'multi'
	};
	/**
	* The default API client implementation.
	* @type {module:ApiClient}
	*/

	ApiClient.instance = new ApiClient();
	var _default = ApiClient;
	exports["default"] = _default;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../node-libs-browser/~/buffer/index.js */ 30).Buffer))

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    BROWSER: ("chrome"),
	    API_SYNC_INTERVAL: parseInt(("10000"), 10) || 10000,
	    API_SYNC_DELAY: parseInt(("600000"), 10) || 600000,
	    API_SYNC_SLOW_INTERVAL: parseInt(("600000"), 10) || 600000,
	    DEFAULT_HOME_PAGE: ("https://temp-mail.org/") || 'https://temp-mail.org/',
	    SITE: `${("https") || 'https'}://${("temp-mail.org") || 'temp-mail.org'}/`,
	    ENDPOINT: `${("https") || 'https'}://${("ext2.temp-mail.org")}`,
	    UTM_INBOX: 'utm_source=inboxbutton&utm_medium=extensions&utm_campaign=extensions',
	    UTM_QR: 'utm_source=qrcode&utm_medium=extensions&utm_campaign=extensions',
	    URL_INSTALL: 'https://apps.temp-mail.org?utm_campaign=tm2mobile&utm_source=chrome&utm_medium=extention_install',
	    URL_UNINSTALL: 'https://apps.temp-mail.org?utm_campaign=tm2mobile&utm_source=chrome&utm_medium=extention_uninstall',
	    STORE_HOMEPAGE_URL: {
	        'chrome': 'https://chrome.google.com/webstore/detail/inojafojbhdpnehkhhfjalgjjobnhomj',
	        'opera': 'https://addons.opera.com/extensions/details/temp-mail-disposable-temporary-email',
	        'firefox': 'https://addons.mozilla.org/firefox/addon/temp-mail'
	    },
	    locales: {
	        'en': 'en',
	        'en_GB': 'en',
	        'en-GB': 'en',
	        'en_US': 'en',
	        'en-US': 'en',
	        'es': 'es',
	        'es_419': 'es',
	        'nl': 'nl',
	        'de': 'de',
	        'fr': 'fr',
	        'it': 'it',
	        'pl': 'pl',
	        'pt_PT': 'pt',
	        'pt-PT': 'pt',
	        'pt_BR': 'pt',
	        'pt-BR': 'pt',
	        'ru': 'ru',
	        'sr': 'sr',
	        'tr': 'tr',
	        'uk': 'uk',
	        'ar': 'ar'
	    }
	};


/***/ }),
/* 5 */
/*!************************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Unauthorized.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Unauthorized model module.
	 * @module model/Unauthorized
	 * @version 0.0.7
	 */
	var Unauthorized = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Unauthorized</code>.
	   * @alias module:model/Unauthorized
	   * @param errorMessage {String} Unauthorized to access this resource
	   * @param errorName {module:model/Unauthorized.ErrorNameEnum} 
	   */
	  function Unauthorized(errorMessage, errorName) {
	    _classCallCheck(this, Unauthorized);

	    Unauthorized.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Unauthorized, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>Unauthorized</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Unauthorized} obj Optional instance to populate.
	     * @return {module:model/Unauthorized} The populated <code>Unauthorized</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Unauthorized();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Unauthorized;
	}();
	/**
	 * Unauthorized to access this resource
	 * @member {String} errorMessage
	 */


	Unauthorized.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/Unauthorized.ErrorNameEnum} errorName
	 */

	Unauthorized.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	Unauthorized['ErrorNameEnum'] = {
	  /**
	   * value: "UnauthorizedException"
	   * @const
	   */
	  "UnauthorizedException": "UnauthorizedException"
	};
	var _default = Unauthorized;
	exports["default"] = _default;

/***/ }),
/* 6 */
/*!**********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/BadRequest.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The BadRequest model module.
	 * @module model/BadRequest
	 * @version 0.0.7
	 */
	var BadRequest = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>BadRequest</code>.
	   * @alias module:model/BadRequest
	   * @param errorMessage {String} Invalid request params
	   * @param errorName {module:model/BadRequest.ErrorNameEnum} 
	   */
	  function BadRequest(errorMessage, errorName) {
	    _classCallCheck(this, BadRequest);

	    BadRequest.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(BadRequest, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>BadRequest</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/BadRequest} obj Optional instance to populate.
	     * @return {module:model/BadRequest} The populated <code>BadRequest</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new BadRequest();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return BadRequest;
	}();
	/**
	 * Invalid request params
	 * @member {String} errorMessage
	 */


	BadRequest.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/BadRequest.ErrorNameEnum} errorName
	 */

	BadRequest.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	BadRequest['ErrorNameEnum'] = {
	  /**
	   * value: "InvalidRequestParamsException"
	   * @const
	   */
	  "InvalidRequestParamsException": "InvalidRequestParamsException"
	};
	var _default = BadRequest;
	exports["default"] = _default;

/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Gone.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Gone model module.
	 * @module model/Gone
	 * @version 0.0.7
	 */
	var Gone = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Gone</code>.
	   * @alias module:model/Gone
	   * @param errorMessage {String} The target resource is no longer available
	   * @param errorName {module:model/Gone.ErrorNameEnum} 
	   */
	  function Gone(errorMessage, errorName) {
	    _classCallCheck(this, Gone);

	    Gone.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Gone, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>Gone</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Gone} obj Optional instance to populate.
	     * @return {module:model/Gone} The populated <code>Gone</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Gone();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Gone;
	}();
	/**
	 * The target resource is no longer available
	 * @member {String} errorMessage
	 */


	Gone.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/Gone.ErrorNameEnum} errorName
	 */

	Gone.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	Gone['ErrorNameEnum'] = {
	  /**
	   * value: "GoneException"
	   * @const
	   */
	  "GoneException": "GoneException"
	};
	var _default = Gone;
	exports["default"] = _default;

/***/ }),
/* 8 */
/*!*******************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Mailbox.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Mailbox model module.
	 * @module model/Mailbox
	 * @version 0.0.7
	 */
	var Mailbox = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Mailbox</code>.
	   * @alias module:model/Mailbox
	   */
	  function Mailbox() {
	    _classCallCheck(this, Mailbox);

	    Mailbox.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Mailbox, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>Mailbox</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Mailbox} obj Optional instance to populate.
	     * @return {module:model/Mailbox} The populated <code>Mailbox</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Mailbox();

	        if (data.hasOwnProperty('mailbox')) {
	          obj['mailbox'] = _ApiClient["default"].convertToType(data['mailbox'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Mailbox;
	}();
	/**
	 * mailbox address
	 * @member {String} mailbox
	 */


	Mailbox.prototype['mailbox'] = undefined;
	var _default = Mailbox;
	exports["default"] = _default;

/***/ }),
/* 9 */
/*!*******************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Message.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	var _MessageAttachments = _interopRequireDefault(__webpack_require__(/*! ./MessageAttachments */ 10));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Message model module.
	 * @module model/Message
	 * @version 0.0.7
	 */
	var Message = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Message</code>.
	   * @alias module:model/Message
	   */
	  function Message() {
	    _classCallCheck(this, Message);

	    Message.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Message, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>Message</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Message} obj Optional instance to populate.
	     * @return {module:model/Message} The populated <code>Message</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Message();

	        if (data.hasOwnProperty('_id')) {
	          obj['_id'] = _ApiClient["default"].convertToType(data['_id'], 'String');
	        }

	        if (data.hasOwnProperty('receivedAt')) {
	          obj['receivedAt'] = _ApiClient["default"].convertToType(data['receivedAt'], 'String');
	        }

	        if (data.hasOwnProperty('from')) {
	          obj['from'] = _ApiClient["default"].convertToType(data['from'], 'String');
	        }

	        if (data.hasOwnProperty('subject')) {
	          obj['subject'] = _ApiClient["default"].convertToType(data['subject'], 'String');
	        }

	        if (data.hasOwnProperty('bodyHtml')) {
	          obj['bodyHtml'] = _ApiClient["default"].convertToType(data['bodyHtml'], 'String');
	        }

	        if (data.hasOwnProperty('attachmentsCount')) {
	          obj['attachmentsCount'] = _ApiClient["default"].convertToType(data['attachmentsCount'], 'Number');
	        }

	        if (data.hasOwnProperty('attachments')) {
	          obj['attachments'] = _ApiClient["default"].convertToType(data['attachments'], [_MessageAttachments["default"]]);
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Message;
	}();
	/**
	 * message id
	 * @member {String} _id
	 */


	Message.prototype['_id'] = undefined;
	/**
	 * unix timestamp, when message was received
	 * @member {String} receivedAt
	 */

	Message.prototype['receivedAt'] = undefined;
	/**
	 * message sender
	 * @member {String} from
	 */

	Message.prototype['from'] = undefined;
	/**
	 * message subject
	 * @member {String} subject
	 */

	Message.prototype['subject'] = undefined;
	/**
	 * message body in HTML format
	 * @member {String} bodyHtml
	 */

	Message.prototype['bodyHtml'] = undefined;
	/**
	 * attachments count
	 * @member {Number} attachmentsCount
	 */

	Message.prototype['attachmentsCount'] = undefined;
	/**
	 * @member {Array.<module:model/MessageAttachments>} attachments
	 */

	Message.prototype['attachments'] = undefined;
	var _default = Message;
	exports["default"] = _default;

/***/ }),
/* 10 */
/*!******************************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/MessageAttachments.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The MessageAttachments model module.
	 * @module model/MessageAttachments
	 * @version 0.0.7
	 */
	var MessageAttachments = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>MessageAttachments</code>.
	   * @alias module:model/MessageAttachments
	   */
	  function MessageAttachments() {
	    _classCallCheck(this, MessageAttachments);

	    MessageAttachments.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(MessageAttachments, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>MessageAttachments</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/MessageAttachments} obj Optional instance to populate.
	     * @return {module:model/MessageAttachments} The populated <code>MessageAttachments</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new MessageAttachments();

	        if (data.hasOwnProperty('_id')) {
	          obj['_id'] = _ApiClient["default"].convertToType(data['_id'], 'Number');
	        }

	        if (data.hasOwnProperty('filename')) {
	          obj['filename'] = _ApiClient["default"].convertToType(data['filename'], 'String');
	        }

	        if (data.hasOwnProperty('size')) {
	          obj['size'] = _ApiClient["default"].convertToType(data['size'], 'Number');
	        }

	        if (data.hasOwnProperty('mimetype')) {
	          obj['mimetype'] = _ApiClient["default"].convertToType(data['mimetype'], 'String');
	        }

	        if (data.hasOwnProperty('cid')) {
	          obj['cid'] = _ApiClient["default"].convertToType(data['cid'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return MessageAttachments;
	}();
	/**
	 * attachment id
	 * @member {Number} _id
	 */


	MessageAttachments.prototype['_id'] = undefined;
	/**
	 * attachment filename
	 * @member {String} filename
	 */

	MessageAttachments.prototype['filename'] = undefined;
	/**
	 * attachment id
	 * @member {Number} size
	 */

	MessageAttachments.prototype['size'] = undefined;
	/**
	 * attachment MIME type
	 * @member {String} mimetype
	 */

	MessageAttachments.prototype['mimetype'] = undefined;
	/**
	 * CID of attachment
	 * @member {String} cid
	 */

	MessageAttachments.prototype['cid'] = undefined;
	var _default = MessageAttachments;
	exports["default"] = _default;

/***/ }),
/* 11 */
/*!********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Messages.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	var _MessagesMessages = _interopRequireDefault(__webpack_require__(/*! ./MessagesMessages */ 12));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Messages model module.
	 * @module model/Messages
	 * @version 0.0.7
	 */
	var Messages = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Messages</code>.
	   * @alias module:model/Messages
	   */
	  function Messages() {
	    _classCallCheck(this, Messages);

	    Messages.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Messages, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>Messages</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Messages} obj Optional instance to populate.
	     * @return {module:model/Messages} The populated <code>Messages</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Messages();

	        if (data.hasOwnProperty('mailbox')) {
	          obj['mailbox'] = _ApiClient["default"].convertToType(data['mailbox'], 'String');
	        }

	        if (data.hasOwnProperty('messageCount')) {
	          obj['messageCount'] = _ApiClient["default"].convertToType(data['messageCount'], 'Number');
	        }

	        if (data.hasOwnProperty('messages')) {
	          obj['messages'] = _ApiClient["default"].convertToType(data['messages'], [_MessagesMessages["default"]]);
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Messages;
	}();
	/**
	 * mailbox address
	 * @member {String} mailbox
	 */


	Messages.prototype['mailbox'] = undefined;
	/**
	 * total number of messages in mailbox
	 * @member {Number} messageCount
	 */

	Messages.prototype['messageCount'] = undefined;
	/**
	 * @member {Array.<module:model/MessagesMessages>} messages
	 */

	Messages.prototype['messages'] = undefined;
	var _default = Messages;
	exports["default"] = _default;

/***/ }),
/* 12 */
/*!****************************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/MessagesMessages.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The MessagesMessages model module.
	 * @module model/MessagesMessages
	 * @version 0.0.7
	 */
	var MessagesMessages = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>MessagesMessages</code>.
	   * @alias module:model/MessagesMessages
	   */
	  function MessagesMessages() {
	    _classCallCheck(this, MessagesMessages);

	    MessagesMessages.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(MessagesMessages, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>MessagesMessages</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/MessagesMessages} obj Optional instance to populate.
	     * @return {module:model/MessagesMessages} The populated <code>MessagesMessages</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new MessagesMessages();

	        if (data.hasOwnProperty('_id')) {
	          obj['_id'] = _ApiClient["default"].convertToType(data['_id'], 'String');
	        }

	        if (data.hasOwnProperty('receivedAt')) {
	          obj['receivedAt'] = _ApiClient["default"].convertToType(data['receivedAt'], 'String');
	        }

	        if (data.hasOwnProperty('from')) {
	          obj['from'] = _ApiClient["default"].convertToType(data['from'], 'String');
	        }

	        if (data.hasOwnProperty('subject')) {
	          obj['subject'] = _ApiClient["default"].convertToType(data['subject'], 'String');
	        }

	        if (data.hasOwnProperty('bodyPreview')) {
	          obj['bodyPreview'] = _ApiClient["default"].convertToType(data['bodyPreview'], 'String');
	        }

	        if (data.hasOwnProperty('attachmentsCount')) {
	          obj['attachmentsCount'] = _ApiClient["default"].convertToType(data['attachmentsCount'], 'Number');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return MessagesMessages;
	}();
	/**
	 * message id
	 * @member {String} _id
	 */


	MessagesMessages.prototype['_id'] = undefined;
	/**
	 * unix timestamp, when message was received
	 * @member {String} receivedAt
	 */

	MessagesMessages.prototype['receivedAt'] = undefined;
	/**
	 * message sender
	 * @member {String} from
	 */

	MessagesMessages.prototype['from'] = undefined;
	/**
	 * message subject
	 * @member {String} subject
	 */

	MessagesMessages.prototype['subject'] = undefined;
	/**
	 * message body preview in plain text
	 * @member {String} bodyPreview
	 */

	MessagesMessages.prototype['bodyPreview'] = undefined;
	/**
	 * attachments count
	 * @member {Number} attachmentsCount
	 */

	MessagesMessages.prototype['attachmentsCount'] = undefined;
	var _default = MessagesMessages;
	exports["default"] = _default;

/***/ }),
/* 13 */
/*!**********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/NewMailbox.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The NewMailbox model module.
	 * @module model/NewMailbox
	 * @version 0.0.7
	 */
	var NewMailbox = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>NewMailbox</code>.
	   * @alias module:model/NewMailbox
	   */
	  function NewMailbox() {
	    _classCallCheck(this, NewMailbox);

	    NewMailbox.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(NewMailbox, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>NewMailbox</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/NewMailbox} obj Optional instance to populate.
	     * @return {module:model/NewMailbox} The populated <code>NewMailbox</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new NewMailbox();

	        if (data.hasOwnProperty('token')) {
	          obj['token'] = _ApiClient["default"].convertToType(data['token'], 'String');
	        }

	        if (data.hasOwnProperty('mailbox')) {
	          obj['mailbox'] = _ApiClient["default"].convertToType(data['mailbox'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return NewMailbox;
	}();
	/**
	 * token
	 * @member {String} token
	 */


	NewMailbox.prototype['token'] = undefined;
	/**
	 * New mailbox
	 * @member {String} mailbox
	 */

	NewMailbox.prototype['mailbox'] = undefined;
	var _default = NewMailbox;
	exports["default"] = _default;

/***/ }),
/* 14 */
/*!******************************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/ServiceUnavailable.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The ServiceUnavailable model module.
	 * @module model/ServiceUnavailable
	 * @version 0.0.7
	 */
	var ServiceUnavailable = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>ServiceUnavailable</code>.
	   * @alias module:model/ServiceUnavailable
	   * @param errorMessage {String} Server is down for maintenance
	   * @param errorName {module:model/ServiceUnavailable.ErrorNameEnum} 
	   */
	  function ServiceUnavailable(errorMessage, errorName) {
	    _classCallCheck(this, ServiceUnavailable);

	    ServiceUnavailable.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(ServiceUnavailable, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>ServiceUnavailable</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/ServiceUnavailable} obj Optional instance to populate.
	     * @return {module:model/ServiceUnavailable} The populated <code>ServiceUnavailable</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new ServiceUnavailable();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return ServiceUnavailable;
	}();
	/**
	 * Server is down for maintenance
	 * @member {String} errorMessage
	 */


	ServiceUnavailable.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/ServiceUnavailable.ErrorNameEnum} errorName
	 */

	ServiceUnavailable.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	ServiceUnavailable['ErrorNameEnum'] = {
	  /**
	   * value: "MaintenanceException"
	   * @const
	   */
	  "MaintenanceException": "MaintenanceException"
	};
	var _default = ServiceUnavailable;
	exports["default"] = _default;

/***/ }),
/* 15 */
/*!***************************************!*\
  !*** ./~/superagent/lib/is-object.js ***!
  \***************************************/
/***/ (function(module, exports) {

	"use strict";

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	function isObject(obj) {
	  return obj !== null && _typeof(obj) === 'object';
	}

	module.exports = isObject;
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcy1vYmplY3QuanMiXSwibmFtZXMiOlsiaXNPYmplY3QiLCJvYmoiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7QUFRQSxTQUFTQSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUNyQixTQUFPQSxHQUFHLEtBQUssSUFBUixJQUFnQixRQUFPQSxHQUFQLE1BQWUsUUFBdEM7QUFDRDs7QUFFREMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSCxRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiJdfQ==

/***/ }),
/* 16 */
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const config_1 = __webpack_require__(/*! ../config */ 4);
	const _ = chrome.i18n.getMessage;
	const PrivatixTmFreeSdk = __webpack_require__(/*! @privatix/tm-free-sdk */ 20);
	class Api {
	    constructor(endpoint) {
	        this.setEndpoint(endpoint);
	        this.defaultClient = PrivatixTmFreeSdk.ApiClient.instance;
	        this.defaultClient.basePath = endpoint;
	        this.jwtAuth = this.defaultClient.authentications.jwtAuth;
	        this.mailboxApi = new PrivatixTmFreeSdk.MailboxApi();
	        this.messagesApi = new PrivatixTmFreeSdk.MessagesApi();
	    }
	    setEndpoint(url) {
	        this.endpoint = url;
	    }
	    getCurrentMailbox() {
	        return new Promise((resolve, reject) => {
	            chrome.storage.local.get('token', (storage) => {
	                if (storage.token) {
	                    this.jwtAuth.accessToken = storage.token;
	                    this.mailboxApi.getMailbox().then((res) => {
	                        resolve(res.mailbox);
	                    }).catch(() => {
	                        this.generateMailbox().then((mailbox) => {
	                            resolve(mailbox);
	                        });
	                    });
	                }
	                else {
	                    this.generateMailbox().then((mailbox) => {
	                        resolve(mailbox);
	                    });
	                }
	            });
	        });
	    }
	    generateMailbox() {
	        return new Promise((resolve, reject) => {
	            chrome.storage.local.get('token', (storage) => {
	                this.jwtAuth.accessToken = storage.token ? storage.token : '';
	                this.mailboxApi.newMailbox().then((res) => {
	                    chrome.storage.local.set({ token: res.token });
	                    resolve(res.mailbox);
	                }).catch(e => resolve(''));
	            });
	        });
	    }
	    getMailsList() {
	        return new Promise((resolve, reject) => {
	            chrome.storage.local.get('token', (storage) => {
	                if (storage.token) {
	                    this.jwtAuth.accessToken = storage.token;
	                    this.messagesApi.getMessages().then((res) => {
	                        resolve(res.messages);
	                    }).catch(() => resolve([]));
	                }
	                else {
	                    resolve([]);
	                    return;
	                }
	            });
	        });
	    }
	    openReadMailTab() {
	        chrome.storage.local.get('token', (storage) => {
	            const locale = _('@@ui_locale');
	            const token = storage.token ? storage.token : '';
	            if (locale in config_1.default.locales) {
	                chrome.tabs.create({ url: `${config_1.default.SITE}${config_1.default.locales[locale]}/?token=${token}&${config_1.default.UTM_INBOX}` });
	            }
	            else {
	                chrome.tabs.create({ url: `${config_1.default.SITE}?token=${token}&${config_1.default.UTM_INBOX}` });
	            }
	            if (config_1.default.BROWSER === 'firefox') {
	                window.close();
	            }
	        });
	    }
	}
	exports.Api = Api;
	;


/***/ }),
/* 17 */,
/* 18 */
/*!********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/api/MailboxApi.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	var _Mailbox = _interopRequireDefault(__webpack_require__(/*! ../model/Mailbox */ 8));

	var _NewMailbox = _interopRequireDefault(__webpack_require__(/*! ../model/NewMailbox */ 13));

	var _ServiceUnavailable = _interopRequireDefault(__webpack_require__(/*! ../model/ServiceUnavailable */ 14));

	var _Unauthorized = _interopRequireDefault(__webpack_require__(/*! ../model/Unauthorized */ 5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	* Mailbox service.
	* @module api/MailboxApi
	* @version 0.0.7
	*/
	var MailboxApi = /*#__PURE__*/function () {
	  /**
	  * Constructs a new MailboxApi. 
	  * @alias module:api/MailboxApi
	  * @class
	  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
	  * default to {@link module:ApiClient#instance} if unspecified.
	  */
	  function MailboxApi(apiClient) {
	    _classCallCheck(this, MailboxApi);

	    this.apiClient = apiClient || _ApiClient["default"].instance;
	  }
	  /**
	   * Verify mailbox
	   * Verify that mailbox domain is valid.  
	   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Mailbox} and HTTP response
	   */


	  _createClass(MailboxApi, [{
	    key: "getMailboxWithHttpInfo",
	    value: function getMailboxWithHttpInfo() {
	      var postBody = null;
	      var pathParams = {};
	      var queryParams = {};
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/json'];
	      var returnType = _Mailbox["default"];
	      return this.apiClient.callApi('/mailbox', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Verify mailbox
	     * Verify that mailbox domain is valid.  
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Mailbox}
	     */

	  }, {
	    key: "getMailbox",
	    value: function getMailbox() {
	      return this.getMailboxWithHttpInfo().then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	    /**
	     * Create new mailbox
	     * Create new mailbox for new or existing user.  </br> If you already have JWT token, you SHOULD use it in order to keep same user id. 
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/NewMailbox} and HTTP response
	     */

	  }, {
	    key: "newMailboxWithHttpInfo",
	    value: function newMailboxWithHttpInfo() {
	      var postBody = null;
	      var pathParams = {};
	      var queryParams = {};
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/json'];
	      var returnType = _NewMailbox["default"];
	      return this.apiClient.callApi('/mailbox', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Create new mailbox
	     * Create new mailbox for new or existing user.  </br> If you already have JWT token, you SHOULD use it in order to keep same user id. 
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/NewMailbox}
	     */

	  }, {
	    key: "newMailbox",
	    value: function newMailbox() {
	      return this.newMailboxWithHttpInfo().then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	  }]);

	  return MailboxApi;
	}();

	exports["default"] = MailboxApi;

/***/ }),
/* 19 */
/*!*********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/api/MessagesApi.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	var _BadRequest = _interopRequireDefault(__webpack_require__(/*! ../model/BadRequest */ 6));

	var _Gone = _interopRequireDefault(__webpack_require__(/*! ../model/Gone */ 7));

	var _Message = _interopRequireDefault(__webpack_require__(/*! ../model/Message */ 9));

	var _Messages = _interopRequireDefault(__webpack_require__(/*! ../model/Messages */ 11));

	var _Unauthorized = _interopRequireDefault(__webpack_require__(/*! ../model/Unauthorized */ 5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	* Messages service.
	* @module api/MessagesApi
	* @version 0.0.7
	*/
	var MessagesApi = /*#__PURE__*/function () {
	  /**
	  * Constructs a new MessagesApi. 
	  * @alias module:api/MessagesApi
	  * @class
	  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
	  * default to {@link module:ApiClient#instance} if unspecified.
	  */
	  function MessagesApi(apiClient) {
	    _classCallCheck(this, MessagesApi);

	    this.apiClient = apiClient || _ApiClient["default"].instance;
	  }
	  /**
	   * Delete single message
	   * Delete single message by id
	   * @param {String} messageId message id
	   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
	   */


	  _createClass(MessagesApi, [{
	    key: "deleteMessageWithHttpInfo",
	    value: function deleteMessageWithHttpInfo(messageId) {
	      var postBody = null; // verify the required parameter 'messageId' is set

	      if (messageId === undefined || messageId === null) {
	        throw new Error("Missing the required parameter 'messageId' when calling deleteMessage");
	      }

	      var pathParams = {
	        'messageId': messageId
	      };
	      var queryParams = {};
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/json'];
	      var returnType = null;
	      return this.apiClient.callApi('/messages/{messageId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Delete single message
	     * Delete single message by id
	     * @param {String} messageId message id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
	     */

	  }, {
	    key: "deleteMessage",
	    value: function deleteMessage(messageId) {
	      return this.deleteMessageWithHttpInfo(messageId).then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	    /**
	     * Get single attachment
	     * Get single attachment by id
	     * @param {String} messageId message id
	     * @param {String} attachmentId attachment id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Blob} and HTTP response
	     */

	  }, {
	    key: "getAttachmentWithHttpInfo",
	    value: function getAttachmentWithHttpInfo(messageId, attachmentId) {
	      var postBody = null; // verify the required parameter 'messageId' is set

	      if (messageId === undefined || messageId === null) {
	        throw new Error("Missing the required parameter 'messageId' when calling getAttachment");
	      } // verify the required parameter 'attachmentId' is set


	      if (attachmentId === undefined || attachmentId === null) {
	        throw new Error("Missing the required parameter 'attachmentId' when calling getAttachment");
	      }

	      var pathParams = {
	        'messageId': messageId,
	        'attachmentId': attachmentId
	      };
	      var queryParams = {};
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/octet-stream', 'application/json'];
	      var returnType = 'Blob';
	      return this.apiClient.callApi('/messages/{messageId}/attachment/{attachmentId}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Get single attachment
	     * Get single attachment by id
	     * @param {String} messageId message id
	     * @param {String} attachmentId attachment id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Blob}
	     */

	  }, {
	    key: "getAttachment",
	    value: function getAttachment(messageId, attachmentId) {
	      return this.getAttachmentWithHttpInfo(messageId, attachmentId).then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	    /**
	     * Get single message
	     * Get single message by id
	     * @param {String} messageId message id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Message} and HTTP response
	     */

	  }, {
	    key: "getMessageWithHttpInfo",
	    value: function getMessageWithHttpInfo(messageId) {
	      var postBody = null; // verify the required parameter 'messageId' is set

	      if (messageId === undefined || messageId === null) {
	        throw new Error("Missing the required parameter 'messageId' when calling getMessage");
	      }

	      var pathParams = {
	        'messageId': messageId
	      };
	      var queryParams = {};
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/json'];
	      var returnType = _Message["default"];
	      return this.apiClient.callApi('/messages/{messageId}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Get single message
	     * Get single message by id
	     * @param {String} messageId message id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Message}
	     */

	  }, {
	    key: "getMessage",
	    value: function getMessage(messageId) {
	      return this.getMessageWithHttpInfo(messageId).then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	    /**
	     * Get messages list
	     * Get messages list. List includes messages preview. </br> Supply timestamp to retreive new messages. 
	     * @param {Object} opts Optional parameters
	     * @param {String} opts.after get messages received after this unix timestamp
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Messages} and HTTP response
	     */

	  }, {
	    key: "getMessagesWithHttpInfo",
	    value: function getMessagesWithHttpInfo(opts) {
	      opts = opts || {};
	      var postBody = null;
	      var pathParams = {};
	      var queryParams = {
	        'after': opts['after']
	      };
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/json'];
	      var returnType = _Messages["default"];
	      return this.apiClient.callApi('/messages', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Get messages list
	     * Get messages list. List includes messages preview. </br> Supply timestamp to retreive new messages. 
	     * @param {Object} opts Optional parameters
	     * @param {String} opts.after get messages received after this unix timestamp
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Messages}
	     */

	  }, {
	    key: "getMessages",
	    value: function getMessages(opts) {
	      return this.getMessagesWithHttpInfo(opts).then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	    /**
	     * Get message source
	     * Get message source in binary format
	     * @param {String} messageId message id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link File} and HTTP response
	     */

	  }, {
	    key: "getSourceWithHttpInfo",
	    value: function getSourceWithHttpInfo(messageId) {
	      var postBody = null; // verify the required parameter 'messageId' is set

	      if (messageId === undefined || messageId === null) {
	        throw new Error("Missing the required parameter 'messageId' when calling getSource");
	      }

	      var pathParams = {
	        'messageId': messageId
	      };
	      var queryParams = {};
	      var headerParams = {};
	      var formParams = {};
	      var authNames = ['jwtAuth'];
	      var contentTypes = [];
	      var accepts = ['application/octet-stream', 'application/json'];
	      var returnType = File;
	      return this.apiClient.callApi('/messages/{messageId}/source', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
	    }
	    /**
	     * Get message source
	     * Get message source in binary format
	     * @param {String} messageId message id
	     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link File}
	     */

	  }, {
	    key: "getSource",
	    value: function getSource(messageId) {
	      return this.getSourceWithHttpInfo(messageId).then(function (response_and_data) {
	        return response_and_data.data;
	      });
	    }
	  }]);

	  return MessagesApi;
	}();

	exports["default"] = MessagesApi;

/***/ }),
/* 20 */
/*!***********************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/index.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "ApiClient", {
	  enumerable: true,
	  get: function get() {
	    return _ApiClient["default"];
	  }
	});
	Object.defineProperty(exports, "AlreadyExists", {
	  enumerable: true,
	  get: function get() {
	    return _AlreadyExists["default"];
	  }
	});
	Object.defineProperty(exports, "BadRequest", {
	  enumerable: true,
	  get: function get() {
	    return _BadRequest["default"];
	  }
	});
	Object.defineProperty(exports, "Forbidden", {
	  enumerable: true,
	  get: function get() {
	    return _Forbidden["default"];
	  }
	});
	Object.defineProperty(exports, "Gone", {
	  enumerable: true,
	  get: function get() {
	    return _Gone["default"];
	  }
	});
	Object.defineProperty(exports, "Mailbox", {
	  enumerable: true,
	  get: function get() {
	    return _Mailbox["default"];
	  }
	});
	Object.defineProperty(exports, "Message", {
	  enumerable: true,
	  get: function get() {
	    return _Message["default"];
	  }
	});
	Object.defineProperty(exports, "MessageAttachments", {
	  enumerable: true,
	  get: function get() {
	    return _MessageAttachments["default"];
	  }
	});
	Object.defineProperty(exports, "Messages", {
	  enumerable: true,
	  get: function get() {
	    return _Messages["default"];
	  }
	});
	Object.defineProperty(exports, "MessagesMessages", {
	  enumerable: true,
	  get: function get() {
	    return _MessagesMessages["default"];
	  }
	});
	Object.defineProperty(exports, "NewMailbox", {
	  enumerable: true,
	  get: function get() {
	    return _NewMailbox["default"];
	  }
	});
	Object.defineProperty(exports, "NotFound", {
	  enumerable: true,
	  get: function get() {
	    return _NotFound["default"];
	  }
	});
	Object.defineProperty(exports, "Response200", {
	  enumerable: true,
	  get: function get() {
	    return _Response["default"];
	  }
	});
	Object.defineProperty(exports, "ServiceUnavailable", {
	  enumerable: true,
	  get: function get() {
	    return _ServiceUnavailable["default"];
	  }
	});
	Object.defineProperty(exports, "Unauthorized", {
	  enumerable: true,
	  get: function get() {
	    return _Unauthorized["default"];
	  }
	});
	Object.defineProperty(exports, "MailboxApi", {
	  enumerable: true,
	  get: function get() {
	    return _MailboxApi["default"];
	  }
	});
	Object.defineProperty(exports, "MessagesApi", {
	  enumerable: true,
	  get: function get() {
	    return _MessagesApi["default"];
	  }
	});

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ./ApiClient */ 1));

	var _AlreadyExists = _interopRequireDefault(__webpack_require__(/*! ./model/AlreadyExists */ 21));

	var _BadRequest = _interopRequireDefault(__webpack_require__(/*! ./model/BadRequest */ 6));

	var _Forbidden = _interopRequireDefault(__webpack_require__(/*! ./model/Forbidden */ 22));

	var _Gone = _interopRequireDefault(__webpack_require__(/*! ./model/Gone */ 7));

	var _Mailbox = _interopRequireDefault(__webpack_require__(/*! ./model/Mailbox */ 8));

	var _Message = _interopRequireDefault(__webpack_require__(/*! ./model/Message */ 9));

	var _MessageAttachments = _interopRequireDefault(__webpack_require__(/*! ./model/MessageAttachments */ 10));

	var _Messages = _interopRequireDefault(__webpack_require__(/*! ./model/Messages */ 11));

	var _MessagesMessages = _interopRequireDefault(__webpack_require__(/*! ./model/MessagesMessages */ 12));

	var _NewMailbox = _interopRequireDefault(__webpack_require__(/*! ./model/NewMailbox */ 13));

	var _NotFound = _interopRequireDefault(__webpack_require__(/*! ./model/NotFound */ 23));

	var _Response = _interopRequireDefault(__webpack_require__(/*! ./model/Response200 */ 24));

	var _ServiceUnavailable = _interopRequireDefault(__webpack_require__(/*! ./model/ServiceUnavailable */ 14));

	var _Unauthorized = _interopRequireDefault(__webpack_require__(/*! ./model/Unauthorized */ 5));

	var _MailboxApi = _interopRequireDefault(__webpack_require__(/*! ./api/MailboxApi */ 18));

	var _MessagesApi = _interopRequireDefault(__webpack_require__(/*! ./api/MessagesApi */ 19));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),
/* 21 */
/*!*************************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/AlreadyExists.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The AlreadyExists model module.
	 * @module model/AlreadyExists
	 * @version 0.0.7
	 */
	var AlreadyExists = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>AlreadyExists</code>.
	   * @alias module:model/AlreadyExists
	   * @param errorMessage {String} Resource already exists
	   * @param errorName {module:model/AlreadyExists.ErrorNameEnum} 
	   */
	  function AlreadyExists(errorMessage, errorName) {
	    _classCallCheck(this, AlreadyExists);

	    AlreadyExists.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(AlreadyExists, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>AlreadyExists</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/AlreadyExists} obj Optional instance to populate.
	     * @return {module:model/AlreadyExists} The populated <code>AlreadyExists</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new AlreadyExists();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return AlreadyExists;
	}();
	/**
	 * Resource already exists
	 * @member {String} errorMessage
	 */


	AlreadyExists.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/AlreadyExists.ErrorNameEnum} errorName
	 */

	AlreadyExists.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	AlreadyExists['ErrorNameEnum'] = {
	  /**
	   * value: "ResourceExistsException"
	   * @const
	   */
	  "ResourceExistsException": "ResourceExistsException"
	};
	var _default = AlreadyExists;
	exports["default"] = _default;

/***/ }),
/* 22 */
/*!*********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Forbidden.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Forbidden model module.
	 * @module model/Forbidden
	 * @version 0.0.7
	 */
	var Forbidden = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Forbidden</code>.
	   * @alias module:model/Forbidden
	   * @param errorMessage {String} Forbidden to access this resource
	   * @param errorName {module:model/Forbidden.ErrorNameEnum} 
	   */
	  function Forbidden(errorMessage, errorName) {
	    _classCallCheck(this, Forbidden);

	    Forbidden.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Forbidden, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>Forbidden</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Forbidden} obj Optional instance to populate.
	     * @return {module:model/Forbidden} The populated <code>Forbidden</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Forbidden();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Forbidden;
	}();
	/**
	 * Forbidden to access this resource
	 * @member {String} errorMessage
	 */


	Forbidden.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/Forbidden.ErrorNameEnum} errorName
	 */

	Forbidden.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	Forbidden['ErrorNameEnum'] = {
	  /**
	   * value: "AccessDeniedException"
	   * @const
	   */
	  "AccessDeniedException": "AccessDeniedException"
	};
	var _default = Forbidden;
	exports["default"] = _default;

/***/ }),
/* 23 */
/*!********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/NotFound.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The NotFound model module.
	 * @module model/NotFound
	 * @version 0.0.7
	 */
	var NotFound = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>NotFound</code>.
	   * @alias module:model/NotFound
	   * @param errorMessage {String} Resource not found
	   * @param errorName {module:model/NotFound.ErrorNameEnum} 
	   */
	  function NotFound(errorMessage, errorName) {
	    _classCallCheck(this, NotFound);

	    NotFound.initialize(this, errorMessage, errorName);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(NotFound, null, [{
	    key: "initialize",
	    value: function initialize(obj, errorMessage, errorName) {
	      obj['errorMessage'] = errorMessage;
	      obj['errorName'] = errorName;
	    }
	    /**
	     * Constructs a <code>NotFound</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/NotFound} obj Optional instance to populate.
	     * @return {module:model/NotFound} The populated <code>NotFound</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new NotFound();

	        if (data.hasOwnProperty('errorMessage')) {
	          obj['errorMessage'] = _ApiClient["default"].convertToType(data['errorMessage'], 'String');
	        }

	        if (data.hasOwnProperty('errorName')) {
	          obj['errorName'] = _ApiClient["default"].convertToType(data['errorName'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return NotFound;
	}();
	/**
	 * Resource not found
	 * @member {String} errorMessage
	 */


	NotFound.prototype['errorMessage'] = undefined;
	/**
	 * @member {module:model/NotFound.ErrorNameEnum} errorName
	 */

	NotFound.prototype['errorName'] = undefined;
	/**
	 * Allowed values for the <code>errorName</code> property.
	 * @enum {String}
	 * @readonly
	 */

	NotFound['ErrorNameEnum'] = {
	  /**
	   * value: "ResourceNotFoundException"
	   * @const
	   */
	  "ResourceNotFoundException": "ResourceNotFoundException"
	};
	var _default = NotFound;
	exports["default"] = _default;

/***/ }),
/* 24 */
/*!***********************************************************!*\
  !*** ./~/@privatix/tm-free-sdk/dist/model/Response200.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _ApiClient = _interopRequireDefault(__webpack_require__(/*! ../ApiClient */ 1));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * The Response200 model module.
	 * @module model/Response200
	 * @version 0.0.7
	 */
	var Response200 = /*#__PURE__*/function () {
	  /**
	   * Constructs a new <code>Response200</code>.
	   * @alias module:model/Response200
	   */
	  function Response200() {
	    _classCallCheck(this, Response200);

	    Response200.initialize(this);
	  }
	  /**
	   * Initializes the fields of this object.
	   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
	   * Only for internal use.
	   */


	  _createClass(Response200, null, [{
	    key: "initialize",
	    value: function initialize(obj) {}
	    /**
	     * Constructs a <code>Response200</code> from a plain JavaScript object, optionally creating a new instance.
	     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
	     * @param {Object} data The plain JavaScript object bearing properties of interest.
	     * @param {module:model/Response200} obj Optional instance to populate.
	     * @return {module:model/Response200} The populated <code>Response200</code> instance.
	     */

	  }, {
	    key: "constructFromObject",
	    value: function constructFromObject(data, obj) {
	      if (data) {
	        obj = obj || new Response200();

	        if (data.hasOwnProperty('result')) {
	          obj['result'] = _ApiClient["default"].convertToType(data['result'], 'String');
	        }
	      }

	      return obj;
	    }
	  }]);

	  return Response200;
	}();
	/**
	 * @member {String} result
	 * @default 'success'
	 */


	Response200.prototype['result'] = 'success';
	var _default = Response200;
	exports["default"] = _default;

/***/ }),
/* 25 */
/*!******************************!*\
  !*** ./~/base64-js/index.js ***!
  \******************************/
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function getLens (b64) {
	  var len = b64.length

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

	  var curByte = 0

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen

	  var i
	  for (i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }

	  return parts.join('')
	}


/***/ }),
/* 26 */
/*!**************************************!*\
  !*** ./~/component-emitter/index.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }

	  // Remove event specific arrays for event types that no
	  // one is subscribed for to avoid memory leak.
	  if (callbacks.length === 0) {
	    delete this._callbacks['$' + event];
	  }

	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};

	  var args = new Array(arguments.length - 1)
	    , callbacks = this._callbacks['$' + event];

	  for (var i = 1; i < arguments.length; i++) {
	    args[i - 1] = arguments[i];
	  }

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 27 */
/*!****************************************!*\
  !*** ./~/fast-safe-stringify/index.js ***!
  \****************************************/
/***/ (function(module, exports) {

	module.exports = stringify
	stringify.default = stringify
	stringify.stable = deterministicStringify
	stringify.stableStringify = deterministicStringify

	var arr = []
	var replacerStack = []

	// Regular stringify
	function stringify (obj, replacer, spacer) {
	  decirc(obj, '', [], undefined)
	  var res
	  if (replacerStack.length === 0) {
	    res = JSON.stringify(obj, replacer, spacer)
	  } else {
	    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
	  }
	  while (arr.length !== 0) {
	    var part = arr.pop()
	    if (part.length === 4) {
	      Object.defineProperty(part[0], part[1], part[3])
	    } else {
	      part[0][part[1]] = part[2]
	    }
	  }
	  return res
	}
	function decirc (val, k, stack, parent) {
	  var i
	  if (typeof val === 'object' && val !== null) {
	    for (i = 0; i < stack.length; i++) {
	      if (stack[i] === val) {
	        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
	        if (propertyDescriptor.get !== undefined) {
	          if (propertyDescriptor.configurable) {
	            Object.defineProperty(parent, k, { value: '[Circular]' })
	            arr.push([parent, k, val, propertyDescriptor])
	          } else {
	            replacerStack.push([val, k])
	          }
	        } else {
	          parent[k] = '[Circular]'
	          arr.push([parent, k, val])
	        }
	        return
	      }
	    }
	    stack.push(val)
	    // Optimize for Arrays. Big arrays could kill the performance otherwise!
	    if (Array.isArray(val)) {
	      for (i = 0; i < val.length; i++) {
	        decirc(val[i], i, stack, val)
	      }
	    } else {
	      var keys = Object.keys(val)
	      for (i = 0; i < keys.length; i++) {
	        var key = keys[i]
	        decirc(val[key], key, stack, val)
	      }
	    }
	    stack.pop()
	  }
	}

	// Stable-stringify
	function compareFunction (a, b) {
	  if (a < b) {
	    return -1
	  }
	  if (a > b) {
	    return 1
	  }
	  return 0
	}

	function deterministicStringify (obj, replacer, spacer) {
	  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
	  var res
	  if (replacerStack.length === 0) {
	    res = JSON.stringify(tmp, replacer, spacer)
	  } else {
	    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
	  }
	  while (arr.length !== 0) {
	    var part = arr.pop()
	    if (part.length === 4) {
	      Object.defineProperty(part[0], part[1], part[3])
	    } else {
	      part[0][part[1]] = part[2]
	    }
	  }
	  return res
	}

	function deterministicDecirc (val, k, stack, parent) {
	  var i
	  if (typeof val === 'object' && val !== null) {
	    for (i = 0; i < stack.length; i++) {
	      if (stack[i] === val) {
	        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
	        if (propertyDescriptor.get !== undefined) {
	          if (propertyDescriptor.configurable) {
	            Object.defineProperty(parent, k, { value: '[Circular]' })
	            arr.push([parent, k, val, propertyDescriptor])
	          } else {
	            replacerStack.push([val, k])
	          }
	        } else {
	          parent[k] = '[Circular]'
	          arr.push([parent, k, val])
	        }
	        return
	      }
	    }
	    if (typeof val.toJSON === 'function') {
	      return
	    }
	    stack.push(val)
	    // Optimize for Arrays. Big arrays could kill the performance otherwise!
	    if (Array.isArray(val)) {
	      for (i = 0; i < val.length; i++) {
	        deterministicDecirc(val[i], i, stack, val)
	      }
	    } else {
	      // Create a temporary object in the required way
	      var tmp = {}
	      var keys = Object.keys(val).sort(compareFunction)
	      for (i = 0; i < keys.length; i++) {
	        var key = keys[i]
	        deterministicDecirc(val[key], key, stack, val)
	        tmp[key] = val[key]
	      }
	      if (parent !== undefined) {
	        arr.push([parent, k, val])
	        parent[k] = tmp
	      } else {
	        return tmp
	      }
	    }
	    stack.pop()
	  }
	}

	// wraps replacer function to handle values we couldn't replace
	// and mark them as [Circular]
	function replaceGetterValues (replacer) {
	  replacer = replacer !== undefined ? replacer : function (k, v) { return v }
	  return function (key, val) {
	    if (replacerStack.length > 0) {
	      for (var i = 0; i < replacerStack.length; i++) {
	        var part = replacerStack[i]
	        if (part[1] === key && part[0] === val) {
	          val = '[Circular]'
	          replacerStack.splice(i, 1)
	          break
	        }
	      }
	    }
	    return replacer.call(this, key, val)
	  }
	}


/***/ }),
/* 28 */
/*!****************************!*\
  !*** ./~/ieee754/index.js ***!
  \****************************/
/***/ (function(module, exports) {

	/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 29 */
/*!****************************!*\
  !*** ./~/isarray/index.js ***!
  \****************************/
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 30 */
/*!***********************************************!*\
  !*** ./~/node-libs-browser/~/buffer/index.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(/*! base64-js */ 25)
	var ieee754 = __webpack_require__(/*! ieee754 */ 28)
	var isArray = __webpack_require__(/*! isarray */ 29)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 31 */
/*!*********************************!*\
  !*** ./~/querystring/decode.js ***!
  \*********************************/
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ }),
/* 32 */
/*!*********************************!*\
  !*** ./~/querystring/encode.js ***!
  \*********************************/
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ }),
/* 33 */
/*!********************************!*\
  !*** ./~/querystring/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 31);
	exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 32);


/***/ }),
/* 34 */
/*!****************************************!*\
  !*** ./~/superagent/lib/agent-base.js ***!
  \****************************************/
/***/ (function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

	function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

	function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function Agent() {
	  this._defaults = [];
	}

	['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
	  // Default setting for all requests from this agent
	  Agent.prototype[fn] = function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    this._defaults.push({
	      fn: fn,
	      args: args
	    });

	    return this;
	  };
	});

	Agent.prototype._setDefaults = function (req) {
	  this._defaults.forEach(function (def) {
	    req[def.fn].apply(req, _toConsumableArray(def.args));
	  });
	};

	module.exports = Agent;
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hZ2VudC1iYXNlLmpzIl0sIm5hbWVzIjpbIkFnZW50IiwiX2RlZmF1bHRzIiwiZm9yRWFjaCIsImZuIiwicHJvdG90eXBlIiwiYXJncyIsInB1c2giLCJfc2V0RGVmYXVsdHMiLCJyZXEiLCJkZWYiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLEtBQVQsR0FBaUI7QUFDZixPQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0Q7O0FBRUQsQ0FDRSxLQURGLEVBRUUsSUFGRixFQUdFLE1BSEYsRUFJRSxLQUpGLEVBS0UsT0FMRixFQU1FLE1BTkYsRUFPRSxRQVBGLEVBUUUsTUFSRixFQVNFLGlCQVRGLEVBVUUsV0FWRixFQVdFLE9BWEYsRUFZRSxJQVpGLEVBYUUsV0FiRixFQWNFLFNBZEYsRUFlRSxRQWZGLEVBZ0JFLFdBaEJGLEVBaUJFLE9BakJGLEVBa0JFLElBbEJGLEVBbUJFLEtBbkJGLEVBb0JFLEtBcEJGLEVBcUJFLE1BckJGLEVBc0JFLGlCQXRCRixFQXVCRUMsT0F2QkYsQ0F1QlUsVUFBQUMsRUFBRSxFQUFJO0FBQ2Q7QUFDQUgsRUFBQUEsS0FBSyxDQUFDSSxTQUFOLENBQWdCRCxFQUFoQixJQUFzQixZQUFrQjtBQUFBLHNDQUFORSxJQUFNO0FBQU5BLE1BQUFBLElBQU07QUFBQTs7QUFDdEMsU0FBS0osU0FBTCxDQUFlSyxJQUFmLENBQW9CO0FBQUVILE1BQUFBLEVBQUUsRUFBRkEsRUFBRjtBQUFNRSxNQUFBQSxJQUFJLEVBQUpBO0FBQU4sS0FBcEI7O0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRDtBQUlELENBN0JEOztBQStCQUwsS0FBSyxDQUFDSSxTQUFOLENBQWdCRyxZQUFoQixHQUErQixVQUFTQyxHQUFULEVBQWM7QUFDM0MsT0FBS1AsU0FBTCxDQUFlQyxPQUFmLENBQXVCLFVBQUFPLEdBQUcsRUFBSTtBQUM1QkQsSUFBQUEsR0FBRyxDQUFDQyxHQUFHLENBQUNOLEVBQUwsQ0FBSCxPQUFBSyxHQUFHLHFCQUFZQyxHQUFHLENBQUNKLElBQWhCLEVBQUg7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7QUFNQUssTUFBTSxDQUFDQyxPQUFQLEdBQWlCWCxLQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEFnZW50KCkge1xuICB0aGlzLl9kZWZhdWx0cyA9IFtdO1xufVxuXG5bXG4gICd1c2UnLFxuICAnb24nLFxuICAnb25jZScsXG4gICdzZXQnLFxuICAncXVlcnknLFxuICAndHlwZScsXG4gICdhY2NlcHQnLFxuICAnYXV0aCcsXG4gICd3aXRoQ3JlZGVudGlhbHMnLFxuICAnc29ydFF1ZXJ5JyxcbiAgJ3JldHJ5JyxcbiAgJ29rJyxcbiAgJ3JlZGlyZWN0cycsXG4gICd0aW1lb3V0JyxcbiAgJ2J1ZmZlcicsXG4gICdzZXJpYWxpemUnLFxuICAncGFyc2UnLFxuICAnY2EnLFxuICAna2V5JyxcbiAgJ3BmeCcsXG4gICdjZXJ0JyxcbiAgJ2Rpc2FibGVUTFNDZXJ0cydcbl0uZm9yRWFjaChmbiA9PiB7XG4gIC8vIERlZmF1bHQgc2V0dGluZyBmb3IgYWxsIHJlcXVlc3RzIGZyb20gdGhpcyBhZ2VudFxuICBBZ2VudC5wcm90b3R5cGVbZm5dID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIHRoaXMuX2RlZmF1bHRzLnB1c2goeyBmbiwgYXJncyB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbn0pO1xuXG5BZ2VudC5wcm90b3R5cGUuX3NldERlZmF1bHRzID0gZnVuY3Rpb24ocmVxKSB7XG4gIHRoaXMuX2RlZmF1bHRzLmZvckVhY2goZGVmID0+IHtcbiAgICByZXFbZGVmLmZuXSguLi5kZWYuYXJncyk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcbiJdfQ==

/***/ }),
/* 35 */
/*!************************************!*\
  !*** ./~/superagent/lib/client.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/**
	 * Root reference for iframes.
	 */
	var root;

	if (typeof window !== 'undefined') {
	  // Browser window
	  root = window;
	} else if (typeof self === 'undefined') {
	  // Other environments
	  console.warn('Using browser-only version of superagent in non-browser environment');
	  root = void 0;
	} else {
	  // Web Worker
	  root = self;
	}

	var Emitter = __webpack_require__(/*! component-emitter */ 26);

	var safeStringify = __webpack_require__(/*! fast-safe-stringify */ 27);

	var RequestBase = __webpack_require__(/*! ./request-base */ 36);

	var isObject = __webpack_require__(/*! ./is-object */ 15);

	var ResponseBase = __webpack_require__(/*! ./response-base */ 37);

	var Agent = __webpack_require__(/*! ./agent-base */ 34);
	/**
	 * Noop.
	 */


	function noop() {}
	/**
	 * Expose `request`.
	 */


	module.exports = function (method, url) {
	  // callback
	  if (typeof url === 'function') {
	    return new exports.Request('GET', method).end(url);
	  } // url first


	  if (arguments.length === 1) {
	    return new exports.Request('GET', method);
	  }

	  return new exports.Request(method, url);
	};

	exports = module.exports;
	var request = exports;
	exports.Request = Request;
	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
	    return new XMLHttpRequest();
	  }

	  try {
	    return new ActiveXObject('Microsoft.XMLHTTP');
	  } catch (_unused) {}

	  try {
	    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
	  } catch (_unused2) {}

	  try {
	    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
	  } catch (_unused3) {}

	  try {
	    return new ActiveXObject('Msxml2.XMLHTTP');
	  } catch (_unused4) {}

	  throw new Error('Browser-only version of superagent could not find XHR');
	};
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */


	var trim = ''.trim ? function (s) {
	  return s.trim();
	} : function (s) {
	  return s.replace(/(^\s*|\s*$)/g, '');
	};
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];

	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
	  }

	  return pairs.join('&');
	}
	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */


	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (val === undefined) return;

	  if (val === null) {
	    pairs.push(encodeURI(key));
	    return;
	  }

	  if (Array.isArray(val)) {
	    val.forEach(function (v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  } else if (isObject(val)) {
	    for (var subkey in val) {
	      if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
	    }
	  } else {
	    pairs.push(encodeURI(key) + '=' + encodeURIComponent(val));
	  }
	}
	/**
	 * Expose serialization method.
	 */


	request.serializeObject = serialize;
	/**
	 * Parse the given x-www-form-urlencoded `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');

	    if (pos === -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
	    }
	  }

	  return obj;
	}
	/**
	 * Expose parser.
	 */


	request.parseString = parseString;
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'text/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  form: 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	request.serialize = {
	  'application/x-www-form-urlencoded': serialize,
	  'application/json': safeStringify
	};
	/**
	 * Default parsers.
	 *
	 *     superagent.parse['application/xml'] = function(str){
	 *       return { object parsed from str };
	 *     };
	 *
	 */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');

	    if (index === -1) {
	      // could be empty line, just skip it
	      continue;
	    }

	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}
	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */


	function isJSON(mime) {
	  // should match /json or +json
	  // but not /json-seq
	  return /[/+]json($|[^-\w])/.test(mime);
	}
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */


	function Response(req) {
	  this.req = req;
	  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

	  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
	  this.statusText = this.req.xhr.statusText;
	  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

	  if (status === 1223) {
	    status = 204;
	  }

	  this._setStatusProperties(status);

	  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.

	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

	  this._setHeaderProperties(this.header);

	  if (this.text === null && req._responseType) {
	    this.body = this.xhr.response;
	  } else {
	    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
	  }
	} // eslint-disable-next-line new-cap


	ResponseBase(Response.prototype);
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype._parseBody = function (str) {
	  var parse = request.parse[this.type];

	  if (this.req._parser) {
	    return this.req._parser(this, str);
	  }

	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }

	  return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
	};
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */


	Response.prototype.toError = function () {
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	  var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	  return err;
	};
	/**
	 * Expose `Response`.
	 */


	request.Response = Response;
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case

	  this._header = {}; // coerces header names to lowercase

	  this.on('end', function () {
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch (err_) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = err_; // issue #675: return the raw response if the response parsing fails

	      if (self.xhr) {
	        // ie9 doesn't have 'response' property
	        err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

	        err.status = self.xhr.status ? self.xhr.status : null;
	        err.statusCode = err.status; // backwards-compat only
	      } else {
	        err.rawResponse = null;
	        err.status = null;
	      }

	      return self.callback(err);
	    }

	    self.emit('response', res);
	    var new_err;

	    try {
	      if (!self._isResponseOK(res)) {
	        new_err = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
	      }
	    } catch (err_) {
	      new_err = err_; // ok() callback can throw
	    } // #1000 don't catch errors from the callback to avoid double calling it


	    if (new_err) {
	      new_err.original = err;
	      new_err.response = res;
	      new_err.status = res.status;
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}
	/**
	 * Mixin `Emitter` and `RequestBase`.
	 */
	// eslint-disable-next-line new-cap


	Emitter(Request.prototype); // eslint-disable-next-line new-cap

	RequestBase(Request.prototype);
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function (type) {
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */


	Request.prototype.accept = function (type) {
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} [pass] optional in case of using 'bearer' as type
	 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */


	Request.prototype.auth = function (user, pass, options) {
	  if (arguments.length === 1) pass = '';

	  if (_typeof(pass) === 'object' && pass !== null) {
	    // pass is optional and can be replaced with options
	    options = pass;
	    pass = '';
	  }

	  if (!options) {
	    options = {
	      type: typeof btoa === 'function' ? 'basic' : 'auto'
	    };
	  }

	  var encoder = function encoder(string) {
	    if (typeof btoa === 'function') {
	      return btoa(string);
	    }

	    throw new Error('Cannot use basic auth, btoa is not a function');
	  };

	  return this._auth(user, pass, options, encoder);
	};
	/**
	 * Add query-string `val`.
	 *
	 * Examples:
	 *
	 *   request.get('/shoes')
	 *     .query('size=10')
	 *     .query({ color: 'blue' })
	 *
	 * @param {Object|String} val
	 * @return {Request} for chaining
	 * @api public
	 */


	Request.prototype.query = function (val) {
	  if (typeof val !== 'string') val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `options` (or filename).
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String|Object} options
	 * @return {Request} for chaining
	 * @api public
	 */


	Request.prototype.attach = function (field, file, options) {
	  if (file) {
	    if (this._data) {
	      throw new Error("superagent can't mix .send() and .attach()");
	    }

	    this._getFormData().append(field, file, options || file.name);
	  }

	  return this;
	};

	Request.prototype._getFormData = function () {
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }

	  return this._formData;
	};
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */


	Request.prototype.callback = function (err, res) {
	  if (this._shouldRetry(err, res)) {
	    return this._retry();
	  }

	  var fn = this._callback;
	  this.clearTimeout();

	  if (err) {
	    if (this._maxRetries) err.retries = this._retries - 1;
	    this.emit('error', err);
	  }

	  fn(err, res);
	};
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */


	Request.prototype.crossDomainError = function () {
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;
	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;
	  this.callback(err);
	}; // This only warns, because the request is still likely to work


	Request.prototype.agent = function () {
	  console.warn('This is not supported in browser version of superagent');
	  return this;
	};

	Request.prototype.ca = Request.prototype.agent;
	Request.prototype.buffer = Request.prototype.ca; // This throws, because it can't send/receive data as expected

	Request.prototype.write = function () {
	  throw new Error('Streaming is not supported in browser version of superagent');
	};

	Request.prototype.pipe = Request.prototype.write;
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * @param {Object} obj host object
	 * @return {Boolean} is a host object
	 * @api private
	 */

	Request.prototype._isHost = function (obj) {
	  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
	  return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
	};
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */


	Request.prototype.end = function (fn) {
	  if (this._endCalled) {
	    console.warn('Warning: .end() was called twice. This is not supported in superagent');
	  }

	  this._endCalled = true; // store callback

	  this._callback = fn || noop; // querystring

	  this._finalizeQueryString();

	  this._end();
	};

	Request.prototype._setUploadTimeout = function () {
	  var self = this; // upload timeout it's wokrs only if deadline timeout is off

	  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
	    this._uploadTimeoutTimer = setTimeout(function () {
	      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
	    }, this._uploadTimeout);
	  }
	}; // eslint-disable-next-line complexity


	Request.prototype._end = function () {
	  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
	  var self = this;
	  this.xhr = request.getXHR();
	  var xhr = this.xhr;
	  var data = this._formData || this._data;

	  this._setTimeouts(); // state change


	  xhr.onreadystatechange = function () {
	    var readyState = xhr.readyState;

	    if (readyState >= 2 && self._responseTimeoutTimer) {
	      clearTimeout(self._responseTimeoutTimer);
	    }

	    if (readyState !== 4) {
	      return;
	    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"


	    var status;

	    try {
	      status = xhr.status;
	    } catch (_unused5) {
	      status = 0;
	    }

	    if (!status) {
	      if (self.timedout || self._aborted) return;
	      return self.crossDomainError();
	    }

	    self.emit('end');
	  }; // progress


	  var handleProgress = function handleProgress(direction, e) {
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;

	      if (e.percent === 100) {
	        clearTimeout(self._uploadTimeoutTimer);
	      }
	    }

	    e.direction = direction;
	    self.emit('progress', e);
	  };

	  if (this.hasListeners('progress')) {
	    try {
	      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

	      if (xhr.upload) {
	        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
	      }
	    } catch (_unused6) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	      // Reported here:
	      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	    }
	  }

	  if (xhr.upload) {
	    this._setUploadTimeout();
	  } // initiate request


	  try {
	    if (this.username && this.password) {
	      xhr.open(this.method, this.url, true, this.username, this.password);
	    } else {
	      xhr.open(this.method, this.url, true);
	    }
	  } catch (err) {
	    // see #1149
	    return this.callback(err);
	  } // CORS


	  if (this._withCredentials) xhr.withCredentials = true; // body

	  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];

	    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

	    if (!_serialize && isJSON(contentType)) {
	      _serialize = request.serialize['application/json'];
	    }

	    if (_serialize) data = _serialize(data);
	  } // set header fields


	  for (var field in this.header) {
	    if (this.header[field] === null) continue;
	    if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
	  }

	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  } // send stuff


	  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined

	  xhr.send(typeof data === 'undefined' ? null : data);
	};

	request.agent = function () {
	  return new Agent();
	};

	['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
	  Agent.prototype[method.toLowerCase()] = function (url, fn) {
	    var req = new request.Request(method, url);

	    this._setDefaults(req);

	    if (fn) {
	      req.end(fn);
	    }

	    return req;
	  };
	});
	Agent.prototype.del = Agent.prototype.delete;
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.get = function (url, data, fn) {
	  var req = request('GET', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */


	request.head = function (url, data, fn) {
	  var req = request('HEAD', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */


	request.options = function (url, data, fn) {
	  var req = request('OPTIONS', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	/**
	 * DELETE `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */


	function del(url, data, fn) {
	  var req = request('DELETE', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	}

	request.del = del;
	request.delete = del;
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.patch = function (url, data, fn) {
	  var req = request('PATCH', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */


	request.post = function (url, data, fn) {
	  var req = request('POST', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */


	request.put = function (url, data, fn) {
	  var req = request('PUT', url);

	  if (typeof data === 'function') {
	    fn = data;
	    data = null;
	  }

	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsicm9vdCIsIndpbmRvdyIsInNlbGYiLCJjb25zb2xlIiwid2FybiIsIkVtaXR0ZXIiLCJyZXF1aXJlIiwic2FmZVN0cmluZ2lmeSIsIlJlcXVlc3RCYXNlIiwiaXNPYmplY3QiLCJSZXNwb25zZUJhc2UiLCJBZ2VudCIsIm5vb3AiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0aG9kIiwidXJsIiwiUmVxdWVzdCIsImVuZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInJlcXVlc3QiLCJnZXRYSFIiLCJYTUxIdHRwUmVxdWVzdCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJBY3RpdmVYT2JqZWN0IiwiRXJyb3IiLCJ0cmltIiwicyIsInJlcGxhY2UiLCJzZXJpYWxpemUiLCJvYmoiLCJwYWlycyIsImtleSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyIiwiam9pbiIsInZhbCIsInVuZGVmaW5lZCIsInB1c2giLCJlbmNvZGVVUkkiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwidiIsInN1YmtleSIsImVuY29kZVVSSUNvbXBvbmVudCIsInNlcmlhbGl6ZU9iamVjdCIsInBhcnNlU3RyaW5nIiwic3RyIiwic3BsaXQiLCJwYWlyIiwicG9zIiwiaSIsImxlbiIsImluZGV4T2YiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzbGljZSIsInR5cGVzIiwiaHRtbCIsImpzb24iLCJ4bWwiLCJ1cmxlbmNvZGVkIiwiZm9ybSIsInBhcnNlIiwiSlNPTiIsInBhcnNlSGVhZGVyIiwibGluZXMiLCJmaWVsZHMiLCJpbmRleCIsImxpbmUiLCJmaWVsZCIsInRvTG93ZXJDYXNlIiwiaXNKU09OIiwibWltZSIsInRlc3QiLCJSZXNwb25zZSIsInJlcSIsInhociIsInRleHQiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwic3RhdHVzIiwiX3NldFN0YXR1c1Byb3BlcnRpZXMiLCJoZWFkZXJzIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwiaGVhZGVyIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJfc2V0SGVhZGVyUHJvcGVydGllcyIsIl9yZXNwb25zZVR5cGUiLCJib2R5IiwicmVzcG9uc2UiLCJfcGFyc2VCb2R5IiwidHlwZSIsIl9wYXJzZXIiLCJ0b0Vycm9yIiwibXNnIiwiZXJyIiwiX3F1ZXJ5IiwiX2hlYWRlciIsIm9uIiwicmVzIiwiZXJyXyIsIm9yaWdpbmFsIiwicmF3UmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiY2FsbGJhY2siLCJlbWl0IiwibmV3X2VyciIsIl9pc1Jlc3BvbnNlT0siLCJzZXQiLCJhY2NlcHQiLCJhdXRoIiwidXNlciIsInBhc3MiLCJvcHRpb25zIiwiYnRvYSIsImVuY29kZXIiLCJzdHJpbmciLCJfYXV0aCIsInF1ZXJ5IiwiYXR0YWNoIiwiZmlsZSIsIl9kYXRhIiwiX2dldEZvcm1EYXRhIiwiYXBwZW5kIiwibmFtZSIsIl9mb3JtRGF0YSIsIkZvcm1EYXRhIiwiX3Nob3VsZFJldHJ5IiwiX3JldHJ5IiwiZm4iLCJfY2FsbGJhY2siLCJjbGVhclRpbWVvdXQiLCJfbWF4UmV0cmllcyIsInJldHJpZXMiLCJfcmV0cmllcyIsImNyb3NzRG9tYWluRXJyb3IiLCJjcm9zc0RvbWFpbiIsImFnZW50IiwiY2EiLCJidWZmZXIiLCJ3cml0ZSIsInBpcGUiLCJfaXNIb3N0IiwidG9TdHJpbmciLCJfZW5kQ2FsbGVkIiwiX2ZpbmFsaXplUXVlcnlTdHJpbmciLCJfZW5kIiwiX3NldFVwbG9hZFRpbWVvdXQiLCJfdXBsb2FkVGltZW91dCIsIl91cGxvYWRUaW1lb3V0VGltZXIiLCJzZXRUaW1lb3V0IiwiX3RpbWVvdXRFcnJvciIsIl9hYm9ydGVkIiwiZGF0YSIsIl9zZXRUaW1lb3V0cyIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJfcmVzcG9uc2VUaW1lb3V0VGltZXIiLCJ0aW1lZG91dCIsImhhbmRsZVByb2dyZXNzIiwiZGlyZWN0aW9uIiwiZSIsInRvdGFsIiwicGVyY2VudCIsImxvYWRlZCIsImhhc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwidXBsb2FkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm9wZW4iLCJfd2l0aENyZWRlbnRpYWxzIiwid2l0aENyZWRlbnRpYWxzIiwiY29udGVudFR5cGUiLCJfc2VyaWFsaXplciIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwiX3NldERlZmF1bHRzIiwiZGVsIiwiZGVsZXRlIiwiZ2V0IiwiaGVhZCIsInBhdGNoIiwicG9zdCIsInB1dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7QUFJQSxJQUFJQSxJQUFKOztBQUNBLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNqQztBQUNBRCxFQUFBQSxJQUFJLEdBQUdDLE1BQVA7QUFDRCxDQUhELE1BR08sSUFBSSxPQUFPQyxJQUFQLEtBQWdCLFdBQXBCLEVBQWlDO0FBQ3RDO0FBQ0FDLEVBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNFLHFFQURGO0FBR0FKLEVBQUFBLElBQUksU0FBSjtBQUNELENBTk0sTUFNQTtBQUNMO0FBQ0FBLEVBQUFBLElBQUksR0FBR0UsSUFBUDtBQUNEOztBQUVELElBQU1HLE9BQU8sR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQXZCOztBQUNBLElBQU1DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQTdCOztBQUNBLElBQU1FLFdBQVcsR0FBR0YsT0FBTyxDQUFDLGdCQUFELENBQTNCOztBQUNBLElBQU1HLFFBQVEsR0FBR0gsT0FBTyxDQUFDLGFBQUQsQ0FBeEI7O0FBQ0EsSUFBTUksWUFBWSxHQUFHSixPQUFPLENBQUMsaUJBQUQsQ0FBNUI7O0FBQ0EsSUFBTUssS0FBSyxHQUFHTCxPQUFPLENBQUMsY0FBRCxDQUFyQjtBQUVBOzs7OztBQUlBLFNBQVNNLElBQVQsR0FBZ0IsQ0FBRTtBQUVsQjs7Ozs7QUFJ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cmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxubGV0IHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXG4gICAgJ1VzaW5nIGJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQnXG4gICk7XG4gIHJvb3QgPSB0aGlzO1xufSBlbHNlIHtcbiAgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn1cblxuY29uc3QgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG5jb25zdCBzYWZlU3RyaW5naWZ5ID0gcmVxdWlyZSgnZmFzdC1zYWZlLXN0cmluZ2lmeScpO1xuY29uc3QgUmVxdWVzdEJhc2UgPSByZXF1aXJlKCcuL3JlcXVlc3QtYmFzZScpO1xuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuY29uc3QgUmVzcG9uc2VCYXNlID0gcmVxdWlyZSgnLi9yZXNwb25zZS1iYXNlJyk7XG5jb25zdCBBZ2VudCA9IHJlcXVpcmUoJy4vYWdlbnQtYmFzZScpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICh0eXBlb2YgdXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn07XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblxuY29uc3QgcmVxdWVzdCA9IGV4cG9ydHM7XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9ICgpID0+IHtcbiAgaWYgKFxuICAgIHJvb3QuWE1MSHR0cFJlcXVlc3QgJiZcbiAgICAoIXJvb3QubG9jYXRpb24gfHxcbiAgICAgIHJvb3QubG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgfHxcbiAgICAgICFyb290LkFjdGl2ZVhPYmplY3QpXG4gICkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICB9IGNhdGNoIHt9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpO1xuICB9IGNhdGNoIHt9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpO1xuICB9IGNhdGNoIHt9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7XG4gIH0gY2F0Y2gge31cblxuICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgY291bGQgbm90IGZpbmQgWEhSJyk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuY29uc3QgdHJpbSA9ICcnLnRyaW0gPyBzID0+IHMudHJpbSgpIDogcyA9PiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpO1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIGNvbnN0IHBhaXJzID0gW107XG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKVxuICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICBwYWlycy5wdXNoKGVuY29kZVVSSShrZXkpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgdmFsLmZvckVhY2godiA9PiB7XG4gICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgZm9yIChjb25zdCBzdWJrZXkgaW4gdmFsKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwgc3Via2V5KSlcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGAke2tleX1bJHtzdWJrZXl9XWAsIHZhbFtzdWJrZXldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGFpcnMucHVzaChlbmNvZGVVUkkoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG5yZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3QgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgbGV0IHBhaXI7XG4gIGxldCBwb3M7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIpXSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UoMCwgcG9zKSldID0gZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBwYWlyLnNsaWNlKHBvcyArIDEpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICd0ZXh0L3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICBmb3JtOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxucmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogc2FmZVN0cmluZ2lmeVxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHBhcnNlcnMuXG4gKlxuICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAqICAgICB9O1xuICpcbiAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICBjb25zdCBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICBjb25zdCBmaWVsZHMgPSB7fTtcbiAgbGV0IGluZGV4O1xuICBsZXQgbGluZTtcbiAgbGV0IGZpZWxkO1xuICBsZXQgdmFsO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIC8vIGNvdWxkIGJlIGVtcHR5IGxpbmUsIGp1c3Qgc2tpcCBpdFxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgLy8gc2hvdWxkIG1hdGNoIC9qc29uIG9yICtqc29uXG4gIC8vIGJ1dCBub3QgL2pzb24tc2VxXG4gIHJldHVybiAvWy8rXWpzb24oJHxbXi1cXHddKS8udGVzdChtaW1lKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxKSB7XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuICB0aGlzLnRleHQgPVxuICAgICh0aGlzLnJlcS5tZXRob2QgIT09ICdIRUFEJyAmJlxuICAgICAgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fFxuICAgIHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnXG4gICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dFxuICAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgbGV0IHsgc3RhdHVzIH0gPSB0aGlzLnhocjtcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgc3RhdHVzID0gMjA0O1xuICB9XG5cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG5cbiAgaWYgKHRoaXMudGV4dCA9PT0gbnVsbCAmJiByZXEuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHRoaXMuYm9keSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYm9keSA9XG4gICAgICB0aGlzLnJlcS5tZXRob2QgPT09ICdIRUFEJ1xuICAgICAgICA/IG51bGxcbiAgICAgICAgOiB0aGlzLl9wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpO1xuICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKSB7XG4gIGxldCBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgaWYgKHRoaXMucmVxLl9wYXJzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEuX3BhcnNlcih0aGlzLCBzdHIpO1xuICB9XG5cbiAgaWYgKCFwYXJzZSAmJiBpc0pTT04odGhpcy50eXBlKSkge1xuICAgIHBhcnNlID0gcmVxdWVzdC5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCA+IDAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgeyByZXEgfSA9IHRoaXM7XG4gIGNvbnN0IHsgbWV0aG9kIH0gPSByZXE7XG4gIGNvbnN0IHsgdXJsIH0gPSByZXE7XG5cbiAgY29uc3QgbXNnID0gYGNhbm5vdCAke21ldGhvZH0gJHt1cmx9ICgke3RoaXMuc3RhdHVzfSlgO1xuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307IC8vIHByZXNlcnZlcyBoZWFkZXIgbmFtZSBjYXNlXG4gIHRoaXMuX2hlYWRlciA9IHt9OyAvLyBjb2VyY2VzIGhlYWRlciBuYW1lcyB0byBsb3dlcmNhc2VcbiAgdGhpcy5vbignZW5kJywgKCkgPT4ge1xuICAgIGxldCBlcnIgPSBudWxsO1xuICAgIGxldCByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoIChlcnJfKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZXJyXztcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgICAgLy8gaWU5IGRvZXNuJ3QgaGF2ZSAncmVzcG9uc2UnIHByb3BlcnR5XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9XG4gICAgICAgICAgdHlwZW9mIHNlbGYueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gc2VsZi54aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICA6IHNlbGYueGhyLnJlc3BvbnNlO1xuICAgICAgICAvLyBpc3N1ZSAjODc2OiByZXR1cm4gdGhlIGh0dHAgc3RhdHVzIGNvZGUgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgICAgZXJyLnN0YXR1cyA9IHNlbGYueGhyLnN0YXR1cyA/IHNlbGYueGhyLnN0YXR1cyA6IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXNDb2RlID0gZXJyLnN0YXR1czsgLy8gYmFja3dhcmRzLWNvbXBhdCBvbmx5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnIuc3RhdHVzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIGxldCBuZXdfZXJyO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXNlbGYuX2lzUmVzcG9uc2VPSyhyZXMpKSB7XG4gICAgICAgIG5ld19lcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgcmVzLnN0YXR1c1RleHQgfHwgcmVzLnRleHQgfHwgJ1Vuc3VjY2Vzc2Z1bCBIVFRQIHJlc3BvbnNlJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycl8pIHtcbiAgICAgIG5ld19lcnIgPSBlcnJfOyAvLyBvaygpIGNhbGxiYWNrIGNhbiB0aHJvd1xuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgIHNlbGYuY2FsbGJhY2sobmV3X2VyciwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5jYWxsYmFjayhudWxsLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgIGFuZCBgUmVxdWVzdEJhc2VgLlxuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXG5SZXF1ZXN0QmFzZShSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHBhc3MgPSAnJztcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7XG4gICAgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlcGxhY2VkIHdpdGggb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBwYXNzO1xuICAgIHBhc3MgPSAnJztcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJyA/ICdiYXNpYycgOiAnYXV0bydcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZW5jb2RlciA9IHN0cmluZyA9PiB7XG4gICAgaWYgKHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYnRvYShzdHJpbmcpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBiYXNpYyBhdXRoLCBidG9hIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH07XG5cbiAgcmV0dXJuIHRoaXMuX2F1dGgodXNlciwgcGFzcywgb3B0aW9ucywgZW5jb2Rlcik7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKSB7XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBvcHRpb25zKSB7XG4gIGlmIChmaWxlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInN1cGVyYWdlbnQgY2FuJ3QgbWl4IC5zZW5kKCkgYW5kIC5hdHRhY2goKVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChmaWVsZCwgZmlsZSwgb3B0aW9ucyB8fCBmaWxlLm5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcykge1xuICBpZiAodGhpcy5fc2hvdWxkUmV0cnkoZXJyLCByZXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JldHJ5KCk7XG4gIH1cblxuICBjb25zdCBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXG4gICAgJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nXG4gICk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVyci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vLyBUaGlzIG9ubHkgd2FybnMsIGJlY2F1c2UgdGhlIHJlcXVlc3QgaXMgc3RpbGwgbGlrZWx5IHRvIHdvcmtcblJlcXVlc3QucHJvdG90eXBlLmFnZW50ID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUud2FybignVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudDtcblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhO1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSAoKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQnXG4gICk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGU7XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBob3N0IG9iamVjdFxuICogQHJldHVybiB7Qm9vbGVhbn0gaXMgYSBob3N0IG9iamVjdFxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbihvYmopIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiAoXG4gICAgb2JqICYmXG4gICAgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiZcbiAgICAhQXJyYXkuaXNBcnJheShvYmopICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICk7XG59O1xuXG4vKipcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxuICogd2l0aCBhbiBpbnN0YW5jZW9mIGBSZXNwb25zZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihmbikge1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1dhcm5pbmc6IC5lbmQoKSB3YXMgY2FsbGVkIHR3aWNlLiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gc3VwZXJhZ2VudCdcbiAgICApO1xuICB9XG5cbiAgdGhpcy5fZW5kQ2FsbGVkID0gdHJ1ZTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gcXVlcnlzdHJpbmdcbiAgdGhpcy5fZmluYWxpemVRdWVyeVN0cmluZygpO1xuXG4gIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX3NldFVwbG9hZFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgLy8gdXBsb2FkIHRpbWVvdXQgaXQncyB3b2tycyBvbmx5IGlmIGRlYWRsaW5lIHRpbWVvdXQgaXMgb2ZmXG4gIGlmICh0aGlzLl91cGxvYWRUaW1lb3V0ICYmICF0aGlzLl91cGxvYWRUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl91cGxvYWRUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcihcbiAgICAgICAgJ1VwbG9hZCB0aW1lb3V0IG9mICcsXG4gICAgICAgIHNlbGYuX3VwbG9hZFRpbWVvdXQsXG4gICAgICAgICdFVElNRURPVVQnXG4gICAgICApO1xuICAgIH0sIHRoaXMuX3VwbG9hZFRpbWVvdXQpO1xuICB9XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fYWJvcnRlZClcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhcbiAgICAgIG5ldyBFcnJvcignVGhlIHJlcXVlc3QgaGFzIGJlZW4gYWJvcnRlZCBldmVuIGJlZm9yZSAuZW5kKCkgd2FzIGNhbGxlZCcpXG4gICAgKTtcblxuICBjb25zdCBzZWxmID0gdGhpcztcbiAgdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICBjb25zdCB7IHhociB9ID0gdGhpcztcbiAgbGV0IGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIHRoaXMuX3NldFRpbWVvdXRzKCk7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyByZWFkeVN0YXRlIH0gPSB4aHI7XG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG5cbiAgICBpZiAocmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICBsZXQgc3RhdHVzO1xuICAgIHRyeSB7XG4gICAgICBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgIH0gY2F0Y2gge1xuICAgICAgc3RhdHVzID0gMDtcbiAgICB9XG5cbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgaWYgKHNlbGYudGltZWRvdXQgfHwgc2VsZi5fYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgcmV0dXJuIHNlbGYuY3Jvc3NEb21haW5FcnJvcigpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgY29uc3QgaGFuZGxlUHJvZ3Jlc3MgPSAoZGlyZWN0aW9uLCBlKSA9PiB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcblxuICAgICAgaWYgKGUucGVyY2VudCA9PT0gMTAwKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzZWxmLl91cGxvYWRUaW1lb3V0VGltZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcblxuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKSk7XG4gICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ3Byb2dyZXNzJyxcbiAgICAgICAgICBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICBpZiAoeGhyLnVwbG9hZCkge1xuICAgIHRoaXMuX3NldFVwbG9hZFRpbWVvdXQoKTtcbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gc2VlICMxMTQ5XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoXG4gICAgIXRoaXMuX2Zvcm1EYXRhICYmXG4gICAgdGhpcy5tZXRob2QgIT09ICdHRVQnICYmXG4gICAgdGhpcy5tZXRob2QgIT09ICdIRUFEJyAmJlxuICAgIHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJlxuICAgICF0aGlzLl9pc0hvc3QoZGF0YSlcbiAgKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgY29uc3QgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGxldCBzZXJpYWxpemUgPVxuICAgICAgdGhpcy5fc2VyaWFsaXplciB8fFxuICAgICAgcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuICAgIGlmICghc2VyaWFsaXplICYmIGlzSlNPTihjb250ZW50VHlwZSkpIHtcbiAgICAgIHNlcmlhbGl6ZSA9IHJlcXVlc3Quc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgfVxuXG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAoY29uc3QgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJbZmllbGRdID09PSBudWxsKSBjb250aW51ZTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5oZWFkZXIsIGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkYXRhKTtcbn07XG5cbnJlcXVlc3QuYWdlbnQgPSAoKSA9PiBuZXcgQWdlbnQoKTtcblxuWydHRVQnLCAnUE9TVCcsICdPUFRJT05TJywgJ1BBVENIJywgJ1BVVCcsICdERUxFVEUnXS5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gIEFnZW50LnByb3RvdHlwZVttZXRob2QudG9Mb3dlckNhc2UoKV0gPSBmdW5jdGlvbih1cmwsIGZuKSB7XG4gICAgY29uc3QgcmVxID0gbmV3IHJlcXVlc3QuUmVxdWVzdChtZXRob2QsIHVybCk7XG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVxKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHJlcS5lbmQoZm4pO1xuICAgIH1cblxuICAgIHJldHVybiByZXE7XG4gIH07XG59KTtcblxuQWdlbnQucHJvdG90eXBlLmRlbCA9IEFnZW50LnByb3RvdHlwZS5kZWxldGU7XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdPUFRJT05TJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKSB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxuXG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn1cblxucmVxdWVzdC5kZWwgPSBkZWw7XG5yZXF1ZXN0LmRlbGV0ZSA9IGRlbDtcblxuLyoqXG4gKiBQQVRDSCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBvc3QgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQVVQgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucHV0ID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcbiJdfQ==

/***/ }),
/* 36 */
/*!******************************************!*\
  !*** ./~/superagent/lib/request-base.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(/*! ./is-object */ 15);
	/**
	 * Expose `RequestBase`.
	 */


	module.exports = RequestBase;
	/**
	 * Initialize a new `RequestBase`.
	 *
	 * @api public
	 */

	function RequestBase(obj) {
	  if (obj) return mixin(obj);
	}
	/**
	 * Mixin the prototype properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */


	function mixin(obj) {
	  for (var key in RequestBase.prototype) {
	    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) obj[key] = RequestBase.prototype[key];
	  }

	  return obj;
	}
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.clearTimeout = function () {
	  clearTimeout(this._timer);
	  clearTimeout(this._responseTimeoutTimer);
	  clearTimeout(this._uploadTimeoutTimer);
	  delete this._timer;
	  delete this._responseTimeoutTimer;
	  delete this._uploadTimeoutTimer;
	  return this;
	};
	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */


	RequestBase.prototype.parse = function (fn) {
	  this._parser = fn;
	  return this;
	};
	/**
	 * Set format of binary response body.
	 * In browser valid formats are 'blob' and 'arraybuffer',
	 * which return Blob and ArrayBuffer, respectively.
	 *
	 * In Node all values result in Buffer.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.responseType = function (val) {
	  this._responseType = val;
	  return this;
	};
	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */


	RequestBase.prototype.serialize = function (fn) {
	  this._serializer = fn;
	  return this;
	};
	/**
	 * Set timeouts.
	 *
	 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
	 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
	 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
	 *
	 * Value of 0 or false means no timeout.
	 *
	 * @param {Number|Object} ms or {response, deadline}
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.timeout = function (options) {
	  if (!options || _typeof(options) !== 'object') {
	    this._timeout = options;
	    this._responseTimeout = 0;
	    this._uploadTimeout = 0;
	    return this;
	  }

	  for (var option in options) {
	    if (Object.prototype.hasOwnProperty.call(options, option)) {
	      switch (option) {
	        case 'deadline':
	          this._timeout = options.deadline;
	          break;

	        case 'response':
	          this._responseTimeout = options.response;
	          break;

	        case 'upload':
	          this._uploadTimeout = options.upload;
	          break;

	        default:
	          console.warn('Unknown timeout option', option);
	      }
	    }
	  }

	  return this;
	};
	/**
	 * Set number of retry attempts on error.
	 *
	 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
	 *
	 * @param {Number} count
	 * @param {Function} [fn]
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.retry = function (count, fn) {
	  // Default to 1 if no count passed or true
	  if (arguments.length === 0 || count === true) count = 1;
	  if (count <= 0) count = 0;
	  this._maxRetries = count;
	  this._retries = 0;
	  this._retryCallback = fn;
	  return this;
	};

	var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];
	/**
	 * Determine if a request should be retried.
	 * (Borrowed from segmentio/superagent-retry)
	 *
	 * @param {Error} err an error
	 * @param {Response} [res] response
	 * @returns {Boolean} if segment should be retried
	 */

	RequestBase.prototype._shouldRetry = function (err, res) {
	  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
	    return false;
	  }

	  if (this._retryCallback) {
	    try {
	      var override = this._retryCallback(err, res);

	      if (override === true) return true;
	      if (override === false) return false; // undefined falls back to defaults
	    } catch (err_) {
	      console.error(err_);
	    }
	  }

	  if (res && res.status && res.status >= 500 && res.status !== 501) return true;

	  if (err) {
	    if (err.code && ERROR_CODES.includes(err.code)) return true; // Superagent timeout

	    if (err.timeout && err.code === 'ECONNABORTED') return true;
	    if (err.crossDomain) return true;
	  }

	  return false;
	};
	/**
	 * Retry request
	 *
	 * @return {Request} for chaining
	 * @api private
	 */


	RequestBase.prototype._retry = function () {
	  this.clearTimeout(); // node

	  if (this.req) {
	    this.req = null;
	    this.req = this.request();
	  }

	  this._aborted = false;
	  this.timedout = false;
	  this.timedoutError = null;
	  return this._end();
	};
	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} [reject]
	 * @return {Request}
	 */


	RequestBase.prototype.then = function (resolve, reject) {
	  var _this = this;

	  if (!this._fullfilledPromise) {
	    var self = this;

	    if (this._endCalled) {
	      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
	    }

	    this._fullfilledPromise = new Promise(function (resolve, reject) {
	      self.on('abort', function () {
	        if (_this._maxRetries && _this._maxRetries > _this._retries) {
	          return;
	        }

	        if (_this.timedout && _this.timedoutError) {
	          reject(_this.timedoutError);
	          return;
	        }

	        var err = new Error('Aborted');
	        err.code = 'ABORTED';
	        err.status = _this.status;
	        err.method = _this.method;
	        err.url = _this.url;
	        reject(err);
	      });
	      self.end(function (err, res) {
	        if (err) reject(err);else resolve(res);
	      });
	    });
	  }

	  return this._fullfilledPromise.then(resolve, reject);
	};

	RequestBase.prototype.catch = function (cb) {
	  return this.then(undefined, cb);
	};
	/**
	 * Allow for extension
	 */


	RequestBase.prototype.use = function (fn) {
	  fn(this);
	  return this;
	};

	RequestBase.prototype.ok = function (cb) {
	  if (typeof cb !== 'function') throw new Error('Callback required');
	  this._okCallback = cb;
	  return this;
	};

	RequestBase.prototype._isResponseOK = function (res) {
	  if (!res) {
	    return false;
	  }

	  if (this._okCallback) {
	    return this._okCallback(res);
	  }

	  return res.status >= 200 && res.status < 300;
	};
	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */


	RequestBase.prototype.get = function (field) {
	  return this._header[field.toLowerCase()];
	};
	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */


	RequestBase.prototype.getHeader = RequestBase.prototype.get;
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.set = function (field, val) {
	  if (isObject(field)) {
	    for (var key in field) {
	      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
	    }

	    return this;
	  }

	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field field name
	 */


	RequestBase.prototype.unset = function (field) {
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	/**
	 * Write the field `name` and `val`, or multiple fields with one object
	 * for "multipart/form-data" request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 *
	 * request.post('/upload')
	 *   .field({ foo: 'bar', baz: 'qux' })
	 *   .end(callback);
	 * ```
	 *
	 * @param {String|Object} name name of field
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.field = function (name, val) {
	  // name should be either a string or an object.
	  if (name === null || undefined === name) {
	    throw new Error('.field(name, val) name can not be empty');
	  }

	  if (this._data) {
	    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
	  }

	  if (isObject(name)) {
	    for (var key in name) {
	      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
	    }

	    return this;
	  }

	  if (Array.isArray(val)) {
	    for (var i in val) {
	      if (Object.prototype.hasOwnProperty.call(val, i)) this.field(name, val[i]);
	    }

	    return this;
	  } // val should be defined now


	  if (val === null || undefined === val) {
	    throw new Error('.field(name, val) val can not be empty');
	  }

	  if (typeof val === 'boolean') {
	    val = String(val);
	  }

	  this._getFormData().append(name, val);

	  return this;
	};
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request} request
	 * @api public
	 */


	RequestBase.prototype.abort = function () {
	  if (this._aborted) {
	    return this;
	  }

	  this._aborted = true;
	  if (this.xhr) this.xhr.abort(); // browser

	  if (this.req) this.req.abort(); // node

	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
	  switch (options.type) {
	    case 'basic':
	      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
	      break;

	    case 'auto':
	      this.username = user;
	      this.password = pass;
	      break;

	    case 'bearer':
	      // usage would be .auth(accessToken, { type: 'bearer' })
	      this.set('Authorization', "Bearer ".concat(user));
	      break;

	    default:
	      break;
	  }

	  return this;
	};
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */


	RequestBase.prototype.withCredentials = function (on) {
	  // This is browser-only functionality. Node side is no-op.
	  if (on === undefined) on = true;
	  this._withCredentials = on;
	  return this;
	};
	/**
	 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.redirects = function (n) {
	  this._maxRedirects = n;
	  return this;
	};
	/**
	 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
	 * Default 200MB.
	 *
	 * @param {Number} n number of bytes
	 * @return {Request} for chaining
	 */


	RequestBase.prototype.maxResponseSize = function (n) {
	  if (typeof n !== 'number') {
	    throw new TypeError('Invalid argument');
	  }

	  this._maxResponseSize = n;
	  return this;
	};
	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */


	RequestBase.prototype.toJSON = function () {
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};
	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	// eslint-disable-next-line complexity


	RequestBase.prototype.send = function (data) {
	  var isObj = isObject(data);
	  var type = this._header['content-type'];

	  if (this._formData) {
	    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
	  }

	  if (isObj && !this._data) {
	    if (Array.isArray(data)) {
	      this._data = [];
	    } else if (!this._isHost(data)) {
	      this._data = {};
	    }
	  } else if (data && this._data && this._isHost(this._data)) {
	    throw new Error("Can't merge these send calls");
	  } // merge


	  if (isObj && isObject(this._data)) {
	    for (var key in data) {
	      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
	    }
	  } else if (typeof data === 'string') {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];

	    if (type === 'application/x-www-form-urlencoded') {
	      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!isObj || this._isHost(data)) {
	    return this;
	  } // default to json


	  if (!type) this.type('json');
	  return this;
	};
	/**
	 * Sort `querystring` by the sort function
	 *
	 *
	 * Examples:
	 *
	 *       // default order
	 *       request.get('/user')
	 *         .query('name=Nick')
	 *         .query('search=Manny')
	 *         .sortQuery()
	 *         .end(callback)
	 *
	 *       // customized sort function
	 *       request.get('/user')
	 *         .query('name=Nick')
	 *         .query('search=Manny')
	 *         .sortQuery(function(a, b){
	 *           return a.length - b.length;
	 *         })
	 *         .end(callback)
	 *
	 *
	 * @param {Function} sort
	 * @return {Request} for chaining
	 * @api public
	 */


	RequestBase.prototype.sortQuery = function (sort) {
	  // _sort default to true but otherwise can be a function or boolean
	  this._sort = typeof sort === 'undefined' ? true : sort;
	  return this;
	};
	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */


	RequestBase.prototype._finalizeQueryString = function () {
	  var query = this._query.join('&');

	  if (query) {
	    this.url += (this.url.includes('?') ? '&' : '?') + query;
	  }

	  this._query.length = 0; // Makes the call idempotent

	  if (this._sort) {
	    var index = this.url.indexOf('?');

	    if (index >= 0) {
	      var queryArr = this.url.slice(index + 1).split('&');

	      if (typeof this._sort === 'function') {
	        queryArr.sort(this._sort);
	      } else {
	        queryArr.sort();
	      }

	      this.url = this.url.slice(0, index) + '?' + queryArr.join('&');
	    }
	  }
	}; // For backwards compat only


	RequestBase.prototype._appendQueryString = function () {
	  console.warn('Unsupported');
	};
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */


	RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
	  if (this._aborted) {
	    return;
	  }

	  var err = new Error("".concat(reason + timeout, "ms exceeded"));
	  err.timeout = timeout;
	  err.code = 'ECONNABORTED';
	  err.errno = errno;
	  this.timedout = true;
	  this.timedoutError = err;
	  this.abort();
	  this.callback(err);
	};

	RequestBase.prototype._setTimeouts = function () {
	  var self = this; // deadline

	  if (this._timeout && !this._timer) {
	    this._timer = setTimeout(function () {
	      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
	    }, this._timeout);
	  } // response timeout


	  if (this._responseTimeout && !this._responseTimeoutTimer) {
	    this._responseTimeoutTimer = setTimeout(function () {
	      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
	    }, this._responseTimeout);
	  }
	};
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LWJhc2UuanMiXSwibmFtZXMiOlsiaXNPYmplY3QiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlcXVlc3RCYXNlIiwib2JqIiwibWl4aW4iLCJrZXkiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJjbGVhclRpbWVvdXQiLCJfdGltZXIiLCJfcmVzcG9uc2VUaW1lb3V0VGltZXIiLCJfdXBsb2FkVGltZW91dFRpbWVyIiwicGFyc2UiLCJmbiIsIl9wYXJzZXIiLCJyZXNwb25zZVR5cGUiLCJ2YWwiLCJfcmVzcG9uc2VUeXBlIiwic2VyaWFsaXplIiwiX3NlcmlhbGl6ZXIiLCJ0aW1lb3V0Iiwib3B0aW9ucyIsIl90aW1lb3V0IiwiX3Jlc3BvbnNlVGltZW91dCIsIl91cGxvYWRUaW1lb3V0Iiwib3B0aW9uIiwiZGVhZGxpbmUiLCJyZXNwb25zZSIsInVwbG9hZCIsImNvbnNvbGUiLCJ3YXJuIiwicmV0cnkiLCJjb3VudCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIl9tYXhSZXRyaWVzIiwiX3JldHJpZXMiLCJfcmV0cnlDYWxsYmFjayIsIkVSUk9SX0NPREVTIiwiX3Nob3VsZFJldHJ5IiwiZXJyIiwicmVzIiwib3ZlcnJpZGUiLCJlcnJfIiwiZXJyb3IiLCJzdGF0dXMiLCJjb2RlIiwiaW5jbHVkZXMiLCJjcm9zc0RvbWFpbiIsIl9yZXRyeSIsInJlcSIsInJlcXVlc3QiLCJfYWJvcnRlZCIsInRpbWVkb3V0IiwidGltZWRvdXRFcnJvciIsIl9lbmQiLCJ0aGVuIiwicmVzb2x2ZSIsInJlamVjdCIsIl9mdWxsZmlsbGVkUHJvbWlzZSIsInNlbGYiLCJfZW5kQ2FsbGVkIiwiUHJvbWlzZSIsIm9uIiwiRXJyb3IiLCJtZXRob2QiLCJ1cmwiLCJlbmQiLCJjYXRjaCIsImNiIiwidW5kZWZpbmVkIiwidXNlIiwib2siLCJfb2tDYWxsYmFjayIsIl9pc1Jlc3BvbnNlT0siLCJnZXQiLCJmaWVsZCIsIl9oZWFkZXIiLCJ0b0xvd2VyQ2FzZSIsImdldEhlYWRlciIsInNldCIsImhlYWRlciIsInVuc2V0IiwibmFtZSIsIl9kYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsIlN0cmluZyIsIl9nZXRGb3JtRGF0YSIsImFwcGVuZCIsImFib3J0IiwieGhyIiwiZW1pdCIsIl9hdXRoIiwidXNlciIsInBhc3MiLCJiYXNlNjRFbmNvZGVyIiwidHlwZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJfd2l0aENyZWRlbnRpYWxzIiwicmVkaXJlY3RzIiwibiIsIl9tYXhSZWRpcmVjdHMiLCJtYXhSZXNwb25zZVNpemUiLCJUeXBlRXJyb3IiLCJfbWF4UmVzcG9uc2VTaXplIiwidG9KU09OIiwiZGF0YSIsImhlYWRlcnMiLCJzZW5kIiwiaXNPYmoiLCJfZm9ybURhdGEiLCJfaXNIb3N0Iiwic29ydFF1ZXJ5Iiwic29ydCIsIl9zb3J0IiwiX2ZpbmFsaXplUXVlcnlTdHJpbmciLCJxdWVyeSIsIl9xdWVyeSIsImpvaW4iLCJpbmRleCIsImluZGV4T2YiLCJxdWVyeUFyciIsInNsaWNlIiwic3BsaXQiLCJfYXBwZW5kUXVlcnlTdHJpbmciLCJfdGltZW91dEVycm9yIiwicmVhc29uIiwiZXJybm8iLCJjYWxsYmFjayIsIl9zZXRUaW1lb3V0cyIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0EsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF4QjtBQUVBOzs7OztBQUlBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLFdBQWpCO0FBRUE7Ozs7OztBQU1BLFNBQVNBLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQ3hCLE1BQUlBLEdBQUosRUFBUyxPQUFPQyxLQUFLLENBQUNELEdBQUQsQ0FBWjtBQUNWO0FBRUQ7Ozs7Ozs7OztBQVFBLFNBQVNDLEtBQVQsQ0FBZUQsR0FBZixFQUFvQjtBQUNsQixPQUFLLElBQU1FLEdBQVgsSUFBa0JI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LEVBRXJCLEtBQUtBLFFBRmdCLENBQXhCO0FBR0QsR0FSNkMsQ0FVOUM7OztBQUNBLE1BQUksS0FBS0MsZ0JBQUwsSUFBeUIsQ0FBQyxLQUFLYixxQkFBbkMsRUFBMEQ7QUFDeEQsU0FBS0EscUJBQUwsR0FBNkI0SCxVQUFVLENBQUMsWUFBTTtBQUM1QzFFLE1BQUFBLElBQUksQ0FBQ3FFLGFBQUwsQ0FDRSxzQkFERixFQUVFckUsSUFBSSxDQUFDckMsZ0JBRlAsRUFHRSxXQUhGO0FBS0QsS0FOc0MsRUFNcEMsS0FBS0EsZ0JBTitCLENBQXZDO0FBT0Q7QUFDRixDQXBCRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIG9mIG1peGVkLWluIGZ1bmN0aW9ucyBzaGFyZWQgYmV0d2VlbiBub2RlIGFuZCBjbGllbnQgY29kZVxuICovXG5jb25zdCBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0QmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0QmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFJlcXVlc3RCYXNlLnByb3RvdHlwZSwga2V5KSlcbiAgICAgIG9ialtrZXldID0gUmVxdWVzdEJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3VwbG9hZFRpbWVvdXRUaW1lcik7XG4gIGRlbGV0ZSB0aGlzLl90aW1lcjtcbiAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyO1xuICBkZWxldGUgdGhpcy5fdXBsb2FkVGltZW91dFRpbWVyO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXNwb25zZSBib2R5IHBhcnNlclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBpbmNvbWluZyBkYXRhIGludG8gcmVxdWVzdC5ib2R5XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oZm4pIHtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZm9ybWF0IG9mIGJpbmFyeSByZXNwb25zZSBib2R5LlxuICogSW4gYnJvd3NlciB2YWxpZCBmb3JtYXRzIGFyZSAnYmxvYicgYW5kICdhcnJheWJ1ZmZlcicsXG4gKiB3aGljaCByZXR1cm4gQmxvYiBhbmQgQXJyYXlCdWZmZXIsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJbiBOb2RlIGFsbCB2YWx1ZXMgcmVzdWx0IGluIEJ1ZmZlci5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5yZXNwb25zZVR5cGUoJ2Jsb2InKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24odmFsKSB7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oZm4pIHtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqIC0gdXBsb2FkIGlzIHRoZSB0aW1lICBzaW5jZSBsYXN0IGJpdCBvZiBkYXRhIHdhcyBzZW50IG9yIHJlY2VpdmVkLiBUaGlzIHRpbWVvdXQgd29ya3Mgb25seSBpZiBkZWFkbGluZSB0aW1lb3V0IGlzIG9mZlxuICpcbiAqIFZhbHVlIG9mIDAgb3IgZmFsc2UgbWVhbnMgbm8gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IG1zIG9yIHtyZXNwb25zZSwgZGVhZGxpbmV9XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHRoaXMuX3VwbG9hZFRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgb3B0aW9uKSkge1xuICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndXBsb2FkJzpcbiAgICAgICAgICB0aGlzLl91cGxvYWRUaW1lb3V0ID0gb3B0aW9ucy51cGxvYWQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIHRpbWVvdXQgb3B0aW9uJywgb3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24oY291bnQsIGZuKSB7XG4gIC8vIERlZmF1bHQgdG8gMSBpZiBubyBjb3VudCBwYXNzZWQgb3IgdHJ1ZVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBjb3VudCA9PT0gdHJ1ZSkgY291bnQgPSAxO1xuICBpZiAoY291bnQgPD0gMCkgY291bnQgPSAwO1xuICB0aGlzLl9tYXhSZXRyaWVzID0gY291bnQ7XG4gIHRoaXMuX3JldHJpZXMgPSAwO1xuICB0aGlzLl9yZXRyeUNhbGxiYWNrID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgRVJST1JfQ09ERVMgPSBbJ0VDT05OUkVTRVQnLCAnRVRJTUVET1VUJywgJ0VBRERSSU5GTycsICdFU09DS0VUVElNRURPVVQnXTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIGFuIGVycm9yXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXSByZXNwb25zZVxuICogQHJldHVybnMge0Jvb2xlYW59IGlmIHNlZ21lbnQgc2hvdWxkIGJlIHJldHJpZWRcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zaG91bGRSZXRyeSA9IGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gIGlmICghdGhpcy5fbWF4UmV0cmllcyB8fCB0aGlzLl9yZXRyaWVzKysgPj0gdGhpcy5fbWF4UmV0cmllcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZXRyeUNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gdGhpcy5fcmV0cnlDYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKG92ZXJyaWRlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gdW5kZWZpbmVkIGZhbGxzIGJhY2sgdG8gZGVmYXVsdHNcbiAgICB9IGNhdGNoIChlcnJfKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycl8pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyZXMgJiYgcmVzLnN0YXR1cyAmJiByZXMuc3RhdHVzID49IDUwMCAmJiByZXMuc3RhdHVzICE9PSA1MDEpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyKSB7XG4gICAgaWYgKGVyci5jb2RlICYmIEVSUk9SX0NPREVTLmluY2x1ZGVzKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gICAgLy8gU3VwZXJhZ2VudCB0aW1lb3V0XG4gICAgaWYgKGVyci50aW1lb3V0ICYmIGVyci5jb2RlID09PSAnRUNPTk5BQk9SVEVEJykgcmV0dXJuIHRydWU7XG4gICAgaWYgKGVyci5jcm9zc0RvbWFpbikgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAvLyBub2RlXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXRFcnJvciA9IG51bGw7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVqZWN0XVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICBpZiAoIXRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNlbGYub24oJ2Fib3J0JywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fbWF4UmV0cmllcyAmJiB0aGlzLl9tYXhSZXRyaWVzID4gdGhpcy5fcmV0cmllcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVkb3V0ICYmIHRoaXMudGltZWRvdXRFcnJvcikge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnRpbWVkb3V0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignQWJvcnRlZCcpO1xuICAgICAgICBlcnIuY29kZSA9ICdBQk9SVEVEJztcbiAgICAgICAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICAgICAgICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gICAgICAgIGVyci51cmwgPSB0aGlzLnVybDtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihjYikge1xuICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2IpO1xufTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uKGNiKSB7XG4gIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBFcnJvcignQ2FsbGJhY2sgcmVxdWlyZWQnKTtcbiAgdGhpcy5fb2tDYWxsYmFjayA9IGNiO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5faXNSZXNwb25zZU9LID0gZnVuY3Rpb24ocmVzKSB7XG4gIGlmICghcmVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX29rQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fb2tDYWxsYmFjayhyZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDA7XG59O1xuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKSB7XG4gIGlmIChpc09iamVjdChmaWVsZCkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWVsZCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmaWVsZCwga2V5KSlcbiAgICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGQgZmllbGQgbmFtZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCkge1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3RcbiAqIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCh7IGZvbzogJ2JhcicsIGJhejogJ3F1eCcgfSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG5hbWUgbmFtZSBvZiBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWwgdmFsdWUgb2YgZmllbGRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gIC8vIG5hbWUgc2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBhbiBvYmplY3QuXG4gIGlmIChuYW1lID09PSBudWxsIHx8IHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiLmZpZWxkKCkgY2FuJ3QgYmUgdXNlZCBpZiAuc2VuZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIlxuICAgICk7XG4gIH1cblxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuYW1lKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5hbWUsIGtleSkpXG4gICAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIGZvciAoY29uc3QgaSBpbiB2YWwpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsLCBpKSlcbiAgICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWxbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdmFsIHNob3VsZCBiZSBkZWZpbmVkIG5vd1xuICBpZiAodmFsID09PSBudWxsIHx8IHVuZGVmaW5lZCA9PT0gdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSB2YWwgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgIHZhbCA9IFN0cmluZyh2YWwpO1xuICB9XG5cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gdHJ1ZTtcbiAgaWYgKHRoaXMueGhyKSB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIGlmICh0aGlzLnJlcSkgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucywgYmFzZTY0RW5jb2Rlcikge1xuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJhc2ljICR7YmFzZTY0RW5jb2RlcihgJHt1c2VyfToke3Bhc3N9YCl9YCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYmVhcmVyJzogLy8gdXNhZ2Ugd291bGQgYmUgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3VzZXJ9YCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKSB7XG4gIC8vIFRoaXMgaXMgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uYWxpdHkuIE5vZGUgc2lkZSBpcyBuby1vcC5cbiAgaWYgKG9uID09PSB1bmRlZmluZWQpIG9uID0gdHJ1ZTtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heCByZWRpcmVjdHMgdG8gYG5gLiBEb2VzIG5vdGhpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obikge1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWF4aW11bSBzaXplIG9mIGJ1ZmZlcmVkIHJlc3BvbnNlIGJvZHksIGluIGJ5dGVzLiBDb3VudHMgdW5jb21wcmVzc2VkIHNpemUuXG4gKiBEZWZhdWx0IDIwME1CLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIG51bWJlciBvZiBieXRlc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5tYXhSZXNwb25zZVNpemUgPSBmdW5jdGlvbihuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gIH1cblxuICB0aGlzLl9tYXhSZXNwb25zZVNpemUgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29udmVydCB0byBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IChub3QgSlNPTiBzdHJpbmcpIG9mIHNjYWxhciBwcm9wZXJ0aWVzLlxuICogTm90ZSBhcyB0aGlzIG1ldGhvZCBpcyBkZXNpZ25lZCB0byByZXR1cm4gYSB1c2VmdWwgbm9uLXRoaXMgdmFsdWUsXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlc2NyaWJpbmcgbWV0aG9kLCB1cmwsIGFuZCBkYXRhIG9mIHRoaXMgcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyXG4gIH07XG59O1xuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgY29uc3QgaXNPYmogPSBpc09iamVjdChkYXRhKTtcbiAgbGV0IHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuXG4gIGlmICh0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCJcbiAgICApO1xuICB9XG5cbiAgaWYgKGlzT2JqICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpXG4gICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZGVmYXVsdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGlmICh0eXBlID09PSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGEgPyBgJHt0aGlzLl9kYXRhfSYke2RhdGF9YCA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNvcnQgYHF1ZXJ5c3RyaW5nYCBieSB0aGUgc29ydCBmdW5jdGlvblxuICpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0IG9yZGVyXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeSgpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gY3VzdG9taXplZCBzb3J0IGZ1bmN0aW9uXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeShmdW5jdGlvbihhLCBiKXtcbiAqICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAqICAgICAgICAgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zb3J0UXVlcnkgPSBmdW5jdGlvbihzb3J0KSB7XG4gIC8vIF9zb3J0IGRlZmF1bHQgdG8gdHJ1ZSBidXQgb3RoZXJ3aXNlIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIGJvb2xlYW5cbiAgdGhpcy5fc29ydCA9IHR5cGVvZiBzb3J0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBzb3J0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcG9zZSBxdWVyeXN0cmluZyB0byBhcHBlbmQgdG8gcmVxLnVybFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2ZpbmFsaXplUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmNsdWRlcygnPycpID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG5cbiAgdGhpcy5fcXVlcnkubGVuZ3RoID0gMDsgLy8gTWFrZXMgdGhlIGNhbGwgaWRlbXBvdGVudFxuXG4gIGlmICh0aGlzLl9zb3J0KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IHF1ZXJ5QXJyID0gdGhpcy51cmwuc2xpY2UoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9zb3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQodGhpcy5fc29ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeUFyci5zb3J0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc2xpY2UoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnIuam9pbignJicpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRm9yIGJhY2t3YXJkcyBjb21wYXQgb25seVxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZyA9ICgpID0+IHtcbiAgY29uc29sZS53YXJuKCdVbnN1cHBvcnRlZCcpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fdGltZW91dEVycm9yID0gZnVuY3Rpb24ocmVhc29uLCB0aW1lb3V0LCBlcnJubykge1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgJHtyZWFzb24gKyB0aW1lb3V0fW1zIGV4Y2VlZGVkYCk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyLmVycm5vID0gZXJybm87XG4gIHRoaXMudGltZWRvdXQgPSB0cnVlO1xuICB0aGlzLnRpbWVkb3V0RXJyb3IgPSBlcnI7XG4gIHRoaXMuYWJvcnQoKTtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBzZWxmID0gdGhpcztcblxuICAvLyBkZWFkbGluZVxuICBpZiAodGhpcy5fdGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdUaW1lb3V0IG9mICcsIHNlbGYuX3RpbWVvdXQsICdFVElNRScpO1xuICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICB9XG5cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoXG4gICAgICAgICdSZXNwb25zZSB0aW1lb3V0IG9mICcsXG4gICAgICAgIHNlbGYuX3Jlc3BvbnNlVGltZW91dCxcbiAgICAgICAgJ0VUSU1FRE9VVCdcbiAgICAgICk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufTtcbiJdfQ==

/***/ }),
/* 37 */
/*!*******************************************!*\
  !*** ./~/superagent/lib/response-base.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Module dependencies.
	 */
	var utils = __webpack_require__(/*! ./utils */ 38);
	/**
	 * Expose `ResponseBase`.
	 */


	module.exports = ResponseBase;
	/**
	 * Initialize a new `ResponseBase`.
	 *
	 * @api public
	 */

	function ResponseBase(obj) {
	  if (obj) return mixin(obj);
	}
	/**
	 * Mixin the prototype properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */


	function mixin(obj) {
	  for (var key in ResponseBase.prototype) {
	    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
	  }

	  return obj;
	}
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */


	ResponseBase.prototype.get = function (field) {
	  return this.header[field.toLowerCase()];
	};
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */


	ResponseBase.prototype._setHeaderProperties = function (header) {
	  // TODO: moar!
	  // TODO: make this a util
	  // content-type
	  var ct = header['content-type'] || '';
	  this.type = utils.type(ct); // params

	  var params = utils.params(ct);

	  for (var key in params) {
	    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
	  }

	  this.links = {}; // links

	  try {
	    if (header.link) {
	      this.links = utils.parseLinks(header.link);
	    }
	  } catch (_unused) {// ignore
	  }
	};
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */


	ResponseBase.prototype._setStatusProperties = function (status) {
	  var type = status / 100 | 0; // status / class

	  this.statusCode = status;
	  this.status = this.statusCode;
	  this.statusType = type; // basics

	  this.info = type === 1;
	  this.ok = type === 2;
	  this.redirect = type === 3;
	  this.clientError = type === 4;
	  this.serverError = type === 5;
	  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

	  this.created = status === 201;
	  this.accepted = status === 202;
	  this.noContent = status === 204;
	  this.badRequest = status === 400;
	  this.unauthorized = status === 401;
	  this.notAcceptable = status === 406;
	  this.forbidden = status === 403;
	  this.notFound = status === 404;
	  this.unprocessableEntity = status === 422;
	};
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1iYXNlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJSZXNwb25zZUJhc2UiLCJvYmoiLCJtaXhpbiIsImtleSIsInByb3RvdHlwZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImdldCIsImZpZWxkIiwiaGVhZGVyIiwidG9Mb3dlckNhc2UiLCJfc2V0SGVhZGVyUHJvcGVydGllcyIsImN0IiwidHlwZSIsInBhcmFtcyIsImxpbmtzIiwibGluayIsInBhcnNlTGlua3MiLCJfc2V0U3RhdHVzUHJvcGVydGllcyIsInN0YXR1cyIsInN0YXR1c0NvZGUiLCJzdGF0dXNUeXBlIiwiaW5mbyIsIm9rIiwicmVkaXJlY3QiLCJjbGllbnRFcnJvciIsInNlcnZlckVycm9yIiwiZXJyb3IiLCJ0b0Vycm9yIiwiY3JlYXRlZCIsImFjY2VwdGVkIiwibm9Db250ZW50IiwiYmFkUmVxdWVzdCIsInVuYXV0aG9yaXplZCIsIm5vdEFjY2VwdGFibGUiLCJmb3JiaWRkZW4iLCJub3RGb3VuZCIsInVucHJvY2Vzc2FibGVFbnRpdHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUlBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7QUFFQTs7Ozs7QUFJQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxZQUFqQjtBQUVBOzs7Ozs7QUFNQSxTQUFTQSxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN6QixNQUFJQSxHQUFKLEVBQVMsT0FBT0MsS0FBSyxDQUFDRCxHQUFELENBQVo7QUFDVjtBQUVEOzs7Ozs7Ozs7QUFRQSxTQUFTQyxLQUFULENBQWVELEdBQWYsRUFBb0I7QUFDbEIsT0FBSyxJQUFNRSxHQUFYLElBQWtCSCxZQUFZLENBQUNJLFNBQS9CLEVBQTBDO0FBQ3hDLFFBQUlDLE1BQU0sQ0FBQ0QsU0FBUCxDQUFpQkUsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFD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LEdBQTJCbEIsTUFBTSxLQUFLLEdBQXRDO0FBQ0QsQ0ExQkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVzcG9uc2VCYXNlLnByb3RvdHlwZSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoUmVzcG9uc2VCYXNlLnByb3RvdHlwZSwga2V5KSlcbiAgICAgIG9ialtrZXldID0gUmVzcG9uc2VCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKSB7XG4gIC8vIFRPRE86IG1vYXIhXG4gIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcblxuICAvLyBjb250ZW50LXR5cGVcbiAgY29uc3QgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICB0aGlzLnR5cGUgPSB1dGlscy50eXBlKGN0KTtcblxuICAvLyBwYXJhbXNcbiAgY29uc3QgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJhbXMsIGtleSkpXG4gICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgfVxuXG4gIHRoaXMubGlua3MgPSB7fTtcblxuICAvLyBsaW5rc1xuICB0cnkge1xuICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cykge1xuICBjb25zdCB0eXBlID0gKHN0YXR1cyAvIDEwMCkgfCAwO1xuXG4gIC8vIHN0YXR1cyAvIGNsYXNzXG4gIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGU7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IHR5cGUgPT09IDE7XG4gIHRoaXMub2sgPSB0eXBlID09PSAyO1xuICB0aGlzLnJlZGlyZWN0ID0gdHlwZSA9PT0gMztcbiAgdGhpcy5jbGllbnRFcnJvciA9IHR5cGUgPT09IDQ7XG4gIHRoaXMuc2VydmVyRXJyb3IgPSB0eXBlID09PSA1O1xuICB0aGlzLmVycm9yID0gdHlwZSA9PT0gNCB8fCB0eXBlID09PSA1ID8gdGhpcy50b0Vycm9yKCkgOiBmYWxzZTtcblxuICAvLyBzdWdhclxuICB0aGlzLmNyZWF0ZWQgPSBzdGF0dXMgPT09IDIwMTtcbiAgdGhpcy5hY2NlcHRlZCA9IHN0YXR1cyA9PT0gMjAyO1xuICB0aGlzLm5vQ29udGVudCA9IHN0YXR1cyA9PT0gMjA0O1xuICB0aGlzLmJhZFJlcXVlc3QgPSBzdGF0dXMgPT09IDQwMDtcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSBzdGF0dXMgPT09IDQwMTtcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gc3RhdHVzID09PSA0MDY7XG4gIHRoaXMuZm9yYmlkZGVuID0gc3RhdHVzID09PSA0MDM7XG4gIHRoaXMubm90Rm91bmQgPSBzdGF0dXMgPT09IDQwNDtcbiAgdGhpcy51bnByb2Nlc3NhYmxlRW50aXR5ID0gc3RhdHVzID09PSA0MjI7XG59O1xuIl19

/***/ }),
/* 38 */
/*!***********************************!*\
  !*** ./~/superagent/lib/utils.js ***!
  \***********************************/
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	exports.type = function (str) {
	  return str.split(/ *; */).shift();
	};
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */


	exports.params = function (str) {
	  return str.split(/ *; */).reduce(function (obj, str) {
	    var parts = str.split(/ *= */);
	    var key = parts.shift();
	    var val = parts.shift();
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	/**
	 * Parse Link header fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */


	exports.parseLinks = function (str) {
	  return str.split(/ *, */).reduce(function (obj, str) {
	    var parts = str.split(/ *; */);
	    var url = parts[0].slice(1, -1);
	    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
	    obj[rel] = url;
	    return obj;
	  }, {});
	};
	/**
	 * Strip content related fields from `header`.
	 *
	 * @param {Object} header
	 * @return {Object} header
	 * @api private
	 */


	exports.cleanHeader = function (header, changesOrigin) {
	  delete header['content-type'];
	  delete header['content-length'];
	  delete header['transfer-encoding'];
	  delete header.host; // secuirty

	  if (changesOrigin) {
	    delete header.authorization;
	    delete header.cookie;
	  }

	  return header;
	};
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwidHlwZSIsInN0ciIsInNwbGl0Iiwic2hpZnQiLCJwYXJhbXMiLCJyZWR1Y2UiLCJvYmoiLCJwYXJ0cyIsImtleSIsInZhbCIsInBhcnNlTGlua3MiLCJ1cmwiLCJzbGljZSIsInJlbCIsImNsZWFuSGVhZGVyIiwiaGVhZGVyIiwiY2hhbmdlc09yaWdpbiIsImhvc3QiLCJhdXRob3JpemF0aW9uIiwiY29va2llIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBUUFBLE9BQU8sQ0FBQ0MsSUFBUixHQUFlLFVBQUFDLEdBQUc7QUFBQSxTQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxPQUFWLEVBQW1CQyxLQUFuQixFQUFKO0FBQUEsQ0FBbEI7QUFFQTs7Ozs7Ozs7O0FBUUFKLE9BQU8sQ0FBQ0ssTUFBUixHQUFpQixVQUFBSCxHQUFHO0FBQUEsU0FDbEJBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLE9BQVYsRUFBbUJHLE1BQW5CLENBQTBCLFVBQUNDLEdBQUQsRUFBTUwsR0FBTixFQUFjO0FBQ3RDLFFBQU1NLEtBQUssR0FBR04sR0FBRyxDQUFDQyxLQUFKLENBQVUsT0FBVixDQUFkO0FBQ0EsUUFBTU0sR0FBRyxHQUFHRCxLQUFLLENBQUNKLEtBQU4sRUFBWjtBQUNBLFFBQU1NLEdBQUcsR0FBR0YsS0FBSyxDQUFDSixLQUFOLEVBQVo7QUFFQSxRQUFJSyxHQUFHLElBQUlDLEdBQVgsRUFBZ0JILEdBQUcsQ0FBQ0UsR0FBRCxDQUFILEdBQVdDLEdBQVg7QUFDaEIsV0FBT0gsR0FBUDtBQUNELEdBUEQsRUFPRyxFQVBILENBRGtCO0FBQUEsQ0FBcEI7QUFVQTs7Ozs7Ozs7O0FBUUFQLE9BQU8sQ0FBQ1csVUFBUixHQUFxQixVQUFBVCxHQUFHO0FBQUEsU0FDdEJBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLE9BQVYsRUFBbUJHLE1BQW5CLENBQTBCLFVBQUNDLEdBQUQsRUFBTUwsR0FBTixFQUFjO0FBQ3RDLFFBQU1NLEtBQUssR0FBR04sR0FBRyxDQUFDQyxLQUFKLENBQVUsT0FBVixDQUFkO0FBQ0EsUUFBTVMsR0FBRyxHQUFHSixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNLLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLENBQUMsQ0FBbkIsQ0FBWjtBQUNBLFFBQU1DLEdBQUcsR0FBR04sS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTTCxLQUFULENBQWUsT0FBZixFQUF3QixDQUF4QixFQUEyQlUsS0FBM0IsQ0FBaUMsQ0FBakMsRUFBb0MsQ0FBQyxDQUFyQyxDQUFaO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sR0FBRCxDQUFILEdBQVdGLEdBQVg7QUFDQSxXQUFPTCxHQUFQO0FBQ0QsR0FORCxFQU1HLEVBTkgsQ0FEc0I7QUFBQSxDQUF4QjtBQVNBOzs7Ozs7Ozs7QUFRQVAsT0FBTyxDQUFDZSxXQUFSLEdBQXNCLFVBQUNDLE1BQUQsRUFBU0MsYUFBVCxFQUEyQjtBQUMvQyxTQUFPRCxNQUFNLENBQUMsY0FBRCxDQUFiO0FBQ0EsU0FBT0EsTUFBTSxDQUFDLGdCQUFELENBQWI7QUFDQSxTQUFPQSxNQUFNLENBQUMsbUJBQUQsQ0FBYjtBQUNBLFNBQU9BLE1BQU0sQ0FBQ0UsSUFBZCxDQUorQyxDQUsvQzs7QUFDQSxNQUFJRCxhQUFKLEVBQW1CO0FBQ2pCLFdBQU9ELE1BQU0sQ0FBQ0csYUFBZDtBQUNBLFdBQU9ILE1BQU0sQ0FBQ0ksTUFBZDtBQUNEOztBQUVELFNBQU9KLE1BQVA7QUFDRCxDQVpEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMudHlwZSA9IHN0ciA9PiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJhbXMgPSBzdHIgPT5cbiAgc3RyLnNwbGl0KC8gKjsgKi8pLnJlZHVjZSgob2JqLCBzdHIpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKTtcbiAgICBjb25zdCBrZXkgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIGNvbnN0IHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xuXG4vKipcbiAqIFBhcnNlIExpbmsgaGVhZGVyIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcnNlTGlua3MgPSBzdHIgPT5cbiAgc3RyLnNwbGl0KC8gKiwgKi8pLnJlZHVjZSgob2JqLCBzdHIpID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICBjb25zdCB1cmwgPSBwYXJ0c1swXS5zbGljZSgxLCAtMSk7XG4gICAgY29uc3QgcmVsID0gcGFydHNbMV0uc3BsaXQoLyAqPSAqLylbMV0uc2xpY2UoMSwgLTEpO1xuICAgIG9ialtyZWxdID0gdXJsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSAoaGVhZGVyLCBjaGFuZ2VzT3JpZ2luKSA9PiB7XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LWxlbmd0aCddO1xuICBkZWxldGUgaGVhZGVyWyd0cmFuc2Zlci1lbmNvZGluZyddO1xuICBkZWxldGUgaGVhZGVyLmhvc3Q7XG4gIC8vIHNlY3VpcnR5XG4gIGlmIChjaGFuZ2VzT3JpZ2luKSB7XG4gICAgZGVsZXRlIGhlYWRlci5hdXRob3JpemF0aW9uO1xuICAgIGRlbGV0ZSBoZWFkZXIuY29va2llO1xuICB9XG5cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG4iXX0=

/***/ }),
/* 39 */
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const api_1 = __webpack_require__(/*! ./utils/api */ 16);
	const config_1 = __webpack_require__(/*! ./config */ 4);
	const statistics_1 = __webpack_require__(/*! ./utils/statistics */ 74);
	const api = new api_1.Api(config_1.default.ENDPOINT);
	const _ = chrome.i18n.getMessage;
	let fast_mode = true;
	let slow_mode = false;
	const checker = () => {
	    const delay = (fast_mode ? config_1.default.API_SYNC_INTERVAL : config_1.default.API_SYNC_SLOW_INTERVAL) * 0.9;
	    chrome.storage.local.get('last_checked', (storage) => {
	        if (!storage.last_checked || Date.now() - storage.last_checked > delay) {
	            chrome.storage.local.set({ last_checked: Date.now() });
	            chrome.storage.local.get(['msgCount'], (storage) => {
	                api.getMailsList().then((list) => {
	                    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
	                    chrome.browserAction.setBadgeText({ text: list.length ? list.length.toString() : '' });
	                    if (parseInt(storage.msgCount, 10) !== list.length) {
	                        chrome.storage.local.set({ msgCount: list.length ? list.length : 0 });
	                    }
	                    if (parseInt(storage.msgCount, 10) < list.length) {
	                        chrome.notifications.create('tempMailExtensionId', { type: 'basic',
	                            iconUrl: 'img/128x128.png',
	                            title: _('new_mail_notification_header'),
	                            message: `${list.length} ${_('new_mail_notification_body')}`
	                        }, (id) => { });
	                    }
	                });
	            });
	        }
	    });
	};
	chrome.notifications.onClicked.addListener((id) => {
	    api.openReadMailTab();
	    chrome.notifications.clear(id);
	});
	const slow = function () {
	    fast_mode = false;
	    slow_mode = true;
	};
	const fast = function () {
	    fast_mode = true;
	    slow_mode = false;
	};
	setInterval(checker, config_1.default.API_SYNC_INTERVAL);
	const onUnload = function () {
	    setTimeout(slow, config_1.default.API_SYNC_DELAY);
	};
	chrome.storage.onChanged.addListener((storage) => {
	    if ('last_opened' in storage) {
	        fast();
	    }
	    if ('ping' in storage) {
	        setTimeout(onUnload, 3000);
	    }
	});
	chrome.browserAction.setPopup({ popup: 'popup.html' });
	chrome.tabs.onCreated.addListener(() => {
	    toggleAutofillInEmailInputs();
	});
	chrome.tabs.onUpdated.addListener(() => {
	    toggleAutofillInEmailInputs();
	});
	chrome.tabs.onActivated.addListener(() => {
	    toggleAutofillInEmailInputs();
	});
	function toggleAutofillInEmailInputs() {
	    chrome.storage.local.get('autofillEnabled', (storage) => {
	        let autofillEnabled = storage.autofillEnabled !== 0;
	        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
	            if (chrome.runtime.lastError) {
	                setTimeout(() => {
	                    toggleAutofillInEmailInputs();
	                }, 500);
	            }
	            else {
	                const re = new RegExp('^(http|https)://', 'i');
	                if (tabs && tabs[0] && tabs[0].url && re.test(tabs[0].url)) {
	                    const url = new URL(tabs[0].url);
	                    const domain = url.hostname;
	                    if (autofillEnabled) {
	                        chrome.storage.local.get('autofillExceptionsList', (storage) => {
	                            const autofillExceptionsList = storage.autofillExceptionsList ? storage.autofillExceptionsList : {};
	                            autofillEnabled = !autofillExceptionsList.hasOwnProperty(domain);
	                            chrome.tabs.sendMessage(tabs[0].id, {
	                                action: 'autofillEnabled',
	                                autofill: autofillEnabled
	                            });
	                        });
	                    }
	                    else {
	                        chrome.tabs.sendMessage(tabs[0].id, {
	                            action: 'autofillEnabled',
	                            autofill: autofillEnabled
	                        });
	                    }
	                }
	            }
	        });
	    });
	}
	chrome.storage.onChanged.addListener((storage) => {
	    if ('autofillEnabled' in storage || 'autofillExceptionsList' in storage) {
	        toggleAutofillInEmailInputs();
	    }
	});
	chrome.runtime.onMessage.addListener(function (request) {
	    if (request.action === 'getTempEmail') {
	        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	            const currTab = tabs[0];
	            if (currTab) {
	                api.getCurrentMailbox().then(email => {
	                    chrome.tabs.sendMessage(currTab.id, {
	                        email,
	                        inputDataId: request.inputDataId
	                    });
	                });
	            }
	        });
	    }
	});
	function insertEmail(info, tab) {
	    api.getCurrentMailbox().then(email => {
	        chrome.tabs.sendMessage(tab.id, {
	            email,
	            contextMenu: true
	        });
	    });
	}
	const title = _('paste_tm_address');
	chrome.contextMenus.create({ 'title': title, 'contexts': ['editable'], 'onclick': insertEmail });
	statistics_1.default.onInstall(config_1.default.URL_INSTALL);
	statistics_1.default.onUninstall(config_1.default.URL_UNINSTALL);


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/*!*********************************!*\
  !*** ./src/utils/statistics.ts ***!
  \*********************************/
/***/ (function(module, exports) {

	"use strict";
	class Statistics {
	    onInstall(url) {
	        chrome.runtime.onInstalled.addListener((details) => {
	            if (details.reason === 'install') {
	                chrome.tabs.create({ url });
	            }
	        });
	    }
	    onUninstall(url) {
	        chrome.runtime.setUninstallURL(url);
	    }
	}
	exports.Statistics = Statistics;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new Statistics();


/***/ })
/******/ ]);