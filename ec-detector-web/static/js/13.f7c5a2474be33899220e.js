webpackJsonp([13],{"7FeM":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("lHA8"),r=a.n(o),n=a("c/Tr"),i=a.n(n),l=a("Xxa5"),s=a.n(l),c=a("exGp"),d=a.n(c),p=a("47tL"),u=a("NBFj"),m=a("7L5r"),v={name:"android",components:{pagination:u.a},mixins:[m.a],inject:["reload"],data:function(){var t=this;return{pickOptionsStart:{disabledDate:function(e){return e.getTime()>new Date(t.ruleForm.maxDetectionTime).getTime()||e.getTime()>Date.now()}},pickOptionsEnd:{disabledDate:function(e){return e.getTime()<new Date(t.ruleForm.minDetectionTime).getTime()||e.getTime()>Date.now()}},ruleForm:{appName:"",appVersion:"",detectionStatus:"",minDetectionTime:"",maxDetectionTime:""},rules:{detectorStrategyId:[{required:!0,message:"请选择检测策略",trigger:"blur"}]},addDownloadReportForm:{isCompliance:0},detectionStatusOptions:[{value:"0",label:"等待检测"},{value:"4",label:"引擎检测完成"},{value:"3",label:"检测失败"},{value:"1",label:"检测中"},{value:"2",label:"已完成"}],uploadForm:[],fileList:[],uploadTaskFileItem:[],activeNames:[],detectorStrategyList:[],uploadShow:!0,downloadReportDrawer:!1,addTaskDrawer:!1,loading:!1,listItem:[],curpage:1,limit:10}},beforeMount:function(){this.getData()},methods:{getData:function(){var t=this;return d()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(a={}).queryInfo=t.ruleForm,a.queryInfo.terminalType=1,t.getDataItem(t.addPageInfo(a));case 4:case"end":return e.stop()}},e,t)}))()},getDataItem:function(t){var e=this;return p.a.androidService.androidList(t).then(function(a){if("00"==a.code){var o=a.data.count,r=t.pn,n=t.limit;e.listItem=a.data.items,e.curpage=r,e.limit=n,e.onGotPageData({totalElements:o,size:n,number:r})}}),t},handleExceed:function(t,e){this.$message.warning("最多只能上传5个文件哦")},uploadTaskFile:function(t){var e=this,a=new FormData,o=this;a.append("file",t.file);var n={onUploadProgress:function(e){var a=e.loaded/e.total*100|0;t.onProgress({percent:a})}};p.a.uploadService.uploadFile(a,n).then(function(t){if("00"==t.code){e.uploadForm.push({detectorStrategyId:""}),o.uploadTaskFileItem.push(t.data),o.uploadShow=!1,p.a.detrctorTaskService.findStrategyList(1).then(function(t){"00"==t.code&&(e.detectorStrategyList=t.data)});for(var a=0;a<o.uploadTaskFileItem.length;a++)o.activeNames.push(a+1),o.activeNames=i()(new r.a(o.activeNames))}})},search:function(t){var e=this,a={};a.queryInfo=t,a.queryInfo.terminalType=1,this.loading=!0,this.addPageInfo(a),this.getDataItem(a),setTimeout(function(){e.loading=!1},500)},addTask:function(){this.addTaskDrawer=!0},saveTask:function(){var t=this,e=!0,a=this.uploadTaskFileItem.map(function(a,o){var r={detectionAppInfo:{appFileName:a.appFileName,appIcon:a.appIcon,appMbyte:a.appMbyte,appName:a.appName,appPackage:a.appPackage,appPath:a.appPath,appVersion:a.appVersion,detectionCount:a.detectionCount,md5:a.md5,terminalType:a.terminalType},detectionStrategyId:t.uploadForm[o].detectorStrategyId};return t.$refs.uploadForm[o].validate(function(t){t||(e=!1)}),r});e&&p.a.androidService.saveAndStartDetection(a).then(function(e){"00"==e.code&&t.$notify({message:"开始检测",type:"success"}),t.addTaskDrawer=!1,t.reload()})},cancelTask:function(){var t=this;this.uploadTaskFileItem.length?this.$confirm("会清空当前上传的文件,是否继续?","提示",{closeOnClickModal:!1,confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.addTaskDrawer=!1,t.$refs.uploadTask.clearFiles(),t.reload()}).catch(function(){}):this.addTaskDrawer=!1},downloadApk:function(t){var e=localStorage.getItem("Authorization"),a=this.api.baseUrl+"/detector/android/downloadApk?id="+t+"&Authorization="+e;window.location.href=a},downloadReport:function(t){this.downloadReportDrawer=!0},saveDownloadReport:function(t){var e=localStorage.getItem("Authorization"),a=this.addDownloadReportForm.isCompliance,o=this.api.baseUrl+"/detector/android/downloadReport?id="+t+"&isCompliance="+a+"&Authorization="+e;window.location.href=o,this.downloadReportDrawer=!1,this.reload()},cancelDownloadReport:function(){this.downloadReportDrawer=!1},refresh:function(){this.reload()},detailTask:function(t){this.$router.push({path:"/home/detector/android/detail",query:{id:t}})},deleteTask:function(t){var e=this;this.$confirm("确定要删除应用及其所有的检测记录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(a){p.a.androidService.deleteAndroidListById(t).then(function(t){"00"==t.code&&(e.$message({type:"success",message:"删除成功"}),e.reload())})}).catch(function(){})}},beforeRouteEnter:function(t,e,a){"androidDetail"==e.name?t.meta.KeepAlive=!0:t.meta.KeepAlive=!1,a()}},f={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"android"},[t._m(0),t._v(" "),o("div",{staticClass:"searchForm"},[o("div",{staticClass:"searchBox"},[o("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm}},[o("el-input",{attrs:{size:"small",placeholder:"请输入应用名称"},model:{value:t.ruleForm.appName,callback:function(e){t.$set(t.ruleForm,"appName",e)},expression:"ruleForm.appName"}}),t._v(" "),o("el-input",{attrs:{size:"small",placeholder:"请选择版本号"},model:{value:t.ruleForm.appVersion,callback:function(e){t.$set(t.ruleForm,"appVersion",e)},expression:"ruleForm.appVersion"}}),t._v(" "),o("el-select",{attrs:{placeholder:"请选择检测状态",size:"small"},model:{value:t.ruleForm.detectionStatus,callback:function(e){t.$set(t.ruleForm,"detectionStatus",e)},expression:"ruleForm.detectionStatus"}},t._l(t.detectionStatusOptions,function(t){return o("el-option",{key:t.value,attrs:{value:t.value,label:t.label}})}),1),t._v(" "),o("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"开始时间",size:"small","picker-options":t.pickOptionsStart},model:{value:t.ruleForm.minDetectionTime,callback:function(e){t.$set(t.ruleForm,"minDetectionTime",e)},expression:"ruleForm.minDetectionTime"}}),t._v(" "),o("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"结束时间",size:"small","picker-options":t.pickOptionsEnd},model:{value:t.ruleForm.maxDetectionTime,callback:function(e){t.$set(t.ruleForm,"maxDetectionTime",e)},expression:"ruleForm.maxDetectionTime"}})],1)],1),t._v(" "),o("div",{staticClass:"operateBox"},[o("el-tooltip",{attrs:{effect:"dark",content:"查询",placement:"top-start"}},[o("el-button",{staticClass:"searchButton",attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.search(t.ruleForm)}}})],1),t._v(" "),o("el-tooltip",{attrs:{effect:"dark",content:"刷新",placement:"top-start"}},[o("el-button",{staticClass:"refreshButton",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-refresh-right",size:"small"},on:{click:function(e){return t.refresh()}}})],1),t._v(" "),o("el-button",{staticClass:"addTaskButton",attrs:{type:"primary",size:"small"},on:{click:function(e){return t.addTask()}}},[t._v("新增任务")]),t._v(" "),o("el-drawer",{attrs:{title:"新增任务",visible:t.addTaskDrawer,"with-header":!1,wrapperClosable:!1,"close-on-press-esape":!1,"destroy-on-close":!0,size:"40%"},on:{"update:visible":function(e){t.addTaskDrawer=e}}},[o("div",{staticClass:"el-drawer-header"},[o("h3",[t._v("新增任务")])]),t._v(" "),o("div",{staticClass:"el-drawer-content"},[o("el-upload",{directives:[{name:"show",rawName:"v-show",value:t.uploadShow,expression:"uploadShow"}],ref:"uploadTask",staticClass:"uploadTask",attrs:{drag:"",action:"/","http-request":t.uploadTaskFile,"file-list":t.fileList,multiple:"",limit:5,"on-exceed":t.handleExceed,accept:".apk",size:"40%"}},[o("i",{staticClass:"el-icon-upload"}),t._v(" "),o("div",{staticClass:"el-upload__text"},[t._v("\n              将文件拖到此处,或"),o("em",[t._v("点击上传")])]),t._v(" "),o("div",{staticClass:"el-upload_tip",attrs:{slot:"tip"},slot:"tip"},[t._v("\n              最多只能上传5个文件\n            ")])]),t._v(" "),t._l(t.uploadTaskFileItem,function(e,a){return o("div",{key:a},[o("el-form",{ref:"uploadForm",refInFor:!0,attrs:{model:t.uploadForm[a],rules:t.rules}},[o("el-collapse",{staticClass:"applicationInfoCollapse",model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[o("el-collapse-item",{attrs:{title:"应用信息",name:a+1}},[o("el-row",[o("el-col",{attrs:{span:6}},[o("img",{attrs:{src:"data:image/jpg;base64,"+e.appIcon}})]),t._v(" "),o("el-col",{attrs:{span:18}},[o("p",{staticClass:"appName"},[t._v(t._s(e.appName))]),t._v(" "),o("p",{staticClass:"appPackage"},[t._v("\n                        包名:  "+t._s(e.appPackage)+"\n                      ")]),t._v(" "),o("p",[o("span",{staticStyle:{"margin-right":"10px"}},[t._v("版本:  "+t._s(e.appVersion)+"\n                        ")]),t._v(" "),o("span",[t._v("大小:  "+t._s(e.appMbyte)+"MB")])])]),t._v(" "),o("el-col",{staticClass:"detectorStrategyName"},[o("el-form-item",{attrs:{prop:"detectorStrategyId","label-width":"35%"}},[o("label",{attrs:{slot:"label"},slot:"label"},[t._v("检测策略:")]),t._v(" "),o("el-select",{attrs:{placeholder:"请选择检测策略",size:"small"},model:{value:t.uploadForm[a].detectorStrategyId,callback:function(e){t.$set(t.uploadForm[a],"detectorStrategyId",e)},expression:"uploadForm[index].detectorStrategyId"}},t._l(t.detectorStrategyList,function(t){return o("el-option",{key:t.strategyId,attrs:{label:t.strategyName,value:t.strategyId}})}),1)],1)],1)],1)],1)],1)],1)],1)})],2),t._v(" "),o("div",{staticClass:"el-drawer-footer"},[o("div",{staticClass:"buttonBox",staticStyle:{display:"inline-block"}},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.saveTask()}}},[t._v("保存")]),t._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(e){return t.cancelTask()}}},[t._v("取消")])],1)])])],1)]),t._v(" "),o("div",{staticClass:"androidBody"},[[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"listItem",attrs:{data:t.listItem,"element-loading-text":"加载中"}},[o("el-table-column",{attrs:{type:"index",label:"序号",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s((t.curpage-1)*t.limit+e.$index+1))])]}}])}),t._v(" "),o("el-table-column",{attrs:{width:"200",prop:"appName",label:"应用名称","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[o("img",{staticClass:"appIcon",attrs:{src:"data:image/jpg;base64,"+e.row.appIcon}}),t._v(" "),o("el-tooltip",{attrs:{effect:"dark",content:e.row.appName,placement:"top-start"}},[o("span",{staticStyle:{"margin-left":"7px"}},[t._v(t._s(e.row.appName))])])]}}])}),t._v(" "),o("el-table-column",{attrs:{width:"240",prop:"appFileName",label:"文件名称","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.appFileName))]}}])}),t._v(" "),o("el-table-column",{attrs:{width:"150",prop:"appVersion",label:"版本"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"version"},[o("img",{staticStyle:{width:"28px"},attrs:{src:a("lhpw")}}),t._v(" "),o("span",[t._v(t._s(e.row.appVersion))])])]}}])}),t._v(" "),o("el-table-column",{attrs:{widt:"150",prop:"detectionFormwork",label:"检测策略"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.detectionFormwork))]}}])}),t._v(" "),o("el-table-column",{attrs:{width:"100",prop:"detectionNumber",label:"检测分数"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.detectionNumber?o("span",[t._v(t._s(e.row.detectionNumber))]):o("span",[t._v("N/A")])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"detectionTime",label:"检测时间",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.detectionTime))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"detectionStatus",label:"检测状态",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.detectionStatus?o("span",[o("img",{staticClass:"detectionStatusimg",attrs:{src:a("18Qj")}}),t._v("\n              等待检测\n            ")]):1==e.row.detectionStatus?o("span",[o("img",{staticClass:"detectionStatusimg",attrs:{src:a("xH8i")}}),t._v("\n              检测中\n            ")]):2==e.row.detectionStatus?o("span",[o("img",{staticClass:"detectionStatusimg",attrs:{src:a("Agr7")}}),t._v("\n              已完成\n            ")]):3==e.row.detectionStatus?o("span",[o("img",{staticClass:"detectionStatusimg",attrs:{src:a("3xxH")}}),t._v("\n              检测失败\n            ")]):4==e.row.detectionStatus?o("span",[o("img",{staticClass:"detectionStatusimg",attrs:{src:a("Agr7")}}),t._v("\n              引擎检测完成\n            ")]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"userName",label:"上传人",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.userName))]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"290",prop:"operate"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-tooltip",{attrs:{effect:"dark",content:"下载应用",placement:"top-start"}},[o("i",{staticClass:"el-icon-download dowmloadApplicationIcon",on:{click:function(a){return t.downloadApk(e.row.taskId)}}})]),t._v(" "),o("el-tooltip",{attrs:{effect:"dark",content:"详情",placement:"top-start"}},[2==e.row.detectionStatus?[o("i",{staticClass:"el-icon-tickets detailIcon",on:{click:function(a){return t.detailTask(e.row.taskId)}}})]:[o("i",{staticClass:"el-icon-tickets disabledIcon"})]],2),t._v(" "),o("el-tooltip",{attrs:{effect:"dark",content:"下载报告",placement:"top-start"}},[2==e.row.detectionStatus?[o("i",{staticClass:"el-icon-sold-out downloadReportIcon",on:{click:function(a){return t.downloadReport(e.row.taskId)}}})]:[o("i",{staticClass:"el-icon-sold-out disabledIcon "})]],2),t._v(" "),o("el-drawer",{ref:"downloadReportDrawer",staticClass:"downloadReportDrawer",attrs:{title:"下载报告",visible:t.downloadReportDrawer,"with-header":!1,wrapperClosable:!1,"close-on-press-escape":!1,"destroy-on-close":!0,size:"40%"},on:{"update:visible":function(e){t.downloadReportDrawer=e}}},[o("div",{staticClass:"el-drawer-header"},[o("h3",[t._v("下载报告")])]),t._v(" "),o("div",{staticClass:"el-drawer-content"},[o("el-form",{attrs:{model:t.addDownloadReportForm}},[o("el-form-item",{attrs:{prop:"isCompliance"}},[o("label",{attrs:{slot:"label"},slot:"label"},[t._v("报告模板:")]),t._v(" "),o("el-radio-group",{model:{value:t.addDownloadReportForm.isCompliance,callback:function(e){t.$set(t.addDownloadReportForm,"isCompliance",e)},expression:"addDownloadReportForm.isCompliance"}},[o("el-radio",{attrs:{label:0}},[t._v("全量报告")]),t._v(" "),o("el-radio",{attrs:{label:2}},[t._v("整改报告")])],1)],1)],1)],1),t._v(" "),o("div",{staticClass:"el-drawer-footer"},[o("div",{staticClass:"buttonBox",staticStyle:{display:"inline-block"}},[o("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.saveDownloadReport(e.row.taskId)}}},[t._v("保存")]),t._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(e){return t.cancelDownloadReport()}}},[t._v("取消")])],1)])]),t._v(" "),o("el-tooltip",{attrs:{effect:"dark",content:"删除",placement:"top-start"}},[2==e.row.detectionStatus?[o("i",{staticClass:"el-icon-delete deleteIcon",on:{click:function(a){return t.deleteTask(e.row.taskId)}}})]:[o("i",{staticClass:"el-icon-delete  disabledIcon"})]],2)]}}])})],1)]],2),t._v(" "),o("div",{staticClass:"androidBase"},[o("pagination",{on:{pageChanged:t.onPageChanged}})],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"androidHeader"},[e("p",[this._v("当前位置:Android检测管理")])])}]};var w=a("VU/8")(v,f,!1,function(t){a("8NrD")},null,null);e.default=w.exports},"8NrD":function(t,e){}});
//# sourceMappingURL=13.f7c5a2474be33899220e.js.map