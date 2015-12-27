# geo-convert-position-format

Converts between a few common geometry position formats:

* Flat arrays `[1,2,3,4,5,6]`
* Array of arrays `[[1,2,3], [4,5,6]]`
* Array of TypedArrays `[new Float32Array([1,2,3]), new Float32Array([4,5,6])]`
* TypedArray `new Float32Array([1,2,3,4,5,6])`
* [ndarray](https://www.npmjs.com/package/ndarray) `ndarray(new Float32Array([1,2,3,4,5,6]))`

## Install

```sh
npm install geo-convert-position-format
```

## Use
```js
var geoconv = require('geo-convert-position-format');
```

#### `geoconv.convert(positions, targetFormat, stride)`
Returns a copy of  `positions` converted from their current format into
`targetFormat` with stride `stride` if applicable.

`targetFormat` can be one of:

* `geoconv.FLAT_ARRAY`
* `geoconv.ARRAY_OF_ARRAYS`
* `geoconv.TYPED_ARRAY`
* `geoconv.ARRAY_OF_TYPED_ARRAYS`
* `geoconv.NDARRAY`
