
// float32ToOctets( 123.456 ) -> [ 66, 246, 233, 121 ]
function float32ToOctets(number) {
    var buffer = new ArrayBuffer(4);
    new DataView(buffer).setFloat32(0, number, false);
    return [].slice.call( new Uint8Array(buffer) );
}

// octetsToFloat32( [ 66, 246, 233, 121 ] ) -> 123.456
function octetsToFloat32( octets ) {
    var buffer = new ArrayBuffer(4);
    new Uint8Array( buffer ).set( octets );
    return new DataView( buffer ).getFloat32(0, false);
}

// float64ToOctets( 123.456 ) -> [ 64, 94, 221, 47, 26, 159, 190, 119 ]
function float64ToOctets(number) {
    var buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return [].slice.call( new Uint8Array(buffer) );
}

// octetsToFloat64( [ 64, 94, 221, 47, 26, 159, 190, 119 ] ) -> 123.456
function octetsToFloat64( octets ) {
    var buffer = new ArrayBuffer(8);
    new Uint8Array( buffer ).set( octets );
    return new DataView( buffer ).getFloat64(0, false);
}

// intToBinaryString( 8 ) -> "00001000"
function intToBinaryString( i, length ) {
    length = length || 8;
    for(i = i.toString(2); i.length < length; i="0"+i);
    return i;
}

// binaryStringToInt( "00001000" ) -> 8
function binaryStringToInt( b ) {
    return parseInt(b, 2);
}

function octetsToBinaryString( octets ) {
    return octets.map( function(i){ return intToBinaryString(i); } ).join("");
}

function float32ToBinaryString( number ) {
    return octetsToBinaryString( float32ToOctets( number ) );
}

function binaryStringToFloat32( string ) {
    return octetsToFloat32( string.match(/.{8}/g).map( binaryStringToInt ) );
}

function float64ToBinaryString( number ) {
    return octetsToBinaryString( float64ToOctets( number ) );
}

function binaryStringToFloat64( string ) {
    return octetsToFloat64( string.match(/.{8}/g).map( binaryStringToInt ) );
}

function toIEEE754F32Parsed(v) {
    var string = octetsToBinaryString( float32ToOctets(v) );
    var parts = string.match(/^(.)(.{8})(.{23})$/); // sign{1} exponent{8} fraction{23}

    var bSign = parts[1];
    var sign = Math.pow( -1, parseInt(bSign,2) );

    var bExponent = parts[2];
    var exponent = parseInt( bExponent, 2 );

    var exponentNormalized = exponent - 127;
    var bSignificand = parts[3];

    var bHidden = (exponent === 0) ? "0" : "1";

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

function toIEEE754F64Parsed(v) {
    var string = octetsToBinaryString( float64ToOctets(v) );
    var parts = string.match(/^(.)(.{11})(.{52})$/); // sign{1} exponent{11} fraction{52}

    var bSign = parts[1];
    var sign = Math.pow( -1, parseInt(bSign,2) );

    var bExponent = parts[2];
    var exponent = parseInt( bExponent, 2 );

    var exponentNormalized = exponent - 1023;
    var bSignificand = parts[3];

    var bHidden = (exponent === 0) ? "0" : "1";

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
    float64ToOctets: float64ToOctets,
    octetsToFloat64: octetsToFloat64,
    float32ToOctets: float32ToOctets,
    octetsToFloat32: octetsToFloat32,
    intToBinaryString: intToBinaryString,
    binaryStringToInt: binaryStringToInt,
    octetsToBinaryString: octetsToBinaryString,
    float32ToBinaryString: float32ToBinaryString,
    binaryStringToFloat32: binaryStringToFloat32,
    float64ToBinaryString: float64ToBinaryString,
    binaryStringToFloat64: binaryStringToFloat64,
    toIEEE754F64Parsed: toIEEE754F64Parsed,
    toIEEE754F32Parsed: toIEEE754F32Parsed
};
