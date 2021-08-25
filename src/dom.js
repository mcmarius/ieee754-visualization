// `arraify` takes an array-like object and turns it into real Array
// to make all the Array.prototype goodness available.
const arrayify = function (a) {
    return [].slice.call(a);
};

// `$` returns first element for given CSS `selector` in the `context` of
// the given element or whole document.
const $ = function (selector, context) {
    context = context || document;
    return context.querySelector(selector);
};

// `$$` return an array of elements for given CSS `selector` in the `context` of
// the given element or whole document.
const $$ = function (selector, context) {
    context = context || document;
    return arrayify(context.querySelectorAll(selector));
};

exports.arrayify = arrayify;
exports.$ = $;
exports.$$ = $$;


// cross-browser matchesSelector based on
// https://gist.github.com/jonathantneal/3062955
const ElementPrototype = window.Element.prototype;

const matchesSelector = ElementPrototype.matchesSelector ||
    ElementPrototype.mozMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    ElementPrototype.oMatchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    function (selector) {
        let node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;

        while (nodes[++i] && nodes[i] !== node) ;

        return !!nodes[i];
    };

exports.matchesSelector = function( element, selector ) {
    return matchesSelector.call( element, selector );
}
