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
   init:  function(params){

    //Parsing Init Params
    this.Controller = params.ControllerName;

    //Other Attributions
    this.autoRender = true;
    this.sendValue = '';
  },



  /**
   * [loadDependencies description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  loadDependencies : function(params){

    this.req = params.req;
    this.res = params.res;
    this.data = params.POSTData;
    this.Method = params.Method;
    this.Params = params.Params;
    this.verb = params.reqMethod.toLowerCase();
    this.vars = []

    var that = this
    dependencies = new Supra.queue({
      callback : function(){
        this.execute.call(this)
      }.bind(this)
    })
    dependencies.enqueue(function(){
      that.defaultModel = that.Controller;
      that.loadModel.call(that,that.Controller,'CALLED_BY_THE_DEPENDENCIES_LOADER')
    })
    dependencies.enqueue(function(){
      if (that.verb === 'post'){
        var body = '';
        that.req.on('data', function (data) {
          body += data;
          if (body.length > 1e6)
            that.req.connection.destroy();
        });
        that.req.on('end', function () {
          that.data = Supra.querystring.parse(body);
          dependencies.finish()
        });
      }else{
        dependencies.finish()
      }
    })

    if (that.uses){
      if (that.uses.models){
        that.uses.models.forEach(function(a){
          dependencies.enqueue(function(){
            that.loadModel.call(that,a,'CALLED_BY_THE_DEPENDENCIES_LOADER')
          })
        })
      }
    }
    dependencies.run(that)
  },



  /**
   * [set description]
   * @param {[type]} key   [description]
   * @param {[type]} value [description]
   */
  set:function(key,value){
    this.vars[key] = value;
  },



  /**
   * [send description]
   * @param  {[type]} value        [description]
   * @param  {[type]} preventClose [description]
   * @return {[type]}              [description]
   */
  send : function(value,preventClose){
    if (!preventClose)
      // this.closeConnections()
    if (value && !this.res.headersSent){
      switch(typeof value){
        case  'object' :
       var body = JSON.stringify(value)
       this.res.setHeader("Content-Type", "application/json");
       this.res.setHeader('Content-Length', body.length);
       this.res.setHeader("Server", Supra.prefs.server);
       this.res.end(body);
       break;
       default :
       var body = value;
       this.res.setHeader("Content-Type", "application/json");
       this.res.setHeader('Content-Length', body.length);
       this.res.setHeader("Server", Supra.prefs.server);
       this.res.end(value.toString());
       break;
     }
   }
 },



  /**
   * [closeConnections description]
   * @return {[type]} [description]
   */
  closeConnections : function(){
    var that = this
    this.models.forEach(function(model){
      if (that[model].con){
        that[model].con.end()
      }
    })
  },



  /**
   * [render description]
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  render : function(view){

    var tmplFile;
    var that = this;
    if (view){
      this.view = view;
    }else{
      this.view = this.Method;
    }

    if (this.template){
      tmplFile = Supra.appDir+'/Templates/'+this.template+'.tmpl';
    }else{
      tmplFile = Supra.appDir+'/Templates/'+Supra.prefs.defaultTemplate+'.tmpl';
    }

    viewFile = Supra.prefs.viewFolder+this.Controller.replace('Controller','')+'/'+this.view+'.view';

    var renderingQueue = new Supra.queue({
     callback : function(){
      html = that.template.replace(new RegExp('{{content}}','gi'),that.view)
      if (that.vars){
       for(Var in that.vars){
        html = html.replaceAll('{{'+Var+'}}',that.vars[Var]);
      }
    }

    html = that.parseDoubleMoustache(html);
    that.res.end(html);
    that.template = false;
  }
})

    .enqueue(function(){
     Supra.fs.readFile(tmplFile, function (err, template) {
      if (err){
       throw('Cannot open the file :\n '+tmplFile);
     }
     that.template = template.toString()
     renderingQueue.finish()
   })
   })

    .enqueue(function(){
     Supra.fs.readFile(viewFile, function (err, view) {
      if (view){
       that.view = view.toString()
     }else{
       that.send('View Not Found');
     };
     renderingQueue.finish()
   });

   })

    renderingQueue.run()

  },



  /**
   * [execute description]
   * @return {[type]} [description]
   */
  execute : function(){

    if (!this[this.Method]){
        //Controller Not Found
        Supra.render({
          errorView : true,
          status : 404,
          view : 'MethodNotFound',
          res : this.res,
          req : this.req,
          vars : {
            Method : this.Method,
            Controller : this.Controller,
            ControllerURL : this.Controller
          }
        })
      }else{
       if (this[this.Method][this.verb]){
        var action = this[this.Method][this.verb];
      }else if(this[this.Method]){
        var action = this[this.Method];
      }
      action.apply(this,this.Params);
      if (this.autoRender){
        this.render()
      }
    }
  },



  /**
   * [loadModel description]
   * @param  {[type]} pmodel [description]
   * @param  {[type]} func   [description]
   * @return {[type]}        [description]
   */
  loadModel : function(pmodel,func){
    var modelsPath = Supra.appDir+'/Models/'
    var file = modelsPath+pmodel

    Supra.fs.exists(file+'.js', function (exists) {
      if(exists){
        Model = require(file)
      }else{
        Model = require(modelsPath+'generic')
      }
      this[pmodel] = new Model(pmodel,this);
      this.models = this.models ? this.models : [];
      this.models.push(pmodel)

      if (func == 'CALLED_BY_THE_DEPENDENCIES_LOADER'){
        dependencies.finish()
      }else{
        func.call(this)
      }
    }.bind(this));
    return true;
  },



  /**
   * [redirect description]
   * @param  {[type]} to [description]
   * @return {[type]}    [description]
   */
  redirect:function(to){
    response.writeHead(302, {
      'Location' : this.generateUrl(to)
    });
    res.end();
  },


  /**
   * [generateUrl description]
   * @return {[type]} [description]
   */
  generateUrl: function(to){
    return this.req.headers.host+'/'+to;
  },



  /**
   * [addDefaultVars description]
   * @param {[type]} html [description]
   */
  addDefaultVars : function(html){
    html = html.replaceAll('/{{Title}}/',this.title);
    html = html.replaceAll('{{rootUrl}}','http://'+this.req.headers.host+'/');

    return html
  },



  /**
   * [parseDoubleMoustache description]
   * @param  {[type]} html [description]
   * @return {[type]}      [description]
   */
  parseDoubleMoustache : function(html){
    html = this.addDefaultVars(html);
    html = this.parseIf(html);
    html = this.parseForEach(html);

    return html
  },



  /**
   * [getPartial description]
   * @param  {[type]} html     [description]
   * @param  {[type]} begin    [description]
   * @param  {[type]} end      [description]
   * @param  {[type]} beginLen [description]
   * @return {[type]}          [description]
   */
  getPartial : function(html,begin,end,beginLen){

    return html.substring(html.indexOf(begin)+beginLen,html.indexOf(end));
  },



  /**
   * [renderPartials description]
   * @param  {[type]} partial [description]
   * @param  {[type]} data    [description]
   * @return {[type]}         [description]
   */
  renderPartials : function(partial,data){

    var partialvar = partial.match(/{{[^}]+}}/g);
    var _var = []

    if (partialvar === null)
     return partial

   partialvar.forEach(function(var_,index){
     _var.push(var_.replace(/}}/,'').replace(/{{/,''))
   })

   _var.forEach(function(var_,index){
     _varValue = data[var_.split('.')[1]]
     partial = partial.replaceAll(partialvar[index],_varValue)
   })

   return partial

 },

