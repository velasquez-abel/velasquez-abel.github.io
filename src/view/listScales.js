//listScales.js
sm.view.listScales = {
	setupUserInterface: function () {
		var tableBodyEL =  document.querySelector("table#scalemodels>tbody");
		var i=0, keys = [], row = {};
		ScaleModel.loadAll();
		keys = Object.keys(ScaleModel.instances);
		for(i=0; i<keys.length; i++){
			var key = keys[i];
			var row = tableBodyEL.insertRow();
			var data = ScaleModel.instances[key];
			row.insertCell(-1).textContent = data.id;
			row.insertCell(-1).textContent = data.name;
			row.insertCell(-1).textContent = data.semitoneSteps;
		}
	}
}
 