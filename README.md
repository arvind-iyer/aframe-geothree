## aframe-geothree-component

[![Version](http://img.shields.io/npm/v/aframe-geothree-component.svg?style=flat-square)](https://npmjs.org/package/aframe-geothree-component)
[![License](http://img.shields.io/npm/l/aframe-geothree-component.svg?style=flat-square)](https://npmjs.org/package/aframe-geothree-component)

World-scale maps using [geo-three](https://github.com/tentone/geo-three) and support for multiple map providers (Mapbox, Bing, HereMaps, etc)

For [A-Frame](https://aframe.io).

<image src="screenshot-basic.jpg"></image>

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| provider | Map Tiles Provider | mapbox-satellite-labels |
| providerHeight | Map Tiles Provider to fetch terrain height | mapbox-satellite |
| mapView | Method to display map - planar, height, height-shader or spherical | planar |
| lod | decides how tiles are subdivided | raycast |
| mapboxApiKey | API Key for Mapbox | '' |
| mapboxCustomStyle | only when using mapbox-custom provider | 'mapbox/dark-v10 |
| hereMapsAppCode | App Code from HereMaps when using HereMaps providers | '' |
| hereMapsAppId | App ID from HereMaps when using HereMaps providers | '' |
| bingApiKey | Bing Maps API Key when using Bing maps providers | '' |
| mapTilerApiKey | MapTiler API Key when using MapTiler maps providers | '' | 
| openMapTilesServerMap | Server path for self-hosted OpenMapTiles Server | '' |   

### Providers 

List of available providers with required component parameters in square brackets:

TODO: Add screenshots for each provider

- openstreetmaps
- opentilemaps [openMapTilesServerMap]
- mapbox-vector [mapboxApiKey]
- mapbox-satellite [mapboxApiKey]
- mapbox-satellite-labels [mapboxApiKey]
- mapbox-dark [mapboxApiKey]
- mapbox-custom-style [mapboxApiKey, mapboxCustomStyle]
- heremaps-vector [hereMapsAppCode, hereMapsAppId]
- heremaps-vector-night [hereMapsAppCode, hereMapsAppId]
- heremaps-vector-terrain [hereMapsAppCode, hereMapsAppId]
- bingmaps-vector [bingApiKey]
- maptiler-vector-basic [mapTilerApiKey]
- maptiler-vector-outdoor [mapTilerApiKey]
- heremaps-satellite [hereMapsAppCode, hereMapsAppId]
- bingmaps-satellite [bingApiKey]
- maptiler-satellite-labels [mapTilerApiKey]
- maptiler-satellite [mapTilerApiKey]
- mapbox-height [mapboxApiKey]
- maptiler-height [mapTilerApiKey]
- mapbox-debug-height [mapboxApiKey]
- debug


### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-geothree-component@1.0.0/dist/aframe-geothree-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity geothree="provider: mapbox-dark; mapboxApiKey: pk.useamapboxapikeyhere"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-geothree-component
```

Then require and use.

```js
require('aframe');
require('aframe-geothree-component');
```
