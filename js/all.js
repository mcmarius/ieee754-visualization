(function(c){"use strict";var d,y,o,h,m,s={".js":[],".json":[],".css":[],".html":[]},u=typeof require==="function"?require:null;h=function(e){var t=new Error("Could not find module '"+e+"'");t.code="MODULE_NOT_FOUND";return t};m=function(e,t,n){var r,o;if(typeof e[t+n]==="function")return t+n;for(r=0;o=s[n][r];++r){if(typeof e[t+o]==="function")return t+o}return null};d=function(e,t,n,r,o,s){var i,a,c,u,f,l,p;n=n.split("/");i=n.pop();if(i==="."||i===".."){n.push(i);i=""}while((a=n.shift())!=null){if(!a||a===".")continue;if(a===".."){e=t.pop();s=s.slice(0,s.lastIndexOf("/"))}else{t.push(e);e=e[a];s+="/"+a}if(!e)throw h(r)}if(i&&typeof e[i]!=="function"){l=m(e,i,".js");if(!l)l=m(e,i,".json");if(!l)l=m(e,i,".css");if(!l)l=m(e,i,".html");if(l){i=l}else if(o!==2&&typeof e[i]==="object"){t.push(e);e=e[i];s+="/"+i;i=""}}if(!i){if(o!==1&&e[":mainpath:"]){return d(e,t,e[":mainpath:"],r,1,s)}return d(e,t,"index",r,2,s)}f=e[i];if(!f)throw h(r);if(f.hasOwnProperty("module"))return f.module.exports;c={};f.module=u={exports:c,id:s+"/"+i};f.call(c,c,u,y(e,t,s));return u.exports};o=function(e,t,n,r){var o,s=n,i=n.charAt(0),a=0;if(i==="/"){s=s.slice(1);e=c["/"];if(!e){if(u)return u(n);throw h(n)}r="/";t=[]}else if(i!=="."){o=s.split("/",1)[0];e=c[o];if(!e){if(u)return u(n);throw h(n)}r=o;t=[];s=s.slice(o.length+1);if(!s){s=e[":mainpath:"];if(s){a=1}else{s="index";a=2}}}return d(e,t,s,n,a,r)};y=function(t,n,r){return function(e){return o(t,[].concat(n),e,r)}};return y(c,[],"")})({"ieee754-visualization":{node_modules:{"@petamoriken":{float16:{"index.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});const{setFloat16:r,getFloat16:o}=n("./lib/DataView.js");const{Float16Array:s,isFloat16Array:i}=n("./lib/Float16Array.js");const{hfround:a}=n("./lib/hfround.js");Object.defineProperty(e,"hfround",{enumerable:true,get:function(){return a}});Object.defineProperty(e,"Float16Array",{enumerable:true,get:function(){return s}});Object.defineProperty(e,"isFloat16Array",{enumerable:true,get:function(){return i}});Object.defineProperty(e,"getFloat16",{enumerable:true,get:function(){return o}});Object.defineProperty(e,"setFloat16",{enumerable:true,get:function(){return r}})},lib:{"DataView.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.getFloat16=r;e.setFloat16=i;var o=n("./helper/is.js");var s=n("./helper/lib.js");function r(e,t,...n){if(!(0,o.isDataView)(e)){throw new TypeError("First argument to getFloat16 function must be a DataView")}return(0,s.convertToNumber)(e.getUint16(t,...n))}function i(e,t,n,...r){if(!(0,o.isDataView)(e)){throw new TypeError("First argument to setFloat16 function must be a DataView")}e.setUint16(t,(0,s.roundToFloat16Bits)(n),...r)}},"Float16Array.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.isFloat16Array=c;e.Float16Array=void 0;var r=n("./helper/arrayIterator.js");var a=n("./helper/is.js");var p=n("./helper/lib.js");var o=n("./helper/private.js");var d=n("./helper/spec.js");const s=Symbol.for("__Float16Array__");const u=(0,o.createPrivateStorage)();function i(e){if(!(0,a.isObjectLike)(e)){return false}const t=e.constructor;if(t===undefined){return false}if(!(0,a.isObject)(t)){throw TypeError("constructor is not a object")}return Reflect.has(t,s)}function c(e){return i(e)&&!(0,a.isTypedArray)(e)}function f(e){return i(e)&&(0,a.isUint16Array)(e)}function y(e){if(!f(e)){throw new TypeError("This is not a Float16Array")}}function l(e){let t=u(e).target;if(t===undefined){const n=new w(e.buffer,e.byteOffset,e.length);t=u(n).target}return t}function h(e){return typeof e==="function"&&x.has(e)}function m(t){const n=t.length;const r=[];for(let e=0;e<n;++e){r.push((0,p.convertToNumber)(t[e]))}return r}const b=Object.freeze({apply(e,t,n){if(c(t)){const r=l(t);return Reflect.apply(e,r,n)}return Reflect.apply(e,t,n)}});const g=Object.freeze({get(t,n){if((0,a.isCanonicalIntegerIndexString)(n)){const e=Reflect.get(t,n);return e!==undefined?(0,p.convertToNumber)(e):undefined}else{const r=Reflect.get(t,n);if(!h(r)){return r}let e=u(r).proxy;if(e===undefined){e=u(r).proxy=new Proxy(r,b)}return e}},set(e,t,n){if((0,a.isCanonicalIntegerIndexString)(t)){return Reflect.set(e,t,(0,p.roundToFloat16Bits)(n))}else{return Reflect.set(e,t,n)}}});const v=Object.prototype.hasOwnProperty;class w extends Uint16Array{constructor(e,t,n){if(c(e)){super(l(e))}else if((0,a.isObject)(e)&&!(0,a.isArrayBuffer)(e)){let t;let n;if((0,a.isTypedArray)(e)){t=e;n=e.length;const o=e.buffer;const s=!(0,a.isSharedArrayBuffer)(o)?(0,d.SpeciesConstructor)(o,ArrayBuffer):ArrayBuffer;const i=new s(n*w.BYTES_PER_ELEMENT);super(i)}else if((0,a.isIterable)(e)){t=[...e];n=t.length;super(n)}else{t=e;n=(0,d.LengthOfArrayLike)(e);super(n)}for(let e=0;e<n;++e){this[e]=(0,p.roundToFloat16Bits)(t[e])}}else{switch(arguments.length){case 0:super();break;case 1:super(e);break;case 2:super(e,t);break;case 3:super(e,t,n);break;default:super(...arguments)}}const r=new Proxy(this,g);u(r).target=this;u(this).proxy=r;return r}static from(e,...t){if(c(e)&&t.length===0){const o=new Uint16Array(e.buffer,e.byteOffset,e.length);return new w(o.slice().buffer)}if(t.length===0){return new w(Uint16Array.from(e,p.roundToFloat16Bits).buffer)}const n=t[0];const r=t[1];return new w(Uint16Array.from(e,function(e,...t){return(0,p.roundToFloat16Bits)(n.call(this,e,...t))},r).buffer)}static of(...t){const n=t.length;const e=new w(n);const r=l(e);for(let e=0;e<n;++e){r[e]=(0,p.roundToFloat16Bits)(t[e])}return e}keys(){y(this);return super.keys()}values(){y(this);const t=super.values();return(0,r.wrapInArrayIterator)(function*(){for(const e of t){yield(0,p.convertToNumber)(e)}}())}entries(){y(this);const n=super.entries();return(0,r.wrapInArrayIterator)(function*(){for(const[e,t]of n){yield[e,(0,p.convertToNumber)(t)]}}())}at(e){y(this);const t=this.length;const n=(0,d.ToIntegerOrInfinity)(e);const r=n>=0?n:t+n;if(r<0||r>=t){return}return(0,p.convertToNumber)(this[r])}map(t,...e){y(this);const n=e[0];const r=this.length;const o=(0,d.SpeciesConstructor)(this,w);if(o===w){const i=new w(r);const a=l(i);for(let e=0;e<r;++e){const c=(0,p.convertToNumber)(this[e]);a[e]=(0,p.roundToFloat16Bits)(t.call(n,c,e,u(this).proxy))}return i}const s=new o(r);for(let e=0;e<r;++e){const c=(0,p.convertToNumber)(this[e]);s[e]=t.call(n,c,e,u(this).proxy)}return s}filter(n,...e){y(this);const r=e[0];const o=[];for(let e=0,t=this.length;e<t;++e){const i=(0,p.convertToNumber)(this[e]);if(n.call(r,i,e,u(this).proxy)){o.push(i)}}const t=(0,d.SpeciesConstructor)(this,w);const s=new t(o);return s}reduce(t,...e){y(this);const n=this.length;if(n===0&&e.length===0){throw TypeError("Reduce of empty array with no initial value")}let r,o;if(e.length===0){r=(0,p.convertToNumber)(this[0]);o=1}else{r=e[0];o=0}for(let e=o;e<n;++e){r=t(r,(0,p.convertToNumber)(this[e]),e,u(this).proxy)}return r}reduceRight(t,...e){y(this);const n=this.length;if(n===0&&e.length===0){throw TypeError("Reduce of empty array with no initial value")}let r,o;if(e.length===0){r=(0,p.convertToNumber)(this[n-1]);o=n-2}else{r=e[0];o=n-1}for(let e=o;e>=0;--e){r=t(r,(0,p.convertToNumber)(this[e]),e,u(this).proxy)}return r}forEach(n,...e){y(this);const r=e[0];for(let e=0,t=this.length;e<t;++e){n.call(r,(0,p.convertToNumber)(this[e]),e,u(this).proxy)}}find(n,...e){y(this);const r=e[0];for(let e=0,t=this.length;e<t;++e){const o=(0,p.convertToNumber)(this[e]);if(n.call(r,o,e,u(this).proxy)){return o}}}findIndex(n,...e){y(this);const r=e[0];for(let e=0,t=this.length;e<t;++e){const o=(0,p.convertToNumber)(this[e]);if(n.call(r,o,e,u(this).proxy)){return e}}return-1}findLast(t,...e){y(this);const n=e[0];for(let e=this.length-1;e>=0;--e){const r=(0,p.convertToNumber)(this[e]);if(t.call(n,r,e,u(this).proxy)){return r}}}findLastIndex(t,...e){y(this);const n=e[0];for(let e=this.length-1;e>=0;--e){const r=(0,p.convertToNumber)(this[e]);if(t.call(n,r,e,u(this).proxy)){return e}}return-1}every(n,...e){y(this);const r=e[0];for(let e=0,t=this.length;e<t;++e){if(!n.call(r,(0,p.convertToNumber)(this[e]),e,u(this).proxy)){return false}}return true}some(n,...e){y(this);const r=e[0];for(let e=0,t=this.length;e<t;++e){if(n.call(r,(0,p.convertToNumber)(this[e]),e,u(this).proxy)){return true}}return false}set(e,...t){y(this);const n=(0,d.ToIntegerOrInfinity)(t[0]);if(n<0){throw RangeError("offset is out of bounds")}if(c(e)){const i=l(e);super.set(i,n);return}const r=this.length;const o=Object(e);const s=(0,d.LengthOfArrayLike)(o);if(n===Infinity||s+n>r){throw RangeError("offset is out of bounds")}for(let e=0;e<s;++e){this[e+n]=(0,p.roundToFloat16Bits)(o[e])}}reverse(){y(this);super.reverse();return u(this).proxy}fill(e,...t){y(this);super.fill((0,p.roundToFloat16Bits)(e),...t);return u(this).proxy}copyWithin(e,t,...n){y(this);super.copyWithin(e,t,...n);return u(this).proxy}sort(...e){y(this);const n=e[0]!==undefined?e[0]:d.defaultCompare;super.sort((e,t)=>{return n((0,p.convertToNumber)(e),(0,p.convertToNumber)(t))});return u(this).proxy}slice(...e){y(this);const t=(0,d.SpeciesConstructor)(this,w);if(t===w){const f=new Uint16Array(this.buffer,this.byteOffset,this.length);const l=f.slice(...e);return new w(l.buffer)}const n=this.length;const r=(0,d.ToIntegerOrInfinity)(e[0]);const o=e[1]===undefined?n:(0,d.ToIntegerOrInfinity)(e[1]);let s;if(r===-Infinity){s=0}else if(r<0){s=n+r>0?n+r:0}else{s=n<r?n:r}let i;if(o===-Infinity){i=0}else if(o<0){i=n+o>0?n+o:0}else{i=n<o?n:o}const a=i-s>0?i-s:0;const c=new t(a);if(a===0){return c}let u=0;while(s<i){c[u]=(0,p.convertToNumber)(this[s]);++s;++u}return c}subarray(...e){y(this);const t=new Uint16Array(this.buffer,this.byteOffset,this.length);const n=t.subarray(...e);const r=(0,d.SpeciesConstructor)(this,w);const o=new r(n.buffer,n.byteOffset,n.length);return o}indexOf(n,...e){y(this);const r=this.length;let o=(0,d.ToIntegerOrInfinity)(e[0]);if(o===Infinity){return-1}if(o<0){o+=r;if(o<0){o=0}}for(let e=o,t=r;e<t;++e){if(v.call(this,e)&&(0,p.convertToNumber)(this[e])===n){return e}}return-1}lastIndexOf(t,...e){y(this);const n=this.length;let r=e.length>=1?(0,d.ToIntegerOrInfinity)(e[0]):n-1;if(r===-Infinity){return-1}if(r>=0){r=r<n-1?r:n-1}else{r+=n}for(let e=r;e>=0;--e){if(v.call(this,e)&&(0,p.convertToNumber)(this[e])===t){return e}}return-1}includes(n,...e){y(this);const r=this.length;let o=(0,d.ToIntegerOrInfinity)(e[0]);if(o===Infinity){return false}if(o<0){o+=r;if(o<0){o=0}}const s=Number.isNaN(n);for(let e=o,t=r;e<t;++e){const i=(0,p.convertToNumber)(this[e]);if(s&&Number.isNaN(i)){return true}if(i===n){return true}}return false}join(...e){y(this);const t=m(this);return t.join(...e)}toLocaleString(...e){y(this);const t=m(this);return t.toLocaleString(...e)}get[Symbol.toStringTag](){if(f(this)){return"Float16Array"}}}e.Float16Array=w;Object.defineProperty(w,"BYTES_PER_ELEMENT",{value:Uint16Array.BYTES_PER_ELEMENT});Object.defineProperty(w,s,{});const N=w.prototype;Object.defineProperty(N,Symbol.iterator,{value:N.values,writable:true,configurable:true});const x=new WeakSet;for(const T of Reflect.ownKeys(N)){if(T==="constructor"){continue}const j=N[T];if(typeof j==="function"){x.add(j)}}},helper:{"arrayIterator.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.wrapInArrayIterator=a;var r=n("./private.js");const o=(0,r.createPrivateStorage)();const s=Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));const i=Object.create(s,{next:{value:function e(){return o(this).iterator.next()},writable:true,configurable:true},[Symbol.toStringTag]:{value:"Array Iterator",configurable:true}});function a(e){const t=Object.create(i);o(t).iterator=e;return t}},"is.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.isObject=o;e.isObjectLike=s;e.isDataView=a;e.isTypedArray=f;e.isUint16Array=l;e.isArrayBuffer=p;e.isSharedArrayBuffer=d;e.isIterable=y;e.isCanonicalIntegerIndexString=h;var r=n("./spec.js");function o(e){return e!==null&&typeof e==="object"||typeof e==="function"}function s(e){return e!==null&&typeof e==="object"}const i=Object.prototype.toString;function a(e){return ArrayBuffer.isView(e)&&i.call(e)==="[object DataView]"}const c=Object.getPrototypeOf(Uint8Array).prototype;const u=Object.getOwnPropertyDescriptor(c,Symbol.toStringTag).get;function f(e){return u.call(e)!==undefined}function l(e){return u.call(e)==="Uint16Array"}function p(e){return s(e)&&i.call(e)==="[object ArrayBuffer]"}function d(e){return s(e)&&i.call(e)==="[object SharedArrayBuffer]"}function y(e){return o(e)&&typeof e[Symbol.iterator]==="function"}function h(e){return typeof e==="string"&&e===(0,r.ToIntegerOrInfinity)(e)+""}},"lib.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.roundToFloat16Bits=c;e.convertToNumber=p;const r=new ArrayBuffer(4);const o=new Float32Array(r);const s=new Uint32Array(r);const i=new Uint32Array(512);const a=new Uint32Array(512);for(let e=0;e<256;++e){const d=e-127;if(d<-27){i[e]=0;i[e|256]=32768;a[e]=24;a[e|256]=24}else if(d<-14){i[e]=1024>>-d-14;i[e|256]=1024>>-d-14|32768;a[e]=-d-1;a[e|256]=-d-1}else if(d<=15){i[e]=d+15<<10;i[e|256]=d+15<<10|32768;a[e]=13;a[e|256]=13}else if(d<128){i[e]=31744;i[e|256]=64512;a[e]=24;a[e|256]=24}else{i[e]=31744;i[e|256]=64512;a[e]=13;a[e|256]=13}}function c(e){o[0]=e;const t=s[0];const n=t>>23&511;return i[n]+((t&8388607)>>a[n])}const u=new Uint32Array(2048);const f=new Uint32Array(64);const l=new Uint32Array(64);u[0]=0;for(let n=1;n<1024;++n){let e=n<<13;let t=0;while((e&8388608)===0){t-=8388608;e<<=1}e&=~8388608;t+=947912704;u[n]=e|t}for(let e=1024;e<2048;++e){u[e]=939524096+(e-1024<<13)}f[0]=0;for(let e=1;e<31;++e){f[e]=e<<23}f[31]=1199570944;f[32]=2147483648;for(let e=33;e<63;++e){f[e]=2147483648+(e-32<<23)}f[63]=3347054592;l[0]=0;for(let e=1;e<64;++e){if(e===32){l[e]=0}else{l[e]=1024}}function p(e){const t=e>>10;s[0]=u[l[t]+(e&1023)]+f[t];return o[0]}},"private.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.createPrivateStorage=r;function r(){const r=new WeakMap;return e=>{const t=r.get(e);if(t!==undefined){return t}const n=Object.create(null);r.set(e,n);return n}}},"spec.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.ToIntegerOrInfinity=r;e.LengthOfArrayLike=i;e.SpeciesConstructor=a;e.defaultCompare=c;function o(e){return e!==null&&typeof e==="object"||typeof e==="function"}function r(e){const t=Number(e);if(Number.isNaN(t)||t===0){return 0}if(t===Infinity){return Infinity}if(t===-Infinity){return-Infinity}return Math.trunc(t)}function s(e){const t=r(e);if(t<0){return 0}return t<Number.MAX_SAFE_INTEGER?t:Number.MAX_SAFE_INTEGER}function i(e){if(!o(e)){throw TypeError("this is not a object")}return s(e.length)}function a(e,t){if(!o(e)){throw TypeError("this is not a object")}const n=e.constructor;if(n===undefined){return t}if(!o(n)){throw TypeError("constructor is not a object")}const r=n[Symbol.species];if(r==null){return t}return r}function c(e,t){const[n,r]=[Number.isNaN(e),Number.isNaN(t)];if(n&&r){return 0}if(n){return 1}if(r){return-1}if(e<t){return-1}if(e>t){return 1}if(e===0&&t===0){const[o,s]=[Object.is(e,0),Object.is(t,0)];if(!o&&s){return-1}if(o&&!s){return 1}}return 0}}},"hfround.js":function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.hfround=o;var r=n("./helper/lib.js");function o(e){e=Number(e);if(!Number.isFinite(e)||e===0){return e}const t=(0,r.roundToFloat16Bits)(e);return(0,r.convertToNumber)(t)}}}}}},src:{"bits.js":function(e,t,n){const s=n("./ieee754");const c=n("./dom");const r=c.$(".visualization-bits");const o=c.$("#number-input");const u=c.$("#fp-type");const f={fp16:{expNormZero:-15,expNormValue:15,expNormPosValue:15,expNormNegValue:-15,dynksMin:-15,dynksMax:16,exponentBits:5,significandBits:10},fp32:{expNormZero:-127,expNormValue:127,expNormPosValue:127,expNormNegValue:-127,dynksMin:-127,dynksMax:128,exponentBits:8,significandBits:23},fp64:{expNormZero:-1023,expNormValue:1023,expNormPosValue:1023,expNormNegValue:-1023,dynksMin:-1023,dynksMax:1024,exponentBits:11,significandBits:52}};function a(t){return function(e){return e.classList.contains(t)&&e.classList.contains(u.value)}}const i=c.$$(".bit",r);function l(){return i.filter(a("sign"))}function p(){return i.filter(a("exponent"))}function d(){return i.filter(a("significand"))}const y=c.$("#point-slider");const h=c.$("#point-slider-label");function m(){return Number(o.value.replace(/\u2212/g,"-"))}function b(e){e=Number(e);if(e===0&&1/e<0){e="-0"}else{e=Number.prototype.toString.call(e)}e=e.replace(/-/g,"−");if(e!==o.value){o.value=e}j()}function g(t,n,r){r=typeof r=="string"?r.slice(-1):"0";for(let e=0;e<n.length;e++){const o=t[e];o.classList.remove("one");o.classList.remove("zero");o.classList.remove("prev-one");o.classList.remove("prev-zero");o.classList.add(n[e]==="1"?"one":"zero");if(e===0){o.classList.add(r==="1"?"prev-one":"prev-zero")}}}function v(e){const t=r.classList.contains("expanded");const n=i.filter(a("hidden"));g(l(),e.bSign);g(p(),e.bExponent,t?"0":e.bSign);g(n,e.bHidden);g(d(),e.bSignificand,t?e.bHidden:e.bExponent);h.style.left=(e.exponentNormalized-1)*15+"px";if(e.exponent!==Number(y.value)){y.value=e.exponent}}function w(e,t){e+=t.classList.contains("zero")?"0":"1";return e}function N(e){let t="";let n,r;if(e){n=e.exponent}if(typeof n=="number"){n=s.intToBinaryString(n,11)}else{n=p().reduce(w,"")}if(typeof r!="string"){r=d().reduce(w,"")}t+=l().reduce(w,"");t+=n;t+=r;let o=s.binaryStringToFloat(t,u.value);b(o)}function x(n,r,o,s){if(typeof r!="number"){r=n.length-1}o=o||"exponent-bit-";let i="";let a="";let c="";let u="";let f=true;for(let t=0,e=n.length;t<e;t++){if(n[t]==="1"){f=false;const l=r-t;const p=n.length-1-t;if(i.length>0){i+="<span class='mo'> + </span>";a+="<span class='mo'> + </span>";c+="<span class='mo'> + </span>";u+="<span class='mo'> + </span>"}let e='<span class="msup '+(o+p)+'"><span class="mn">2</span><span class="mn">'+l+"</span></span>";if(s&&l===0){e='<span class="mn '+(o+p)+'">1</span>'}i+=e;a+='<span class="mn '+(o+p)+'">'+Math.pow(2,l)+"</span>";if(l>=0){c+=e;u+='<span class="mn '+(o+p)+'">'+Math.pow(2,l)+"</span>"}else{c+='<span class="mfrac '+(o+p)+'"><span class="mn">1</span><span class="msup"><span class="mn">2</span><span class="mn">'+-l+"</span></span></span>";u+='<span class="mfrac '+(o+p)+'"><span class="mn">1</span><span class="mn">'+Math.pow(2,-l)+"</span></span>"}}}if(f){i=a=c=u='<span class="mn">0</span>'}u=u.replace(/Infinity/g,"&infin;");return{powers:i,computed:a,fractions:c,fractionsComputed:u}}function T(t){const e=x(t.bExponent);t.exponentPowers=e.powers;t.exponentPowersComputed=e.computed;const n=t.bHidden+t.bSignificand;t.exponentZero=t.exponent;t.exponentNormalizedZero=t.exponentNormalized;if(t.exponentNormalizedZero===f[u.value].expNormZero){t.exponentZero=t.exponent+1;t.exponentNormalizedZero=t.exponentNormalized+1}const r=x(n,t.exponentNormalizedZero,"significand-bit-");const o=x(n,0,"significand-bit-");const s=x(n,0,"significand-bit-",true);t.significandPowersNormalized=o.powers;t.significandPowersNormalizedOne=s.powers;const i=c.$(".full-equation");if(isNaN(t.value)){t.significandPowers=t.significandPowersFractions=t.significandPowersFractionsComputed=t.significandPowersComputed='<span class="mn significand-bit-any">NaN</span>'}else{t.significandPowers=r.powers;t.significandPowersFractions=r.fractions;t.significandPowersFractionsComputed=r.fractionsComputed;t.significandPowersComputed=r.computed}if(t.sign<0)t.signHtml=String(t.sign).replace("-","&minus;");else t.signHtml="+"+t.sign;t.absValue=Math.abs(t.value);if(isNaN(t.absValue)){t.absValue="NaNNaNNaNNaN Batman!"}t.expNormPosValue=f[u.value].expNormPosValue;t.expNormNegValue=f[u.value].expNormNegValue;c.$$(".msum").forEach(e=>e.setAttribute("data-to",f[u.value].significandBits));c.$("#msub-text").innerHTML=f[u.value].significandBits;const a=c.$$(".math [data-ieee754-value]");a.forEach(function(e){e.innerHTML=t[e.dataset.ieee754Value]});if(isNaN(t.value)||!isFinite(t.value)){i.classList.add("collapsed")}else{i.classList.remove("collapsed")}}function j(){const e=m();let t=s.toIEEE754Parsed(e,u.value);v(t);T(t)}u.addEventListener("change",function(){c.$$(".fp16").forEach(e=>e.style.display="none");c.$$(".fp32").forEach(e=>e.style.display="none");c.$$(".fp64").forEach(e=>e.style.display="none");c.$$("."+this.value).forEach(e=>e.style="");j();N()});o.addEventListener("change",function(){b(m())},false);o.addEventListener("keydown",function(e){let t=0;if(e.keyCode===38||e.keyCode===40){if(e.keyCode===38)t=+1;else t=-1;if(e.shiftKey){t*=10;if(e.altKey){t*=10}}else if(e.altKey){t/=10}b(t+m());e.preventDefault()}},false);y.addEventListener("change",function(){const e=Number(y.value);N({exponent:e})},false);y.addEventListener("click",function(){y.focus()},false);document.body.addEventListener("click",function(e){const t=e.target;if(t.classList.contains("zero")||t.classList.contains("one")){t.classList.toggle("zero");t.classList.toggle("one");N();j();A(e);L(e);O(e)}},false);function E(s,i){return function(t){const e=t.target;if(c.matchesSelector(e,s)){const n=c.arrayify(e.parentNode.children).filter(a("bit"));const r=n.length-n.indexOf(e)-1;const o=c.$$(i+r+","+(i+"any"));o.forEach(function(e){e.classList[t.type==="mouseout"?"remove":"add"]("hover")})}}}const A=E(".bit.exponent",".exponent-bit-");document.body.addEventListener("mouseover",A,false);document.body.addEventListener("mouseout",A,false);const L=E(".bit.significand, .bit.hidden",".significand-bit-");document.body.addEventListener("mouseover",L,false);document.body.addEventListener("mouseout",L,false);const O=E(".bit.sign",".sign-bit-");document.body.addEventListener("mouseover",O,false);document.body.addEventListener("mouseout",O,false);document.body.addEventListener("click",function(e){const t=e.target;if(c.matchesSelector(t,".mrow > .equals")){t.parentNode.classList.toggle("nowrap")}},false);const I=n("./dynks");const S=c.$("#exponent-dynks");const k=c.$("#exponent-normalized-dynks");function F(){return+S.innerHTML}function P(e){const t=Number(e);N({exponent:t})}I(S,F,P);function B(){k.dataset.dynksMin=f[u.value].dynksMin;k.dataset.dynksMax=f[u.value].dynksMax;return+k.innerHTML}function M(e){const t=Number(e);N({exponent:t+f[u.value].expNormValue})}I(k,B,M);c.$(".toggle-details-button").addEventListener("click",function(){r.classList.toggle("expanded")},false);j()},"dom.js":function(e,t,n){const r=function(e){return[].slice.call(e)};const o=function(e,t){t=t||document;return t.querySelector(e)};const s=function(e,t){t=t||document;return r(t.querySelectorAll(e))};e.arrayify=r;e.$=o;e.$$=s;const i=window.Element.prototype;const a=i.matchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector||i.webkitMatchesSelector||function(e){let t=this,n=(t.parentNode||t.document).querySelectorAll(e),r=-1;while(n[++r]&&n[r]!==t);return!!n[r]};e.matchesSelector=function(e,t){return a.call(e,t)}},"dynks.js":function(e,t,n){t.exports=function(a,o,c){a.classList.add("dynks-enabled");const u={gap:a.dataset.dynksGap||5,min:!isNaN(parseInt(a.dataset.dynksMin))?+a.dataset.dynksMin:-Infinity,max:!isNaN(parseInt(a.dataset.dynksMax))?+a.dataset.dynksMax:+Infinity};a.addEventListener("mousedown",function(e){const t=e.pageX;let s=Number(o());let i=0;function n(n){let r=(n.pageX-t)/u.gap;r=~~r;const o=r-i;if(o!==0){let e=1;if(n.shiftKey)e=10;let t=s+o*e;if(t<u.min){t=u.min;a.classList.add("dynks-out-of-range")}else if(t>u.max){t=u.max;a.classList.add("dynks-out-of-range")}else{a.classList.remove("dynks-out-of-range")}c(t);if(s!==t){s=t;i=r}}n.preventDefault()}function r(){a.classList.remove("dynks-active");a.classList.remove("dynks-out-of-range");document.documentElement.classList.remove("dynks-moving");document.removeEventListener("mousemove",n,false);document.removeEventListener("mouseup",r,false)}document.addEventListener("mousemove",n,false);document.addEventListener("mouseup",r,false);a.classList.add("dynks-active");document.documentElement.classList.add("dynks-moving");e.preventDefault()},false)}},"ieee754.js":function(e,t,n){const{getFloat16:r,setFloat16:o}=n("../node_modules/@petamoriken/float16");function s(e){const t=new ArrayBuffer(2);o(new DataView(t),0,e,false);return[].slice.call(new Uint8Array(t))}function i(e){const t=new ArrayBuffer(2);new Uint8Array(t).set(e);return r(new DataView(t),0,false)}function a(e){const t=new ArrayBuffer(4);new DataView(t).setFloat32(0,e,false);return[].slice.call(new Uint8Array(t))}function c(e){const t=new ArrayBuffer(4);new Uint8Array(t).set(e);return new DataView(t).getFloat32(0,false)}function u(e){const t=new ArrayBuffer(8);new DataView(t).setFloat64(0,e,false);return[].slice.call(new Uint8Array(t))}function f(e){const t=new ArrayBuffer(8);new Uint8Array(t).set(e);return new DataView(t).getFloat64(0,false)}function l(e,t){t=t||8;for(e=e.toString(2);e.length<t;e="0"+e);return e}function p(e){return parseInt(e,2)}function d(e){return e.map(function(e){return l(e)}).join("")}const y={fp16:{eBits:5,sBits:10,eNorm:15,f2o:s,o2f:i},fp32:{eBits:8,sBits:23,eNorm:127,f2o:a,o2f:c},fp64:{eBits:11,sBits:52,eNorm:1023,f2o:u,o2f:f}};function h(e,t){return y[t].o2f(e.match(/.{8}/g).map(p))}function m(e,t){const n=d(y[t].f2o(e));const r=n.match(new RegExp(`^(.)(.{${y[t].eBits}})(.{${y[t].sBits}})$`));const o=r[1];const s=Math.pow(-1,parseInt(o,2));const i=r[2];const a=parseInt(i,2);const c=a-y[t].eNorm;const u=r[3];const f=a===0?"0":"1";return{value:e,bFull:o+i+f+u,bSign:o,bExponent:i,bHidden:f,bSignificand:u,sign:s,exponent:a,exponentNormalized:c}}t.exports={intToBinaryString:l,binaryStringToFloat:h,toIEEE754Parsed:m}}}}})("ieee754-visualization/src/bits");