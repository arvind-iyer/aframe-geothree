/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

let Geo = require('geo-three');

/**
 * A-Frame Maps Component component for A-Frame.
 */
AFRAME.registerComponent('geothree', {
  schema: {
    provider: {
      default: 'mapbox-satellite-labels',
      type: 'string'
    },
    providerHeight: {
      default: 'mapbox-satellite',
      type: 'string'
    },
    mapView: {
      default: 'planar', // Options: 'height', 'planar', 'height-shader', 'spherical'
      parse: selectMode
    },
    lod: {
      default: 'raycast', // Options: 'raycast', 'frustum', 'radial'
      parse: selectLod
    },
    mapboxApiKey: {
      default: '',
      type: 'string'
    },
    mapboxCustomStyle: {
      default: 'mapbox/dark-v10',
      type: 'string'
    },
    hereMapsAppCode: {
      default: '',
      type: 'string'
    },
    hereMapsAppId: {
      default: '',
      type: 'string'
    },
    bingApiKey: {
      default: '',
      type: 'string'
    },
    mapTilerApiKey: {
      default: '',
      type: 'string'
    },
    openMapTilesServerMap: {
      default: '',
      type: 'string'
    }
  },
  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function () {
    this.el.object3D.remove(this.map);
    this.provider = this._selectProvider(this.data.provider);
    this.providerHeight = this._selectProvider(this.data.providerHeight);
    console.log('Using map provider: ', this.provider);
    this.map = new Geo.MapView(this.data.mapView, this.provider, this.providerHeight);
    this.map.scale.multiplyScalar(0.0001);
    this.el.object3D.add(this.map);
    this.map.updateMatrixWorld(true);
  },

  _selectProvider: function (provider) {
    var OPEN_MAP_TILES_SERVER_MAP = '';

    switch (provider) {
      case 'openstreetmaps':
        return new Geo.OpenStreetMapsProvider();
      case 'opentilemaps':
        return new Geo.OpenMapTilesProvider(OPEN_MAP_TILES_SERVER_MAP);
      case 'mapbox-vector':
        return new Geo.MapBoxProvider(this.data.mapboxApiKey, 'mapbox/streets-v10', Geo.MapBoxProvider.STYLE);
      case 'mapbox-satellite':
        return new Geo.MapBoxProvider(this.data.mapboxApiKey, 'mapbox.satellite', Geo.MapBoxProvider.MAP_ID, 'jpg70', false);
      case 'mapbox-satellite-labels':
        return new Geo.MapBoxProvider(this.data.mapboxApiKey, 'mapbox/satellite-streets-v10', Geo.MapBoxProvider.STYLE, 'jpg70');
      case 'mapbox-dark':
        return new Geo.MapBoxProvider(this.data.mapboxApiKey, 'mapbox/dark-v10', Geo.MapBoxProvider.STYLE, 'jpg70');
      case 'mapbox-custom-style':
        return new Geo.MapBoxProvider(this.data.mapboxApiKey, this.data.mapboxCustomStyle, Geo.MapBoxProvider.STYLE);
      case 'heremaps-vector':
        return new Geo.HereMapsProvider(this.data.hereMapsAppId, this.data.hereMapsAppCode, 'base', 'normal.day');
      case 'heremaps-vector-night':
        return new Geo.HereMapsProvider(this.data.hereMapsAppId, this.data.hereMapsAppCode, 'base', 'normal.night');
      case 'heremaps-vector-terrain':
        return new Geo.HereMapsProvider(this.data.hereMapsAppId, this.data.hereMapsAppCode, 'aerial', 'terrain.day');
      case 'bingmaps-vector':
        return new Geo.BingMapsProvider(this.data.bingApiKey, Geo.BingMapsProvider.ROAD);
      case 'maptiler-vector-basic':
        return new Geo.MapTilerProvider(this.data.mapTilerApiKey, 'maps', 'basic', 'png');
      case 'maptiler-vector-outdoor':
        return new Geo.MapTilerProvider(this.data.mapTilerApiKey, 'maps', 'outdoor', 'png');
      case 'heremaps-satellite':
        return new Geo.HereMapsProvider(this.data.hereMapsAppId, this.data.hereMapsAppCode, 'aerial', 'satellite.day', 'jpg');
      case 'bingmaps-satellite':
        return new Geo.BingMapsProvider(this.data.bingApiKey, Geo.BingMapsProvider.AERIAL);
      case 'maptiler-satellite-labels':
        return new Geo.MapTilerProvider(this.data.mapTilerApiKey, 'maps', 'hybrid', 'jpg');
      case 'maptiler-satellite':
        return new Geo.MapTilerProvider(this.data.mapTilerApiKey, 'tiles', 'satellite', 'jpg');
      case 'mapbox-height':
        return new Geo.MapBoxProvider(this.data.mapboxApiKey, 'mapbox.terrain-rgb', Geo.MapBoxProvider.MAP_ID, 'pngraw');
      case 'maptiler-height':
        return new Geo.MapTilerProvider(this.data.mapTilerApiKey, 'tiles', 'terrain-rgb', 'png');
      case 'mapbox-debug-height':
        return new Geo.HeightDebugProvider(new Geo.MapBoxProvider(this.data.mapboxApiKey, 'mapbox.terrain-rgb', Geo.MapBoxProvider.MAP_ID, 'pngraw'));
      case 'debug':
        return new Geo.DebugProvider();
      default:
        return provider;
    }
  }
});

function selectMode(mode) {
  switch (mode) {
    case 'planar':
      return Geo.MapView.PLANAR;
    case 'height':
      return Geo.MapView.HEIGHT;
    case 'height-shader':
      return Geo.MapView.HEIGHT_SHADER;
    case 'spherical':
      return Geo.MapView.SPHERICAL;
    case 'martini':
      return Geo.MapView.MARTINI;
    default:
      return Geo.MapView.PLANAR;
  }
}

function selectLod(lod) {
  switch (lod) {
    case 'raycast':
      return Geo.LODRaycast;
    case 'frustum':
      return Geo.LODFrustum;
    case 'radial':
      return Geo.LODRadial;
    default:
      return Geo.LODRaycast;
  }
}

AFRAME.registerSystem('geothree', {
  latLngToWorldCoords: function (lat, lng) {
    var coords = Geo.UnitsUtils.datumsToSpherical(lat, lng);
    return {
      x: coords.x * 0.0001,
      y: 0,
      z: -coords.y * 0.0001
    };
  }
});

AFRAME.registerComponent('map-controls', {
  tick: function () {
    this.el.setAttribute('movement-controls', {
      speed: Math.max(0.0001, this.el.object3D.position.y / 3)
    })
    this.el.setAttribute('wasd-controls', {
      acceleration: Math.max(0.001, this.el.object3D.position.y * 5 )
    })
  }
})