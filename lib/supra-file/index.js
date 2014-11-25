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

  File Class File
  */
 var exts = require('./exts.js')
module.exports = Supra.Class.extend({

  /**
   * File Class contructor
   * @param  {String}   path     File path
   * @param  {Object}   res      HTTP response
   * @param  {Function} callback Will be called if the file exists fail.
   * @return {Object} File Class
   */
  init : function(path,res,callback){
    this.res = res;
    this.path = path;
    Supra.fs.exists(this.path, function (exists) {
        if (exists){
          this.send();
        }else{
          callback();
        }
    }.bind(this));
    return this;
  },
  /**
   * Sends the file over HTTP response
   * @return {Object} File Class
   */
  send : function(){
    var stat = Supra.fs.statSync(this.path);
    var readStream = Supra.fs.createReadStream(this.path);
    this.res.writeHead(200,{
      'Content-Type' : exts(this.path),
      'Content-Length' : stat.size,
    })
    readStream.pipe(this.res);
    return this;
  }
})
