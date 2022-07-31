(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{515:function(e,a,t){e.exports={oauthbar:"oauth_oauthbar_1Kiu7",gicon:"oauth_gicon_fjyJI",why:"oauth_why_1sy3L",scdropdown:"oauth_scdropdown_3-HEe",scicon:"oauth_scicon_2YtCq"}},516:function(e,a,t){e.exports={history:"stars_history_2o5QU",stacks:"stars_stacks_2fIWi",button:"stars_button_2p05J",stack:"stars_stack_39yGg",faclose:"stars_faclose_VHJYc",repos:"stars_repos_Vpzxr",repo:"stars_repo_2Ftlf",topbar:"stars_topbar_2zP5m",loading:"stars_loading_3xro0",footer:"stars_footer_32AoT",domain:"stars_domain_1xBOc",github:"stars_github_10Myb"}},644:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),c=t(4),r=t.n(c),l=t(30),i=t(511),o=t.n(i),m=t(512),d=t.n(m),p=t(513),u=t(11),b=t(26),h=t(23),k=t(32),E=t(63),v=t(5),g=t(14),f=t(184),y=t(3),N=t(39),O=t(515),j=t.n(O);var _=()=>{const[e,a]=Object(n.useState)(!1),t=Object(v.c)(e=>e.profile.settings.language),c=Object(v.b)(e=>e.profile.setProfile),l=Object(v.b)(e=>e.profile.setJwt),i=Object(n.useCallback)(async e=>{e.preventDefault();try{await Object(f.a)(c,l)}catch(e){Object(N.a)(e)}},[l,c]);return s.a.createElement("div",{className:j.a.oauthbar},s.a.createElement("a",{className:r()("button","is-warning","is-small"),onClick:i},s.a.createElement(u.a,{icon:k.b,className:j.a.gicon}),"OAuth for token"),s.a.createElement("div",{className:r()("dropdown is-right",j.a.scdropdown,{"is-active":e})},s.a.createElement("span",{className:j.a.why,onClick:()=>a(!e)},s.a.createElement(u.a,{icon:b.d,className:j.a.scicon})),s.a.createElement("div",{className:"dropdown-menu",style:{width:300}},s.a.createElement("div",{className:"dropdown-content"},s.a.createElement("div",{className:"dropdown-item"},t!==y.b.中文?s.a.createElement(s.a.Fragment,null,s.a.createElement("p",null,"Data for each repository star history requires a maximum of 30 github api requests. There can only make up to 60 requests per hour without github authentication."),s.a.createElement("p",null,"So Github Stars need your OAuth to get token for requests. In this way, each user's token can make up to ",s.a.createElement("a",{href:"https://developer.github.com/v3/#rate-limiting"},"5000 requests per hour"),".")):s.a.createElement(s.a.Fragment,null,s.a.createElement("p",null,"每个repository的star记录最多需要30次GitHub API请求，在没有GitHub授权token的情况下，每小时最多只能发出60个请求。"),s.a.createElement("p",null,"所以 Github Stars 需要您的OAuth授权token。这样每个用户的令牌每小时最多可以发出",s.a.createElement("a",{href:"https://developer.github.com/v3/#rate-limiting"},"5000个请求"),"。")))))),s.a.createElement("div",{className:r()("mask",{"dis-none":!e}),onClick:()=>a(!1)}))},C=t(139),w=t(516),P=t.n(w),S=t(20);const x={keys:["name","repos"],threshold:.3,minMatchCharLength:2,useExtendedSearch:!0};p.b.use(d.a);const F={tooltip:{xDateFormat:"%Y-%m-%d"},plotOptions:{series:{marker:{enabled:!1}}}},q=Object(g.a)(C.a);a.default=({query:e})=>{const a=Object(v.b)(e=>e.stars.initialPresetStacks),t=Object(v.b)(e=>e.stars.initialPrivateStacks),c=Object(v.b)(e=>e.stars.initialCurrentStack);Object(n.useEffect)(()=>{(async()=>{await a(),await t(),await c()})()},[a,t,c]);const i=Object(v.c)(e=>e.profile.settings.language),m=Object(v.c)(e=>e.profile.profile),d=Object(v.c)(e=>e.stars.displayType),g=Object(v.c)(e=>e.stars.privateStacks),f=Object(v.c)(e=>e.stars.displayStacks),N=Object(v.c)(e=>e.stars.backStacks),O=Object(v.c)(e=>e.stars.frontStacks),j=Object(v.c)(e=>e.stars.hiddenStacks),w=Object(v.c)(e=>e.stars.currentStack),A=Object(v.c)(e=>e.stars.repositorys),D=Object(v.c)(e=>e.stars.loading),H=Object(v.b)(e=>e.stars.setDisplayType),J=Object(v.b)(e=>e.stars.addHiddenStack),G=Object(v.b)(e=>e.stars.removeHiddenStack),I=Object(v.b)(e=>e.stars.addPrivateStack),R=Object(v.b)(e=>e.stars.removePrivateStack),T=Object(v.b)(e=>e.stars.addPrivateStackRepoAndData),L=Object(v.b)(e=>e.stars.removePrivateStackRepo),M=Object(v.b)(e=>e.stars.selectStack),[Y,z]=Object(n.useState)(""),[B,U]=Object(n.useState)(""),[V,W]=Object(n.useState)(f),K=Object(n.useRef)(null);Object(n.useEffect)(()=>{if(""!==e){const a=new l.a(f,x).search(e).map(e=>e.item);W(a)}else W([])},[f,e]);const Q=Object(n.useCallback)(e=>{B&&(T({stackid:e,repo:B}),U(""))},[T,B]),X=Object(n.useCallback)(e=>s.a.createElement("div",{className:P.a.repos},e.repos.map(a=>s.a.createElement("p",{key:a,className:P.a.repo},s.a.createElement("a",{href:"https://github.com/"+a,target:"_blank",rel:"noopener noreferrer"},a),e.type===E.a.Private&&s.a.createElement(u.a,{icon:b.g,onClick:()=>{L({stackid:e.id,repo:a})},className:P.a.faclose}))),e.type===E.a.Private&&s.a.createElement("div",{className:"field has-addons"},s.a.createElement("p",{className:"control is-expanded"},s.a.createElement("input",{className:"input is-small",type:"text",placeholder:"username/repositorie",value:B,onChange:e=>U(e.target.value)})),s.a.createElement("p",{className:"control"},s.a.createElement("a",{className:"button is-info is-small",onClick:()=>Q(e.id)},"Add")))),[B,L,Q]),Z=Object(n.useCallback)(()=>{K.current&&o()(K.current.element).then(e=>{const a=document.createElement("a");a.download=((null==w?void 0:w.name)||"stars")+".png",a.href=e.toDataURL(),a.click()})},[null==w?void 0:w.name]),$=Object(n.useMemo)(()=>s.a.createElement(p.a,{innerRef:K,library:F,data:A,height:"800px",width:"100%",ytitle:"Stars"}),[A]);return s.a.createElement("div",{className:r()("columns",P.a.history)},s.a.createElement("div",{className:r()("column","is-one-quarter")},s.a.createElement("nav",{className:"panel"},s.a.createElement("p",{className:"panel-tabs"},q.map(e=>s.a.createElement("a",{key:e.value,className:r()({"is-active":d===e.value}),onClick:()=>H(e.value)},e.label))),s.a.createElement("div",{className:P.a.stacks},d===C.a.Private&&s.a.createElement("div",{className:"panel-block field has-addons"},s.a.createElement("p",{className:"control is-expanded"},s.a.createElement("input",{className:"input",type:"text",placeholder:"stack name",value:Y,onChange:e=>z(e.target.value)})),s.a.createElement("p",{className:r()("control",P.a.button)},s.a.createElement("a",{className:"button is-info",onClick:()=>Y&&I({name:Y})},"Create"))),""!==e&&V.map(e=>s.a.createElement(n.Fragment,{key:e.id},s.a.createElement("a",{className:r()("panel-block",P.a.stack,{"is-active":e.id===(null==w?void 0:w.id)}),onClick:()=>M(e)},s.a.createElement("span",{className:"panel-icon"},e.type===E.a.Private&&s.a.createElement(u.a,{icon:b.f,"aria-hidden":"true"}),e.type!==E.a.Private&&s.a.createElement(u.a,{icon:h.i,"aria-hidden":"true"})),i===y.b.中文&&e.nameChinese||e.name,s.a.createElement(u.a,{icon:b.g,onClick:a=>{a.stopPropagation(),e.type===E.a.Private?R(e.id):J(e.id)},className:P.a.faclose})),e.id===(null==w?void 0:w.id)&&X(e))),""===e&&d===C.a.Backend&&N.map(e=>s.a.createElement(n.Fragment,{key:e.id},s.a.createElement("a",{className:r()("panel-block",P.a.stack,{"is-active":e.id===(null==w?void 0:w.id)}),onClick:()=>M(e)},s.a.createElement("span",{className:"panel-icon"},e.type===E.a.Private&&s.a.createElement(u.a,{icon:b.f,"aria-hidden":"true"}),e.type!==E.a.Private&&s.a.createElement(u.a,{icon:h.i,"aria-hidden":"true"})),i===y.b.中文&&e.nameChinese||e.name,s.a.createElement(u.a,{icon:b.g,onClick:a=>{a.stopPropagation(),e.type===E.a.Private?R(e.id):J(e.id)},className:P.a.faclose})),e.id===(null==w?void 0:w.id)&&X(e))),""===e&&d===C.a.Frontend&&O.map(e=>s.a.createElement(n.Fragment,{key:e.id},s.a.createElement("a",{className:r()("panel-block",P.a.stack,{"is-active":e.id===(null==w?void 0:w.id)}),onClick:()=>M(e)},s.a.createElement("span",{className:"panel-icon"},e.type===E.a.Private&&s.a.createElement(u.a,{icon:b.f,"aria-hidden":"true"}),e.type!==E.a.Private&&s.a.createElement(u.a,{icon:h.i,"aria-hidden":"true"})),i===y.b.中文&&e.nameChinese||e.name,s.a.createElement(u.a,{icon:b.g,onClick:a=>{a.stopPropagation(),e.type===E.a.Private?R(e.id):J(e.id)},className:P.a.faclose})),e.id===(null==w?void 0:w.id)&&X(e))),""===e&&d===C.a.Private&&g.map(e=>s.a.createElement(n.Fragment,{key:e.id},s.a.createElement("a",{className:r()("panel-block",P.a.stack,{"is-active":e.id===(null==w?void 0:w.id)}),onClick:()=>M(e)},s.a.createElement("span",{className:"panel-icon"},s.a.createElement(u.a,{icon:b.f,"aria-hidden":"true"})),i===y.b.中文&&e.nameChinese||e.name,s.a.createElement(u.a,{icon:b.g,onClick:a=>{a.stopPropagation(),window.confirm("Will be deleted!")&&R(e.id)},className:P.a.faclose})),e.id===(null==w?void 0:w.id)&&X(e))),""===e&&d===C.a.Hidden&&j.map(e=>s.a.createElement(n.Fragment,{key:e.id},s.a.createElement("a",{className:r()("panel-block",P.a.stack,{"is-active":e.id===(null==w?void 0:w.id)}),onClick:()=>M(e)},s.a.createElement("span",{className:"panel-icon"},s.a.createElement(u.a,{icon:h.i,"aria-hidden":"true"})),i===y.b.中文&&e.nameChinese||e.name,s.a.createElement(u.a,{icon:b.g,onClick:a=>{a.stopPropagation(),G(e.id)},className:P.a.faclose})),e.id===(null==w?void 0:w.id)&&X(e)))))),s.a.createElement("div",{className:r()("column","pos-relative")},s.a.createElement("div",{className:P.a.topbar},w&&s.a.createElement("a",{className:r()("button","is-info","is-small","mgr10"),onClick:Z},s.a.createElement(u.a,{icon:b.b,className:"mgr5"}),"Download Image"),!(null==m?void 0:m.githubToken)&&s.a.createElement(_,null)),D&&s.a.createElement("div",{className:P.a.loading},s.a.createElement(S.a,{type:1})),$,s.a.createElement("div",{className:r()(P.a.footer)},s.a.createElement("a",{href:"https://github.com/elliotreborn/github-stars",target:"_blank",rel:"noopener noreferrer"},s.a.createElement(u.a,{icon:k.b,className:P.a.github})))))}}}]);