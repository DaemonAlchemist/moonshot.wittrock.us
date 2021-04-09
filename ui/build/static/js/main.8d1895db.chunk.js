(this.webpackJsonpmoonshot=this.webpackJsonpmoonshot||[]).push([[0],{218:function(e,t,n){},235:function(e,t){},252:function(e,t,n){},253:function(e,t,n){},254:function(e,t,n){},255:function(e,t,n){},385:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(20),o=n.n(r),c=(n.p,n(166)),l=(n(218),n(1)),u=n(4),s=n(49),f=n(42),m=function(e,t){return e*Math.pow(10,t)},d=function(e,t){return t*function(e){return 4/3*Math.PI*e*e*e}(e)},p=m(6.378,6),v=m(6.957,8),h=m(7,7),b=m(1.49,11),g=m(6.674,-11),x=200,y=1.2,E=n(55),w=Object(E.entity)({module:"moonshot",entity:"planet",default:{id:"",attributes:{mass:0,name:"",radius:0},view:{minViewSize:0,borderColor:"000000",color:"666666"}}}),j=Object(E.entity)({module:"moonshot",entity:"deltaV",default:{id:"",deltaV:0,time:0,angle:0}}),O={module:"moonshot",entity:"timer",default:{time:0,steps:1,dT:x}},M=Object(E.singleton)(O),S=Object(E.singleton)({module:"moonshot",entity:"ship",default:{position:{x:0,y:0},velocity:{x:0,y:0},initialPosition:{x:0,y:0},initialVelocity:{x:0,y:0}}}),C=Object(E.singleton)({module:"moonshot",entity:"game",default:{startId:"",targetId:"",status:"playing"}}),I={theReducerEntities:E.theReducer.entity(w,j),theReducerSingletons:E.theReducer.singleton(M,S,C)},k=n(169),V=n.n(k),P=n(135),z=n.n(P),N=V.a,D=z.a,T=n(6),F=n(7),R=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return{x:e.apply(void 0,Object(F.a)(n.map(Object(f.prop)("x")))),y:e.apply(void 0,Object(F.a)(n.map(Object(f.prop)("y"))))}},L=function(e,t){return{x:e.x+t.x,y:e.y+t.y}},q=function(e,t){return{x:e.x-t.x,y:e.y-t.y}},Y=function(e,t){return{x:e*t.x,y:e*t.y}},A=function(e){return Math.sqrt(e.x*e.x+e.y*e.y)},G=2*Math.PI/Math.sqrt(g),H=function(e){return G*Math.sqrt(e.orbit.a*e.orbit.a*e.orbit.a/e.orbit.parent.attributes.mass)},W=function(e,t,n){return R((function(e,t){return t+e*n}),e,t)},B=function(e,t,n){return A(q(U(t,n),e.position))-t.attributes.radius},J=Object(f.memoize)((function(e,t){if("undefined"===typeof e.orbit)return{x:0,y:0};var n=e,a=n.orbit.n*t+n.orbit.v0;a>Math.PI&&(a-=Math.floor(Math.PI/a)*Math.PI);var i=function(e,t){for(var n=t.maxSteps||50,a=t.maxDelta||1e-6,i=t.min||-10,r=t.max||10,o=0,c=i,l=r;e(c)*e(l)>0;)c*=2,l*=2;for(var u=function(){return e((c+l)/2)};0===o||o<n&&Math.abs(u())>a;){var s=(c+l)/2;u()>0?l=s:c=s,o++}return(c+l)/2}((function(e){return e-n.orbit.e*Math.sin(e)-a}),{max:a,min:a/2}),r=Math.cos(i),o=Math.sqrt(1-n.orbit.e*n.orbit.e)*Math.sin(i),c=r-n.orbit.e,l=Math.sqrt(o*o+c*c),u=n.orbit.a*(1-n.orbit.e*r)/l,s=U(n.orbit.parent,t);return{x:s.x-u*c,y:s.y+u*o}}),{keyGen:function(e){var t=Object(T.a)(e,2),n=t[0],a=t[1];return"".concat(Object(E.objectId)(n),":").concat(a)}}),U=Object(f.memoize)(J,{keyGen:function(e){return"".concat(Object(E.objectId)(e[0]),":").concat(e[1])}}),K=function(e,t){var n="Planet ".concat(t+1),a=N.bool(),i=N.float(.2,2)*(a?h:p),r=N.float(.8,1.2)*d(i,a?1400:5514),o=e.attributes.radius+b/3*(t+1)*N.float(.8,1.2),c={id:n,attributes:{mass:r,radius:i,name:n},orbit:{parent:e,e:N.float(0,.9),a:o,w:N.float(0,6.28),v0:N.float(0,6.28)},view:{minViewSize:10,borderColor:"6666ff",color:"aaaaff"}};c.orbit.period=H(c),c.orbit.n=2*Math.PI/H(c);for(var l=N.int(0,3),u=[c],s=0;s<l;s++){var f="Planet ".concat(t+1,", Moon ").concat(s+1),v=N.float(.01,.3)*i,g=N.float(.8,1.2)*d(v,5514),x=c.attributes.radius+m(2,8)*(s+1)*N.float(.8,1.2),y={id:f,attributes:{mass:g,radius:v,name:f},orbit:{parent:c,e:N.float(0,.9),a:x,w:N.float(0,6.28),v0:N.float(0,6.28)},view:{minViewSize:1,borderColor:"66ff66",color:"aaffaa"}};y.orbit.period=H(y),y.orbit.n=2*Math.PI/H(y),u.push(y)}return u},X=function(e){var t=[];N.use(D("".concat(e)));var n=function(){var e=N.float(.3,10)*v;return{id:"sun",attributes:{mass:N.float(.9,1.1)*d(e,1400),radius:e,name:"Sun"},view:{minViewSize:20,borderColor:"ffff66",color:"ffffaa"}}}();t.push(n);for(var a,i=N.int(1,10),r=0;r<i;r++){var o=K(n,r);t=t.concat(o)}a=N.int(0,1e6);var c,l,u=(t=t.sort((function(e,t){N.use(D("".concat(a,":").concat(e.id)));var n=N.int(0,1e6);return N.use(D("".concat(a,":").concat(t.id))),n-N.int(0,1e6)})))[0],s=t[1],f=U(u,0),m=1.2*u.attributes.radius,p={x:f.x,y:f.y+m},h=q(U(u,1),f),b=L(h,{x:(c=u.attributes.mass,l=m,Math.sqrt(g*c/l)),y:0}),x={planets:t,newShip:{initialPosition:p,initialVelocity:b,position:p,velocity:b},startId:u.id,targetId:s.id};return console.log("New level:"),console.log(x),x},Z=function(e,t,n){return t.reduce((function(t,a){var i=U(a,n),r=q(i,e),o=A(r),c=g*a.attributes.mass/(o*o);return R((function(e,t){return e+c*t/o}),t,r)}),{x:0,y:0})},Q=function(e,t,n,a,i){for(var r=Object(l.a)({},e.position),o=Object(l.a)({},e.velocity),c=a.dT,u=t.filter((function(e){return e.id===i}))[0],s="playing",f=a.time,m=function(i){var l=a.time+i*c;f=l;var m=function(e,t,n,a,i){var r=Z(e,n,a),o=t,c=Z(R((function(e,t){return e+t*i/2}),e,o),n,a+i/2),l=R((function(e,t){return e+t*i/2}),t,r),u=Z(R((function(e,t){return e+t*i/2}),e,l),n,a+i/2),s=R((function(e,t){return e+t*i/2}),t,c),f=Z(R((function(e,t){return e+t*i}),e,s),n,a+i),m=R((function(e,t){return e+t*i}),t,u),d=R((function(e,t,n,a,r){return e+i/6*(t+2*n+2*a+r)}),t,r,c,u,f);return[R((function(e,t,n,a,r){return e+i/6*(t+2*n+2*a+r)}),e,o,l,s,m),d]}(r,o,t,l,c),d=Object(T.a)(m,2),p=d[0],v=d[1];r=p,o=v;var h=n.filter((function(e){return e.time===l}));if(h.length>0){var b=h[0];o.x+=b.deltaV*Math.cos(b.angle)*1e3,o.y+=b.deltaV*Math.sin(b.angle)*1e3}if(B(e,u,l)<.2*u.attributes.radius?s="won":t.forEach((function(t){B(e,t,l)<0&&(s="dead")})),"playing"!==s)return"break"},d=0;d<Math.max(1,a.steps);d++){if("break"===m(d))break}return{newShip:Object(l.a)(Object(l.a)({},e),{},{position:r,velocity:o}),newStatus:s,finalTime:f+c}},$=n(394),_=n(395),ee=n(41),te=n(40),ne=n(393),ae=n(391),ie=n(389),re=n(390),oe=n(52),ce=n(392),le=(n(252),function(e,t,n,a){var i=U(e,t),r=W(i,n,a),o=Math.max(e.view.minViewSize,2*e.attributes.radius*a),c="".concat(o,"px");return{height:c,left:"".concat(r.x,"px"),top:"".concat(r.y,"px"),width:c}}),ue=function(e,t){var n=Math.max(e.view.minViewSize,2*e.attributes.radius*t),a="".concat(n,"px");return{background:"#".concat(e.view.color),borderRadius:"".concat(n,"px"),height:a,width:a}},se=function(e,t,n,a){var i=U(e,t),r=W(i,n,a);return{background:"#ffffff",height:"2px",left:"".concat(r.x-1,"px"),top:"".concat(r.y-1,"px"),width:"2px"}},fe=Object(s.connect)((function(e,t){return{time:M.get(e).time}}),(function(e,t){return{}}),(function(e,t,n){return Object(l.a)(Object(l.a)(Object(l.a)({},e),t),n)}))((function(e){return a.createElement(a.Fragment,null,a.createElement("div",{className:"planet-container",style:le(e,e.time,e.offset,e.zoom)},a.createElement("div",{onClick:function(){e.onClick&&e.onClick(e.id)},style:ue(e,e.zoom)})),a.createElement("div",{className:"planet-container",style:se(e,e.time,e.offset,e.zoom)}))})),me=(n(253),function(e,t,n,a){var i=W(e.position,t,n);return{left:"".concat(i.x-10,"px"),top:"".concat(i.y-13,"px"),transform:"rotate(".concat(a+Math.PI/4,"rad)"),transformOrigin:"9px 12px"}}),de=Object(s.connect)((function(e,t){return{angle:function(){var t=M.get(e).time,n=Object(f.first)(j.getMultiple(e,(function(e){return e.time===t})));if(n)return n.angle;var a=Object(f.last)(j.getMultiple(e,(function(e){return e.time<t}))),i=Object(f.first)(j.getMultiple(e,(function(e){return e.time>t}))),r=a?a.angle:0,o=a?a.time:0,c=i?i.angle:0,l=i?i.time:999999;return(t-o)/(l-o)*(c-r)+r}(),flameOpacity:function(){var t=M.get(e).time,n=Object(f.last)(j.getMultiple(e,(function(e){return e.time<t}))),a=n?t-n.time:1e3;return Math.max(0,(8e3-a)/8e3)}(),ship:S.get(e)}}),(function(e,t){return{update:function(t){e(S.update(t))}}}),(function(e,t,n){return Object(l.a)(Object(l.a)(Object(l.a)({},e),t),n)}))((function(e){return a.createElement("div",{className:"ship",style:me(e.ship,e.offset,e.zoom,e.angle)},a.createElement(te.a,{icon:ee.h}),a.createElement(te.a,{className:"fire",icon:ee.c,style:{opacity:e.flameOpacity}}))})),pe=(n(254),1e-9),ve=Object(s.connect)((function(e,t){return{planets:w.getMultiple(e,(function(){return!0})),time:M.get(e).time,ship:S.get(e)}}),(function(e,t){return{}}),(function(e,t,n){return Object(l.a)(Object(l.a)(Object(l.a)({},e),t),n)}))((function(e){var t=a.useState({x:0,y:0}),n=Object(T.a)(t,2),i=n[0],r=n[1],o=a.useState({x:0,y:0}),c=Object(T.a)(o,2),l=c[0],u=c[1],s=a.useState(e.center),f=Object(T.a)(s,2),m=f[0],d=f[1],p=a.createRef();a.useEffect((function(){if(p.current){var e=p.current.offsetWidth,t=p.current.offsetHeight;e===l.x&&t===l.y||u({x:e,y:t})}}),[p,l.x,l.y]);var v=a.useState(!1),h=Object(T.a)(v,2),g=h[0],x=h[1],E=function(){x(!1)},w=a.useState(e.zoom),j=Object(T.a)(w,2),O=j[0],M=j[1];a.useEffect((function(){r({x:l.x/2-m.x*O,y:l.y/2-m.y*O})}),[l,m,O]);var S=a.useState(e.initialSelectedPlanetId||""),C=Object(T.a)(S,2),I=C[0],k=C[1],V=function(e){k(e===I?"":e)},P=a.useState(void 0),z=Object(T.a)(P,2),N=z[0],D=z[1];a.useEffect((function(){if(D(void 0),I){var t=e.planets.filter((function(e){return e.id===I}))[0],n=U(t,e.time),a=Y(pe,n);d(a),D(B(e.ship,t,e.time))}}),[e.initialSelectedPlanetId,I,e.planets,e.ship.position,e.ship,e.time]);var F,R=a.useRef(e.center);return a.useEffect((function(){k(e.initialSelectedPlanetId||""),M(e.zoom),d(R.current)}),[e.initialSelectedPlanetId,e.zoom]),a.createElement("div",{className:"viewport-container ".concat(e.className)},a.createElement("div",{className:"viewport-zoom"},I?"".concat(I," - "):""," Zoom: ",O.toFixed(1),!!N&&a.createElement(a.Fragment,null,a.createElement("br",null),(F=N)>b?"".concat((F/b).toFixed(2)," AU"):F>1e9?"".concat((F/1e9).toFixed(2)," million km"):F>1e6?"".concat((F/1e6).toFixed(2)," thousand km"):"".concat((F/1e3).toFixed(2)," km"))),a.createElement("div",{className:"viewport-name"},e.name),a.createElement("div",{ref:p,className:"viewport",onMouseDown:function(){x(!0)},onMouseUp:E,onMouseLeave:E,onMouseMove:function(e){if(g){var t={x:m.x-e.movementX/O,y:m.y-e.movementY/O};d(t)}},onWheel:function(e){var t=e.deltaY>0?1/y:y;M((function(e){return e*t}))}},a.createElement(de,{zoom:O*pe,offset:i}),e.planets.map((function(e){return a.createElement(fe,Object.assign({key:e.id},e,{zoom:O*pe,offset:i,onClick:V}))}))))})),he=(n(255),0),be=Object(s.connect)((function(e,t){return{game:C.get(e),timer:M.get(e),deltaVs:j.getMultiple(e,(function(){return!0})).sort((function(e,t){return e.time-t.time})),ship:S.get(e),planets:w.getMultiple(e,(function(){return!0}))}}),(function(e,t){return{addDeltaV:function(t){return function(){e(j.add({id:"".concat(he++),time:t,deltaV:0,angle:0}))}},lose:function(){e(C.update({status:"dead"}))},onChangeDeltaV:function(t,n){return function(a){e(j.update(Object(u.a)({id:t},n,a?+a:0)))}},onDeleteDeltaV:function(t){return function(){e(j.delete(t))}},resetLevel:Object(f.memoize)((function(){return function(t){var n=X(t),a=n.planets,i=n.newShip,r=n.startId,o=n.targetId;e(M.update({time:0,steps:1,dT:x})),e(w.clear()),e(w.addMultiple(a)),e(S.update(i)),e(C.update({startId:r,targetId:o,status:"playing"}))}}),{})(),updateShip:function(t){e(S.update(t))},updateSpeed:function(t){return function(){e(M.update({steps:t}))}},updateTime:function(t){e(M.update({time:t}))},win:function(){e(C.update({status:"won"}))}}}),(function(e,t,n){return Object(l.a)(Object(l.a)(Object(l.a)(Object(l.a)({},e),t),n),{},{tick:function(){if(!["dead","won"].includes(e.game.status)){var n=Q(e.ship,e.planets,e.deltaVs,e.timer,e.game.targetId),a=n.newShip,i=n.newStatus,r=n.finalTime;switch(i){case"dead":t.lose();break;case"won":t.win()}t.updateTime(r),t.updateShip(a)}}})}))((function(e){var t=e.resetLevel,n=function(e){var t=e.interval,n=e.onTick,i=a.useState(e.isRunning),r=Object(T.a)(i,2),o=r[0],c=r[1],l=a.useCallback((function(){c(!1)}),[]),u=a.useCallback((function(){c(!0)}),[]),s=a.useCallback((function(){o&&n()}),[o,n]);return a.useEffect((function(){var e=window.setInterval(s,t);return function(){clearInterval(e)}}),[t,s]),[o,u,l]}({interval:25,onTick:e.tick,isRunning:!0}),i=Object(T.a)(n,3),r=i[0],o=i[1],c=i[2],l=a.useState(1),u=Object(T.a)(l,2),s=u[0],f=u[1],m=function(e){return function(){f(e)}},d=a.useState(!1),p=Object(T.a)(d,2),v=p[0],h=p[1];a.useEffect((function(){t(s),h((function(e){return!e}))}),[t,s]);var b=function(){t(s)};a.useEffect(o,[o]);return a.createElement(ie.a,null,a.createElement(ie.a.Sider,{width:"400px"},a.createElement("h1",{className:"game-title"},a.createElement(te.a,{icon:ee.e})," MoonShot ",a.createElement(te.a,{icon:ee.e})),a.createElement("hr",null),a.createElement("div",{id:"level-controls"},a.createElement("h1",null,"Level"),a.createElement("div",null,a.createElement(te.a,{icon:ee.i,title:"Previous level",onClick:s>1?m(s-1):void 0}),a.createElement("span",{className:"curLevel"},s),a.createElement(te.a,{icon:ee.j,title:"Next level",onClick:m(s+1)}))),a.createElement("hr",null),a.createElement("div",{id:"time-controls"},a.createElement("h1",{className:"time"},"Time: ",function(e){var t=e%60,n=(e=Math.floor(e/60))%60,a=(e=Math.floor(e/60))%24,i=(e=Math.floor(e/24))%365;return e=Math.floor(e/365),"".concat(e,":").concat(i,":").concat(a,":").concat(n,":").concat(t)}(e.timer.time)),a.createElement("h1",{className:"speed"},"Speedup: ",e.timer.steps),a.createElement(te.a,{icon:ee.b,title:"Reset level",onClick:b}),a.createElement(te.a,{icon:ee.a,title:"Slower",onClick:e.timer.steps>1?e.updateSpeed(e.timer.steps/2):void 0}),r&&a.createElement(te.a,{icon:ee.f,title:"Pause",onClick:c}),!r&&a.createElement(te.a,{icon:ee.g,title:"Play",onClick:o}),a.createElement(te.a,{icon:ee.d,title:"Faster",onClick:e.timer.steps<1024?e.updateSpeed(2*e.timer.steps):void 0}),a.createElement(te.a,{icon:ee.j,title:"Step forward",onClick:e.tick})),a.createElement("hr",null),a.createElement("h1",null,"Delta Vs"),a.createElement(re.a,{dataSource:e.deltaVs,rowKey:"id",pagination:!1,size:"small",style:{margin:"16px",maxHeight:"256px",overflow:"scroll"}},a.createElement(re.a.Column,{dataIndex:"deltaV",title:"Delta-V",render:function(t,n){return a.createElement(ne.a,{value:t,onChange:e.onChangeDeltaV(n.id,"deltaV"),style:{width:"100%"}})},width:"75px"}),a.createElement(re.a.Column,{dataIndex:"time",title:"Time",render:function(t,n){return a.createElement(ne.a,{value:t,onChange:e.onChangeDeltaV(n.id,"time"),style:{width:"100%"},step:x})},width:"75px"}),a.createElement(re.a.Column,{dataIndex:"angle",title:"Angle",render:function(t,n){return a.createElement(ae.a,{value:t,onChange:e.onChangeDeltaV(n.id,"angle"),min:0,max:2*Math.PI,step:.01})}}),a.createElement(re.a.Column,{dataIndex:"angle",render:function(e){return a.createElement(te.a,{icon:ee.h,style:{transform:"rotate(".concat(e+Math.PI/4,"rad)")}})},width:"22px"}),a.createElement(re.a.Column,{dataIndex:"id",render:function(t){return a.createElement($.a,{title:"Remove delta-V",onClick:e.onDeleteDeltaV(t)})},width:"25px"})),a.createElement(oe.a,{onClick:e.addDeltaV(e.timer.time)},a.createElement(_.a,null)," Add delta-V"),a.createElement("hr",null),a.createElement("h1",null,"High Scores for Level ",s)),a.createElement(ie.a.Content,{className:"viewports"},a.createElement(ce.a,{visible:"dead"===e.game.status,title:"Game Over!",footer:null,onCancel:b},"You crashed into a planet!"),a.createElement(ce.a,{visible:"won"===e.game.status,title:"You Win!",footer:null,onCancel:b},"You reached the target planet! Congrats."),a.createElement(ve,{name:"Start",className:"start-viewport inset-viewport",center:{x:0,y:0},zoom:Math.pow(y,50),reset:v,initialSelectedPlanetId:e.game.startId}),a.createElement(ve,{name:"System overview",className:"main-viewport",center:{x:0,y:0},zoom:1,reset:v}),a.createElement(ve,{name:"Target",className:"end-viewport inset-viewport",center:{x:0,y:0},zoom:Math.pow(y,50),reset:v,initialSelectedPlanetId:e.game.targetId})))})),ge=function(){return i.a.createElement(c.ReduxContainer,{reducers:I,useLogger:!1,middleware:[],initialState:{}},i.a.createElement(be,null))},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,396)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),i(e),r(e),o(e)}))};o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(ge,null)),document.getElementById("root")),xe()}},[[385,1,2]]]);
//# sourceMappingURL=main.8d1895db.chunk.js.map