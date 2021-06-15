//TuningModel.js
TuningModel = function(){
};
 
TuningModel = function(_id , _name , _strings ){
	this.id = _id;
	this.name = _name;
	this.strings = _strings
};

TuningModel = function( row ){
	this.id = row.id;
	this.name = row.name;
	this.strings = row.strings
};

TuningModel.instances = {};

TuningModel.convertData = function(row){
	var tuningModel = new TuningModel( row );
	return tuningModel;
}

TuningModel.loadAll = function(){
	var data = tuningModelsData;
	if(data){
		TuningModels = JSON.parse( data );
		keys = Object.keys( TuningModels );
		console.log( keys.length + " TuningModels loaded. " );
		for( i=0; i<keys.length; i++ ){
			key = keys[i];
			row = TuningModels[key].tuningModel
			TuningModel.instances[ row.id ] = TuningModel.convertData( row );
		}
	}
}

