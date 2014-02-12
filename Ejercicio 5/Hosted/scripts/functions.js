$(function(){

	// ================================================== Variables ==================================================
	localStorage.rut = (localStorage.rut || "");
	var map, lat, lng, con = [], i, latp, lngp;
	if (localStorage.rut){con = JSON.parse(localStorage.rut);};	//  -->  Introduce en la variable "con" las rutas previas convertidas con JSON

	// ================================================== Funciones ==================================================
	function geolocalizar(){
		GMaps.geolocate({
			success: function(position){
				latp = lat = position.coords.latitude;	// guarda coords en lat y lng
				lngp = lng = position.coords.longitude; //  -->  Además las guarda también en "latp" y "lngp"
				map = new GMaps({				// muestra mapa centrado en coords [lat, lng]
					el: '#map',
					lat: lat,
					lng: lng,
					click: enlazarMarcador,
					tap: enlazarMarcador
				});
				map.addMarker({lat: lat, lng: lng});	// marcador en [lat, lng]
				mostrar();
			},
			error: function(error){alert('Geolocalización falla: '+error.message);},
			not_supported: function(){alert("Su navegador no soporta geolocalización");},
		});
	};
	function mostrar(){							//  -->  Muestra todas las rutas previas guardadas en "con"
		if (con){
			for (i=0; i<con.length; i++){
				map.drawRoute({
					origin: [lat, lng],
					destination: [con[i].latLng.nb, con[i].latLng.ob],
					travelMode: 'driving',
					strokeColor: '#000000',
					strokeOpacity: 0.6,
					strokeWeight: 5
				});
				lat = con[i].latLng.nb;
				lng = con[i].latLng.ob;
				map.addMarker({lat: lat, lng: lng});
			};
		};
	};
	function enlazarMarcador(e){				// muestra ruta entre marcas anteriores y actuales
		con.push(e);							//  -->  Mete en el array "con" un elemento nuevo "e" con un nuevo punto en la ruta
		localStorage.rut = JSON.stringify(con);	//  -->  Guarda en "rut" en array "con" con todos los puntos de la ruta
		map.drawRoute({
			origin: [lat, lng],					// origen en coordenadas anteriores
			destination: [e.latLng.lat(), e.latLng.lng()],	// destino en coordenadas del click o toque actual
			travelMode: 'driving',
			strokeColor: '#000000',
			strokeOpacity: 0.6,
			strokeWeight: 5
		});
		lat = e.latLng.lat();					// guarda coords para marca siguiente
		lng = e.latLng.lng();
		map.addMarker({lat: lat, lng: lng});	// pone marcador en mapa
	};
	function limpiar(){							//  -->  Limpia el mapa cuando haces click en el botón
		localStorage.rut = "";
		con = [];
		lat = latp;
		lng = lngp;
		map = new GMaps({						//  -->  Carga el nuvo mapa igual que en "geolocalizar"
			el: '#map',							//       No he usado el geolocalizar de nuevo porque para el navegador es más engorroso.
			lat: lat,
			lng: lng,
			click: enlazarMarcador,
			tap: enlazarMarcador
		});
		map.addMarker({lat: lat, lng: lng});
	};

	// =================================================== Código ====================================================
	geolocalizar();
	$("#limpiar").on("click", limpiar);
});