'use strict';

var geoconv = require('./index.js');
var geoid = require('geo-identify-position-format');
var ndarray = require('ndarray');

exports.testFromFlatArray = function(test) {
    test.expect(2);
    var flat = [1,2,3,4,5,6];
    var out = geoconv.convert(flat, geoconv.TYPED_ARRAY);
    test.equals(geoid.identify(out), geoid.TYPED_ARRAY);
    test.deepEqual(out, new Float32Array([1,2,3,4,5,6]));
    test.done();
}

exports.testFromArrayOfArrays = function(test) {
    test.expect(2);
    var aoa = [[1,2,3],[4,5,6]];
    var out = geoconv.convert(aoa, geoconv.TYPED_ARRAY);
    test.equals(geoid.identify(out), geoid.TYPED_ARRAY);
    test.deepEqual(out, new Float32Array([1,2,3,4,5,6]));
    test.done();
}

exports.testFromTypedArray = function(test) {
    test.expect(2);
    var typed = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(typed, geoconv.TYPED_ARRAY);
    test.equals(geoid.identify(out), geoid.TYPED_ARRAY);
    test.deepEqual(out, new Float32Array([1,2,3,4,5,6]));
    test.done();
}

exports.testFromArrayOfTypedArrays = function(test) {
    test.expect(2);
    var aoa = [new Float32Array([1,2,3]), new Float32Array([4,5,6])];
    var out = geoconv.convert(aoa, geoconv.TYPED_ARRAY);
    test.equals(geoid.identify(out), geoid.TYPED_ARRAY);
    test.deepEqual(out, new Float32Array([1,2,3,4,5,6]));
    test.done();
}

exports.testFromNDArray = function(test) {
    test.expect(2);
    var nda = ndarray(new Float32Array([1,2,3,4,5,6]));
    var out = geoconv.convert(nda, geoconv.TYPED_ARRAY);
    test.equals(geoid.identify(out), geoid.TYPED_ARRAY);
    test.deepEqual(out, new Float32Array([1,2,3,4,5,6]));
    test.done();
}

exports.testToFlatArray = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(src, geoconv.FLAT_ARRAY);
    test.equals(geoid.identify(out), geoid.FLAT_ARRAY);
    test.deepEqual(out, [1,2,3,4,5,6]);
    test.done();
}

exports.testToArrayOfArrays_auto_3 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_ARRAYS);
    test.deepEqual(out, [[1,2,3],[4,5,6]]);
    test.done();
}

exports.testToArrayOfArrays_auto_2 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_ARRAYS);
    test.deepEqual(out, [[1,2],[3,4]]);
    test.done();
}

exports.testToArrayOfArrays_auto_1 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_ARRAYS);
    test.deepEqual(out, [[1],[2],[3],[4],[5]]);
    test.done();
}

exports.testToArrayOfArrays_manual_3 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 3);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_ARRAYS);
    test.deepEqual(out, [[1,2,3],[4,5,6]]);
    test.done();
}

exports.testToArrayOfArrays_manual_2 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 2);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_ARRAYS);
    test.deepEqual(out, [[1,2],[3,4]]);
    test.done();
}

exports.testToArrayOfArrays_manual_1 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 1);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_ARRAYS);
    test.deepEqual(out, [[1],[2],[3],[4],[5]]);
    test.done();
}


exports.testToArrayOfTypedArrays_auto_3 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_TYPED_ARRAYS);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_TYPED_ARRAYS);
    test.deepEqual(out, [
        new Float32Array([1,2,3]),
        new Float32Array([4,5,6])
    ]);
    test.done();
}

exports.testToArrayOfTypedArrays_auto_2 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_TYPED_ARRAYS);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_TYPED_ARRAYS);
    test.deepEqual(out, [
        new Float32Array([1,2]),
        new Float32Array([3,4])
    ]);
    test.done();
}

exports.testToArrayOfTypedArrays_auto_1 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_TYPED_ARRAYS);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_TYPED_ARRAYS);
    test.deepEqual(out, [
        new Float32Array([1]),
        new Float32Array([2]),
        new Float32Array([3]),
        new Float32Array([4]),
        new Float32Array([5])
    ]);
    test.done();
}

exports.testToArrayOfTypedArrays_manual_3 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_TYPED_ARRAYS, 3);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_TYPED_ARRAYS);
    test.deepEqual(out, [
        new Float32Array([1,2,3]),
        new Float32Array([4,5,6])
    ]);
    test.done();
}

exports.testToArrayOfTypedArrays_manual_2 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_TYPED_ARRAYS, 2);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_TYPED_ARRAYS);
    test.deepEqual(out, [
        new Float32Array([1,2]),
        new Float32Array([3,4])
    ]);
    test.done();
}

exports.testToArrayOfTypedArrays_manual_1 = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5]);
    var out = geoconv.convert(src, geoconv.ARRAY_OF_TYPED_ARRAYS, 1);
    test.equals(geoid.identify(out), geoid.ARRAY_OF_TYPED_ARRAYS);
    test.deepEqual(out, [
        new Float32Array([1]),
        new Float32Array([2]),
        new Float32Array([3]),
        new Float32Array([4]),
        new Float32Array([5])
    ]);
    test.done();
}

exports.testToNDArray = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    var out = geoconv.convert(src, geoconv.NDARRAY);
    test.equals(geoid.identify(out), geoid.NDARRAY);
    test.deepEqual(out, ndarray(new Float32Array([1,2,3,4,5,6])));
    test.done();
}

exports.testFromUnknown = function(test) {
    test.expect(2);
    var src = 'not an array-like thing';
    test.throws(function() {
        geoconv.convert(src, geoconv.TYPED_ARRAY);
    });
    try {
        geoconv.convert(src, geoconv.TYPED_ARRAY);
    } catch (e) {
        test.equals(e.toString(), 'Error: geo-identify-position-format: Could not identify position format.')
    }
    test.done();
}

exports.testToUnknown = function(test) {
    test.expect(2);
    var src = new Float32Array([1,2,3,4,5,6]);
    test.throws(function() {
        geoconv.convert(src, 'not an actual thing');
    });
    try {
        geoconv.convert(src, 'not an actual thing');
    } catch (e) {
        test.equals(e.toString(), 'Error: geo-convert-position-format: Unknown target format not an actual thing');
    }
    test.done();
}

exports.testInvalidStride = function(test) {
    test.expect(2);
    var src = [1,2,3,4,5,6];
    test.throws(function() {
        geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 4);
    });
    try {
        geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 4);
    } catch (e) {
        test.equals(e.toString(), 'Error: geo-convert-position-format: Stride 4 not a valid stride - must be 1, 2, or 3');
    }
    test.done();
}

exports.testIncompatibleStride = function(test) {
    test.expect(2);
    var src = [1,2,3,4];
    test.throws(function() {
        geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 3);
    });
    try {
        geoconv.convert(src, geoconv.ARRAY_OF_ARRAYS, 3);
    } catch (e) {
        test.equals(e.toString(), 'Error: geo-convert-position-format: Stride 3 incompatible with element count 4')
    }

    test.done();
}
