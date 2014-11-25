/*       .#.
        @@@@@
        @@@@@
          @
    .....@@@
   .@@@@@@@
   @@@@@@@
    @@@@@@@:@@@..@@@@@@@  @@@   @@@ @@@@@@@@   @@@@@@@      @@@@
   .@@@@@@@@    @@@@@@@@  @@@   @@@ @@@@@@@@@  @@@@@@@@@  @@@@@@@@
   '@@@@@@@@@@@@@@@       @@@   @@@ @@@    @@@ @@@   @@@ @@@    @@@
:@@@@@@@@@:     @@@@@@@@  @@@   @@@ @@@@@@@@@  @@@@@@@@@ @@@    @@@
  `@@@@:             @@@  @@@   @@@ @@@#@@@    @@@@@@@@  @@@@@@@@@@
   @@@         @@@@@@@@@  @@@@@@@@' @@@        @@@  @@@@ @@@    @@@
   +##`        @@@@@@@@     @@@@@   @@@        @@@  @@@@ @@@    @@@

  Supra
  NodeJS
  Developer
  Friendly
  Framework.
*/


path = require('path');
exports.fs = require('fs');
exports.url = require('url');
exports.querystring = require('querystring');
exports.http = http = require('http');


/**
 * [Supra description]
 * @type {[type]}
 */
Supra = require('supra');

exports.appDir = appDir = path.dirname(require.main.filename)+'/App';
/**
 * [Class description]
 * @type {[type]}
 */
exports.Class = require('./lib/supra-class').Class;



/**
 * [Session description]
 * @type {[type]}
 */
Session = require('./lib/supra-session');
exports.Session = new Session;



/**
 * [Model description]
 * @type {[type]}
 */
exports.Model = require('./lib/supra-model');



/**
 * [Controller description]
 * @type {[type]}
 */
exports.Controller = require('./lib/supra-controller');




/**
 * [utils description]
 * @type {[type]}
 */
exports.utils = utils = require('./lib/supra-utils');



/**
 * [queue description]
 * @type {[type]}
 */
exports.queue = require('./lib/supra-queue');



/**
 * [render description]
 * @type {[type]}
 */
exports.render = utils.render;



/**
 * [Router description]
 * @type {[type]}
 */
exports.Router = require('./lib/supra-router');



/**
 * [Server description]
 * @type {[type]}
 */
exports.Server = require('./lib/supra-server');



/**
 * [request description]
 * @type {[type]}
 */
exports.request = require('./lib/supra-request');



/**
 * [file description]
 * @type {[type]}
 */
exports.file = require('./lib/supra-file');



/**
 * [CustomRouter description]
 * @type {[type]}
 */
exports.CustomRouter = require(appDir+'/Config/routes');




/**
 * [database description]
 * @type {[type]}
 */
exports.database = require(appDir+'/Config/database.js');



/**
 * [con description]
 * @type {[type]}
 */
con = require('./lib/supra-con')
exports.con = new con()



/**
 * [prefs description]
 * @type {[type]}
 */
exports.prefs = require(appDir+'/Config/prefs');





/**
 * [AppModel description]
 * @type {[type]}
 */
exports.AppModel = require(appDir+'/Models/AppModel');



/**
 * [AppController description]
 * @type {[type]}
 */
exports.AppController = require(appDir+'/Controllers/AppController');
