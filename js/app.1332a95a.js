(function(e){function t(t){for(var r,a,s=t[0],c=t[1],l=t[2],u=0,f=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function a(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"1917e56e"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=i[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=i[e]=[t,r]}));t.push(n[2]=r);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=a(e);var l=new Error;o=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}i[e]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:c})}),12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],a=n("2877"),s={},c=Object(a["a"])(s,i,o,!1,null,null,null),l=c.exports,u=n("9483");Object(u["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7");var d=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"lds-ellipsis"},[n("div"),n("div"),n("div"),n("div")]),n("form",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"file_form"},[n("input",{ref:"file_select",staticClass:"md-file",attrs:{type:"file",multiple:""},on:{change:e.fileSelected}})]),n("div",{staticClass:"navbar",attrs:{"is-block":""}},[n("b-navbar-item",{attrs:{tag:"router-link",to:{path:"/"}}},[n("img",{attrs:{src:"https://imjoy.io/static/img/imjoy-logo-black.png",alt:"ImJoy"}})]),e.config.show_file_menu?n("b-navbar-dropdown",{attrs:{label:"File"}},[n("b-navbar-item",{attrs:{disabled:e.loading,href:"#"},on:{click:function(t){return e.$refs.file_select.click()}}},[n("b-icon",{attrs:{icon:"file-code-outline"}}),e._v(" Open Local File ")],1),e._l(e.templates,(function(t){return n("b-navbar-item",{directives:[{name:"show",rawName:"v-show",value:e.config.enable_tempates,expression:"config.enable_tempates"}],key:t.name,attrs:{href:"#"},on:{click:function(n){return e.loadTemplate(t.url)}}},[n("b-icon",{attrs:{icon:"file-star-outline"}}),e._v(e._s(t.name)+" template ")],1)})),n("b-navbar-item",{directives:[{name:"show",rawName:"v-show",value:e.config.enable_save,expression:"config.enable_save"}],attrs:{href:"#"},on:{click:function(t){return e.saveFile()}}},[n("b-icon",{attrs:{icon:"file-download-outline"}}),e._v(" Save File ")],1)],2):e._e(),e.config.show_install&&e.api&&e.api.installPlugin?n("b-navbar-item",{attrs:{disabled:e.loading,href:"#"},on:{click:e.install}},[n("b-icon",{attrs:{icon:"harddisk-plus"}}),e._v(" Install ")],1):e._e(),e.originalSource&&e.codeChanged?n("b-navbar-item",{attrs:{href:"#"},on:{click:e.resetSourceCode}},[n("b-icon",{attrs:{icon:"backup-restore"}}),e._v(" Reset ")],1):e._e(),e._l(e.config.ui_elements||{},(function(t,r){return["button"===t.type?n("b-navbar-item",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"elm.visible"}],key:r,style:t.style,attrs:{href:"#"},on:{click:function(n){return t.callback(e.code)}}},[t.icon?n("b-icon",{attrs:{icon:t.icon}}):e._e(),e._v(" "+e._s(t.label)+" ")],1):"dropdown"===t.type?n("b-navbar-dropdown",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"elm.visible"}],key:r,attrs:{label:t.label}},e._l(t.items,(function(t){return n("b-navbar-item",{key:t.label,style:t.style,attrs:{href:"#"},on:{click:function(n){return t.callback(e.code)}}},[e._v(" "+e._s(t.label)+" ")])})),1):e._e()]})),e.config.enable_run_button?n("b-navbar-item",{attrs:{disabled:e.loading,href:"#"},on:{click:e.run}},[n("b-icon",{attrs:{icon:"play"}}),e._v(" Run ")],1):e._e(),e.pluginAPI?n("b-navbar-dropdown",{attrs:{disabled:e.loading,label:"Plugin API"}},e._l(e.pluginAPI,(function(t,r){return n("b-navbar-item",{key:r,attrs:{href:"#"},on:{click:function(t){return e.runPluginAPI(r)}}},[e._v(" "+e._s(r)+" ")])})),1):e._e(),e.config.enable_stop_button?n("b-navbar-item",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticStyle:{color:"#ff0080cf"},attrs:{href:"#"},on:{click:e.stop}},[n("b-icon",{attrs:{icon:"stop"}}),e._v(" Stop ")],1):e._e()],2),n("div",{staticClass:"editor"},[n("codemirror",{ref:"cmEditor",attrs:{options:e.cmOptions},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}})],1)])},p=[],m=(n("99af"),n("caad"),n("b0c0"),n("b64b"),n("25f0"),n("8a79"),n("96cf"),n("1da1")),h=n("b85c"),g=n("9224");function b(e){return v.apply(this,arguments)}function v(){return v=Object(m["a"])(regeneratorRuntime.mark((function e(t){var n,r,i,o,a,s,c,l,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.loadSourceCode,r=t.setContent,i=t.getContent,o=t.setLoader,a=t.updateUIElement,s=t.addUIElement,c=t.removeUIElement,e.next=3,window.imjoyLoader.loadImJoyRPC({api_version:"0.2.3"});case 3:return l=e.sent,e.next=6,l.setupRPC({name:"ImJoyFiddle",version:"0.1.0",description:"ImJoyFiddle -- a playground for ImJoy plugins",type:"rpc-window",defaults:{}});case 6:return u=e.sent,d={setup:function(){u.log("ImJoyFiddle loaded successfully.")},run:function(e){return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e&&e.data&&e.data.code&&n(e.data.code,e.config);case 1:case"end":return t.stop()}}),t)})))()},setContent:r,getContent:i,setLoader:o,updateUIElement:a,addUIElement:s,removeUIElement:c},u.export(d),e.abrupt("return",u);case 10:case"end":return e.stop()}}),e)}))),v.apply(this,arguments)}var y=n("8f94"),w=(n("a7be"),n("9603"),n("f9d4"),n("db91"),n("d69f"),n("959b"),n("693d"),n("31c5"),n("9948"),n("b933"),n("9c7b"),n("715d"),n("23de"),n("4ba6"),n("8c33"),n("7289"),n("2aed"),n("d72f"),n("0b6c"),n("9a48"),n("697e"),n("aedd"),n("164b"),n("4895"),n("cbc8"),n("9f09"),n("a2c1"),{name:"htmlmixed",tags:{docs:[[null,null,"markdown"]],config:[["lang",/^json$/,"javascript"],["lang",/^yaml$/,"yaml"],[null,null,"javascript"]],script:[["lang",/^python$/,"python"],[null,null,"javascript"]]}}),_={name:"ImJoyEditor",components:{codemirror:y["codemirror"]},data:function(){var e=this;return{config:{show_file_menu:!0,show_install:!1},version:g["a"],code:"",loading:!1,originalSource:null,api:null,plugin:null,templates:[{name:"empty",url:null},{name:"window",url:"https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/windowTemplate.imjoy.html"},{name:"web-worker",url:"https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/webWorkerTemplate.imjoy.html"},{name:"web-python",url:"https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/webPythonTemplate.imjoy.html"},{name:"native-python",url:"https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/nativePythonTemplate.imjoy.html"}],cmOptions:{tabSize:4,styleActiveLine:!0,lineNumbers:!0,line:!0,foldGutter:!0,styleSelectedText:!0,keyMap:"sublime",indentUnit:0,smartIndent:!0,matchBrackets:!0,showCursorWhenSelecting:!0,theme:"mbo",hintOptions:{completeSingle:!1},gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],mode:w,extraKeys:{Ctrl:"autocomplete",F11:function(e){e.setOption("fullScreen",!e.getOption("fullScreen"))},Esc:function(e){e.getOption("fullScreen")&&e.setOption("fullScreen",!1)},Tab:function(t){t.somethingSelected()?t.indentSelection("add"):e.config.indentWithTabs?t.replaceSelection("\t","end","+input"):t.execCommand("insertSoftTab")},"Shift-Tab":function(e){e.indentSelection("subtract")}}}}},mounted:function(){var e=this;window.self!==window.top&&b({setContent:function(e){this.code=e},getContent:function(){return this.code},loadSourceCode:this.loadSourceCode,setLoader:this.setLoader,updateUIElement:this.updateUIElement,addUIElement:this.addUIElement,removeUIElement:this.removeUIElement}).then((function(t){e.api=t})),window.addEventListener("resize",this.updateSize),this.updateSize()},beforeDestroy:function(){window.removeEventListener("resize",this.updateSize)},computed:{codeChanged:function(){return this.originalSource&&this.originalSource!==this.code},editor:function(){return this.$refs.cmEditor.codemirror},pluginAPI:function(){if(!this.plugin)return null;for(var e={},t=0,n=Object.keys(this.plugin);t<n.length;t++){var r=n[t];["on","off","_rintf","emit","setup"].includes(r)||(e[r]=this.plugin[r])}return e}},methods:{fileSelected:function(){if(this.$refs.file_select.files){var e=this.$refs.file_select.files[0];this.loadCodeFromFile(e)}},loadCodeFromFile:function(e){var t=this;if(e){var n=new FileReader;n.onload=function(){var r=n.result;t.originalSource=r,e.name.endsWith(".js")?t.cmOptions.mode={name:"javascript"}:e.name.endsWith(".py")?t.cmOptions.mode={name:"python"}:e.name.endsWith(".imjoy.html")&&(t.cmOptions.mode=w),t.editor.setValue(r)},n.onerror=function(e){console.error(e),t.api.showMessage("Failed to load plugin source code, error: ".concat(e)),t.$forceUpdate()},n.readAsText(e)}},loadSourceCode:function(e,t){var n=this;this.originalSource=e,this.editor.setValue(e),this.config=t||{};for(var r=function(){var e=o[i],t=n.config.ui_elements[e];t.shortcut&&(n.cmOptions.extraKeys[t.shortcut]=function(){t.callback(n.code)})},i=0,o=Object.keys(this.config.ui_elements);i<o.length;i++)r();if(this.config.lang=this.config.lang||"html","html"===this.config.lang?this.cmOptions.mode=w:"js"===this.config.lang||"javascript"===this.config.lang?this.cmOptions.mode={name:"javascript"}:"py"!==this.config.lang&&"python"!==this.config.lang||(this.cmOptions.mode={name:"python"}),void 0===this.config.show_file_menu&&(this.config.show_file_menu=!0),this.config.fold)if(Array.isArray(this.config.fold)){var a,s=Object(h["a"])(this.config.fold);try{for(s.s();!(a=s.n()).done;){var c=a.value;this.editor.foldCode(this.editor.constructor.Pos(c,0))}}catch(l){s.e(l)}finally{s.f()}}else this.editor.foldCode(this.editor.constructor.Pos(this.config.fold,0))},resetSourceCode:function(){this.originalSource&&this.editor.setValue(this.originalSource)},updateSize:function(){var e=document.body.getBoundingClientRect();this.editor.setSize(e.width,e.height-52),setTimeout(this.editor.refresh(),1)},loadTemplate:function(e){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e){n.next=3;break}return t.code="",n.abrupt("return");case 3:return n.next=5,fetch(e).then((function(e){return e.blob()}));case 5:return r=n.sent,n.next=8,new Response(r).text();case 8:i=n.sent,t.code=i;case 10:case"end":return n.stop()}}),n)})))()},install:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,t.next=4,e.api.installPlugin({code:e.editor.getValue(),namespace:e.config.namespace});case 4:e.plugin=t.sent,e.api.showMessage("Successfully installed plugin."),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.api.showMessage("Failed to install plugin, error: "+t.t0.toString());case 11:return t.prev=11,e.loading=!1,t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,8,11,14]])})))()},run:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,e.api.showProgress(0),t.next=5,e.api.getPlugin(e.editor.getValue(),{namespace:e.config.namespace});case 5:if(e.plugin=t.sent,e.loading){t.next=9;break}return e.plugin=null,t.abrupt("return");case 9:if(e.loading){t.next=11;break}return t.abrupt("return");case 11:if(!e.plugin.run){t.next=15;break}return t.next=14,e.plugin.run({config:{},data:{}});case 14:return t.abrupt("return",t.sent);case 15:if(e.loading){t.next=17;break}return t.abrupt("return");case 17:t.next=22;break;case 19:t.prev=19,t.t0=t["catch"](0),e.api.showMessage("Failed to load plugin, error: "+t.t0.toString());case 22:return t.prev=22,e.loading=!1,e.api.showProgress(100),t.finish(22);case 26:case"end":return t.stop()}}),t,null,[[0,19,22,26]])})))()},setLoader:function(e){this.loading=e,this.$forceUpdate()},updateUIElement:function(e,t){for(var n=this.config.ui_elements[e],r=0,i=Object.keys(t);r<i.length;r++){var o=i[r];n[o]=t[o]}},addUIElement:function(e,t){this.config.ui_elements[e]=t,this.$forceUpdate()},removeUIElement:function(e){delete this.config.ui_elements[e],this.$forceUpdate()},stop:function(){this.loading=!1},runPluginAPI:function(e){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(n.prev=0,t.loading=!0,"function"!==typeof t.plugin[e]){n.next=12;break}if("run"!==e){n.next=8;break}return n.next=6,t.plugin[e]({config:{},data:{}});case 6:n.next=10;break;case 8:return n.next=10,t.plugin[e]();case 10:n.next=13;break;case 12:t.api.alert(JSON.stringify(t.plugin[e]));case 13:n.next=18;break;case 15:n.prev=15,n.t0=n["catch"](0),t.api.showMessage("Failed to run api function (".concat(e,"), error: ").concat(n.t0));case 18:return n.prev=18,t.loading=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})))()},saveFile:function(){this.api.exportFile(this.editor.getValue(),"myPlugin.imjoy.html")}}},k=_,x=(n("d703"),Object(a["a"])(k,f,p,!1,null,null,null)),S=x.exports;r["a"].use(d["a"]);var j=[{path:"/",redirect:{name:"App"}},{path:"/app",name:"App",component:S},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],O=new d["a"]({base:"/",routes:j}),I=O,C=n("289d"),P=(n("5363"),n("5abe"),n("4de4"),n("d81d"),n("2f62"));r["a"].use(P["a"]);var L=new P["a"].Store({state:{layers:{},layer_configs:[],activeSliders:null,currentLayer:null,map:null},actions:{addLayer:function(e,t){e.commit("addLayer",t),r["a"].nextTick((function(){t.init&&t.init().then((function(n){n||t._add_layer_promise&&t._add_layer_promise.reject("Failed to create layer for "+t.name),n.config=t,n.setVisible(t.visible),n.getLayerAPI=n.getLayerAPI||function(){},e.commit("initialized",n),e.commit("setCurrentLayer",n.config),e.commit("sortLayers"),t._add_layer_promise&&(t._add_layer_promise.resolve(n),delete t._add_layer_promise)})).catch((function(e){t._add_layer_promise?(t._add_layer_promise.reject(e),delete t._add_layer_promise):console.error(e)}))}))}},mutations:{sortLayers:function(e){for(var t=0;t<e.layer_configs.length;t++)e.layers[e.layer_configs[t].id]?e.layers[e.layer_configs[t].id].setZIndex(t):console.warn("Layer not ready",e.layer_configs[t])},initialized:function(e,t){e.layers[t.config.id]=t,t.setZIndex(e.layer_configs.length-1)},addLayer:function(e,t){void 0===t.visible&&(t.visible=!0),e.layer_configs.push(t)},removeLayer:function(e,t){t.selected=!1,e.layer_configs=e.layer_configs.filter((function(e){return e.id!==t.id}))},clearLayers:function(e){e.layer_configs=[]},toggleVisible:function(e,t){t.visible=!t.visible},setCurrentLayer:function(e,t){e.currentLayer!==t&&(e.currentLayer&&(e.currentLayer.selected=!1),e.currentLayer=t,t.sliders&&(e.activeSliders=t.sliders),t.selected=!0)},setMap:function(e,t){e.map=t}}});r["a"].use(C["a"]),r["a"].config.productionTip=!1,new r["a"]({router:I,render:function(e){return e(l)},store:L}).$mount("#app")},6271:function(e,t,n){},9224:function(e){e.exports=JSON.parse('{"a":"0.1.0"}')},d703:function(e,t,n){"use strict";var r=n("6271"),i=n.n(r);i.a}});
//# sourceMappingURL=app.1332a95a.js.map