import{g as E,u as $}from"./config-917089b7.js";import{d as v,o as a,y as o,b as n,_ as x,r as m,A as L,c as h,x as M,w as l,e as u,t as _,z as f,a as z}from"./index-69997a90.js";import{E as D}from"./Refresh-33682a05.js";var g=v({name:"Edit"});const B={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},I=n("path",{fill:"currentColor",d:"M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"},null,-1),N=n("path",{fill:"currentColor",d:"m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"},null,-1);function U(t,i,b,k,d,p){return a(),o("svg",B,[I,N])}g.render=U;g.__file="packages/components/Edit.vue";const H=g,R={data(){return{listLoading:!1,list:[],ElIconEdit:H,ElIconRefresh:D}},created(){this.fetchData()},methods:{fetchData(){this.listLoading=!0,E().then(t=>{this.list=t.data.map(i=>(i.edit=!1,i.originalValue=i.Value,i.originalMemo=i.Memo,i)),this.listLoading=!1})},cancelEdit(t){t.Value=t.originalValue,t.Memo=t.originalMemo,t.edit=!1},confirmEdit(t){t.edit=!1,t.originalValue=t.Value,t.originalMemo=t.Memo,this.listLoading=!0,$(t).then(i=>{this.$message(this.$t("发布成功")),this.listLoading=!1,this.fetchData()})}}},A={class:"app-container"},K=z("div",{style:{"margin-bottom":"15px"}},null,-1),O={key:1},S={key:1},T=u("Edit"),j=u("OK"),q=u("Cancel");function F(t,i,b,k,d,p){const c=m("el-table-column"),r=m("el-button"),V=m("el-input"),y=m("el-table"),C=L("loading");return a(),h("div",A,[K,M((a(),o(y,{data:d.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""},{default:l(()=>[n(c,{align:"center",label:"ID",width:"95"},{default:l(e=>[u(_(e.$index+1),1)]),_:1}),n(c,{label:t.$t("字段名称"),width:"270"},{default:l(e=>[n(r,{type:"primary",link:""},{default:l(()=>[u(_(e.row.Name),1)]),_:2},1024)]),_:1},8,["label"]),n(c,{"min-width":"270px",label:t.$t("值")},{default:l(({row:e})=>[e.edit?(a(),o(V,{key:0,modelValue:e.Value,"onUpdate:modelValue":s=>e.Value=s,class:"edit-input",size:"small"},null,8,["modelValue","onUpdate:modelValue"])):(a(),h("span",O,_(e.Value),1))]),_:1},8,["label"]),n(c,{label:t.$t("备注"),width:"270"},{default:l(({row:e})=>[e.edit?(a(),o(V,{key:0,modelValue:e.Memo,"onUpdate:modelValue":s=>e.Memo=s,class:"edit-input",size:"small"},null,8,["modelValue","onUpdate:modelValue"])):(a(),h("span",S,_(e.Memo),1))]),_:1},8,["label"]),n(c,{align:"center",label:t.$t("操作"),width:"270"},{default:l(({row:e})=>[e.edit?f("",!0):(a(),o(r,{key:0,type:"primary",size:"small",icon:d.ElIconEdit,onClick:s=>e.edit=!e.edit},{default:l(()=>[T]),_:2},1032,["icon","onClick"])),e.edit?(a(),o(r,{key:1,type:"success",size:"small",onClick:s=>p.confirmEdit(e)},{default:l(()=>[j]),_:2},1032,["onClick"])):f("",!0),e.edit?(a(),o(r,{key:2,type:"warning",size:"small",icon:d.ElIconRefresh,onClick:s=>p.cancelEdit(e)},{default:l(()=>[q]),_:2},1032,["icon","onClick"])):f("",!0)]),_:1},8,["label"])]),_:1},8,["data"])),[[C,d.listLoading]])])}const Q=x(R,[["render",F]]);export{Q as default};
