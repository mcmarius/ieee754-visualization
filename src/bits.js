const ieee754 = require("./ieee754");
const dom = require("./dom");

const visualization = dom.$(".visualization-bits");
const numberInput = dom.$("#number-input");
const fpType = dom.$("#fp-type");


const ftMap = {
    fp16: {
        expNormZero: -15,
        expNormValue: 15,
        expNormPosValue: 15,
        expNormNegValue: -15,
        dynksMin: -15,
        dynksMax: 16,
        exponentBits: 5,
        significandBits: 10
    },
    fp32: {
        expNormZero: -127,
        expNormValue: 127,
        expNormPosValue: 127,
        expNormNegValue: -127,
        dynksMin: -127,
        dynksMax: 128,
        exponentBits: 8,
        significandBits: 23
    },
    fp64: {
        expNormZero: -1023,
        expNormValue: 1023,
        expNormPosValue: 1023,
        expNormNegValue: -1023,
        dynksMin: -1023,
        dynksMax: 1024,
        exponentBits: 11,
        significandBits: 52
    }
}

function classNameFilter(className) {
    return function (bit) {
        return bit.classList.contains(className) && bit.classList.contains(fpType.value);
    };
}

//
// function keepVisibleBits(bits ){
//     return bits.map(bit => bit.classList.contains(fpType.value) || [].slice.call(bit.classList).every(x => x !== "fp32" && x !== "fp64"));
// }

const bits = dom.$$(".bit", visualization);

function bitsSign() {
    return bits.filter(classNameFilter("sign"));
}

function bitsExponent() {
    return bits.filter(classNameFilter("exponent"));
}

function bitsSignificand() {
    return bits.filter(classNameFilter("significand"));
}

const pointSlider = dom.$("#point-slider");
const pointSliderLabel = dom.$("#point-slider-label");

function getInputNumberValue() {
    return Number(numberInput.value.replace(/\u2212/g, "-"));
}

function setNumberInputValue(value) {
    value = Number(value);
    if (value === 0 && (1 / value < 0)) {
        // special case to detect and show negative zero
        value = "-0";
    } else {
        value = Number.prototype.toString.call(value);
    }

    value = value.replace(/-/g, "\u2212"); //pretty minus

    if (value !== numberInput.value) {
        numberInput.value = value;
    }
    updateVisualization();
}


function updateBitElementClasses( bitElements, bits, prevBit ) {
    prevBit = typeof prevBit == "string" ? prevBit.slice(-1) : "0";
    for (let i = 0; i < bits.length; i++) {
        const bitElement = bitElements[i];
        bitElement.classList.remove("one");
        bitElement.classList.remove("zero");
        bitElement.classList.remove("prev-one");
        bitElement.classList.remove("prev-zero");

        bitElement.classList.add(bits[i] === "1" ? "one" : "zero");
        if (i === 0) {
            bitElement.classList.add(prevBit === "1" ? "prev-one" : "prev-zero");
        }
    }
}


function updateBinary( parsed ) {
    const isExpandedMode = visualization.classList.contains("expanded");
    const bitsHidden = bits.filter(classNameFilter("hidden"));
    updateBitElementClasses(bitsSign(), parsed.bSign);
    updateBitElementClasses(bitsExponent(), parsed.bExponent, isExpandedMode ? "0" : parsed.bSign);
    updateBitElementClasses(bitsHidden, parsed.bHidden);
    updateBitElementClasses(bitsSignificand(), parsed.bSignificand, isExpandedMode ? parsed.bHidden : parsed.bExponent);

    pointSliderLabel.style.left = (parsed.exponentNormalized - 1) * 15 + "px";

    if (parsed.exponent !== Number(pointSlider.value)) {
        pointSlider.value = parsed.exponent;
    }
}


function classNamesToBinaryString( binaryString, bitSpan ) {
    binaryString += bitSpan.classList.contains("zero") ? "0" : "1";
    return binaryString;
}

function updateNumber( values ) {
    let b = "";

    let exponent, significand;
    if (values) {
        exponent = values.exponent;
        // significand = values.significand;
    }

    if (typeof exponent == "number") {
        exponent = ieee754.intToBinaryString(exponent, 11);
    } else {
        exponent = bitsExponent().reduce(classNamesToBinaryString, "");
    }
    if (typeof significand != "string") {
        significand = bitsSignificand().reduce(classNamesToBinaryString, "");
    }

    b += bitsSign().reduce(classNamesToBinaryString, "");
    b += exponent;
    b += significand;

    let f = ieee754.binaryStringToFloat(b, fpType.value);
    setNumberInputValue(f);
}


