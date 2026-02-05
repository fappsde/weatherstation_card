function e(e,t,i,r){var s,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new a(i,e,r)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",_=m.reactiveElementPolyfillSupport,w=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!d(e,t),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const a=r?.call(this);s?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=r;const a=s.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const a=this.constructor;if(!1===r&&(s=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??y)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==s||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[w("elementProperties")]=new Map,$[w("finalized")]=new Map,_?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,k=e=>e,C=x.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,M="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,H=`<${E}>`,D=document,T=()=>D.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,z="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,N=/>/g,V=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,U=/"/g,R=/^(?:script|style|textarea|title)$/i,F=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),I=F(1),B=F(2),G=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,Y=D.createTreeWalker(D,129);function Z(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,r=[];let s,a=2===t?"<svg>":3===t?"<math>":"",n=W;for(let t=0;t<i;t++){const i=e[t];let o,d,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,d=n.exec(i),null!==d);)l=n.lastIndex,n===W?"!--"===d[1]?n=L:void 0!==d[1]?n=N:void 0!==d[2]?(R.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=V):void 0!==d[3]&&(n=V):n===V?">"===d[0]?(n=s??W,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?V:'"'===d[3]?U:j):n===U||n===j?n=V:n===L||n===N?n=W:(n=V,s=void 0);const h=n===V&&e[t+1].startsWith("/>")?" ":"";a+=n===W?i+H:c>=0?(r.push(o),i.slice(0,c)+M+i.slice(c)+S+h):i+S+(-2===c?t:h)}return[Z(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,a=0;const n=e.length-1,o=this.parts,[d,c]=K(e,t);if(this.el=Q.createElement(d,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Y.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(M)){const t=c[a++],i=r.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?re:"?"===n[1]?se:"@"===n[1]?ae:ie}),r.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:s}),r.removeAttribute(e));if(R.test(r.tagName)){const e=r.textContent.split(S),t=e.length-1;if(t>0){r.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],T()),Y.nextNode(),o.push({type:2,index:++s});r.append(e[t],T())}}}else if(8===r.nodeType)if(r.data===E)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(S,e+1));)o.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===G)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const a=P(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);Y.currentNode=r;let s=Y.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let t;2===o.type?t=new te(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new ne(s,this,e)),this._$AV.push(t),o=i[++n]}a!==o?.index&&(s=Y.nextNode(),a++)}return Y.currentNode=D,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),P(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new Q(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new te(this.O(T()),this.O(T()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,r){const s=this.strings;let a=!1;if(void 0===s)e=X(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==G,a&&(this._$AH=e);else{const r=e;let n,o;for(e=s[0],n=0;n<s.length-1;n++)o=X(this,r[i+n],t,n),o===G&&(o=this._$AH[n]),a||=!P(o)||o!==this._$AH[n],o===q?e=q:e!==q&&(e+=(o??"")+s[n+1]),this._$AH[n]=o}a&&!r&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ae extends ie{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===G)return;const i=this._$AH,r=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(Q,te),(x.litHtmlVersions??=[]).push("3.3.2");const de=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ce extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new te(t.insertBefore(T(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}ce._$litElement$=!0,ce.finalized=!0,de.litElementHydrateSupport?.({LitElement:ce});const le=de.litElementPolyfillSupport;le?.({LitElement:ce}),(de.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ue=(e=pe,t,i)=>{const{kind:r,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return me({...e,state:!0,attribute:!1})}const fe={entity_mode:"auto",show_temperature:!0,show_humidity:!0,show_pressure:!0,show_wind:!0,show_rain:!0,show_uv:!0,show_solar:!0,display_mode:"normal",data_view:"live",history_period:"day",show_wind_arrows:!0,enable_warnings:!1,show_trends:!0,show_sparklines:!0,show_forecast:!1,show_min_max:!0,trend_period:"1h",hero_metric:"auto",show_weather_condition:!0,color_theme:"auto",use_time_based_theme:!0,enable_animations:!0,grid_layout:"auto",card_style:"glass",warnings:{wind_speed:{enabled:!1,threshold:50,message:"⚠️ High wind speed! Consider closing shades and securing outdoor items."},temperature:{enabled:!1,high_threshold:35,low_threshold:0,message_high:"🌡️ High temperature! Stay hydrated and avoid direct sunlight.",message_low:"❄️ Low temperature! Watch for frost and freezing conditions."},uv:{enabled:!1,threshold:8,message:"☀️ Very high UV index! Use sun protection and limit outdoor exposure."},rain_rate:{enabled:!1,threshold:10,message:"🌧️ Heavy rain! Check for flooding and secure outdoor items."}}},_e=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],we=[{max:2,label:"Low",color:"#289500"},{max:5,label:"Moderate",color:"#F7E400"},{max:7,label:"High",color:"#F85900"},{max:10,label:"Very High",color:"#D8001D"},{max:1/0,label:"Extreme",color:"#6B49C8"}],ve={temperature:["temperature","temp","outdoor_temp","temperatur","aussentemperatur","außentemperatur"],humidity:["humidity","humid","feuchtigkeit","luftfeuchtigkeit"],pressure:["pressure","absolute_pressure","relative_pressure","druck","luftdruck"],wind_speed:["wind_speed","windspeed","geschwindigkeit","windgeschwindigkeit"],wind_direction:["wind_direction","wind_bearing","winddirection","richtung","windrichtung"],wind_gust:["gust","wind_gust","gust_speed","geschwindigkeit_2","boe","windböe","windboe"],rain:["rain_total","daily_rain","rain","regen","niederschlag","regenmenge"],rain_rate:["rain_rate","rainrate","rain_piezo","regenrate","niederschlagsrate"],moisture:["moisture","wetness","feuchte","nass","trocken","regen_sensor","rain_sensor"],dew_point:["dew_point","dewpoint","taupunkt","dew"],uv_index:["uv_index","uvi","uv"],solar_radiation:["solar_radiation","solar","light","solarstrahlung","sonnenstrahlung","beleuchtungsstarke","beleuchtungsstärke","licht"]},ye={temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",wind_speed:"Wind Speed",wind_direction:"Wind Direction",wind_gust:"Wind Gust",rain:"Rain",rain_rate:"Rain Rate",moisture:"Moisture (Wetness)",dew_point:"Dew Point",uv_index:"UV Index",solar_radiation:"Solar Radiation"},be={temperature:"🌡️",humidity:"💧",pressure:"📊",wind_speed:"💨",wind_direction:"🧭",wind_gust:"🌬️",rain:"🌧️",rain_rate:"⛈️",uv_index:"☀️",solar_radiation:"🌤️",feels_like:"🤒",dew_point:"💦"},$e={sunny:"☀️","partly-cloudy":"⛅",cloudy:"☁️",rainy:"🌧️",stormy:"⛈️",windy:"💨","clear-night":"🌙",unknown:"🌤️"},xe={temperature:{significant:2,major:5},humidity:{significant:10,major:20},pressure:{significant:3,major:8},wind_speed:{significant:10,major:25},rain:{significant:1,major:5},uv_index:{significant:2,major:4}},ke={temperature:{min:-10,max:40,unit:"°C"},humidity:{min:0,max:100,unit:"%"},pressure:{min:970,max:1050,unit:"hPa"},wind_speed:{min:0,max:100,unit:"km/h"},rain:{min:0,max:50,unit:"mm"},uv_index:{min:0,max:11,unit:""},solar_radiation:{min:0,max:1200,unit:"W/m²"}},Ce=30,Ae=2,Me=3;function Se(e,t="°C"){return`${Math.round(10*e)/10}${t}`}function Ee(e,t="km/h"){return`${Math.round(10*e)/10} ${t}`}function He(e,t="mm"){return`${Math.round(100*e)/100} ${t}`}function De(e){return e*Math.PI/180}function Te(e,t,i,r="1h"){if(0===t.length)return{direction:"stable",percentChange:0,absoluteChange:0,timeframe:r,previousValue:e};const s=t[0].value,a=e-s,n=0!==s?a/s*100:0,o=xe[i];let d="stable";return Math.abs(a)>=o.significant&&(d=a>0?"up":"down"),{direction:d,percentChange:Math.round(10*n)/10,absoluteChange:Math.round(10*a)/10,timeframe:r,previousValue:s}}function Pe(e,t){const i=xe[e];return Math.abs(t)>=i.major}function Oe(e=new Date){const t=e.getHours();return t>=5&&t<8?"dawn":t>=8&&t<18?"day":t>=18&&t<21?"dusk":"night"}function ze(e){const t="night"===Oe();if(void 0!==e.rain_rate&&e.rain_rate>0)return void 0!==e.wind_speed&&e.wind_speed>50?"stormy":"rainy";if(void 0!==e.wind_speed&&e.wind_speed>40)return"windy";if(void 0!==e.solar_radiation){const i=function(e){if(e<6||e>20)return 0;const t=Math.abs(e-12);return Math.max(0,1e3*(1-t/8))}((new Date).getHours()),r=i>0?e.solar_radiation/i:1;return r>.7?t?"clear-night":"sunny":r>.3?"partly-cloudy":"cloudy"}return t?"clear-night":"sunny"}function We(e,t){switch(t){case"temperature":case"feels_like":case"dew_point":return Se(e);case"humidity":return`${Math.round(e)}%`;case"pressure":return function(e,t="hPa"){return`${Math.round(e)} ${t}`}(e);case"wind_speed":case"wind_gust":return Ee(e);case"rain":case"rain_rate":return He(e);case"uv_index":default:return""+Math.round(10*e)/10;case"solar_radiation":return`${Math.round(e)} W/m²`}}let Le=class extends ce{constructor(){super(...arguments),this.windDirection=0,this.windSpeed=0,this.showArrows=!0,this.compact=!1,this.animate=!0}render(){const e=this.compact?80:120,t=e/2,i=e/2-8;return I`
      <div class="compass-container ${this.compact?"compact":""}">
        <svg 
          width="${e}" 
          height="${e}" 
          viewBox="0 0 ${e} ${e}" 
          class="compass-svg"
        >
          <!-- Background glow -->
          <defs>
            <radialGradient id="compass-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
              <stop offset="100%" stop-color="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id="arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
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
          <circle 
            cx="${t}" 
            cy="${t}" 
            r="${i}" 
            class="compass-ring"
          />

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
    `}renderTickMarks(e,t){const i=[];for(let r=0;r<16;r++){const s=De(22.5*r-90),a=r%4==0,n=t-2,o=n-(a?8:4),d=e+n*Math.cos(s),c=e+n*Math.sin(s),l=e+o*Math.cos(s),h=e+o*Math.sin(s);i.push({x1:d,y1:c,x2:l,y2:h,isCardinal:a})}return I`
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
        ${["N","E","S","W"].map((t,s)=>{const a=De(i[s]-90),n=e+r*Math.cos(a),o=e+r*Math.sin(a);return I`
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
    `}renderWindArrow(e,t,i,r){const s=De(i-90),a=e+t*Math.cos(s),n=e+t*Math.sin(s),o="current"===r?10:7,d=De(i-90+145),c=De(i-90-145),l=a+o*Math.cos(d),h=n+o*Math.sin(d),p=a+o*Math.cos(c),u=n+o*Math.sin(c);return this.animate,"current"===r?I`
        <g class="wind-arrow current" filter="url(#arrow-glow)">
          <line 
            x1="${e}" 
            y1="${e}" 
            x2="${a}" 
            y2="${n}" 
            class="arrow-line"
          />
          <polygon
            points="${a},${n} ${l},${h} ${p},${u}"
            class="arrow-head"
          />
        </g>
      `:I`
      <g class="wind-arrow average">
        <line 
          x1="${e}" 
          y1="${e}" 
          x2="${a}" 
          y2="${n}" 
          class="arrow-line"
        />
        <polygon
          points="${a},${n} ${l},${h} ${p},${u}"
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
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
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

      /* Animation for arrow */
      @keyframes pulse {
        0%, 100% {
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
        }
        50% {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
        }
      }

      .wind-arrow.current {
        animation: pulse 2s ease-in-out infinite;
      }
    `}};var Ne,Ve;e([me({type:Number})],Le.prototype,"windDirection",void 0),e([me({type:Number})],Le.prototype,"windSpeed",void 0),e([me({type:Number})],Le.prototype,"windDirectionAvg",void 0),e([me({type:Boolean})],Le.prototype,"showArrows",void 0),e([me({type:Boolean})],Le.prototype,"compact",void 0),e([me({type:Boolean})],Le.prototype,"animate",void 0),Le=e([he("wind-compass")],Le),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ne||(Ne={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ve||(Ve={}));var je=function(e,t,i,r){r=r||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return s.detail=i,e.dispatchEvent(s),s};const Ue=[{name:"entity_mode",selector:{select:{options:[{value:"auto",label:"Auto (Use Device)"},{value:"manual",label:"Manual (Select Individual Entities)"}],mode:"dropdown"}}}],Re=[{name:"device_id",selector:{device:{}}}],Fe=[{name:"name",selector:{text:{}}}],Ie=[{name:"display_mode",selector:{select:{options:[{value:"normal",label:"Normal - Full layout with all details"},{value:"compact",label:"Compact - Space-efficient grid"},{value:"hero",label:"Hero - Featured metric with large display"},{value:"minimal",label:"Minimal - Single line summary"}],mode:"dropdown"}}}],Be=[{name:"card_style",selector:{select:{options:[{value:"glass",label:"Glass - Modern glassmorphism with gradients"},{value:"solid",label:"Solid - Traditional card background"},{value:"minimal",label:"Minimal - Transparent, no background"}],mode:"dropdown"}}}],Ge=[{name:"data_view",selector:{select:{options:[{value:"live",label:"Live Data"},{value:"history",label:"Historical Data"}],mode:"dropdown"}}}],qe=[{name:"history_period",selector:{select:{options:[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"year",label:"Year"}],mode:"dropdown"}}}],Je=[{name:"trend_period",selector:{select:{options:[{value:"1h",label:"1 Hour"},{value:"3h",label:"3 Hours"},{value:"6h",label:"6 Hours"},{value:"12h",label:"12 Hours"},{value:"24h",label:"24 Hours"}],mode:"dropdown"}}}],Ye=[{name:"hero_metric",selector:{select:{options:[{value:"auto",label:"Auto - Select most significant"},{value:"temperature",label:"Temperature"}],mode:"dropdown"}}}],Ze=[{name:"show_temperature",selector:{boolean:{}}},{name:"show_humidity",selector:{boolean:{}}},{name:"show_pressure",selector:{boolean:{}}},{name:"show_wind",selector:{boolean:{}}},{name:"show_wind_arrows",selector:{boolean:{}}},{name:"show_rain",selector:{boolean:{}}},{name:"show_uv",selector:{boolean:{}}},{name:"show_solar",selector:{boolean:{}}}],Ke=[{name:"show_trends",selector:{boolean:{}}},{name:"show_sparklines",selector:{boolean:{}}},{name:"show_min_max",selector:{boolean:{}}},{name:"show_weather_condition",selector:{boolean:{}}}],Qe=[{name:"enable_animations",selector:{boolean:{}}}],Xe=[{name:"enable_warnings",selector:{boolean:{}}}],et=Object.keys(ye).map(e=>({name:`entities_${e}`,selector:{entity:{domain:"sensor"}}}));let tt=class extends ce{constructor(){super(...arguments),this._activeTab="data",this._computeLabel=e=>({device_id:"Weather Station Device",name:"Card Name",entity_mode:"Entity Mode",display_mode:"Display Mode",card_style:"Card Style",data_view:"Default View",history_period:"History Period",trend_period:"Trend Comparison Period",hero_metric:"Hero Metric (for Hero mode)",show_temperature:"Show Temperature",show_humidity:"Show Humidity",show_pressure:"Show Pressure",show_wind:"Show Wind",show_wind_arrows:"Show Wind Compass",show_rain:"Show Rain",show_uv:"Show UV Index",show_solar:"Show Solar Radiation",show_trends:"Show Trend Indicators",show_sparklines:"Show Mini Charts (Sparklines)",show_min_max:"Show Min/Max Values",show_weather_condition:"Show Weather Condition",enable_animations:"Enable Animations",enable_warnings:"Enable Weather Warnings",...Object.fromEntries(Object.entries(ye).map(([e,t])=>[`entities_${e}`,t]))}[e.name]||e.name)}setConfig(e){this._config=e}connectedCallback(){super.connectedCallback(),this._loadHaForm()}async _loadHaForm(){if(customElements.get("ha-form"))return;const e=await(window.loadCardHelpers?.());if(!e)return;const t=await e.createCardElement({type:"entity",entity:"sun.sun"});t&&await(t.getConfigElement?.())}_getFormData(){const e={entity_mode:this._config.entity_mode||"auto",device_id:this._config.device_id||"",name:this._config.name||"",display_mode:this._config.display_mode||"normal",card_style:this._config.card_style||"glass",data_view:this._config.data_view||"live",history_period:this._config.history_period||"day",trend_period:this._config.trend_period||"1h",hero_metric:this._config.hero_metric||"auto",show_temperature:!1!==this._config.show_temperature,show_humidity:!1!==this._config.show_humidity,show_pressure:!1!==this._config.show_pressure,show_wind:!1!==this._config.show_wind,show_wind_arrows:!1!==this._config.show_wind_arrows,show_rain:!1!==this._config.show_rain,show_uv:!1!==this._config.show_uv,show_solar:!1!==this._config.show_solar,show_trends:!1!==this._config.show_trends,show_sparklines:!1!==this._config.show_sparklines,show_min_max:!1!==this._config.show_min_max,show_weather_condition:!1!==this._config.show_weather_condition,enable_animations:!1!==this._config.enable_animations,enable_warnings:this._config.enable_warnings||!1};return this._config.entities&&Object.entries(this._config.entities).forEach(([t,i])=>{e[`entities_${t}`]=i||""}),e}render(){return this.hass&&this._config?I`
      <div class="card-config">
        ${this.renderTabs()}
        <div class="tab-content">
          ${"data"===this._activeTab?this.renderDataTab():""}
          ${"appearance"===this._activeTab?this.renderAppearanceTab():""}
          ${"features"===this._activeTab?this.renderFeaturesTab():""}
          ${"warnings"===this._activeTab?this.renderWarningsTab():""}
        </div>
      </div>
    `:I``}renderTabs(){return I`
      <div class="tabs">
        ${[{id:"data",label:"📊 Data",icon:"📊"},{id:"appearance",label:"🎨 Appearance",icon:"🎨"},{id:"features",label:"⚡ Features",icon:"⚡"},{id:"warnings",label:"⚠️ Warnings",icon:"⚠️"}].map(e=>I`
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
        <h3>🔌 Data Source</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ue}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        ${"auto"===t?I`
              <div class="info-box">
                <span class="info-icon">💡</span>
                <span>Select your weather station device and sensors will be auto-discovered.</span>
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Re}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
              ${this._config.device_id?this.renderAutoAssignments():q}
            `:I`
              <div class="info-box">
                <span class="info-icon">⚙️</span>
                <span>Manually select individual sensor entities for each measurement.</span>
              </div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${et}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `}
      </div>

      <div class="section">
        <h3>📝 General</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Fe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>👁️ Visible Sensors</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ze}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>
    `}renderAppearanceTab(){const e=this._getFormData();return I`
      <div class="section">
        <h3>🖼️ Display Mode</h3>
        <div class="mode-preview">
          ${this.renderModePreview()}
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ie}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        
        ${"hero"===this._config.display_mode?I`
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Ye}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:q}
      </div>

      <div class="section">
        <h3>🎨 Card Style</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Be}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>

      <div class="section">
        <h3>✨ Animations</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Qe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
      </div>
    `}renderModePreview(){const e=this._config.display_mode||"normal",t={normal:I`
        <div class="preview-card">
          <div class="preview-header">Weather Station</div>
          <div class="preview-grid">
            <div class="preview-metric">🌡️ 22°C</div>
            <div class="preview-metric">💧 65%</div>
            <div class="preview-metric">💨 15 km/h</div>
            <div class="preview-metric">🌧️ 0 mm</div>
          </div>
        </div>
      `,compact:I`
        <div class="preview-card compact">
          <div class="preview-row">
            <span>🌡️ 22°C</span>
            <span>💧 65%</span>
            <span>💨 15</span>
          </div>
        </div>
      `,hero:I`
        <div class="preview-card hero">
          <div class="preview-hero-value">22°C</div>
          <div class="preview-hero-sub">↑ +2° / 1h</div>
        </div>
      `,minimal:I`
        <div class="preview-card minimal">
          <span>🌡️ 22°C</span>
          <span>💧 65%</span>
        </div>
      `};return t[e]||t.normal}renderFeaturesTab(){const e=this._getFormData();return I`
      <div class="section">
        <h3>📈 Trends & History</h3>
        <div class="info-box">
          <span class="info-icon">📊</span>
          <span>Trends show how values have changed. Sparklines display mini charts of recent history.</span>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ke}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        
        ${!1!==this._config.show_trends?I`
              <h4>Trend Comparison Period</h4>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Je}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:q}
      </div>

      <div class="section">
        <h3>📅 Default View</h3>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Ge}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${"history"===this._config.data_view?I`
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${qe}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._formValueChanged}
              ></ha-form>
            `:q}
      </div>
    `}renderWarningsTab(){const e=this._getFormData();return I`
      <div class="section">
        <h3>⚠️ Weather Warnings</h3>
        <div class="info-box warning">
          <span class="info-icon">🔔</span>
          <span>Get alerted when weather conditions exceed thresholds you set.</span>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${Xe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formValueChanged}
        ></ha-form>
        ${this._config.enable_warnings?this.renderWarningSettings():q}
      </div>
    `}renderWarningSettings(){const e={wind_speed:[{name:"warnings_wind_speed_enabled",selector:{boolean:{}}},{name:"warnings_wind_speed_threshold",selector:{number:{min:0,unit_of_measurement:"km/h"}}},{name:"warnings_wind_speed_message",selector:{text:{}}}],temperature:[{name:"warnings_temperature_enabled",selector:{boolean:{}}},{name:"warnings_temperature_high_threshold",selector:{number:{unit_of_measurement:"°C"}}},{name:"warnings_temperature_low_threshold",selector:{number:{unit_of_measurement:"°C"}}},{name:"warnings_temperature_message_high",selector:{text:{}}},{name:"warnings_temperature_message_low",selector:{text:{}}}],uv:[{name:"warnings_uv_enabled",selector:{boolean:{}}},{name:"warnings_uv_threshold",selector:{number:{min:0,max:15}}},{name:"warnings_uv_message",selector:{text:{}}}],rain_rate:[{name:"warnings_rain_rate_enabled",selector:{boolean:{}}},{name:"warnings_rain_rate_threshold",selector:{number:{min:0,unit_of_measurement:"mm/h"}}},{name:"warnings_rain_rate_message",selector:{text:{}}}]},t={warnings_wind_speed_enabled:"Enable Wind Speed Warning",warnings_wind_speed_threshold:"Threshold (km/h)",warnings_wind_speed_message:"Warning Message",warnings_temperature_enabled:"Enable Temperature Warning",warnings_temperature_high_threshold:"High Threshold (°C)",warnings_temperature_low_threshold:"Low Threshold (°C)",warnings_temperature_message_high:"High Temperature Message",warnings_temperature_message_low:"Low Temperature Message",warnings_uv_enabled:"Enable UV Warning",warnings_uv_threshold:"Threshold",warnings_uv_message:"Warning Message",warnings_rain_rate_enabled:"Enable Rain Rate Warning",warnings_rain_rate_threshold:"Threshold (mm/h)",warnings_rain_rate_message:"Warning Message"},i={warnings_wind_speed_enabled:this._config.warnings?.wind_speed?.enabled||!1,warnings_wind_speed_threshold:this._config.warnings?.wind_speed?.threshold||50,warnings_wind_speed_message:this._config.warnings?.wind_speed?.message||"",warnings_temperature_enabled:this._config.warnings?.temperature?.enabled||!1,warnings_temperature_high_threshold:this._config.warnings?.temperature?.high_threshold||35,warnings_temperature_low_threshold:this._config.warnings?.temperature?.low_threshold||0,warnings_temperature_message_high:this._config.warnings?.temperature?.message_high||"",warnings_temperature_message_low:this._config.warnings?.temperature?.message_low||"",warnings_uv_enabled:this._config.warnings?.uv?.enabled||!1,warnings_uv_threshold:this._config.warnings?.uv?.threshold||8,warnings_uv_message:this._config.warnings?.uv?.message||"",warnings_rain_rate_enabled:this._config.warnings?.rain_rate?.enabled||!1,warnings_rain_rate_threshold:this._config.warnings?.rain_rate?.threshold||10,warnings_rain_rate_message:this._config.warnings?.rain_rate?.message||""},r=e=>t[e.name]||e.name;return I`
      <div class="warning-settings">
        <div class="warning-category">
          <h4>💨 Wind Speed</h4>
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
              `:q}
        </div>

        <div class="warning-category">
          <h4>🌡️ Temperature</h4>
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
              `:q}
        </div>

        <div class="warning-category">
          <h4>☀️ UV Index</h4>
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
              `:q}
        </div>

        <div class="warning-category">
          <h4>🌧️ Rain Rate</h4>
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
              `:q}
        </div>
      </div>
    `}_formValueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));Object.entries(t).forEach(([e,t])=>{if(e.startsWith("entities_")){const r=e.replace("entities_","");i.entities||(i.entities={}),t?i.entities[r]=t:delete i.entities[r]}else i[e]=t}),i.entities&&0===Object.keys(i.entities).length&&delete i.entities,this._config=i,je(this,"config-changed",{config:this._config})}_warningFormValueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));i.warnings||(i.warnings={}),Object.entries(t).forEach(([e,t])=>{const r=e.replace("warnings_","").split("_");let s,a;"rain"===r[0]&&"rate"===r[1]?(s="rain_rate",a=r.slice(2).join("_")):"wind"===r[0]&&"speed"===r[1]?(s="wind_speed",a=r.slice(2).join("_")):(s=r[0],a=r.slice(1).join("_")),i.warnings[s]||(i.warnings[s]={}),i.warnings[s][a]=t}),this._config=i,je(this,"config-changed",{config:this._config})}resolveAutoEntities(e){const t={},i=this.hass.entities||{};Object.values(this.hass.states).forEach(r=>{const s=r.entity_id,a=Object.values(i).find(e=>e.entity_id===s);if(a?.device_id===e){const e=s.split(".")[1].toLowerCase();t[e]=s}});const r={};for(const[e,i]of Object.entries(ve)){r[e]=void 0;for(const s of i){let i=!1;for(const[a,n]of Object.entries(t))if(a.includes(s)){r[e]=n,i=!0;break}if(i)break}}return r}renderAutoAssignments(){if(!this._config.device_id)return I``;const e=this.resolveAutoEntities(this._config.device_id),t=this._config.entities||{};return I`
      <div class="auto-assignments">
        <div class="auto-assignments-header">
          <span>🔗 Entity Assignments</span>
          <span class="assignment-count">
            ${Object.values(e).filter(e=>e).length} found
          </span>
        </div>
        
        ${Object.entries(ye).map(([i,r])=>{const s=e[i],a=t[i],n=a||s||"",o=!!a,d=!n;return I`
            <div class="assignment-row ${d?"not-found":""} ${o?"overridden":""}">
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
                  `:q}
            </div>
          `})}
      </div>
    `}_clearOverride(e){const t=JSON.parse(JSON.stringify(this._config));t.entities&&(delete t.entities[e],0===Object.keys(t.entities).length&&delete t.entities),this._config=t,je(this,"config-changed",{config:this._config})}static get styles(){return n`
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
      }

      .preview-card.compact {
        padding: 12px;
      }

      .preview-row {
        display: flex;
        justify-content: space-around;
        font-size: 13px;
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
    `}};e([me({attribute:!1})],tt.prototype,"hass",void 0),e([ge()],tt.prototype,"_config",void 0),e([ge()],tt.prototype,"_activeTab",void 0),tt=e([he("weatherstation-card-editor")],tt);let it=class extends ce{constructor(){super(...arguments),this.data=[],this.metric="temperature",this.width=80,this.height=Ce,this.color="var(--primary-color, #03a9f4)",this.showGradient=!0,this.showDot=!0,this.showMinMax=!1,this.enableAnimation=!0}render(){if(this.data.length<2)return I`<div class="no-data">—</div>`;const{path:e,min:t,max:i,points:r}=function(e,t,i,r=4){if(e.length<2)return{path:"",min:0,max:0,points:[]};const s=e.map(e=>e.value),a=Math.min(...s),n=Math.max(...s),o=n-a||1,d=t-2*r,c=i-2*r,l=e.map((t,i)=>({x:r+i/(e.length-1)*d,y:r+c-(t.value-a)/o*c,value:t.value})),h=l.map((e,t)=>`${0===t?"M":"L"} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`).join(" ");return{path:h,min:a,max:n,points:l}}(this.data,this.width,this.height,4),s=r[r.length-1],a=`gradient-${Math.random().toString(36).substr(2,9)}`,n=r.length>0?`${e} L ${r[r.length-1].x} ${this.height} L ${r[0].x} ${this.height} Z`:"";return I`
      <div class="sparkline-container">
        <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          class="sparkline-svg ${this.enableAnimation?"animate":""}"
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
                  d="${n}"
                  fill="url(#${a})"
                  class="area-fill"
                />
              `:""}

          <!-- Main line -->
          <path
            d="${e}"
            fill="none"
            stroke="${this.color}"
            stroke-width="${Ae}"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="sparkline-path"
          />

          <!-- End dot -->
          ${this.showDot&&s?B`
                <circle
                  cx="${s.x}"
                  cy="${s.y}"
                  r="${Me}"
                  fill="${this.color}"
                  class="end-dot"
                />
              `:""}
        </svg>

        ${this.showMinMax?I`
              <div class="min-max">
                <span class="min">${We(t,this.metric)}</span>
                <span class="max">${We(i,this.metric)}</span>
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
    `}};e([me({type:Array})],it.prototype,"data",void 0),e([me({type:String})],it.prototype,"metric",void 0),e([me({type:Number})],it.prototype,"width",void 0),e([me({type:Number})],it.prototype,"height",void 0),e([me({type:String})],it.prototype,"color",void 0),e([me({type:Boolean})],it.prototype,"showGradient",void 0),e([me({type:Boolean})],it.prototype,"showDot",void 0),e([me({type:Boolean})],it.prototype,"showMinMax",void 0),e([me({type:Boolean})],it.prototype,"enableAnimation",void 0),it=e([he("weather-sparkline")],it);let rt=class extends ce{constructor(){super(...arguments),this.metric="temperature",this.showValue=!0,this.compact=!1,this.pulse=!1}render(){if(!this.trend||"stable"===this.trend.direction)return I`
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
        animation: pulse 2s infinite;
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
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      @keyframes bounceDown {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(3px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.02);
        }
      }
    `}};e([me({type:Object})],rt.prototype,"trend",void 0),e([me({type:String})],rt.prototype,"metric",void 0),e([me({type:Boolean})],rt.prototype,"showValue",void 0),e([me({type:Boolean})],rt.prototype,"compact",void 0),e([me({type:Boolean})],rt.prototype,"pulse",void 0),rt=e([he("trend-indicator")],rt),console.info("%c WEATHERSTATION-CARD %c 2.0.0 ","color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-weight: 700; padding: 4px 8px; border-radius: 4px;","color: #764ba2; background: white; font-weight: 700; padding: 4px 8px; border-radius: 4px;"),window.customCards=window.customCards||[],window.customCards.push({type:"weatherstation-card",name:"Weather Station Card",description:"A modern, sleek card for displaying weather station data with trends and history"});let st=class extends ce{constructor(){super(...arguments),this.currentDataView="live",this.currentHistoryPeriod="day",this.expandedMetric=null,this.historyData=new Map,this.trends=new Map,this.lastHistoryFetch=0}static getConfigElement(){return document.createElement("weatherstation-card-editor")}static getStubConfig(){return{type:"custom:weatherstation-card",entity:"",name:"Weather Station",...fe}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={...fe,...e},this.currentDataView=this.config.data_view||"live",this.currentHistoryPeriod=this.config.history_period||"day"}getCardSize(){switch(this.config.display_mode){case"compact":case"minimal":return 2;case"hero":return 4;default:return 5}}connectedCallback(){super.connectedCallback(),this.fetchHistoryData()}async fetchHistoryData(){if(!this.hass||!this.config)return;const e=Date.now();if(e-this.lastHistoryFetch<6e4)return;this.lastHistoryFetch=e;const t=this.getEntityIds(),i=new Date,r=this.getHistoryHours(),s=new Date(i.getTime()-60*r*60*1e3);for(const[e,r]of Object.entries(t))if(r)try{const t=await this.hass.callApi("GET",`history/period/${s.toISOString()}?filter_entity_id=${r}&end_time=${i.toISOString()}&minimal_response`);if(t&&t[0]){const r=t[0].filter(e=>!isNaN(parseFloat(e.state))).map(e=>({timestamp:new Date(e.last_changed).getTime(),value:parseFloat(e.state)}));if(r.length>0){const t=this.samplePoints(r,50);this.historyData.set(e,t);const s=r[r.length-1].value,a=this.getTrendPeriodHours(),n=i.getTime()-60*a*60*1e3,o=r.filter(e=>e.timestamp>=n);if(o.length>1){const t=Te(s,o.slice(0,-1),e,this.config.trend_period||"1h");this.trends.set(e,t)}}}}catch(e){console.warn(`Failed to fetch history for ${r}:`,e)}this.requestUpdate()}getHistoryHours(){switch(this.currentHistoryPeriod){case"week":return 168;case"month":return 720;case"year":return 8760;default:return 24}}getTrendPeriodHours(){switch(this.config.trend_period){case"3h":return 3;case"6h":return 6;case"12h":return 12;case"24h":return 24;default:return 1}}samplePoints(e,t){if(e.length<=t)return e;const i=Math.ceil(e.length/t);return e.filter((t,r)=>r%i===0||r===e.length-1)}getEntityIds(){const e={};if("manual"===this.config.entity_mode&&this.config.entities)return this.config.entities;if(this.config.device_id){const t=this.hass.entities||{};Object.values(this.hass.states).forEach(i=>{const r=i.entity_id,s=Object.values(t).find(e=>e.entity_id===r);if(s?.device_id===this.config.device_id){const t=r.split(".")[1].toLowerCase();for(const[i,s]of Object.entries(ve))for(const a of s)if(t.includes(a)&&!e[i]){e[i]=r;break}}})}return e}getWeatherData(){if(!this.hass)return null;return"manual"===(this.config.entity_mode||"auto")&&this.config.entities?this.getDataFromIndividualEntities():this.config.device_id?this.getDataFromDevice():this.getDataFromWeatherEntity()}getDataFromDevice(){if(!this.config.device_id)return null;const e={},t=this.hass.entities||{};Object.values(this.hass.states).forEach(i=>{const r=i.entity_id,s=Object.values(t).find(e=>e.entity_id===r);if(s?.device_id===this.config.device_id){const t=r.split(".")[1].toLowerCase();e[t]=r}});const i=this.config.entities||{},r=(t,i)=>{if(i){const e=this.hass.states[i];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}for(const i of t)for(const[t,r]of Object.entries(e))if(t.includes(i)){const e=this.hass.states[r];if(e){const t=parseFloat(e.state);if(!isNaN(t))return t}}};return{temperature:r(ve.temperature,i.temperature),humidity:r(ve.humidity,i.humidity),pressure:r(ve.pressure,i.pressure),wind_speed:r(ve.wind_speed,i.wind_speed),wind_direction:r(ve.wind_direction,i.wind_direction),wind_gust:r(ve.wind_gust,i.wind_gust),rain:r(ve.rain,i.rain),rain_rate:r(ve.rain_rate,i.rain_rate),uv_index:r(ve.uv_index,i.uv_index),solar_radiation:r(ve.solar_radiation,i.solar_radiation)}}getDataFromWeatherEntity(){if(!this.config.entity)return null;const e=this.hass.states[this.config.entity];return e?{temperature:e.attributes.temperature,humidity:e.attributes.humidity,pressure:e.attributes.pressure,wind_speed:e.attributes.wind_speed,wind_direction:e.attributes.wind_bearing,wind_gust:e.attributes.wind_gust_speed,wind_avg:e.attributes.wind_speed,wind_direction_avg:e.attributes.wind_bearing_avg,rain:e.attributes.precipitation,rain_rate:e.attributes.precipitation_rate,uv_index:e.attributes.uv_index,solar_radiation:e.attributes.solar_radiation,feels_like:e.attributes.feels_like,dew_point:e.attributes.dew_point}:null}getDataFromIndividualEntities(){if(!this.config.entities)return null;const e=e=>{if(!e)return;const t=this.hass.states[e];if(!t)return;const i=parseFloat(t.state);return isNaN(i)?void 0:i};return{temperature:e(this.config.entities.temperature),humidity:e(this.config.entities.humidity),pressure:e(this.config.entities.pressure),wind_speed:e(this.config.entities.wind_speed),wind_direction:e(this.config.entities.wind_direction),wind_gust:e(this.config.entities.wind_gust),rain:e(this.config.entities.rain),rain_rate:e(this.config.entities.rain_rate),uv_index:e(this.config.entities.uv_index),solar_radiation:e(this.config.entities.solar_radiation)}}getWarnings(){if(!this.config.enable_warnings)return[];const e=this.getWeatherData();return e?function(e,t){if(!t)return[];const i=[];return t.wind_speed?.enabled&&void 0!==e.wind_speed&&e.wind_speed>=t.wind_speed.threshold&&i.push({type:"wind",severity:e.wind_speed>=1.5*t.wind_speed.threshold?"high":"medium",message:t.wind_speed.message||`High wind speed: ${e.wind_speed} km/h`,icon:"💨"}),t.temperature?.enabled&&void 0!==e.temperature&&(void 0!==t.temperature.high_threshold&&e.temperature>=t.temperature.high_threshold&&i.push({type:"temperature",severity:e.temperature>=t.temperature.high_threshold+5?"high":"medium",message:t.temperature.message_high||`High temperature: ${e.temperature}°C`,icon:"🌡️"}),void 0!==t.temperature.low_threshold&&e.temperature<=t.temperature.low_threshold&&i.push({type:"temperature",severity:e.temperature<=t.temperature.low_threshold-5?"high":"medium",message:t.temperature.message_low||`Low temperature: ${e.temperature}°C`,icon:"❄️"})),t.uv?.enabled&&void 0!==e.uv_index&&e.uv_index>=t.uv.threshold&&i.push({type:"uv",severity:e.uv_index>=11?"high":"medium",message:t.uv.message||`High UV index: ${e.uv_index}`,icon:"☀️"}),t.rain_rate?.enabled&&void 0!==e.rain_rate&&e.rain_rate>=t.rain_rate.threshold&&i.push({type:"rain",severity:e.rain_rate>=2*t.rain_rate.threshold?"high":"medium",message:t.rain_rate.message||`Heavy rain: ${e.rain_rate} mm/h`,icon:"🌧️"}),i}(e,this.config.warnings):[]}render(){if(!this.hass||!this.config)return I``;const e=this.getWeatherData();if(!e)return this.renderError();const t=this.getWarnings(),i=Oe(),r=ze(e),s=this.config.card_style||"glass";return I`
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
          <div class="error-icon">⚠️</div>
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
        <div class="header-right">
          ${this.renderViewToggle()}
        </div>
      </div>
    `}renderViewToggle(){return I`
      <div class="view-toggle">
        <button
          class="toggle-btn ${"live"===this.currentDataView?"active":""}"
          @click=${()=>this.setDataView("live")}
          title="Live Data"
        >
          <span class="btn-icon">⚡</span>
        </button>
        <button
          class="toggle-btn ${"history"===this.currentDataView?"active":""}"
          @click=${()=>this.setDataView("history")}
          title="History"
        >
          <span class="btn-icon">📊</span>
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
    `}renderContent(e){if("history"===this.currentDataView)return this.renderHistoryView();switch(this.config.display_mode){case"hero":return this.renderHeroMode(e);case"compact":return this.renderCompactMode(e);case"minimal":return this.renderMinimalMode(e);default:return this.renderNormalMode(e)}}renderHeroMode(e){const t={};this.trends.forEach((e,i)=>t[i]=e);const i="auto"===this.config.hero_metric?function(e,t){const i=[{metric:"rain",check:()=>(e.rain_rate||0)>5},{metric:"wind_speed",check:()=>(e.wind_speed||0)>50},{metric:"uv_index",check:()=>(e.uv_index||0)>=8},{metric:"temperature",check:()=>!!t?.temperature&&Pe("temperature",t.temperature.absoluteChange)},{metric:"pressure",check:()=>!!t?.pressure&&Pe("pressure",t.pressure.absoluteChange)}];for(const{metric:e,check:t}of i)if(t())return e;return"temperature"}(e,t):"temperature",r=e[i],s=this.trends.get(i),a=this.historyData.get(i);return I`
      <div class="hero-layout">
        <div class="hero-main">
          <div class="hero-icon">${be[i]||"🌡️"}</div>
          <div class="hero-value">
            ${void 0!==r?We(r,i):"--"}
          </div>
          ${s&&!1!==this.config.show_trends?I`
                <trend-indicator
                  .trend=${s}
                  .metric=${i}
                  .pulse=${Pe(i,s.absoluteChange)}
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
        <div class="hero-secondary">
          ${this.renderSecondaryMetrics(e,i)}
        </div>
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
          <span class="minimal-icon">${be.temperature}</span>
          <span class="minimal-value">${Se(e.temperature||0)}</span>
          ${this.trends.get("temperature")?I`<trend-indicator .trend=${this.trends.get("temperature")} metric="temperature" compact></trend-indicator>`:""}
        </div>
        <div class="minimal-secondary">
          ${void 0!==e.humidity?I`<span class="minimal-stat">💧 ${e.humidity}%</span>`:""}
          ${void 0!==e.wind_speed?I`<span class="minimal-stat">💨 ${Ee(e.wind_speed)}</span>`:""}
        </div>
      </div>
    `}renderMetricCard(e,t,i,r){const s=this.trends.get(e),a=this.historyData.get(e),n=this.expandedMetric===e;return I`
      <div 
        class="metric-card ${n?"expanded":""}"
        @click=${()=>this.toggleExpanded(e)}
      >
        <div class="metric-header">
          <span class="metric-icon">${be[e]||"📊"}</span>
          <span class="metric-label">${this.getMetricLabel(e)}</span>
        </div>
        
        <div class="metric-body">
          <div class="metric-value-row">
            <span class="metric-value">${We(t,e)}</span>
            ${s&&!1!==this.config.show_trends?I`<trend-indicator .trend=${s} .metric=${e} compact></trend-indicator>`:""}
          </div>
          
          ${void 0!==i?I`<div class="metric-secondary">Feels like ${We(i,e)}</div>`:""}
          
          ${void 0!==r&&r>0?I`<div class="metric-secondary">Rate: ${He(r)}/h</div>`:""}
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
        <span class="min-value">↓ ${We(r,e)}</span>
        <span class="max-value">↑ ${We(s,e)}</span>
      </div>
    `}renderCompactMetric(e,t){const i=t[e];if(void 0===i)return I``;const r=this.trends.get(e);return I`
      <div class="compact-metric">
        <span class="compact-icon">${be[e]||"📊"}</span>
        <div class="compact-info">
          <span class="compact-value">${We(i,e)}</span>
          ${r&&!1!==this.config.show_trends?I`<trend-indicator .trend=${r} .metric=${e} compact .showValue=${!1}></trend-indicator>`:""}
        </div>
      </div>
    `}renderWindCard(e){const t=this.trends.get("wind_speed");return I`
      <div class="metric-card wind-card">
        <div class="metric-header">
          <span class="metric-icon">${be.wind_speed}</span>
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
              <span class="wind-speed-value">${Ee(e.wind_speed||0)}</span>
              ${t&&!1!==this.config.show_trends?I`<trend-indicator .trend=${t} metric="wind_speed" compact></trend-indicator>`:""}
            </div>
            ${e.wind_gust?I`<div class="wind-gust">Gust: ${Ee(e.wind_gust)}</div>`:""}
          </div>
        </div>
      </div>
    `}renderUVCard(e){const t=function(e){const t=we.find(t=>e<=t.max);return t||we[we.length-1]}(e),i=function(e,t){const i=ke[t];return(Math.max(i.min,Math.min(i.max,e))-i.min)/(i.max-i.min)*100}(e,"uv_index"),r=this.trends.get("uv_index");return I`
      <div class="metric-card uv-card">
        <div class="metric-header">
          <span class="metric-icon">${be.uv_index}</span>
          <span class="metric-label">UV Index</span>
        </div>
        
        <div class="metric-body">
          <div class="metric-value-row">
            <span class="metric-value">${e}</span>
            <span class="uv-badge" style="background-color: ${t.color}">${t.label}</span>
            ${r&&!1!==this.config.show_trends?I`<trend-indicator .trend=${r} metric="uv_index" compact></trend-indicator>`:""}
          </div>
          
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${i}%; background-color: ${t.color}"></div>
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
                <span class="metric-icon">${be[e]||"📊"}</span>
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
                  <span class="empty-icon">📊</span>
                  <span class="empty-text">Loading history data...</span>
                </div>
              `:""}
        </div>
      </div>
    `}getMetricLabel(e){return{temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",wind_speed:"Wind Speed",wind_direction:"Wind Direction",wind_gust:"Wind Gust",rain:"Rain",rain_rate:"Rain Rate",uv_index:"UV Index",solar_radiation:"Solar"}[e]||e}toggleExpanded(e){this.expandedMetric=this.expandedMetric===e?null:e}setDataView(e){this.currentDataView=e,"history"===e&&(this.lastHistoryFetch=0,this.fetchHistoryData())}setHistoryPeriod(e){this.currentHistoryPeriod=e,this.lastHistoryFetch=0,this.fetchHistoryData()}static get styles(){return n`
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
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
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

      .background-layer.day { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
      .background-layer.night { background: linear-gradient(135deg, #0c1445 0%, #1a237e 100%); }
      .background-layer.dawn { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }
      .background-layer.dusk { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }

      .gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%);
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

      .condition-icon { font-size: 1.4rem; }
      .condition-text { font-size: 0.85rem; }

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

      .toggle-btn:hover { opacity: 1; background: rgba(255, 255, 255, 0.15); }
      .toggle-btn.active { opacity: 1; background: rgba(255, 255, 255, 0.25); }
      .btn-icon { font-size: 1rem; }

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
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
      }

      .warning-pill.medium { border-left: 4px solid #ffc107; }
      .warning-pill.high { border-left: 4px solid #dc3545; animation: pulse 2s infinite; }

      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .warning-icon { font-size: 1.2rem; }
      .warning-text { font-size: 0.85rem; flex: 1; }

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
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 14px;
        cursor: pointer;
        transition: all var(--transition-speed);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .metric-card:hover {
        transform: translateY(-2px);
        background: rgba(0, 0, 0, 0.2);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      .metric-card.expanded { grid-column: span 2; }
      .metric-card.wind-card { grid-column: span 2; }

      .metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .metric-icon { font-size: 1.2rem; }

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

      .metric-sparkline { margin-top: 10px; }

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

      .min-value { color: #64b5f6; }
      .max-value { color: #ef5350; }

      /* Wind Card */
      .wind-content {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .wind-stats { flex: 1; }

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
        transition: all 0.2s;
      }

      .compact-metric:hover {
        background: rgba(0, 0, 0, 0.2);
      }

      .compact-icon { font-size: 1.1rem; }

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

      .hero-icon { font-size: 2.5rem; }

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

      .minimal-icon { font-size: 1.4rem; }

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

      .period-tab:hover { opacity: 1; background: rgba(255, 255, 255, 0.1); }
      .period-tab.active { opacity: 1; background: rgba(255, 255, 255, 0.2); font-weight: 600; }

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

      .empty-icon { font-size: 2.5rem; }
      .empty-text { font-size: 0.9rem; }

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

      .error-icon { font-size: 2.5rem; }
      .error-message { font-size: 1rem; font-weight: 600; color: var(--error-color, #db4437); }
      .error-hint { font-size: 0.85rem; color: var(--secondary-text-color, #666); }

      /* Responsive */
      @media (max-width: 600px) {
        .card-inner { padding: 16px; }
        .metrics-grid.normal { grid-template-columns: 1fr 1fr; }
        .metric-card.wind-card, .metric-card.expanded { grid-column: span 2; }
        .wind-content { flex-direction: column; text-align: center; }
        .hero-value { font-size: 2.8rem; }
        .card-header { flex-direction: column; gap: 12px; }
        .view-toggle { align-self: flex-start; }
      }

      @media (max-width: 400px) {
        .metrics-grid.normal { grid-template-columns: 1fr; }
        .metric-card.wind-card, .metric-card.expanded { grid-column: span 1; }
      }
    `}};e([me({attribute:!1})],st.prototype,"hass",void 0),e([ge()],st.prototype,"config",void 0),e([ge()],st.prototype,"currentDataView",void 0),e([ge()],st.prototype,"currentHistoryPeriod",void 0),e([ge()],st.prototype,"expandedMetric",void 0),e([ge()],st.prototype,"historyData",void 0),e([ge()],st.prototype,"trends",void 0),e([ge()],st.prototype,"lastHistoryFetch",void 0),st=e([he("weatherstation-card")],st);export{st as WeatherStationCard};
