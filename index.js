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
exports.Class = require('supra-class').Class;



/**
 * [Session description]
 * @type {[type]}
 */
Session = require('supra-session');
exports.Session = new Session;



/**
 * [Model description]
 * @type {[type]}
 */
exports.Model = require('supra-model');



/**
 * [Controller description]
 * @type {[type]}
 */
exports.Controller = require('supra-controller');




/**
 * [utils description]
 * @type {[type]}
 */
exports.utils = utils = require('supra-utils');



/**
 * [queue description]
 * @type {[type]}
 */
exports.queue = require('supra-queue');



/**
 * [render description]
 * @type {[type]}
 */
exports.render = utils.render;



/**
 * [Router description]
 * @type {[type]}
 */
exports.Router = require('supra-router');



/**
 * [Server description]
 * @type {[type]}
 */
exports.Server = require('supra-server');



/**
 * [request description]
 * @type {[type]}
 */
exports.request = require('supra-request');



/**
 * [file description]
 * @type {[type]}
 */
exports.file = require('supra-file');



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
con = require('supra-con')
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
