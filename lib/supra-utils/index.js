function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

String.prototype.replaceAll = function(find, replace) {
	return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

var render = function(options){

	if (options.errorView){
		var dir = Supra.prefs.viewFolder+options.view+'.view';		
	}else{
		var dir = Supra.prefs.viewFolder+Controller+'/'+options.view+'.view';
	}


	html = Supra.fs.readFileSync(dir);

	html = html.toString()


	if (options.vars){
		for(Var in options.vars){
			html = html.replaceAll('{{'+Var+'}}',options.vars[Var]);
		}
	}
	
	options.res.end('view not found');
}

exports.render = render;