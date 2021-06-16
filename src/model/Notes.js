//Note.js
Note = function(){
};
 
Note = function(_id , _name ){
	this.id = _id;
	this.name = _name;
};
 
Note = function( row ){
	this.id = row.id;
	this.name = row.name;
};
 
Note.instances = {};
 
Note.convertData = function(row){
	var note = new Note( row );
	return note;
}
 
Note.loadAll = function(){
	var data = notesData;
	if(data){
		Notes = JSON.parse( data );
		keys = Object.keys( Notes );
		console.log( keys.length + " notes loaded. " );
		for( i=0; i<keys.length; i++ ){
			key = keys[i];
			row = Notes[key].note;
			Note.instances[row.id] = Note.convertData( row );
		}
	}
}
