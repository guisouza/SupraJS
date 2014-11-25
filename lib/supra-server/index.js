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
   * [init description]
   * @return {[type]} [description]
   */
  init:function(){
    App = Supra.http.createServer(Supra.request)
    .listen(Supra.prefs.port,function(){
      console.log(Supra.prefs.server+' Up and running on port '+Supra.prefs.port+'\n'+
        'Report any suggestion to gui_souza@me.com\n'+
        'I hope you like it.')
    });
  }
})
