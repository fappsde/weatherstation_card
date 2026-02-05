function e(e,t,i,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,v=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,_=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!d(e,t),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=r;const n=s.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const n=this.constructor;if(!1===r&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??w)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,f?.({ReactiveElement:b}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=e=>e,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,D=`<${P}>`,H=document,M=()=>H.createComment(""),W=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,T=/>/g,z=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),q=new WeakMap,K=H.createTreeWalker(H,129);function Y(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=O;for(let t=0;t<i;t++){const i=e[t];let a,d,c=-1,l=0;for(;l<i.length&&(o.lastIndex=l,d=o.exec(i),null!==d);)l=o.lastIndex,o===O?"!--"===d[1]?o=I:void 0!==d[1]?o=T:void 0!==d[2]?(j.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=z):void 0!==d[3]&&(o=z):o===z?">"===d[0]?(o=s??O,c=-1):void 0===d[1]?c=-2:(c=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?z:'"'===d[3]?V:R):o===V||o===R?o=z:o===I||o===T?o=O:(o=z,s=void 0);const h=o===z&&e[t+1].startsWith("/>")?" ":"";n+=o===O?i+D:c>=0?(r.push(a),i.slice(0,c)+C+i.slice(c)+k+h):i+k+(-2===c?t:h)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class J{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[d,c]=G(e,t);if(this.el=J.createElement(d,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(C)){const t=c[n++],i=r.getAttribute(e).split(k),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(j.test(r.tagName)){const e=r.textContent.split(k),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],M()),K.nextNode(),a.push({type:2,index:++s});r.append(e[t],M())}}}else if(8===r.nodeType)if(r.data===P)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(k,e+1));)a.push({type:7,index:s}),e+=k.length-1}s++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,r){if(t===B)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=W(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=Z(e,s._$AS(e,t.values),s,r)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??H).importNode(t,!0);K.currentNode=r;let s=K.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new X(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new se(s,this,e)),this._$AV.push(t),a=i[++o]}n!==a?.index&&(s=K.nextNode(),n++)}return K.currentNode=H,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),W(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Q(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new J(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,r){const s=this.strings;let n=!1;if(void 0===s)e=Z(this,e,t,0),n=!W(e)||e!==this._$AH&&e!==B,n&&(this._$AH=e);else{const r=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=Z(this,r[i+o],t,o),a===B&&(a=this._$AH[o]),n||=!W(a)||a!==this._$AH[o],a===F?e=F:e!==F&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class re extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??F)===B)return;const i=this._$AH,r=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==F&&(i===F||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(J,X),(x.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ae extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new X(t.insertBefore(M(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const de=oe.litElementPolyfillSupport;de?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w},he=(e=le,t,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return pe({...e,state:!0,attribute:!1})}const ge={entity_mode:"auto",show_temperature:!0,show_humidity:!0,show_pressure:!0,show_wind:!0,show_rain:!0,show_uv:!0,show_solar:!0,display_mode:"normal",data_view:"live",history_period:"day",show_wind_arrows:!0,enable_warnings:!1,warnings:{wind_speed:{enabled:!1,threshold:50,message:"⚠️ High wind speed! Consider closing shades and securing outdoor items."},temperature:{enabled:!1,high_threshold:35,low_threshold:0,message_high:"🌡️ High temperature! Stay hydrated and avoid direct sunlight.",message_low:"❄️ Low temperature! Watch for frost and freezing conditions."},uv:{enabled:!1,threshold:8,message:"☀️ Very high UV index! Use sun protection and limit outdoor exposure."},rain_rate:{enabled:!1,threshold:10,message:"🌧️ Heavy rain! Check for flooding and secure outdoor items."}}},me=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],ve=[{max:2,label:"Low",color:"#289500"},{max:5,label:"Moderate",color:"#F7E400"},{max:7,label:"High",color:"#F85900"},{max:10,label:"Very High",color:"#D8001D"},{max:1/0,label:"Extreme",color:"#6B49C8"}];function fe(e,t="°C"){return`${Math.round(10*e)/10}${t}`}function _e(e,t="km/h"){return`${Math.round(10*e)/10} ${t}`}function $e(e,t="mm"){return`${Math.round(100*e)/100} ${t}`}function we(e){return e*Math.PI/180}let ye=class extends ae{constructor(){super(...arguments),this.windDirection=0,this.windSpeed=0,this.showArrows=!0,this.compact=!1}render(){const e=this.compact?100:150,t=e/2,i=e/2-10;return L`
      <div class="compass-container">
        <svg width="${e}" height="${e}" viewBox="0 0 ${e} ${e}" class="compass-svg">
          <!-- Outer circle -->
          <circle cx="${t}" cy="${t}" r="${i}" class="compass-circle" />

          <!-- Cardinal directions -->
          ${this.renderCardinalMarks(t,i)}

          <!-- Wind direction arrow (current) -->
          ${this.renderWindArrow(t,i,this.windDirection,"current")}

          <!-- Average wind direction arrow (if available) -->
          ${this.showArrows&&void 0!==this.windDirectionAvg?this.renderWindArrow(t,.85*i,this.windDirectionAvg,"average"):""}

          <!-- Center dot -->
          <circle cx="${t}" cy="${t}" r="3" class="center-dot" />
        </svg>

        <div class="compass-info">
          <div class="direction-text">${function(e){const t=Math.round(e/22.5)%16;return me[t]}(this.windDirection)}</div>
          <div class="degrees-text">${Math.round(this.windDirection)}°</div>
        </div>
      </div>
    `}renderCardinalMarks(e,t){const i=[0,90,180,270];return L`
      ${["N","E","S","W"].map((r,s)=>{const n=we(i[s]-90),o=e+t*Math.cos(n),a=e+t*Math.sin(n);return L`
          <text
            x="${o}"
            y="${a}"
            class="cardinal-text"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${r}
          </text>
        `})}
    `}renderWindArrow(e,t,i,r){const s=we(i-90),n=e+t*Math.cos(s),o=e+t*Math.sin(s),a="current"===r?8:6,d=we(i-90+150),c=we(i-90-150),l=n+a*Math.cos(d),h=o+a*Math.sin(d),p=n+a*Math.cos(c),u=o+a*Math.sin(c);return L`
      <g class="wind-arrow ${r}">
        <line x1="${e}" y1="${e}" x2="${n}" y2="${o}" class="arrow-line" />
        <polygon
          points="${n},${o} ${l},${h} ${p},${u}"
          class="arrow-head"
        />
      </g>
    `}static get styles(){return o`
      :host {
        display: block;
      }

      .compass-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .compass-svg {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .compass-circle {
        fill: var(--card-background-color, white);
        stroke: var(--divider-color, #e0e0e0);
        stroke-width: 2;
      }

      .cardinal-text {
        fill: var(--primary-text-color, #212121);
        font-size: 14px;
        font-weight: 600;
      }

      .wind-arrow.current .arrow-line {
        stroke: var(--primary-color, #03a9f4);
        stroke-width: 3;
        stroke-linecap: round;
      }

      .wind-arrow.current .arrow-head {
        fill: var(--primary-color, #03a9f4);
      }

      .wind-arrow.average .arrow-line {
        stroke: var(--secondary-text-color, #666);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 4, 4;
      }

      .wind-arrow.average .arrow-head {
        fill: var(--secondary-text-color, #666);
      }

      .center-dot {
        fill: var(--primary-text-color, #212121);
      }

      .compass-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .direction-text {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-text-color, #212121);
      }

      .degrees-text {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
      }
    `}};var be,xe;e([pe({type:Number})],ye.prototype,"windDirection",void 0),e([pe({type:Number})],ye.prototype,"windSpeed",void 0),e([pe({type:Number})],ye.prototype,"windDirectionAvg",void 0),e([pe({type:Boolean})],ye.prototype,"showArrows",void 0),e([pe({type:Boolean})],ye.prototype,"compact",void 0),ye=e([ce("wind-compass")],ye),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(be||(be={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(xe||(xe={}));let Ae=class extends ae{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return L``;const e=this._config.entity_mode||"auto";return L`
      <div class="card-config">
        <h3>Entity Configuration</h3>

        ${this.renderSelect("Entity Mode","entity_mode",[{value:"auto",label:"Auto (Use Device)"},{value:"manual",label:"Manual (Select Individual Entities)"}])}
        ${"auto"===e?L`
              <div class="entity-mode-info">
                Select your weather station device and the card will automatically discover and use
                all its sensors.
              </div>
              ${this.renderDevicePicker()}
            `:L`
              <div class="entity-mode-info">
                Select individual sensor entities for each measurement.
              </div>
              ${this.renderManualEntityPickers()}
            `}

        <h3>General Settings</h3>
        ${this.renderInput("Card Name","name","text",!1)}

        <h3>Display Mode</h3>
        ${this.renderSelect("Display Mode","display_mode",[{value:"normal",label:"Normal"},{value:"compact",label:"Compact"}])}

        <h3>Data View</h3>
        ${this.renderSelect("Data View","data_view",[{value:"live",label:"Live Data"},{value:"history",label:"Historical Data"}])}
        ${"history"===this._config.data_view?this.renderSelect("History Period","history_period",[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"year",label:"Year"}]):""}

        <h3>Visible Sensors</h3>
        ${this.renderSwitch("Show Temperature","show_temperature")}
        ${this.renderSwitch("Show Humidity","show_humidity")}
        ${this.renderSwitch("Show Pressure","show_pressure")}
        ${this.renderSwitch("Show Wind","show_wind")}
        ${this._config.show_wind?this.renderSwitch("Show Wind Direction Arrows","show_wind_arrows"):""}
        ${this.renderSwitch("Show Rain","show_rain")}
        ${this.renderSwitch("Show UV Index","show_uv")}
        ${this.renderSwitch("Show Solar Radiation","show_solar")}

        <h3>Warnings</h3>
        ${this.renderSwitch("Enable Warnings","enable_warnings")}
        ${this._config.enable_warnings?this.renderWarningSettings():""}
      </div>
    `}renderWarningSettings(){return L`
      <div class="warning-settings">
        <h4>Wind Speed Warning</h4>
        ${this.renderSwitch("Enable","warnings.wind_speed.enabled")}
        ${this._config.warnings?.wind_speed?.enabled?L`
              ${this.renderInput("Threshold (km/h)","warnings.wind_speed.threshold","number",!1)}
              ${this.renderInput("Message","warnings.wind_speed.message","text",!1)}
            `:""}

        <h4>Temperature Warning</h4>
        ${this.renderSwitch("Enable","warnings.temperature.enabled")}
        ${this._config.warnings?.temperature?.enabled?L`
              ${this.renderInput("High Threshold (°C)","warnings.temperature.high_threshold","number",!1)}
              ${this.renderInput("Low Threshold (°C)","warnings.temperature.low_threshold","number",!1)}
              ${this.renderInput("High Message","warnings.temperature.message_high","text",!1)}
              ${this.renderInput("Low Message","warnings.temperature.message_low","text",!1)}
            `:""}

        <h4>UV Index Warning</h4>
        ${this.renderSwitch("Enable","warnings.uv.enabled")}
        ${this._config.warnings?.uv?.enabled?L`
              ${this.renderInput("Threshold","warnings.uv.threshold","number",!1)}
              ${this.renderInput("Message","warnings.uv.message","text",!1)}
            `:""}

        <h4>Rain Rate Warning</h4>
        ${this.renderSwitch("Enable","warnings.rain_rate.enabled")}
        ${this._config.warnings?.rain_rate?.enabled?L`
              ${this.renderInput("Threshold (mm/h)","warnings.rain_rate.threshold","number",!1)}
              ${this.renderInput("Message","warnings.rain_rate.message","text",!1)}
            `:""}
      </div>
    `}renderInput(e,t,i,r){const s=this.getNestedValue(this._config,t);return L`
      <div class="input-group">
        <label>
          ${e}${r?"*":""}
          <input
            type="${i}"
            .value=${s||""}
            .configKey=${t}
            @input=${this._valueChanged}
            ?required=${r}
          />
        </label>
      </div>
    `}renderSwitch(e,t){const i=this.getNestedValue(this._config,t);return L`
      <div class="switch-group">
        <label>
          <span>${e}</span>
          <input
            type="checkbox"
            .checked=${!1!==i}
            .configKey=${t}
            @change=${this._valueChanged}
          />
        </label>
      </div>
    `}renderSelect(e,t,i){const r=this.getNestedValue(this._config,t);return L`
      <div class="input-group">
        <label>
          ${e}
          <select .value=${r} .configKey=${t} @change=${this._valueChanged}>
            ${i.map(e=>L`
                <option value="${e.value}" ?selected=${r===e.value}>
                  ${e.label}
                </option>
              `)}
          </select>
        </label>
      </div>
    `}renderEntityPicker(e,t,i,r=!1,s){const n=this.getNestedValue(this._config,t),o=Object.keys(this.hass.states).filter(e=>!i||e.startsWith(i+".")).sort();return L`
      <div class="input-group">
        <label>
          ${e}${r?"*":""}
          ${s?L`<div class="helper-text">${s}</div>`:""}
          <select
            .value=${n||""}
            .configKey=${t}
            @change=${this._valueChanged}
            ?required=${r}
          >
            <option value="">-- Select Entity --</option>
            ${o.map(e=>L`
                <option value="${e}" ?selected=${n===e}>${e}</option>
              `)}
          </select>
        </label>
      </div>
    `}renderManualEntityPickers(){return L`
      <div class="manual-entities">
        ${this.renderEntityPicker("Temperature","entities.temperature","sensor",!1,"Temperature sensor (e.g., sensor.ecowitt_temperature)")}
        ${this.renderEntityPicker("Humidity","entities.humidity","sensor",!1,"Humidity sensor (e.g., sensor.ecowitt_humidity)")}
        ${this.renderEntityPicker("Pressure","entities.pressure","sensor",!1,"Pressure sensor (e.g., sensor.ecowitt_pressure)")}
        ${this.renderEntityPicker("Wind Speed","entities.wind_speed","sensor",!1,"Wind speed sensor")}
        ${this.renderEntityPicker("Wind Direction","entities.wind_direction","sensor",!1,"Wind direction sensor (bearing in degrees)")}
        ${this.renderEntityPicker("Wind Gust","entities.wind_gust","sensor",!1,"Wind gust speed sensor (optional)")}
        ${this.renderEntityPicker("Rain","entities.rain","sensor",!1,"Total rainfall sensor")}
        ${this.renderEntityPicker("Rain Rate","entities.rain_rate","sensor",!1,"Rainfall rate sensor (optional)")}
        ${this.renderEntityPicker("UV Index","entities.uv_index","sensor",!1,"UV index sensor")}
        ${this.renderEntityPicker("Solar Radiation","entities.solar_radiation","sensor",!1,"Solar radiation sensor (optional)")}
      </div>
    `}renderDevicePicker(){const e=this._config.device_id,t=[],i=new Map;return Object.values(this.hass.states).forEach(e=>{const t=e.entity_id,r=Object.values(this.hass.entities||{}).find(e=>e.entity_id===t);if(r?.device_id){const e=r.device_id;if(i.has(e)){const t=i.get(e);i.set(e,{...t,entityCount:t.entityCount+1})}else{const t=(this.hass.devices||{})[e];if(t){const r=t.name_by_user||t.name||t.model||`Device ${e.slice(0,8)}`;i.set(e,{name:r,entityCount:1})}}}}),i.forEach((e,i)=>{t.push({id:i,name:`${e.name} (${e.entityCount} entities)`})}),t.sort((e,t)=>e.name.localeCompare(t.name)),L`
      <div class="input-group">
        <label>
          Weather Station Device*
          <div class="helper-text">Select your Ecowitt weather station or other weather device</div>
          <select .value=${e||""} .configKey=${"device_id"} @change=${this._valueChanged}>
            <option value="">-- Select Device --</option>
            ${t.map(t=>L`
                <option value="${t.id}" ?selected=${e===t.id}>
                  ${t.name}
                </option>
              `)}
          </select>
        </label>
      </div>
      ${e?this.renderDeviceInfo(e):""}
    `}renderDeviceInfo(e){const t=[];return Object.values(this.hass.states).forEach(i=>{const r=i.entity_id,s=Object.values(this.hass.entities||{}).find(e=>e.entity_id===r);s?.device_id===e&&t.push(r)}),0===t.length?L``:L`
      <div class="device-info">
        <div class="device-info-header">Device Entities (${t.length}):</div>
        <div class="device-entities">
          ${t.slice(0,10).map(e=>L` <div class="device-entity">${e}</div> `)}
          ${t.length>10?L`<div class="device-entity-more">...and ${t.length-10} more</div>`:""}
        </div>
      </div>
    `}getNestedValue(e,t){return t.split(".").reduce((e,t)=>{if(e&&"object"==typeof e)return e[t]},e)}setNestedValue(e,t,i){const r=t.split("."),s=r.pop();return r.reduce((e,t)=>(e[t]||(e[t]={}),e[t]),e)[s]=i,e}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configKey;if(!i)return;let r;r="checkbox"===t.type?t.checked??!1:"number"===t.type?parseFloat(t.value??"0"):t.value??"";const s={...this._config};this.setNestedValue(s,i,r),this._config=s,function(e,t,i,r){r=r||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});s.detail=i,e.dispatchEvent(s)}(this,"config-changed",{config:this._config})}static get styles(){return o`
      .card-config {
        padding: 16px;
      }

      h3 {
        margin: 24px 0 12px 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      h3:first-child {
        margin-top: 0;
      }

      h4 {
        margin: 16px 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary-text-color);
      }

      .input-group,
      .switch-group {
        margin-bottom: 16px;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .switch-group label {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      input[type='text'],
      input[type='number'],
      select {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
      }

      input[type='checkbox'] {
        width: 40px;
        height: 20px;
      }

      input:focus,
      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .warning-settings {
        margin-left: 16px;
        padding-left: 16px;
        border-left: 2px solid var(--divider-color);
      }

      .entity-mode-info {
        padding: 12px;
        margin-bottom: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 4px;
        font-size: 14px;
        color: var(--secondary-text-color, #666);
        border-left: 3px solid var(--primary-color, #03a9f4);
      }

      .helper-text {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        margin-top: 4px;
        font-style: italic;
      }

      .manual-entities {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
      }

      .device-info {
        margin-top: 16px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 4px;
        border-left: 3px solid var(--success-color, #4caf50);
      }

      .device-info-header {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .device-entities {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .device-entity {
        font-size: 12px;
        font-family: monospace;
        color: var(--secondary-text-color);
        padding: 2px 4px;
        background: var(--card-background-color);
        border-radius: 2px;
      }

      .device-entity-more {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 4px;
      }
    `}};e([pe({attribute:!1})],Ae.prototype,"hass",void 0),e([ue()],Ae.prototype,"_config",void 0),Ae=e([ce("weatherstation-card-editor")],Ae),console.info("%c WEATHERSTATION-CARD %c 1.0.0 ","color: white; background: #1976d2; font-weight: 700;","color: #1976d2; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"weatherstation-card",name:"Weather Station Card",description:"A card for displaying Ecowitt WS90 weather station data"});let Se=class extends ae{constructor(){super(...arguments),this.currentDataView="live",this.currentHistoryPeriod="day"}static getConfigElement(){return document.createElement("weatherstation-card-editor")}static getStubConfig(){return{type:"custom:weatherstation-card",entity:"",name:"Weather Station",...ge}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config={...ge,...e},this.currentDataView=this.config.data_view||"live",this.currentHistoryPeriod=this.config.history_period||"day"}getCardSize(){return"compact"===this.config.display_mode?3:5}getWeatherData(){if(!this.hass)return null;return"manual"===(this.config.entity_mode||"auto")&&this.config.entities?this.getDataFromIndividualEntities():this.config.device_id?this.getDataFromDevice():this.getDataFromWeatherEntity()}getDataFromDevice(){if(!this.config.device_id)return null;const e={};Object.values(this.hass.states).forEach(t=>{const i=t.entity_id,r=this.hass.entities||{},s=Object.values(r).find(e=>e.entity_id===i);if(s?.device_id===this.config.device_id){const t=i.split(".")[1].toLowerCase();e[t]=i}});const t=t=>{for(const i of t)for(const[t,r]of Object.entries(e))if(t.includes(i)){const e=this.hass.states[r];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}};return{temperature:t(["temperature","temp","outdoor_temp"]),humidity:t(["humidity","humid"]),pressure:t(["pressure","absolute_pressure","relative_pressure"]),wind_speed:t(["wind_speed","windspeed"]),wind_direction:t(["wind_direction","wind_bearing","winddirection"]),wind_gust:t(["gust","wind_gust","gust_speed"]),rain:t(["rain_total","daily_rain","rain"]),rain_rate:t(["rain_rate","rainrate","rain_piezo"]),uv_index:t(["uv_index","uvi","uv"]),solar_radiation:t(["solar_radiation","solar","light"])}}getDataFromWeatherEntity(){if(!this.config.entity)return null;const e=this.hass.states[this.config.entity];return e?{temperature:e.attributes.temperature,humidity:e.attributes.humidity,pressure:e.attributes.pressure,wind_speed:e.attributes.wind_speed,wind_direction:e.attributes.wind_bearing,wind_gust:e.attributes.wind_gust_speed,wind_avg:e.attributes.wind_speed,wind_direction_avg:e.attributes.wind_bearing_avg,rain:e.attributes.precipitation,rain_rate:e.attributes.precipitation_rate,uv_index:e.attributes.uv_index,solar_radiation:e.attributes.solar_radiation,feels_like:e.attributes.feels_like,dew_point:e.attributes.dew_point}:null}getDataFromIndividualEntities(){if(!this.config.entities)return null;const e=e=>{if(!e)return;const t=this.hass.states[e];if(!t)return;const i=parseFloat(t.state);return isNaN(i)?void 0:i};return{temperature:e(this.config.entities.temperature),humidity:e(this.config.entities.humidity),pressure:e(this.config.entities.pressure),wind_speed:e(this.config.entities.wind_speed),wind_direction:e(this.config.entities.wind_direction),wind_gust:e(this.config.entities.wind_gust),rain:e(this.config.entities.rain),rain_rate:e(this.config.entities.rain_rate),uv_index:e(this.config.entities.uv_index),solar_radiation:e(this.config.entities.solar_radiation)}}getWarnings(){if(!this.config.enable_warnings)return[];const e=this.getWeatherData();return e?function(e,t){if(!t)return[];const i=[];return t.wind_speed?.enabled&&void 0!==e.wind_speed&&e.wind_speed>=t.wind_speed.threshold&&i.push({type:"wind",severity:e.wind_speed>=1.5*t.wind_speed.threshold?"high":"medium",message:t.wind_speed.message||`High wind speed: ${e.wind_speed} km/h`,icon:"💨"}),t.temperature?.enabled&&void 0!==e.temperature&&(void 0!==t.temperature.high_threshold&&e.temperature>=t.temperature.high_threshold&&i.push({type:"temperature",severity:e.temperature>=t.temperature.high_threshold+5?"high":"medium",message:t.temperature.message_high||`High temperature: ${e.temperature}°C`,icon:"🌡️"}),void 0!==t.temperature.low_threshold&&e.temperature<=t.temperature.low_threshold&&i.push({type:"temperature",severity:e.temperature<=t.temperature.low_threshold-5?"high":"medium",message:t.temperature.message_low||`Low temperature: ${e.temperature}°C`,icon:"❄️"})),t.uv?.enabled&&void 0!==e.uv_index&&e.uv_index>=t.uv.threshold&&i.push({type:"uv",severity:e.uv_index>=11?"high":"medium",message:t.uv.message||`High UV index: ${e.uv_index}`,icon:"☀️"}),t.rain_rate?.enabled&&void 0!==e.rain_rate&&e.rain_rate>=t.rain_rate.threshold&&i.push({type:"rain",severity:e.rain_rate>=2*t.rain_rate.threshold?"high":"medium",message:t.rain_rate.message||`Heavy rain: ${e.rain_rate} mm/h`,icon:"🌧️"}),i}(e,this.config.warnings):[]}render(){if(!this.hass||!this.config)return L``;const e=this.getWeatherData();if(!e){const e=this.config.device_id?"No data available from device":`Entity not available: ${this.config.entity||"not configured"}`;return L`
        <ha-card>
          <div class="card-content">
            <div class="error">${e}</div>
            <div class="error-hint">
              Please check your configuration and ensure the device or entity exists.
            </div>
          </div>
        </ha-card>
      `}const t=this.getWarnings(),i="compact"===this.config.display_mode;return L`
      <ha-card class="${i?"compact":"normal"}">
        ${this.renderHeader()} ${this.renderControls()}
        ${t.length>0?this.renderWarnings(t):""}
        <div class="card-content">
          ${"live"===this.currentDataView?this.renderLiveData(e,i):this.renderHistoricalData(i)}
        </div>
      </ha-card>
    `}renderHeader(){return this.config.name?L`<div class="card-header">${this.config.name}</div>`:L``}renderControls(){return L`
      <div class="controls">
        <div class="view-selector">
          <button
            class="control-btn ${"live"===this.currentDataView?"active":""}"
            @click=${()=>this.setDataView("live")}
          >
            Live
          </button>
          <button
            class="control-btn ${"history"===this.currentDataView?"active":""}"
            @click=${()=>this.setDataView("history")}
          >
            History
          </button>
        </div>
        ${"history"===this.currentDataView?this.renderPeriodSelector():""}
      </div>
    `}renderPeriodSelector(){return L`
      <div class="period-selector">
        ${["day","week","month","year"].map(e=>L`
            <button
              class="control-btn ${this.currentHistoryPeriod===e?"active":""}"
              @click=${()=>this.setHistoryPeriod(e)}
            >
              ${e.charAt(0).toUpperCase()+e.slice(1)}
            </button>
          `)}
      </div>
    `}renderWarnings(e){return L`
      <div class="warnings">
        ${e.map(e=>L`
            <div class="warning ${e.severity}">
              <span class="warning-icon">${e.icon}</span>
              <span class="warning-message">${e.message}</span>
            </div>
          `)}
      </div>
    `}renderLiveData(e,t){return L`
      <div class="${t?"weather-grid compact":"weather-grid"}">
        ${this.config.show_temperature&&void 0!==e.temperature?this.renderDataItem("🌡️","Temperature",fe(e.temperature),e.feels_like?`Feels like ${fe(e.feels_like)}`:void 0,t):""}
        ${this.config.show_humidity&&void 0!==e.humidity?this.renderDataItem("💧","Humidity",`${e.humidity}%`,void 0,t):""}
        ${this.config.show_pressure&&void 0!==e.pressure?this.renderDataItem("🔽","Pressure",function(e,t="hPa"){return`${Math.round(e)} ${t}`}(e.pressure),void 0,t):""}
        ${this.config.show_wind&&void 0!==e.wind_speed&&void 0!==e.wind_direction?this.renderWindItem(e,t):""}
        ${this.config.show_rain&&void 0!==e.rain?this.renderDataItem("🌧️","Rain",$e(e.rain),e.rain_rate?`Rate: ${$e(e.rain_rate)}/h`:void 0,t):""}
        ${this.config.show_uv&&void 0!==e.uv_index?this.renderUVItem(e.uv_index,t):""}
        ${this.config.show_solar&&void 0!==e.solar_radiation?this.renderDataItem("☀️","Solar",`${e.solar_radiation} W/m²`,void 0,t):""}
      </div>
    `}renderHistoricalData(e){return L`
      <div class="historical-placeholder">
        <div class="placeholder-icon">📊</div>
        <div class="placeholder-text">Historical data for ${this.currentHistoryPeriod}</div>
        <div class="placeholder-subtext">
          Connect to Home Assistant history API to display charts
        </div>
      </div>
    `}renderWindItem(e,t){return this.config.show_wind_arrows&&!t?L`
        <div class="data-item wind-item">
          <wind-compass
            .windDirection=${e.wind_direction||0}
            .windSpeed=${e.wind_speed||0}
            .windDirectionAvg=${e.wind_direction_avg}
            .showArrows=${this.config.show_wind_arrows}
            .compact=${!1}
          ></wind-compass>
          <div class="wind-info">
            <div class="data-label">Wind Speed</div>
            <div class="data-value">${_e(e.wind_speed||0)}</div>
            ${e.wind_gust?L`<div class="data-subtitle">Gust: ${_e(e.wind_gust)}</div>`:""}
          </div>
        </div>
      `:this.renderDataItem("💨","Wind",_e(e.wind_speed||0),e.wind_gust?`Gust: ${_e(e.wind_gust)}`:void 0,t)}renderDataItem(e,t,i,r,s=!1){return L`
      <div class="data-item ${s?"compact":""}">
        ${s?"":L`<div class="data-icon">${e}</div>`}
        <div class="data-content">
          <div class="data-label">${s?e+" ":""}${t}</div>
          <div class="data-value">${i}</div>
          ${r?L`<div class="data-subtitle">${r}</div>`:""}
        </div>
      </div>
    `}renderUVItem(e,t){const i=function(e){const t=ve.find(t=>e<=t.max);return t||ve[ve.length-1]}(e);return L`
      <div class="data-item ${t?"compact":""}">
        ${t?"":L`<div class="data-icon">☀️</div>`}
        <div class="data-content">
          <div class="data-label">${t?"☀️ ":""}UV Index</div>
          <div class="data-value">
            ${e}
            <span class="uv-badge" style="background-color: ${i.color}">
              ${i.label}
            </span>
          </div>
        </div>
      </div>
    `}setDataView(e){this.currentDataView=e}setHistoryPeriod(e){this.currentHistoryPeriod=e}static get styles(){return o`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      ha-card.compact {
        padding: 12px;
      }

      .card-header {
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 12px;
      }

      .compact .card-header {
        font-size: 20px;
        padding-bottom: 8px;
      }

      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .view-selector,
      .period-selector {
        display: flex;
        gap: 4px;
      }

      .control-btn {
        padding: 6px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        background: var(--card-background-color, white);
        color: var(--primary-text-color, #212121);
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }

      .control-btn:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .control-btn.active {
        background: var(--primary-color, #03a9f4);
        color: white;
        border-color: var(--primary-color, #03a9f4);
      }

      .warnings {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .warning {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .warning.medium {
        background: #fff3cd;
        border-left: 4px solid #ffc107;
      }

      .warning.high {
        background: #f8d7da;
        border-left: 4px solid #dc3545;
      }

      .warning-icon {
        font-size: 24px;
        line-height: 1;
      }

      .warning-message {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color, #212121);
      }

      .error {
        color: var(--error-color, #db4437);
        padding: 16px;
        font-weight: 600;
      }

      .error-hint {
        color: var(--secondary-text-color, #666);
        padding: 0 16px 16px 16px;
        font-size: 14px;
      }

      .weather-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }

      .weather-grid.compact {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 8px;
      }

      .data-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .data-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .data-item.compact {
        padding: 8px;
        gap: 8px;
      }

      .data-item.wind-item {
        grid-column: span 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
      }

      .data-icon {
        font-size: 32px;
        line-height: 1;
      }

      .data-content {
        flex: 1;
        min-width: 0;
      }

      .data-label {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .compact .data-label {
        font-size: 11px;
      }

      .data-value {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color, #212121);
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .compact .data-value {
        font-size: 16px;
      }

      .data-subtitle {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        margin-top: 4px;
      }

      .uv-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }

      .wind-info {
        display: flex;
        flex-direction: column;
      }

      .historical-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        text-align: center;
      }

      .placeholder-icon {
        font-size: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      .placeholder-text {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color, #212121);
        margin-bottom: 8px;
      }

      .placeholder-subtext {
        font-size: 14px;
        color: var(--secondary-text-color, #666);
      }

      @media (max-width: 600px) {
        .weather-grid {
          grid-template-columns: 1fr;
        }

        .data-item.wind-item {
          grid-column: span 1;
          flex-direction: column;
        }

        .controls {
          flex-direction: column;
          align-items: stretch;
        }

        .view-selector,
        .period-selector {
          justify-content: center;
        }
      }
    `}};e([pe({attribute:!1})],Se.prototype,"hass",void 0),e([ue()],Se.prototype,"config",void 0),e([ue()],Se.prototype,"currentDataView",void 0),e([ue()],Se.prototype,"currentHistoryPeriod",void 0),Se=e([ce("weatherstation-card")],Se);export{Se as WeatherStationCard};
