import{q as w,_ as x,G as k,r as u,A as z,o as g,c as p,a as f,b as s,w as i,F as y,C as S,y as _,x as I,e as d,t as n}from"./index-633674dc.js";import{g as L}from"./container-02c8ebb7.js";import{g as Q}from"./server-6055fca5.js";import{g as F,a as M}from"./logs-54f85007.js";import{E as P}from"./Search-d6d307cc.js";function U(t){return w({url:"/mgr/stats/list",method:"get",params:t})}function E(t){return w({url:"/mgr/stats/detail",method:"get",params:t})}const B={data(){return{list:[],page:{currentPage:1,pageSize:10,total:0},listLoading:!0,dialogDetailVisible:!1,selectRow:{},res:{serverNames:[],ContainerNames:[],containerInfos:[]},listQuery:{serverNames:[],ContainerNames:[],Follow:void 0},ElIconSearch:P}},created(){this.fetchServerNames(),this.fetchContainerInfoData(),this.fetchData()},methods:{statusFilter_filter(t){return{published:"success",draft:"gray",deleted:"danger"}[t]},fetchServerNames(){this.listLoading=!0,Q().then(t=>{this.res.serverNames=t.data,this.listLoading=!1})},fetchContainerInfoData(){this.loading=!0,L().then(t=>{const l=t.data;this.res.ContainerNames=[];for(const r in l)for(const C in l[r].containers){const a=l[r].containers[C].Name;this.res.ContainerNames.indexOf(a)===-1&&this.res.ContainerNames.push(a)}this.loading=!1})},fetchData(){this.listLoading=!0,this.listQuery.currentPage=this.page.currentPage,this.listQuery.pageSize=this.page.pageSize,U(this.listQuery).then(t=>{this.list=t.data.list,this.page=t.data.page,this.listLoading=!1})},handleSizeChange(t){this.page.pageSize=t,this.fetchData()},handleCurrentChange(t){this.page.currentPage=t,this.fetchData()},startLog(t){const l={containerId:t.ContainerId};this.loading=!0,F(l).then(r=>{this.loading=!1,this.$message(this.$t("命令已下发"))}).catch(r=>{this.loading=!1,this.$message(r.msg)})},closeLog(t){const l={containerId:t.ContainerId};this.loading=!0,M(l).then(r=>{this.loading=!1,this.$message(this.$t("命令已下发"))}).catch(r=>{this.loading=!1})},openDetail(t){this.selectRow=t,this.dialogDetailVisible=!0,E({ContainerId:t.ContainerId}).then(l=>{this.selectRow=l.data})},formatDate(t){return k(t)}}},R={class:"app-container"},j={class:"filter-container"},O=d(" Search "),q={style:{"text-indent":"-2em"}};function A(t,l,r,C,a,c){const h=u("el-option"),m=u("el-select"),b=u("el-button"),o=u("el-table-column"),N=u("el-table"),v=u("el-pagination"),D=u("el-dialog"),V=z("loading");return g(),p("div",R,[f("div",j,[s(m,{modelValue:a.listQuery.serverNames,"onUpdate:modelValue":l[0]||(l[0]=e=>a.listQuery.serverNames=e),multiple:"",filterable:"",placeholder:t.$t("主机"),clearable:"","collapse-tags":"",class:"filter-item",style:{width:"300px"}},{default:i(()=>[(g(!0),p(y,null,S(a.res.serverNames,e=>(g(),_(h,{key:e,label:e,value:e},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"]),s(m,{modelValue:a.listQuery.ContainerNames,"onUpdate:modelValue":l[1]||(l[1]=e=>a.listQuery.ContainerNames=e),multiple:"",filterable:"",placeholder:t.$t("容器名称"),clearable:"","collapse-tags":"",class:"filter-item",style:{width:"300px","margin-left":"10px"}},{default:i(()=>[(g(!0),p(y,null,S(a.res.ContainerNames,e=>(g(),_(h,{key:e,label:e,value:e},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"]),s(m,{modelValue:a.listQuery.Follow,"onUpdate:modelValue":l[2]||(l[2]=e=>a.listQuery.Follow=e),placeholder:t.$t("是否开启日志"),clearable:"",filterable:"",style:{width:"140px","margin-left":"10px","margin-right":"10px"},class:"filter-item"},{default:i(()=>[s(h,{key:"true",label:t.$t("是"),value:"true"},null,8,["label"]),s(h,{key:"false",label:t.$t("否"),value:"false"},null,8,["label"])]),_:1},8,["modelValue","placeholder"]),s(b,{class:"filter-item",type:"primary",icon:a.ElIconSearch,onClick:c.fetchData},{default:i(()=>[O]),_:1},8,["icon","onClick"])]),I((g(),_(N,{data:a.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":"",style:{"margin-top":"15px"}},{default:i(()=>[s(o,{align:"center",label:"ID",width:"95"},{default:i(e=>[d(n(e.$index+1),1)]),_:1}),s(o,{label:"Name",width:"210"},{default:i(e=>[s(b,{type:"primary",link:"",onClick:G=>c.openDetail(e.row)},{default:i(()=>[d(n(e.row.Name),1)]),_:2},1032,["onClick"])]),_:1}),s(o,{label:"ServerName",width:"170",align:"center"},{default:i(e=>[f("span",null,n(e.row.ServerName),1)]),_:1}),s(o,{label:"CpuStats",width:"150",align:"center"},{default:i(({row:e})=>[d(n(e.CpuStats==0?"":e.CpuStats.toFixed(2)+"%"),1)]),_:1}),s(o,{label:"MemoryStats","min-width":"180",align:"center"},{default:i(e=>[d(n(e.row.MemoryStats),1)]),_:1}),s(o,{label:"MEM %","min-width":"150",align:"center"},{default:i(({row:e})=>[d(n(e.MemoryStatsPercent==0?"":e.MemoryStatsPercent.toFixed(2)+"%"),1)]),_:1}),s(o,{label:"Networks",width:"210",align:"center"},{default:i(e=>[d(n(e.row.Networks),1)]),_:1}),s(o,{label:"UpdateDate",width:"210",align:"center"},{default:i(e=>[d(n(c.formatDate(e.row.UpdateDate)),1)]),_:1})]),_:1},8,["data"])),[[V,a.listLoading]]),s(v,{"hide-on-single-page":!0,"current-page":a.page.currentPage,"page-sizes":[10,30,50,100,200,300,400],"page-size":a.page.pageSize,layout:"prev, pager, next, jumper, sizes, total",total:a.page.total,style:{width:"500px",margin:"10px auto 0"},onSizeChange:c.handleSizeChange,onCurrentChange:c.handleCurrentChange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"]),s(D,{modelValue:a.dialogDetailVisible,"onUpdate:modelValue":l[3]||(l[3]=e=>a.dialogDetailVisible=e),title:t.$t("详情")},{default:i(()=>[f("pre",q,"    "+n(JSON.stringify(a.selectRow,null,2))+`
          `,1)]),_:1},8,["modelValue","title"])])}const X=x(B,[["render",A]]);export{X as default};
