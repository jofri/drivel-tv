(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{109:function(t,e,n){"use strict";n.r(e);var c=n(1),a=n(0),i=n.n(a),s=n(50),r=n.n(s),o=(n(62),n(55)),u=n(2);n(63),n(16);var j=function(){return Object(c.jsx)("div",{className:"navbar",children:"Drivel.TV"})};var l=function(){return Object(c.jsx)("div",{className:"homepage",children:"Homepage"})},b=n(12),h=n(31),d=n.n(h);var f=function(t){var e=Object(a.useState)(""),n=Object(b.a)(e,2),i=n[0],s=n[1];return Object(a.useEffect)((function(){d()("#chatList").append(d()("<li>").text(t.msg))}),[t.msg]),Object(c.jsxs)("div",{className:"chat",children:[Object(c.jsx)("ul",{id:"chatList"}),Object(c.jsxs)("form",{id:"chatForm",action:"",onSubmit:function(e){e.preventDefault(),""!==i&&(console.log("props",t),t.emitMsg(i),s(""))},children:[Object(c.jsx)("input",{id:"chatInput",autocomplete:"off",value:i,onChange:function(t){return s(t.target.value)}}),Object(c.jsx)("button",{id:"chatButton",children:"Send"})]})]})},m=n(51);var O,p=function(t){var e=Object(a.useState)(0),n=Object(b.a)(e,2),i=n[0],s=n[1];Object(a.useEffect)((function(){s(t.currentTime)}),[t.currentTime]);var r={height:"100%",width:"100%",playerVars:{enablejsapi:1,playsinline:1,"webkit-playsinline":1,autoplay:1,start:i}};return Object(c.jsx)(m.a,{containerClassName:"videoplayer",videoId:"oOBJ-sIw4W8",opts:r})},v=n(54),x=n.n(v);var g=function(){var t=Object(a.useState)(""),e=Object(b.a)(t,2),n=e[0],i=e[1],s=Object(a.useState)(0),r=Object(b.a)(s,2),o=r[0],u=r[1];return Object(a.useEffect)((function(){return(O=x.a.connect()).emit("join",window.location.pathname),O.emit("get current time",{room:window.location.pathname}),function(){O.close()}}),[]),Object(a.useEffect)((function(){O.on("current time",(function(t){u(t)})),O.on("chat message to client",(function(t){i(t)}))}),[]),Object(c.jsxs)("div",{className:"broadcast",children:[Object(c.jsx)(p,{currentTime:o}),Object(c.jsx)(f,{emitMsg:function(t){O.emit("chat message to server",{room:window.location.pathname,msg:t})},msg:n})]})};var w=function(){return Object(c.jsxs)(o.a,{children:[Object(c.jsx)(j,{}),Object(c.jsxs)(u.c,{children:[Object(c.jsx)(u.a,{exact:!0,path:"/",children:Object(c.jsx)(l,{})}),Object(c.jsx)(u.a,{exact:!0,path:"/b/:broadcast",children:Object(c.jsx)(g,{})}),Object(c.jsx)(u.a,{path:"/",children:Object(c.jsx)("h1",{style:{marginTop:"5vh"},children:"404"})})]})]})},S=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,110)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),c(t),a(t),i(t),s(t)}))};r.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),S()},16:function(t,e,n){},62:function(t,e,n){},63:function(t,e,n){}},[[109,1,2]]]);
//# sourceMappingURL=main.ca0de5bf.chunk.js.map