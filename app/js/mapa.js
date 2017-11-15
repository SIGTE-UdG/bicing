//var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
var osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">' +
	'OpenStreetMap</a> contributors';
var osm = L.tileLayer(osmUrl, {
	maxZoom: 18,
	attribution: osmAttrib,
	noWrap: true
});
var map = L.map('map', {
	layers: [osm],
	center: new L.LatLng(41.4, 2.15),
	zoom: 13
	//maxBounds: [[2.278786,41.45106],[2.0924,41.341664]]
});

//pannel informació
var infoPanel = L.Control.extend({
	options:{
		position:'topright'
	},
	onAdd:function(map){
		var pannel = L.DomUtil.create('div','info');
		pannel.style.backgroundColor = '#d10a0b';
		pannel.style.color = 'white';
		pannel.style.backgroundSize = "50px 50px";
    pannel.style.width = '250px';
    pannel.style.height = '230px';
		pannel.innerHTML = "<h1>Minuto a minuto del Bicing</h1><p class='subtitol'>Actividad (nº de bicis recogidas) en las estaciones de Bicing por minuto durante un dia laboral.</p><ul id='displayed-list'></ul>";

		return pannel;
	}
});
map.addControl(new infoPanel());

//control start-stop
var timer_state = false;

var customControl =  L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.style.backgroundColor = '#d10a0b';
		container.style.color = 'white';
    container.style.backgroundSize = "50px 50px";
    container.style.width = '100px';
    container.style.height = '30px';
		container.innerHTML = "Start/Stop";

		var timer;
		var timesRun = 0;
    container.onclick = function(){
			if (timer) {
					timer_state = false;
					clearInterval(timer);
					timer = undefined;
			} else {
					timer = setInterval(function () {
						if(temps_inici == 1508277540){temps_inici=1508223660;timer_state=false};
						timer_state = true;
						loadMarkers();
						//map.removeLayer(allMarkers);
					}, 100);
			}
    }

    return container;
  }
});
map.addControl(new customControl());


function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
}

var temps_inici = 1508223660;

var allMarkers = new Array();
function loadMarkers(){
	temps_inici = temps_inici+60;
	var url="http://127.0.0.1:5002/bicing/"+temps_inici;
	var request = jQuery.ajax({
		type: 'GET',
		url: url,
		crossDomain:true,
		dataType:'json',
		xhrFields: {
	  	withCredentials: true
	  },
		success: function (data){
			if(timer_state){
				for(i=0;i<data.features.length;i++){
	        var latlng = [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]];
	        var marker = L.circleMarker(latlng,{
	          //radius:data.features.properties.bikes*1.95+3,
	          radius:data.features[i].properties.bikes*5,
	          fillColor:"#EB0A0A",
	          color:"#ffffff",
	          weight:0,
	          fillOpacity:0.2,
						className:'animated-icon my-icon'
	        });
	        allMarkers.push(marker);
	        map.addLayer(marker);
	      };

				//update number of bikes
				var list = document.getElementById('displayed-list');
				var temps = 1;
				list.innerHTML = ' <b>Hora: '+msToTime(data.features[1].properties.hora)+'</b></br> <b>Nº de bicis: '+data.features.length+'</b>';

				//delete las markers of bikes
				if(allMarkers.length > 800){
					for(e=0;e<200;e++){
							allMarkers.splice(i,1);
							map.removeLayer(allMarkers[i]);
					}
				}
			}

		}
	});
};
