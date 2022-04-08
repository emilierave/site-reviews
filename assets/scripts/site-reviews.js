var e,t=function(e){return"json"===this.responseType||!0===this.json?e({message:this.statusText},!1):"text"===this.responseType?e(this.statusText):void console.error(this)},i=function(e){if(0===this.status||this.status>=200&&this.status<300||304===this.status){if("json"===this.responseType)return e(this.response.data,this.response.success);if("text"===this.responseType)return e(this.responseText);if(!0===this.json){var i=JSON.parse(this.response);return e(i.data,i.success)}console.info(this)}else t.bind(this,e)},n=function(e){var t=new FormData,i=Object.prototype.toString.call(e);return"[object FormData]"===i&&(t=e),"[object HTMLFormElement]"===i&&(t=new FormData(e)),"[object Object]"===i&&Object.keys(e).forEach((function(i){return t.append(i,e[i])})),t.append("action",GLSR.action),t.append("_ajax_request",!0),t},s=function(n){(e=new XMLHttpRequest).addEventListener("load",i.bind(e,n)),e.addEventListener("error",t.bind(e,n))},r=function(t){for(var i in(t=t||{})["X-Requested-With"]="XMLHttpRequest",t)t.hasOwnProperty(i)&&e.setRequestHeader(i,t[i])},o={get:function(t,i,n){s(i),e.open("GET",t,!0),e.responseType="text",r(n),e.send()},post:function(t,i,o){s(i),e.open("POST",GLSR.ajaxurl,!0),e.responseType="json",e.json=!0,r(o),e.send(n(t))}},a={},l=function(e,t){var i=a[e]||[],n=[];t&&[].forEach.call(i,(function(e){t!==e.fn&&t!==e.fn.once&&n.push(e)})),n.length?a[e]=n:delete a[e]},c=function(e,t,i){(a[e]||(a[e]=[])).push({fn:t,context:i})},u={events:a,off:l,on:c,once:function(e,t,i){var n=arguments,s=function s(){l(e,s),t.apply(i,n)};s.once=t,c(e,s,i)},trigger:function(e){var t=[].slice.call(arguments,1),i=(a[e]||[]).slice();[].forEach.call(i,(function(e){return e.fn.apply(e.context,t)}))}};function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function v(e,t,i){return t&&h(e.prototype,t),i&&h(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var f="glsr-hidden",p="glsr-read-more",g="glsr-visible",m=".glsr-hidden-text",y=function(){function e(t){var i=this;d(this,e),(t||document).querySelectorAll(m).forEach((function(e){return i.init(e)}))}return v(e,[{key:"init",value:function(e){if(!e.parentNode.querySelector("."+p)){var t=e.dataset.trigger,i=document.createElement("span"),n=document.createElement("a");n.setAttribute("href","#"),n.innerHTML=e.dataset.showMore,"excerpt"===t&&(n.addEventListener("click",this._onClick.bind(this)),n.setAttribute("data-text",e.dataset.showLess)),"modal"===t&&n.setAttribute("data-excerpt-trigger","glsr-modal"),i.setAttribute("class",p),i.appendChild(n),e.parentNode.insertBefore(i,e.nextSibling)}}},{key:"_onClick",value:function(e){e.preventDefault();var t=e.currentTarget,i=t.parentNode.previousSibling,n=t.dataset.text;i.classList.toggle(f),i.classList.toggle(g),t.dataset.text=t.innerText,t.innerText=n}}]),e}(),b=function(){function e(t){var i=this;d(this,e),this.Form=t,this.counter=0,this.id=-1,this.is_submitting=!1,this.recaptchaEl=t.form.querySelector(".glsr-recaptcha-holder"),this.observer=new MutationObserver((function(e){var t=e.pop();t.target&&"visible"!==t.target.style.visibility&&(i.observer.disconnect(),setTimeout((function(){i.is_submitting||i.Form.enableButton()}),250))}))}return v(e,[{key:"destroy",value:function(){this.counter=0,this.id=-1,this.is_submitting=!1,this.recaptchaEl&&(this.recaptchaEl.innerHTML="")}},{key:"execute",value:function(){var e=this;if(-1!==this.id)return this.counter=0,this._observeMutations(this.id),void grecaptcha.execute(this.id);setTimeout((function(){e.counter++,e._submitForm.call(e.Form,e.counter)}),1e3)}},{key:"render",value:function(){this.Form.form.onsubmit=null,this.destroy(),this._renderWait()}},{key:"reset",value:function(){this.counter=0,this.is_submitting=!1,-1!==this.id&&grecaptcha.reset(this.id)}},{key:"_observeMutations",value:function(e){var t=window.___grecaptcha_cfg.clients[e];for(var i in t)if(t.hasOwnProperty(i)&&"[object String]"===Object.prototype.toString.call(t[i])){var n=document.querySelector("iframe[name=c-"+t[i]+"]");if(n){this.observer.observe(n.parentElement.parentElement,{attributeFilter:["style"],attributes:!0});break}}}},{key:"_renderWait",value:function(){var e=this;this.recaptchaEl&&setTimeout((function(){if("undefined"==typeof grecaptcha||void 0===grecaptcha.render)return e._renderWait();e.id=grecaptcha.render(e.recaptchaEl,{callback:e._submitForm.bind(e.Form,e.counter),"expired-callback":e.reset.bind(e),isolated:!0},!0)}),250)}},{key:"_submitForm",value:function(e){if(this.recaptcha.is_submitting=!0,!this.useAjax)return this.disableButton(),void this.form.submit();this.submitForm(e)}}]),e}(),w={classNames:{active:"gl-active",base:"gl-star-rating",selected:"gl-selected"},clearable:!0,maxStars:10,prebuilt:!1,stars:null,tooltip:"Select a Rating"},E=function(e,t,i){e.classList[t?"add":"remove"](i)},_=function(e){var t=document.createElement("span");for(var i in e=e||{})t.setAttribute(i,e[i]);return t},L=function(e,t,i){var n=_(i);return e.parentNode.insertBefore(n,t?e.nextSibling:e),n},k=function e(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];var s={};return i.forEach((function(t){Object.keys(t||{}).forEach((function(n){if(void 0!==i[0][n]){var r=t[n];"Object"!==S(r)||"Object"!==S(s[n])?s[n]=r:s[n]=e(s[n],r)}}))})),s},S=function(e){return{}.toString.call(e).slice(8,-1)},x="undefined"!=typeof window?window:{screen:{},navigator:{}},T=(x.matchMedia||function(){return{matches:!1}}).bind(x),R=!1,A={get passive(){return R=!0}},M=function(){};x.addEventListener&&x.addEventListener("p",M,A),x.removeEventListener&&x.removeEventListener("p",M,!1);var F=R,N="ontouchstart"in x;N||"TouchEvent"in x&&T("(any-pointer: coarse)").matches;x.navigator.maxTouchPoints;var G=x.navigator.userAgent||"";T("(pointer: coarse)").matches&&/iPad|Macintosh/.test(G)&&Math.min(x.screen.width||0,x.screen.height||0);(T("(pointer: coarse)").matches||!T("(pointer: fine)").matches&&N)&&/Windows.*Firefox/.test(G),T("(any-pointer: fine)").matches||T("(any-hover: hover)").matches;var P=function(){function e(t,i){var n,s,r;d(this,e),this.direction=window.getComputedStyle(t,null).getPropertyValue("direction"),this.el=t,this.events={change:this.onChange.bind(this),keydown:this.onKeyDown.bind(this),mousedown:this.onPointerDown.bind(this),mouseleave:this.onPointerLeave.bind(this),mousemove:this.onPointerMove.bind(this),reset:this.onReset.bind(this),touchend:this.onPointerDown.bind(this),touchmove:this.onPointerMove.bind(this)},this.indexActive=null,this.indexSelected=null,this.props=i,this.tick=null,this.ticking=!1,this.values=function(e){var t=[];return[].forEach.call(e.options,(function(e){var i=parseInt(e.value,10)||0;i>0&&t.push({index:e.index,text:e.text,value:i})})),t.sort((function(e,t){return e.value-t.value}))}(t),this.widgetEl=null,this.el.widget&&this.el.widget.destroy(),n=this.values.length,s=1,r=this.props.maxStars,/^\d+$/.test(n)&&s<=n&&n<=r?this.build():this.destroy()}return v(e,[{key:"build",value:function(){this.destroy(),this.buildWidget(),this.selectValue(this.indexSelected=this.selected(),!1),this.handleEvents("add"),this.el.widget=this}},{key:"buildWidget",value:function(){var e,t,i=this;this.props.prebuilt?(e=this.el.parentNode,t=e.querySelector("."+this.props.classNames.base+"--stars")):((e=L(this.el,!1,{class:this.props.classNames.base})).appendChild(this.el),t=L(this.el,!0,{class:this.props.classNames.base+"--stars"}),this.values.forEach((function(e,n){var s=_({"data-index":n,"data-value":e.value});"function"==typeof i.props.stars&&i.props.stars.call(i,s,e,n),[].forEach.call(s.children,(function(e){return e.style.pointerEvents="none"})),t.innerHTML+=s.outerHTML}))),e.dataset.starRating="",e.classList.add(this.props.classNames.base+"--"+this.direction),this.props.tooltip&&t.setAttribute("role","tooltip"),this.widgetEl=t}},{key:"changeIndexTo",value:function(e,t){var i=this;if(this.indexActive!==e||t){if([].forEach.call(this.widgetEl.children,(function(t,n){E(t,n<=e,i.props.classNames.active),E(t,n===i.indexSelected,i.props.classNames.selected)})),this.widgetEl.setAttribute("data-rating",e+1),"function"==typeof this.props.stars||this.props.prebuilt||(this.widgetEl.classList.remove("s"+10*(this.indexActive+1)),this.widgetEl.classList.add("s"+10*(e+1))),this.props.tooltip){var n,s=e<0?this.props.tooltip:null===(n=this.values[e])||void 0===n?void 0:n.text;this.widgetEl.setAttribute("aria-label",s)}this.indexActive=e}this.ticking=!1}},{key:"destroy",value:function(){this.indexActive=null,this.indexSelected=this.selected();var e=this.el.parentNode;e.classList.contains(this.props.classNames.base)&&(this.props.prebuilt?(this.widgetEl=e.querySelector("."+this.props.classNames.base+"--stars"),e.classList.remove(this.props.classNames.base+"--"+this.direction),delete e.dataset.starRating):e.parentNode.replaceChild(this.el,e),this.handleEvents("remove")),delete this.el.widget}},{key:"eventListener",value:function(e,t,i,n){var s=this;i.forEach((function(i){return e[t+"EventListener"](i,s.events[i],n||!1)}))}},{key:"handleEvents",value:function(e){var t=this.el.closest("form");t&&"FORM"===t.tagName&&this.eventListener(t,e,["reset"]),this.eventListener(this.el,e,["change"]),"add"===e&&this.el.disabled||(this.eventListener(this.el,e,["keydown"]),this.eventListener(this.widgetEl,e,["mousedown","mouseleave","mousemove","touchend","touchmove"],!!F&&{passive:!1}))}},{key:"indexFromEvent",value:function(e){var t,i,n=(null===(t=e.touches)||void 0===t?void 0:t[0])||(null===(i=e.changedTouches)||void 0===i?void 0:i[0])||e,s=document.elementFromPoint(n.clientX,n.clientY);return[].slice.call(s.parentNode.children).indexOf(s)}},{key:"onChange",value:function(){this.changeIndexTo(this.selected(),!0)}},{key:"onKeyDown",value:function(e){var t=e.key.slice(5);if(~["Left","Right"].indexOf(t)){var i="Left"===t?-1:1;"rtl"===this.direction&&(i*=-1);var n=this.values.length-1,s=Math.min(Math.max(this.selected()+i,-1),n);this.selectValue(s,!0)}}},{key:"onPointerDown",value:function(e){e.preventDefault();var t=this.indexFromEvent(e);this.props.clearable&&t===this.indexSelected&&(t=-1),this.selectValue(t,!0)}},{key:"onPointerLeave",value:function(e){var t=this;e.preventDefault(),cancelAnimationFrame(this.tick),requestAnimationFrame((function(){return t.changeIndexTo(t.indexSelected)}))}},{key:"onPointerMove",value:function(e){var t=this;e.preventDefault(),this.ticking||(this.tick=requestAnimationFrame((function(){return t.changeIndexTo(t.indexFromEvent(e))})),this.ticking=!0)}},{key:"onReset",value:function(){var e,t=this.valueIndex(null===(e=this.el.querySelector("[selected]"))||void 0===e?void 0:e.value);this.selectValue(t||-1,!1)}},{key:"selected",value:function(){return this.valueIndex(this.el.value)}},{key:"selectValue",value:function(e,t){var i;this.el.value=(null===(i=this.values[e])||void 0===i?void 0:i.value)||"",this.indexSelected=this.selected(),!1===t?this.changeIndexTo(this.selected(),!0):this.el.dispatchEvent(new Event("change"))}},{key:"valueIndex",value:function(e){return this.values.findIndex((function(t){return t.value===+e}))}}]),e}(),q=function(){function e(t,i){d(this,e),this.destroy=this.destroy.bind(this),this.props=i,this.rebuild=this.rebuild.bind(this),this.selector=t,this.widgets=[],this.build()}return v(e,[{key:"build",value:function(){var e=this;this.queryElements(this.selector).forEach((function(t){var i=k(w,e.props,JSON.parse(t.getAttribute("data-options")));"SELECT"!==t.tagName||t.widget||(!i.prebuilt&&t.parentNode.classList.contains(i.classNames.base)&&e.unwrap(t),e.widgets.push(new P(t,i)))}))}},{key:"destroy",value:function(){this.widgets.forEach((function(e){return e.destroy()})),this.widgets=[]}},{key:"queryElements",value:function(e){return"HTMLSelectElement"===S(e)?[e]:"NodeList"===S(e)?[].slice.call(e):"String"===S(e)?[].slice.call(document.querySelectorAll(e)):[]}},{key:"rebuild",value:function(){this.destroy(),this.build()}},{key:"unwrap",value:function(e){var t=e.parentNode,i=t.parentNode;i.insertBefore(e,t),i.removeChild(t)}}]),e}();"undefined"==typeof arguments||arguments;var O=function(e,t,i){e&&t.split(" ").forEach((function(t){e.classList[i?"add":"remove"](t)}))},j=function(e){return"."+e.trim().split(" ").join(".")},C=function(e){var t='input[name="'+e.getAttribute("name")+'"]:checked';return e.validation.form.querySelectorAll(t).length},H={email:{fn:function(e){return!e||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}},max:{fn:function(e,t){return!e||("checkbox"===this.type?C(this)<=parseInt(t):parseFloat(e)<=parseFloat(t))}},maxlength:{fn:function(e,t){return!e||e.length<=parseInt(t)}},min:{fn:function(e,t){return!e||("checkbox"===this.type?C(this)>=parseInt(t):parseFloat(e)>=parseFloat(t))}},minlength:{fn:function(e,t){return!e||e.length>=parseInt(t)}},number:{fn:function(e){return!e||!isNaN(parseFloat(e))},priority:2},pattern:{fn:function(e,t){var i=t.match(new RegExp("^/(.*?)/([gimy]*)$"));return!e||new RegExp(i[1],i[2]).test(e)}},required:{fn:function(e){return"radio"===this.type||"checkbox"===this.type?C(this):void 0!==e&&""!==e},priority:99,halt:!0},tel:{fn:function(e){var t=e.replace(/[^0-9]/g,"").length;return!e||4<=t&&15>=t&&new RegExp("^[+]?[\\d\\s()-]*$").test(e)}},url:{fn:function(e){return!e||new RegExp("^(https?)://([\\p{L}\\p{N}\\p{S}\\-_.])+(.?([\\p{L}\\p{N}]|xn--[\\p{L}\\p{N}\\-]+)+.?)(:[0-9]+)?(?:/(?:[\\p{L}\\p{N}\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*(?:\\?(?:[\\p{L}\\p{N}\\-._~!$&'\\[\\]()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?(?:#(?:[\\p{L}\\p{N}\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?$","iu").test(e)}}},I=["required","max","maxlength","min","minlength","pattern"],D=function(){function e(t){d(this,e),this.config=GLSR.validationconfig,this.fields=[],this.form=t,this.form.setAttribute("novalidate",""),this.strings=GLSR.validationstrings,this.validateEvent=this._onChange.bind(this)}return v(e,[{key:"destroy",value:function(){for(this.reset();this.fields.length;){var e=this.fields.shift();this._removeEvent(e.input),delete e.input.validation}}},{key:"init",value:function(){var e=this;this.form.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea, [data-glsr-validate]").forEach((function(t){e.fields.find((function(e){return e.input.name===t.name&&!t.name.endsWith("[]")}))||"none"!==t.closest(j(e.config.field)).style.display&&e.fields.push(e._initField(t))}))}},{key:"reset",value:function(){for(var e in this.fields)if(this.fields.hasOwnProperty(e)){this.fields[e].errorElements=null;var t=this.fields[e].input.closest(j(this.config.field));O(this.fields[e].input,this.config.input_error,!1),O(this.fields[e].input,this.config.input_valid,!1),O(t,this.config.field_error,!1),O(t,this.config.field_valid,!1)}}},{key:"setErrors",value:function(e,t){e.hasOwnProperty("validation")&&this._initField(e),e.validation.errors=t}},{key:"toggleError",value:function(e,t){var i=e.input.closest(j(this.config.field));if(O(e.input,this.config.input_error,t),O(e.input,this.config.input_valid,!t),i){O(i,this.config.field_error,t),O(i,this.config.field_valid,!t);var n=i.querySelector(j(this.config.field_message));n.innerHTML=t?e.errors.join("<br>"):"",n.style.display=t?"":"none"}}},{key:"validate",value:function(e){var t=!0,i=this.fields;for(var n in e instanceof HTMLElement&&(i=[e.validation]),i)if(i.hasOwnProperty(n)){var s=i[n];this._validateField(s)?this.toggleError(s,!1):(t=!1,this.toggleError(s,!0))}return t}},{key:"_addEvent",value:function(e){e.addEventListener(this._getEventName(e),this.validateEvent)}},{key:"_addValidators",value:function(e,t,i){var n=this;[].forEach.call(e,(function(e){var s=e.name.replace("data-","");~I.indexOf(s)?n._addValidatorToField(t,i,s,e.value):"type"===e.name&&n._addValidatorToField(t,i,e.value)}))}},{key:"_addValidatorToField",value:function(e,t,i,n){if(H[i]&&(H[i].name=i,e.push(H[i]),n)){var s="pattern"===i?[n]:n.split(",");s.unshift(null),t[i]=s}}},{key:"_onChange",value:function(e){this.validate(e.currentTarget)}},{key:"_removeEvent",value:function(e){e.removeEventListener(this._getEventName(e),this.validateEvent)}},{key:"_getEventName",value:function(e){return~["radio","checkbox"].indexOf(e.getAttribute("type"))||"SELECT"===e.nodeName?"change":"input"}},{key:"_initField",value:function(e){var t=this,i={},n=[];return null!==e.offsetParent&&(this._addValidators(e.attributes,n,i),this._sortValidators(n),this._addEvent(e)),e.validation={form:this.form,input:e,params:i,validate:function(){return t.validate(e)},validators:n}}},{key:"_sortValidators",value:function(e){e.sort((function(e,t){return(t.priority||1)-(e.priority||1)}))}},{key:"_validateField",value:function(e){var t=[],i=!0;for(var n in e.validators)if(e.validators.hasOwnProperty(n)){var s=e.validators[n],r=e.params[s.name]?e.params[s.name]:[];if(r[0]=e.input.value,!s.fn.apply(e.input,r)){i=!1;var o=this.strings[s.name];if(t.push(o.replace(/(\%s)/g,r[1])),!0===s.halt)break}}return e.errors=t,i}}]),e}(),B=function(){function e(t,i){d(this,e),this.button=i,this.config=GLSR.validationconfig,this.events={submit:this._onSubmit.bind(this)},this.form=t,this.isActive=!1,this.recaptcha=new b(this),this.stars=null,this.strings=GLSR.validationstrings,this.useAjax=!t.classList.contains("no-ajax"),this.validation=new D(t)}return v(e,[{key:"destroy",value:function(){this._destroyForm(),this._destroyRecaptcha(),this._destroyStarRatings(),this.isActive=!1}},{key:"disableButton",value:function(){this.button.setAttribute("aria-busy","true"),this.button.setAttribute("disabled","")}},{key:"enableButton",value:function(){this.button.setAttribute("aria-busy","false"),this.button.removeAttribute("disabled")}},{key:"init",value:function(){this.isActive||(this._initForm(),this._initStarRatings(),this._initRecaptcha(),this.isActive=!0)}},{key:"submitForm",value:function(e){this.disableButton(),this.form[GLSR.nameprefix+"[_counter]"].value=e||0,GLSR.ajax.post(this.form,this._handleResponse.bind(this))}},{key:"_destroyForm",value:function(){this.form.removeEventListener("submit",this.events.submit),this._resetErrors(),this.validation.destroy()}},{key:"_destroyRecaptcha",value:function(){this.recaptcha.destroy()}},{key:"_destroyStarRatings",value:function(){this.stars&&this.stars.destroy()}},{key:"_handleResponse",value:function(e,t){var i=!0===t;"unset"!==e.recaptcha?("reset"===e.recaptcha&&this.recaptcha.reset(),i&&(this.recaptcha.reset(),this.form.reset()),this._showFieldErrors(e.errors),this._showResults(e.message,i),this.enableButton(),GLSR.Event.trigger("site-reviews/form/handle",e,this.form),e.form=this.form,document.dispatchEvent(new CustomEvent("site-reviews/after/submission",{detail:e})),i&&""!==e.redirect&&(window.location=e.redirect)):this.recaptcha.execute()}},{key:"_initForm",value:function(){this._destroyForm(),this.form.addEventListener("submit",this.events.submit),this.validation.init()}},{key:"_initRecaptcha",value:function(){this.recaptcha.render()}},{key:"_initStarRatings",value:function(){null!==this.stars?this.stars.rebuild():this.stars=new q(this.form.querySelectorAll(".glsr-field-rating select"),GLSR.stars)}},{key:"_onSubmit",value:function(e){if(!this.validation.validate())return e.preventDefault(),void this._showResults(this.strings.errors,!1);this._resetErrors(),(this.form["g-recaptcha-response"]&&""===this.form["g-recaptcha-response"].value||this.useAjax)&&(e.preventDefault(),this.submitForm())}},{key:"_resetErrors",value:function(){O(this.form,this.config.form_error,!1),this._showResults("",null),this.validation.reset()}},{key:"_showFieldErrors",value:function(e){if(e)for(var t in e)if(e.hasOwnProperty(t)){var i=GLSR.nameprefix?GLSR.nameprefix+"["+t+"]":t,n=this.form.querySelector('[name="'+i+'"]');n&&(this.validation.setErrors(n,e[t]),this.validation.toggleError(n.validation,"add"))}}},{key:"_showResults",value:function(e,t){var i=this.form.querySelector(j(this.config.form_message));null!==i&&(O(this.form,this.config.form_error,!1===t),O(i,this.config.form_message_failed,!1===t),O(i,this.config.form_message_success,!0===t),i.innerHTML=e)}}]),e}();var V=!1;if("undefined"!=typeof window){var W={get passive(){V=!0}};window.addEventListener("testPassive",null,W),window.removeEventListener("testPassive",null,W)}var Y="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),$=[],K=!1,J=-1,X=void 0,z=void 0,Q=function(e){return $.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},U=function(e){var t=e||window.event;return!!Q(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},Z=function(e,t){if(e){if(!$.some((function(t){return t.targetElement===e}))){var i={targetElement:e,options:t||{}};$=[].concat(function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}($),[i]),Y?(e.ontouchstart=function(e){1===e.targetTouches.length&&(J=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var i=e.targetTouches[0].clientY-J;!Q(e.target)&&(t&&0===t.scrollTop&&i>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&i<0?U(e):e.stopPropagation())}(t,e)},K||(document.addEventListener("touchmove",U,V?{passive:!1}:void 0),K=!0)):function(e){if(void 0===z){var t=!!e&&!0===e.reserveScrollBarGap,i=window.innerWidth-document.documentElement.clientWidth;t&&i>0&&(z=document.body.style.paddingRight,document.body.style.paddingRight=i+"px")}void 0===X&&(X=document.body.style.overflow,document.body.style.overflow="hidden")}(t)}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},ee=function(){Y?($.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),K&&(document.removeEventListener("touchmove",U,V?{passive:!1}:void 0),K=!1),J=-1):(void 0!==z&&(document.body.style.paddingRight=z,z=void 0),void 0!==X&&(document.body.style.overflow=X,X=void 0)),$=[]},te=["[contenteditable]",'[tabindex]:not([tabindex^="-"])',"a[href]","button:not([disabled]):not([aria-hidden])",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])"],ie=function(){function e(t){var i=t.closeTrigger,n=void 0===i?"data-glsr-close":i,s=t.onClose,r=void 0===s?function(){}:s,o=t.onOpen,a=void 0===o?function(){}:o,l=t.openClass,c=void 0===l?"is-open":l,u=t.openTrigger,h=void 0===u?"data-glsr-trigger":u,v=t.targetModalId,f=void 0===v?"glsr-modal":v,p=t.triggers,g=void 0===p?[]:p;d(this,e),this.modal=document.getElementById(f),this.config={openTrigger:h,closeTrigger:n,openClass:c,onOpen:a,onClose:r},this.events={mouseup:this._onClick.bind(this),keydown:this._onKeydown.bind(this),touchstart:this._onClick.bind(this)},g.length>0&&this._registerTriggers(g)}return v(e,[{key:"_closeModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t&&(t.preventDefault(),t.stopPropagation()),this.modal.setAttribute("aria-hidden","true"),this._eventHandler("remove"),ee(),this.activeElement&&this.activeElement.focus&&this.activeElement.focus();var i=function i(){e.modal.classList.remove(e.config.openClass),e.modal.removeEventListener("animationend",i,!1),e.config.onClose(e.modal,e.activeElement,t)};this.modal.addEventListener("animationend",i,!1),GLSR.Event.trigger("site-reviews/modal/close",this.modal,this.activeElement,t)}},{key:"_closeModalById",value:function(e){this.modal=document.getElementById(e),this.modal&&this._closeModal()}},{key:"_eventHandler",value:function(e){this._eventListener(this.modal,e,["mouseup","touchstart"]),this._eventListener(document,e,["keydown"])}},{key:"_eventListener",value:function(e,t,i){var n=this;i.forEach((function(i){return e[t+"EventListener"](i,n.events[i])}))}},{key:"_getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(te);return Array.prototype.slice.call(e)}},{key:"_onClick",value:function(e){e.target.hasAttribute(this.config.closeTrigger)&&this._closeModal(e)}},{key:"_onKeydown",value:function(e){27===e.keyCode&&this._closeModal(e),9===e.keyCode&&this._retainFocus(e)}},{key:"_openModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.activeElement=document.activeElement,t&&(t.preventDefault(),this.activeElement=t.currentTarget),this.config.onOpen(this.modal,this.activeElement,t),this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),Z(this.modal.querySelector("[data-glsr-modal]")),this._eventHandler("add");var i=function t(){e.modal.removeEventListener("animationend",t,!1),e._setFocusToFirstNode()};this.modal.addEventListener("animationend",i,!1),GLSR.Event.trigger("site-reviews/modal/open",this.modal,this.activeElement,t)}},{key:"_registerTriggers",value:function(e){var t=this;e.filter(Boolean).forEach((function(e){e.triggerModal&&e.removeEventListener("click",e.triggerModal),e.triggerModal=t._openModal.bind(t),e.addEventListener("click",e.triggerModal)}))}},{key:"_retainFocus",value:function(e){var t=this._getFocusableNodes();if(0!==t.length)if(t=t.filter((function(e){return null!==e.offsetParent})),this.modal.contains(document.activeElement)){var i=t.indexOf(document.activeElement);e.shiftKey&&0===i&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&i===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}},{key:"_setFocusToFirstNode",value:function(){var e=this,t=this._getFocusableNodes();if(0!==t.length){var i=t.filter((function(t){return!t.hasAttribute(e.config.closeTrigger)}));i.length>0&&i[0].focus(),0===i.length&&t[0].focus()}}}]),e}(),ne={},se=function(e,t){var i={};return e.forEach((function(e){var n=e.attributes[t].value;void 0===i[n]&&(i[n]=[]),i[n].push(e)})),i},re={init:function(e){var t=Object.assign({},{openTrigger:"data-glsr-trigger"},e),i=Array.prototype.slice.call(document.querySelectorAll("[".concat(t.openTrigger,"]"))),n=se(i,t.openTrigger);return Object.keys(n).forEach((function(e){t.targetModalId=e,t.triggers=n[e],ne[e]=new ie(t)})),ne},open:function(e,t){var i=t||{};i.targetModalId=e,ne[e]&&ne[e]._eventHandler("remove"),ne[e]=new ie(i),ne[e]._openModal()},close:function(e){if(e)ne[e]._closeModalById(e);else for(var t in ne)ne[t].closeModal()}},oe="glsr-hide",ae=16,le=468,ce="button.glsr-button-loadmore",ue=".glsr-pagination a.page-numbers",de=".glsr-reviews, [data-reviews]",he=function(){function e(t,i){d(this,e),this.events={button:{click:this._onLoadMore.bind(this)},link:{click:this._onPaginate.bind(this)},window:{popstate:this._onPopstate.bind(this)}},this.paginationEl=i,this.reviewsEl=t.querySelector(de),this.wrapperEl=t}return v(e,[{key:"destroy",value:function(){this._eventHandler("remove")}},{key:"init",value:function(){this._eventHandler("add");var e=this.paginationEl.querySelector(".current");if(e){var t=this._data(e),i=e.nextElementSibling;t&&i&&2==+i.dataset.page&&GLSR.urlparameter&&window.history.replaceState(t,"",window.location)}}},{key:"_data",value:function(e){try{for(var t=JSON.parse(JSON.stringify(this.paginationEl.dataset)),i={},n=0,s=Object.keys(t);n<s.length;n++){var r=s[n],o=void 0;try{o=JSON.parse(t[r])}catch(e){o=t[r]}i["".concat(GLSR.nameprefix,"[atts][").concat(r,"]")]=o}return i["".concat(GLSR.nameprefix,"[_action]")]="fetch-paged-reviews",i["".concat(GLSR.nameprefix,"[page]")]=e.dataset.page||1,i["".concat(GLSR.nameprefix,"[schema]")]=!1,i["".concat(GLSR.nameprefix,"[url]")]=e.href||location.href,i}catch(e){return console.error("Invalid pagination config."),!1}}},{key:"_eventHandler",value:function(e){var t=this;this._eventListener(window,e,this.events.window),this.wrapperEl.querySelectorAll(ce).forEach((function(i){t._eventListener(i,e,t.events.button)})),this.wrapperEl.querySelectorAll(ue).forEach((function(i){t._eventListener(i,e,t.events.link)}))}},{key:"_eventListener",value:function(e,t,i){Object.keys(i).forEach((function(n){return e[t+"EventListener"](n,i[n])}))}},{key:"_handleLoadMore",value:function(e,t,i,n){n?(e.setAttribute("aria-busy","false"),e.removeAttribute("disabled"),this.destroy(),this.paginationEl.innerHTML=i.pagination,this.reviewsEl.insertAdjacentHTML("beforeend",i.reviews),this.init(),GLSR.Event.trigger("site-reviews/pagination/handle",i,this)):window.location=location}},{key:"_handlePagination",value:function(e,t,i,n){n?(this._paginate(i),GLSR.urlparameter&&window.history.pushState(t,"",e.href)):window.location=e.href}},{key:"_handlePopstate",value:function(e,t,i){i?this._paginate(t):console.error(t)}},{key:"_onLoadMore",value:function(e){var t=e.currentTarget,i=this._data(t);i&&(t.setAttribute("aria-busy","true"),t.setAttribute("disabled",""),e.preventDefault(),GLSR.ajax.post(i,this._handleLoadMore.bind(this,t,i)))}},{key:"_onPaginate",value:function(e){var t=e.currentTarget,i=this._data(t);i&&(this.wrapperEl.classList.add(oe),e.preventDefault(),GLSR.ajax.post(i,this._handlePagination.bind(this,t,i)))}},{key:"_onPopstate",value:function(e){GLSR.Event.trigger("site-reviews/pagination/popstate",e,this),e.state&&e.state["".concat(GLSR.nameprefix,"[_action]")]&&(this.wrapperEl.classList.add(oe),GLSR.ajax.post(e.state,this._handlePopstate.bind(this,e.state)))}},{key:"_paginate",value:function(e){this.destroy(),this.paginationEl.innerHTML=e.pagination,this.reviewsEl.innerHTML=e.reviews,this.init(),this._scrollToTop(),this.wrapperEl.classList.remove(oe),GLSR.Event.trigger("site-reviews/pagination/handle",e,this)}},{key:"_scrollStep",value:function(e){var t=Math.min(1,(window.performance.now()-e.startTime)/le),i=.5*(1-Math.cos(Math.PI*t)),n=e.startY+(e.endY-e.startY)*i;window.scroll(0,e.offset+n),n!==e.endY&&window.requestAnimationFrame(this._scrollStep.bind(this,e))}},{key:"_scrollToTop",value:function(){var e=ae;[].forEach.call(GLSR.ajaxpagination,(function(t){var i=document.querySelector(t);i&&"fixed"===window.getComputedStyle(i).getPropertyValue("position")&&(e+=i.clientHeight)}));var t=this.reviewsEl.getBoundingClientRect().top-e;t>0||this._scrollStep({endY:t,offset:window.pageYOffset,startTime:window.performance.now(),startY:this.reviewsEl.scrollTop})}}]),e}(),ve="site-reviews/excerpts/init",fe="site-reviews/forms/init",pe="site-reviews/init",ge="site-reviews/modal/init",me="site-reviews/pagination/init";window.hasOwnProperty("GLSR")||(window.GLSR={}),window.GLSR.ajax=o,window.GLSR.forms=[],window.GLSR.pagination=[],window.GLSR.Event=u,window.GLSR.Modal=re,u.on(ve,(function(e){new y(e)})),u.on(fe,(function(){GLSR.forms.forEach((function(e){return e.destroy()})),GLSR.forms=[],document.querySelectorAll("form.glsr-review-form").forEach((function(e){var t=e.querySelector("[type=submit]");if(t){var i=new B(e,t);i.init(),GLSR.forms.push(i)}}))})),u.on(ge,(function(){var e="glsr-modal__content",t="glsr-modal__review";window.GLSR.Modal.init({onClose:function(i,n,s){i.querySelector("."+e).innerHTML="",i.classList.remove(t)},onOpen:function(i,n,s){var r=n.closest(".glsr").cloneNode(!0),o=n.closest(".glsr-review").cloneNode(!0);r.innerHTML="",r.appendChild(o),i.querySelector("."+e).appendChild(r),i.classList.add(t)},openTrigger:"data-excerpt-trigger"})})),u.on(me,(function(){GLSR.pagination.forEach((function(e){return e.destroy()})),GLSR.pagination=[],document.querySelectorAll(".glsr").forEach((function(e){var t=e.querySelector(".glsr-pagination");if(t&&(t.classList.contains("glsr-ajax-loadmore")||t.classList.contains("glsr-ajax-pagination"))){var i=new he(e,t);i.init(),GLSR.pagination.push(i)}}))})),u.on(pe,(function(){document.querySelectorAll(".glsr").forEach((function(e){var t="glsr-"+window.getComputedStyle(e,null).getPropertyValue("direction");e.classList.add(t)})),u.trigger(ve),u.trigger(fe),u.trigger(ge),u.trigger(me)})),u.on("site-reviews/pagination/handle",(function(e,t){u.trigger(ve,t.wrapperEl),u.trigger(ge)})),document.addEventListener("DOMContentLoaded",(function(){u.trigger(pe)}));
