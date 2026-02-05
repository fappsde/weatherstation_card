function t(t,e,i,r){var s,n=arguments.length,o=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(n<3?s(o):n>3?s(e,i,o):s(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,r)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,$=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!d(t,e),y={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=r;const n=s.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const n=this.constructor;if(!1===r&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??_)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[$("elementProperties")]=new Map,b[$("finalized")]=new Map,v?.({ReactiveElement:b}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,H=`<${k}>`,D=document,M=()=>D.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,W="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,I=/>/g,R=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),K=new WeakMap,F=D.createTreeWalker(D,129);function Y(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,r=[];let s,n=2===e?"<svg>":3===e?"<math>":"",o=O;for(let e=0;e<i;e++){const i=t[e];let a,d,c=-1,l=0;for(;l<i.length&&(o.lastIndex=l,d=o.exec(i),null!==d);)l=o.lastIndex,o===O?"!--"===d[1]?o=T:void 0!==d[1]?o=I:void 0!==d[2]?(j.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=R):void 0!==d[3]&&(o=R):o===R?">"===d[0]?(o=s??O,c=-1):void 0===d[1]?c=-2:(c=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?R:'"'===d[3]?V:z):o===V||o===z?o=R:o===T||o===I?o=O:(o=R,s=void 0);const h=o===R&&t[e+1].startsWith("/>")?" ":"";n+=o===O?i+H:c>=0?(r.push(a),i.slice(0,c)+C+i.slice(c)+P+h):i+P+(-2===c?e:h)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const o=t.length-1,a=this.parts,[d,c]=G(t,e);if(this.el=J.createElement(d,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=F.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=c[n++],i=r.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(P),e=t.length-1;if(e>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],M()),F.nextNode(),a.push({type:2,index:++s});r.append(t[e],M())}}}else if(8===r.nodeType)if(r.data===k)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(P,t+1));)a.push({type:7,index:s}),t+=P.length-1}s++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,r){if(e===B)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=N(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??D).importNode(e,!0);F.currentNode=r;let s=F.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(s=F.nextNode(),n++)}return F.currentNode=D,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),N(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(void 0===s)t=Z(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const r=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=Z(this,r[i+o],e,o),a===B&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends tt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===B)return;const i=this._$AH,r=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(J,X),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new X(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const dt=ot.litElementPolyfillSupport;dt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:_},ht=(t=lt,e,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}const gt={show_temperature:!0,show_humidity:!0,show_pressure:!0,show_wind:!0,show_rain:!0,show_uv:!0,show_solar:!0,display_mode:"normal",data_view:"live",history_period:"day",show_wind_arrows:!0,enable_warnings:!1,warnings:{wind_speed:{enabled:!1,threshold:50,message:"⚠️ High wind speed! Consider closing shades and securing outdoor items."},temperature:{enabled:!1,high_threshold:35,low_threshold:0,message_high:"🌡️ High temperature! Stay hydrated and avoid direct sunlight.",message_low:"❄️ Low temperature! Watch for frost and freezing conditions."},uv:{enabled:!1,threshold:8,message:"☀️ Very high UV index! Use sun protection and limit outdoor exposure."},rain_rate:{enabled:!1,threshold:10,message:"🌧️ Heavy rain! Check for flooding and secure outdoor items."}}},mt=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],ft=[{max:2,label:"Low",color:"#289500"},{max:5,label:"Moderate",color:"#F7E400"},{max:7,label:"High",color:"#F85900"},{max:10,label:"Very High",color:"#D8001D"},{max:1/0,label:"Extreme",color:"#6B49C8"}];function vt(t,e="°C"){return`${Math.round(10*t)/10}${e}`}function $t(t,e="km/h"){return`${Math.round(10*t)/10} ${e}`}function wt(t,e="mm"){return`${Math.round(100*t)/100} ${e}`}function _t(t){return t*Math.PI/180}let yt=class extends at{constructor(){super(...arguments),this.windDirection=0,this.windSpeed=0,this.showArrows=!0,this.compact=!1}render(){const t=this.compact?100:150,e=t/2,i=t/2-10;return L`
      <div class="compass-container">
        <svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" class="compass-svg">
          <!-- Outer circle -->
          <circle cx="${e}" cy="${e}" r="${i}" class="compass-circle" />

          <!-- Cardinal directions -->
          ${this.renderCardinalMarks(e,i)}

          <!-- Wind direction arrow (current) -->
          ${this.renderWindArrow(e,i,this.windDirection,"current")}

          <!-- Average wind direction arrow (if available) -->
          ${this.showArrows&&void 0!==this.windDirectionAvg?this.renderWindArrow(e,.85*i,this.windDirectionAvg,"average"):""}

          <!-- Center dot -->
          <circle cx="${e}" cy="${e}" r="3" class="center-dot" />
        </svg>

        <div class="compass-info">
          <div class="direction-text">${function(t){const e=Math.round(t/22.5)%16;return mt[e]}(this.windDirection)}</div>
          <div class="degrees-text">${Math.round(this.windDirection)}°</div>
        </div>
      </div>
    `}renderCardinalMarks(t,e){const i=[0,90,180,270];return L`
      ${["N","E","S","W"].map((r,s)=>{const n=_t(i[s]-90),o=t+e*Math.cos(n),a=t+e*Math.sin(n);return L`
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
    `}renderWindArrow(t,e,i,r){const s=_t(i-90),n=t+e*Math.cos(s),o=t+e*Math.sin(s),a="current"===r?8:6,d=_t(i-90+150),c=_t(i-90-150),l=n+a*Math.cos(d),h=o+a*Math.sin(d),p=n+a*Math.cos(c),u=o+a*Math.sin(c);return L`
      <g class="wind-arrow ${r}">
        <line x1="${t}" y1="${t}" x2="${n}" y2="${o}" class="arrow-line" />
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
    `}};var bt,xt;t([pt({type:Number})],yt.prototype,"windDirection",void 0),t([pt({type:Number})],yt.prototype,"windSpeed",void 0),t([pt({type:Number})],yt.prototype,"windDirectionAvg",void 0),t([pt({type:Boolean})],yt.prototype,"showArrows",void 0),t([pt({type:Boolean})],yt.prototype,"compact",void 0),yt=t([ct("wind-compass")],yt),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(bt||(bt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(xt||(xt={}));let At=class extends at{setConfig(t){this._config=t}render(){return this.hass&&this._config?L`
      <div class="card-config">
        <h3>General Settings</h3>

        ${this.renderInput("Entity","entity","text",!0)}
        ${this.renderInput("Name","name","text",!1)}

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
    `:L``}renderWarningSettings(){return L`
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
    `}renderInput(t,e,i,r){const s=this.getNestedValue(this._config,e);return L`
      <div class="input-group">
        <label>
          ${t}${r?"*":""}
          <input
            type="${i}"
            .value=${s||""}
            .configKey=${e}
            @input=${this._valueChanged}
            ?required=${r}
          />
        </label>
      </div>
    `}renderSwitch(t,e){const i=this.getNestedValue(this._config,e);return L`
      <div class="switch-group">
        <label>
          <span>${t}</span>
          <input
            type="checkbox"
            .checked=${!1!==i}
            .configKey=${e}
            @change=${this._valueChanged}
          />
        </label>
      </div>
    `}renderSelect(t,e,i){const r=this.getNestedValue(this._config,e);return L`
      <div class="input-group">
        <label>
          ${t}
          <select .value=${r} .configKey=${e} @change=${this._valueChanged}>
            ${i.map(t=>L`
                <option value="${t.value}" ?selected=${r===t.value}>
                  ${t.label}
                </option>
              `)}
          </select>
        </label>
      </div>
    `}getNestedValue(t,e){return e.split(".").reduce((t,e)=>{if(t&&"object"==typeof t)return t[e]},t)}setNestedValue(t,e,i){const r=e.split("."),s=r.pop();return r.reduce((t,e)=>(t[e]||(t[e]={}),t[e]),t)[s]=i,t}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configKey;if(!i)return;let r;r="checkbox"===e.type?e.checked:"number"===e.type?parseFloat(e.value):e.value;const s={...this._config};this.setNestedValue(s,i,r),this._config=s,function(t,e,i,r){r=r||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});s.detail=i,t.dispatchEvent(s)}(this,"config-changed",{config:this._config})}static get styles(){return o`
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
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
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
    `}};t([pt({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),At=t([ct("weatherstation-card-editor")],At),console.info("%c WEATHERSTATION-CARD %c 1.0.0 ","color: white; background: #1976d2; font-weight: 700;","color: #1976d2; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"weatherstation-card",name:"Weather Station Card",description:"A card for displaying Ecowitt WS90 weather station data"});let St=class extends at{constructor(){super(...arguments),this.currentDataView="live",this.currentHistoryPeriod="day"}static getConfigElement(){return document.createElement("weatherstation-card-editor")}static getStubConfig(){return{type:"custom:weatherstation-card",entity:"",name:"Weather Station",...gt}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config={...gt,...t},this.currentDataView=this.config.data_view||"live",this.currentHistoryPeriod=this.config.history_period||"day"}getCardSize(){return"compact"===this.config.display_mode?3:5}getWeatherData(){if(!this.hass||!this.config.entity)return null;const t=this.hass.states[this.config.entity];return t?{temperature:t.attributes.temperature,humidity:t.attributes.humidity,pressure:t.attributes.pressure,wind_speed:t.attributes.wind_speed,wind_direction:t.attributes.wind_bearing,wind_gust:t.attributes.wind_gust_speed,wind_avg:t.attributes.wind_speed,wind_direction_avg:t.attributes.wind_bearing_avg,rain:t.attributes.precipitation,rain_rate:t.attributes.precipitation_rate,uv_index:t.attributes.uv_index,solar_radiation:t.attributes.solar_radiation,feels_like:t.attributes.feels_like,dew_point:t.attributes.dew_point}:null}getWarnings(){if(!this.config.enable_warnings)return[];const t=this.getWeatherData();return t?function(t,e){if(!e)return[];const i=[];return e.wind_speed?.enabled&&void 0!==t.wind_speed&&t.wind_speed>=e.wind_speed.threshold&&i.push({type:"wind",severity:t.wind_speed>=1.5*e.wind_speed.threshold?"high":"medium",message:e.wind_speed.message||`High wind speed: ${t.wind_speed} km/h`,icon:"💨"}),e.temperature?.enabled&&void 0!==t.temperature&&(void 0!==e.temperature.high_threshold&&t.temperature>=e.temperature.high_threshold&&i.push({type:"temperature",severity:t.temperature>=e.temperature.high_threshold+5?"high":"medium",message:e.temperature.message_high||`High temperature: ${t.temperature}°C`,icon:"🌡️"}),void 0!==e.temperature.low_threshold&&t.temperature<=e.temperature.low_threshold&&i.push({type:"temperature",severity:t.temperature<=e.temperature.low_threshold-5?"high":"medium",message:e.temperature.message_low||`Low temperature: ${t.temperature}°C`,icon:"❄️"})),e.uv?.enabled&&void 0!==t.uv_index&&t.uv_index>=e.uv.threshold&&i.push({type:"uv",severity:t.uv_index>=11?"high":"medium",message:e.uv.message||`High UV index: ${t.uv_index}`,icon:"☀️"}),e.rain_rate?.enabled&&void 0!==t.rain_rate&&t.rain_rate>=e.rain_rate.threshold&&i.push({type:"rain",severity:t.rain_rate>=2*e.rain_rate.threshold?"high":"medium",message:e.rain_rate.message||`Heavy rain: ${t.rain_rate} mm/h`,icon:"🌧️"}),i}(t,this.config.warnings):[]}render(){if(!this.hass||!this.config)return L``;const t=this.getWeatherData();if(!t)return L`
        <ha-card>
          <div class="card-content">
            <div class="error">Entity not available: ${this.config.entity}</div>
          </div>
        </ha-card>
      `;const e=this.getWarnings(),i="compact"===this.config.display_mode;return L`
      <ha-card class="${i?"compact":"normal"}">
        ${this.renderHeader()} ${this.renderControls()}
        ${e.length>0?this.renderWarnings(e):""}
        <div class="card-content">
          ${"live"===this.currentDataView?this.renderLiveData(t,i):this.renderHistoricalData(i)}
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
        ${["day","week","month","year"].map(t=>L`
            <button
              class="control-btn ${this.currentHistoryPeriod===t?"active":""}"
              @click=${()=>this.setHistoryPeriod(t)}
            >
              ${t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          `)}
      </div>
    `}renderWarnings(t){return L`
      <div class="warnings">
        ${t.map(t=>L`
            <div class="warning ${t.severity}">
              <span class="warning-icon">${t.icon}</span>
              <span class="warning-message">${t.message}</span>
            </div>
          `)}
      </div>
    `}renderLiveData(t,e){return L`
      <div class="${e?"weather-grid compact":"weather-grid"}">
        ${this.config.show_temperature&&void 0!==t.temperature?this.renderDataItem("🌡️","Temperature",vt(t.temperature),t.feels_like?`Feels like ${vt(t.feels_like)}`:void 0,e):""}
        ${this.config.show_humidity&&void 0!==t.humidity?this.renderDataItem("💧","Humidity",`${t.humidity}%`,void 0,e):""}
        ${this.config.show_pressure&&void 0!==t.pressure?this.renderDataItem("🔽","Pressure",function(t,e="hPa"){return`${Math.round(t)} ${e}`}(t.pressure),void 0,e):""}
        ${this.config.show_wind&&void 0!==t.wind_speed&&void 0!==t.wind_direction?this.renderWindItem(t,e):""}
        ${this.config.show_rain&&void 0!==t.rain?this.renderDataItem("🌧️","Rain",wt(t.rain),t.rain_rate?`Rate: ${wt(t.rain_rate)}/h`:void 0,e):""}
        ${this.config.show_uv&&void 0!==t.uv_index?this.renderUVItem(t.uv_index,e):""}
        ${this.config.show_solar&&void 0!==t.solar_radiation?this.renderDataItem("☀️","Solar",`${t.solar_radiation} W/m²`,void 0,e):""}
      </div>
    `}renderHistoricalData(t){return L`
      <div class="historical-placeholder">
        <div class="placeholder-icon">📊</div>
        <div class="placeholder-text">Historical data for ${this.currentHistoryPeriod}</div>
        <div class="placeholder-subtext">
          Connect to Home Assistant history API to display charts
        </div>
      </div>
    `}renderWindItem(t,e){return this.config.show_wind_arrows&&!e?L`
        <div class="data-item wind-item">
          <wind-compass
            .windDirection=${t.wind_direction||0}
            .windSpeed=${t.wind_speed||0}
            .windDirectionAvg=${t.wind_direction_avg}
            .showArrows=${this.config.show_wind_arrows}
            .compact=${!1}
          ></wind-compass>
          <div class="wind-info">
            <div class="data-label">Wind Speed</div>
            <div class="data-value">${$t(t.wind_speed||0)}</div>
            ${t.wind_gust?L`<div class="data-subtitle">Gust: ${$t(t.wind_gust)}</div>`:""}
          </div>
        </div>
      `:this.renderDataItem("💨","Wind",$t(t.wind_speed||0),t.wind_gust?`Gust: ${$t(t.wind_gust)}`:void 0,e)}renderDataItem(t,e,i,r,s=!1){return L`
      <div class="data-item ${s?"compact":""}">
        ${s?"":L`<div class="data-icon">${t}</div>`}
        <div class="data-content">
          <div class="data-label">${s?t+" ":""}${e}</div>
          <div class="data-value">${i}</div>
          ${r?L`<div class="data-subtitle">${r}</div>`:""}
        </div>
      </div>
    `}renderUVItem(t,e){const i=function(t){const e=ft.find(e=>t<=e.max);return e||ft[ft.length-1]}(t);return L`
      <div class="data-item ${e?"compact":""}">
        ${e?"":L`<div class="data-icon">☀️</div>`}
        <div class="data-content">
          <div class="data-label">${e?"☀️ ":""}UV Index</div>
          <div class="data-value">
            ${t}
            <span class="uv-badge" style="background-color: ${i.color}">
              ${i.label}
            </span>
          </div>
        </div>
      </div>
    `}setDataView(t){this.currentDataView=t}setHistoryPeriod(t){this.currentHistoryPeriod=t}static get styles(){return o`
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
    `}};t([pt({attribute:!1})],St.prototype,"hass",void 0),t([ut()],St.prototype,"config",void 0),t([ut()],St.prototype,"currentDataView",void 0),t([ut()],St.prototype,"currentHistoryPeriod",void 0),St=t([ct("weatherstation-card")],St);export{St as WeatherStationCard};
