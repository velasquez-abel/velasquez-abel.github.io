//drawScale.js
 
sm.view.drawScale = {
	setupUserInterface: function () {
				   
		//fill up the select for RootNote options
		selectRootNote = document.querySelector("select#RootNote");
		var i=0, keys = [];
		Notes.loadAll();
		keys = Object.keys(Notes.instances);
		for(i=0; i<keys.length; i++){
			var key = keys[i];
			var data = Notes.instances[key];
			//daySelect.options[daySelect.options.length] = new Option('Text 1', 'Value1');
			selectRootNote.options[selectRootNote.options.length] = new Option( data.name , data.id );
		}                             
				   
		//fill up the select for Scales options
		selectScale = document.querySelector("select#Scale");
		var i=0, keys = [];
		ScaleModel.loadAll();
		keys = Object.keys(ScaleModel.instances);
		for(i=0; i<keys.length; i++){
			var key = keys[i];
			var data = ScaleModel.instances[key];
			//daySelect.options[daySelect.options.length] = new Option('Text 1', 'Value1');
			selectScale.options[selectScale.options.length] = new Option( data.name , data.id );
		}                             
												   
		//fill up the select for Tuning options
		selectTuning = document.querySelector("select#Tuning");
		var i=0, keys = [];
		TuningModel.loadAll();
		keys = Object.keys(TuningModel.instances);
		for(i=0; i<keys.length; i++){
			var key = keys[i];
			var data = TuningModel.instances[key];
			selectTuning.options[selectTuning.options.length] = new Option( data.name , data.id );
		}
	   
		//add the event listeners
		document.querySelector("select#RootNote").addEventListener("change" , sm.view.drawScale.onchangeRootNote, false);
		document.querySelector("select#Scale").addEventListener("change" , sm.view.drawScale.onchangeScaleModel,false);
		document.querySelector("select#Tuning").addEventListener("change" , sm.view.drawScale.onchangeFretboardModel, false);
		//document.querySelector("select#String").addEventListener("change" , sm.view.drawScale.onchangeStringTunning);     
	   
		//draw the initial fretboard
	   
		sm.view.drawScale.drawFretboardModel();
	},
               
	//onchangeRootNote
	onchangeRootNote: function(){
		sm.view.drawScale.drawFretboardModel();
	},
   
	//onchangeScaleModel
	onchangeScaleModel: function(){
		sm.view.drawScale.drawFretboardModel();
	},
   
	//onchangeFretboardModel
	onchangeFretboardModel: function(){
		sm.view.drawScale.drawFretboardModel();
	},

	//onchangeStringTunning
	onchangeStringTuning: function(){
		sm.view.drawScale.drawFretboardModel();
	},
   
	drawFretboardModel: function(){
		var theNote , theScale, theModel;
		var theFretboard;
		theNote = document.querySelector("select#RootNote").value;
		theScale = document.querySelector("select#Scale").value;
		theModel = document.querySelector("select#Tuning").value;
	   
		theFretboard = document.querySelector("table#Fretboard");
	    
		//clearing the fretboard
		while(theFretboard.rows.length) {
			theFretboard.deleteRow(0);
		}
	   
		//adding the header row
		var header = theFretboard.createTHead();
		var row = header.insertRow(0);
		row.appendChild( sm.view.drawScale.createTH("O") );
		row.appendChild( sm.view.drawScale.createTH("1") );
		row.appendChild( sm.view.drawScale.createTH("2") );
		row.appendChild( sm.view.drawScale.createTH("3") );
		row.appendChild( sm.view.drawScale.createTH("4") );
		row.appendChild( sm.view.drawScale.createTH("5") );
		row.appendChild( sm.view.drawScale.createTH("6") );
		row.appendChild( sm.view.drawScale.createTH("7") );
		row.appendChild( sm.view.drawScale.createTH("8") );
		row.appendChild( sm.view.drawScale.createTH("9") );
		row.appendChild( sm.view.drawScale.createTH("10") );
		row.appendChild( sm.view.drawScale.createTH("11") );
		row.appendChild( sm.view.drawScale.createTH("12") );
	   
	   //creating fretboard body
		var body = theFretboard.createTBody();
		var chosenModel = TuningModel.instances[ theModel ];
		var i=0;len = chosenModel.strings.length;
		for(i=len-1; i>=0; i--){
			var row = body.insertRow(-1);
		   
			var cell = row.insertCell(-1)
			//add string note select
			stringSelect = document.createElement("select");
			//stringSelect.setAttribute("onchange", function(){sm.view.drawScale.changeStringTuning();});
			 stringSelect.addEventListener(
				'change',
				function() { sm.view.drawScale.changeStringTuning( this.value , this.id ); },
				false
			);
			stringSelect.setAttribute("id", "string_"+i);
			
			cell.appendChild( stringSelect );
			var j=0, keys = [];
			Notes.loadAll();
			keys = Object.keys(Notes.instances);
			for(j=0; j<keys.length; j++){
				var key = keys[j];
				var data = Notes.instances[key];
				var option = new Option( data.name , data.id );
				if( chosenModel.strings[i].string.rootNote == data.name ){
					option.setAttribute("selected", "selected");
				}
				stringSelect.options[stringSelect.options.length] = option;
				
			}                             

			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '1' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '2' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '3' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '4' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '5' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '6' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '7' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '8' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '9' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '10' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '11' ) );
			row.insertCell(-1).appendChild( sm.view.drawScale.addFretDIV( i , '12' ) );
			
			///TODO: adding listener to the note select
		}
		
		var chosenModel = TuningModel.instances[ theModel ];
		//collecting notes for painting the scale:
		var noteArray;
		noteArray = sm.view.drawScale.collectNotes( theScale , theNote );
		
		//paint the selected notes
		
		var i=0;len = chosenModel.strings.length;
		for(i=len-1; i>=0; i--){
			
			noteSelect = document.getElementById( 'string_'+i );
			stringNote = eval( noteSelect.value );
			notesLen = ( Object.keys(Notes.instances)).length;
			for(j=1; j<=12; j++){
				startNote = stringNote + j ;
				startNote = ((startNote == 12) || (startNote == 24))?12: ( ( startNote > notesLen)?( startNote % notesLen ):startNote );
				//paint the note
				theDiv = document.getElementById( 'S'+ i + '_F' + j  );
				isPainted = noteArray.includes( startNote );
				theDiv.innerHTML = (isPainted)?Notes.instances[ startNote ].name : ' ';
			}
		}
		
	} ,
	
	changeStringTuning( theValue , theID ){
		var theScale;
		rootNote = document.querySelector("select#RootNote").value;
		theScale = document.querySelector("select#Scale").value;
		
		theString = theID.replace('string_' , '' );
		
		var noteArray;
		noteArray = sm.view.drawScale.collectNotes( theScale , rootNote );
		i = eval(theValue);
		stringNote = i;
		notesLen = ( Object.keys(Notes.instances)).length;
		for(j=1; j<=12; j++){
			startNote = stringNote + j ;
			startNote = ((startNote == 12) || (startNote == 24))?12: ( ( startNote > notesLen)?( startNote % notesLen ):startNote );
			//paint the note
			theDiv = document.getElementById( 'S'+ theString + '_F' + j  );
			isPainted = noteArray.includes( startNote );
			theDiv.innerHTML = (isPainted)?Notes.instances[ startNote ].name : ' ';
		}		
	} , 
	
	addFretDIV: function( string_id , fret_id ){
		theDIV = document.createElement("div");
		
		theDIV.id = 'S'+string_id + '_' + 'F' + fret_id;
		theDIV.innerHTML = ' ';
		
		return theDIV;
	} , 

	collectNotes: function( theScale , theNote ){
		chosenScale = ScaleModel.instances[ theScale ];
		note = eval( theNote );
		len = chosenScale.semitoneSteps.length;
		index = 0;
		noteIndex = -1;
		noteArray = new Array();
		noteArray.push( note );
		//collecting all remaining notes
		notesLen = ( Object.keys(Notes.instances)).length;
		while( index < len ){
			steps = chosenScale.semitoneSteps[index];
			note = ( note + steps );
			note = ( note > notesLen)?( note % notesLen ):note;
			//note = Note.instances[ note+ steps ].id;
			noteArray.push( note );
			index++;
		}
		return noteArray;
	},
	
	createTH: function (_text){
		th = document.createElement('th');
		th.innerHTML = _text;
		return th;
	}
};
 