parseForEach : function(html){
  var forEachLoopBeginRE = new RegExp('{{foreach\s*\(.*\)}}.*','g')
  var forEachLoopEndRE = new RegExp('{{endforeach}}','g');
  var statementRE = /\(.*as.*\)/g
  var begin = html.match(forEachLoopBeginRE);
  var end = html.match(forEachLoopEndRE);

  var result = '';

  if (!begin)
  return html

  begin.forEach(function(state,index){

    partial = this.getPartial(html,html.match(forEachLoopBeginRE)[index],html.match(forEachLoopEndRE)[index],begin[index].length)

    statement = begin[index].match(statementRE)[0].replace(/\(/,'').replace(/\)/,'').split(' as ');

    if (this.vars[statement[0]]){
      this.vars[statement[0]].forEach(function(a,b){
        result+=this.renderPartials(partial,a);
      }.bind(this))
    }
  }.bind(this));

  return html.replace(partial,result).replace(begin,'').replace(end,'');
},

parseIf : function(html){

  var ifBeginRE = new RegExp('{{if\s*\(.*\)}}','g'),
      ifEndRE = new RegExp('{{endIf}}','g'),
      statementRE = /\(.*\)/g,
      i = 0,
      begin = [],
      end = [],
      cleanIfStack = [],
      ifStack = [];

  while (m = ifBeginRE.exec(html)){
    ifStack[m.index] = {cmd:'if',obj:m};
  }

  if (ifStack.length === 0){
    return html;
  }
  while (m = ifEndRE.exec(html)){
    ifStack[m.index] = {cmd:'end',obj:m};
  }

  ifStack.forEach(function(obj,index){
    cleanIfStack.push(obj);
  })

  ifStack = cleanIfStack;

  while(!(ifStack[i]['cmd'] == 'if' && ifStack[i+1]['cmd'] == 'end'))
   i++;

 html = this.parseIfPartial(html,ifStack[i],ifStack[i+1])

 return html

},



  /**
   * [parseIfPartial description]
   * @param  {[type]} html  [description]
   * @param  {[type]} begin [description]
   * @param  {[type]} end   [description]
   * @return {[type]}       [description]
   */
  parseIfPartial : function(html,begin,end){

    var ifBeginRE = new RegExp('{{if\s*\(.*\)}}.*','g')

    that = this

    before = html.substring(0,begin.obj.index);
    partial = html.substring(begin.obj.index+begin.obj[0].length,end.obj.index)

    if (partial.indexOf('{{else}}') != -1){
      partial = partial.split('{{else}}')
      partialIf = partial[0]
      partialElse = partial[1]
    }else{
      partialIf = partial
      partialElse = ''
    }

    after = html.substring(end.obj.index+end.obj[0].length,html.length);

    if(eval.call(that,begin.obj[1].replace('this','that'))){
      html = before+partialIf+after
    }else{
      html = before+partialElse+after
    }

    m = ifBeginRE.exec(html)

    if (m){
      return that.parseIf(html)
    }else{
      return html
    }
  }

});
