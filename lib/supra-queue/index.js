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

	Queue Class File
*/


module.exports = Supra.Class.extend({



	/**
	 * [init description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	init:function(params){
		this.autoExec = (params.autoExec) ? params.autoExec : false;
		this.callback = (params.callback) ? params.callback : function(){console.log('Queue Finish')};
		this.context  = (params.context)  ? params.context  : this;
		this.processes = []
		this.date = new Date();
		this.completedProcesses = 0;
		this.waiting = false;
	},



	/**
	 * [enqueue description]
	 * @param  {[type]} process [description]
	 * @param  {[type]} sync    [description]
	 * @return {[type]}         [description]
	 */
	enqueue:function(process,sync){
		this.processes.push({
			process : process,
			sync : sync
		})
		return this
	},



	/**
	 * [run description]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	run : function(context){
		if (this.processes.length == 0){
			this.callback.call(this.context)
		}else{
			this.runContext = context
			this.loop(0,context)
		}
		return this
	},



	/**
	 * [resume description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	resume:function(index){
		this.loop(index,this.runContext)
	},



	/**
	 * [finish description]
	 * @return {[type]} [description]
	 */
	finish : function(){
		this.completedProcesses+=1;
		if (this.completedProcesses == this.processes.length){
			this.callback.call(this.context)
		}else{
			if (this.waiting.waiting == true || this.waiting.processes == this.completedProcesses){
				this.processes[this.waiting.processes].sync = false;
				this.resume(this.waiting.processes)
				this.waiting.waiting = false;
			}
		}
	},
	/**
	 * [loop description]
	 * @param  {[type]} index   [description]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	loop :function(index,context){
		for (var i = index; i <= this.processes.length-1; i++) {
			if (this.processes[i]['sync']){
				this.waiting = {
					waiting : true,
					processes : i
				}
				break;
			}else{
				this.processes[i]['process'].call(context)
			}
		};

	}
})
