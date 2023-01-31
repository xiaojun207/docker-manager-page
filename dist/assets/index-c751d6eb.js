import{p as N,a as I}from"./container-02c8ebb7.js";import{g as L}from"./server-6055fca5.js";import{d as M,k as j,H as O,I as B,J as C,_ as E,o as c,c as b,K as R,r as y,a as S,b as t,t as v,w as r,e as V,F as w,C as P,y as U,p as W,f as z}from"./index-633674dc.js";import{E as $}from"./Delete-daedcea7.js";const A={modelValue:{type:String,default:null},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"100%"},language:{type:String,default:"javascript"},readOnly:{type:Boolean,default:!1},theme:{type:String,validator(o){return["vs","hc-black","vs-dark","hc-light"].includes(o)},default:"vs-dark"},options:{type:Object,default(){return{automaticLayout:!0,foldingStrategy:"indentation",renderLineHighlight:"all",selectOnLineNumbers:!0,minimap:{enabled:!0},placeholder:"please enter...",fontSize:16,scrollBeyondLastLine:!1,overviewRulerBorder:!1}}}},G=M({name:"MonacoEditor",props:A,emits:["update:modelValue","change","editor-mounted"],setup(o,{emit:n}){let m;const f=j();let e=!1;const a={},d=s=>(a[s]||(a[s]=new Promise((u,g)=>{const _=document.createElement("script");_.src=s,document.body.append(_),_.addEventListener("load",()=>{u(!0)}),_.onerror=()=>{e=!1,document.body.removeChild(_),g()}})),a[s]),p=()=>e===!0?Promise.resolve():d("https://g.alicdn.com/code/lib/monaco-editor/0.34.1/min/vs/loader.js").then(()=>{window.require.config({paths:{vs:"//g.alicdn.com/code/lib/monaco-editor/0.34.1/min/vs"}}),e=!0}).catch(()=>{e=!1});self.MonacoEnvironment={getWorkerUrl:function(s,u){return`data:text/javascript;charset=utf-8,${encodeURIComponent(`
            self.MonacoEnvironment = {
              baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/'
            };
            importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/base/worker/workerMain.js');`)}`}};const k=()=>{p().then(()=>{const s=()=>{f.value&&(console.log("window.monaco.editor:",window.monaco.editor),m=window.monaco.editor.create(f.value,{value:o.modelValue,language:o.language,theme:o.theme,automaticLayout:!0,...o.options}),window.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!1,noSyntaxValidation:!1}),window.monaco.languages.typescript.javascriptDefaults.setCompilerOptions({target:window.monaco.languages.typescript.ScriptTarget.ES2020,allowNonTsExtensions:!0}),m.onDidChangeModelContent(()=>{const u=m.getValue();n("update:modelValue",u),n("change",u)}),n("editor-mounted",m))};window.require(["vs/editor/editor.main"],s)})};return O(()=>{console.log("Monaco.onBeforeUnmount"),m?m.dispose():console.log("onBeforeUnmount editor is not")}),B(()=>{console.log("Monaco.onMounted"),k()}),C(()=>o.modelValue,s=>{if(m){const u=m.getValue();s!==u&&m.setValue(s)}}),C(()=>o.options,s=>{m.updateOptions(s)},{deep:!0}),C(()=>o.readOnly,()=>{m.updateOptions({readOnly:o.readOnly})},{deep:!0}),C(()=>o.language,s=>{window.monaco.editor.setModelLanguage(m.getModel(),s)}),{codeEditBox:f}}});const F={ref:"codeEditBox",class:"code-edit-container"};function H(o,n,m,f,e,a){return c(),b("div",F,null,512)}const J=E(G,[["render",H],["__scopeId","data-v-23e6ca2f"]]);const K={name:"PublishForm",data(){return{res:{ServerNames:[],logTypes:[{name:"json-file",summary:"日志格式化为 JSON。这是 Docker 默认的日志驱动程序。"},{name:"syslog",summary:"将日志消息写入 syslog 工具。需配置syslog地址参数syslog-address，或守护程序必须在主机上运行。"},{name:"journald",summary:"将日志消息写入 journald。journald 守护程序必须在主机上运行。"},{name:"gelf",summary:"将日志消息写入 Graylog Extended Log Format (GELF) 终端，例如 Graylog 或 Logstash。"},{name:"fluentd",summary:"将日志消息写入 fluentd（forward input）。需配置fluentd地址参数fluentd-address，或fluentd守护程序必须在主机上运行。"},{name:"awslogs",summary:"将日志消息写入 Amazon CloudWatch Logs。"},{name:"splunk",summary:"Writes log messages to splunk using the HTTP Event Collector."},{name:"etwlogs",summary:"将日志消息写为 Windows 的 Event Tracing 事件。仅在Windows平台上可用。"},{name:"gcplogs",summary:"将日志消息写入 Google Cloud Platform (GCP) Logging。"},{name:"logentries",summary:"将日志消息写入 Rapid7 Logentries。"}],logTypes2:["json-file","fluentd","journald","syslog","gelf","awslogs","splunk","etwlogs","gcplogs","logentries"]},tempPlaceholder:"docker run -d --name test-openresty -p 80:80 -p 443:443 -m 512m -e user=root -v /tmp/openresty/nginx/logs:/usr/local/openresty/nginx/logs openresty/openresty:latest",formTmp:{Ports:[],Env:[],Volumes:[],LogConfig:[],Memory:0,Replicas:1,tempText:""},form:{Image:"",Cmd:"",Name:"",Ports:[],Volumes:[],Env:[],ServerNames:[],Memory:0,LogType:"",LogConfig:[],cover:!0},ElIconPlus:R,ElIconDelete:$}},created(){this.fetchData()},methods:{onSubmit(){this.listLoading=!0;const o=[];for(const e in this.formTmp.Ports){const a=this.formTmp.Ports[e];let d=a.IP;a.PublicPort&&a.PublicPort.length>0&&(d+=(d.length>0?":":"")+a.PublicPort),o.push((d.length>0?"->":"")+a.PrivatePort+"/"+a.Type)}const n=[];for(const e in this.formTmp.Env){const a=this.formTmp.Env[e];n.push(a.key+"="+a.value)}const m=[];for(const e in this.formTmp.Volumes){const a=this.formTmp.Volumes[e];m.push(a.Source+":"+a.Destination+a.RW)}const f={};for(const e in this.formTmp.LogConfig){const a=this.formTmp.LogConfig[e];f[a.key]=a.value}this.form.Env=n,this.form.Volumes=m,this.form.LogConfig=f,this.form.Memory=this.formTmp.Memory*1024*1024,console.log("this.form:",this.form),N(this.form).then(e=>{this.$message("发布成功"),this.listLoading=!1})},onCancel(){this.$message({message:"cancel!",type:"warning"})},fetchData(){this.listLoading=!0,L().then(o=>{this.res.ServerNames=o.data,this.listLoading=!1})},addPort(){this.form.Ports.push({PublicPort:"",PrivatePort:"",IP:"0.0.0.0",Type:"tcp"})},delPort(o,n){delete this.form.Ports},addVolume(){this.formTmp.Volumes.push({Source:"",Destination:"",RW:":rw",Mode:"",Type:"bind",Propagation:"rprivate"})},delVolume(o,n){delete this.formTmp.Volumes},addEnv:function(){this.formTmp.Env.push({key:"",value:""})},delEnv(o,n){delete this.formTmp.Env},addLogConfig:function(){this.formTmp.LogConfig.push({key:"",value:""})},delLogConfig(o,n){delete this.formTmp.LogConfig},clear(){this.form.Image="",this.form.Ports=[],this.formTmp.Volumes=[],this.formTmp.Env=[]},toForm(){const o=this.formTmp.tempText,n=["run","-d","--name","-p","-e","-v","-m"],m=o.split(" ");let f="",e="",a=!1,d=!0,p="",k="";this.clear();for(const s in m){if(!d&&!n.includes(m[s])){p===""?(p=m[s],this.form.Image=p):(k+=" "+m[s],this.form.Cmd=k);continue}if(d=n.includes(m[s]),e+=m[s],m[s]==="")if(a)e+=" ";else continue;if(f==="--name")this.form.Name=e;else if(f==="-m"){const u=e.toLowerCase().replaceAll("m","");this.formTmp.Memory=parseInt(u)}else if(f==="-p"){const u=e.split(":");this.form.Ports.push({PublicPort:u[0],PrivatePort:u[1],IP:"0.0.0.0",Type:"tcp"})}else if(f==="-v"){const u=e.split(":");this.formTmp.Volumes.push({Source:u[0],Destination:u[1],RW:":rw",Mode:"",Type:"bind",Propagation:"rprivate"})}else if(f==="-e"){const u=e.split("=");this.formTmp.Env.push({key:u[0],value:u[1]})}(e.startsWith('"')||e.endsWith('"'))&&(a=!a),a||(f=e,e="")}}}},x=o=>(W("data-v-5f3559db"),o=o(),z(),o),Y={class:"app-container"},X={style:{"margin-bottom":"15px"}},q={style:{color:"#90949b","font-size":"14px",padding:"10px"}},Q=["items"],Z=x(()=>S("span",{style:{color:"#2b2b2b"}}," -> ",-1)),ee=["items"],oe=x(()=>S("span",{style:{color:"#2b2b2b"}}," : ",-1)),le=["value","items"],te=x(()=>S("span",{style:{color:"#2b2b2b"}}," = ",-1)),ne=["value","items"],ae=x(()=>S("span",{style:{color:"#2b2b2b"}}," = ",-1));function se(o,n,m,f,e,a){const d=y("el-input"),p=y("el-button"),k=y("el-checkbox"),s=y("el-form-item"),u=y("el-input-number"),g=y("el-option"),_=y("el-select"),h=y("el-link"),D=y("el-form");return c(),b("div",Y,[S("div",X,[t(d,{modelValue:e.formTmp.tempText,"onUpdate:modelValue":n[0]||(n[0]=l=>e.formTmp.tempText=l),type:"textarea",rows:5,placeholder:o.$t("临时记录区域")},null,8,["modelValue","placeholder"]),S("div",q,v(o.$t(" 如下内容，可解析到表单"))+"："+v(e.tempPlaceholder),1),t(p,{type:"primary",style:{"margin-top":"10px"},onClick:a.toForm},{default:r(()=>[V(v(o.$t("解析")),1)]),_:1},8,["onClick"])]),t(D,{ref:"form",model:e.form,"label-width":"120px"},{default:r(()=>[t(s,{label:o.$t("容器名称")},{default:r(()=>[t(d,{modelValue:e.form.Name,"onUpdate:modelValue":n[1]||(n[1]=l=>e.form.Name=l),placeholder:o.$t("容器名称")},null,8,["modelValue","placeholder"]),t(k,{modelValue:e.form.cover,"onUpdate:modelValue":n[2]||(n[2]=l=>e.form.cover=l)},{default:r(()=>[V(v(o.$t("如果容器名存在，则覆盖")),1)]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(s,{label:o.$t("镜像")},{default:r(()=>[t(d,{modelValue:e.form.Image,"onUpdate:modelValue":n[3]||(n[3]=l=>e.form.Image=l),placeholder:"docker.io/library/nginx:latest"},null,8,["modelValue"])]),_:1},8,["label"]),t(s,{label:o.$t("内存(M)")},{default:r(()=>[t(u,{modelValue:e.formTmp.Memory,"onUpdate:modelValue":n[4]||(n[4]=l=>e.formTmp.Memory=l),controls:!1,placeholder:o.$t("内存，如：128"),style:{width:"210px"}},null,8,["modelValue","placeholder"]),t(d,{disabled:"",placeholder:"M",style:{width:"50px"}})]),_:1},8,["label"]),t(s,{label:o.$t("端口映射")},{default:r(()=>[t(p,{type:"success",size:"small",icon:e.ElIconPlus,onClick:n[5]||(n[5]=l=>a.addPort())},{default:r(()=>[V(v(o.$t("添加")),1)]),_:1},8,["icon"]),(c(!0),b(w,null,P(e.form.Ports,(l,T)=>(c(),b("div",{key:l.key,items:e.form.Ports,style:{"margin-top":"10px"}},[t(d,{modelValue:l.PublicPort,"onUpdate:modelValue":i=>l.PublicPort=i,placeholder:"8080",style:{width:"200px"}},{prepend:r(()=>[V(v(l.IP)+":",1)]),_:2},1032,["modelValue","onUpdate:modelValue"]),Z,t(d,{modelValue:l.PrivatePort,"onUpdate:modelValue":i=>l.PrivatePort=i,placeholder:"8080",style:{width:"200px"}},{append:r(()=>[t(_,{modelValue:l.Type,"onUpdate:modelValue":i=>l.Type=i,placeholder:"TCP",style:{width:"80px"}},{default:r(()=>[t(g,{label:"TCP",value:"tcp"}),t(g,{label:"UDP",value:"udp"}),t(g,{label:"SCTP",value:"sctp"})]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["modelValue","onUpdate:modelValue"]),t(p,{type:"danger",style:{"margin-left":"15px"},size:"small",icon:e.ElIconDelete,circle:"",onClick:i=>a.delPort(l,T)},null,8,["icon","onClick"])],8,Q))),128))]),_:1},8,["label"]),t(s,{label:o.$t("卷映射")},{default:r(()=>[t(p,{type:"success",size:"small",icon:e.ElIconPlus,onClick:n[6]||(n[6]=l=>a.addVolume())},{default:r(()=>[V(v(o.$t("添加")),1)]),_:1},8,["icon"]),t(h,{type:"info",underline:!1,href:"https://docs.docker.com/storage/bind-mounts/#start-a-container-with-a-bind-mount",style:{"margin-left":"10px"}},{default:r(()=>[V(v(o.$t("Bind模式相当于docker -v参数。如何挂载卷？")),1)]),_:1}),(c(!0),b(w,null,P(e.formTmp.Volumes,(l,T)=>(c(),b("div",{key:l.hostPath,items:e.formTmp.Volumes,style:{"margin-top":"10px"}},[t(d,{modelValue:l.Source,"onUpdate:modelValue":i=>l.Source=i,placeholder:o.$t("源地址(宿主机地址)"),style:{width:"400px"}},{prepend:r(()=>[t(_,{modelValue:l.Type,"onUpdate:modelValue":i=>l.Type=i,disabled:"",placeholder:o.$t("绑定方式"),style:{width:"100px"}},{default:r(()=>[t(g,{label:"Bind",value:"bind"}),t(g,{label:"Volume",value:"volume"}),t(g,{label:"Tmpfs",value:"tmpfs"})]),_:2},1032,["modelValue","onUpdate:modelValue","placeholder"])]),_:2},1032,["modelValue","onUpdate:modelValue","placeholder"]),oe,t(d,{modelValue:l.Destination,"onUpdate:modelValue":i=>l.Destination=i,placeholder:o.$t("容器内地址"),style:{width:"400px"}},{append:r(()=>[t(_,{modelValue:l.RW,"onUpdate:modelValue":i=>l.RW=i,clearable:"",placeholder:"",style:{width:"80px"}},{default:r(()=>[t(g,{label:o.$t("读写"),value:":rw"},null,8,["label"]),t(g,{label:o.$t("只读"),value:":ro"},null,8,["label"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["modelValue","onUpdate:modelValue","placeholder"]),t(p,{type:"danger",style:{"margin-left":"15px"},size:"small",icon:e.ElIconDelete,circle:"",onClick:i=>a.delVolume(l,T)},null,8,["icon","onClick"])],8,ee))),128))]),_:1},8,["label"]),t(s,{label:o.$t("环境变量")},{default:r(()=>[t(p,{type:"success",size:"small",icon:e.ElIconPlus,onClick:n[7]||(n[7]=l=>a.addEnv())},{default:r(()=>[V(v(o.$t("添加")),1)]),_:1},8,["icon"]),(c(!0),b(w,null,P(e.formTmp.Env,(l,T)=>(c(),b("div",{key:T,value:l,items:e.formTmp.Env,style:{"margin-top":"10px"}},[t(d,{modelValue:l.key,"onUpdate:modelValue":i=>l.key=i,placeholder:o.$t("变量key"),style:{width:"400px"}},null,8,["modelValue","onUpdate:modelValue","placeholder"]),te,t(d,{modelValue:l.value,"onUpdate:modelValue":i=>l.value=i,placeholder:o.$t("变量值"),style:{width:"400px"}},null,8,["modelValue","onUpdate:modelValue","placeholder"]),t(p,{type:"danger",style:{"margin-left":"15px"},size:"small",icon:e.ElIconDelete,circle:"",onClick:i=>a.delEnv(l,T)},null,8,["icon","onClick"])],8,le))),128))]),_:1},8,["label"]),t(s,{label:o.$t("日志驱动")},{default:r(()=>[t(_,{modelValue:e.form.LogType,"onUpdate:modelValue":n[8]||(n[8]=l=>e.form.LogType=l),clearable:"",placeholder:o.$t("请选择")},{default:r(()=>[(c(!0),b(w,null,P(e.res.logTypes,l=>(c(),U(g,{key:l.key,label:l.name,value:l.name,title:l.summary},null,8,["label","value","title"]))),128))]),_:1},8,["modelValue","placeholder"]),t(h,{type:"info",underline:!1,href:"https://docs.docker.com/config/containers/logging/configure/",style:{"margin-left":"10px"}},{default:r(()=>[V(v(o.$t("如何选择日志驱动？")),1)]),_:1})]),_:1},8,["label"]),t(s,{label:o.$t("日志配置参数")},{default:r(()=>[t(p,{type:"success",size:"small",icon:e.ElIconPlus,onClick:n[9]||(n[9]=l=>a.addLogConfig())},{default:r(()=>[V(v(o.$t("添加")),1)]),_:1},8,["icon"]),(c(!0),b(w,null,P(e.formTmp.LogConfig,(l,T)=>(c(),b("div",{key:l.key,value:l,items:e.formTmp.LogConfig,style:{"margin-top":"10px"}},[t(d,{modelValue:l.key,"onUpdate:modelValue":i=>l.key=i,placeholder:o.$t("变量key"),style:{width:"400px"}},null,8,["modelValue","onUpdate:modelValue","placeholder"]),ae,t(d,{modelValue:l.value,"onUpdate:modelValue":i=>l.value=i,placeholder:o.$t("变量值"),style:{width:"400px"}},null,8,["modelValue","onUpdate:modelValue","placeholder"]),t(p,{type:"danger",style:{"margin-left":"15px"},size:"small",icon:e.ElIconDelete,circle:"",onClick:i=>a.delLogConfig(l,T)},null,8,["icon","onClick"])],8,ne))),128))]),_:1},8,["label"]),t(s,{label:o.$t("目标主机")},{default:r(()=>[t(_,{modelValue:e.form.ServerNames,"onUpdate:modelValue":n[10]||(n[10]=l=>e.form.ServerNames=l),multiple:"",filterable:"",placeholder:"ServerName",clearable:"",class:"filter-item",style:{width:"100%"}},{default:r(()=>[(c(!0),b(w,null,P(e.res.ServerNames,l=>(c(),U(g,{key:l,label:l,value:l},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(s,null,{default:r(()=>[t(p,{type:"primary",style:{width:"200px"},onClick:a.onSubmit},{default:r(()=>[V(v(o.$t("发布")),1)]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])])}const re=E(K,[["render",se],["__scopeId","data-v-5f3559db"]]);const me=`version: "2"

services:
  openresty:
    container_name: test-openresty
    image: openresty/openresty:latest
    restart: always
    ports:
      - "80:80"
      - "443:443"
    environment:
      - GET_HOSTS_FROM=dns
    volumes:
      - "/tmp/data/web:/data/web"
      - "/tmp/openresty/nginx/logs:/usr/local/openresty/nginx/logs"
    

`,ie='[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]',de={components:{MonacoEditor:J,PublishForm:re},data(){return{res:{ServerNames:[]},form:{ServerNames:[]},activeName:"2",yamlData:me,jsonData:JSON.parse(ie)}},created(){this.fetchData()},methods:{onSubmit(){const o={serverNames:this.form.ServerNames,yaml:this.yamlData};I(o).then(n=>{this.$message("发布成功")})},fetchData(){this.listLoading=!0,L().then(o=>{this.res.ServerNames=o.data,this.listLoading=!1})}}},ue={class:"app-container"},pe={style:{color:"#90949b","font-size":"14px",padding:"10px"}};function ce(o,n,m,f,e,a){const d=y("publish-form"),p=y("el-tab-pane"),k=y("MonacoEditor"),s=y("el-option"),u=y("el-select"),g=y("el-button"),_=y("el-tabs");return c(),b("div",ue,[t(_,{modelValue:e.activeName,"onUpdate:modelValue":n[3]||(n[3]=h=>e.activeName=h),type:"card"},{default:r(()=>[t(p,{label:o.$t("表单模式"),name:"2"},{default:r(()=>[t(d)]),_:1},8,["label"]),t(p,{label:"Yaml",name:"3"},{default:r(()=>[S("div",pe,v(o.$t("使用docker compose yaml格式规范")),1),t(k,{modelValue:e.yamlData,"onUpdate:modelValue":n[0]||(n[0]=h=>e.yamlData=h),language:"yaml",width:"100%",height:"100%"},null,8,["modelValue"]),t(u,{modelValue:e.form.ServerNames,"onUpdate:modelValue":n[1]||(n[1]=h=>e.form.ServerNames=h),multiple:"",filterable:"",placeholder:"ServerName",clearable:"",class:"filter-item",style:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},{default:r(()=>[(c(!0),b(w,null,P(e.res.ServerNames,h=>(c(),U(s,{key:h,label:h,value:h},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),t(g,{type:"primary",style:{width:"200px"},onClick:a.onSubmit},{default:r(()=>[V(v(o.$t("发布")),1)]),_:1},8,["onClick"])]),_:1}),t(p,{label:"Json",name:"4",disabled:""},{default:r(()=>[t(k,{modelValue:e.jsonData,"onUpdate:modelValue":n[2]||(n[2]=h=>e.jsonData=h),language:"json",width:"100%",height:"100%"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}const ve=E(de,[["render",ce],["__scopeId","data-v-cdc308f0"]]);export{ve as default};
