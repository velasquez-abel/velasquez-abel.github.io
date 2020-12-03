function ScaleModel( scale_model ){
	this.id = scale_model.id;
	this.name = scale_model.name;
	this.semitoneSteps = scale_model.semitoneSteps;
};

function ScaleModel( _id , _name , _steps ){
	this.id = _id;
	this.name = _name;
	this.semitoneSteps = _steps;
};

ScaleModel.instances = {};  // initially an empty associative array

ScaleModel.convertDataToScaleModel = function( row ){
	var scaleModel = new ScaleModel( row );
	return scaleModel;
}

ScaleModel.loadAll = function( ){
	//load all from json remote file
	var key="", keys=[], data="", scale_models={}, i=0;  
	try{
		fetch( url )
			.then( resp => resp.json() )
			.then( data => console.log( "obtained : " + data ))
	}//try
	catch (e){
		
	}//catch
	if (data) {
    scale_models = JSON.parse( data );
    keys = Object.keys( scale_models );
    console.log( keys.length +" scale models loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      ScaleModels.instances[key] = ScaleModel.convertDataToScaleModel( scale_models[key]);
  	}
}