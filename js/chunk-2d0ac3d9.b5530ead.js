(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac3d9"],{1961:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return we}));n("b0c0");var i=n("7a23"),o={class:"p-fluid p-formgrid p-grid"},l={class:"p-field p-col-12"},c={for:"name"},a={key:0,class:"validation-error p-mt-2"},r={class:"p-field p-col-12 p-md-6"},u={for:"source"},d={class:"p-field p-col-12 p-md-6"},s={for:"url"},p={class:"p-field p-col-12 p-md-6"},b={for:"ingredients"},m={class:"p-field p-col-12"},f={for:"rating"},O={class:"p-field p-col-12"},j={for:"notes"};function v(e,t,n,v,h,k){var g=Object(i["E"])("InputText"),y=Object(i["E"])("RecipeSource"),V=Object(i["E"])("Calendar"),$=Object(i["E"])("RecipeIngredients"),w=Object(i["E"])("Rating"),C=Object(i["E"])("Textarea"),x=Object(i["E"])("Button"),I=Object(i["E"])("Card");return Object(i["w"])(),Object(i["h"])(I,null,{title:Object(i["M"])((function(){return[Object(i["j"])(Object(i["H"])(e.recipe?e.$t("recipe.edit"):e.$t("recipe.add")),1)]})),content:Object(i["M"])((function(){return[Object(i["k"])("form",null,[Object(i["k"])("div",o,[Object(i["k"])("div",l,[Object(i["k"])("label",c,Object(i["H"])(e.$t("recipe.name"))+" *",1),Object(i["k"])(g,{onKeyup:e.checkValidation,id:"name",type:"text",modelValue:e.form.name,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.form.name=t})},null,8,["onKeyup","modelValue"]),e.isNameValid?Object(i["i"])("",!0):(Object(i["w"])(),Object(i["h"])("div",a,Object(i["H"])(e.$t("validation.required")),1))]),Object(i["k"])("div",r,[Object(i["k"])("label",u,Object(i["H"])(e.$t("recipe.sourceLabel")),1),Object(i["k"])(y,{onIsValid:t[2]||(t[2]=function(t){return e.isSourceValid=t}),onUpdateSource:e.updateForm},null,8,["onUpdateSource"])]),Object(i["k"])("div",d,[Object(i["k"])("label",s,Object(i["H"])(e.$t("recipe.dates")),1),Object(i["k"])(V,{modelValue:e.selectedDates,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.selectedDates=t}),selectionMode:"multiple",maxDate:e.maxInputValue},null,8,["modelValue","maxDate"])]),Object(i["k"])("div",p,[Object(i["k"])("label",b,Object(i["H"])(e.$t("recipe.ingredients")),1),Object(i["k"])($,{onUpdateIngredients:e.updateForm,recipe:e.recipe},null,8,["onUpdateIngredients","recipe"])]),Object(i["k"])("div",m,[Object(i["k"])("label",f,Object(i["H"])(e.$t("recipe.rating")),1),Object(i["k"])(w,{stars:e.RATING_MAX,modelValue:e.form.rating,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.form.rating=t}),cancel:!1},null,8,["stars","modelValue"])]),Object(i["k"])("div",O,[Object(i["k"])("label",j,Object(i["H"])(e.$t("recipe.notes")),1),Object(i["k"])(C,{id:"notes",modelValue:e.form.notes,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.form.notes=t}),rows:"6"},null,8,["modelValue"])])])])]})),footer:Object(i["M"])((function(){return[Object(i["k"])(x,{class:"p-mr-3",type:"button",disabled:!e.isSourceValid||!e.isNameValid,onClick:e.submitForm,label:e.$t("common.submit")},null,8,["disabled","onClick","label"]),Object(i["k"])(x,{type:"button",class:"p-button-outlined p-button-secondary",label:e.$t("common.back"),onClick:t[6]||(t[6]=function(t){return e.$router.go(-1)})},null,8,["label"])]})),_:1})}var h=n("5530"),k=(n("d81d"),n("8398")),g={name:"Textarea",emits:["update:modelValue"],props:{modelValue:null,autoResize:Boolean},mounted(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize(){const e=window.getComputedStyle(this.$el);this.$el.style.height="auto",this.$el.style.height=`calc(${e.borderTopWidth} + ${e.borderBottomWidth} + ${this.$el.scrollHeight}px)`,parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput(e){this.autoResize&&this.resize(),this.$emit("update:modelValue",e.target.value)}},computed:{filled(){return null!=this.modelValue&&this.modelValue.toString().length>0}}};function y(e,t,n,o,l,c){return Object(i["w"])(),Object(i["h"])("textarea",Object(i["q"])({class:["p-inputtextarea p-inputtext p-component",{"p-filled":c.filled,"p-inputtextarea-resizable ":n.autoResize}]},e.$attrs,{value:n.modelValue,onInput:t[1]||(t[1]=(...e)=>c.onInput&&c.onInput(...e))}),null,16,["value"])}function V(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}var $="\n.p-inputtextarea-resizable {\n    overflow: hidden;\n    resize: none;\n}\n.p-fluid .p-inputtextarea {\n    width: 100%;\n}\n";V($),g.render=y;var w=g,C=n("f68d"),x=n("cb8b"),I=n("bb57"),U=n("9899"),B={class:"p-d-flex"},R={key:0},T={class:"p-field"},S={for:"url"},D={key:0,class:"validation-error p-mt-2"},E={key:1},H={class:"p-field"},A={for:"title"},F={class:"p-field"},z={for:"page"},M={class:"p-field"},N={for:"authors"},L={key:2},P={class:"p-field"},K={for:"comment"};function q(e,t,n,o,l,c){var a=Object(i["E"])("RadioButton"),r=Object(i["E"])("InputText"),u=Object(i["E"])("Textarea");return Object(i["w"])(),Object(i["h"])("div",null,[Object(i["k"])("div",B,[(Object(i["w"])(!0),Object(i["h"])(i["a"],null,Object(i["C"])(e.sourceOptions,(function(n){return Object(i["w"])(),Object(i["h"])("div",{key:n.key,class:"p-field-radiobutton p-mr-4"},[Object(i["k"])(a,{id:n.key,name:"source",value:n,modelValue:e.selectedSource,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.selectedSource=t}),onChange:e.changeSource},null,8,["id","value","modelValue","onChange"]),Object(i["k"])("label",{for:n.key},Object(i["H"])(n.name),9,["for"])])})),128))]),"link"===e.selectedSource.key?(Object(i["w"])(),Object(i["h"])("div",R,[Object(i["k"])("div",T,[Object(i["k"])("label",S,Object(i["H"])(e.$t("recipe.url")),1),Object(i["k"])(r,{onInput:e.validateUrl,id:"url",type:"url",modelValue:e.form.recipeUrl,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.form.recipeUrl=t})},null,8,["onInput","modelValue"]),e.form.recipeUrl&&!e.isUrlValid?(Object(i["w"])(),Object(i["h"])("div",D,Object(i["H"])(e.$t("validation.invalidUrl")),1)):Object(i["i"])("",!0)])])):Object(i["i"])("",!0),"book"===e.selectedSource.key?(Object(i["w"])(),Object(i["h"])("div",E,[Object(i["k"])("div",H,[Object(i["k"])("label",A,Object(i["H"])(e.$t("recipe.book.title")),1),Object(i["k"])(r,{id:"title",type:"text",modelValue:e.form.bookTitle,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.form.bookTitle=t})},null,8,["modelValue"])]),Object(i["k"])("div",F,[Object(i["k"])("label",z,Object(i["H"])(e.$t("recipe.book.page")),1),Object(i["k"])(r,{id:"page",type:"text",modelValue:e.form.bookPage,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.form.bookPage=t})},null,8,["modelValue"])]),Object(i["k"])("div",M,[Object(i["k"])("label",N,Object(i["H"])(e.$t("recipe.book.authors")),1),Object(i["k"])(r,{id:"authors",type:"text",modelValue:e.form.bookAuthors,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.form.bookAuthors=t})},null,8,["modelValue"])])])):Object(i["i"])("",!0),"other"===e.selectedSource.key?(Object(i["w"])(),Object(i["h"])("div",L,[Object(i["k"])("div",P,[Object(i["k"])("label",K,Object(i["H"])(e.$t("recipe.comment")),1),Object(i["k"])(u,{id:"comment",type:"text",modelValue:e.form.comment,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.form.comment=t})},null,8,["modelValue"])])])):Object(i["i"])("",!0)])}n("7db0");var _=n("dd76"),G={name:"RadioButton",inheritAttrs:!1,emits:["click","update:modelValue","change"],props:{value:null,modelValue:null,class:null,style:null},data(){return{focused:!1}},methods:{onClick(e){this.$attrs.disabled||(this.$emit("click",e),this.$emit("update:modelValue",this.value),this.$refs.input.focus(),this.checked||this.$emit("change",e))},onFocus(){this.focused=!0},onBlur(){this.focused=!1}},computed:{checked(){return null!=this.modelValue&&_["d"].equals(this.modelValue,this.value)},containerClass(){return["p-radiobutton p-component",this.class,{"p-radiobutton-checked":this.checked,"p-radiobutton-disabled":this.$attrs.disabled,"p-radiobutton-focused":this.focused}]}}};const J={class:"p-hidden-accessible"},W=Object(i["k"])("div",{class:"p-radiobutton-icon"},null,-1);function X(e,t,n,o,l,c){return Object(i["w"])(),Object(i["h"])("div",{class:c.containerClass,onClick:t[3]||(t[3]=e=>c.onClick(e)),style:n.style},[Object(i["k"])("div",J,[Object(i["k"])("input",Object(i["q"])({ref:"input",type:"radio",checked:c.checked,value:n.value},e.$attrs,{onFocus:t[1]||(t[1]=(...e)=>c.onFocus&&c.onFocus(...e)),onBlur:t[2]||(t[2]=(...e)=>c.onBlur&&c.onBlur(...e))}),null,16,["checked","value"])]),Object(i["k"])("div",{ref:"box",class:["p-radiobutton-box",{"p-highlight":c.checked,"p-disabled":e.$attrs.disabled,"p-focus":l.focused}],role:"radio","aria-checked":c.checked},[W],10,["aria-checked"])],6)}G.render=X;var Y=G,Q=n("5502"),Z=n("7624"),ee=Object(i["l"])({components:{RadioButton:Y,InputText:k["a"],Textarea:w},props:{recipe:{type:Object,required:!1}},emits:["update-source","is-valid"],setup:function(e,t){var n=t.emit,o=Object(Q["b"])(),l=Object(i["B"])(!0),c=Object(i["B"])([{name:"Link",key:"link"},{name:"Book",key:"book"},{name:"Other",key:"other"}]),a=Object(i["f"])((function(){return o.state.activeRecipe})),r=function(){return c.value.find((function(e){var t;return e.key===(null===a||void 0===a||null===(t=a.value)||void 0===t?void 0:t.source)}))||c.value[0]},u={source:"link",recipeUrl:"",bookTitle:"",bookPage:"",bookAuthors:"",comment:""},d=Object(i["B"])(r()),s=Object(i["A"])(Object(h["a"])(Object(h["a"])({},u),a.value));Object(i["K"])(a,(function(){Object.assign(s,Object(h["a"])({},a.value)),d.value=r()}));var p=function(){"link"!==d.value.key?n("is-valid",!0):(l.value=Object(Z["c"])(s.recipeUrl),n("is-valid",l.value))},b=function(){p();var e={source:d.value.key};n("update-source",e)};return Object(i["K"])(s,(function(){var e={source:s.source,recipeUrl:s.recipeUrl,bookTitle:s.bookTitle,bookPage:s.bookPage,bookAuthors:s.bookAuthors,comment:s.comment};n("update-source",e)})),{form:s,sourceOptions:c,selectedSource:d,isUrlValid:l,changeSource:b,validateUrl:p}}});ee.render=q;var te=ee,ne={class:"p-inputgroup p-mb-2"},ie={class:"ingredient-option"};function oe(e,t,n,o,l,c){var a=Object(i["E"])("InputText"),r=Object(i["E"])("Button"),u=Object(i["E"])("MultiSelect"),d=Object(i["E"])("ConfirmDialog");return Object(i["w"])(),Object(i["h"])("div",null,[Object(i["k"])("div",ne,[Object(i["k"])(a,{placeholder:e.$t("ingredients.add"),modelValue:e.ingredient,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.ingredient=t}),modelModifiers:{trim:!0}},null,8,["placeholder","modelValue"]),Object(i["k"])(r,{onClick:e.manageNewIngredient,type:"button",icon:"pi pi-plus",class:"p-button-primary"},null,8,["onClick"])]),Object(i["k"])(u,{modelValue:e.selectedIngredients,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.selectedIngredients=t}),options:e.ingredients,optionLabel:"name",placeholder:e.$t("ingredients.select"),filter:!0,onChange:e.updateForm,display:"chip"},{option:Object(i["M"])((function(t){return[Object(i["k"])("div",ie,[Object(i["k"])("div",null,Object(i["H"])(t.option.name),1),Object(i["k"])(r,{onClick:Object(i["P"])((function(n){return e.confirmDelete(t.option)}),["stop"]),type:"button",title:e.$t("ingredients.delete"),icon:"pi pi-times",class:"p-button-rounded p-button-danger p-button-text"},null,8,["onClick","title"])])]})),_:1},8,["modelValue","options","placeholder","onChange"]),e.showConfirmDialog?(Object(i["w"])(),Object(i["h"])(d,{key:0,visible:e.showConfirmDialog,"onUpdate:visible":t[3]||(t[3]=function(t){return e.showConfirmDialog=t}),onClose:t[4]||(t[4]=function(t){e.showConfirmDialog=!1,e.ingredientToDelete=void 0}),onConfirm:e.deleteIngredient,text:e.$t("ingredients.deleteIngredientText")},null,8,["visible","onConfirm","text"])):Object(i["i"])("",!0)])}n("4de4");var le,ce=n("4147"),ae=new Uint8Array(16);function re(){if(!le&&(le="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!le))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return le(ae)}var ue=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function de(e){return"string"===typeof e&&ue.test(e)}for(var se=de,pe=[],be=0;be<256;++be)pe.push((be+256).toString(16).substr(1));function me(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(pe[e[t+0]]+pe[e[t+1]]+pe[e[t+2]]+pe[e[t+3]]+"-"+pe[e[t+4]]+pe[e[t+5]]+"-"+pe[e[t+6]]+pe[e[t+7]]+"-"+pe[e[t+8]]+pe[e[t+9]]+"-"+pe[e[t+10]]+pe[e[t+11]]+pe[e[t+12]]+pe[e[t+13]]+pe[e[t+14]]+pe[e[t+15]]).toLowerCase();if(!se(n))throw TypeError("Stringified UUID is invalid");return n}var fe=me;function Oe(e,t,n){e=e||{};var i=e.random||(e.rng||re)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){n=n||0;for(var o=0;o<16;++o)t[n+o]=i[o];return t}return fe(i)}var je=Oe,ve=n("3617"),he=Object(i["l"])({components:{InputText:k["a"],Button:I["a"],MultiSelect:ce["a"],ConfirmDialog:ve["a"]},props:{recipe:{type:Object,required:!1}},emits:["update-ingredients"],setup:function(e,t){var n,o=t.emit,l=Object(Q["b"])(),c=Object(i["f"])((function(){return l.state.user})),a=Object(i["B"])(""),r=Object(i["f"])((function(){return l.state.ingredientsList||[]})),u=Object(i["B"])((null===(n=e.recipe)||void 0===n?void 0:n.ingredients)||[]),d=Object(i["B"])(!1),s=Object(i["B"])();Object(i["K"])((function(){return e.recipe}),(function(){e.recipe&&e.recipe.ingredients&&(u.value=e.recipe.ingredients)}));var p=function(){var e={ingredients:u.value};o("update-ingredients",e)},b=function e(){var t;if(null!==(t=a.value)&&void 0!==t&&t.length){var n=r.value.find((function(e){return e.name.toLowerCase()===a.value.toLowerCase()}));if(n)u.value.push(n),a.value="",p();else{var i={id:je(),name:a.value};l.dispatch("createIngredient",i),e()}}},m=function(e){d.value=!0,s.value=e},f=function(){var t;u.value=u.value.filter((function(e){var t;return e.id!==(null===(t=s.value)||void 0===t?void 0:t.id)})),l.dispatch("removeIngredient",null===(t=s.value)||void 0===t?void 0:t.id),e.recipe&&l.dispatch("updateRecipe",{id:e.recipe.id,ingredients:r.value.filter((function(e){var t;return e.id!==(null===(t=s.value)||void 0===t?void 0:t.id)}))}),d.value=!1,s.value=void 0};return Object(i["u"])((function(){l.dispatch("fetchIngredients")})),Object(i["K"])(c,(function(){l.dispatch("fetchIngredients")})),{manageNewIngredient:b,updateForm:p,ingredient:a,ingredients:r,selectedIngredients:u,confirmDelete:m,deleteIngredient:f,showConfirmDialog:d}}});he.render=oe;var ke=he,ge=ke,ye=n("6c02"),Ve=n("7906"),$e=Object(i["l"])({components:{InputText:k["a"],Textarea:w,Rating:C["a"],Calendar:x["a"],Button:I["a"],RecipeSource:te,RecipeIngredients:ge,Card:U["a"]},setup:function(){var e=Object(Q["b"])(),t=Object(ye["c"])(),n=Object(ye["d"])(),o=t.params.id,l=Object(i["B"])([]),c=Object(i["B"])(new Date),a=Object(i["f"])((function(){return e.state.activeRecipe})),r=Object(i["f"])((function(){return e.state.user})),u=Object(i["A"])({name:"",notes:"",rating:1,source:"link",ingredients:[]}),d=Object(i["B"])([]),s=Object(i["B"])(!0),p=Object(i["B"])(!0),b=function(e){var t;Object.assign(u,e),null!==(t=e.dates)&&void 0!==t&&t.length&&(l.value=Object(Z["e"])(e.dates))};Object(i["L"])((function(){a.value&&b(a.value)}));var m=function(){var e;return null===(e=l.value)||void 0===e?void 0:e.map((function(e){return new Date(e).getTime()}))},f=function(){if(s.value)if(l.value.length&&(u.dates=m(),u.lastUsed=Object(Z["b"])(u.dates)),o)e.dispatch("updateRecipe",Object(h["a"])({id:o},u)),n.push({name:"recipe",params:{id:o}});else{var t=(new Date).getTime();e.dispatch("createRecipe",Object(h["a"])({creationDate:t},u)),n.push({name:"list"})}},O=function(){o&&e.dispatch("fetchRecipeById",o)},j=function(){p.value=!!u.name};return Object(i["u"])((function(){O()})),Object(i["K"])(r,(function(){r.value&&O()})),Object(i["v"])((function(){e.dispatch("resetActiveRecipe")})),{form:u,allIngredients:d,selectedDates:l,isNameValid:p,isSourceValid:s,recipe:a,RATING_MAX:Ve["a"],maxInputValue:c,submitForm:f,updateForm:b,checkValidation:j}}});$e.render=v;var we=$e}}]);
//# sourceMappingURL=chunk-2d0ac3d9.b5530ead.js.map