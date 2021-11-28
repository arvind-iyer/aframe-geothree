## aframe-geothree-component

[![Version](http://img.shields.io/npm/v/aframe-geothree-component.svg?style=flat-square)](https://npmjs.org/package/aframe-geothree-component)
[![License](http://img.shields.io/npm/l/aframe-geothree-component.svg?style=flat-square)](https://npmjs.org/package/aframe-geothree-component)

World-scale maps using geo-three and support for multiple map providers (Mapbox, Bing, HereMaps, etc)

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-geothree-component@1.0.0/dist/aframe-geothree-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity geothree="foo: bar"></a-entity>
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