function generatePowersHtml( b, startPower, classPrefix, useOne ) {
    if (typeof startPower != "number") {
        startPower = b.length - 1;
    }

    classPrefix = classPrefix || "exponent-bit-";

    let htmlPowers = "";
    let htmlComputed = "";
    let htmlFractions = "";
    let htmlFractionsComputed = "";

    let allZeros = true;
    for (let i = 0, l = b.length; i < l; i++) {
        if (b[i] === "1") {
            allZeros = false;
            const p = startPower - i;
            const j = b.length - 1 - i;
            if (htmlPowers.length > 0) {
                htmlPowers += "<span class='mo'> + </span>";
                htmlComputed += "<span class='mo'> + </span>";
                htmlFractions += "<span class='mo'> + </span>";
                htmlFractionsComputed += "<span class='mo'> + </span>";
            }

            let powerHtml = '<span class="msup ' + (classPrefix + j) + '"><span class="mn">2</span><span class="mn">' + p + '</span></span>';

            if (useOne && p === 0) {
                powerHtml = '<span class="mn ' + (classPrefix + j) + '">1</span>';
            }
            htmlPowers += powerHtml;
            htmlComputed += '<span class="mn ' + (classPrefix + j) + '">' + Math.pow(2, p) + '</span>';

            if (p >= 0) {
                htmlFractions += powerHtml;
                htmlFractionsComputed += '<span class="mn ' + (classPrefix + j) + '">' + Math.pow(2, p) + '</span>';
            } else {
                htmlFractions += '<span class="mfrac ' + (classPrefix + j) + '"><span class="mn">1</span><span class="msup"><span class="mn">2</span><span class="mn">' + -p + '</span></span></span>';
                htmlFractionsComputed += '<span class="mfrac ' + (classPrefix + j) + '"><span class="mn">1</span><span class="mn">' + Math.pow(2, -p) + '</span></span>';
            }
        }
    }

    if (allZeros) {
        htmlPowers = htmlComputed = htmlFractions = htmlFractionsComputed = '<span class="mn">0</span>';
    }

    htmlFractionsComputed = htmlFractionsComputed.replace(/Infinity/g, "&infin;");

    return {
        powers: htmlPowers,
        computed: htmlComputed,
        fractions: htmlFractions,
        fractionsComputed: htmlFractionsComputed
    };
}

function updateMath( representation ) {
    // enrich representation with powers HTML

    const htmlExponent = generatePowersHtml(representation.bExponent);

    representation.exponentPowers = htmlExponent.powers;
    representation.exponentPowersComputed = htmlExponent.computed;

    const significandBits = representation.bHidden + representation.bSignificand;

    representation.exponentZero = representation.exponent;
    representation.exponentNormalizedZero = representation.exponentNormalized;


    // [...] subnormal numbers are encoded with a biased exponent of 0,
    // but are interpreted with the value of the smallest allowed exponent,
    // which is one greater (i.e., as if it were encoded as a 1).
    //
    // -- http://en.wikipedia.org/wiki/Denormal_number

    if (representation.exponentNormalizedZero === ftMap[fpType.value].expNormZero) {
        representation.exponentZero = representation.exponent + 1;
        representation.exponentNormalizedZero = representation.exponentNormalized + 1;
    }

    const htmlSignificand = generatePowersHtml(significandBits, representation.exponentNormalizedZero, "significand-bit-");
    const htmlSignificandNormalized = generatePowersHtml(significandBits, 0, "significand-bit-");
    const htmlSignificandNormalizedOne = generatePowersHtml(significandBits, 0, "significand-bit-", true);

    representation.significandPowersNormalized = htmlSignificandNormalized.powers;
    representation.significandPowersNormalizedOne = htmlSignificandNormalizedOne.powers;

    const equation = dom.$(".full-equation");

    if (isNaN(representation.value)) {
        representation.significandPowers = representation.significandPowersFractions
            = representation.significandPowersFractionsComputed = representation.significandPowersComputed
            = '<span class="mn significand-bit-any">NaN</span>';
    } else {
        representation.significandPowers = htmlSignificand.powers;
        representation.significandPowersFractions = htmlSignificand.fractions;
        representation.significandPowersFractionsComputed = htmlSignificand.fractionsComputed;
        representation.significandPowersComputed = htmlSignificand.computed;
    }

    if (representation.sign < 0)
        representation.signHtml = String(representation.sign).replace("-", "&minus;");
    else
        representation.signHtml = "+" + representation.sign;

    representation.absValue = representation.raw_frac.s === 1 ? representation.value : representation.value.slice(1);

    if (isNaN(representation.absValue)) {
        representation.absValue = "NaNNaNNaNNaN Batman!"
    }

    representation.expNormPosValue = ftMap[fpType.value].expNormPosValue;
    representation.expNormNegValue = ftMap[fpType.value].expNormNegValue;

    dom.$$(".msum").forEach(elem => elem.setAttribute('data-to', ftMap[fpType.value].significandBits));
    dom.$("#msub-text").innerHTML = ftMap[fpType.value].significandBits;

    const value = representation.value;
    representation.value = representation.frac;

    const dynamic = dom.$$(".math [data-ieee754-value]");

    dynamic.forEach(function (element) {
        element.innerHTML = representation[element.dataset.ieee754Value];
    });

    if (isNaN(value) || !isFinite(value)) {
        equation.classList.add("collapsed");
    } else {
        equation.classList.remove("collapsed");
    }
}

