/*! For license information please see site-reviews.js.LICENSE.txt */
!function(t){var i={};function n(s){if(i[s])return i[s].exports;var e=i[s]={i:s,l:!1,exports:{}};return t[s].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,s){n.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,i){if(1&i&&(t=n(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)n.d(s,e,function(i){return t[i]}.bind(null,e));return s},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s=7)}([,function(t,i){function n(i){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(i)}t.exports=n},function(t,i,n){var s;!function(n,e,h){"use strict";var o=function(t,i){var n={}.toString.call(t);this.selects="[object String]"===n?e.querySelectorAll(t):"[object NodeList]"===n?t:[t],this.destroy=function(){this.widgets.forEach((function(t){t.h()}))},this.rebuild=function(){this.widgets.forEach((function(t){t.u()}))},this.widgets=[];for(var s=0;s<this.selects.length;s++)if("SELECT"===this.selects[s].tagName&&!this.selects[s]["star-rating"]){var h=new r(this.selects[s],i);void 0!==h.direction&&this.widgets.push(h)}},r=function(t,i){this.el=t,this.v=this._({},this.g,i||{},JSON.parse(t.getAttribute("data-options"))),this.S(),this.stars<1||this.stars>this.v.maxStars||this.u()};r.prototype={g:{classname:"gl-star-rating",clearable:!0,initialText:"Select a Rating",maxStars:10,showText:!0},L:function(){this.R(),this.current=this.selected=this.j(),this.F(),this.G(),this.T(),this.O(this.current),this.M("add"),this.el["star-rating"]=!0},k:function(){this.v.showText&&(this.textEl=this.C(this.widgetEl,{class:this.v.classname+"-text"},!0))},G:function(){var t=this.N(),i=this.C(this.el,{class:this.v.classname+"-stars"},!0);for(var n in t){var s=this.D({"data-value":n,"data-text":t[n]});i.innerHTML+=s.outerHTML}this.widgetEl=i,this.k()},I:function(t){(t<0||isNaN(t))&&(t=0),t>this.stars&&(t=this.stars),this.widgetEl.classList.remove("s"+10*this.current),this.widgetEl.classList.add("s"+10*t),this.v.showText&&(this.textEl.textContent=t<1?this.v.initialText:this.widgetEl.childNodes[t-1].dataset.text),this.current=t},D:function(t){var i=e.createElement("span");for(var n in t=t||{})i.setAttribute(n,t[n]);return i},h:function(){this.M("remove");var t=this.el.parentNode;t.parentNode.replaceChild(this.el,t),delete this.el["star-rating"]},q:function(t,i,n,s){s=s||!1,n.forEach(function(n){this.events&&t[i+"EventListener"](n,this.events[n],s)}.bind(this))},_:function(){var t=[].slice.call(arguments),i=t[0],n=t.slice(1);return Object.keys(n).forEach((function(t){for(var s in n[t])n[t].hasOwnProperty(s)&&(i[s]=n[t][s])})),i},V:function(){var t=!1;try{var i=Object.defineProperty({},"passive",{get:function(){t={passive:!1}}});n.addEventListener("test",null,i)}catch(t){}return t},A:function(t){var i={},n=t.pageX||t.changedTouches[0].pageX,s=this.widgetEl.offsetWidth;return i.ltr=Math.max(n-this.offsetLeft,1),i.rtl=s-i.ltr,Math.min(Math.ceil(i[this.direction]/Math.round(s/this.stars)),this.stars)},N:function(){for(var t=this.el,i={},n={},s=0;s<t.length;s++)this.H(t[s])||(i[t[s].value]=t[s].text);return Object.keys(i).sort().forEach((function(t){n[t]=i[t]})),n},j:function(){return parseInt(this.el.options[Math.max(this.el.selectedIndex,0)].value)||0},M:function(t){var i=this.el.closest("form");i&&"FORM"===i.tagName&&this.q(i,t,["reset"]),"add"===t&&this.el.disabled||(this.q(this.el,t,["change","keydown"]),this.q(this.widgetEl,t,["mousedown","mouseleave","mousemove","mouseover","touchend","touchmove","touchstart"],this.V()))},R:function(){this.events={change:this.P.bind(this),keydown:this.B.bind(this),mousedown:this.U.bind(this),mouseleave:this.W.bind(this),mousemove:this.X.bind(this),mouseover:this.J.bind(this),reset:this.Y.bind(this),touchend:this.U.bind(this),touchmove:this.X.bind(this),touchstart:this.J.bind(this)}},C:function(t,i,n){var s=this.D(i);return t.parentNode.insertBefore(s,!0===n?t.nextSibling:t),s},H:function(t){return null===t.getAttribute("value")||""===t.value},P:function(){this.I(this.j())},B:function(t){if(~["ArrowLeft","ArrowRight"].indexOf(t.key)){var i="ArrowLeft"===t.key?-1:1;"rtl"===this.direction&&(i*=-1),this.O(Math.min(Math.max(this.j()+i,0),this.stars)),this.K()}},U:function(t){t.preventDefault();var i=this.A(t);0!==this.current&&parseFloat(this.selected)===i&&this.v.clearable&&(i=0),this.O(i),this.K()},W:function(t){t.preventDefault(),this.I(this.selected)},X:function(t){t.preventDefault(),this.I(this.A(t))},J:function(t){t.preventDefault();var i=this.widgetEl.getBoundingClientRect();this.offsetLeft=i.left+e.body.scrollLeft},Y:function(){var t=this.el.querySelector("[selected]"),i=t?t.value:"";this.el.value=i,this.selected=parseInt(i)||0,this.I(i)},u:function(){this.el.parentNode.classList.contains(this.v.classname)&&this.h(),this.L()},T:function(){var t=this.el.parentNode;this.direction=n.getComputedStyle(t,null).getPropertyValue("direction"),t.classList.add(this.v.classname+"-"+this.direction)},O:function(t){this.el.value=this.selected=t,this.I(t)},S:function(){var t=this.el;this.stars=0;for(var i=0;i<t.length;i++)if(!this.H(t[i])){if(isNaN(parseFloat(t[i].value))||!isFinite(t[i].value))return void(this.stars=0);this.stars++}},K:function(){this.el.dispatchEvent(new Event("change"))},F:function(){this.C(this.el,{class:this.v.classname,"data-star-rating":""}).appendChild(this.el)}},void 0===(s=function(){return o}.apply(i,[]))||(t.exports=s)}(window,document)},,,,,function(t,i,n){n(28),n(59),n(64),n(66),n(68),n(70),n(72),n(74),n(76),n(78),n(80),n(82),n(84),n(86),n(88),n(90),n(92),n(94),n(96),n(98),n(100),n(102),n(104),n(106),n(108),n(110),n(112),n(114),t.exports=n(116)},,,,,,,,,,,,,,,,,,,,,function(t,i,n){"use strict";n.r(i);var s=n(1),e=n.n(s),h=function(){};h.prototype={get:function(t,i,n){this.$(i),this.xhr.open("GET",t,!0),this.xhr.responseType="text",this.Z(n),this.xhr.send()},tt:function(t){return"json"===this.xhr.responseType||!0===this.xhr.json?t({message:this.xhr.statusText},!1):"text"===this.xhr.responseType?t(this.xhr.statusText):void 0},it:function(t){if(0===this.xhr.status||this.xhr.status>=200&&this.xhr.status<300||304===this.xhr.status){if("json"===this.xhr.responseType)return t(this.xhr.response.data,this.xhr.response.success);if("text"===this.xhr.responseType)return t(this.xhr.responseText);if(!0===this.xhr.json){var i=JSON.parse(this.xhr.response);return t(i.data,i.success)}}else this.tt(t)},isFileSupported:function(){var t=document.createElement("INPUT");return t.type="file","files"in t},isFormDataSupported:function(){return!!window.FormData},isUploadSupported:function(){var t=new XMLHttpRequest;return!!(t&&"upload"in t&&"onprogress"in t.upload)},post:function(t,i,n){this.$(i),this.xhr.open("POST",GLSR.ajaxurl,!0),this.xhr.responseType="json",this.xhr.json=!0,this.Z(n),this.xhr.send(this.nt(t))},$:function(t){this.xhr=new XMLHttpRequest,this.xhr.onload=this.it.bind(this,t),this.xhr.onerror=this.tt.bind(this,t)},st:function(t,i,n){return"object"!==e()(i)||i instanceof Date||i instanceof File?t.append(n,i||""):Object.keys(i).forEach(function(s){i.hasOwnProperty(s)&&(t=this.st(t,i[s],n?n[s]:s))}.bind(this)),t},nt:function(t){var i=new FormData,n=Object.prototype.toString.call(t);return"[object FormData]"===n&&(i=t),"[object HTMLFormElement]"===n&&(i=new FormData(t)),"[object Object]"===n&&Object.keys(t).forEach((function(n){i.append(n,t[n])})),i.append("action",GLSR.action),i.append("_ajax_request",!0),i},Z:function(t){for(var i in(t=t||{})["X-Requested-With"]="XMLHttpRequest",t)t.hasOwnProperty(i)&&this.xhr.setRequestHeader(i,t[i])}};var o=h,r=function(t){this.L(t||document)};r.prototype={config:{hiddenClass:"glsr-hidden",hiddenTextSelector:".glsr-hidden-text",readMoreClass:"glsr-read-more",visibleClass:"glsr-visible"},et:function(t){var i=document.createElement("span"),n=document.createElement("a");n.setAttribute("href","#"),n.setAttribute("data-text",t.getAttribute("data-show-less")),n.innerHTML=t.getAttribute("data-show-more"),n.addEventListener("click",this.ht.bind(this)),i.setAttribute("class",this.config.readMoreClass),i.appendChild(n),t.parentNode.insertBefore(i,t.nextSibling)},ht:function(t){t.preventDefault();var i=t.currentTarget,n=i.parentNode.previousSibling,s=i.getAttribute("data-text");n.classList.toggle(this.config.hiddenClass),n.classList.toggle(this.config.visibleClass),i.setAttribute("data-text",i.innerText),i.innerText=s},L:function(t){for(var i=t.querySelectorAll(this.config.hiddenTextSelector),n=0;n<i.length;n++)this.et(i[n])}};var a=r,u=function(t){this.Form=t,this.counter=0,this.id=-1,this.is_submitting=!1,this.recaptchaEl=t.form.querySelector(".glsr-recaptcha-holder"),this.observer=new MutationObserver(function(t){var i=t.pop();i.target&&"visible"!==i.target.style.visibility&&(this.observer.disconnect(),setTimeout(function(){this.is_submitting||this.Form.ot()}.bind(this),250))}.bind(this))};u.prototype={h:function(){this.counter=0,this.id=-1,this.is_submitting=!1,this.recaptchaEl&&(this.recaptchaEl.innerHTML="")},rt:function(){if(-1!==this.id)return this.counter=0,this.at(this.id),void grecaptcha.execute(this.id);setTimeout(function(){this.counter++,this.ut.call(this.Form,this.counter)}.bind(this),1e3)},at:function(t){var i=window.___grecaptcha_cfg.clients[t];for(var n in i)if(i.hasOwnProperty(n)&&"[object String]"===Object.prototype.toString.call(i[n])){var s=document.querySelector("iframe[name=c-"+i[n]+"]");if(s){this.observer.observe(s.parentElement.parentElement,{attributeFilter:["style"],attributes:!0});break}}},ct:function(){this.Form.form.onsubmit=null,this.h(),this.ft()},ft:function(){this.recaptchaEl&&setTimeout(function(){if("undefined"==typeof grecaptcha||void 0===grecaptcha.render)return this.ft();this.id=grecaptcha.render(this.recaptchaEl,{callback:this.ut.bind(this.Form,this.counter),"expired-callback":this.lt.bind(this),isolated:!0},!0)}.bind(this),250)},lt:function(){this.counter=0,this.is_submitting=!1,-1!==this.id&&grecaptcha.reset(this.id)},ut:function(t){if(this.recaptcha.is_submitting=!0,!this.useAjax)return this.dt(),void this.form.submit();this.ut(t)}};var c=u,f=n(2),l=n.n(f),d=function(t,i,n){t&&i.split(" ").forEach((function(i){t.classList[n?"add":"remove"](i)}))},v=function(t){return"."+t.trim().split(" ").join(".")},m=function(t){var i='input[name="'+t.getAttribute("name")+'"]:checked';return t.validation.form.querySelectorAll(i).length},p={email:{fn:function(t){return!t||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}},max:{fn:function(t,i){return!t||("checkbox"===this.type?m(this)<=parseInt(i):parseFloat(t)<=parseFloat(i))}},maxlength:{fn:function(t,i){return!t||t.length<=parseInt(i)}},min:{fn:function(t,i){return!t||("checkbox"===this.type?m(this)>=parseInt(i):parseFloat(t)>=parseFloat(i))}},minlength:{fn:function(t,i){return!t||t.length>=parseInt(i)}},number:{fn:function(t){return!t||!isNaN(parseFloat(t))},priority:2},required:{fn:function(t){return"radio"===this.type||"checkbox"===this.type?m(this):void 0!==t&&""!==t},priority:99,halt:!0}},_=function(t){this.config=GLSR.validationconfig,this.fields=[],this.form=t,this.form.setAttribute("novalidate",""),this.strings=GLSR.validationstrings,this.init()};_.prototype={vt:["required","max","maxlength","min","minlength","pattern"],pt:"input:not([type^=hidden]):not([type^=submit]), select, textarea, [data-glsr-validate]",destroy:function(){for(this.lt();this.fields.length;){var t=this.fields.shift();this._t(t.input),delete t.input.validation}},init:function(){var t=this;[].forEach.call(this.form.querySelectorAll(this.pt),(function(i){t.fields.find((function(t){return t.input.name===i.name}))||"none"!==i.closest(v(t.config.field)).style.display&&t.fields.push(t.bt(i))}))},wt:function(t){t.addEventListener(this.gt(t),this.St.bind(this,t))},Lt:function(t,i,n){[].forEach.call(t,function(t){var s=t.name.replace("data-","");~this.vt.indexOf(s)?this.Rt(i,n,s,t.value):"type"===t.name&&this.Rt(i,n,t.value)}.bind(this))},Rt:function(t,i,n,s){if(p[n]&&(p[n].name=n,t.push(p[n]),s)){var e=s.split(",");e.unshift(null),i[n]=e}},_t:function(t){t.removeEventListener(this.gt(t),this.St.bind(this,t))},lt:function(){for(var t in this.fields)if(this.fields.hasOwnProperty(t)){this.fields[t].errorElements=null;var i=this.fields[t].input.closest(v(this.config.field));d(this.fields[t].input,this.config.input_error,!1),d(this.fields[t].input,this.config.input_valid,!1),d(i,this.config.field_error,!1),d(i,this.config.field_valid,!1)}},gt:function(t){return~["radio","checkbox"].indexOf(t.getAttribute("type"))||"SELECT"===t.nodeName?"change":"input"},bt:function(t){var i={},n=[];return null!==t.offsetParent&&(this.Lt(t.attributes,n,i),this.yt(n),this.wt(t)),t.validation={form:this.form,input:t,params:i,validators:n}},Et:function(t,i){var n=t.input.closest(v(this.config.field));if(d(t.input,this.config.input_error,i),d(t.input,this.config.input_valid,!i),n){d(n,this.config.field_error,i),d(n,this.config.field_valid,!i);var s=n.querySelector(v(this.config.field_message));s.innerHTML=i?t.errors.join("<br>"):"",s.style.display=i?"":"none"}},xt:function(t,i){t.hasOwnProperty("validation")&&this.bt(t),t.validation.errors=i},yt:function(t){t.sort((function(t,i){return(i.priority||1)-(t.priority||1)}))},St:function(t){var i=!0,n=this.fields;for(var s in t instanceof HTMLElement&&(n=[t.validation]),n)if(n.hasOwnProperty(s)){var e=n[s];this.jt(e)?this.Et(e,!1):(i=!1,this.Et(e,!0))}return i},jt:function(t){var i=[],n=!0;for(var s in t.validators)if(t.validators.hasOwnProperty(s)){var e=t.validators[s],h=t.params[e.name]?t.params[e.name]:[];if(h[0]=t.input.value,!e.fn.apply(t.input,h)){n=!1;var o=this.strings[e.name];if(i.push(o.replace(/(\%s)/g,h[1])),!0===e.halt)break}}return t.errors=i,n}};var b=_,w=function(t,i){this.button=i,this.config=GLSR.validationconfig,this.events={submit:this.Ft.bind(this)},this.form=t,this.isActive=!1,this.recaptcha=new c(this),this.stars=null,this.strings=GLSR.validationstrings,this.useAjax=this.Gt(),this.validation=new b(t)};w.prototype={destroy:function(){this.destroyForm(),this.destroyRecaptcha(),this.destroyStarRatings(),this.isActive=!1},destroyForm:function(){this.form.removeEventListener("submit",this.events.submit),this.Tt()},destroyRecaptcha:function(){this.recaptcha.h()},destroyStarRatings:function(){this.stars&&(this.stars.destroy(),delete this.stars)},init:function(){this.isActive||(this.initForm(),this.initStarRatings(),this.initRecaptcha(),this.isActive=!0)},initForm:function(){this.destroyForm(),this.form.addEventListener("submit",this.events.submit)},initRecaptcha:function(){this.recaptcha.ct()},initStarRatings:function(){this.destroyStarRatings(),this.stars=new l.a(this.form.querySelectorAll(".glsr-field-rating select"),{clearable:!1,showText:!1})},dt:function(){this.button.setAttribute("disabled","")},ot:function(){this.button.removeAttribute("disabled")},Ot:function(t,i){var n=!0===i;"unset"!==t.recaptcha?("reset"===t.recaptcha&&this.recaptcha.lt(),n&&(this.recaptcha.lt(),this.form.reset()),this.Mt(t.errors),this.kt(t.message,n),this.ot(),t.form=this.form,document.dispatchEvent(new CustomEvent("site-reviews/after/submission",{detail:t})),n&&""!==t.redirect&&(window.location=t.redirect)):this.recaptcha.rt()},Gt:function(){var t=!0;return[].forEach.call(this.form.elements,(function(i){"file"===i.type&&(t=GLSR.ajax.isFileSupported()&&GLSR.ajax.isUploadSupported())})),t&&!this.form.classList.contains("no-ajax")},Ft:function(t){if(!this.validation.St())return t.preventDefault(),void this.kt(this.strings.errors,!1);this.Tt(),(this.form["g-recaptcha-response"]&&""===this.form["g-recaptcha-response"].value||this.useAjax)&&(t.preventDefault(),this.ut())},Tt:function(){d(this.form,this.config.form_error,!1),this.kt("",null),this.validation.lt()},Mt:function(t){if(t)for(var i in t)if(t.hasOwnProperty(i)){var n=GLSR.nameprefix?GLSR.nameprefix+"["+i+"]":i,s=this.form.querySelector('[name="'+n+'"]');s&&(this.validation.xt(s,t[i]),this.validation.Et(s.validation,"add"))}},kt:function(t,i){var n=this.form.querySelector(v(this.config.form_message));null!==n&&(d(this.form,this.config.form_error,!1===i),d(n,this.config.form_message_failed,!1===i),d(n,this.config.form_message_success,!0===i),n.innerHTML=t)},ut:function(t){GLSR.ajax.isFormDataSupported()?(this.dt(),this.form[GLSR.nameprefix+"[_counter]"].value=t||0,GLSR.ajax.post(this.form,this.Ot.bind(this))):this.kt(this.strings.unsupported,!1)}};var g=function(){for(;GLSR.forms.length;){(t=GLSR.forms.shift()).destroy()}var t,i,n;i=document.querySelectorAll("form.glsr-review-form");for(var s=0;s<i.length;s++)(n=i[s].querySelector("[type=submit]"))&&((t=new w(i[s],n)).init(),GLSR.forms.push(t))},S=g,L=function(t,i){this.paginationEl=t,this.reviewsEl=i,this.R()};L.prototype={config:{hideClass:"glsr-hide",linkSelector:"a.page-numbers",scrollTime:468},Ct:function(){var t=document.getElementById(this.paginationEl.dataset.id);return t||this.reviewsEl},Ot:function(t,i,n){n?(this.paginationEl.innerHTML=i.pagination,this.reviewsEl.innerHTML=i.reviews,this.Nt(this.reviewsEl),this.paginationEl.classList.remove(this.config.hideClass),this.reviewsEl.classList.remove(this.config.hideClass),this.R(),GLSR.urlparameter&&window.history.pushState(null,"",t),new a(this.reviewsEl),document.dispatchEvent(new CustomEvent("site-reviews/after/pagination",{detail:i}))):window.location=t},R:function(){for(var t=this.paginationEl.querySelectorAll(this.config.linkSelector),i=0;i<t.length;i++)t[i].addEventListener("click",this.ht.bind(this))},ht:function(t){var i=this.Ct();if(i){for(var n={},s=0,e=Object.keys(i.dataset);s<e.length;s++){var h=e[s];n[GLSR.nameprefix+"[atts]["+h+"]"]=i.dataset[h]}n[GLSR.nameprefix+"[_action]"]="fetch-paged-reviews",n[GLSR.nameprefix+"[page]"]=t.currentTarget.dataset.page||"",n[GLSR.nameprefix+"[url]"]=t.currentTarget.href||"",this.paginationEl.classList.add(this.config.hideClass),this.reviewsEl.classList.add(this.config.hideClass),t.preventDefault(),GLSR.ajax.post(n,this.Ot.bind(this,t.currentTarget.href))}},Nt:function(t,i){var n;i=i||16;for(var s=0;s<GLSR.ajaxpagination.length;s++)(n=document.querySelector(GLSR.ajaxpagination[s]))&&"fixed"===window.getComputedStyle(n).getPropertyValue("position")&&(i+=n.clientHeight);var e=t.getBoundingClientRect().top-i;e>0||this.Dt({endY:e,offset:window.pageYOffset,startTime:window.performance.now(),startY:t.scrollTop})},Dt:function(t){var i=(window.performance.now()-t.startTime)/this.config.scrollTime;i=i>1?1:i;var n=.5*(1-Math.cos(Math.PI*i)),s=t.startY+(t.endY-t.startY)*n;window.scroll(0,t.offset+s),s!==t.endY&&window.requestAnimationFrame(this.Dt.bind(this,t))}};var R=function(){this.navs=[];var t=document.querySelectorAll(".glsr-ajax-pagination");t.length&&t.forEach(function(t){var i=t.closest(".glsr[data-id="+t.dataset.id);if(i){var n=i.querySelector(".glsr-reviews");n&&this.navs.push(new L(t,n))}}.bind(this))},y=R;window.hasOwnProperty("GLSR")||(window.GLSR={}),window.GLSR.ajax=new o,window.GLSR.forms=[],document.addEventListener("DOMContentLoaded",(function(){for(var t=document.querySelectorAll(".glsr"),i=0;i<t.length;i++){var n=window.getComputedStyle(t[i],null).getPropertyValue("direction");t[i].classList.add("glsr-"+n)}new S,new y,new a}))},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,i){},,,,,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){},,function(t,i){}]);