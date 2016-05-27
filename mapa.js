


function init(){	
	var map = L.map('map');
	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 20, attribution: osmAttrib});		


	map.setView(new L.LatLng(51.3, 0.7),5);
	map.addLayer(osm);

	var twitts = L.geoJson().addTo(map);
	
	var request = 'http://localhost/bicing/bicing.php';

	$.getJSON(request, function(json){
		var xy = new Array();

		for(var i=0; i<5;i++){
			var xCoordinate= parseFloat(json.stations[i].longitude);
			var yCoordinate= parseFloat(json.stations[i].latitude);

			//aquest tall de codi afegier a l'array xy totes les coordenades. 
			xy[i] = [yCoordinate, xCoordinate];
			
				//var geojsonFeature = {
				//	    "type": "Feature",
				//	   
				//	    "geometry": {
				//		"type": "Point",
				//		"coordinates": [json.stations[i].longitude, json.stations[i].latitude]
				//	    }
				//};
				//twitts.addData(geojsonFeature);
			
		};
		
		//per a generar el heatmap, que està en l'array
		
		var heat = L.heatLayer(xy, {radius: 180}).addTo(map);
	});

	var baseLayers = {
			"osm": osm
		};


	L.control.layers(baseLayers).addTo(map);
	

}
