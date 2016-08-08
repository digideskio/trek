'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delegateProxy = require('delegate-proxy');

var _delegateProxy2 = _interopRequireDefault(_delegateProxy);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Context {

  constructor(app, config, req, res) {
    req = (0, _delegateProxy2.default)(new _request2.default(req), req);
    res = (0, _delegateProxy2.default)(new _response2.default(res), res);

    Reflect.defineProperty(this, 'app', { value: app });
    Reflect.defineProperty(this, 'req', { value: req });
    Reflect.defineProperty(this, 'res', { value: res });
    Reflect.defineProperty(this, 'config', { value: config });

    Reflect.defineProperty(this.req, 'app', { value: app });
    Reflect.defineProperty(this.req, 'res', { value: res });
    Reflect.defineProperty(this.req, 'config', { value: config });

    Reflect.defineProperty(this.res, 'app', { value: app });
    Reflect.defineProperty(this.res, 'req', { value: req });
    Reflect.defineProperty(this.res, 'config', { value: config });

    // Cache ip
    req.ip = req._ip;
  }

}
exports.default = Context;