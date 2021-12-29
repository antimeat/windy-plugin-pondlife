"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-pondlife",
  "version": "0.2.6",
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
function () {
  var _L$icon;

  var bcast = W.require('broadcast');

  var store = W.require('store');

  var detail = W.require('detail');

  var picker = W.require('picker');

  var _ = W.require('utils');

  var _W$require = W.require('map'),
      map = _W$require.map;

  var swell_obs = {
    'Rottnest': ['Rottnest', -32.0067, 115.5025, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/RDW_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/RDW_Wave.gif'],
    'Mandurah': ['Mandurah', -32.5167, 115.7328, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/MDW_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/MDW_Wave.gif'],
    'Cottesloe': ['Cottesloe', -31.9803, 115.6889, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWM_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWM_Wave.gif'],
    'Tantabiddi': ['Tantabiddi', -21.8843, 113.9487, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/TAN_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/TAN_Wave.gif'],
    'Jurien-Bay': ['Jurien-Bay', -30.282714129177634, 114.96253473408153, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWJ_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWJ_Wave.gif'],
    'Cape-Naturaliste': ['Cape-Naturaliste', -33.5372, 115.0189, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWN_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWN_Wave.gif'],
    'Esperance': ['Esperance', -33.68, 121.83, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWE_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWE_Wave.gif'],
    'Albany': ['Albany', -34.94, 117.80, 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWA_POLD.gif', 'http://www.transport.wa.gov.au/imarine/coastaldata/tidesandwaves/live_gfx/DWA_Wave.gif']
  };
  var observations = {
    'Rottnest': ['Rottnest', -32.0067, 115.5025, 'http://res4.seabreeze.com.au/img/weather/reports/rott/rottnest-island_wind-report.png'],
    'Garden-Island': ['Garden-Island', -32.2144, 115.6786, 'http://res2.seabreeze.com.au/img/weather/reports/gard/garden-island_wind-report.png'],
    'Safety-Bay': ['Safety-Bay', -32.3072, 115.72228, 'http://res4.seabreeze.com.au/img/weather/reports/safe/safety-bay_wind-report.png'],
    'Mandurah': ['Mandurah', -32.5167, 115.7328, 'http://res4.seabreeze.com.au/img/weather/reports/mand/mandurah_wind-report.png'],
    'Melville-Water': ['Melvill-Water', -31.99, 115.83, 'http://res4.seabreeze.com.au/img/weather/reports/melv/melville-water_wind-report.png'],
    'Fish-Rocks': ['Fish-Rocks', -32.0722, 115.7463, 'http://res4.seabreeze.com.au/img/weather/reports/fre2/fsc-fish-rocks_wind-report.png'],
    'Ocean-Reef': ['Ocean-Reef', -31.76, 115.73, 'http://res4.seabreeze.com.au/img/weather/reports/ocea/ocean-reef_wind-report.png'],
    'Swanbourne': ['Swanbourne', -31.96, 115.76, 'http://res4.seabreeze.com.au/img/weather/reports/swan/swanbourne_wind-report.png'],
    'Geraldton': ['Geraldton', -28.7953, 114.6975, 'http://res4.seabreeze.com.au/img/weather/reports/gera/geraldton_wind-report.png'],
    'Point-Moore': ['Point-Moore', -28.7781, 114.5687, 'http://res4.seabreeze.com.au/img/weather/reports/ptmr/point-moore_wind-report.png'],
    'Bunbury': ['Bunbury', -33.36, 115.64, 'http://res4.seabreeze.com.au/img/weather/reports/bunb/bunbury_wind-report.png'],
    'Busselton-Jetty': ['Busselton-Jetty', -33.63, 115.34, 'http://res4.seabreeze.com.au/img/weather/reports/buss/busselton-jetty_wind-report.png'],
    'Cape-Naturaliste': ['Cape-Naturaliste', -33.5372, 115.0189, 'http://res4.seabreeze.com.au/img/weather/reports/capn/cape-naturaliste_wind-report.png'],
    'Geraldton-Offshore': ['Geraldton-Offshore', -28.7702, 114.6022, 'http://res4.seabreeze.com.au/img/weather/reports/gerd/geraldton-offshore_wind-report.png'],
    'Broome': ['Broome', -17.9475, 122.2353, 'http://res4.seabreeze.com.au/img/weather/reports/broo/broome_wind-report.png'],
    'Coral-Bay': ['Coral-Bay', -23.1552, 113.7659, 'http://res4.seabreeze.com.au/img/weather/reports/cora/coral-bay_wind-report.png'],
    'Gnaraloo': ['Gnaraloo', -24.8878, 113.6700, 'http://res4.seabreeze.com.au/img/weather/reports/carn/gnaraloo_wind-report.png'],
    'Witchcliffe': ['Witchcliffe', -34.0281, 115.1042, 'http://res4.seabreeze.com.au/img/weather/reports/witc/witchcliffe_wind-report.png'],
    'Esperance': ['Esperance', -33.68, 121.83, 'http://res4.seabreeze.com.au/img/weather/reports/espe/esperance_wind-report.png'],
    'Albany': ['Albany', -34.94, 117.80, 'http://res4.seabreeze.com.au/img/weather/reports/albc/albany-airport_wind-report.png'],
    'Cape-Leeuwin': ['Cape-Leeuwin', -34.37, 115.14, 'http://res4.seabreeze.com.au/img/weather/reports/cape/cape-leeuwin_wind-report.png']
  };
  var forecasts = {
    'Local-Waters': ['Local-Waters', "<a href='http://www.bom.gov.au/wa/forecasts/perth-waters.shtml', target='_blank'>Local Waters</a>"],
    'Pilbara-Coast-West': ['Pilbara-Coast-West', "<a href='http://www.bom.gov.au/wa/forecasts/pilbara-coast-west.shtml', target='_blank'>Pilbara-Coast-West</a>"],
    'Ningaloo-Coast': ['Ningaloo-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/ningaloo-coast.shtml', target='_blank'>Ningaloo-Coast</a>"],
    'Gascoyne-Coast': ['Gascoyne-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/gascoyne-coast.shtml', target='_blank'>Gascoyne-Coast</a>"],
    'Geraldton-Coast': ['Geraldton-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/geraldton-coast.shtml', target='_blank'>Geraldton-Coast</a>"],
    'Lancelin-Coast': ['Lancelin-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/lancelin-coast.shtml', target='_blank'>Lancelin-Coast</a>"],
    'Perth-Coast': ['Perth-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/perth-coast.shtml', target='_blank'>Perth-Coast</a>"],
    'Geographe-Coast': ['Geographe-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/geographe-coast.shtml', target='_blank'>Geographe-Coast</a>"],
    'Leeuwin-Coast': ['Leeuwin-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/leeuwin-coast.shtml', target='_blank'>Leeuwin-Coast</a>"],
    'Albany-Coast': ['Albany-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/albany-coast.shtml', target='_blank'>Albany-Coast</a>"],
    'Esperance-Coast': ['Esperance-Coast', "<a href='http://www.bom.gov.au/wa/forecasts/esperance-coast.shtml', target='_blank'>Esperance-Coast</a>"],
    'AccessG3-Local': ['AccessG3-Local', "<a href='http://www.bom.gov.au/australia/charts/viewer/index.shtml?type=windarrow&level=10m&tz=AWST&area=PLW&model=R&chartSubmit=Refresh+View', target='_blank'>Access-G3</a>"],
    'AccessG3': ['AccessG3', "<a href='http://www.bom.gov.au/australia/charts/viewer/index.shtml?type=windarrow&level=10m&tz=AWST&area=WA&model=R&chartSubmit=Refresh+View', target='_blank'>Access-G3</a>"]
  };
  var spot_locations = {
    'The-Pond': ['The-Pond', -32.3178, 115.7117, [observations['Rottnest'], observations['Garden-Island'], observations['Safety-Bay']], [forecasts['Local-Waters'], forecasts['Perth-Coast'], forecasts['AccessG3-Local']]],
    'Secrets': ['Secrets', -32.40944444, 115.74416667, [observations['Rottnest'], observations['Garden-Island'], observations['Safety-Bay'], observations['Mandurah']], [forecasts['Local-Waters'], forecasts['Perth-Coast'], forecasts['AccessG3-Local']]],
    'Corros': ['Corros', -28.5527, 114.5292, [observations['Geraldton-Offshore'], observations['Geraldton'], observations['Point-Moore']], [forecasts['Geraldton-Coast'], forecasts['Lancelin-Coast'], forecasts['AccessG3']]],
    'Gearies-Avalon': ['Gearies-Avalon', -32.5889, 115.6368, [observations['Mandurah'], observations['Rottnest'], observations['Garden-Island']], [forecasts['Local-Waters'], forecasts['AccessG3-Local']]],
    'Wedge': ['Wedge', -30.83373, 115.20199, [observations['Geraldton-Offshore'], observations['Rottnest'], observations['Garden-Island']], [forecasts['Lancelin-Coast'], forecasts['Local-Waters'], forecasts['Perth-Coast'], forecasts['AccessG3']]],
    'Margs': ['Margs', -33.9772, 114.9803, [observations['Witchcliffe'], observations['Busselton-Jetty'], observations['Cape-Naturaliste']], [forecasts['Leeuwin-Coast'], forecasts['Geographe-Coast'], forecasts['AccessG3']]],
    'Gnaraloo-Tombies': ['Gnaraloo-Tombies', -23.8828, 113.4807, [observations['Gnaraloo'], observations['Coral-Bay'], observations['Geraldton-Offshore']], [forecasts['Ningaloo-Coast'], forecasts['Gascoyne-Coast'], forecasts['AccessG3']]],
    'Floreat-Trigg': ['Floreat-Trigg', -31.9236, 115.7528, [observations['Rottnest'], observations['Garden-Island'], observations['Swanbourne'], observations['Ocean-Reef']], [forecasts['Local-Waters'], forecasts['Perth-Coast'], forecasts['AccessG3-Local']]],
    'Augusta': ['Augusta', -34.3299, 115.1823, [observations['Cape-Naturaliste'], observations['Albany'], observations['Cape-Leeuwin']], [forecasts['Leeuwin-Coast'], forecasts['Albany-Coast'], forecasts['AccessG3']]],
    'Denmark': ['Denmark', -35.0271, 117.3371, [observations['Cape-Naturaliste'], observations['Albany'], observations['Cape-Leeuwin']], [forecasts['Albany-Coast'], forecasts['Esperance-Coast'], forecasts['AccessG3']]],
    'Esperance': ['Esperance', -33.8914, 121.8335, [observations['Cape-Leeuwin'], observations['Albany'], observations['Esperance']], [forecasts['Esperance-Coast'], forecasts['Albany-Coast'], forecasts['AccessG3']]]
  };
  var black_icon = L.icon({
    className: 'resources-icon',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 30],
    iconAnchor: [12, 30],
    popupAnchor: [1, -34],
    shadowSize: [30, 30]
  });
  var blue_icon = L.icon({
    className: 'resources-icon',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 30],
    iconAnchor: [12, 30],
    popupAnchor: [1, -34],
    shadowSize: [30, 30]
  });
  var green_icon = L.icon((_L$icon = {
    className: 'resources-icon',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [20, 30],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
  }, _defineProperty(_L$icon, "iconSize", [20, 30]), _defineProperty(_L$icon, "iconAnchor", [12, 30]), _defineProperty(_L$icon, "popupAnchor", [1, -34]), _defineProperty(_L$icon, "shadowSize", [30, 30]), _L$icon));

  var remove_url = function remove_url(spot_forecast) {
    var s_url = spot_forecast.split(',')[0];
    var url = s_url.substring(9, s_url.lastIndexOf("'"));
    return url;
  };

  var markers = null;
  var obs_markers = null;
  var swell_markers = null;
  var swell_polylines = null;

  var makeSwellPolylines = function makeSwellPolylines() {
    swell_polylines.forEach(function (m, i) {
      for (var _i = 0, _Object$entries = Object.entries(swell_obs); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var _swell_obs$key = _slicedToArray(swell_obs[key], 5),
            swell_name = _swell_obs$key[0],
            swell_lat = _swell_obs$key[1],
            swell_lon = _swell_obs$key[2],
            swell_current = _swell_obs$key[3],
            swell_history = _swell_obs$key[4];

        var lat = swell_lat;
        var lon = swell_lon;

        if (swell_lon <= 116) {
          lat = swell_lat;
          lon = swell_lon - 3;
        } else if (swell_lat <= 30) {
          lat = swell_lat - 1;
          lon = swell_lon;
        } else {
          lat = swell_lat + 1;
          lon = swell_lon;
        }

        if (swell_name == 'Cottesloe') {
          lat = swell_lat;
          lon = swell_lon - 2.5;
        }

        var latlngs = [[lat, lon], [swell_lat, swell_lon]];
      }

      ;
    });
  };

  var makeSwellMarkers = function makeSwellMarkers() {
    swell_markers.forEach(function (m, i) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(swell_obs); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        var _swell_obs$key2 = _slicedToArray(swell_obs[key], 5),
            swell_name = _swell_obs$key2[0],
            swell_lat = _swell_obs$key2[1],
            swell_lon = _swell_obs$key2[2],
            swell_current = _swell_obs$key2[3],
            swell_history = _swell_obs$key2[4];
      }

      ;
    });
  };

  var makeObsMarkers = function makeObsMarkers() {
    obs_markers.forEach(function (m, i) {
      for (var _i3 = 0, _Object$entries3 = Object.entries(observations); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            key = _Object$entries3$_i[0],
            value = _Object$entries3$_i[1];

        var _observations$key = _slicedToArray(observations[key], 4),
            obs_name = _observations$key[0],
            obs_lat = _observations$key[1],
            obs_lon = _observations$key[2],
            obs_link = _observations$key[3];
      }

      ;
    });
  };

  var makeMarkers = function makeMarkers() {
    markers.forEach(function (m, i) {
      for (var _i4 = 0, _Object$entries4 = Object.entries(spot_locations); _i4 < _Object$entries4.length; _i4++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
            key = _Object$entries4$_i[0],
            value = _Object$entries4$_i[1];

        var _spot_locations$key = _slicedToArray(spot_locations[key], 5),
            spot_name = _spot_locations$key[0],
            spot_lat = _spot_locations$key[1],
            spot_lon = _spot_locations$key[2],
            obs = _spot_locations$key[3],
            _forecasts = _spot_locations$key[4];
      }

      ;
    });
  };

  var createHTMLString = function createHTMLString(s, spot_forecast, i) {
    var s = s;
    var i = i;
    s = s + "<a href=" + remove_url(spot_forecast[i][1]) + " target='forecast'>" + spot_forecast[i][0] + "</a><br>";

    if (i > 0) {
      i = i - 1;
      s = createHTMLString(s, spot_forecast, i);
    }

    return s;
  };

  var createSwellMarkers = function createSwellMarkers(swell_name, swell_lat, swell_lon, swell_current, swell_history) {
    var lat = swell_lat;
    var lon = swell_lon;

    if (swell_lon <= 116) {
      lat = swell_lat;
      lon = swell_lon - 3;
    } else if (swell_lat <= 30) {
      lat = swell_lat - 1;
      lon = swell_lon;
    } else {
      lat = swell_lat + 1;
      lon = swell_lon;
    }

    if (swell_name == 'Cottesloe') {
      lat = swell_lat;
      lon = swell_lon - 2.5;
    }

    var swell_marker = L.marker([lat, lon], {
      icon: blue_icon,
      zIndexOffset: -300
    }).addTo(map);
    swell_marker.bindTooltip("<h5>" + swell_name + "</h5>");
    swell_marker.bindPopup('<img src=' + swell_current + ' style="opacity: 1;">' + '<img src=' + swell_history + ' style="opacity: 1;">', {
      minWidth: 580
    });
    return swell_marker;
  };

  var createSwellPolylines = function createSwellPolylines(swell_name, swell_lat, swell_lon, swell_current, swell_history) {
    var lat = swell_lat;
    var lon = swell_lon;

    if (swell_lon <= 116) {
      lat = swell_lat;
      lon = swell_lon - 3;
    } else if (swell_lat <= 30) {
      lat = swell_lat - 1;
      lon = swell_lon;
    } else {
      lat = swell_lat + 1;
      lon = swell_lon;
    }

    if (swell_name == 'Cottesloe') {
      lat = swell_lat;
      lon = swell_lon - 2.5;
    }

    var latlngs = [[lat, lon], [swell_lat, swell_lon]];
    var swell_polyline = L.polyline(latlngs, {
      color: 'white',
      weight: '0.5',
      dashArray: '5, 5',
      dashOffset: '2'
    }).addTo(map);
    return swell_polyline;
  };

  var createObsPopup = function createObsPopup(obs_name, obs_lat, obs_lon, obs_link) {
    var obs_marker = L.marker([obs_lat, obs_lon], {
      icon: green_icon,
      zIndexOffset: -300,
      opacity: 1
    }).addTo(map);
    obs_marker.bindTooltip("<h5>obs: " + obs_name + "</h5>");
    obs_marker.bindPopup('<img src = ' + obs_link + '/>' + '<br>', {
      minWidth: 580
    });
    return obs_marker;
  };

  var createSpotPopup = function createSpotPopup(spot_name, spot_lat, spot_lon, spot_obs, spot_forecast) {
    var marker = L.marker([spot_lat, spot_lon], {
      icon: black_icon,
      zIndexOffset: -300,
      opacity: 1,
      iconSize: 50
    }).addTo(map);
    marker.bindTooltip("<h5>spot: " + spot_name + "</h5>");
    marker.bindPopup("<h1>" + spot_name + "</h1>" + "<br>" + createHTMLString('', spot_forecast, spot_forecast.length - 1) + "<iframe name='forecast' id='forecast' width=800 height=600 src=" + remove_url(spot_forecast[0][1]) + "></iframe>", {
      minWidth: 800,
      minHeight: 600
    });
    return marker;
  };

  var reStart = function reStart() {
    markers = Object.keys(spot_locations).map(function (k, i) {
      return createSpotPopup(spot_locations[k][0], spot_locations[k][1], spot_locations[k][2], spot_locations[k][3], spot_locations[k][4]);
    });
    obs_markers = Object.keys(observations).map(function (k, i) {
      return createObsPopup(observations[k][0], observations[k][1], observations[k][2], observations[k][3]);
    });
    swell_markers = Object.keys(swell_obs).map(function (k, i) {
      return createSwellMarkers(swell_obs[k][0], swell_obs[k][1], swell_obs[k][2], swell_obs[k][3], swell_obs[k][4]);
    });
    swell_polylines = Object.keys(swell_obs).map(function (k, i) {
      return createSwellPolylines(swell_obs[k][0], swell_obs[k][1], swell_obs[k][2], swell_obs[k][3], swell_obs[k][4]);
    });
  };

  bcast.on("pluginClosed", function (e) {
    if (e == "detail") {
      if (!markers) {
        markers = Object.keys(spot_locations).map(function (k, i) {
          return createSpotPopup(spot_locations[k][0], spot_locations[k][1], spot_locations[k][2], spot_locations[k][3], spot_locations[k][4]);
        });
        bcast.on('redrawFinished', makeMarkers);
      }

      if (!obs_markers) {
        obs_markers = Object.keys(observations).map(function (k, i) {
          return createObsPopup(observations[k][0], observations[k][1], observations[k][2], observations[k][3]);
        });
        bcast.on('redrawFinished', makeObsMarkers);
      }

      if (!swell_markers) {
        swell_markers = Object.keys(swell_obs).map(function (k, i) {
          return createSwellMarkers(swell_obs[k][0], swell_obs[k][1], swell_obs[k][2], swell_obs[k][3], swell_obs[k][4]);
        });
        bcast.on('redrawFinished', makeSwellMarkers);
      }

      if (!swell_polylines) {
        swell_polylines = Object.keys(swell_obs).map(function (k, i) {
          return createSwellPolylines(swell_obs[k][0], swell_obs[k][1], swell_obs[k][2], swell_obs[k][3], swell_obs[k][4]);
        });
        bcast.on('redrawFinished', makeSwellPolylines);
      }

      console.log('detail closed');
    }
  });

  this.onopen = function () {
    if (!markers) {
      markers = Object.keys(spot_locations).map(function (k, i) {
        return createSpotPopup(spot_locations[k][0], spot_locations[k][1], spot_locations[k][2], spot_locations[k][3], spot_locations[k][4]);
      });
      bcast.on('redrawFinished', makeMarkers);
    }

    if (!obs_markers) {
      obs_markers = Object.keys(observations).map(function (k, i) {
        return createObsPopup(observations[k][0], observations[k][1], observations[k][2], observations[k][3]);
      });
      bcast.on('redrawFinished', makeObsMarkers);
    }

    if (!swell_markers) {
      swell_markers = Object.keys(swell_obs).map(function (k, i) {
        return createSwellMarkers(swell_obs[k][0], swell_obs[k][1], swell_obs[k][2], swell_obs[k][3], swell_obs[k][4]);
      });
      bcast.on('redrawFinished', makeSwellMarkers);
    }

    if (!swell_polylines) {
      swell_polylines = Object.keys(swell_obs).map(function (k, i) {
        return createSwellPolylines(swell_obs[k][0], swell_obs[k][1], swell_obs[k][2], swell_obs[k][3], swell_obs[k][4]);
      });
      bcast.on('redrawFinished', makeSwellPolylines);
    }
  };

  this.onclose = function () {
    if (markers) {
      markers.forEach(function (m) {
        return map.removeLayer(m);
      });
      bcast.off('redrawFinished', makeMarkers);
      markers = null;
    }

    if (obs_markers) {
      obs_markers.forEach(function (m) {
        return map.removeLayer(m);
      });
      bcast.off('redrawFinished', makeObsMarkers);
      obs_markers = null;
    }

    if (swell_markers) {
      swell_markers.forEach(function (m) {
        return map.removeLayer(m);
      });
      bcast.off('redrawFinished', makeSwellMarkers);
      swell_markers = null;
    }

    if (swell_polylines) {
      swell_polylines.forEach(function (m) {
        return map.removeLayer(m);
      });
      bcast.off('redrawFinished', makeSwellPolylines);
      swell_polylines = null;
    }
  };
});