function updateVisualization() {
    const number = getInputNumberValue();
    let representation = ieee754.toIEEE754Parsed(number, fpType.value);

    updateBinary(representation);
    updateMath(representation);
}


// EVENT HANDLERS

fpType.addEventListener('change', function () {
    dom.$$('.fp16').forEach(elem => elem.style.display = 'none');
    dom.$$('.fp32').forEach(elem => elem.style.display = 'none');
    dom.$$('.fp64').forEach(elem => elem.style.display = 'none');
    dom.$$('.' + this.value).forEach(elem => elem.style = '');
    updateVisualization();
    updateNumber();
});


numberInput.addEventListener("change", function () {
    setNumberInputValue(getInputNumberValue());
    updateVisualization();
    updateNumber();
}, false);


numberInput.addEventListener("keydown", function (event) {
    let diff = 0;
    if (event.keyCode === 38 || event.keyCode === 40) {

        if (event.keyCode === 38) diff = +1;
        else diff = -1;

        if (event.shiftKey) {
            diff *= 10;
            if (event.altKey) {
                diff *= 10;
            }
        } else if (event.altKey) {
                diff /= 10;
            }

            setNumberInputValue( diff + getInputNumberValue() );

        event.preventDefault();
    }
}, false);


pointSlider.addEventListener( "change", function() {
    const exponent = Number(pointSlider.value);
    updateNumber( { exponent: exponent } );
}, false);

pointSlider.addEventListener( "click", function() {
    pointSlider.focus();
}, false);

document.body.addEventListener( "click", function( event ){
    const target = event.target;

    if (target.classList.contains("zero") || target.classList.contains("one")) {
        target.classList.toggle("zero");
        target.classList.toggle("one");

        updateNumber();
        updateVisualization();

        hoverRelatedExponentHandler( event );
        hoverRelatedSignificandHandler( event );
        hoverRelatedSignHandler( event );
    }

}, false);


// toggle hover class on parts of equation related to hovered bit
function createHoverRelatedHandler( selector, classPrefix ) {
    return function (event) {
        const target = event.target;
        if (dom.matchesSelector( target, selector )) {

            const siblings = dom.arrayify(target.parentNode.children).filter(classNameFilter("bit"));
            const n = siblings.length - siblings.indexOf(target) - 1;

            const related = dom.$$((classPrefix + n) + "," + (classPrefix + "any"));
            related.forEach(function (r) {
                r.classList[event.type === "mouseout" ? "remove" : "add"]("hover");
            });
        }
    };
}

const hoverRelatedExponentHandler = createHoverRelatedHandler(".bit.exponent", ".exponent-bit-");
document.body.addEventListener( "mouseover", hoverRelatedExponentHandler, false );
document.body.addEventListener( "mouseout", hoverRelatedExponentHandler, false );

const hoverRelatedSignificandHandler = createHoverRelatedHandler(".bit.significand, .bit.hidden", ".significand-bit-");
document.body.addEventListener( "mouseover", hoverRelatedSignificandHandler, false );
document.body.addEventListener( "mouseout", hoverRelatedSignificandHandler, false );

const hoverRelatedSignHandler = createHoverRelatedHandler(".bit.sign", ".sign-bit-");
document.body.addEventListener( "mouseover", hoverRelatedSignHandler, false );
document.body.addEventListener( "mouseout", hoverRelatedSignHandler, false );


// toggle nowrap class on a equation row when equals sign is clicked

document.body.addEventListener( "click", function( event ){
    const target = event.target;

    if (dom.matchesSelector(target, ".mrow > .equals")) {
        target.parentNode.classList.toggle("nowrap");
    }

}, false);


// make exponent value editable

const dynks = require("./dynks");

const exponentElement = dom.$("#exponent-dynks");
const exponentNormalizedElement = dom.$("#exponent-normalized-dynks");

function getCurrentExponentValue() {
    return +exponentElement.innerHTML;
}

function updateExponentValue(value) {
    const exponent = Number(value);
    updateNumber({exponent: exponent});
}

dynks(exponentElement, getCurrentExponentValue, updateExponentValue);

function getCurrentExponentNormalizedValue() {
    exponentNormalizedElement.dataset.dynksMin = ftMap[fpType.value].dynksMin;
    exponentNormalizedElement.dataset.dynksMax = ftMap[fpType.value].dynksMax;
    return +exponentNormalizedElement.innerHTML;
}

function updateExponentNormalizedValue(value) {
    const exponent = Number(value);
    updateNumber({exponent: exponent + ftMap[fpType.value].expNormValue});
}
dynks( exponentNormalizedElement, getCurrentExponentNormalizedValue, updateExponentNormalizedValue );


dom.$(".toggle-details-button").addEventListener("click", function(){
    visualization.classList.toggle("expanded");
}, false);

// GO!

updateVisualization();
