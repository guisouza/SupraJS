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

  module.exports =  Supra.Class.extend({
    init:  function(){

      this.ControllersDir = Supra.appDir+'/Controllers';
      this.ModelsDir = Supra.appDir+'/Models';
      this.structure()

    },

    structure: function(){
      this.getControllers()
      this.getModels()
    },
    getControllers: function(){
      Supra.fs.readdir(this.ControllersDir, function(err,controllers){
        for (controller in controllers){
          this.loadController(controllers[controller])
        }
      }.bind(this));
    },
    getModels: function(){
      Supra.fs.readdir(this.ModelsDir, function(err,models){
        for (model in models){
          this.loadModel(models[model])
        }
      }.bind(this));
    },
    loadController: function(controller){
      if (this.isValid(controller)){
        console.log(controller)
      }
    },
    loadModel: function(model){
      if (this.isValid(model)){
        console.log(model)
      }
    },

    isValid: function(fileName){
      if ((fileName.indexOf('.js') !== -1 || fileName.indexOf('.coffee') !== -1) && fileName[0] !== '.'){
        return true;
      }else{
        return false;
      }
    }

  });
