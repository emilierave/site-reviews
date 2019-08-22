!function(t){"use strict";GLSR.Ajax=function(t,i,s){this.event=i||null,this.form=s||null,this.notice=null,this.request=t||{}},GLSR.Ajax.prototype={post:function(t){this.event?this.t(t):this.i(t)},s:function(t){var i={action:GLSR.action,_ajax_request:!0};if(this.form){var s=new GLSR.Serializer(this.form);s[GLSR.nameprefix]&&(this.request=s[GLSR.nameprefix])}return this.o(t),i[GLSR.nameprefix]=this.request,i},o:function(t){this.request._nonce||(GLSR.nonce[this.request._action]?this.request._nonce=GLSR.nonce[this.request._action]:t&&(this.request._nonce=t.closest("form").find("#_wpnonce").val()))},i:function(i,s){t.post(GLSR.ajaxurl,this.s(s)).done(function(t){"function"==typeof i&&i(t.data,t.success),s&&s.prop("disabled",!1)}).always(function(t){t.data?t.data.notices&&GLSR.Notices(t.data.notices):GLSR.Notices('<div class="notice notice-error inline is-dismissible"><p>Unknown error.</p></div>')})},t:function(i){this.event.preventDefault();var s=t(this.event.currentTarget);s.is(":disabled")||(s.prop("disabled",!0),this.i(i,s))}}}(jQuery),function(t){"use strict";GLSR.Categories=function(){this.taxonomy="site-review-category",this.selector="#taxonomy-"+this.taxonomy+" input:checkbox",t("#bulk-edit").length&&(this.selector="#bulk-edit input:checkbox[id^=in-"+this.taxonomy+"-]"),this.categories=t(this.selector),this.checklist=t("#"+this.taxonomy+"checklist"),this.h()},GLSR.Categories.prototype={u:function(i,s){this.categories=t(this.selector);var n=s.parsed.responses[0].id;this.l("off"),this.p(null,n),this.l("on")},l:function(t){this.categories.length&&this.categories[t]("change",this.p.bind(this))},h:function(){this.l("on"),this.checklist.length&&this.checklist.wpList({addAfter:this.u.bind(this)})},p:function(i,s){s=s||i.target.value,t(this.selector).each(function(){this.checked=this.value===s&&i.target.checked})}}}(jQuery),function(t){"use strict";GLSR.ColorPicker=function(){"object"==typeof t.wp&&"function"==typeof t.wp.wpColorPicker&&t(document).find("input[type=text].color-picker-hex").each(function(){t(this).wpColorPicker(t(this).data("colorpicker")||{})})}}(jQuery),function(){"use strict";GLSR.Forms=function(t){this.el=document.querySelector(t),this.el&&(this.depends=this.el.querySelectorAll("[data-depends]"),this.depends.length&&this.h())},GLSR.Forms.prototype={v:function(t){var i=t.getAttribute("data-depends");if(i)try{return JSON.parse(i)}catch(t){return console.log(i),console.error(t)}},h:function(){for(var t=this.el.elements,i=0;i<t.length;i++)~["INPUT","SELECT"].indexOf(t[i].nodeName)&&t[i].addEventListener("change",this._.bind(this))},g:function(t,i){var s=!1;i=[].concat(i);var n=this.el.querySelectorAll('[name="'+t+'"]');return[].map.call(n,function(t){var n=~this.S(i).indexOf(this.m(t.value));~["checkbox","radio"].indexOf(t.type)?t.checked&&n&&(s=!0):n&&(s=!0)}.bind(this)),s},m:function(t){return!!~["true","on","yes","1"].indexOf(t)||!~["false","off","no","0"].indexOf(t)&&t},S:function(t){return t.map(this.m)},_:function(t){this.depends.forEach(function(i){var s=this.v(i);if(s&&~s.map(function(t){return t.name}).indexOf(t.currentTarget.name)){var n=!0;s.forEach(function(t){this.g(t.name,t.value)||(n=!1)}.bind(this)),this.R(i,n)}}.bind(this))},R:function(t,i){var s=t.closest(".glsr-field");s&&s.classList[i?"remove":"add"]("hidden")}}}(),function(t){"use strict";GLSR.Notices=function(i){i&&(t("#glsr-notices").length||(t("#message.notice").remove(),t("form#post").before('<div id="glsr-notices" />')),t("#glsr-notices").html(i),t(document).trigger("wp-updates-notice-added"))}}(jQuery),function(t){"use strict";GLSR.Pinned=function(){this.el=t("#pinned-status-select"),this.el&&(this.cancel=t("a.cancel-pinned-status"),this.cancel.on("click",this.L.bind(this)),this.edit=t("a.edit-pinned-status"),this.edit.on("click",this.G.bind(this)),this.save=t("a.save-pinned-status"),this.save.on("click",this.k.bind(this))),t("table td.pinned i").on("click",this.C.bind(this))},GLSR.Pinned.prototype={j:function(){this.el.slideUp("fast"),this.edit.show().focus()},L:function(i){i.preventDefault(),this.j(),this.el.find("select").val("0"===t("#hidden-pinned-status").val()?1:0)},G:function(t){t.preventDefault(),this.el.is(":hidden")&&(this.el.slideDown("fast",function(){this.el.find("select").focus()}.bind(this)),this.edit.hide())},k:function(i){i.preventDefault(),this.j(),this.target=i.currentTarget;var s={_action:"toggle-pinned",id:t("#post_ID").val(),pinned:t("#pinned-status").val()};new GLSR.Ajax(s).post(this.T.bind(this))},C:function(t){t.preventDefault(),this.target=t.currentTarget;var i={_action:"toggle-pinned",id:t.currentTarget.getAttribute("data-id")};new GLSR.Ajax(i).post(this.P.bind(this))},T:function(i){t("#pinned-status").val(0|!i.pinned),t("#hidden-pinned-status").val(0|i.pinned),t("#pinned-status-text").text(i.pinned?this.target.dataset.yes:this.target.dataset.no),GLSR.Notices(i.notices)},P:function(t){this.target.classList[t.pinned?"add":"remove"]("pinned")}}}(jQuery),function(t){"use strict";GLSR.Pointers=function(){t.each(GLSR.pointers,function(t,i){this.h(i)}.bind(this))},GLSR.Pointers.prototype={D:function(i){t.post(GLSR.ajaxurl,{action:"dismiss-wp-pointer",pointer:i})},h:function(i){t(i.target).pointer({content:i.options.content,position:i.options.position,close:this.D.bind(null,i.id)}).pointer("open").pointer("sendToTop"),t(document).on("wp-window-resized",function(){t(i.target).pointer("reposition")})}}}(jQuery),function(t,i,s){"use strict";GLSR.Search=function(t,i){this.el=s(t),this.options=i,this.searchTerm=null,this.h()},GLSR.Search.prototype={defaults:{action:null,exclude:[],onInit:null,onResultClick:null,results:{},selected:-1,selectedClass:"glsr-selected-result",selectorEntries:".glsr-strings-table tbody",selectorResults:".glsr-search-results",selectorSearch:".glsr-search-input"},h:function(){this.options=s.extend({},this.defaults,this.options),this.el.length&&(this.options.entriesEl=this.el.parent().find(this.options.selectorEntries),this.options.resultsEl=this.el.find(this.options.selectorResults),this.options.searchEl=this.el.find(this.options.selectorSearch),this.options.searchEl.attr("aria-describedby","live-search-desc"),"function"==typeof this.options.onInit&&this.options.onInit.call(this),this.I())},I:function(){this.options.searchEl.on("input",t.debounce(this.A.bind(this),500)),this.options.searchEl.on("keyup",this.N.bind(this)),this.options.searchEl.on("keydown keypress",function(t){GLSR.keys.ENTER===t.which&&t.preventDefault()}),s(document).on("click",this.V.bind(this)),s(document).on("keydown",this.$.bind(this))},F:function(){void 0!==this.searchRequest&&this.searchRequest.abort()},O:function(){this.F(),this.options.resultsEl.empty(),this.el.removeClass("is-active"),s("body").removeClass("glsr-focus")},U:function(t){var i=this.options.entriesEl.children("tr").eq(t),n=this;i.find("td").css({backgroundColor:"#faafaa"}),i.fadeOut(350,function(){s(this).remove(),n.options.results={},n.H(),n.K()})},W:function(t){s("body").addClass("glsr-focus"),this.options.resultsEl.append(t),this.options.resultsEl.children("span").on("click",this.q.bind(this))},B:function(){this.options.entriesEl.on("click","a.delete",this.J.bind(this)),this.options.entriesEl.sortable({items:"tr",tolerance:"pointer",start:function(t,i){i.placeholder.height(i.helper[0].scrollHeight)},sort:function(t,i){var n=t.pageY-s(this).offsetParent().offset().top-i.helper.outerHeight(!0)/2;i.helper.css({top:n+"px"})}})},M:function(t){this.options.selected+=t,this.options.results.removeClass(this.options.selectedClass),this.options.selected<0&&(this.options.selected=-1,this.options.searchEl.focus()),this.options.selected>=this.options.results.length&&(this.options.selected=this.options.results.length-1),this.options.selected>=0&&this.options.results.eq(this.options.selected).addClass(this.options.selectedClass).focus()},V:function(t){s(t.target).find(this.el).length&&s("body").hasClass("glsr-focus")&&this.O()},$:function(t){if(!s.isEmptyObject(this.options.results)){if(GLSR.keys.ESC===t.which&&this.O(),GLSR.keys.ENTER===t.which||GLSR.keys.SPACE===t.which){var i=this.options.resultsEl.find("."+this.options.selectedClass);i&&i.trigger("click")}GLSR.keys.UP===t.which&&(t.preventDefault(),this.M(-1)),GLSR.keys.DOWN===t.which&&(t.preventDefault(),this.M(1))}},J:function(t){t.preventDefault(),this.U(s(t.currentTarget).closest("tr").index())},q:function(t){t.preventDefault(),"function"==typeof this.options.onResultClick&&this.options.onResultClick.call(this,t),this.O()},A:function(t){if(this.F(),this.searchTerm===t.currentTarget.value&&this.options.results.length)return this.W(this.options.results);if(this.options.resultsEl.empty(),this.options.selected=-1,this.searchTerm=t.currentTarget.value,""===this.searchTerm)return this.X();this.el.addClass("is-active");var s={};s[GLSR.nameprefix]={_action:this.options.action,_nonce:this.el.find("#_search_nonce").val(),exclude:this.options.exclude,search:this.searchTerm},this.searchRequest=i.ajax.post(GLSR.action,s).done(function(t){this.el.removeClass("is-active"),this.W(t.items?t.items:t.empty),this.options.results=this.options.resultsEl.children(),delete this.searchRequest}.bind(this))},N:function(t){GLSR.keys.ESC===t.which&&this.X(),GLSR.keys.ENTER===t.which&&(this.A(t),t.preventDefault())},Y:function(t){t.preventDefault();var i=this.el.find(".description");this.el.find("input#assigned_to").val(""),i.find("a").css({color:"#c00"}),i.fadeOut("fast",function(){s(this).html("").show()})},H:function(){var t=this;this.options.exclude=[],this.options.entriesEl.children("tr").each(function(i){s(this).find(".glsr-string-td2").children().filter(":input").each(function(){var n=s(this),e=n.attr("name").replace(/\[\d+\]/i,"["+i+"]");n.attr("name",e),n.is("[data-id]")&&t.options.exclude.push({id:n.val()})})})},X:function(){this.O(),this.options.results={},this.options.searchEl.val("")},K:function(){var t=this.options.entriesEl.children().length>0?"remove":"add";this.options.entriesEl.parent()[t+"Class"]("glsr-hidden")}}}(window._,window.wp,jQuery),function(t){"use strict";GLSR.Serializer=function(i){return this.data={},this.form=t(i),this.pushes={},this.init()},GLSR.Serializer.prototype={patterns:{validate:/^[a-z_-][a-z0-9_-]*(?:\[(?:\d*|[a-z0-9_-]+)\])*$/i,key:/[a-z0-9_-]+|(?=\[\])/gi,named:/^[a-z0-9_-]+$/i,push:/^$/,fixed:/^\d+$/},addPair:function(i){this.patterns.validate.test(i.name)&&(this.data=t.extend(!0,this.data,this.makeObject(i.name,this.encode(i))))},build:function(t,i,s){return t[i]=s,t},encode:function(i){switch(t('[name="'+i.name+'"]',this.form).attr("type")){case"checkbox":return"on"===i.value||i.value;default:return i.value}},incrementPush:function(t){return void 0===this.pushes[t]&&(this.pushes[t]=0),this.pushes[t]++},init:function(){var i=this.form.serializeArray();if(t.isArray(i))for(var s=0,n=i.length;s<n;s++)this.addPair(i[s]);return this.data},makeObject:function(t,i){for(var s,n=t.match(this.patterns.key);void 0!==(s=n.pop());)if(this.patterns.push.test(s)){var e=this.incrementPush(t.replace(/\[\]$/,""));i=this.build([],e,i)}else this.patterns.fixed.test(s)?i=this.build([],s,i):this.patterns.named.test(s)&&(i=this.build({},s,i));return i}}}(jQuery),function(t){"use strict";GLSR.Shortcode=function(t){this.current=null,this.editor=null,this.create=function(t){if(this.editor=tinymce.get(t),this.editor){var i={_action:"mce-shortcode",shortcode:this.current};new GLSR.Ajax(i).post(this.Z.bind(this))}};var i=document.querySelectorAll(t);i.length&&i.forEach(function(t){var i=t.querySelector("button"),s=t.querySelectorAll(".mce-menu-item");i&&s.length&&this.h(t,i,s)}.bind(this))},GLSR.Shortcode.prototype={tt:{},it:[],h:function(t,i,s){document.addEventListener("click",this.st.bind(this,t,i)),i.addEventListener("click",this.nt.bind(this,t,i)),s.forEach(function(s){s.addEventListener("click",this.et.bind(this,t,i))}.bind(this))},ot:function(){tinymce.execCommand("GLSR_Shortcode")},ht:function(){t("#scTemp").length?this.ot():(t("body").append('<textarea id="scTemp" style="display:none!important;"/>'),tinymce.init({elements:"scTemp",external_plugins:GLSR.tinymce,mode:"exact",plugins:["glsr_shortcode","wplink"]}),setTimeout(function(){this.ot()}.bind(this),200))},D:function(i,s){t(s).removeClass("active"),t(i).find(".glsr-mce-menu").hide()},ct:function(){var i=t("#scTemp");i.length&&(tinymce.get("scTemp").remove(),i.remove()),this.tt={},this.it=[]},Z:function(t){if(t){if(0===t.body.length)return window.send_to_editor("["+t.shortcode+"]"),void this.ct();var i=this.rt(t);t.ok.constructor===Array&&(i.buttons[0].text=t.ok[0],i.buttons[0].onclick="close",delete i.buttons[1]),this.editor.windowManager.open(i)}},ut:function(t){for(var i in this.tt=t,this.it=[],t)t.hasOwnProperty(i)&&(this.at(i),this.lt(i),this.dt(i));this.tt.hide=this.it.join(",")},at:function(i){"count"!==i||t.isNumeric(this.tt[i])||(this.tt[i]="")},lt:function(t){if(GLSR.hideoptions.hasOwnProperty(this.current)){var i=t.substring("hide_".length);-1!==Object.keys(GLSR.hideoptions[this.current]).indexOf(i)&&(this.tt[t]&&this.it.push(i),delete this.tt[t])}},dt:function(t){"id"===t&&(this.tt[t]=(+new Date).toString(36))},st:function(i,s,n){t(n.target).closest(t(i)).length||this.D(i,s)},nt:function(t,i,s){s.preventDefault(),s.currentTarget.classList.contains("active")?this.D(t,i):this.ft(t,i)},et:function(t,i,s){s.preventDefault(),this.current=s.currentTarget.dataset.shortcode,this.current&&(tinymce.get(window.wpActiveEditor)?this.ot():this.ht(),setTimeout(function(){this.D(t,i)}.bind(this),100))},ft:function(i,s){t(s).addClass("active"),t(i).find(".glsr-mce-menu").show()},pt:function(t){return[{classes:"btn glsr-btn primary",onclick:this.vt.bind(this),text:t.ok},{onclick:"close",text:t.close}]},rt:function(t){return{title:t.title,body:t.body,classes:"glsr-mce-popup",minWidth:320,buttons:this.pt(t),onsubmit:this._t.bind(this,t),onclose:this.ct.bind(this)}},_t:function(t,i){var s="";for(var n in this.ut(i.data),this.tt)this.tt.hasOwnProperty(n)&&""!==this.tt[n]&&(s+=" "+n+'="'+this.tt[n]+'"');window.send_to_editor("["+t.shortcode+s+"]")},vt:function(){var t=this.editor.windowManager.getWindows()[0];this.gt(t)&&t.submit()},gt:function(t){var i,s=!0,n=GLSR.shortcodes[this.current];for(var e in n)if(n.hasOwnProperty(e)&&void 0!==(i=t.find("#"+e)[0])&&""===i.state.data.value){s=!1,alert(n[e]);break}return s}}}(jQuery),function(t){"use strict";GLSR.Status=function(t){var i=document.querySelectorAll(t);i.length&&i.forEach(function(t){t.addEventListener("click",this.St)}.bind(this))},GLSR.Status.prototype={St:function(i){var s=i.currentTarget.href.match(/post=([0-9]+)/),n=i.currentTarget.href.match(/action=([a-z]+)/);if(null!==s&&null!==n){var e={_action:"change-status",_nonce:GLSR.nonce["change-status"],post_id:s[1],status:n[1]};new GLSR.Ajax(e,i).post(function(s){if(s.class){var n=t(i.target);n.closest("tr").removeClass("status-pending status-publish").addClass(s.class),n.closest("td.column-title").find("strong").html(s.link),s.counts&&(n.closest(".wrap").find("ul.subsubsub").html(s.counts),t("#menu-posts-site-review").find(".awaiting-mod").removeClass().addClass("awaiting-mod count-"+s.pending).find(".pending-count").html(s.pending))}})}}}}(jQuery),function(t){"use strict";GLSR.Sync=function(){this.button=t("button#sync-reviews"),this.progressbar=t(".glsr-progress"),this.service=null,t("form").on("click","#sync-reviews",this.Rt.bind(this)),t(document).on("wp-window-resized",this.wt),t(window).on("hashchange",this.wt),this.wt()},GLSR.Sync.prototype={Lt:function(i){t(".service-"+this.service+" td.column-last_sync").text(i.last_sync),t(".service-"+this.service+" td.column-total_fetched a").text(i.total),this.Gt(!1)},Rt:function(i){i.preventDefault(),this.service=t('[name="'+GLSR.nameprefix+'[service]"]').val(),this.service&&(this.Gt(!0),this.yt())},wt:function(){var i=t(".glsr-progress").width();i&&t(".glsr-progress span").width(i)},yt:function(){var t={_action:"sync-reviews",service:this.service,stage:"fetch"};new GLSR.Ajax(t).post(this.bt.bind(this))},bt:function(t){var i={_action:"sync-reviews",job_id:t.job_id,service:this.service,stage:"progress"},s=t.finished?this.kt.bind(this,t):this.bt.bind(this);this.xt(t.message),this.Ct(t.percent),setTimeout(function(){new GLSR.Ajax(i).post(s)},1500)},kt:function(t){var i=0;try{i=t.meta.pagination.current_page}catch(t){}var s={_action:"sync-reviews",page:i+1,service:this.service,stage:"reviews"};this.xt(t.message),t.percent_synced&&t.percent_synced>=100?this.Lt(t):new GLSR.Ajax(s).post(this.kt.bind(this))},xt:function(i){t(".glsr-progress-status",this.progressbar).text(i)},Ct:function(i){i=(i||0)+"%",t(".glsr-progress-bar",this.progressbar).outerWidth(i)},Gt:function(t){if(!0===t&&(this.xt(this.progressbar.data("active-text")),this.Ct(),this.button.prop("disabled",!0),window.requestAnimationFrame(function(){this.progressbar.addClass("active")}.bind(this))),!1===t)return this.service=null,this.button.prop("disabled",!1),void this.progressbar.removeClass("active");window.requestAnimationFrame(this.Gt.bind(this))}}}(jQuery),function(t){"use strict";GLSR.Tabs=function(i){this.options=t.extend({},this.defaults,i),this.active=document.querySelector("input[name=_active_tab]"),this.referrer=document.querySelector("input[name=_wp_http_referer]"),this.tabs=document.querySelectorAll(this.options.tabSelector),this.views=document.querySelectorAll(this.options.viewSelector),this.active&&this.referrer&&this.tabs&&this.views&&this.h()},GLSR.Tabs.prototype={defaults:{tabSelector:".glsr-nav-tab",viewSelector:".glsr-nav-view"},h:function(){var i=this;t(window).on("hashchange",i.jt.bind(i)),[].forEach.call(i.tabs,function(t,s){(location.hash?t.getAttribute("href").slice(1)===location.hash.slice(2):0===s)&&i.Tt(t),t.addEventListener("click",i.St.bind(i)),t.addEventListener("touchend",i.St.bind(i))}.bind(i)),t(i.options.viewSelector).on("click","a",function(){var s=t(t(this).data("expand")),n=s.parent();n.removeClass("collapsed"),i.zt(n),n.removeClass("collapsed"),s.removeClass("closed").find(".handlediv").attr("aria-expanded",!0)})},Et:function(t){return t?"add":"remove"},St:function(t){t.preventDefault();var i=t.currentTarget;i.blur(),this.Qt(i),this.Tt(i),location.hash="!"+i.getAttribute("href").slice(1)},jt:function(){for(var t=location.hash.split("#!")[1],i=0;i<this.views.length;i++)if(t===this.views[i].id){this.Tt(this.tabs[i]);break}},Pt:function(t){var i=this.referrer.value.split("#")[0]+"#!"+this.views[t].id;this.referrer.value=i},Tt:function(t){[].forEach.call(this.tabs,function(i,s){var n=this.Et(i===t);"add"===n&&(this.active.value=this.views[s].id,this.Pt(s),this.Dt(s)),i.classList[n]("nav-tab-active")}.bind(this))},Dt:function(t){[].forEach.call(this.views,function(i,s){var n=this.Et(s!==t);i.classList[n]("ui-tabs-hide")}.bind(this))},zt:function(t){var i=t.hasClass("collapsed")?"remove":"add";t[i+"Class"]("collapsed").find(".glsr-card.postbox")[i+"Class"]("closed").find(".handlediv").attr("aria-expanded","add"!==i)},Qt:function(i){if(i.classList.contains("nav-tab-active")){var s=t(i.getAttribute("href"));this.zt(s)}}}}(jQuery),function(t){"use strict";GLSR.TextareaResize=function(){var i=document.querySelector("#contentdiv > textarea");i&&(this.It(i),t(document).on("wp-window-resized.editor-expand",function(){this.It(i)}.bind(this)))},GLSR.TextareaResize.prototype={It:function(t){var i=t.scrollHeight>320?t.scrollHeight:320;t.style.height="auto",t.style.height=i+"px"}}}(jQuery),function(t){"use strict";GLSR.Tools=function(){t("form").on("click","#clear-console",this.At,this.St.bind(this)),t("form").on("click","#fetch-console",this.At,this.St.bind(this)),t("form").on("click","#count-reviews",this.St.bind(this))},GLSR.Tools.prototype={At:function(i,s){s&&t("#log-file").val(i.console)},St:function(t){new GLSR.Ajax({},t,t.currentTarget.closest("form")).post(function(i,s){"function"==typeof t.data&&t.data(i,s)})}}}(jQuery),GLSR.keys={DOWN:40,ENTER:13,ESC:27,SPACE:32,UP:38},jQuery(function(t){GLSR.shortcode=new GLSR.Shortcode(".glsr-mce"),GLSR.ColorPicker(),new GLSR.Categories,new GLSR.Forms("form.glsr-form"),new GLSR.Pinned,new GLSR.Pointers,new GLSR.Search("#glsr-search-posts",{action:"search-posts",onInit:function(){this.el.on("click",".glsr-remove-button",this.Y.bind(this))},onResultClick:function(i){var s=t(i.currentTarget),n=wp.template("glsr-assigned-post"),e={url:s.data("url"),title:s.text()};n&&(this.el.find("input#assigned_to").val(s.data("id")),this.el.find(".description").html(n(e)),this.el.on("click",".glsr-remove-button",this.Y.bind(this)),this.X())}}),new GLSR.Search("#glsr-search-translations",{action:"search-translations",onInit:function(){this.B()},onResultClick:function(i){var s=t(i.currentTarget),n=s.data("entry"),e=wp.template("glsr-string-"+(n.p1?"plural":"single"));n.index=this.options.entriesEl.children().length,n.prefix=this.options.resultsEl.data("prefix"),e&&(this.options.entriesEl.append(e(n)),this.options.exclude.push({id:n.id}),this.options.results=this.options.results.filter(function(t,i){return i!==s.get(0)})),this.K()}}),new GLSR.Status("a.glsr-change-status"),new GLSR.Tabs,new GLSR.TextareaResize,new GLSR.Tools,new GLSR.Sync,t("a#revert").on("click",function(){t(this).parent().find(".spinner").addClass("is-active")}),t(".glsr-card.postbox").addClass("closed").find(".handlediv").attr("aria-expanded",!1).closest(".glsr-nav-view").addClass("collapsed"),t(".glsr-card.postbox .glsr-card-header").on("click",function(){var i=t(this).parent(),s=i.closest(".glsr-nav-view"),n=i.hasClass("closed")?"remove":"add";i[n+"Class"]("closed").find(".handlediv").attr("aria-expanded","add"!==n),n=s.find(".glsr-card.postbox").not(".closed").length>0?"remove":"add",s[n+"Class"]("collapsed")}),t(".glsr-support-step").not(":checked").length<1&&t(".glsr-card-result").removeClass("hidden"),t(".glsr-support-step").on("change",function(){var i=t(".glsr-support-step").not(":checked").length>0?"add":"remove";t(".glsr-card-result")[i+"Class"]("hidden")})});