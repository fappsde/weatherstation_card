function e(e,t,i,s){var r,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,w=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!d(e,t),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);r?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...l(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const n=r.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(void 0!==e){const n=this.constructor;if(!1===s&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??$)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==r||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[w("elementProperties")]=new Map,y[w("finalized")]=new Map,f?.({ReactiveElement:y}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=e=>e,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+k,P=`<${D}>`,O=document,H=()=>O.createComment(""),W=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,V=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,R=/"/g,j=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,J=O.createTreeWalker(O,129);function G(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,s=[];let r,n=2===t?"<svg>":3===t?"<math>":"",a=U;for(let t=0;t<i;t++){const i=e[t];let o,d,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,d=a.exec(i),null!==d);)h=a.lastIndex,a===U?"!--"===d[1]?a=L:void 0!==d[1]?a=V:void 0!==d[2]?(j.test(d[2])&&(r=RegExp("</"+d[2],"g")),a=z):void 0!==d[3]&&(a=z):a===z?">"===d[0]?(a=r??U,c=-1):void 0===d[1]?c=-2:(c=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?z:'"'===d[3]?R:T):a===R||a===T?a=z:a===L||a===V?a=U:(a=z,r=void 0);const l=a===z&&e[t+1].startsWith("/>")?" ":"";n+=a===U?i+P:c>=0?(s.push(o),i.slice(0,c)+C+i.slice(c)+k+l):i+k+(-2===c?t:l)}return[G(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class K{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0;const a=e.length-1,o=this.parts,[d,c]=Y(e,t);if(this.el=K.createElement(d,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=J.nextNode())&&o.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[n++],i=s.getAttribute(e).split(k),a=/([.?@])?(.*)/.exec(t);o.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?te:"?"===a[1]?ie:"@"===a[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(k)&&(o.push({type:6,index:r}),s.removeAttribute(e));if(j.test(s.tagName)){const e=s.textContent.split(k),t=e.length-1;if(t>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],H()),J.nextNode(),o.push({type:2,index:++r});s.append(e[t],H())}}}else if(8===s.nodeType)if(s.data===D)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(k,e+1));)o.push({type:7,index:r}),e+=k.length-1}r++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===F)return t;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=W(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(t=Z(e,r._$AS(e,t.values),r,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??O).importNode(t,!0);J.currentNode=s;let r=J.nextNode(),n=0,a=0,o=i[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new X(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new re(r,this,e)),this._$AV.push(t),o=i[++a]}n!==o?.index&&(r=J.nextNode(),n++)}return J.currentNode=O,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),W(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new K(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new X(this.O(H()),this.O(H()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,s){const r=this.strings;let n=!1;if(void 0===r)e=Z(this,e,t,0),n=!W(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else{const s=e;let a,o;for(e=r[0],a=0;a<r.length-1;a++)o=Z(this,s[i+a],t,a),o===F&&(o=this._$AH[a]),n||=!W(o)||o!==this._$AH[a],o===B?e=B:e!==B&&(e+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!s&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class se extends ee{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??B)===F)return;const i=this._$AH,s=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(K,X),(x.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(void 0===r){const e=i?.renderBefore??null;s._$litPart$=r=new X(t.insertBefore(H(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}oe._$litElement$=!0,oe.finalized=!0,ae.litElementHydrateSupport?.({LitElement:oe});const de=ae.litElementPolyfillSupport;de?.({LitElement:oe}),(ae.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},le=(e=he,t,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,r,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];t.call(this,i),this.requestUpdate(s,r,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?le(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return pe({...e,state:!0,attribute:!1})}const ge={entity_mode:"auto",show_temperature:!0,show_humidity:!0,show_pressure:!0,show_wind:!0,show_rain:!0,show_uv:!0,show_solar:!0,display_mode:"normal",data_view:"live",history_period:"day",show_wind_arrows:!0,enable_warnings:!1,warnings:{wind_speed:{enabled:!1,threshold:50,message:"⚠️ High wind speed! Consider closing shades and securing outdoor items."},temperature:{enabled:!1,high_threshold:35,low_threshold:0,message_high:"🌡️ High temperature! Stay hydrated and avoid direct sunlight.",message_low:"❄️ Low temperature! Watch for frost and freezing conditions."},uv:{enabled:!1,threshold:8,message:"☀️ Very high UV index! Use sun protection and limit outdoor exposure."},rain_rate:{enabled:!1,threshold:10,message:"🌧️ Heavy rain! Check for flooding and secure outdoor items."}}},me=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],_e=[{max:2,label:"Low",color:"#289500"},{max:5,label:"Moderate",color:"#F7E400"},{max:7,label:"High",color:"#F85900"},{max:10,label:"Very High",color:"#D8001D"},{max:1/0,label:"Extreme",color:"#6B49C8"}],fe={temperature:["temperature","temp","outdoor_temp","temperatur","aussentemperatur","außentemperatur"],humidity:["humidity","humid","feuchtigkeit","luftfeuchtigkeit"],pressure:["pressure","absolute_pressure","relative_pressure","druck","luftdruck"],wind_speed:["wind_speed","windspeed","geschwindigkeit","windgeschwindigkeit"],wind_direction:["wind_direction","wind_bearing","winddirection","richtung","windrichtung"],wind_gust:["gust","wind_gust","gust_speed","geschwindigkeit_2","boe","windböe","windboe"],rain:["rain_total","daily_rain","rain","regen","niederschlag","regenmenge"],rain_rate:["rain_rate","rainrate","rain_piezo","regenrate","niederschlagsrate"],moisture:["moisture","wetness","feuchte","nass","trocken","regen_sensor","rain_sensor"],dew_point:["dew_point","dewpoint","taupunkt","dew"],uv_index:["uv_index","uvi","uv"],solar_radiation:["solar_radiation","solar","light","solarstrahlung","sonnenstrahlung","beleuchtungsstarke","beleuchtungsstärke","licht"]},we={temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",wind_speed:"Wind Speed",wind_direction:"Wind Direction",wind_gust:"Wind Gust",rain:"Rain",rain_rate:"Rain Rate",moisture:"Moisture (Wetness)",dew_point:"Dew Point",uv_index:"UV Index",solar_radiation:"Solar Radiation"};function ve(e,t="°C"){return`${Math.round(10*e)/10}${t}`}function $e(e,t="km/h"){return`${Math.round(10*e)/10} ${t}`}function be(e,t="mm"){return`${Math.round(100*e)/100} ${t}`}function ye(e){return e*Math.PI/180}let xe=class extends oe{constructor(){super(...arguments),this.windDirection=0,this.windSpeed=0,this.showArrows=!0,this.compact=!1}render(){const e=this.compact?100:150,t=e/2,i=e/2-10;return I`
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
    `}renderCardinalMarks(e,t){const i=[0,90,180,270];return I`
      ${["N","E","S","W"].map((s,r)=>{const n=ye(i[r]-90),a=e+t*Math.cos(n),o=e+t*Math.sin(n);return I`
          <text
            x="${a}"
            y="${o}"
            class="cardinal-text"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${s}
          </text>
        `})}
    `}renderWindArrow(e,t,i,s){const r=ye(i-90),n=e+t*Math.cos(r),a=e+t*Math.sin(r),o="current"===s?8:6,d=ye(i-90+150),c=ye(i-90-150),h=n+o*Math.cos(d),l=a+o*Math.sin(d),p=n+o*Math.cos(c),u=a+o*Math.sin(c);return I`
      <g class="wind-arrow ${s}">
        <line x1="${e}" y1="${e}" x2="${n}" y2="${a}" class="arrow-line" />
        <polygon
          points="${n},${a} ${h},${l} ${p},${u}"
          class="arrow-head"
        />
      </g>
    `}static get styles(){return a`
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
    `}};var Ae,Ee;e([pe({type:Number})],xe.prototype,"windDirection",void 0),e([pe({type:Number})],xe.prototype,"windSpeed",void 0),e([pe({type:Number})],xe.prototype,"windDirectionAvg",void 0),e([pe({type:Boolean})],xe.prototype,"showArrows",void 0),e([pe({type:Boolean})],xe.prototype,"compact",void 0),xe=e([ce("wind-compass")],xe),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ae||(Ae={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ee||(Ee={}));var Se=function(e,t,i,s){s=s||{},i=null==i?{}:i;var r=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,e.dispatchEvent(r),r};const Ce=[{name:"entity_mode",selector:{select:{options:[{value:"auto",label:"Auto (Use Device)"},{value:"manual",label:"Manual (Select Individual Entities)"}],mode:"dropdown"}}}],ke=[{name:"device_id",selector:{device:{}}}],De=[{name:"name",selector:{text:{}}}],Pe=[{name:"display_mode",selector:{select:{options:[{value:"normal",label:"Normal"},{value:"compact",label:"Compact"}],mode:"dropdown"}}}],Oe=[{name:"data_view",selector:{select:{options:[{value:"live",label:"Live Data"},{value:"history",label:"Historical Data"}],mode:"dropdown"}}}],He=[{name:"history_period",selector:{select:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"year",label:"Year"}],mode:"dropdown"}}}],We=[{name:"show_temperature",selector:{boolean:{}}},{name:"show_humidity",selector:{boolean:{}}},{name:"show_pressure",selector:{boolean:{}}},{name:"show_wind",selector:{boolean:{}}},{name:"show_wind_arrows",selector:{boolean:{}}},{name:"show_rain",selector:{boolean:{}}},{name:"show_uv",selector:{boolean:{}}},{name:"show_solar",selector:{boolean:{}}}],Me=[{name:"enable_warnings",selector:{boolean:{}}}],Ne=Object.keys(we).map(e=>({name:`entities_${e}`,selector:{entity:{domain:"sensor"}}}));let Ue=class extends oe{constructor(){super(...arguments),this._computeLabel=e=>({device_id:"Weather Station Device",name:"Card Name",entity_mode:"Entity Mode",display_mode:"Display Mode",data_view:"Data View",history_period:"History Period",show_temperature:"Show Temperature",show_humidity:"Show Humidity",show_pressure:"Show Pressure",show_wind:"Show Wind",show_wind_arrows:"Show Wind Direction Arrows",show_rain:"Show Rain",show_uv:"Show UV Index",show_solar:"Show Solar Radiation",enable_warnings:"Enable Warnings",...Object.fromEntries(Object.entries(we).map(([e,t])=>[`entities_${e}`,t]))}[e.name]||e.name)}setConfig(e){this._config=e}connectedCallback(){super.connectedCallback(),this._loadHaForm()}async _loadHaForm(){if(customElements.get("ha-form"))return;const e=await(window.loadCardHelpers?.());if(!e)return;const t=await e.createCardElement({type:"entity",entity:"sun.sun"});t&&await(t.getConfigElement?.())}_getFormData(){const e={entity_mode:this._config.entity_mode||"auto",device_id:this._config.device_id||"",name:this._config.name||"",display_mode:this._config.display_mode||"normal",data_view:this._config.data_view||"live",history_period:this._config.history_period||"day",show_temperature:!1!==this._config.show_temperature,show_humidity:!1!==this._config.show_humidity,show_pressure:!1!==this._config.show_pressure,show_wind:!1!==this._config.show_wind,show_wind_arrows:!1!==this._config.show_wind_arrows,show_rain:!1!==this._config.show_rain,show_uv:!1!==this._config.show_uv,show_solar:!1!==this._config.show_solar,enable_warnings:this._config.enable_warnings||!1};return this._config.entities&&Object.entries(this._config.entities).forEach(([t,i])=>{e[`entities_${t}`]=i||""}),e}render(){if(!this.hass||!this._config)return I``;const e=this._getFormData(),t=this._config.entity_mode||"auto";return I`
      <div class="card-config">
        <h3>Entity Configuration</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ce}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${"auto"===t?I`
              <div class="entity-mode-info">
                Select your weather station device and the card will automatically discover and use
                all its sensors.
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${ke}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${this._config.device_id?this.renderAutoAssignments():B}
            `:I`
              <div class="entity-mode-info">
                Select individual sensor entities for each measurement.
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Ne}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `}

        <h3>General Settings</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${De}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <h3>Display Mode</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Pe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <h3>Data View</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Oe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${"history"===this._config.data_view?I`
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${He}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:B}

        <h3>Visible Sensors</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${We}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <h3>Warnings</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Me}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${this._config.enable_warnings?this.renderWarningSettings():B}
      </div>
    `}renderWarningSettings(){const e={wind_speed:[{name:"warnings_wind_speed_enabled",selector:{boolean:{}}},{name:"warnings_wind_speed_threshold",selector:{number:{min:0,unit_of_measurement:"km/h"}}},{name:"warnings_wind_speed_message",selector:{text:{}}}],temperature:[{name:"warnings_temperature_enabled",selector:{boolean:{}}},{name:"warnings_temperature_high_threshold",selector:{number:{unit_of_measurement:"°C"}}},{name:"warnings_temperature_low_threshold",selector:{number:{unit_of_measurement:"°C"}}},{name:"warnings_temperature_message_high",selector:{text:{}}},{name:"warnings_temperature_message_low",selector:{text:{}}}],uv:[{name:"warnings_uv_enabled",selector:{boolean:{}}},{name:"warnings_uv_threshold",selector:{number:{min:0,max:15}}},{name:"warnings_uv_message",selector:{text:{}}}],rain_rate:[{name:"warnings_rain_rate_enabled",selector:{boolean:{}}},{name:"warnings_rain_rate_threshold",selector:{number:{min:0,unit_of_measurement:"mm/h"}}},{name:"warnings_rain_rate_message",selector:{text:{}}}]},t={warnings_wind_speed_enabled:"Enable Wind Speed Warning",warnings_wind_speed_threshold:"Threshold (km/h)",warnings_wind_speed_message:"Warning Message",warnings_temperature_enabled:"Enable Temperature Warning",warnings_temperature_high_threshold:"High Threshold (°C)",warnings_temperature_low_threshold:"Low Threshold (°C)",warnings_temperature_message_high:"High Temperature Message",warnings_temperature_message_low:"Low Temperature Message",warnings_uv_enabled:"Enable UV Warning",warnings_uv_threshold:"Threshold",warnings_uv_message:"Warning Message",warnings_rain_rate_enabled:"Enable Rain Rate Warning",warnings_rain_rate_threshold:"Threshold (mm/h)",warnings_rain_rate_message:"Warning Message"},i={warnings_wind_speed_enabled:this._config.warnings?.wind_speed?.enabled||!1,warnings_wind_speed_threshold:this._config.warnings?.wind_speed?.threshold||50,warnings_wind_speed_message:this._config.warnings?.wind_speed?.message||"",warnings_temperature_enabled:this._config.warnings?.temperature?.enabled||!1,warnings_temperature_high_threshold:this._config.warnings?.temperature?.high_threshold||35,warnings_temperature_low_threshold:this._config.warnings?.temperature?.low_threshold||0,warnings_temperature_message_high:this._config.warnings?.temperature?.message_high||"",warnings_temperature_message_low:this._config.warnings?.temperature?.message_low||"",warnings_uv_enabled:this._config.warnings?.uv?.enabled||!1,warnings_uv_threshold:this._config.warnings?.uv?.threshold||8,warnings_uv_message:this._config.warnings?.uv?.message||"",warnings_rain_rate_enabled:this._config.warnings?.rain_rate?.enabled||!1,warnings_rain_rate_threshold:this._config.warnings?.rain_rate?.threshold||10,warnings_rain_rate_message:this._config.warnings?.rain_rate?.message||""},s=e=>t[e.name]||e.name;return I`
      <div class="warning-settings">
        <h4>Wind Speed Warning</h4>
        <ha-form
          .hass=${this.hass}
          .data=${i}
          .schema=${[e.wind_speed[0]]}
          .computeLabel=${s}
          @value-changed=${this._warningFormValueChanged}
        ></ha-form>
        ${this._config.warnings?.wind_speed?.enabled?I`
              <ha-form
                .hass=${this.hass}
                .data=${i}
                .schema=${e.wind_speed.slice(1)}
                .computeLabel=${s}
                @value-changed=${this._warningFormValueChanged}
              ></ha-form>
            `:B}

        <h4>Temperature Warning</h4>
        <ha-form
          .hass=${this.hass}
          .data=${i}
          .schema=${[e.temperature[0]]}
          .computeLabel=${s}
          @value-changed=${this._warningFormValueChanged}
        ></ha-form>
        ${this._config.warnings?.temperature?.enabled?I`
              <ha-form
                .hass=${this.hass}
                .data=${i}
                .schema=${e.temperature.slice(1)}
                .computeLabel=${s}
                @value-changed=${this._warningFormValueChanged}
              ></ha-form>
            `:B}

        <h4>UV Index Warning</h4>
        <ha-form
          .hass=${this.hass}
          .data=${i}
          .schema=${[e.uv[0]]}
          .computeLabel=${s}
          @value-changed=${this._warningFormValueChanged}
        ></ha-form>
        ${this._config.warnings?.uv?.enabled?I`
              <ha-form
                .hass=${this.hass}
                .data=${i}
                .schema=${e.uv.slice(1)}
                .computeLabel=${s}
                @value-changed=${this._warningFormValueChanged}
              ></ha-form>
            `:B}

        <h4>Rain Rate Warning</h4>
        <ha-form
          .hass=${this.hass}
          .data=${i}
          .schema=${[e.rain_rate[0]]}
          .computeLabel=${s}
          @value-changed=${this._warningFormValueChanged}
        ></ha-form>
        ${this._config.warnings?.rain_rate?.enabled?I`
              <ha-form
                .hass=${this.hass}
                .data=${i}
                .schema=${e.rain_rate.slice(1)}
                .computeLabel=${s}
                @value-changed=${this._warningFormValueChanged}
              ></ha-form>
            `:B}
      </div>
    `}_formValueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));Object.entries(t).forEach(([e,t])=>{if(e.startsWith("entities_")){const s=e.replace("entities_","");i.entities||(i.entities={}),t?i.entities[s]=t:delete i.entities[s]}else i[e]=t}),i.entities&&0===Object.keys(i.entities).length&&delete i.entities,this._config=i,Se(this,"config-changed",{config:this._config})}_warningFormValueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));i.warnings||(i.warnings={}),Object.entries(t).forEach(([e,t])=>{const s=e.replace("warnings_","").split("_"),r=s.slice(0,-1).join("_"),n=s[s.length-1];i.warnings[r]||(i.warnings[r]={}),i.warnings[r][n]=t}),this._config=i,Se(this,"config-changed",{config:this._config})}resolveAutoEntities(e){const t={},i=this.hass.entities||{};Object.values(this.hass.states).forEach(s=>{const r=s.entity_id,n=Object.values(i).find(e=>e.entity_id===r);if(n?.device_id===e){const e=r.split(".")[1].toLowerCase();t[e]=r}});const s={};for(const[e,i]of Object.entries(fe)){s[e]=void 0;for(const r of i){let i=!1;for(const[n,a]of Object.entries(t))if(n.includes(r)){s[e]=a,i=!0;break}if(i)break}}return s}renderAutoAssignments(){if(!this._config.device_id)return I``;const e=this.resolveAutoEntities(this._config.device_id),t=this._config.entities||{};return I`
      <div class="auto-assignments">
        <div class="auto-assignments-header">Entity Assignments</div>
        <div class="auto-assignments-desc">
          Automatically detected entities for each measurement. Override any assignment by selecting
          a different entity.
        </div>
        ${Object.entries(we).map(([i,s])=>{const r=e[i],n=t[i],a=n||r||"",o=!!n;return I`
            <div class="assignment-row">
              <div class="assignment-header">
                <span class="assignment-label">${s}</span>
                ${o?I`<span class="assignment-badge override">Override</span>`:!a?I`<span class="assignment-badge not-found">Not found</span>`:I`<span class="assignment-badge auto">Auto</span>`}
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${{[`entities_${i}`]:a}}
                .schema=${[{name:`entities_${i}`,selector:{entity:{domain:"sensor"}}}]}
                .computeLabel=${()=>"Entity for "+s}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${o?I`<button class="reset-btn" @click=${()=>this._clearOverride(i)}>
                    Reset to auto
                  </button>`:B}
            </div>
          `})}
      </div>
    `}_clearOverride(e){const t=JSON.parse(JSON.stringify(this._config));t.entities&&(delete t.entities[e],0===Object.keys(t.entities).length&&delete t.entities),this._config=t,Se(this,"config-changed",{config:this._config})}static get styles(){return a`
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

      .loading {
        padding: 16px;
        font-size: 14px;
        color: var(--secondary-text-color, #666);
        font-style: italic;
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

      /* HA picker spacing */
      ha-device-picker,
      ha-entity-picker {
        display: block;
      }

      /* Auto-assignment section */
      .auto-assignments {
        margin-top: 16px;
      }

      .auto-assignments-header {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .auto-assignments-desc {
        font-size: 13px;
        color: var(--secondary-text-color, #666);
        margin-bottom: 16px;
      }

      .assignment-row {
        margin-bottom: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .assignment-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .assignment-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .assignment-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .assignment-badge.auto {
        background: var(--success-color, #4caf50);
        color: white;
      }

      .assignment-badge.override {
        background: var(--warning-color, #ff9800);
        color: white;
      }

      .assignment-badge.not-found {
        background: var(--error-color, #f44336);
        color: white;
      }

      .reset-btn {
        display: inline-block;
        margin-top: 6px;
        padding: 4px 12px;
        font-size: 12px;
        color: var(--primary-color, #03a9f4);
        background: none;
        border: 1px solid var(--primary-color, #03a9f4);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .reset-btn:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }
    `}};e([pe({attribute:!1})],Ue.prototype,"hass",void 0),e([ue()],Ue.prototype,"_config",void 0),Ue=e([ce("weatherstation-card-editor")],Ue),console.info("%c WEATHERSTATION-CARD %c 1.0.0 ","color: white; background: #1976d2; font-weight: 700;","color: #1976d2; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"weatherstation-card",name:"Weather Station Card",description:"A card for displaying Ecowitt WS90 weather station data"});let Le=class extends oe{constructor(){super(...arguments),this.currentDataView="live",this.currentHistoryPeriod="day"}static getConfigElement(){return document.createElement("weatherstation-card-editor")}static getStubConfig(){return{type:"custom:weatherstation-card",entity:"",name:"Weather Station",...ge}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={...ge,...e},this.currentDataView=this.config.data_view||"live",this.currentHistoryPeriod=this.config.history_period||"day"}getCardSize(){return"compact"===this.config.display_mode?3:5}getWeatherData(){if(!this.hass)return null;return"manual"===(this.config.entity_mode||"auto")&&this.config.entities?this.getDataFromIndividualEntities():this.config.device_id?this.getDataFromDevice():this.getDataFromWeatherEntity()}getDataFromDevice(){if(!this.config.device_id)return null;const e={},t=this.hass.entities||{};Object.values(this.hass.states).forEach(i=>{const s=i.entity_id,r=Object.values(t).find(e=>e.entity_id===s);if(r?.device_id===this.config.device_id){const t=s.split(".")[1].toLowerCase();e[t]=s}});const i=this.config.entities||{},s=(t,i)=>{if(i){const e=this.hass.states[i];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}for(const i of t)for(const[t,s]of Object.entries(e))if(t.includes(i)){const e=this.hass.states[s];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}};return{temperature:s(fe.temperature,i.temperature),humidity:s(fe.humidity,i.humidity),pressure:s(fe.pressure,i.pressure),wind_speed:s(fe.wind_speed,i.wind_speed),wind_direction:s(fe.wind_direction,i.wind_direction),wind_gust:s(fe.wind_gust,i.wind_gust),rain:s(fe.rain,i.rain),rain_rate:s(fe.rain_rate,i.rain_rate),uv_index:s(fe.uv_index,i.uv_index),solar_radiation:s(fe.solar_radiation,i.solar_radiation)}}getDataFromWeatherEntity(){if(!this.config.entity)return null;const e=this.hass.states[this.config.entity];return e?{temperature:e.attributes.temperature,humidity:e.attributes.humidity,pressure:e.attributes.pressure,wind_speed:e.attributes.wind_speed,wind_direction:e.attributes.wind_bearing,wind_gust:e.attributes.wind_gust_speed,wind_avg:e.attributes.wind_speed,wind_direction_avg:e.attributes.wind_bearing_avg,rain:e.attributes.precipitation,rain_rate:e.attributes.precipitation_rate,uv_index:e.attributes.uv_index,solar_radiation:e.attributes.solar_radiation,feels_like:e.attributes.feels_like,dew_point:e.attributes.dew_point}:null}getDataFromIndividualEntities(){if(!this.config.entities)return null;const e=e=>{if(!e)return;const t=this.hass.states[e];if(!t)return;const i=parseFloat(t.state);return isNaN(i)?void 0:i};return{temperature:e(this.config.entities.temperature),humidity:e(this.config.entities.humidity),pressure:e(this.config.entities.pressure),wind_speed:e(this.config.entities.wind_speed),wind_direction:e(this.config.entities.wind_direction),wind_gust:e(this.config.entities.wind_gust),rain:e(this.config.entities.rain),rain_rate:e(this.config.entities.rain_rate),uv_index:e(this.config.entities.uv_index),solar_radiation:e(this.config.entities.solar_radiation)}}getWarnings(){if(!this.config.enable_warnings)return[];const e=this.getWeatherData();return e?function(e,t){if(!t)return[];const i=[];return t.wind_speed?.enabled&&void 0!==e.wind_speed&&e.wind_speed>=t.wind_speed.threshold&&i.push({type:"wind",severity:e.wind_speed>=1.5*t.wind_speed.threshold?"high":"medium",message:t.wind_speed.message||`High wind speed: ${e.wind_speed} km/h`,icon:"💨"}),t.temperature?.enabled&&void 0!==e.temperature&&(void 0!==t.temperature.high_threshold&&e.temperature>=t.temperature.high_threshold&&i.push({type:"temperature",severity:e.temperature>=t.temperature.high_threshold+5?"high":"medium",message:t.temperature.message_high||`High temperature: ${e.temperature}°C`,icon:"🌡️"}),void 0!==t.temperature.low_threshold&&e.temperature<=t.temperature.low_threshold&&i.push({type:"temperature",severity:e.temperature<=t.temperature.low_threshold-5?"high":"medium",message:t.temperature.message_low||`Low temperature: ${e.temperature}°C`,icon:"❄️"})),t.uv?.enabled&&void 0!==e.uv_index&&e.uv_index>=t.uv.threshold&&i.push({type:"uv",severity:e.uv_index>=11?"high":"medium",message:t.uv.message||`High UV index: ${e.uv_index}`,icon:"☀️"}),t.rain_rate?.enabled&&void 0!==e.rain_rate&&e.rain_rate>=t.rain_rate.threshold&&i.push({type:"rain",severity:e.rain_rate>=2*t.rain_rate.threshold?"high":"medium",message:t.rain_rate.message||`Heavy rain: ${e.rain_rate} mm/h`,icon:"🌧️"}),i}(e,this.config.warnings):[]}render(){if(!this.hass||!this.config)return I``;const e=this.getWeatherData();if(!e){let e,t;return this.config.device_id?(e="No data available from device",t="Please check your configuration and ensure the device exists."):this.config.entity?(e=`Entity not available: ${this.config.entity}`,t="Please check your configuration and ensure the entity exists."):(e="No device or entity configured",t="Open the card editor and select a device or entity."),I`
        <ha-card>
          <div class="card-content">
            <div class="error">${e}</div>
            <div class="error-hint">${t}</div>
          </div>
        </ha-card>
      `}const t=this.getWarnings(),i="compact"===this.config.display_mode;return I`
      <ha-card class="${i?"compact":"normal"}">
        ${this.renderHeader()} ${this.renderControls()}
        ${t.length>0?this.renderWarnings(t):""}
        <div class="card-content">
          ${"live"===this.currentDataView?this.renderLiveData(e,i):this.renderHistoricalData(i)}
        </div>
      </ha-card>
    `}renderHeader(){return this.config.name?I`<div class="card-header">${this.config.name}</div>`:I``}renderControls(){return I`
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
    `}renderPeriodSelector(){return I`
      <div class="period-selector">
        ${["day","week","month","year"].map(e=>I`
            <button
              class="control-btn ${this.currentHistoryPeriod===e?"active":""}"
              @click=${()=>this.setHistoryPeriod(e)}
            >
              ${e.charAt(0).toUpperCase()+e.slice(1)}
            </button>
          `)}
      </div>
    `}renderWarnings(e){return I`
      <div class="warnings">
        ${e.map(e=>I`
            <div class="warning ${e.severity}">
              <span class="warning-icon">${e.icon}</span>
              <span class="warning-message">${e.message}</span>
            </div>
          `)}
      </div>
    `}renderLiveData(e,t){return I`
      <div class="${t?"weather-grid compact":"weather-grid"}">
        ${this.config.show_temperature&&void 0!==e.temperature?this.renderDataItem("🌡️","Temperature",ve(e.temperature),e.feels_like?`Feels like ${ve(e.feels_like)}`:void 0,t):""}
        ${this.config.show_humidity&&void 0!==e.humidity?this.renderDataItem("💧","Humidity",`${e.humidity}%`,void 0,t):""}
        ${this.config.show_pressure&&void 0!==e.pressure?this.renderDataItem("🔽","Pressure",function(e,t="hPa"){return`${Math.round(e)} ${t}`}(e.pressure),void 0,t):""}
        ${this.config.show_wind&&void 0!==e.wind_speed&&void 0!==e.wind_direction?this.renderWindItem(e,t):""}
        ${this.config.show_rain&&void 0!==e.rain?this.renderDataItem("🌧️","Rain",be(e.rain),e.rain_rate?`Rate: ${be(e.rain_rate)}/h`:void 0,t):""}
        ${this.config.show_uv&&void 0!==e.uv_index?this.renderUVItem(e.uv_index,t):""}
        ${this.config.show_solar&&void 0!==e.solar_radiation?this.renderDataItem("☀️","Solar",`${e.solar_radiation} W/m²`,void 0,t):""}
      </div>
    `}renderHistoricalData(e){return I`
      <div class="historical-placeholder">
        <div class="placeholder-icon">📊</div>
        <div class="placeholder-text">Historical data for ${this.currentHistoryPeriod}</div>
        <div class="placeholder-subtext">
          Connect to Home Assistant history API to display charts
        </div>
      </div>
    `}renderWindItem(e,t){return this.config.show_wind_arrows&&!t?I`
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
            <div class="data-value">${$e(e.wind_speed||0)}</div>
            ${e.wind_gust?I`<div class="data-subtitle">Gust: ${$e(e.wind_gust)}</div>`:""}
          </div>
        </div>
      `:this.renderDataItem("💨","Wind",$e(e.wind_speed||0),e.wind_gust?`Gust: ${$e(e.wind_gust)}`:void 0,t)}renderDataItem(e,t,i,s,r=!1){return I`
      <div class="data-item ${r?"compact":""}">
        ${r?"":I`<div class="data-icon">${e}</div>`}
        <div class="data-content">
          <div class="data-label">${r?e+" ":""}${t}</div>
          <div class="data-value">${i}</div>
          ${s?I`<div class="data-subtitle">${s}</div>`:""}
        </div>
      </div>
    `}renderUVItem(e,t){const i=function(e){const t=_e.find(t=>e<=t.max);return t||_e[_e.length-1]}(e);return I`
      <div class="data-item ${t?"compact":""}">
        ${t?"":I`<div class="data-icon">☀️</div>`}
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
    `}setDataView(e){this.currentDataView=e}setHistoryPeriod(e){this.currentHistoryPeriod=e}static get styles(){return a`
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
    `}};e([pe({attribute:!1})],Le.prototype,"hass",void 0),e([ue()],Le.prototype,"config",void 0),e([ue()],Le.prototype,"currentDataView",void 0),e([ue()],Le.prototype,"currentHistoryPeriod",void 0),Le=e([ce("weatherstation-card")],Le);export{Le as WeatherStationCard};
