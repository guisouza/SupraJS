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

	Model Class File
*/


module.exports = Supra.Class.extend({


  /**
   * Model Contructor
   * @param  {[type]} tableName [description]
   * @param  {[type]} master    [description]
   * @return {[type]}           [description]
   */
  init : function(tableName,master){

      this.master = master
      this.tableName = tableName.toLowerCase()
      this.callback = ''
      this.connect()

      this.relatedTables = []

    var self = this
  },


  /**
   * [connect description]
   * @return {[type]} [description]
   */
  connect : function(){
    this.con = Supra.con.connect(this.database);
  },



  /**
   * [find description]
   * @param  {[type]}   scope      [description]
   * @param  {[type]}   conditions [description]
   * @param  {Function} callback   [description]
   * @return {[type]}              [description]
   */
  find : function(scope,conditions,callback){

      if (typeof conditions !== 'object'){
        callback = conditions
      }

      this.callback = callback;

      fields = ' * ';

      tablename = this.tableName;

      where = false;

      limit = '';

      order = '';

      if (conditions){
        if (conditions.fields){
          fields = conditions.fields;
        }

        if (conditions.conditions){
          where = conditions.conditions;
        }

        if (conditions.limit){
          limit = conditions.limit;
        }

        if (conditions.order){
          order = conditions.order;
        }
      }

      switch (scope){
        case 'first':
          limit = '1';
          break;

        case 'last':
          limit = '1';
          if (order == ''){
            order = ' ID DESC ';
          }else{
            if (order.indexOf('DESC') != -1){
              order = order.replace('DESC','ASC');
            }
          }
          break;
      }

      order = this.parseOrder(order);
      limit = this.parseLimit(limit);

      if (where){
        where = this.parseWhere(where)
      }else{
        where = ' 1 = 1 '
      }

      this.con.query('SELECT '+fields+' FROM '+this.tableName+' WHERE '+where+' '+order+' '+limit+';',callback)
  },



  /**
   * [save description]
   * @param  {[type]}   fields   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  save : function(fields,callback){

    _fields = []
    _values = []
    update = false
    where = ''

    for (field in fields){
      if (field == 'id'){
        update = true
        where = 'ID='+fields[field]
      }else{
        _values.push(fields[field])
        _fields.push(field)
      }
    }

    if (update){
      this.update(_fields,_values,where,callback)
    }else{
      this.insert(_fields,_values,callback)
    }
  },



  /**
   * [insert description]
   * @param  {[type]}   fields   [description]
   * @param  {[type]}   values   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  insert : function(fields,values,callback){

    fields = fields.join(',');
    placeholder = []
    values.forEach(function(){
      placeholder.push('?')
    })
    placeholder = placeholder.join(',')

    this.con.query('INSERT INTO '+this.tableName+' ('+fields+',created,updated) VALUES ('+placeholder+',NOW(),NOW());',values,callback)

  },



  /**
   * [delete description]
   * @param  {[type]}   id       [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  delete : function(id,callback){
    this.con.query('DELETE FROM '+this.tableName+' WHERE id = ?;',id,callback)
  },



  /**
   * [update description]
   * @param  {[type]}   fields   [description]
   * @param  {[type]}   values   [description]
   * @param  {[type]}   where    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  update : function(fields,values,where,callback){
    var update = []
    fields.forEach(function(a,b){
      update[b] = fields[b]+'=?'
    })
    update = update.join(',');
    this.con.query('UPDATE '+this.tableName+' SET '+update+',updated=NOW() WHERE '+where+';',values,callback)

  },


  /**
   * [parseLimit description]
   * @param  {[type]} limit [description]
   * @return {[type]}       [description]
   */
  parseLimit : function(limit){
    var limit = limit.toString().toLowerCase()
    if (limit.indexOf('limit') == -1 &&
      limit != ''){
      return 'LIMIT '+limit;
    }else{
      return limit;
    }

  },



  /**
   * [parseOrder description]
   * @param  {[type]} order [description]
   * @return {[type]}       [description]
   */
  parseOrder : function(order){

    var order = order.toString().toLowerCase()
    if (order.indexOf('order') == -1 &&
      order != ''){
      order = 'ORDER '+order;

      if (order.indexOf('by') == -1){
        order = order.replace('ORDER ','ORDER BY ')
      }

      return order
    }else{
      return order;
    }

  },



  /**
   * [parseWhere description]
   * @param  {[type]} where [description]
   * @return {[type]}       [description]
   */
  parseWhere : function(where){

    var whereArray = [];

    for(field in where){
      if (typeof where[field] == 'string'){
        whereArray.push(field+' LIKE "'+where[field]+'"')
      }else{
        whereArray.push(field+' = '+where[field])
      }
    }
    return whereArray.join(' and ')

  }

})




