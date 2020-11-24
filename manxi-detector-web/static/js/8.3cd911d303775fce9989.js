webpackJsonp([8],{bOdI:function(e,t,a){"use strict";t.__esModule=!0;var n,o=a("C4MV"),r=(n=o)&&n.__esModule?n:{default:n};t.default=function(e,t,a){return t in e?(0,r.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},gRNZ:function(e,t){},yNug:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("bOdI"),o=a.n(n),r=a("47tL"),s=a("7+uW"),i={name:"menuManagement",inject:["reload"],data:function(){var e;return e={addCatalogueDrawer:!1,addCatalogueForm:{name:"",type:"",icon:""},rules:{name:[{required:!0,message:"请输入资源名称",trigger:"blur"}],type:[{required:!0}],icon:[{required:!0,message:"请输入资源图标",trigger:"blur"}],address:[{required:!0,message:"请输入资源路径",trigger:"blur"}]},form:{name:"",type:"",address:"",icon:""}},o()(e,"addCatalogueForm",{name:"",type:"目录",icon:""}),o()(e,"addLinkForm",{name:"",type:"链接",icon:"",address:""}),o()(e,"menusItem",[]),o()(e,"editDrawer",!1),o()(e,"addLinkDrawer",!1),o()(e,"linkID",null),e},beforeMount:function(){var e=this;r.a.systemService.menuManageList().then(function(t){"00"==t.code&&(e.menusItem=e.listToTree(t.data))})},methods:{listToTree:function(e){var t={},a=void 0,n=[],o=void 0;for(o=0;o<e.length;o++)t[e[o].id]=e[o],e[o].children=[];for(o=0;o<e.length;o+=1)"-1"!=(a=e[o]).pId?t[a.pId].children.push(a):n.push(a);return n},openToggle:function(e){var t=this;s.default.set(e,"open",!e.open);var a=function(a){if(t.menusItem[a].id!==e.id)return"continue";if(e.open){var n=t.menusItem;e.children.forEach(function(e,t){n.splice(a+t+1,0,e)})}else t.menusItem.splice(a+1,e.children.length);return"break"};e:for(var n=0;n<this.menusItem.length;n++){switch(a(n)){case"continue":continue;case"break":break e}}},addCatalogue:function(){this.addCatalogueDrawer=!0},cancelAddCatalogueForm:function(){this.addCatalogueDrawer=!1},resetForm:function(){this.$refs.addCatalogueForm.resetFields()},showRow:function(e){var t=!e.row.parent||e.row.parent._expanded&&e.row.parent._show;return e.row._show=t,t?"animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;":"display:none;"},saveAmendCatalogue:function(e,t){var a=this,n=parseInt(this.id),o=t.name,s=t.icon,i=t.address,l=null;"目录"===t.type&&(l="M"),"链接"===t.type&&(l="T"),this.$refs[e].validate(function(e){if(!e)return!1;var t={id:n,name:o,icon:s,type:l,address:i};r.a.systemService.menuManageEditSave(t).then(function(e){"00"==e.code&&(a.reload(),a.$notify.success({message:"保存成功",showClose:!1,duration:1e3}))})})},saveAddCatalogue:function(e,t){var a=this,n=t.name,o=t.icon,s=null;"目录"==t.type&&(s="M"),"链接"==t.type&&(s=" T"),this.$refs[e].validate(function(e){if(!e)return!1;var t={name:n,icon:o,type:s,pId:""};r.a.systemService.menuManageSaveAddCatalogue(t).then(function(e){"00"==e.code&&(a.reload(),a.$notify.success({message:"新增成功",showClose:!1,duration:1e3}))})})},edit:function(e){var t=this;this.editDrawer=!0,r.a.systemService.menuManageEdit(e).then(function(e){if("00"==e.code){var a=t.form,n=e.data;a.name=n.name,a.type=n.type,a.icon=n.icon,a.address=n.address,t.id=n.id,"M"===n.type&&(a.type="目录"),"T"===n.type&&(a.type="链接")}})},cancelForm:function(){this.editDrawer=!1},cancelAddLinkForm:function(){this.addLinkDrawer=!1},addLink:function(e){this.addLinkDrawer=!0,this.linkID=e},saveAddLink:function(e,t){var a=this,n=t.name,o=t.address,s=this.linkID,i=null;i="目录"==t.type?"M":"T",this.$refs[e].validate(function(e){if(!e)return!1;var t={pId:s,name:n,type:i,address:o};r.a.systemService.menuManageSaveAddCatalogue(t).then(function(e){"00"==e.code&&(a.reload(),a.$notify.success({message:"新增成功",showClose:!1,duration:1e3}))})})},blockUp:function(e){var t=this;new this.$messageTips(function(e){(0,e.alert)({content:"确定要停用吗?",tip:"确定停用"})}).then(function(){r.a.systemService.menuManageBlockUp(e).then(function(e){"00"==e.code&&(t.reload(),t.$notify({message:"停用成功",type:"warning",showClose:!1,duration:1e3}))})})},launch:function(e){var t=this;new this.$messageTips(function(e){(0,e.alert)({content:"确定要启用吗?",tip:"确定启用"})}).then(function(){r.a.systemService.menuManageLaunch(e).then(function(e){"00"==e.code&&(t.reload(),t.$notify.success({message:"启用成功",showClose:!1,duration:1e3}))})})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"menuManagement"},[e._m(0),e._v(" "),a("div",{staticClass:"operateBox"},[a("el-button",{staticClass:"addCatalogueButton",attrs:{type:"primary",size:"small"},on:{click:function(t){return e.addCatalogue()}}},[e._v("新增目录")]),e._v(" "),a("el-drawer",{ref:"addCatalogueDrawer",attrs:{title:"新增目录",visible:e.addCatalogueDrawer,"with-header":!1,wrapperClosable:!1,"close-on-press-escape":!1,size:"40%"},on:{"update:visible":function(t){e.addCatalogueDrawer=t},close:function(t){return e.resetForm("addCatalogueForm")}}},[a("div",{staticClass:"el-drawer-header"},[a("h3",[e._v("新增目录")])]),e._v(" "),a("div",{staticClass:"el-drawer-content"},[a("el-form",{ref:"addCatalogueForm",attrs:{model:e.addCatalogueForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"资源名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addCatalogueForm.name,callback:function(t){e.$set(e.addCatalogueForm,"name",t)},expression:"addCatalogueForm.name"}},[e._v("11")])],1),e._v(" "),a("el-form-item",{attrs:{label:"资源类型",prop:"type"}},[a("el-input",{attrs:{disabled:!0,placeholder:"目录"},model:{value:e.addCatalogueForm.type,callback:function(t){e.$set(e.addCatalogueForm,"type",t)},expression:"addCatalogueForm.type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资源图标",prop:"icon"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addCatalogueForm.icon,callback:function(t){e.$set(e.addCatalogueForm,"icon",t)},expression:"addCatalogueForm.icon"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"el-drawer-footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveAddCatalogue("addCatalogueForm",e.addCatalogueForm)}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{plain:""},on:{click:e.cancelAddCatalogueForm}},[e._v("取消")])],1)])],1),e._v(" "),a("div",{staticClass:"menuManagementBody"},[[a("el-table",{ref:"menusTable",attrs:{"row-style":e.showRow,data:e.menusItem}},[a("el-table-column",{attrs:{prop:"name",label:"资源名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:["type"+t.row.type]},[t.row.children?a("i",{class:[t.row.open?"el-icon-caret-bottom":"el-icon-caret-right"],on:{click:function(a){return e.openToggle(t.row)}}}):e._e(),e._v(" "),"M"===t.row.type?a("span",[a("i",{staticClass:"el-icon-folder"})]):e._e(),e._v(" "),"T"===t.row.type?a("span",[a("i",{staticClass:"el-icon-document"})]):e._e(),e._v("\n              "+e._s(t.row.name)+"\n            ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"资源路径"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.address)+"\n          ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"icon",label:"资源图标","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.icon))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"type",label:"资源类型"},scopedSlots:e._u([{key:"default",fn:function(t){return["M"===t.row.type?a("span",[e._v("目录")]):e._e(),e._v(" "),"T"===t.row.type?a("span",[e._v("链接")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"operation",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{effect:"dark",content:"编辑",placement:"top-start"}},[a("i",{staticClass:"el-icon-edit-outline editIcon",on:{click:function(a){return e.edit(t.row.id)}}})]),e._v(" "),a("el-drawer",{ref:"editDrawer",attrs:{title:"编辑",visible:e.editDrawer,"with-header":!1,wrapperClosable:!1,"close-on-press-escape":!1,size:"40%"},on:{"update:visible":function(t){e.editDrawer=t}}},[a("div",{staticClass:"el-drawer-header"},[a("h3",[e._v("编辑目录")])]),e._v(" "),a("div",{staticClass:"el-drawer-content"},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:"资源名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资源类型",prop:"type"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资源图标",prop:"icon"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资源路径",prop:"address"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"el-drawer-footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveAmendCatalogue("form",e.form)}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{plain:""},on:{click:e.cancelForm}},[e._v("取消")])],1)]),e._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"新增链接",placement:"top-start"}},["M"===t.row.type?a("i",{staticClass:"el-icon-link addLinkIcon",on:{click:function(a){return e.addLink(t.row.id)}}}):e._e()]),e._v(" "),a("el-drawer",{ref:"addLinkDrawer",attrs:{title:"新增链接",visible:e.addLinkDrawer,"with-header":!1,wrapperClosable:!1,"close-on-press-escape":!1,size:"40%"},on:{"update:visible":function(t){e.addLinkDrawer=t}}},[a("div",{staticClass:"el-drawer-header"},[a("h3",[e._v("新增链接")])]),e._v(" "),a("div",{staticClass:"el-drawer-content"},[a("el-form",{ref:"addLinkForm",attrs:{model:e.addLinkForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"资源名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addLinkForm.name,callback:function(t){e.$set(e.addLinkForm,"name",t)},expression:"addLinkForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资源类型",prop:"type"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.addLinkForm.type,callback:function(t){e.$set(e.addLinkForm,"type",t)},expression:"addLinkForm.type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"资源路径",prop:"address"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addLinkForm.address,callback:function(t){e.$set(e.addLinkForm,"address",t)},expression:"addLinkForm.address"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"el-drawer-footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveAddLink("addLinkForm",e.addLinkForm)}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{plain:""},on:{click:e.cancelAddLinkForm}},[e._v("取消")])],1)]),e._v(" "),1==t.row.status?a("el-tooltip",{attrs:{effect:"dark",content:"停用",placement:"top-start"}},[a("i",{staticClass:"el-icon-circle-close closeIcon",on:{click:function(a){return e.blockUp(t.row.id)}}})]):e._e(),e._v(" "),0==t.row.status?a("el-tooltip",{attrs:{effect:"dark",content:"启用",placement:"top-start"}},[a("i",{staticClass:"el-icon-circle-check checkIcon",on:{click:function(a){return e.launch(t.row.id)}}})]):e._e()]}}])})],1)]],2)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"menuManagementHeader"},[t("p",[this._v("当前位置:菜单管理")])])}]};var d=a("VU/8")(i,l,!1,function(e){a("gRNZ")},null,null);t.default=d.exports}});
//# sourceMappingURL=8.3cd911d303775fce9989.js.map