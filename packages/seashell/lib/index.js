!function(e,o){for(var n in o)e[n]=o[n]}(exports,function(e){function o(t){if(n[t])return n[t].exports;var r=n[t]={exports:{},id:t,loaded:!1};return e[t].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}var n={};return o.m=e,o.c=n,o.p="",o(0)}([function(e,o,n){e.exports=n(1),e.exports.Server=n(5)},function(e,o,n){var t=n(2),r=n(3),i=e.exports={},c={},s=function(){t.call(this)};r.inherits(s,t);var a=function(e,o,t){i.socket=n(4)(e),i.socket.on("connect",function(){console.log("connected"),console.log("start register"),i.socket.emit("register",o)}),i.socket.on("registerResponse",function(e){"function"==typeof t&&t(e)}),i.socket.on("export",function(e){c[e.callbackId].emit("event",e)}),i.socket.on("disconnect",function(){console.log("disconnected")})},p=function(e,o,n){if(!i.socket)return n("socket isnt connected");var t="a"+Date.now();c[t]=new s,console.log(c[t]),c[t].on("event",function(e){return n(null,e),delete c[t],null}),o.importAppName=e,o.callbackId=t,i.socket.emit("import",o)};i.connect=a,i.register=a,i.request=p,i["import"]=p},function(e,o){e.exports=require("events")},function(e,o){e.exports=require("util")},function(e,o){e.exports=require("socket.io-client")},function(e,o,n){var t=n(6),r=n(7),i=n(8),c=n(9),s=n(10),a=n(11),p=function(e){var o=new a({filename:"data/db/Service.db",autoload:!0}),p=function(e){return"string"!=typeof e.appSecret?!1:"string"==typeof e.appName},u=function(e){i.readFile(e,"UTF-8",function(n,t){if(n)throw n;try{var i=JSON.parse(t)}catch(c){if(c)throw c}if(i.appId=r.basename(e,".json"),i.socketId=null,i.online=0,!p(i))throw Error("Service Defination Format Error");o.insert(i,function(e,o){if(e)throw e})})},f=function(e){i.readFile(e,"UTF-8",function(n,t){if(n)throw n;try{var i=JSON.parse(t)}catch(c){if(c)throw c}var s=r.basename(e,".json");if(i.socketId=null,i.online=0,!p(i))throw Error("Service Defination Format Error");o.update({appId:s},i,{},function(e,o){if(e)throw e})})};try{c.sync("data/service")}catch(l){throw new Error("File RW+ Permission Denied.")}o.remove({},{multi:!0},function(e,n){if(e)throw e;console.log(n),t("data/service/**/*.json",{},function(e,n){if(e)throw e;n.length||console.warn("none service defination file found"),n.forEach(function(e,o){u(e)}),s.createMonitor("data/service",function(e){e.on("created",function(e,o){return".json"!==r.extname(e)?null:void u(e)}),e.on("changed",function(e,o,n){f(e)}),e.on("removed",function(e,n){var t=r.basename(e,".json");o.remove({appId:t},{},function(e,o){if(e)throw e})})})})});var d=n(12)();d.on("connection",function(e){console.log("new connection "+e.id),e.on("register",function(n){console.log("register"),console.log(n);var t={appId:n.appId,socketId:e.id,appSecret:n.appSecret};o.findOne({appId:t.appId,appSecret:t.appSecret},function(n,r){if(n)throw n;return r?void o.update({appId:t.appId},t,{},function(e,o){if(e)throw e}):e.emit("registerResponse",{error:"fail"})})}),e.on("import",function(n){console.log("import/require/request");var t=n.importAppName;if(console.log("import:"+t),!n.callbackId)throw Error("Import Lost Prams Id: [callbackId]");o.findOne({socketId:e.id},function(r,i){if(r)throw r;return i?(n.appId=i.appId,void o.findOne({appName:t,online:1},function(o,t){if(o)throw o;if(!t)return n.result={error:"no target service avileable!"},e.emit("export",n);var r=d.sockets.connected[t.socketId];r.emit("import",n)})):(n.result={error:"service not registered!"},e.emit("export",n))})}),e.on("export",function(e){console.log("export/reply");e.calllbackId;if(!e.callbackId)throw Error("Export Lost Prams Id: [callbackId]");console.log(e),o.findOne({appId:e.appId},function(o,n){var t=d.sockets.connected[n.socketId];t.emit("export",e)})}),e.on("disconnect",function(){console.log(e.id+" disconnected"),o.update({socketId:e.id},{socketId:null,online:0},{},function(e,o){console.log(e,o)})})}),console.log("listening on port "+(process.env.port||3300)),d.listen(process.env.port||3300)};e.exports=p},function(e,o){e.exports=require("glob")},function(e,o){e.exports=require("path")},function(e,o){e.exports=require("fs")},function(e,o){e.exports=require("mkdirp")},function(e,o){e.exports=require("watch")},function(e,o){e.exports=require("nedb")},function(e,o){e.exports=require("socket.io")}]));