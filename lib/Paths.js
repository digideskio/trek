'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*!
 * trek - Paths
 * Copyright(c) 2015 Fangdun Cai
 * MIT Licensed
 */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

/**
 *
 * @class Paths
 * @constructor
 * @param {String} root The app root path
 */

var Paths = (function () {
  function Paths(root) {
    _classCallCheck(this, Paths);

    this.root = root;
    this.blueprint = new Map();
    this.initialize();
  }

  Paths.prototype.initialize = function initialize() {
    this.set('app').set('app/controllers').set('app/models', { glob: '*.js' }).set('app/views').set('app/services', { glob: '*.js' }).set('lib').set('config').set('config/app', { 'with': 'config/app.toml' }).set(`config/app.env`, { 'with': `config/app.${ Trek.env }.toml` }).set('config/.env', { 'with': 'config/.env' }).set('config/.env.env', { 'with': `config/.env.${ Trek.env }` }).set('config/database', { 'with': 'config/database.toml' }).set('config/secrets', { 'with': 'config/secrets.toml' }).set('config/routes', { 'with': 'config/routes.js' }).set('config/middleware', { 'with': 'config/middleware.js' }).set('config/locales').set('public').set('log', { 'with': `log/${ Trek.env }.log` }).set('tmp');
  };

  /**
   * Get the path with the key path from paths
   *
   * @method get
   * @memberof Paths.prototype
   * @param {String} key The key path
   * @param {Boolean} [absolute=false] Relative or absolute path
   * @return {String} path
   */

  Paths.prototype.get = function get(key) {
    var absolute = arguments[1] === undefined ? false : arguments[1];

    if (!this.blueprint.has(key)) return null;
    var value = this.blueprint.get(key);
    if (value.glob) {
      // TODO glob async
      return _glob2['default'](value.glob, { sync: true, realpath: true, cwd: `${ this.root }/${ key }` });
    }
    return _path2['default'].join(absolute ? this.root : '', value['with'] || value);
  };

  /**
   * Set the value with the key path onto paths
   *
   * @method set
   * @memberof Paths.prototype
   * @param {String} key The key path
   * @param {Object|String} [value=key]
   * @return this
   */

  Paths.prototype.set = function set(key, value) {
    value = value || key;
    this.blueprint.set(key, value);
    return this;
  };

  return Paths;
})();

exports['default'] = Paths;
module.exports = exports['default'];