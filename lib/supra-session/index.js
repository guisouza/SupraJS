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

Session Class File
*/

module.exports = Supra.Class.extend({

  init : function(Session){
    this.Session = Session;
  },
  createCookie : function(){

  },
  reset : function(cookies){
    // console.log(cookies);
    // cookies.split(';').forEach(function(cookie,index){
      // var cookieName = cookie.split('=')[0];
      // if (cookieName.trim() == Supra.prefs.sessionKey){
        /**
         * Cookie exists
         */
      // }else{
        /**
         * Create a new cookie
         */
      // }
    // })

  },

  write : function(key,value){
    return this.Session[key] = value;
  },

  read : function(key){
    return this.Session[key];
  }


})
