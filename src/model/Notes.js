//Notes.js
Notes = function(){
};
 
Notes = function(_id , _name ){
	this.id = _id;
	this.name = _name;
};
 
Notes = function( row ){
	this.id = row.id;
	this.name = row.name;
};
 
Notes.instances = {};
 
Notes.convertData = function(row){
	var note = new Notes( row );
	return note;
}
 
Notes.loadAll = function(){
	var data = notesData;
	if(data){
		Notes_ = JSON.parse( data );
		keys = Object.keys( Notes_ );
		console.log( keys.length + " notes loaded. " );
		for( i=0; i<keys.length; i++ ){
			key = keys[i];
			row = Notes_[key].note;
			Notes.instances[row.id] = Notes.convertData( row );
		}
	}
}
