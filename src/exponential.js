const dom = require("./dom");
const dynks = require("./dynks");

const exponentElement = dom.$("#exponent");
const exponentTwinElement = dom.$("#exponent-twin");
const significandElement = dom.$("#significand");
const valueElement = dom.$("#value");

// take value of significand and make it integer
const significand = Number(significandElement.innerHTML) * 10000;

function getCurrentValue() {
    return +exponentElement.innerHTML;
}

function updateValue(exponent) {
    exponentElement.innerHTML = exponent;
    exponentTwinElement.innerHTML = exponent;

    // compute value based on significand and exponent
    // there is some trickery forced to avoid computation errors
    const pow = exponent - 4;
    let value;
    if (pow >= 0) {
        value = significand * Math.pow(10, pow);
    } else {
        value = significand / Math.pow(10, -pow);
    }

    // turn value into fixed precision string
    value = value.toFixed(15);

    // and cut all unnecessary zeros
    // unfortunately .toFixed makes some computation errors visible
    // so we need to not only cut zeros but any insignificand digits
    // that appear
    const lastDigit = value.indexOf(String(significand % 10));
    const point = value.indexOf(".");
    const cut = point > lastDigit ? point + 2 : lastDigit + 1;

    valueElement.innerHTML = value.substr(0, cut);
}

dynks( exponentElement, getCurrentValue, updateValue );
