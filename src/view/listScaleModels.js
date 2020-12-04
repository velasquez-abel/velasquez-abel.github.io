 sl.view.listScales = {
  setupUserInterface: function () {
    var tableBodyEl = document.querySelector("table#scales>tbody");
    var keys=[], key="", row={}, i=0;
    // load all book objects
    ScaleModel.loadAll();
    keys = Object.keys( ScaleModel.instances);
    // for each book, create a table row with a cell for each attribute
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = ScaleModel.instances[key].id;      
      row.insertCell(-1).textContent = ScaleModel.instances[key].name;  
      row.insertCell(-1).textContent = ScaleModel.instances[key].semitoneSteps;
    }
  }
};