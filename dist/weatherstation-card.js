function e(e,t,i,r){var s,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new a(i,e,r)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",_=m.reactiveElementPolyfillSupport,w=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const a=r?.call(this);s?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...l(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=r;const a=s.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const a=this.constructor;if(!1===r&&(s=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??y)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==s||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[w("elementProperties")]=new Map,b[w("finalized")]=new Map,_?.({ReactiveElement:b}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,M=e=>e,k=x.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,H=`<${S}>`,D=document,T=()=>D.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,O="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,j=/>/g,W=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,U=/"/g,F=/^(?:script|style|textarea|title)$/i,R=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),I=R(1),B=R(2),G=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Z=new WeakMap,q=D.createTreeWalker(D,129);function Y(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,r=[];let s,a=2===t?"<svg>":3===t?"<math>":"",n=z;for(let t=0;t<i;t++){const i=e[t];let o,d,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,d=n.exec(i),null!==d);)h=n.lastIndex,n===z?"!--"===d[1]?n=V:void 0!==d[1]?n=j:void 0!==d[2]?(F.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=W):void 0!==d[3]&&(n=W):n===W?">"===d[0]?(n=s??z,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?W:'"'===d[3]?U:N):n===U||n===N?n=W:n===V||n===j?n=z:(n=W,s=void 0);const l=n===W&&e[t+1].startsWith("/>")?" ":"";a+=n===z?i+H:c>=0?(r.push(o),i.slice(0,c)+A+i.slice(c)+E+l):i+E+(-2===c?t:l)}return[Y(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,a=0;const n=e.length-1,o=this.parts,[d,c]=K(e,t);if(this.el=Q.createElement(d,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=q.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(A)){const t=c[a++],i=r.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?re:"?"===n[1]?se:"@"===n[1]?ae:ie}),r.removeAttribute(e)}else e.startsWith(E)&&(o.push({type:6,index:s}),r.removeAttribute(e));if(F.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],T()),q.nextNode(),o.push({type:2,index:++s});r.append(e[t],T())}}}else if(8===r.nodeType)if(r.data===S)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)o.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===G)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const a=P(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);q.currentNode=r;let s=q.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let t;2===o.type?t=new te(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new ne(s,this,e)),this._$AV.push(t),o=i[++n]}a!==o?.index&&(s=q.nextNode(),a++)}return q.currentNode=D,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),P(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new Q(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new te(this.O(T()),this.O(T()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=M(e).nextSibling;M(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(e,t=this,i,r){const s=this.strings;let a=!1;if(void 0===s)e=X(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==G,a&&(this._$AH=e);else{const r=e;let n,o;for(e=s[0],n=0;n<s.length-1;n++)o=X(this,r[i+n],t,n),o===G&&(o=this._$AH[n]),a||=!P(o)||o!==this._$AH[n],o===J?e=J:e!==J&&(e+=(o??"")+s[n+1]),this._$AH[n]=o}a&&!r&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class se extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class ae extends ie{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??J)===G)return;const i=this._$AH,r=e===J&&i!==J||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==J&&(i===J||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(Q,te),(x.litHtmlVersions??=[]).push("3.3.2");const de=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ce extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new te(t.insertBefore(T(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}ce._$litElement$=!0,ce.finalized=!0,de.litElementHydrateSupport?.({LitElement:ce});const he=de.litElementPolyfillSupport;he?.({LitElement:ce}),(de.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ue=(e=pe,t,i)=>{const{kind:r,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return me({...e,state:!0,attribute:!1})}const fe={entity_mode:"auto",show_temperature:!0,show_humidity:!0,show_pressure:!0,show_wind:!0,show_rain:!0,show_uv:!0,show_solar:!0,display_mode:"normal",data_view:"live",history_period:"day",show_wind_arrows:!0,enable_warnings:!1,show_trends:!0,show_sparklines:!0,show_forecast:!1,show_min_max:!0,trend_period:"1h",hero_metric:"auto",show_weather_condition:!0,color_theme:"auto",use_time_based_theme:!0,enable_animations:!0,grid_layout:"auto",card_style:"glass",warnings:{wind_speed:{enabled:!1,threshold:50,message:"High wind speed! Consider closing shades and securing outdoor items."},temperature:{enabled:!1,high_threshold:35,low_threshold:0,message_high:"High temperature! Stay hydrated and avoid direct sunlight.",message_low:"Low temperature! Watch for frost and freezing conditions."},uv:{enabled:!1,threshold:8,message:"Very high UV index! Use sun protection and limit outdoor exposure."},rain_rate:{enabled:!1,threshold:10,message:"Heavy rain! Check for flooding and secure outdoor items."}}},_e=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],we=[{max:2,label:"Low",color:"#289500"},{max:5,label:"Moderate",color:"#F7E400"},{max:7,label:"High",color:"#F85900"},{max:10,label:"Very High",color:"#D8001D"},{max:1/0,label:"Extreme",color:"#6B49C8"}],ve={temperature:["temperature","temp","outdoor_temp","temperatur","aussentemperatur","außentemperatur"],humidity:["humidity","humid","feuchtigkeit","luftfeuchtigkeit"],pressure:["pressure","absolute_pressure","relative_pressure","druck","luftdruck"],wind_speed:["wind_speed","windspeed","geschwindigkeit","windgeschwindigkeit"],wind_direction:["wind_direction","wind_bearing","winddirection","richtung","windrichtung"],wind_gust:["gust","wind_gust","gust_speed","geschwindigkeit_2","boe","windböe","windboe"],rain:["rain_total","daily_rain","rain","regen","niederschlag","regenmenge"],rain_rate:["rain_rate","rainrate","rain_piezo","regenrate","niederschlagsrate"],moisture:["moisture","wetness","feuchte","nass","trocken","regen_sensor","rain_sensor"],dew_point:["dew_point","dewpoint","taupunkt","dew"],uv_index:["uv_index","uvi","uv"],solar_radiation:["solar_radiation","solar","light","solarstrahlung","sonnenstrahlung","beleuchtungsstarke","beleuchtungsstärke","licht"]},ye={temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",wind_speed:"Wind Speed",wind_direction:"Wind Direction",wind_gust:"Wind Gust",rain:"Rain",rain_rate:"Rain Rate",moisture:"Moisture (Wetness)",dew_point:"Dew Point",uv_index:"UV Index",solar_radiation:"Solar Radiation"},$e={sunny:"☀️","partly-cloudy":"⛅",cloudy:"☁️",rainy:"🌧️",stormy:"⛈️",windy:"💨","clear-night":"🌙",unknown:"🌤️"},be={temperature:{significant:.3,major:2},humidity:{significant:2,major:10},pressure:{significant:.5,major:3},wind_speed:{significant:2,major:10},wind_gust:{significant:3,major:15},rain:{significant:.2,major:2},rain_rate:{significant:.5,major:5},uv_index:{significant:.5,major:2},solar_radiation:{significant:50,major:200},dew_point:{significant:.5,major:2}},xe={temperature:{min:-10,max:40,unit:"°C"},humidity:{min:0,max:100,unit:"%"},pressure:{min:970,max:1050,unit:"hPa"},wind_speed:{min:0,max:100,unit:"km/h"},rain:{min:0,max:50,unit:"mm"},uv_index:{min:0,max:11,unit:""},solar_radiation:{min:0,max:1200,unit:"W/m²"}},Me=30,ke=2,Ce=3,Ae=e=>B`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round"
       style="width:1em;height:1em;vertical-align:-0.125em;">
    ${e}
  </svg>
`,Ee=Ae(B`
  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z"/>
  <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" stroke="none"/>
`),Se=Ae(B`
  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>
`),He=Ae(B`
  <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/>
  <path d="M12 12l-3.5-3.5"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
  <path d="M5.63 16.5h12.74" opacity="0.4"/>
`),De=Ae(B`
  <path d="M2 12h13a3 3 0 1 0-3-3"/>
  <path d="M2 6h8a3 3 0 0 1 3 3"/>
  <path d="M2 18h10a3 3 0 1 0-3-3"/>
`),Te=Ae(B`
  <circle cx="12" cy="12" r="9"/>
  <polygon points="12,5 14,13 12,11 10,13" fill="currentColor" stroke="none"/>
  <polygon points="12,19 10,13 12,15 14,13" opacity="0.35" fill="currentColor" stroke="none"/>
`),Pe=Ae(B`
  <path d="M2 12h13a3 3 0 1 0-3-3"/>
  <path d="M2 6h8a3 3 0 0 1 3 3"/>
  <path d="M2 18h10a3 3 0 1 0-3-3"/>
  <path d="M17 8l2-2m0 4l2-2" opacity="0.5"/>
`),Le=Ae(B`
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2 8.535"/>
  <path d="M8 19v1"/>
  <path d="M8 14v1"/>
  <path d="M16 19v1"/>
  <path d="M16 14v1"/>
  <path d="M12 21v1"/>
  <path d="M12 16v1"/>
`),Oe=Ae(B`
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2 8.535"/>
  <path d="M9.2 22l3-7"/>
  <path d="M12.8 22l3-7"/>
`),ze=Ae(B`
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v2"/>
  <path d="M12 20v2"/>
  <path d="M4.93 4.93l1.41 1.41"/>
  <path d="M17.66 17.66l1.41 1.41"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <path d="M4.93 19.07l1.41-1.41"/>
  <path d="M17.66 6.34l1.41-1.41"/>
`),Ve=Ae(B`
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 3v1"/>
  <path d="M12 20v1"/>
  <path d="M3 12h1"/>
  <path d="M20 12h1"/>
  <path d="M5.6 5.6l.7.7"/>
  <path d="M17.7 17.7l.7.7"/>
  <path d="M5.6 18.4l.7-.7"/>
  <path d="M17.7 6.3l.7-.7"/>
  <path d="M15 9l2-2" opacity="0.4"/>
  <path d="M16 12h3" opacity="0.4"/>
`),je=Ae(B`
  <circle cx="12" cy="5" r="2.5"/>
  <path d="M12 7.5v5"/>
  <path d="M8 20l4-7.5 4 7.5"/>
  <path d="M14 14.76V3.5" opacity="0" />
`),We=Ae(B`
  <path d="M9.5 5l3.18 3.18a4.5 4.5 0 1 1-6.36 0L9.5 5Z"/>
  <path d="M16 12l1.77 1.77a2.5 2.5 0 1 1-3.54 0L16 12Z"/>
`),Ne=Ae(B`
  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>
  <path d="M8 14h8" opacity="0.4"/>
  <path d="M9 17h6" opacity="0.4"/>
`),Ue=Ae(B`
  <path d="M3 3v18h18"/>
  <path d="M7 16l4-6 4 4 5-8"/>
`),Fe=Ae(B`
  <circle cx="15.5" cy="6" r="2"/>
  <path d="M3 6h10.5M17.5 6H21"/>
  <circle cx="8.5" cy="12" r="2"/>
  <path d="M3 12h3.5M10.5 12H21"/>
  <circle cx="15.5" cy="18" r="2"/>
  <path d="M3 18h10.5M17.5 18H21"/>
`),Re=Ae(B`
  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
`),Ie=Ae(B`
  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none"/>
`),Be=Ae(B`
  <path d="M12 22v-5"/>
  <path d="M9 7V2"/>
  <path d="M15 7V2"/>
  <path d="M6 13V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z"/>
`),Ge=Ae(B`
  <path d="M12 20h9"/>
  <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855Z"/>
`),Je=Ae(B`
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
  <circle cx="12" cy="12" r="3"/>
`),Ze=Ae(B`
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <path d="M3 9h18"/>
  <path d="M9 21V9"/>
`),qe=Ae(B`
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
  <path d="M9 18h6"/>
  <path d="M10 22h4"/>
`),Ye=Ae(B`
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
  <circle cx="12" cy="12" r="3"/>
`),Ke=Ae(B`
  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
`),Qe=Ae(B`
  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  <path d="M20 3v4"/>
  <path d="M22 5h-4"/>
`),Xe=Ae(B`
  <path d="M3 3v18h18"/>
  <path d="m19 9-5 5-4-4-3 3"/>
`),et=Ae(B`
  <rect x="3" y="4" width="18" height="18" rx="2"/>
  <path d="M16 2v4"/>
  <path d="M8 2v4"/>
  <path d="M3 10h18"/>
`),tt=Ae(B`
  <path d="M2 12h20"/>
  <path d="M12 2v20"/>
  <path d="m4.93 4.93 14.14 14.14"/>
  <path d="m19.07 4.93-14.14 14.14"/>
  <path d="m7 3.5 5 5"/>
  <path d="m12 8.5 5-5"/>
  <path d="m7 20.5 5-5"/>
  <path d="m12 15.5 5 5"/>
`),it={temperature:Ee,humidity:Se,pressure:He,wind_speed:De,wind_direction:Te,wind_gust:Pe,rain:Le,rain_rate:Oe,uv_index:ze,solar_radiation:Ve,feels_like:je,dew_point:We,moisture:Ne},rt=Ue;function st(e,t="°C"){return`${Math.round(10*e)/10}${t}`}function at(e,t="km/h"){return`${Math.round(10*e)/10} ${t}`}function nt(e,t="mm"){return`${Math.round(100*e)/100} ${t}`}function ot(e){return e*Math.PI/180}function dt(e,t,i,r="1h"){if(0===t.length)return{direction:"stable",percentChange:0,absoluteChange:0,timeframe:r,previousValue:e};const s=t[0].value,a=e-s,n=0!==s?a/s*100:0,o=be[i]||{significant:.1};let d="stable";return Math.abs(a)>=o.significant&&(d=a>0?"up":"down"),{direction:d,percentChange:Math.round(10*n)/10,absoluteChange:Math.round(10*a)/10,timeframe:r,previousValue:s}}function ct(e,t){const i=be[e]||{major:1};return Math.abs(t)>=i.major}function ht(e=new Date){const t=e.getHours();return t>=5&&t<8?"dawn":t>=8&&t<18?"day":t>=18&&t<21?"dusk":"night"}function lt(e){const t="night"===ht();if(void 0!==e.rain_rate&&e.rain_rate>0)return void 0!==e.wind_speed&&e.wind_speed>50?"stormy":"rainy";if(void 0!==e.wind_speed&&e.wind_speed>40)return"windy";if(void 0!==e.solar_radiation){const i=function(e){if(e<6||e>20)return 0;const t=Math.abs(e-12);return Math.max(0,1e3*(1-t/8))}((new Date).getHours()),r=i>0?e.solar_radiation/i:1;return r>.7?t?"clear-night":"sunny":r>.3?"partly-cloudy":"cloudy"}return t?"clear-night":"sunny"}function pt(e,t){switch(t){case"temperature":case"feels_like":case"dew_point":return st(e);case"humidity":return`${Math.round(e)}%`;case"pressure":return function(e,t="hPa"){return`${Math.round(e)} ${t}`}(e);case"wind_speed":case"wind_gust":return at(e);case"rain":case"rain_rate":return nt(e);case"uv_index":default:return""+Math.round(10*e)/10;case"solar_radiation":return`${Math.round(e)} W/m²`}}let ut=class extends ce{constructor(){super(...arguments),this.windDirection=0,this.windSpeed=0,this.showArrows=!0,this.compact=!1,this.animate=!0}render(){const e=this.compact?80:120,t=e/2,i=e/2-8;return I`
      <div class="compass-container ${this.compact?"compact":""}">
        <svg width="${e}" height="${e}" viewBox="0 0 ${e} ${e}" class="compass-svg">
          <!-- Background glow -->
          <defs>
            <radialGradient id="compass-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
              <stop offset="100%" stop-color="rgba(255,255,255,0)" />
            </radialGradient>
            <!-- arrow-glow filter removed for performance -->
          </defs>

          <!-- Outer circle with gradient -->
          <circle
            cx="${t}"
            cy="${t}"
            r="${i}"
            fill="url(#compass-glow)"
            class="compass-bg"
          />

          <!-- Outer ring -->
          <circle cx="${t}" cy="${t}" r="${i}" class="compass-ring" />

          <!-- Tick marks -->
          ${this.renderTickMarks(t,i)}

          <!-- Cardinal directions -->
          ${this.renderCardinalMarks(t,i)}

          <!-- Average wind direction arrow (if available) -->
          ${this.showArrows&&void 0!==this.windDirectionAvg?this.renderWindArrow(t,.7*i,this.windDirectionAvg,"average"):""}

          <!-- Current wind direction arrow -->
          ${this.renderWindArrow(t,.85*i,this.windDirection,"current")}

          <!-- Center circle -->
          <circle cx="${t}" cy="${t}" r="6" class="center-circle" />
          <circle cx="${t}" cy="${t}" r="3" class="center-dot" />
        </svg>

        <div class="compass-info">
          <div class="direction-text">${function(e){const t=Math.round(e/22.5)%16;return _e[t]}(this.windDirection)}</div>
          <div class="degrees-text">${Math.round(this.windDirection)}°</div>
        </div>
      </div>
    `}renderTickMarks(e,t){const i=[];for(let r=0;r<16;r++){const s=ot(22.5*r-90),a=r%4==0,n=t-2,o=n-(a?8:4),d=e+n*Math.cos(s),c=e+n*Math.sin(s),h=e+o*Math.cos(s),l=e+o*Math.sin(s);i.push({x1:d,y1:c,x2:h,y2:l,isCardinal:a})}return I`
      <g class="tick-marks">
        ${i.map(e=>I`
            <line
              x1="${e.x1}"
              y1="${e.y1}"
              x2="${e.x2}"
              y2="${e.y2}"
              class="tick ${e.isCardinal?"cardinal":""}"
            />
          `)}
      </g>
    `}renderCardinalMarks(e,t){const i=[0,90,180,270],r=t-18;return I`
      <g class="cardinal-labels">
        ${["N","E","S","W"].map((t,s)=>{const a=ot(i[s]-90),n=e+r*Math.cos(a),o=e+r*Math.sin(a);return I`
            <text
              x="${n}"
              y="${o}"
              class="cardinal-text ${"N"===t?"north":""}"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              ${t}
            </text>
          `})}
      </g>
    `}renderWindArrow(e,t,i,r){const s=ot(i-90),a=e+t*Math.cos(s),n=e+t*Math.sin(s),o="current"===r?10:7,d=ot(i-90+145),c=ot(i-90-145),h=a+o*Math.cos(d),l=n+o*Math.sin(d),p=a+o*Math.cos(c),u=n+o*Math.sin(c);return"current"===r?I`
        <g class="wind-arrow current" filter="url(#arrow-glow)">
          <line x1="${e}" y1="${e}" x2="${a}" y2="${n}" class="arrow-line" />
          <polygon
            points="${a},${n} ${h},${l} ${p},${u}"
            class="arrow-head"
          />
        </g>
      `:I`
      <g class="wind-arrow average">
        <line x1="${e}" y1="${e}" x2="${a}" y2="${n}" class="arrow-line" />
        <polygon
          points="${a},${n} ${h},${l} ${p},${u}"
          class="arrow-head"
        />
      </g>
    `}static get styles(){return n`
      :host {
        display: block;
      }

      .compass-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .compass-container.compact {
        gap: 4px;
      }

      .compass-svg {
        /* Removed drop-shadow filter to reduce GPU composition cost */
      }

      .compass-bg {
        transition: fill 0.3s;
      }

      .compass-ring {
        fill: none;
        stroke: rgba(255, 255, 255, 0.3);
        stroke-width: 2;
      }

      .tick {
        stroke: rgba(255, 255, 255, 0.4);
        stroke-width: 1;
        stroke-linecap: round;
      }

      .tick.cardinal {
        stroke: rgba(255, 255, 255, 0.6);
        stroke-width: 2;
      }

      .cardinal-text {
        fill: rgba(255, 255, 255, 0.8);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .cardinal-text.north {
        fill: #ff6b6b;
        font-weight: 700;
      }

      .wind-arrow.current .arrow-line {
        stroke: #fff;
        stroke-width: 3;
        stroke-linecap: round;
        transition: all 0.5s ease-out;
      }

      .wind-arrow.current .arrow-head {
        fill: #fff;
        transition: all 0.5s ease-out;
      }

      .wind-arrow.average .arrow-line {
        stroke: rgba(255, 255, 255, 0.4);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 4, 3;
      }

      .wind-arrow.average .arrow-head {
        fill: rgba(255, 255, 255, 0.4);
      }

      .center-circle {
        fill: rgba(0, 0, 0, 0.2);
      }

      .center-dot {
        fill: #fff;
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
        color: inherit;
        letter-spacing: 1px;
      }

      .compact .direction-text {
        font-size: 14px;
      }

      .degrees-text {
        font-size: 12px;
        opacity: 0.7;
      }

      .compact .degrees-text {
        font-size: 10px;
      }

      .wind-arrow.current {
        /* Static glow instead of costly infinite animation */
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
      }
    `}};var mt,gt;e([me({type:Number})],ut.prototype,"windDirection",void 0),e([me({type:Number})],ut.prototype,"windSpeed",void 0),e([me({type:Number})],ut.prototype,"windDirectionAvg",void 0),e([me({type:Boolean})],ut.prototype,"showArrows",void 0),e([me({type:Boolean})],ut.prototype,"compact",void 0),e([me({type:Boolean})],ut.prototype,"animate",void 0),ut=e([le("wind-compass")],ut),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(mt||(mt={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(gt||(gt={}));var ft=function(e,t,i,r){r=r||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return s.detail=i,e.dispatchEvent(s),s};const _t=[{name:"entity_mode",selector:{select:{options:[{value:"auto",label:"Auto (Use Device)"},{value:"manual",label:"Manual (Select Individual Entities)"}],mode:"dropdown"}}}],wt=[{name:"device_id",selector:{device:{}}}],vt=[{name:"name",selector:{text:{}}}],yt=[{name:"display_mode",selector:{select:{options:[{value:"normal",label:"Normal - Full layout with all details"},{value:"compact",label:"Compact - Space-efficient grid"},{value:"hero",label:"Hero - Featured metric with large display"},{value:"minimal",label:"Minimal - Single line summary"}],mode:"dropdown"}}}],$t=[{name:"card_style",selector:{select:{options:[{value:"glass",label:"Glass - Modern glassmorphism with gradients"},{value:"solid",label:"Solid - Traditional card background"},{value:"minimal",label:"Minimal - Transparent, no background"}],mode:"dropdown"}}}],bt=[{name:"data_view",selector:{select:{options:[{value:"live",label:"Live Data"},{value:"history",label:"Historical Data"}],mode:"dropdown"}}}],xt=[{name:"history_period",selector:{select:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"year",label:"Year"}],mode:"dropdown"}}}],Mt=[{name:"trend_period",selector:{select:{options:[{value:"1h",label:"1 Hour"},{value:"3h",label:"3 Hours"},{value:"6h",label:"6 Hours"},{value:"12h",label:"12 Hours"},{value:"24h",label:"24 Hours"}],mode:"dropdown"}}}],kt=[{name:"hero_metric",selector:{select:{options:[{value:"auto",label:"Auto - Select most significant"},{value:"temperature",label:"Temperature"}],mode:"dropdown"}}}],Ct=[{name:"show_temperature",selector:{boolean:{}}},{name:"show_humidity",selector:{boolean:{}}},{name:"show_pressure",selector:{boolean:{}}},{name:"show_wind",selector:{boolean:{}}},{name:"show_wind_arrows",selector:{boolean:{}}},{name:"show_rain",selector:{boolean:{}}},{name:"show_uv",selector:{boolean:{}}},{name:"show_solar",selector:{boolean:{}}}],At=[{name:"show_trends",selector:{boolean:{}}},{name:"show_sparklines",selector:{boolean:{}}},{name:"show_min_max",selector:{boolean:{}}},{name:"show_weather_condition",selector:{boolean:{}}}],Et=[{name:"enable_animations",selector:{boolean:{}}}],St=[{name:"enable_warnings",selector:{boolean:{}}}],Ht=Object.keys(ye).map(e=>({name:`entities_${e}`,selector:{entity:{domain:"sensor"}}}));let Dt=class extends ce{constructor(){super(...arguments),this._activeTab="data",this._computeLabel=e=>({device_id:"Weather Station Device",name:"Card Name",entity_mode:"Entity Mode",display_mode:"Display Mode",card_style:"Card Style",data_view:"Default View",history_period:"History Period",trend_period:"Trend Comparison Period",hero_metric:"Hero Metric (for Hero mode)",show_temperature:"Show Temperature",show_humidity:"Show Humidity",show_pressure:"Show Pressure",show_wind:"Show Wind",show_wind_arrows:"Show Wind Compass",show_rain:"Show Rain",show_uv:"Show UV Index",show_solar:"Show Solar Radiation",show_trends:"Show Trend Indicators",show_sparklines:"Show Mini Charts (Sparklines)",show_min_max:"Show Min/Max Values",show_weather_condition:"Show Weather Condition",enable_animations:"Enable Animations",enable_warnings:"Enable Weather Warnings",...Object.fromEntries(Object.entries(ye).map(([e,t])=>[`entities_${e}`,t]))}[e.name]||e.name)}setConfig(e){this._config=e}connectedCallback(){super.connectedCallback(),this._loadHaForm()}async _loadHaForm(){if(customElements.get("ha-form"))return;const e=await(window.loadCardHelpers?.());if(!e)return;const t=await e.createCardElement({type:"entity",entity:"sun.sun"});t&&await(t.getConfigElement?.())}_getFormData(){const e={entity_mode:this._config.entity_mode||"auto",device_id:this._config.device_id||"",name:this._config.name||"",display_mode:this._config.display_mode||"normal",card_style:this._config.card_style||"glass",data_view:this._config.data_view||"live",history_period:this._config.history_period||"day",trend_period:this._config.trend_period||"1h",hero_metric:this._config.hero_metric||"auto",show_temperature:!1!==this._config.show_temperature,show_humidity:!1!==this._config.show_humidity,show_pressure:!1!==this._config.show_pressure,show_wind:!1!==this._config.show_wind,show_wind_arrows:!1!==this._config.show_wind_arrows,show_rain:!1!==this._config.show_rain,show_uv:!1!==this._config.show_uv,show_solar:!1!==this._config.show_solar,show_trends:!1!==this._config.show_trends,show_sparklines:!1!==this._config.show_sparklines,show_min_max:!1!==this._config.show_min_max,show_weather_condition:!1!==this._config.show_weather_condition,enable_animations:!1!==this._config.enable_animations,enable_warnings:this._config.enable_warnings||!1};return this._config.entities&&Object.entries(this._config.entities).forEach(([t,i])=>{e[`entities_${t}`]=i||""}),e}render(){return this.hass&&this._config?I`
      <div class="card-config">
        ${this.renderTabs()}
        <div class="tab-content">
          ${"data"===this._activeTab?this.renderDataTab():""}
          ${"appearance"===this._activeTab?this.renderAppearanceTab():""}
          ${"features"===this._activeTab?this.renderFeaturesTab():""}
          ${"warnings"===this._activeTab?this.renderWarningsTab():""}
        </div>
      </div>
    `:I``}renderTabs(){const e=[{id:"data",label:I`${Ue} Data`,icon:Ue},{id:"appearance",label:I`${Fe} Appearance`,icon:Fe},{id:"features",label:I`${Re} Features`,icon:Re},{id:"warnings",label:I`${Ie} Warnings`,icon:Ie}];return I`
      <div class="tabs">
        ${e.map(e=>I`
            <button
              class="tab ${this._activeTab===e.id?"active":""}"
              @click=${()=>this._activeTab=e.id}
            >
              ${e.label}
            </button>
          `)}
      </div>
    `}renderDataTab(){const e=this._getFormData(),t=this._config.entity_mode||"auto";return I`
      <div class="section">
        <h3>${Be} Data Source</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${_t}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${"auto"===t?I`
              <div class="info-box">
                <span class="info-icon">${qe}</span>
                <span>Select your weather station device and sensors will be auto-discovered.</span>
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${wt}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${this._config.device_id?this.renderAutoAssignments():J}
            `:I`
              <div class="info-box">
                <span class="info-icon">${Ye}</span>
                <span>Manually select individual sensor entities for each measurement.</span>
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Ht}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `}
      </div>

      <div class="section">
        <h3>${Ge} General</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${vt}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>${Je} Visible Sensors</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ct}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>
    `}renderAppearanceTab(){const e=this._getFormData();return I`
      <div class="section">
        <h3>${Ze} Display Mode</h3>
        <div class="mode-preview">${this.renderModePreview()}</div>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${yt}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${"hero"===this._config.display_mode?I`
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${kt}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:J}
      </div>

      <div class="section">
        <h3>${Fe} Card Style</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${$t}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>${Qe} Animations</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Et}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>
    `}renderModePreview(){const e=this._config.display_mode||"normal",t={normal:I`
        <div class="preview-card">
          <div class="preview-header">Weather Station</div>
          <div class="preview-grid">
            <div class="preview-metric">${Ee} 22°C</div>
            <div class="preview-metric">${Se} 65%</div>
            <div class="preview-metric">${De} 15 km/h</div>
            <div class="preview-metric">${Le} 0 mm</div>
          </div>
        </div>
      `,compact:I`
        <div class="preview-card compact">
          <div class="preview-row">
            <span>${Ee} 22°C</span>
            <span>${Se} 65%</span>
            <span>${De} 15</span>
          </div>
        </div>
      `,hero:I`
        <div class="preview-card hero">
          <div class="preview-hero-value">22°C</div>
          <div class="preview-hero-sub">↑ +2° / 1h</div>
        </div>
      `,minimal:I`
        <div class="preview-card minimal">
          <span>${Ee} 22°C</span>
          <span>${Se} 65%</span>
        </div>
      `};return t[e]||t.normal}renderFeaturesTab(){const e=this._getFormData();return I`
      <div class="section">
        <h3>${Xe} Trends & History</h3>
        <div class="info-box">
          <span class="info-icon">${Ue}</span>
          <span
            >Trends show how values have changed. Sparklines display mini charts of recent
            history.</span
          >
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${At}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${!1!==this._config.show_trends?I`
              <h4>Trend Comparison Period</h4>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Mt}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:J}
      </div>

      <div class="section">
        <h3>${et} Default View</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${bt}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${"history"===this._config.data_view?I`
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${xt}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:J}
      </div>
    `}renderWarningsTab(){const e=this._getFormData();return I`
      <div class="section">
        <h3>${Ie} Weather Warnings</h3>
        <div class="info-box warning">
          <span class="info-icon">${Ke}</span>
          <span>Get alerted when weather conditions exceed thresholds you set.</span>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${St}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${this._config.enable_warnings?this.renderWarningSettings():J}
      </div>
    `}renderWarningSettings(){const e={wind_speed:[{name:"warnings_wind_speed_enabled",selector:{boolean:{}}},{name:"warnings_wind_speed_threshold",selector:{number:{min:0,unit_of_measurement:"km/h"}}},{name:"warnings_wind_speed_message",selector:{text:{}}}],temperature:[{name:"warnings_temperature_enabled",selector:{boolean:{}}},{name:"warnings_temperature_high_threshold",selector:{number:{unit_of_measurement:"°C"}}},{name:"warnings_temperature_low_threshold",selector:{number:{unit_of_measurement:"°C"}}},{name:"warnings_temperature_message_high",selector:{text:{}}},{name:"warnings_temperature_message_low",selector:{text:{}}}],uv:[{name:"warnings_uv_enabled",selector:{boolean:{}}},{name:"warnings_uv_threshold",selector:{number:{min:0,max:15}}},{name:"warnings_uv_message",selector:{text:{}}}],rain_rate:[{name:"warnings_rain_rate_enabled",selector:{boolean:{}}},{name:"warnings_rain_rate_threshold",selector:{number:{min:0,unit_of_measurement:"mm/h"}}},{name:"warnings_rain_rate_message",selector:{text:{}}}]},t={warnings_wind_speed_enabled:"Enable Wind Speed Warning",warnings_wind_speed_threshold:"Threshold (km/h)",warnings_wind_speed_message:"Warning Message",warnings_temperature_enabled:"Enable Temperature Warning",warnings_temperature_high_threshold:"High Threshold (°C)",warnings_temperature_low_threshold:"Low Threshold (°C)",warnings_temperature_message_high:"High Temperature Message",warnings_temperature_message_low:"Low Temperature Message",warnings_uv_enabled:"Enable UV Warning",warnings_uv_threshold:"Threshold",warnings_uv_message:"Warning Message",warnings_rain_rate_enabled:"Enable Rain Rate Warning",warnings_rain_rate_threshold:"Threshold (mm/h)",warnings_rain_rate_message:"Warning Message"},i={warnings_wind_speed_enabled:this._config.warnings?.wind_speed?.enabled||!1,warnings_wind_speed_threshold:this._config.warnings?.wind_speed?.threshold||50,warnings_wind_speed_message:this._config.warnings?.wind_speed?.message||"",warnings_temperature_enabled:this._config.warnings?.temperature?.enabled||!1,warnings_temperature_high_threshold:this._config.warnings?.temperature?.high_threshold||35,warnings_temperature_low_threshold:this._config.warnings?.temperature?.low_threshold||0,warnings_temperature_message_high:this._config.warnings?.temperature?.message_high||"",warnings_temperature_message_low:this._config.warnings?.temperature?.message_low||"",warnings_uv_enabled:this._config.warnings?.uv?.enabled||!1,warnings_uv_threshold:this._config.warnings?.uv?.threshold||8,warnings_uv_message:this._config.warnings?.uv?.message||"",warnings_rain_rate_enabled:this._config.warnings?.rain_rate?.enabled||!1,warnings_rain_rate_threshold:this._config.warnings?.rain_rate?.threshold||10,warnings_rain_rate_message:this._config.warnings?.rain_rate?.message||""},r=e=>t[e.name]||e.name;return I`
      <div class="warning-settings">
        <div class="warning-category">
          <h4>${De} Wind Speed</h4>
          <ha-form
            .hass=${this.hass}
            .data=${i}
            .schema=${[e.wind_speed[0]]}
            .computeLabel=${r}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.wind_speed?.enabled?I`
                <ha-form
                  .hass=${this.hass}
                  .data=${i}
                  .schema=${e.wind_speed.slice(1)}
                  .computeLabel=${r}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `:J}
        </div>

        <div class="warning-category">
          <h4>${Ee} Temperature</h4>
          <ha-form
            .hass=${this.hass}
            .data=${i}
            .schema=${[e.temperature[0]]}
            .computeLabel=${r}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.temperature?.enabled?I`
                <ha-form
                  .hass=${this.hass}
                  .data=${i}
                  .schema=${e.temperature.slice(1)}
                  .computeLabel=${r}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `:J}
        </div>

        <div class="warning-category">
          <h4>${ze} UV Index</h4>
          <ha-form
            .hass=${this.hass}
            .data=${i}
            .schema=${[e.uv[0]]}
            .computeLabel=${r}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.uv?.enabled?I`
                <ha-form
                  .hass=${this.hass}
                  .data=${i}
                  .schema=${e.uv.slice(1)}
                  .computeLabel=${r}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `:J}
        </div>

        <div class="warning-category">
          <h4>${Le} Rain Rate</h4>
          <ha-form
            .hass=${this.hass}
            .data=${i}
            .schema=${[e.rain_rate[0]]}
            .computeLabel=${r}
            @value-changed=${this._warningFormValueChanged}
          ></ha-form>
          ${this._config.warnings?.rain_rate?.enabled?I`
                <ha-form
                  .hass=${this.hass}
                  .data=${i}
                  .schema=${e.rain_rate.slice(1)}
                  .computeLabel=${r}
                  @value-changed=${this._warningFormValueChanged}
                ></ha-form>
              `:J}
        </div>
      </div>
    `}_formValueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));Object.entries(t).forEach(([e,t])=>{if(e.startsWith("entities_")){const r=e.replace("entities_","");i.entities||(i.entities={}),t?i.entities[r]=t:delete i.entities[r]}else i[e]=t}),i.entities&&0===Object.keys(i.entities).length&&delete i.entities,this._config=i,ft(this,"config-changed",{config:this._config})}_warningFormValueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));i.warnings||(i.warnings={}),Object.entries(t).forEach(([e,t])=>{const r=e.replace("warnings_","").split("_");let s,a;"rain"===r[0]&&"rate"===r[1]?(s="rain_rate",a=r.slice(2).join("_")):"wind"===r[0]&&"speed"===r[1]?(s="wind_speed",a=r.slice(2).join("_")):(s=r[0],a=r.slice(1).join("_")),i.warnings[s]||(i.warnings[s]={}),i.warnings[s][a]=t}),this._config=i,ft(this,"config-changed",{config:this._config})}resolveAutoEntities(e){const t={},i=this.hass.entities||{};Object.values(this.hass.states).forEach(r=>{const s=r.entity_id,a=Object.values(i).find(e=>e.entity_id===s);if(a?.device_id===e){const e=s.split(".")[1].toLowerCase();t[e]=s}});const r={};for(const[e,i]of Object.entries(ve)){r[e]=void 0;for(const s of i){let i=!1;for(const[a,n]of Object.entries(t))if(a.includes(s)){r[e]=n,i=!0;break}if(i)break}}return r}renderAutoAssignments(){if(!this._config.device_id)return I``;const e=this.resolveAutoEntities(this._config.device_id),t=this._config.entities||{};return I`
      <div class="auto-assignments">
        <div class="auto-assignments-header">
          <span>${Be} Entity Assignments</span>
          <span class="assignment-count">
            ${Object.values(e).filter(e=>e).length} found
          </span>
        </div>

        ${Object.entries(ye).map(([i,r])=>{const s=e[i],a=t[i],n=a||s||"",o=!!a,d=!n;return I`
            <div
              class="assignment-row ${d?"not-found":""} ${o?"overridden":""}"
            >
              <div class="assignment-header">
                <span class="assignment-label">${r}</span>
                ${o?I`<span class="badge override">Override</span>`:d?I`<span class="badge not-found">Not found</span>`:I`<span class="badge auto">Auto</span>`}
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${{[`entities_${i}`]:n}}
                .schema=${[{name:`entities_${i}`,selector:{entity:{domain:"sensor"}}}]}
                .computeLabel=${()=>""}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${o?I`
                    <button class="reset-btn" @click=${()=>this._clearOverride(i)}>
                      Reset to auto
                    </button>
                  `:J}
            </div>
          `})}
      </div>
    `}_clearOverride(e){const t=JSON.parse(JSON.stringify(this._config));t.entities&&(delete t.entities[e],0===Object.keys(t.entities).length&&delete t.entities),this._config=t,ft(this,"config-changed",{config:this._config})}static get styles(){return n`
      .card-config {
        padding: 0;
      }

      /* Tabs */
      .tabs {
        display: flex;
        gap: 4px;
        padding: 8px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
        margin-bottom: 16px;
      }

      .tab {
        flex: 1;
        padding: 10px 12px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color, #666);
        transition: all 0.2s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }

      .tab:hover {
        background: rgba(0, 0, 0, 0.05);
        color: var(--primary-text-color);
      }

      .tab.active {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      /* Sections */
      .section {
        margin-bottom: 24px;
      }

      h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      h4 {
        margin: 16px 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary-text-color);
      }

      /* Info Box */
      .info-box {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        margin-bottom: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        font-size: 13px;
        color: var(--secondary-text-color, #666);
        border-left: 3px solid var(--primary-color, #03a9f4);
      }

      .info-box.warning {
        border-left-color: var(--warning-color, #ff9800);
      }

      .info-icon {
        font-size: 16px;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
      }

      /* Mode Preview */
      .mode-preview {
        margin-bottom: 16px;
      }

      .preview-card {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        border-radius: 12px;
        padding: 16px;
        color: white;
      }

      .preview-header {
        font-weight: 600;
        margin-bottom: 12px;
        font-size: 14px;
      }

      .preview-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .preview-metric {
        background: rgba(0, 0, 0, 0.15);
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .preview-card.compact {
        padding: 12px;
      }

      .preview-row {
        display: flex;
        justify-content: space-around;
        font-size: 13px;
      }

      .preview-row span,
      .preview-card.minimal span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .preview-card.hero {
        text-align: center;
        padding: 24px;
      }

      .preview-hero-value {
        font-size: 32px;
        font-weight: 700;
      }

      .preview-hero-sub {
        font-size: 12px;
        opacity: 0.8;
        margin-top: 4px;
      }

      .preview-card.minimal {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
      }

      /* Warning Settings */
      .warning-settings {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
      }

      .warning-category {
        padding: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
      }

      .warning-category h4 {
        margin: 0 0 12px 0;
      }

      /* Auto Assignments */
      .auto-assignments {
        margin-top: 16px;
      }

      .auto-assignments-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 12px;
      }

      .assignment-count {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        padding: 4px 10px;
        border-radius: 12px;
      }

      .assignment-row {
        margin-bottom: 8px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 10px;
        transition: all 0.2s;
      }

      .assignment-row:hover {
        background: var(--secondary-background-color, #eee);
      }

      .assignment-row.not-found {
        border-left: 3px solid var(--error-color, #f44336);
      }

      .assignment-row.overridden {
        border-left: 3px solid var(--warning-color, #ff9800);
      }

      .assignment-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .assignment-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .badge {
        font-size: 10px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      .badge.auto {
        background: var(--success-color, #4caf50);
        color: white;
      }

      .badge.override {
        background: var(--warning-color, #ff9800);
        color: white;
      }

      .badge.not-found {
        background: var(--error-color, #f44336);
        color: white;
      }

      .reset-btn {
        display: inline-block;
        margin-top: 8px;
        padding: 6px 12px;
        font-size: 12px;
        color: var(--primary-color, #03a9f4);
        background: transparent;
        border: 1px solid var(--primary-color, #03a9f4);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .reset-btn:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }
    `}};e([me({attribute:!1})],Dt.prototype,"hass",void 0),e([ge()],Dt.prototype,"_config",void 0),e([ge()],Dt.prototype,"_activeTab",void 0),Dt=e([le("weatherstation-card-editor")],Dt);let Tt=class extends ce{constructor(){super(...arguments),this.data=[],this.metric="temperature",this.width=80,this.height=Me,this.color="var(--primary-color, #03a9f4)",this.showGradient=!0,this.showDot=!0,this.showMinMax=!1,this.enableAnimation=!0,this._gradientId=`sp-${this.metric}-${Math.random().toString(36).substr(2,6)}`,this._hasAnimated=!1}render(){if(this.data.length<2)return I`<div class="no-data">—</div>`;const{path:e,min:t,max:i,points:r}=function(e,t,i,r=4){if(e.length<2)return{path:"",min:0,max:0,points:[]};const s=e.map(e=>e.value),a=Math.min(...s),n=Math.max(...s),o=n-a||1,d=t-2*r,c=i-2*r,h=e.map((t,i)=>({x:r+i/(e.length-1)*d,y:r+c-(t.value-a)/o*c,value:t.value})),l=h.map((e,t)=>`${0===t?"M":"L"} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`).join(" ");return{path:l,min:a,max:n,points:h}}(this.data,this.width,this.height,4),s=r[r.length-1],a=this._gradientId,n=this.enableAnimation&&!this._hasAnimated;n&&(this._hasAnimated=!0);const o=r.length>0?`${e} L ${r[r.length-1].x} ${this.height} L ${r[0].x} ${this.height} Z`:"";return I`
      <div class="sparkline-container">
        <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          class="sparkline-svg ${n?"animate":""}"
        >
          <!-- Gradient definition -->
          ${this.showGradient?B`
                <defs>
                  <linearGradient id="${a}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${this.color};stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:${this.color};stop-opacity:0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="${o}"
                  fill="url(#${a})"
                  class="area-fill"
                />
              `:""}

          <!-- Main line -->
          <path
            d="${e}"
            fill="none"
            stroke="${this.color}"
            stroke-width="${ke}"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="sparkline-path"
          />

          <!-- End dot -->
          ${this.showDot&&s?B`
                <circle
                  cx="${s.x}"
                  cy="${s.y}"
                  r="${Ce}"
                  fill="${this.color}"
                  class="end-dot"
                />
              `:""}
        </svg>

        ${this.showMinMax?I`
              <div class="min-max">
                <span class="min">${pt(t,this.metric)}</span>
                <span class="max">${pt(i,this.metric)}</span>
              </div>
            `:""}
      </div>
    `}static get styles(){return n`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .sparkline-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .sparkline-svg {
        display: block;
      }

      .sparkline-svg.animate .sparkline-path {
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        animation: drawLine 1s ease-out forwards;
      }

      .sparkline-svg.animate .area-fill {
        opacity: 0;
        animation: fadeIn 0.5s ease-out 0.5s forwards;
      }

      .sparkline-svg.animate .end-dot {
        opacity: 0;
        animation: fadeIn 0.3s ease-out 0.8s forwards;
      }

      @keyframes drawLine {
        to {
          stroke-dashoffset: 0;
        }
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }

      .end-dot {
        filter: drop-shadow(0 0 3px currentColor);
      }

      .min-max {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 9px;
        color: var(--secondary-text-color, #999);
        padding: 0 2px;
      }

      .no-data {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color, #999);
        font-size: 12px;
      }
    `}};e([me({type:Array})],Tt.prototype,"data",void 0),e([me({type:String})],Tt.prototype,"metric",void 0),e([me({type:Number})],Tt.prototype,"width",void 0),e([me({type:Number})],Tt.prototype,"height",void 0),e([me({type:String})],Tt.prototype,"color",void 0),e([me({type:Boolean})],Tt.prototype,"showGradient",void 0),e([me({type:Boolean})],Tt.prototype,"showDot",void 0),e([me({type:Boolean})],Tt.prototype,"showMinMax",void 0),e([me({type:Boolean})],Tt.prototype,"enableAnimation",void 0),Tt=e([le("weather-sparkline")],Tt);let Pt=class extends ce{constructor(){super(...arguments),this.metric="temperature",this.showValue=!0,this.compact=!1,this.pulse=!1}render(){if(!this.trend||"stable"===this.trend.direction)return I`
        <div class="trend stable ${this.compact?"compact":""}">
          <span class="arrow">→</span>
          ${this.showValue&&!this.compact?I`<span class="value">stable</span>`:""}
        </div>
      `;const e=function(e,t){if("stable"===e)return"var(--secondary-text-color, #666)";const i=["uv_index","rain_rate","wind_speed"].includes(t)?"up"===e:"down"===e;return"temperature"===t?"up"===e?"var(--error-color, #f44336)":"var(--info-color, #2196f3)":i?"var(--error-color, #f44336)":"var(--success-color, #4caf50)"}(this.trend.direction,this.metric),t=function(e,t){const i=e.absoluteChange>0?"+":"";switch(t){case"temperature":return`${i}${e.absoluteChange}°`;case"humidity":return`${i}${e.absoluteChange}%`;case"pressure":return`${i}${e.absoluteChange} hPa`;case"wind_speed":return`${i}${e.absoluteChange} km/h`;case"rain":return`${i}${e.absoluteChange} mm`;default:return`${i}${e.absoluteChange}`}}(this.trend,this.metric),i="up"===this.trend.direction;return I`
      <div
        class="trend ${this.trend.direction} ${this.compact?"compact":""} ${this.pulse?"pulse":""}"
        style="--trend-color: ${e}"
      >
        <span class="arrow">${i?"↑":"↓"}</span>
        ${this.showValue?I`
              <span class="value">${t}</span>
              ${!this.compact&&this.trend.timeframe?I`<span class="timeframe">/ ${this.trend.timeframe}</span>`:""}
            `:""}
      </div>
    `}static get styles(){return n`
      :host {
        display: inline-flex;
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        font-weight: 500;
        color: var(--trend-color, var(--secondary-text-color));
        padding: 2px 8px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--trend-color) 15%, transparent);
        transition: all 0.3s ease;
      }

      .trend.compact {
        padding: 2px 4px;
        font-size: 11px;
        gap: 2px;
      }

      .trend.stable {
        --trend-color: var(--secondary-text-color, #999);
        opacity: 0.7;
      }

      .arrow {
        font-weight: 700;
        font-size: 1.1em;
      }

      .trend.up .arrow {
        animation: bounceUp 0.5s ease-in-out;
      }

      .trend.down .arrow {
        animation: bounceDown 0.5s ease-in-out;
      }

      .trend.pulse {
        /* pulse once, then stop — avoids permanent repaint cost */
        animation: pulse 1s ease-in-out 1;
      }

      .value {
        font-variant-numeric: tabular-nums;
      }

      .timeframe {
        font-size: 0.85em;
        opacity: 0.7;
        font-weight: 400;
      }

      @keyframes bounceUp {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      @keyframes bounceDown {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(3px);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.02);
        }
      }
    `}};e([me({type:Object})],Pt.prototype,"trend",void 0),e([me({type:String})],Pt.prototype,"metric",void 0),e([me({type:Boolean})],Pt.prototype,"showValue",void 0),e([me({type:Boolean})],Pt.prototype,"compact",void 0),e([me({type:Boolean})],Pt.prototype,"pulse",void 0),Pt=e([le("trend-indicator")],Pt),console.info("%c WEATHERSTATION-CARD %c 2.0.0 ","color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-weight: 700; padding: 4px 8px; border-radius: 4px;","color: #764ba2; background: white; font-weight: 700; padding: 4px 8px; border-radius: 4px;"),window.customCards=window.customCards||[],window.customCards.push({type:"weatherstation-card",name:"Weather Station Card",description:"A modern, sleek card for displaying weather station data with trends and history"});let Lt=class extends ce{constructor(){super(...arguments),this.currentDataView="live",this.currentHistoryPeriod="day",this.expandedMetric=null,this.historyData=new Map,this.trends=new Map,this.lastHistoryFetch=0,this._cachedEntityIds=null,this._cachedDeviceEntities=null,this._historyFetchTimer=null,this._pendingHistoryFetch=!1}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;const i=this._getRelevantEntityIds();let r=!1;for(const e of i){if(t.states[e]!==this.hass.states[e]){r=!0;break}}return r||this._scheduleHistoryFetch(),r}_getRelevantEntityIds(){const e=this.getEntityIds();return Object.values(e).filter(e=>!!e)}static getConfigElement(){return document.createElement("weatherstation-card-editor")}static getStubConfig(){return{type:"custom:weatherstation-card",entity:"",name:"Weather Station",...fe}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=this.config;this.config={...fe,...e},this.currentDataView=this.config.data_view||"live",this.currentHistoryPeriod=this.config.history_period||"day";const i=t?.device_id,r=t?.entity_mode,s=t?.entities;t&&i===this.config.device_id&&r===this.config.entity_mode&&JSON.stringify(s)===JSON.stringify(this.config.entities)||(this._cachedEntityIds=null,this._cachedDeviceEntities=null)}getCardSize(){switch(this.config.display_mode){case"compact":case"minimal":return 2;case"hero":return 4;default:return 5}}connectedCallback(){super.connectedCallback(),this._scheduleHistoryFetch()}disconnectedCallback(){super.disconnectedCallback(),this._historyFetchTimer&&(clearTimeout(this._historyFetchTimer),this._historyFetchTimer=null)}_scheduleHistoryFetch(){if(this._pendingHistoryFetch)return;Date.now()-this.lastHistoryFetch<3e5||(this._pendingHistoryFetch=!0,this._historyFetchTimer=setTimeout(()=>{this._pendingHistoryFetch=!1,this.fetchHistoryData()},2e3))}async fetchHistoryData(){if(!this.hass||!this.config)return;this.lastHistoryFetch=Date.now();const e=this.getEntityIds(),t=new Date,i=this.getHistoryHours(),r=new Date(t.getTime()-60*i*60*1e3),s=Object.entries(e).filter(e=>!!e[1]);if(0===s.length)return;const a=s.map(([,e])=>e).join(",");try{const e=await this.hass.callApi("GET",`history/period/${r.toISOString()}?filter_entity_id=${a}&end_time=${t.toISOString()}&minimal_response&significant_changes_only`);if(!e)return;const i=new Map;for(const t of e)if(t.length>0){const e=t[0].entity_id;e&&i.set(e,t)}const n=new Map,o=new Map;for(const[e,r]of s){const s=i.get(r);if(!s)continue;const a=[];for(const e of s){const t=parseFloat(e.state);isNaN(t)||a.push({timestamp:new Date(e.last_changed).getTime(),value:t})}if(0===a.length)continue;n.set(e,this.samplePoints(a,30));const d=a[a.length-1].value,c=this.getTrendPeriodHours(),h=t.getTime()-60*c*60*1e3;let l=null;for(const e of a)if(e.timestamp>=h){l=e;break}if(l){const t=dt(d,[l],e,this.config.trend_period||"1h");o.set(e,t)}}this.historyData=n,this.trends=o}catch(e){console.warn("Failed to fetch history:",e)}}getHistoryHours(){switch(this.currentHistoryPeriod){case"week":return 168;case"month":return 720;case"year":return 8760;default:return 24}}getTrendPeriodHours(){switch(this.config.trend_period){case"3h":return 3;case"6h":return 6;case"12h":return 12;case"24h":return 24;default:return 1}}samplePoints(e,t){if(e.length<=t)return e;const i=[e[0]],r=(e.length-1)/(t-1);for(let s=1;s<t-1;s++)i.push(e[Math.round(s*r)]);return i.push(e[e.length-1]),i}getEntityIds(){if(this._cachedEntityIds)return this._cachedEntityIds;if("manual"===this.config.entity_mode&&this.config.entities)return this._cachedEntityIds=this.config.entities,this._cachedEntityIds;const e={};if(this.config.device_id){const t=this._getDeviceEntityMap();for(const[i,r]of Object.entries(t))for(const[t,s]of Object.entries(ve))if(!e[t])for(const a of s)if(i.includes(a)){e[t]=r;break}}return this._cachedEntityIds=e,e}_getDeviceEntityMap(){if(this._cachedDeviceEntities)return this._cachedDeviceEntities;const e=this.hass.entities||{},t={};for(const i of Object.values(e))if(i.device_id===this.config.device_id){t[i.entity_id.split(".")[1].toLowerCase()]=i.entity_id}return this._cachedDeviceEntities=t,t}getWeatherData(){if(!this.hass)return null;return"manual"===(this.config.entity_mode||"auto")&&this.config.entities?this.getDataFromIndividualEntities():this.config.device_id?this.getDataFromDevice():this.getDataFromWeatherEntity()}getDataFromDevice(){if(!this.config.device_id)return null;const e=this._getDeviceEntityMap(),t=this.config.entities||{},i=(t,i)=>{if(i){const e=this.hass.states[i];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}for(const i of t)for(const[t,r]of Object.entries(e))if(t.includes(i)){const e=this.hass.states[r];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}};return{temperature:i(ve.temperature,t.temperature),humidity:i(ve.humidity,t.humidity),pressure:i(ve.pressure,t.pressure),wind_speed:i(ve.wind_speed,t.wind_speed),wind_direction:i(ve.wind_direction,t.wind_direction),wind_gust:i(ve.wind_gust,t.wind_gust),rain:i(ve.rain,t.rain),rain_rate:i(ve.rain_rate,t.rain_rate),uv_index:i(ve.uv_index,t.uv_index),solar_radiation:i(ve.solar_radiation,t.solar_radiation)}}getDataFromWeatherEntity(){if(!this.config.entity)return null;const e=this.hass.states[this.config.entity];return e?{temperature:e.attributes.temperature,humidity:e.attributes.humidity,pressure:e.attributes.pressure,wind_speed:e.attributes.wind_speed,wind_direction:e.attributes.wind_bearing,wind_gust:e.attributes.wind_gust_speed,wind_avg:e.attributes.wind_speed,wind_direction_avg:e.attributes.wind_bearing_avg,rain:e.attributes.precipitation,rain_rate:e.attributes.precipitation_rate,uv_index:e.attributes.uv_index,solar_radiation:e.attributes.solar_radiation,feels_like:e.attributes.feels_like,dew_point:e.attributes.dew_point}:null}getDataFromIndividualEntities(){if(!this.config.entities)return null;const e=e=>{if(!e)return;const t=this.hass.states[e];if(!t)return;const i=parseFloat(t.state);return isNaN(i)?void 0:i};return{temperature:e(this.config.entities.temperature),humidity:e(this.config.entities.humidity),pressure:e(this.config.entities.pressure),wind_speed:e(this.config.entities.wind_speed),wind_direction:e(this.config.entities.wind_direction),wind_gust:e(this.config.entities.wind_gust),rain:e(this.config.entities.rain),rain_rate:e(this.config.entities.rain_rate),uv_index:e(this.config.entities.uv_index),solar_radiation:e(this.config.entities.solar_radiation)}}_getWarnings(e){return this.config.enable_warnings?function(e,t){if(!t)return[];const i=[];return t.wind_speed?.enabled&&void 0!==e.wind_speed&&e.wind_speed>=t.wind_speed.threshold&&i.push({type:"wind",severity:e.wind_speed>=1.5*t.wind_speed.threshold?"high":"medium",message:t.wind_speed.message||`High wind speed: ${e.wind_speed} km/h`,icon:De}),t.temperature?.enabled&&void 0!==e.temperature&&(void 0!==t.temperature.high_threshold&&e.temperature>=t.temperature.high_threshold&&i.push({type:"temperature",severity:e.temperature>=t.temperature.high_threshold+5?"high":"medium",message:t.temperature.message_high||`High temperature: ${e.temperature}°C`,icon:Ee}),void 0!==t.temperature.low_threshold&&e.temperature<=t.temperature.low_threshold&&i.push({type:"temperature",severity:e.temperature<=t.temperature.low_threshold-5?"high":"medium",message:t.temperature.message_low||`Low temperature: ${e.temperature}°C`,icon:tt})),t.uv?.enabled&&void 0!==e.uv_index&&e.uv_index>=t.uv.threshold&&i.push({type:"uv",severity:e.uv_index>=11?"high":"medium",message:t.uv.message||`High UV index: ${e.uv_index}`,icon:ze}),t.rain_rate?.enabled&&void 0!==e.rain_rate&&e.rain_rate>=t.rain_rate.threshold&&i.push({type:"rain",severity:e.rain_rate>=2*t.rain_rate.threshold?"high":"medium",message:t.rain_rate.message||`Heavy rain: ${e.rain_rate} mm/h`,icon:Le}),i}(e,this.config.warnings):[]}render(){if(!this.hass||!this.config)return I``;const e=this.getWeatherData();if(!e)return this.renderError();const t=this._getWarnings(e),i=ht(),r=lt(e),s=this.config.card_style||"glass";return I`
      <ha-card class="weather-card ${this.config.display_mode} ${s} ${i}">
        ${this.renderBackground(i,r)}
        <div class="card-inner">
          ${this.renderHeader(e,r)}
          ${t.length>0?this.renderWarnings(t):""}
          ${this.renderContent(e)}
        </div>
      </ha-card>
    `}renderError(){let e,t;return this.config.device_id?(e="No data available from device",t="Please check your configuration and ensure the device exists."):this.config.entity?(e=`Entity not available: ${this.config.entity}`,t="Please check your configuration and ensure the entity exists."):(e="No device or entity configured",t="Open the card editor and select a device or entity."),I`
      <ha-card class="weather-card error-card">
        <div class="error-content">
          <div class="error-icon">${Ie}</div>
          <div class="error-message">${e}</div>
          <div class="error-hint">${t}</div>
        </div>
      </ha-card>
    `}renderBackground(e,t){return"minimal"===this.config.card_style||"solid"===this.config.card_style?I``:I`
      <div class="background-layer ${e} ${t}">
        <div class="gradient-overlay"></div>
      </div>
    `}renderHeader(e,t){const i=$e[t]||"🌤️",r=function(e){const t=[];return void 0!==e.temperature&&(e.temperature>30?t.push("Hot"):e.temperature>20?t.push("Warm"):e.temperature>10?t.push("Mild"):e.temperature>0?t.push("Cool"):t.push("Cold")),void 0!==e.rain_rate&&e.rain_rate>0&&(e.rain_rate>10?t.push("heavy rain"):e.rain_rate>2?t.push("rain"):t.push("light rain")),void 0!==e.wind_speed&&e.wind_speed>20&&(e.wind_speed>50?t.push("strong winds"):t.push("breezy")),t.join(", ")||"Pleasant conditions"}(e);return I`
      <div class="card-header">
        <div class="header-left">
          ${this.config.name?I`<h2 class="card-title">${this.config.name}</h2>`:""}
          ${!1!==this.config.show_weather_condition?I`
                <div class="weather-condition">
                  <span class="condition-icon">${i}</span>
                  <span class="condition-text">${r}</span>
                </div>
              `:""}
        </div>
        <div class="header-right">${this.renderViewToggle()}</div>
      </div>
    `}renderViewToggle(){return I`
      <div class="view-toggle">
        <button
          class="toggle-btn ${"live"===this.currentDataView?"active":""}"
          @click=${()=>this.setDataView("live")}
          title="Live Data"
        >
          <span class="btn-icon">${Re}</span>
        </button>
        <button
          class="toggle-btn ${"history"===this.currentDataView?"active":""}"
          @click=${()=>this.setDataView("history")}
          title="History"
        >
          <span class="btn-icon">${Ue}</span>
        </button>
      </div>
    `}renderWarnings(e){return I`
      <div class="warnings-container">
        ${e.map(e=>I`
            <div class="warning-pill ${e.severity}">
              <span class="warning-icon">${e.icon}</span>
              <span class="warning-text">${e.message}</span>
            </div>
          `)}
      </div>
    `}renderContent(e){if("history"===this.currentDataView)return this.renderHistoryView();switch(this.config.display_mode){case"hero":return this.renderHeroMode(e);case"compact":return this.renderCompactMode(e);case"minimal":return this.renderMinimalMode(e);default:return this.renderNormalMode(e)}}renderHeroMode(e){const t={};this.trends.forEach((e,i)=>t[i]=e);const i="auto"===this.config.hero_metric?function(e,t){const i=[{metric:"rain",check:()=>(e.rain_rate||0)>5},{metric:"wind_speed",check:()=>(e.wind_speed||0)>50},{metric:"uv_index",check:()=>(e.uv_index||0)>=8},{metric:"temperature",check:()=>!!t?.temperature&&ct("temperature",t.temperature.absoluteChange)},{metric:"pressure",check:()=>!!t?.pressure&&ct("pressure",t.pressure.absoluteChange)}];for(const{metric:e,check:t}of i)if(t())return e;return"temperature"}(e,t):"temperature",r=e[i],s=this.trends.get(i),a=this.historyData.get(i);return I`
      <div class="hero-layout">
        <div class="hero-main">
          <div class="hero-icon">${it[i]||rt}</div>
          <div class="hero-value">
            ${void 0!==r?pt(r,i):"--"}
          </div>
          ${s&&!1!==this.config.show_trends?I`
                <trend-indicator
                  .trend=${s}
                  .metric=${i}
                  .pulse=${ct(i,s.absoluteChange)}
                ></trend-indicator>
              `:""}
          ${a&&!1!==this.config.show_sparklines?I`
                <weather-sparkline
                  .data=${a}
                  .metric=${i}
                  .width=${200}
                  .height=${60}
                  .showMinMax=${!0}
                ></weather-sparkline>
              `:""}
        </div>
        <div class="hero-secondary">${this.renderSecondaryMetrics(e,i)}</div>
      </div>
    `}renderSecondaryMetrics(e,t){const i=[{key:"temperature",show:this.config.show_temperature},{key:"humidity",show:this.config.show_humidity},{key:"pressure",show:this.config.show_pressure},{key:"wind_speed",show:this.config.show_wind},{key:"rain",show:this.config.show_rain},{key:"uv_index",show:this.config.show_uv}].filter(e=>!1!==e.show&&e.key!==t);return I`
      <div class="secondary-grid">
        ${i.map(({key:t})=>this.renderCompactMetric(t,e))}
      </div>
    `}renderNormalMode(e){return I`
      <div class="metrics-grid normal">
        ${this.config.show_temperature&&void 0!==e.temperature?this.renderMetricCard("temperature",e.temperature,e.feels_like):""}
        ${this.config.show_humidity&&void 0!==e.humidity?this.renderMetricCard("humidity",e.humidity):""}
        ${this.config.show_pressure&&void 0!==e.pressure?this.renderMetricCard("pressure",e.pressure):""}
        ${this.config.show_wind&&void 0!==e.wind_speed?this.renderWindCard(e):""}
        ${this.config.show_rain&&void 0!==e.rain?this.renderMetricCard("rain",e.rain,void 0,e.rain_rate):""}
        ${this.config.show_uv&&void 0!==e.uv_index?this.renderUVCard(e.uv_index):""}
        ${this.config.show_solar&&void 0!==e.solar_radiation?this.renderMetricCard("solar_radiation",e.solar_radiation):""}
      </div>
    `}renderCompactMode(e){return I`
      <div class="metrics-grid compact">
        ${this.config.show_temperature&&void 0!==e.temperature?this.renderCompactMetric("temperature",e):""}
        ${this.config.show_humidity&&void 0!==e.humidity?this.renderCompactMetric("humidity",e):""}
        ${this.config.show_pressure&&void 0!==e.pressure?this.renderCompactMetric("pressure",e):""}
        ${this.config.show_wind&&void 0!==e.wind_speed?this.renderCompactMetric("wind_speed",e):""}
        ${this.config.show_rain&&void 0!==e.rain?this.renderCompactMetric("rain",e):""}
        ${this.config.show_uv&&void 0!==e.uv_index?this.renderCompactMetric("uv_index",e):""}
      </div>
    `}renderMinimalMode(e){return I`
      <div class="minimal-layout">
        <div class="minimal-primary">
          <span class="minimal-icon">${it.temperature}</span>
          <span class="minimal-value">${st(e.temperature||0)}</span>
          ${this.trends.get("temperature")?I`<trend-indicator
                .trend=${this.trends.get("temperature")}
                metric="temperature"
                compact
              ></trend-indicator>`:""}
        </div>
        <div class="minimal-secondary">
          ${void 0!==e.humidity?I`<span class="minimal-stat">${Se} ${e.humidity}%</span>`:""}
          ${void 0!==e.wind_speed?I`<span class="minimal-stat">${De} ${at(e.wind_speed)}</span>`:""}
        </div>
      </div>
    `}renderMetricCard(e,t,i,r){const s=this.trends.get(e),a=this.historyData.get(e),n=this.expandedMetric===e;return I`
      <div
        class="metric-card ${n?"expanded":""}"
        @click=${()=>this.toggleExpanded(e)}
      >
        <div class="metric-header">
          <span class="metric-icon">${it[e]||rt}</span>
          <span class="metric-label">${this.getMetricLabel(e)}</span>
        </div>

        <div class="metric-body">
          <div class="metric-value-row">
            <span class="metric-value">${pt(t,e)}</span>
            ${s&&!1!==this.config.show_trends?I`<trend-indicator .trend=${s} .metric=${e} compact></trend-indicator>`:""}
          </div>

          ${void 0!==i?I`<div class="metric-secondary">
                Feels like ${pt(i,e)}
              </div>`:""}
          ${void 0!==r&&r>0?I`<div class="metric-secondary">Rate: ${nt(r)}/h</div>`:""}
        </div>

        ${a&&!1!==this.config.show_sparklines?I`
              <div class="metric-sparkline">
                <weather-sparkline
                  .data=${a}
                  .metric=${e}
                  .width=${100}
                  .height=${24}
                  .showGradient=${!0}
                  .showDot=${!0}
                ></weather-sparkline>
              </div>
            `:""}
        ${!1!==this.config.show_min_max&&n?this.renderMinMax(e,a):""}
      </div>
    `}renderMinMax(e,t){if(!t||0===t.length)return I``;const i=t.map(e=>e.value),r=Math.min(...i),s=Math.max(...i);return I`
      <div class="min-max-row">
        <span class="min-value">↓ ${pt(r,e)}</span>
        <span class="max-value">↑ ${pt(s,e)}</span>
      </div>
    `}renderCompactMetric(e,t){const i=t[e];if(void 0===i)return I``;const r=this.trends.get(e);return I`
      <div class="compact-metric">
        <span class="compact-icon">${it[e]||rt}</span>
        <div class="compact-info">
          <span class="compact-value">${pt(i,e)}</span>
          ${r&&!1!==this.config.show_trends?I`<trend-indicator
                .trend=${r}
                .metric=${e}
                compact
                .showValue=${!1}
              ></trend-indicator>`:""}
        </div>
      </div>
    `}renderWindCard(e){const t=this.trends.get("wind_speed");return I`
      <div class="metric-card wind-card">
        <div class="metric-header">
          <span class="metric-icon">${it.wind_speed}</span>
          <span class="metric-label">Wind</span>
        </div>

        <div class="wind-content">
          ${!1!==this.config.show_wind_arrows?I`
                <wind-compass
                  .windDirection=${e.wind_direction||0}
                  .windSpeed=${e.wind_speed||0}
                  .windDirectionAvg=${e.wind_direction_avg}
                  .showArrows=${!0}
                  .compact=${"compact"===this.config.display_mode}
                ></wind-compass>
              `:""}

          <div class="wind-stats">
            <div class="wind-speed-row">
              <span class="wind-speed-value">${at(e.wind_speed||0)}</span>
              ${t&&!1!==this.config.show_trends?I`<trend-indicator
                    .trend=${t}
                    metric="wind_speed"
                    compact
                  ></trend-indicator>`:""}
            </div>
            ${e.wind_gust?I`<div class="wind-gust">Gust: ${at(e.wind_gust)}</div>`:""}
          </div>
        </div>
      </div>
    `}renderUVCard(e){const t=function(e){const t=we.find(t=>e<=t.max);return t||we[we.length-1]}(e),i=function(e,t){const i=xe[t];return(Math.max(i.min,Math.min(i.max,e))-i.min)/(i.max-i.min)*100}(e,"uv_index"),r=this.trends.get("uv_index");return I`
      <div class="metric-card uv-card">
        <div class="metric-header">
          <span class="metric-icon">${it.uv_index}</span>
          <span class="metric-label">UV Index</span>
        </div>

        <div class="metric-body">
          <div class="metric-value-row">
            <span class="metric-value">${e}</span>
            <span class="uv-badge" style="background-color: ${t.color}"
              >${t.label}</span
            >
            ${r&&!1!==this.config.show_trends?I`<trend-indicator .trend=${r} metric="uv_index" compact></trend-indicator>`:""}
          </div>

          <div class="progress-bar">
            <div
              class="progress-fill"
              style="width: ${i}%; background-color: ${t.color}"
            ></div>
          </div>
        </div>
      </div>
    `}renderHistoryView(){return I`
      <div class="history-view">
        <div class="period-tabs">
          ${["day","week","month","year"].map(e=>I`
              <button
                class="period-tab ${this.currentHistoryPeriod===e?"active":""}"
                @click=${()=>this.setHistoryPeriod(e)}
              >
                ${e.charAt(0).toUpperCase()+e.slice(1)}
              </button>
            `)}
        </div>

        <div class="history-content">
          ${Array.from(this.historyData.entries()).map(([e,t])=>I`
              <div class="history-metric">
                <div class="history-metric-header">
                  <span class="metric-icon">${it[e]||rt}</span>
                  <span class="metric-label">${this.getMetricLabel(e)}</span>
                  ${this.renderMinMax(e,t)}
                </div>
                <weather-sparkline
                  .data=${t}
                  .metric=${e}
                  .width=${280}
                  .height=${50}
                  .showMinMax=${!1}
                ></weather-sparkline>
              </div>
            `)}
          ${0===this.historyData.size?I`
                <div class="history-empty">
                  <span class="empty-icon">${Ue}</span>
                  <span class="empty-text">Loading history data...</span>
                </div>
              `:""}
        </div>
      </div>
    `}getMetricLabel(e){return{temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",wind_speed:"Wind Speed",wind_direction:"Wind Direction",wind_gust:"Wind Gust",rain:"Rain",rain_rate:"Rain Rate",uv_index:"UV Index",solar_radiation:"Solar"}[e]||e}toggleExpanded(e){this.expandedMetric=this.expandedMetric===e?null:e}setDataView(e){this.currentDataView=e,"history"===e&&(this.lastHistoryFetch=0,this._pendingHistoryFetch=!1,this.fetchHistoryData())}setHistoryPeriod(e){this.currentHistoryPeriod=e,this.lastHistoryFetch=0,this._pendingHistoryFetch=!1,this.fetchHistoryData()}static get styles(){return n`
      :host {
        display: block;
        --card-radius: 16px;
        --glass-bg: rgba(255, 255, 255, 0.15);
        --glass-border: rgba(255, 255, 255, 0.25);
        --transition-speed: 0.3s;
      }

      /* Card Base */
      .weather-card {
        position: relative;
        border-radius: var(--card-radius);
        overflow: hidden;
        color: var(--primary-text-color);
      }

      .weather-card.glass {
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      }

      .weather-card.solid {
        background: var(--card-background-color, #fff);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .weather-card.minimal {
        background: transparent;
        box-shadow: none;
        border: none;
      }

      .card-inner {
        position: relative;
        z-index: 1;
        padding: 20px;
      }

      /* Background */
      .background-layer {
        position: absolute;
        inset: 0;
        z-index: 0;
        transition: background var(--transition-speed);
      }

      .background-layer.day {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      .background-layer.night {
        background: linear-gradient(135deg, #0c1445 0%, #1a237e 100%);
      }
      .background-layer.dawn {
        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
      }
      .background-layer.dusk {
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      }

      .gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
      }

      /* Header */
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        gap: 16px;
      }

      .card-title {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
      }

      .weather-condition {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        opacity: 0.9;
      }

      .condition-icon {
        font-size: 1.4rem;
      }
      .condition-text {
        font-size: 0.85rem;
      }

      /* View Toggle */
      .view-toggle {
        display: flex;
        gap: 4px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        padding: 4px;
        flex-shrink: 0;
      }

      .toggle-btn {
        background: transparent;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        color: inherit;
        opacity: 0.7;
      }

      .toggle-btn:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.15);
      }
      .toggle-btn.active {
        opacity: 1;
        background: rgba(255, 255, 255, 0.25);
      }
      .btn-icon {
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Warnings */
      .warnings-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
      }

      .warning-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.25);
      }

      .warning-pill.medium {
        border-left: 4px solid #ffc107;
      }
      .warning-pill.high {
        border-left: 4px solid #dc3545;
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

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      .warning-icon {
        font-size: 1.2rem;
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }
      .warning-text {
        font-size: 0.85rem;
        flex: 1;
      }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        gap: 12px;
      }

      .metrics-grid.normal {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      }

      .metrics-grid.compact {
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }

      /* Metric Card */
      .metric-card {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        padding: 14px;
        cursor: pointer;
        transition: background var(--transition-speed), transform var(--transition-speed);
        border: 1px solid rgba(255, 255, 255, 0.1);
        contain: content;
      }

      .metric-card:hover {
        transform: translateY(-2px);
        background: rgba(0, 0, 0, 0.2);
      }

      .metric-card.expanded {
        grid-column: span 2;
      }
      .metric-card.wind-card {
        grid-column: span 2;
      }

      .metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .metric-icon {
        font-size: 1.2rem;
        display: inline-flex;
        align-items: center;
        opacity: 0.85;
      }

      .metric-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.8;
      }

      .metric-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .metric-value-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .metric-value {
        font-size: 1.6rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }

      .metric-secondary {
        font-size: 0.75rem;
        opacity: 0.7;
      }

      .metric-sparkline {
        margin-top: 10px;
      }

      /* Min/Max */
      .min-max-row {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.75rem;
        opacity: 0.8;
      }

      .min-value {
        color: #64b5f6;
      }
      .max-value {
        color: #ef5350;
      }

      /* Wind Card */
      .wind-content {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .wind-stats {
        flex: 1;
      }

      .wind-speed-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .wind-speed-value {
        font-size: 1.4rem;
        font-weight: 600;
      }

      .wind-gust {
        font-size: 0.8rem;
        opacity: 0.7;
        margin-top: 4px;
      }

      /* UV Card */
      .uv-badge {
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 0.65rem;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }

      .progress-bar {
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin-top: 12px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.5s ease-out;
      }

      /* Compact Metric */
      .compact-metric {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        transition: background 0.2s;
        contain: content;
      }

      .compact-metric:hover {
        background: rgba(0, 0, 0, 0.2);
      }

      .compact-icon {
        font-size: 1.1rem;
        display: inline-flex;
        align-items: center;
        opacity: 0.85;
      }

      .compact-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .compact-value {
        font-size: 1rem;
        font-weight: 600;
      }

      /* Hero Layout */
      .hero-layout {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .hero-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 8px;
      }

      .hero-icon {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.85;
      }

      .hero-value {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1;
      }

      .secondary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: 10px;
      }

      /* Minimal Layout */
      .minimal-layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
      }

      .minimal-primary {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .minimal-icon {
        font-size: 1.4rem;
        display: inline-flex;
        align-items: center;
        opacity: 0.85;
      }

      .minimal-value {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .minimal-secondary {
        display: flex;
        gap: 16px;
        font-size: 0.85rem;
        opacity: 0.8;
      }

      .minimal-stat {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* History View */
      .history-view {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .period-tabs {
        display: flex;
        gap: 4px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        padding: 4px;
      }

      .period-tab {
        flex: 1;
        background: transparent;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        color: inherit;
        font-size: 0.8rem;
        transition: all 0.2s;
        opacity: 0.7;
      }

      .period-tab:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
      }
      .period-tab.active {
        opacity: 1;
        background: rgba(255, 255, 255, 0.2);
        font-weight: 600;
      }

      .history-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .history-metric {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        padding: 14px;
      }

      .history-metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }

      .history-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        gap: 12px;
        opacity: 0.6;
      }

      .empty-icon {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
      }
      .empty-text {
        font-size: 0.9rem;
      }

      /* Error State */
      .error-card {
        background: var(--card-background-color, #fff);
      }

      .error-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        gap: 12px;
      }

      .error-icon {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
      }
      .error-message {
        font-size: 1rem;
        font-weight: 600;
        color: var(--error-color, #db4437);
      }
      .error-hint {
        font-size: 0.85rem;
        color: var(--secondary-text-color, #666);
      }

      /* Responsive */
      @media (max-width: 600px) {
        .card-inner {
          padding: 16px;
        }
        .metrics-grid.normal {
          grid-template-columns: 1fr 1fr;
        }
        .metric-card.wind-card,
        .metric-card.expanded {
          grid-column: span 2;
        }
        .wind-content {
          flex-direction: column;
          text-align: center;
        }
        .hero-value {
          font-size: 2.8rem;
        }
        .card-header {
          flex-direction: column;
          gap: 12px;
        }
        .view-toggle {
          align-self: flex-start;
        }
      }

      @media (max-width: 400px) {
        .metrics-grid.normal {
          grid-template-columns: 1fr;
        }
        .metric-card.wind-card,
        .metric-card.expanded {
          grid-column: span 1;
        }
      }
    `}};e([me({attribute:!1})],Lt.prototype,"hass",void 0),e([ge()],Lt.prototype,"config",void 0),e([ge()],Lt.prototype,"currentDataView",void 0),e([ge()],Lt.prototype,"currentHistoryPeriod",void 0),e([ge()],Lt.prototype,"expandedMetric",void 0),e([ge()],Lt.prototype,"historyData",void 0),e([ge()],Lt.prototype,"trends",void 0),e([ge()],Lt.prototype,"lastHistoryFetch",void 0),Lt=e([le("weatherstation-card")],Lt);export{Lt as WeatherStationCard};
