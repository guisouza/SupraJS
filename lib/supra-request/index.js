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

// Request Object Definition
module.exports = function request(req,res){

  var method = req.method;
  var URL = req.url.split('/');
  var file = Supra.prefs.staticFiles+Supra.prefs.defaultStaticFile;

  var reqUrl = req.url;
  Supra.Session.reset(req.headers.cookie);

  if (reqUrl.indexOf('.') === -1){
    reqUrl = Supra.prefs.defaultStaticFile || reqUrl + '/index.html';
  }

  file = Supra.prefs.staticFiles+reqUrl.replace(new RegExp('//','g'),'/');

  result = new Supra.file(file,res,function(){
    return new Supra.CustomRouter(req,res,method).checkRoutes();
  })
}












