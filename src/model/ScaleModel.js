ScaleModel = function(){
};
 
ScaleModel = function(_id , _name , _steps ){
	this.id = _id;
	this.name = _name;
	this.semitoneSteps = _steps;
	//console.log("function ScaleModel: created id="+_id + "; name=" + _name);
	return this;
};

ScaleModel = function( row ){
	//console.log( "ScaleModel( row ) -> row elements to create an ScaleModel: " + row );
	this.id = row.id;
	this.name = row.name;
	this.semitoneSteps = row.semitoneSteps;            
	//console.log( "ScaleModel( row ): id=" + row.id + "; name=" + row.name + "; semitoneSteps=" + row.semitoneSteps );
	return this;
};

ScaleModel.instances = {};

ScaleModel.convertData = function(row){
   
	//var scaleModel = new ScaleModel( row.id , row.name, row.semitoneSteps );
	var scaleModel = new ScaleModel( row )
	//console.log( "ScaleModel.convertData = function(row): id=" + scaleModel.id + "; name=" + scaleModel.name + "; semitoneSteps=" + scaleModel.semitoneSteps );
	return scaleModel;
   
	//return new ScaleModel( row.id , row.name, row.semitoneSteps );
};

ScaleModel.loadAll = function(){
	var data = scaleList;
	if(data){
		scaleModels = JSON.parse( data );
		keys = Object.keys( scaleModels );
		console.log( keys.length + " scale models loaded. " );
		for( i=0; i<keys.length; i++ ){
			key = keys[i];
			row = scaleModels[key].scale;
			//console.log( "ScaleModel.loadAll = function() -> row.id: " + row.id + "; row.name:" + row.name + "; semitoneSteps:" + row.semitoneSteps  );
			ScaleModel.instances[row.id] = ScaleModel.convertData( row );
		}
	}
};
 