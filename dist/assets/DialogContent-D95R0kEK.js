import{g as r,a as n,s as u,_ as i,r as g,u as v,d as x,j as C,e as D,f}from"./index-DCElUTP8.js";function m(o){return r("MuiDialogContent",o)}n("MuiDialogContent",["root","dividers"]);function U(o){return r("MuiDialogTitle",o)}const T=n("MuiDialogTitle",["root"]),M=["className","dividers"],w=o=>{const{classes:t,dividers:s}=o;return f({root:["root",s&&"dividers"]},m,t)},y=u("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,s.dividers&&t.dividers]}})(({theme:o,ownerState:t})=>i({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${T.root} + &`]:{paddingTop:0}})),b=g.forwardRef(function(t,s){const e=v({props:t,name:"MuiDialogContent"}),{className:l,dividers:d=!1}=e,c=x(e,M),a=i({},e,{dividers:d}),p=w(a);return C.jsx(y,i({className:D(p.root,l),ownerState:a,ref:s},c))});export{b as D,U as g};
