'use strict'

var geoid = require('geo-identify-position-format');
var ndarray = require('ndarray');

module.exports = {
    convert: convert,
    FLAT_ARRAY: geoid.FLAT_ARRAY,
    ARRAY_OF_ARRAYS: geoid.ARRAY_OF_ARRAYS,
    TYPED_ARRAY: geoid.TYPED_ARRAY,
    ARRAY_OF_TYPED_ARRAYS: geoid.ARRAY_OF_TYPED_ARRAYS,
    NDARRAY: geoid.NDARRAY
}

function convert(positions, format, stride) {
    // Validate the target format.
    format = format === undefined ? geoid.TYPED_ARRAY : format;
    var validTypes = [
        geoid.FLAT_ARRAY,
        geoid.ARRAY_OF_ARRAYS,
        geoid.TYPED_ARRAY,
        geoid.ARRAY_OF_TYPED_ARRAYS,
        geoid.NDARRAY
    ]
    if (validTypes.indexOf(format) === -1) {
        throw new Error('geo-convert-position-format: Unknown target format ' + format);
    }

    // Get the old format.
    var oldFormat = geoid.identify(positions);

    // Convert to flat TypedArray.
    var intermediate;
    if (oldFormat === geoid.FLAT_ARRAY) {
        intermediate = new Float32Array(positions);
    } else if (oldFormat === geoid.TYPED_ARRAY) {
        intermediate = new Float32Array(positions);
    } else if (oldFormat === geoid.ARRAY_OF_ARRAYS) {
        intermediate = [];
        for (var i = 0; i < positions.length; i++) {
            intermediate.push.apply(intermediate, positions[i]);
        }
        intermediate = new Float32Array(intermediate);
    } else if (oldFormat === geoid.ARRAY_OF_TYPED_ARRAYS) {
        intermediate = [];
        for (var i = 0; i < positions.length; i++) {
            intermediate.push.apply(intermediate, positions[i]);
        }
        intermediate = new Float32Array(intermediate);
    } else if (oldFormat === geoid.NDARRAY) {
        intermediate = new Float32Array(positions.data);
    } else {
        throw new Error('geo-convert-position-format: Could not convert from incoming format ' + oldFormat);
    }

    // Validate the stride or guess it.
    if (stride === undefined) {
        if (intermediate.length % 3 === 0) {
            stride = 3;
        } else if (intermediate.length % 2 === 0) {
            stride = 2;
        } else {
            // Not sure if this will ever make sense, but tossing it in. Might
            // want to throw if we can't get 3 or 2 and the target format is
            // ARRAY_OF_*.
            stride = 1;
        }
    }
    if ([1,2,3].indexOf(stride) === -1) {
        throw new Error('geo-convert-position-format: Stride ' + stride +
                        ' not a valid stride - must be 1, 2, or 3');
    }
    if (intermediate.length % stride !== 0) {
        throw new Error('geo-convert-position-format: Stride ' + stride +
                        ' incompatible with element count ' + intermediate.length);
    }


    // Convert the immediate form to the target format.
    if (format === geoid.TYPED_ARRAY) {
        return intermediate;
    } else if (format === geoid.FLAT_ARRAY) {
        return Array.prototype.slice.call(intermediate);
    } else if (format === geoid.ARRAY_OF_ARRAYS) {
        var outer = [];
        var i = 0;
        for (var j = 0, jtotal = intermediate.length/stride; j < jtotal; j++) {
            var inner = [];
            for (var k = 0; k < stride; k++) {
                inner.push(intermediate[i++]);
            }
            outer.push(inner);
        }
        return outer;
    } else if (format === geoid.ARRAY_OF_TYPED_ARRAYS) {
        var outer = [];
        var i = 0;
        for (var j = 0, jtotal = intermediate.length/stride; j < jtotal; j++) {
            var inner = [];
            for (var k = 0; k < stride; k++) {
                inner.push(intermediate[i++]);
            }
            outer.push(new Float32Array(inner));
        }
        return outer;
    } else if (format === geoid.NDARRAY) {
        return ndarray(intermediate);
    }

    throw new Error('geo-convert-position-format: Could not convert to target format ' + format);

}
