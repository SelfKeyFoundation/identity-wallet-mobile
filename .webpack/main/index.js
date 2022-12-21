(()=>{var e={906:(e,r,t)=>{var s=t(17),n=t(81).spawn,o=t(601)("electron-squirrel-startup"),a=t(298).app,i=function(e,r){var t=s.resolve(s.dirname(process.execPath),"..","Update.exe");o("Spawning `%s` with args `%s`",t,e),n(t,e,{detached:!0}).on("close",r)};e.exports=function(){if("win32"===process.platform){var e=process.argv[1];o("processing squirrel command `%s`",e);var r=s.basename(process.execPath);if("--squirrel-install"===e||"--squirrel-updated"===e)return i(["--createShortcut="+r],a.quit),!0;if("--squirrel-uninstall"===e)return i(["--removeShortcut="+r],a.quit),!0;if("--squirrel-obsolete"===e)return a.quit(),!0}return!1}()},84:(e,r,t)=>{function s(){var e;try{e=r.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(r=e.exports=t(750)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},r.formatArgs=function(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+r.humanize(this.diff),t){var s="color: "+this.color;e.splice(1,0,s,"color: inherit");var n=0,o=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(n++,"%c"===e&&(o=n))})),e.splice(o,0,s)}},r.save=function(e){try{null==e?r.storage.removeItem("debug"):r.storage.debug=e}catch(e){}},r.load=s,r.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},r.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),r.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],r.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},r.enable(s())},750:(e,r,t)=>{var s;function n(e){function t(){if(t.enabled){var e=t,n=+new Date,o=n-(s||n);e.diff=o,e.prev=s,e.curr=n,s=n;for(var a=new Array(arguments.length),i=0;i<a.length;i++)a[i]=arguments[i];a[0]=r.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");var c=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,(function(t,s){if("%%"===t)return t;c++;var n=r.formatters[s];if("function"==typeof n){var o=a[c];t=n.call(e,o),a.splice(c,1),c--}return t})),r.formatArgs.call(e,a);var u=t.log||r.log||console.log.bind(console);u.apply(e,a)}}return t.namespace=e,t.enabled=r.enabled(e),t.useColors=r.useColors(),t.color=function(e){var t,s=0;for(t in e)s=(s<<5)-s+e.charCodeAt(t),s|=0;return r.colors[Math.abs(s)%r.colors.length]}(e),"function"==typeof r.init&&r.init(t),t}(r=e.exports=n.debug=n.default=n).coerce=function(e){return e instanceof Error?e.stack||e.message:e},r.disable=function(){r.enable("")},r.enable=function(e){r.save(e),r.names=[],r.skips=[];for(var t=("string"==typeof e?e:"").split(/[\s,]+/),s=t.length,n=0;n<s;n++)t[n]&&("-"===(e=t[n].replace(/\*/g,".*?"))[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")))},r.enabled=function(e){var t,s;for(t=0,s=r.skips.length;t<s;t++)if(r.skips[t].test(e))return!1;for(t=0,s=r.names.length;t<s;t++)if(r.names[t].test(e))return!0;return!1},r.humanize=t(121),r.names=[],r.skips=[],r.formatters={}},601:(e,r,t)=>{"undefined"!=typeof process&&"renderer"===process.type?e.exports=t(84):e.exports=t(536)},536:(e,r,t)=>{var s=t(224),n=t(837);(r=e.exports=t(750)).init=function(e){e.inspectOpts={};for(var t=Object.keys(r.inspectOpts),s=0;s<t.length;s++)e.inspectOpts[t[s]]=r.inspectOpts[t[s]]},r.log=function(){return a.write(n.format.apply(n,arguments)+"\n")},r.formatArgs=function(e){var t=this.namespace;if(this.useColors){var s=this.color,n="  [3"+s+";1m"+t+" [0m";e[0]=n+e[0].split("\n").join("\n"+n),e.push("[3"+s+"m+"+r.humanize(this.diff)+"[0m")}else e[0]=(new Date).toUTCString()+" "+t+" "+e[0]},r.save=function(e){null==e?delete process.env.DEBUG:process.env.DEBUG=e},r.load=i,r.useColors=function(){return"colors"in r.inspectOpts?Boolean(r.inspectOpts.colors):s.isatty(o)},r.colors=[6,2,3,4,5,1],r.inspectOpts=Object.keys(process.env).filter((function(e){return/^debug_/i.test(e)})).reduce((function(e,r){var t=r.substring(6).toLowerCase().replace(/_([a-z])/g,(function(e,r){return r.toUpperCase()})),s=process.env[r];return s=!!/^(yes|on|true|enabled)$/i.test(s)||!/^(no|off|false|disabled)$/i.test(s)&&("null"===s?null:Number(s)),e[t]=s,e}),{});var o=parseInt(process.env.DEBUG_FD,10)||2;1!==o&&2!==o&&n.deprecate((function(){}),"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();var a=1===o?process.stdout:2===o?process.stderr:function(e){var r;switch(process.binding("tty_wrap").guessHandleType(e)){case"TTY":(r=new s.WriteStream(e))._type="tty",r._handle&&r._handle.unref&&r._handle.unref();break;case"FILE":(r=new(t(147).SyncWriteStream)(e,{autoClose:!1}))._type="fs";break;case"PIPE":case"TCP":(r=new(t(808).Socket)({fd:e,readable:!1,writable:!0})).readable=!1,r.read=null,r._type="pipe",r._handle&&r._handle.unref&&r._handle.unref();break;default:throw new Error("Implement me. Unknown stream file type!")}return r.fd=e,r._isStdio=!0,r}(o);function i(){return process.env.DEBUG}r.formatters.o=function(e){return this.inspectOpts.colors=this.useColors,n.inspect(e,this.inspectOpts).split("\n").map((function(e){return e.trim()})).join(" ")},r.formatters.O=function(e){return this.inspectOpts.colors=this.useColors,n.inspect(e,this.inspectOpts)},r.enable(i())},121:e=>{var r=1e3,t=60*r,s=60*t,n=24*s;function o(e,r,t){if(!(e<r))return e<1.5*r?Math.floor(e/r)+" "+t:Math.ceil(e/r)+" "+t+"s"}e.exports=function(e,a){a=a||{};var i,c=typeof e;if("string"===c&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var o=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(o){var a=parseFloat(o[1]);switch((o[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*a;case"days":case"day":case"d":return a*n;case"hours":case"hour":case"hrs":case"hr":case"h":return a*s;case"minutes":case"minute":case"mins":case"min":case"m":return a*t;case"seconds":case"second":case"secs":case"sec":case"s":return a*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}}}(e);if("number"===c&&!1===isNaN(e))return a.long?o(i=e,n,"day")||o(i,s,"hour")||o(i,t,"minute")||o(i,r,"second")||i+" ms":function(e){return e>=n?Math.round(e/n)+"d":e>=s?Math.round(e/s)+"h":e>=t?Math.round(e/t)+"m":e>=r?Math.round(e/r)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},81:e=>{"use strict";e.exports=require("child_process")},298:e=>{"use strict";e.exports=require("electron")},147:e=>{"use strict";e.exports=require("fs")},808:e=>{"use strict";e.exports=require("net")},17:e=>{"use strict";e.exports=require("path")},224:e=>{"use strict";e.exports=require("tty")},837:e=>{"use strict";e.exports=require("util")}},r={};function t(s){var n=r[s];if(void 0!==n)return n.exports;var o=r[s]={exports:{}};return e[s](o,o.exports,t),o.exports}t.ab=__dirname+"/native_modules/",(()=>{const{app:e,BrowserWindow:r}=t(298);t(17),t(906)&&e.quit();const s=()=>{new r({width:800,height:600,webPreferences:{preload:require("path").resolve(__dirname,"../renderer","main_window","preload.js")}}).loadURL(`file://${require("path").resolve(__dirname,"..","renderer","main_window","index.html")}`)};e.on("ready",s),e.on("window-all-closed",(()=>{"darwin"!==process.platform&&e.quit()})),e.on("activate",(()=>{0===r.getAllWindows().length&&s()}))})(),module.exports={}})();
//# sourceMappingURL=index.js.map