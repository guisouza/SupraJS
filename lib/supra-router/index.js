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
   @@@         @@@@@@@@@  @@@@@@@@' @@@        @@@  @@@  @@@    @@@
   +##`        @@@@@@@@     @@@@@   @@@        @@@  @@@  @@@    @@@

  Supra
  NodeJS
  Developer
  Friendly
  Framework.

 */

module.exports = Supra.Class.extend({



	/**
	 * Routes contructor.
	 * @param  {[type]} req  HTTP Request
	 * @param  {[type]} res  HTTP Response
	 * @param  {[type]} verb HTTP Verb
	 * @return {[type]}      [description]
	 */
	init:function(req,res,verb){
		URL = req.url.split('/');
		this.req = req;
		this.res = res;
		this.verb = verb;
	},



	/**
	 * Check if the URL matches one method of this class.
	 * I know ...  sounds weird.
	 * @return {[type]} [description]
	 */
	checkRoutes:function(){
		var request = this.req.url.substr(1,this.req.url.length);

			if (this[request]){
				this.route = this[request]()
			}else{
				this.route = {
					controller : URL[1] || Supra.prefs.defaultController,
					method : URL[2] || 'index',
					params : URL.slice(3,URL.length) || []
				}
			}
		this.loadController(this.route);

	},



	/**
	 * [loadController description]
	 * @param  {[type]} route [description]
	 * @return {[type]}       [description]
	 */
	loadController:function(route){
		var dir = appDir+'/Controllers/';
		route.controller = route.controller.replace(/Controller/,'');
		file = dir+route.controller+'Controller.js';

		Supra.fs.exists(file, function (ControllerFound) {
			if(ControllerFound){
				this.requireController(route.controller)
			}
		}.bind(this))
	},



	/**
	 * [requireController description]
	 * @param  {[type]} ControllerName [description]
	 * @return {[type]}                [description]
	 */
	requireController:function(ControllerName){

		if (!Supra[ControllerName+'Controller']){
			Controller = require(appDir+'/Controllers/'+ControllerName+'Controller');
			Controller = new Controller({
				ControllerName : ControllerName
			})
			Supra[ControllerName+'Controller'] = Controller;
		}

		Supra[ControllerName+'Controller'].loadDependencies({
			req : this.req,
			res : this.res,
			Method : this.route.method,
			POSTData : this.req.body,
			Params : this.route.params,
			reqMethod : this.verb
		})

	},



	/**
	 * [controllerNotFound description]
	 * @return {[type]} [description]
	 */
	controllerNotFound:function(){
					//Controller Not Found
					Supra.render({
						errorView : true,
						status : 404,
						view : 'ControllerNotFound',
						res : res,
						req : req,
						vars : {
							Controller : Controller
						}
					});
	}
});
