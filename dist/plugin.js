
/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(

/* Mounting options */
{
  "name": "windy-plugin-pondlife",
  "version": "0.3.2",
  "author": "davinchi",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/antimeat/windy-plugin-pondlife.git"
  },
  "description": "Windy plugin to overlay kite/ws spots with links to BoM, Seabreeze and DoT data",
  "displayName": "obs-and-spots",
  "hook": "menu"
},

/* HTML */
'',

/* CSS */
'',

/* Constructor */
function() {

	const bcast = W.require('broadcast');
	const store = W.require('store');
	const picker = W.require('picker');
	const _ = W.require('utils');
	const {map} = W.require('map');


		const swell_obs = {
			'Rottnest': [
				'Rottnest',
				-32.0067,
				115.5025,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/RDW_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/RDW_Wave.gif'],

			'Mandurah':[
				'Mandurah',
				-32.5167,
				115.7328,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/MDW_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/MDW_Wave.gif'],

			'Cottesloe':[
				'Cottesloe',
				-31.9803,
				115.6889,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWM_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWM_Wave.gif'],

			'Tantabiddi':[
				'Tantabiddi',
				-21.8843,
				113.9487,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/TAN_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/TAN_Wave.gif'],

			'Jurien-Bay':[
				'Jurien-Bay',
				-30.282714129177634,
				114.96253473408153,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWJ_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWJ_Wave.gif'],

			'Cape-Naturaliste':[
				'Cape-Naturaliste',
				-33.5372,
				115.0189,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWN_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWN_Wave.gif'],

			'Esperance':[
				'Esperance',
				-33.68,
				121.83,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWE_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWE_Wave.gif'],

			'Albany':[
				'Albany',
				-34.94,
				117.80,
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWA_POLD.gif',
				'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWA_Wave.gif'],
		};

		const observations = {
			'Rottnest': ['Rottnest',-32.0067,115.5025,'http://res4.seabreeze.com.au/img/weather/reports/rott/rottnest-island_wind-report.png'],
			'Garden-Island':['Garden-Island',-32.2144,115.6786,'http://res2.seabreeze.com.au/img/weather/reports/gard/garden-island_wind-report.png'],
			'Safety-Bay':['Safety-Bay',-32.3072,115.72228,'http://res4.seabreeze.com.au/img/weather/reports/safe/safety-bay_wind-report.png'],
			'Mandurah':['Mandurah',-32.5167,115.7328,'http://res4.seabreeze.com.au/img/weather/reports/mand/mandurah_wind-report.png'],
			'Melville-Water':['Melvill-Water',-31.99,115.83,'http://res4.seabreeze.com.au/img/weather/reports/melv/melville-water_wind-report.png'],
			'Fish-Rocks':['Fish-Rocks',-32.0722, 115.7463,'http://res4.seabreeze.com.au/img/weather/reports/fre2/fsc-fish-rocks_wind-report.png'],
			'Ocean-Reef':['Ocean-Reef', -31.76,115.73,'http://res4.seabreeze.com.au/img/weather/reports/ocea/ocean-reef_wind-report.png'],
			'Swanbourne':['Swanbourne',-31.96,115.76,'http://res4.seabreeze.com.au/img/weather/reports/swan/swanbourne_wind-report.png'],
			'Geraldton':['Geraldton',-28.7953, 114.6975,'http://res4.seabreeze.com.au/img/weather/reports/gera/geraldton_wind-report.png'],
			'Point-Moore':['Point-Moore',-28.7781, 114.5687,'http://res4.seabreeze.com.au/img/weather/reports/ptmr/point-moore_wind-report.png'],
			'Bunbury':['Bunbury',-33.36,115.64,'http://res4.seabreeze.com.au/img/weather/reports/bunb/bunbury_wind-report.png'],
			'Busselton-Jetty':['Busselton-Jetty',-33.63,115.34,'http://res4.seabreeze.com.au/img/weather/reports/buss/busselton-jetty_wind-report.png'],
			'Cape-Naturaliste':['Cape-Naturaliste',-33.5372, 115.0189,'http://res4.seabreeze.com.au/img/weather/reports/capn/cape-naturaliste_wind-report.png'],
			'Geraldton-Offshore':['Geraldton-Offshore',-28.7702, 114.6022,'http://res4.seabreeze.com.au/img/weather/reports/gerd/geraldton-offshore_wind-report.png'],
			'Broome':['Broome',-17.9475, 122.2353,'http://res4.seabreeze.com.au/img/weather/reports/broo/broome_wind-report.png'],
			'Coral-Bay':['Coral-Bay',-23.1552, 113.7659,'http://res4.seabreeze.com.au/img/weather/reports/cora/coral-bay_wind-report.png'],
			'Gnaraloo':['Gnaraloo',-24.8878, 113.6700,'http://res4.seabreeze.com.au/img/weather/reports/carn/gnaraloo_wind-report.png'],
			'Witchcliffe':['Witchcliffe',-34.0281,115.1042,'http://res4.seabreeze.com.au/img/weather/reports/witc/witchcliffe_wind-report.png'],
			'Esperance':['Esperance',-33.68,121.83,'http://res4.seabreeze.com.au/img/weather/reports/espe/esperance_wind-report.png'],
			'Albany':['Albany',-34.94,117.80,'http://res4.seabreeze.com.au/img/weather/reports/albc/albany-airport_wind-report.png'],
			'Cape-Leeuwin':['Cape-Leeuwin',-34.37,115.14,'http://res4.seabreeze.com.au/img/weather/reports/cape/cape-leeuwin_wind-report.png'],
		};

		const forecasts = {
			'Local-Waters':['Local-Waters',"<a href='http://www.bom.gov.au/wa/forecasts/perth-waters.shtml', target='_blank'>Local Waters</a>"],
			'Pilbara-Coast-West':['Pilbara-Coast-West',"<a href='http://www.bom.gov.au/wa/forecasts/pilbara-coast-west.shtml', target='_blank'>Pilbara-Coast-West</a>"],
			'Ningaloo-Coast':['Ningaloo-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/ningaloo-coast.shtml', target='_blank'>Ningaloo-Coast</a>"],
			'Gascoyne-Coast':['Gascoyne-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/gascoyne-coast.shtml', target='_blank'>Gascoyne-Coast</a>"],
			'Geraldton-Coast':['Geraldton-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/geraldton-coast.shtml', target='_blank'>Geraldton-Coast</a>"],
			'Lancelin-Coast':['Lancelin-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/lancelin-coast.shtml', target='_blank'>Lancelin-Coast</a>"],
			'Perth-Coast':['Perth-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/perth-coast.shtml', target='_blank'>Perth-Coast</a>"],
			'Geographe-Coast':['Geographe-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/geographe-coast.shtml', target='_blank'>Geographe-Coast</a>"],
			'Leeuwin-Coast':['Leeuwin-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/leeuwin-coast.shtml', target='_blank'>Leeuwin-Coast</a>"],
			'Albany-Coast':['Albany-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/albany-coast.shtml', target='_blank'>Albany-Coast</a>"],
			'Esperance-Coast':['Esperance-Coast',"<a href='http://www.bom.gov.au/wa/forecasts/esperance-coast.shtml', target='_blank'>Esperance-Coast</a>"],
			'AccessG3-Local':['AccessG3-Local',"<a href='http://www.bom.gov.au/australia/charts/viewer/index.shtml?type=windarrow&level=10m&tz=AWST&area=PLW&model=R&chartSubmit=Refresh+View', target='_blank'>Access-G3</a>"],
			'AccessG3':['AccessG3',"<a href='http://www.bom.gov.au/australia/charts/viewer/index.shtml?type=windarrow&level=10m&tz=AWST&area=WA&model=R&chartSubmit=Refresh+View', target='_blank'>Access-G3</a>"],
		};

		const spot_locations = {
			'The-Pond':[
				'The-Pond',
				-32.3178,
				115.7117,
				[observations['Rottnest'],observations['Garden-Island'],observations['Safety-Bay']],
				[forecasts['Local-Waters'],forecasts['Perth-Coast'],forecasts['AccessG3-Local']],
			],
			'Secrets':[
				'Secrets',
				-32.40944444,
				115.74416667,
				[observations['Rottnest'],observations['Garden-Island'],observations['Safety-Bay'],observations['Mandurah']],
				[forecasts['Local-Waters'],forecasts['Perth-Coast'],forecasts['AccessG3-Local']]
			],
			'Corros':[
				'Corros',
				-28.5527,
				114.5292,
				[observations['Geraldton-Offshore'],observations['Geraldton'],observations['Point-Moore']],
				[forecasts['Geraldton-Coast'],forecasts['Lancelin-Coast'],forecasts['AccessG3']],
			],
			'Gearies-Avalon':[
				'Gearies-Avalon',
				-32.5889,
				115.6368,
				[observations['Mandurah'],observations['Rottnest'],observations['Garden-Island']],
				[forecasts['Local-Waters'],forecasts['AccessG3-Local']],
			],
			'Wedge':[
				'Wedge',
				-30.83373,
				115.20199,
				[observations['Geraldton-Offshore'],observations['Rottnest'],observations['Garden-Island']],
				[forecasts['Lancelin-Coast'],forecasts['Local-Waters'],forecasts['Perth-Coast'],forecasts['AccessG3']],
			],
			'Margs':[
				'Margs',
				-33.9772,
				114.9803,
				[observations['Witchcliffe'],observations['Busselton-Jetty'],observations['Cape-Naturaliste']],
				[forecasts['Leeuwin-Coast'],forecasts['Geographe-Coast'],forecasts['AccessG3']],
			],
			'Gnaraloo-Tombies':[
				'Gnaraloo-Tombies',
				-23.8828,
				113.4807,
				[observations['Gnaraloo'],observations['Coral-Bay'],observations['Geraldton-Offshore']],
				[forecasts['Ningaloo-Coast'],forecasts['Gascoyne-Coast'],forecasts['AccessG3']],
			],
			'Floreat-Trigg':[
				'Floreat-Trigg',
				-31.9236,
				115.7528,
				[observations['Rottnest'],observations['Garden-Island'],observations['Swanbourne'],observations['Ocean-Reef']],
				[forecasts['Local-Waters'],forecasts['Perth-Coast'],forecasts['AccessG3-Local']],
			],
			'Augusta':[
				'Augusta',
				-34.3299,
				115.1823,
				[observations['Cape-Naturaliste'],observations['Albany'],observations['Cape-Leeuwin']],
				[forecasts['Leeuwin-Coast'],forecasts['Albany-Coast'],forecasts['AccessG3']],
			],
			'Denmark':[
				'Denmark',
				-35.0271,
				117.3371,
				[observations['Cape-Naturaliste'],observations['Albany'],observations['Cape-Leeuwin']],
				[forecasts['Albany-Coast'],forecasts['Esperance-Coast'],forecasts['AccessG3']],
			],
			'Esperance':[
				'Esperance',
				-33.8914,
				121.8335,
				[observations['Cape-Leeuwin'],observations['Albany'],observations['Esperance']],
				[forecasts['Esperance-Coast'],forecasts['Albany-Coast'],forecasts['AccessG3']],
			],
		};

        const black_icon = L.icon({
            className: 'resources-icon',
			iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [20, 30],
            iconAnchor: [12, 30],
            popupAnchor: [1, -34],
            shadowSize: [30, 30],
        });

        const blue_icon = L.icon({
            className: 'resources-icon',
			iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [20, 30],
            iconAnchor: [12, 30],
            popupAnchor: [1, -34],
            shadowSize: [30, 30],
        });

        const green_icon = L.icon({
            className: 'resources-icon',
			iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
			iconSize: [20, 30],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [20, 30],
            iconAnchor: [12, 30],
            popupAnchor: [1, -34],
            shadowSize: [30, 30]
        });

		const remove_url = (spot_forecast) => {
			var s_url = spot_forecast.split(',')[0];
			const url = s_url.substring(9,s_url.lastIndexOf("'"));

			return url;
		};

        let markers = null;
		let obs_markers = null;
		let swell_markers = null;
		let swell_polylines = null;

		const makeSwellPolylines = () => {
			swell_polylines.forEach((m, i) => {
				for (var [key, value] of Object.entries(swell_obs)) {
					var [swell_name,swell_lat,swell_lon,swell_current,swell_history] = swell_obs[key];

					var lat = swell_lat;
					var lon = swell_lon;

					if(swell_lon <= 116) {
						lat = swell_lat;
						lon = swell_lon - 3;
					}
					else if(swell_lat <= 30) {
						lat = swell_lat - 1;
						lon = swell_lon;
					}
					else {
						lat = swell_lat + 1;
						lon = swell_lon;
					}

					if(swell_name == 'Cottesloe') {
						lat = swell_lat;
						lon = swell_lon - 2.5;
					}

					var latlngs = [
						[lat, lon],
						[swell_lat, swell_lon]
					];

				};
			});

		};

		const makeSwellMarkers = () => {
			swell_markers.forEach((m, i) => {
				for (const [key, value] of Object.entries(swell_obs)) {
					const [swell_name,swell_lat,swell_lon,swell_current,swell_history] = swell_obs[key];
				};
			});

		};

		const makeObsMarkers = () => {
			obs_markers.forEach((m, i) => {
				for (const [key, value] of Object.entries(observations)) {
					const [obs_name,obs_lat,obs_lon,obs_link] = observations[key];
				};
			});
		};

		const makeMarkers = () => {
			markers.forEach((m, i) => {
				for (const [key, value] of Object.entries(spot_locations)) {
					const [spot_name,spot_lat,spot_lon,obs,forecasts] = spot_locations[key];
				};
			});
		};

		const createHTMLString = (s,spot_forecast,i) => {
			var s = s;
			var i = i;

			s = s + "<a href=" +  remove_url(spot_forecast[i][1]) + " target='forecast'>" + spot_forecast[i][0] + "</a><br>";

			if (i > 0) {
				i = i - 1;
				s = createHTMLString(s,spot_forecast,i);
			}

			return s;
		}

		const createSwellMarkers = (swell_name,swell_lat,swell_lon,swell_current,swell_history) => {

			var lat = swell_lat;
			var lon = swell_lon;

			if(swell_lon <= 116) {
				lat = swell_lat;
				lon = swell_lon - 3;
			}
			else if(swell_lat <= 30) {
				lat = swell_lat - 1;
				lon = swell_lon;
			}
			else {
				lat = swell_lat + 1;
				lon = swell_lon;
			}

			if(swell_name == 'Cottesloe') {
				lat = swell_lat;
				lon = swell_lon - 2.5;
			}

			const swell_marker = L.marker([lat, lon],{
                icon: blue_icon,
                zIndexOffset: -300,
            }).addTo(map);

			swell_marker.bindTooltip("<h5>" + swell_name + "</h5>");

            swell_marker.bindPopup(
                '<style> div.container {display:inline-block;} p {text-align:center;} </style>' +
                '<div class = "container">' +
                    '<img src=' + swell_current + ' style="float:left; opacity: 1; width:45%;"/>' +
                    '<img src=' + swell_history + ' style="float:right; opacity: 1; width:55%;"/>' +
                '</div>' , {

                minWidth: 800,
			});

			return swell_marker;
		};

		const createSwellPolylines = (swell_name,swell_lat,swell_lon,swell_current,swell_history) => {

			var lat = swell_lat;
			var lon = swell_lon;

			if(swell_lon <= 116) {
				lat = swell_lat;
				lon = swell_lon - 3;
			}
			else if(swell_lat <= 30) {
				lat = swell_lat - 1;
				lon = swell_lon;
			}
			else {
				lat = swell_lat + 1;
				lon = swell_lon;
			}

			if(swell_name == 'Cottesloe') {
				lat = swell_lat;
				lon = swell_lon - 2.5;
			}

			var latlngs = [
				[lat, lon],
				[swell_lat, swell_lon]
			];

			const swell_polyline = L.polyline(latlngs, {color: 'white', weight: '0.5', dashArray: '5, 5', dashOffset: '2'}).addTo(map);

			return swell_polyline;
		};

		const createObsPopup = (obs_name,obs_lat,obs_lon,obs_link) => {

			const obs_marker = L.marker([obs_lat, obs_lon],{
                icon: green_icon,
                zIndexOffset: -300,
				opacity: 1,
            }).addTo(map);

			obs_marker.bindTooltip("<h5>obs: " + obs_name + "</h5>");

            obs_marker.bindPopup('<img src = ' + obs_link + ' style="width:100%;"/>' + '<br>', {
				minWidth: 700,
			});

			return obs_marker;
		};

        const createSpotPopup = (spot_name,spot_lat,spot_lon,spot_obs,spot_forecast) => {

			const marker = L.marker([spot_lat, spot_lon],{
                icon: black_icon,
                zIndexOffset: -300,
				opacity: 1,
				iconSize: 50,
            }).addTo(map);

			marker.bindTooltip("<h5>spot: " + spot_name + "</h5>");

			marker.bindPopup(
				"<h1>" + spot_name + "</h1>" + "<br>" + createHTMLString('',spot_forecast,spot_forecast.length-1) +
				"<iframe name='forecast' id='forecast' width=800 height=600 src=" + remove_url(spot_forecast[0][1]) +"></iframe>", {
				minWidth: 800,
				minHeight: 600,
			});

			return marker;
        };

		const reStart = () => {
			markers = Object.keys(spot_locations).map((k,i) => createSpotPopup(spot_locations[k][0],spot_locations[k][1],spot_locations[k][2],spot_locations[k][3],spot_locations[k][4]));
			obs_markers = Object.keys(observations).map((k,i) => createObsPopup(observations[k][0],observations[k][1],observations[k][2],observations[k][3]));
			swell_markers = Object.keys(swell_obs).map((k,i) => createSwellMarkers(swell_obs[k][0],swell_obs[k][1],swell_obs[k][2],swell_obs[k][3],swell_obs[k][4]));
			swell_polylines = Object.keys(swell_obs).map((k,i) => createSwellPolylines(swell_obs[k][0],swell_obs[k][1],swell_obs[k][2],swell_obs[k][3],swell_obs[k][4]));
		};

		bcast.on("pluginClosed",e => {
			if (e=="detail") {

				if (!markers) {
					markers = Object.keys(spot_locations).map((k,i) => createSpotPopup(spot_locations[k][0],spot_locations[k][1],spot_locations[k][2],spot_locations[k][3],spot_locations[k][4]));
					bcast.on('redrawFinished', makeMarkers);
				}
				if (!obs_markers) {
					obs_markers = Object.keys(observations).map((k,i) => createObsPopup(observations[k][0],observations[k][1],observations[k][2],observations[k][3]));
					bcast.on('redrawFinished', makeObsMarkers);
				}
				if (!swell_markers) {
					swell_markers = Object.keys(swell_obs).map((k,i) => createSwellMarkers(swell_obs[k][0],swell_obs[k][1],swell_obs[k][2],swell_obs[k][3],swell_obs[k][4]));
					bcast.on('redrawFinished', makeSwellMarkers);
				}
				if (!swell_polylines) {
					swell_polylines = Object.keys(swell_obs).map((k,i) => createSwellPolylines(swell_obs[k][0],swell_obs[k][1],swell_obs[k][2],swell_obs[k][3],swell_obs[k][4]));
					bcast.on('redrawFinished', makeSwellPolylines);
				}
				console.log('detail closed');
			}
		});

        this.onopen = () => {
            if (!markers) {
				markers = Object.keys(spot_locations).map((k,i) => createSpotPopup(spot_locations[k][0],spot_locations[k][1],spot_locations[k][2],spot_locations[k][3],spot_locations[k][4]));
				bcast.on('redrawFinished', makeMarkers);
			}
			if (!obs_markers) {
				obs_markers = Object.keys(observations).map((k,i) => createObsPopup(observations[k][0],observations[k][1],observations[k][2],observations[k][3]));
				bcast.on('redrawFinished', makeObsMarkers);
			}
			if (!swell_markers) {
				swell_markers = Object.keys(swell_obs).map((k,i) => createSwellMarkers(swell_obs[k][0],swell_obs[k][1],swell_obs[k][2],swell_obs[k][3],swell_obs[k][4]));
				bcast.on('redrawFinished', makeSwellMarkers);
			}
			if (!swell_polylines) {
				swell_polylines = Object.keys(swell_obs).map((k,i) => createSwellPolylines(swell_obs[k][0],swell_obs[k][1],swell_obs[k][2],swell_obs[k][3],swell_obs[k][4]));
				bcast.on('redrawFinished', makeSwellPolylines);
			}

		};

        this.onclose = () => {
            if (markers) {
                markers.forEach(m => map.removeLayer(m));
				bcast.off('redrawFinished', makeMarkers);
				markers = null;
			}
			if (obs_markers) {
                obs_markers.forEach(m => map.removeLayer(m));
				bcast.off('redrawFinished', makeObsMarkers);
				obs_markers = null;
			}
			if (swell_markers) {
                swell_markers.forEach(m => map.removeLayer(m));
				bcast.off('redrawFinished', makeSwellMarkers);
				swell_markers = null;
			}
			if (swell_polylines) {
                swell_polylines.forEach(m => map.removeLayer(m));
				bcast.off('redrawFinished', makeSwellPolylines);
				swell_polylines = null;
            }
        };

});