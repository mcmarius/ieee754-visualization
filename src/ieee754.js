const {getFloat16, setFloat16} = require("../node_modules/@petamoriken/float16");

// float16ToOctets( 123.456 ) -> [ 66, 246, 233, 121 ]
function float16ToOctets(number) {
    const buffer = new ArrayBuffer(2);
    setFloat16(new DataView(buffer), 0, number, false);
    return [].slice.call(new Uint8Array(buffer));
}

// octetsToFloat16( [ 66, 246, 233, 121 ] ) -> 123.456
function octetsToFloat16(octets) {
    const buffer = new ArrayBuffer(2);
    new Uint8Array(buffer).set(octets);
    return getFloat16(new DataView(buffer), 0, false);
}

// float32ToOctets( 123.456 ) -> [ 66, 246, 233, 121 ]
function float32ToOctets(number) {
    const buffer = new ArrayBuffer(4);
    new DataView(buffer).setFloat32(0, number, false);
    return [].slice.call(new Uint8Array(buffer));
}

// octetsToFloat32( [ 66, 246, 233, 121 ] ) -> 123.456
function octetsToFloat32(octets) {
    const buffer = new ArrayBuffer(4);
    new Uint8Array(buffer).set(octets);
    return new DataView(buffer).getFloat32(0, false);
}

// float64ToOctets( 123.456 ) -> [ 64, 94, 221, 47, 26, 159, 190, 119 ]
function float64ToOctets(number) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return [].slice.call(new Uint8Array(buffer));
}

// octetsToFloat64( [ 64, 94, 221, 47, 26, 159, 190, 119 ] ) -> 123.456
function octetsToFloat64(octets) {
    const buffer = new ArrayBuffer(8);
    new Uint8Array(buffer).set(octets);
    return new DataView(buffer).getFloat64(0, false);
}

// intToBinaryString( 8 ) -> "00001000"
function intToBinaryString(i, length) {
    length = length || 8;
    for (i = i.toString(2); i.length < length; i = "0" + i) ;
    return i;
}

// binaryStringToInt( "00001000" ) -> 8
function binaryStringToInt(b) {
    return parseInt(b, 2);
}

function octetsToBinaryString(octets) {
    return octets.map(function (i) {
        return intToBinaryString(i);
    }).join("");
}


const fMap = {
    fp16: {
        eBits: 5,
        sBits: 10,
        eNorm: 15,
        f2o: float16ToOctets,
        o2f: octetsToFloat16
    },
    fp32: {
        eBits: 8,
        sBits: 23,
        eNorm: 127,
        f2o: float32ToOctets,
        o2f: octetsToFloat32
    },
    fp64: {
        eBits: 11,
        sBits: 52,
        eNorm: 1023,
        f2o: float64ToOctets,
        o2f: octetsToFloat64
    }
};

function binaryStringToFloat(string, type) {
    return fMap[type].o2f(string.match(/.{8}/g).map(binaryStringToInt));
}

function toIEEE754Parsed(v, fType) {
    const string = octetsToBinaryString(fMap[fType].f2o(v));
    const parts = string.match(new RegExp(`^(.)(.{${fMap[fType].eBits}})(.{${fMap[fType].sBits}})$`));
    // sign{1} exponent{8/11} fraction{23/52}

    const bSign = parts[1];
    const sign = Math.pow(-1, parseInt(bSign, 2));

    const bExponent = parts[2];
    const exponent = parseInt(bExponent, 2);

    const exponentNormalized = exponent - fMap[fType].eNorm;
    const bSignificand = parts[3];

    const bHidden = (exponent === 0) ? "0" : "1";

    return {
        value: v,
        bFull: bSign + bExponent + bHidden + bSignificand,
        bSign: bSign,
        bExponent: bExponent,
        bHidden: bHidden,
        bSignificand: bSignificand,
        sign: sign,
        exponent: exponent,
        exponentNormalized: exponentNormalized,
    };
}

module.exports = {
    intToBinaryString: intToBinaryString,
    binaryStringToFloat: binaryStringToFloat,
    toIEEE754Parsed: toIEEE754Parsed
};
