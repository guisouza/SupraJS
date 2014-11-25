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

  Con Class File
*/


module.exports = Supra.Class.extend({
  init : function(x){
    this.mysql = require('mysql2');
    this.mongo = require('mongojs');
    this.redis = require("redis");

    if (!this.connection){this.connection = {}};

    for(database in Supra.database){

      var dbConfig = Supra.database[database];

      switch(dbConfig.type.toLowerCase()){
        case 'mysql' :

          try{
            this.connection[database] = this.mysql.createConnection(dbConfig);
          }catch(err){
            throw err;
          }
        break;
        case 'mongo' :
          usr = '';
          if (dbConfig['username']){
            if (dbConfig['password']){
              var usr = dbConfig['username']+':'+dbConfig['password']+'@'
            }
          }

          if (dbConfig['host']){
            host = usr+dbConfig['host'];
            if(dbConfig['port']){
              host = usr+dbConfig['host']+':'+dbConfig['port'];
            }
          }

          try{
            this.connection[database] = this.mongo(host);
          }catch(err){
            throw err;
          }
        case 'redis' :
            this.connection[database] = this.redis.createClient();

        break;

      }
    }

  },
  connect : function(db){
    try{
      return this.connection[db];
    }catch(err){
      throw err;
    }

  },
  destroy : function(db){
    this.connection[db].close();
  }
})





