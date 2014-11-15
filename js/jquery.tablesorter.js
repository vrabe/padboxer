/*!
* TableSorter (FORK) 2.18.3 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach; fork maintained by Rob Garrison
*/
!function(h){h.extend({tablesorter:new function(){function f(){var b=arguments[0],a=1<arguments.length?Array.prototype.slice.call(arguments):b;if("undefined"!==typeof console&&"undefined"!==typeof console.log)console[/error/i.test(b)?"error":/warn/i.test(b)?"warn":"log"](a);else alert(a)}function u(b,a){f(b+" ("+((new Date).getTime()-a.getTime())+"ms)")}function m(b){for(var a in b)return!1;return!0}function t(b,a,c){if(!a)return"";var e,d=b.config,l=d.textExtraction||"",f="",f="basic"===l?h(a).attr(d.textAttribute)|| a.textContent||a.innerText||h(a).text()||"":"function"===typeof l?l(a,b,c):"function"===typeof(e=g.getColumnData(b,l,c))?e(a,b,c):a.textContent||a.innerText||h(a).text()||"";return h.trim(f)}function q(b){var a,c,e=b.config,d=e.$tbodies=e.$table.children("tbody:not(."+e.cssInfoBlock+")"),l,v,k,n,p,w,m,r,s,D=0,y="",z=d.length;if(0===z)return e.debug?f("Warning: *Empty table!* Not building a parser cache"):"";e.debug&&(s=new Date,f("Detecting parsers for each column"));a=[];for(c=[];D<z;){l=d[D].rows; if(l[D])for(v=e.columns,k=0;k<v;k++){n=e.$headers.filter('[data-column="'+k+'"]:last');p=g.getColumnData(b,e.headers,k);r=g.getParserById(g.getData(n,p,"extractor"));m=g.getParserById(g.getData(n,p,"sorter"));w="false"===g.getData(n,p,"parser");e.empties[k]=(g.getData(n,p,"empty")||e.emptyTo||(e.emptyToBottom?"bottom":"top")).toLowerCase();e.strings[k]=(g.getData(n,p,"string")||e.stringTo||"max").toLowerCase();w&&(m=g.getParserById("no-parser"));r||(r=!1);if(!m)a:{n=b;p=l;w=-1;m=k;for(var C=void 0, L=void 0,M=g.parsers.length,x=!1,A="",C=!0;""===A&&C;)w++,p[w]?(x=p[w].cells[m],A=t(n,x,m),L=h(x),n.config.debug&&f("Checking if value was empty on row "+w+", column: "+m+': "'+A+'"')):C=!1;for(;0<=--M;)if((C=g.parsers[M])&&"text"!==C.id&&C.is&&C.is(A,n,x,L)){m=C;break a}m=g.getParserById("text")}e.debug&&(y+="column:"+k+"; extractor:"+r.id+"; parser:"+m.id+"; string:"+e.strings[k]+"; empty: "+e.empties[k]+"\n");c[k]=m;a[k]=r}D+=c.length?z:1}e.debug&&(f(y?y:"No parsers detected"),u("Completed detecting parsers", s));e.parsers=c;e.extractors=a}function z(b){var a,c,e,d,l,v,k,n,p,m,B,r=b.config,s=r.$table.children("tbody"),q=r.extractors,y=r.parsers;r.cache={};r.totalRows=0;if(!y)return r.debug?f("Warning: *Empty table!* Not building a cache"):"";r.debug&&(n=new Date);r.showProcessing&&g.isProcessing(b,!0);for(l=0;l<s.length;l++)if(B=[],a=r.cache[l]={normalized:[]},!s.eq(l).hasClass(r.cssInfoBlock)){p=s[l]&&s[l].rows.length||0;for(e=0;e<p;++e)if(m={child:[]},v=h(s[l].rows[e]),k=[],v.hasClass(r.cssChildRow)&& 0!==e)c=a.normalized.length-1,a.normalized[c][r.columns].$row=a.normalized[c][r.columns].$row.add(v),v.prev().hasClass(r.cssChildRow)||v.prev().addClass(g.css.cssHasChild),m.child[c]=h.trim(v[0].textContent||v[0].innerText||v.text()||"");else{m.$row=v;m.order=e;for(d=0;d<r.columns;++d)"undefined"===typeof y[d]?r.debug&&f("No parser found for cell:",v[0].cells[d],"does it have a header?"):(c=t(b,v[0].cells[d],d),c="undefined"===typeof q[d].id?c:q[d].format(c,b,v[0].cells[d],d),c="no-parser"===y[d].id? "":y[d].format(c,b,v[0].cells[d],d),k.push(r.ignoreCase&&"string"===typeof c?c.toLowerCase():c),"numeric"===(y[d].type||"").toLowerCase()&&(B[d]=Math.max(Math.abs(c)||0,B[d]||0)));k[r.columns]=m;a.normalized.push(k)}a.colMax=B;r.totalRows+=a.normalized.length}r.showProcessing&&g.isProcessing(b);r.debug&&u("Building cache for "+p+" rows",n)}function A(b,a){var c=b.config,e=c.widgetOptions,d=b.tBodies,l=[],f=c.cache,k,n,p,w,q,r;if(m(f))return c.appender?c.appender(b,l):b.isUpdating?c.$table.trigger("updateComplete", b):"";c.debug&&(r=new Date);for(q=0;q<d.length;q++)if(k=h(d[q]),k.length&&!k.hasClass(c.cssInfoBlock)){p=g.processTbody(b,k,!0);k=f[q].normalized;n=k.length;for(w=0;w<n;w++)l.push(k[w][c.columns].$row),c.appender&&(!c.pager||c.pager.removeRows&&e.pager_removeRows||c.pager.ajax)||p.append(k[w][c.columns].$row);g.processTbody(b,p,!1)}c.appender&&c.appender(b,l);c.debug&&u("Rebuilt table",r);a||c.appender||g.applyWidget(b);b.isUpdating&&c.$table.trigger("updateComplete",b)}function F(b){return/^d/i.test(b)|| 1===b}function E(b){var a,c,e,d,l,v,k,n=b.config;n.headerList=[];n.headerContent=[];n.debug&&(k=new Date);n.columns=g.computeColumnIndex(n.$table.children("thead, tfoot").children("tr"));d=n.cssIcon?'<i class="'+(n.cssIcon===g.css.icon?g.css.icon:n.cssIcon+" "+g.css.icon)+'"></i>':"";n.$headers=h(b).find(n.selectorHeaders).each(function(k){c=h(this);a=g.getColumnData(b,n.headers,k,!0);n.headerContent[k]=h(this).html();""!==n.headerTemplate&&(l=n.headerTemplate.replace(/\{content\}/g,h(this).html()).replace(/\{icon\}/g, d),n.onRenderTemplate&&(e=n.onRenderTemplate.apply(c,[k,l]))&&"string"===typeof e&&(l=e),h(this).html('<div class="'+g.css.headerIn+'">'+l+"</div>"));n.onRenderHeader&&n.onRenderHeader.apply(c,[k,n,n.$table]);this.column=parseInt(h(this).attr("data-column"),10);this.order=F(g.getData(c,a,"sortInitialOrder")||n.sortInitialOrder)?[1,0,2]:[0,1,2];this.count=-1;this.lockedOrder=!1;v=g.getData(c,a,"lockedOrder")||!1;"undefined"!==typeof v&&!1!==v&&(this.order=this.lockedOrder=F(v)?[1,1,1]:[0,0,0]);c.addClass(g.css.header+ " "+n.cssHeader);n.headerList[k]=this;c.parent().addClass(g.css.headerRow+" "+n.cssHeaderRow).attr("role","row");n.tabIndex&&c.attr("tabindex",0)}).attr({scope:"col",role:"columnheader"});H(b);n.debug&&(u("Built headers:",k),f(n.$headers))}function I(b,a,c){var e=b.config;e.$table.find(e.selectorRemove).remove();q(b);z(b);J(e.$table,a,c)}function H(b){var a,c,e,d=b.config;d.$headers.each(function(l,f){c=h(f);e=g.getColumnData(b,d.headers,l,!0);a="false"===g.getData(f,e,"sorter")||"false"===g.getData(f, e,"parser");f.sortDisabled=a;c[a?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+a);b.id&&(a?c.removeAttr("aria-controls"):c.attr("aria-controls",b.id))})}function G(b){var a,c,e=b.config,d=e.sortList,l=d.length,f=g.css.sortNone+" "+e.cssNone,k=[g.css.sortAsc+" "+e.cssAsc,g.css.sortDesc+" "+e.cssDesc],n=[e.cssIconAsc,e.cssIconDesc,e.cssIconNone],p=["ascending","descending"],m=h(b).find("tfoot tr").children().add(e.$extraHeaders).removeClass(k.join(" "));e.$headers.removeClass(k.join(" ")).addClass(f).attr("aria-sort", "none").find("."+e.cssIcon).removeClass(n.join(" ")).addClass(n[2]);for(a=0;a<l;a++)if(2!==d[a][1]&&(b=e.$headers.not(".sorter-false").filter('[data-column="'+d[a][0]+'"]'+(1===l?":last":"")),b.length)){for(c=0;c<b.length;c++)b[c].sortDisabled||b.eq(c).removeClass(f).addClass(k[d[a][1]]).attr("aria-sort",p[d[a][1]]).find("."+e.cssIcon).removeClass(n[2]).addClass(n[d[a][1]]);m.length&&m.filter('[data-column="'+d[a][0]+'"]').removeClass(f).addClass(k[d[a][1]])}e.$headers.not(".sorter-false").each(function(){var b= h(this),a=this.order[(this.count+1)%(e.sortReset?3:2)],a=b.text()+": "+g.language[b.hasClass(g.css.sortAsc)?"sortAsc":b.hasClass(g.css.sortDesc)?"sortDesc":"sortNone"]+g.language[0===a?"nextAsc":1===a?"nextDesc":"nextNone"];b.attr("aria-label",a)})}function Q(b){var a,c,e=b.config;e.widthFixed&&0===e.$table.children("colgroup").length&&(a=h("<colgroup>"),c=h(b).width(),h(b.tBodies).not("."+e.cssInfoBlock).find("tr:first").children(":visible").each(function(){a.append(h("<col>").css("width",parseInt(h(this).width()/ c*1E3,10)/10+"%"))}),e.$table.prepend(a))}function R(b,a){var c,e,d,l,g,k=b.config,f=a||k.sortList;k.sortList=[];h.each(f,function(b,a){l=parseInt(a[0],10);if(d=k.$headers.filter('[data-column="'+l+'"]:last')[0]){e=(e=(""+a[1]).match(/^(1|d|s|o|n)/))?e[0]:"";switch(e){case "1":case "d":e=1;break;case "s":e=g||0;break;case "o":c=d.order[(g||0)%(k.sortReset?3:2)];e=0===c?1:1===c?0:2;break;case "n":d.count+=1;e=d.order[d.count%(k.sortReset?3:2)];break;default:e=0}g=0===b?e:g;c=[l,parseInt(e,10)||0]; k.sortList.push(c);e=h.inArray(c[1],d.order);d.count=0<=e?e:c[1]%(k.sortReset?3:2)}})}function S(b,a){return b&&b[a]?b[a].type||"":""}function N(b,a,c){if(b.isUpdating)return setTimeout(function(){N(b,a,c)},50);var e,d,l,f,k=b.config,n=!c[k.sortMultiSortKey],p=k.$table;p.trigger("sortStart",b);a.count=c[k.sortResetKey]?2:(a.count+1)%(k.sortReset?3:2);k.sortRestart&&(d=a,k.$headers.each(function(){this===d||!n&&h(this).is("."+g.css.sortDesc+",."+g.css.sortAsc)||(this.count=-1)}));d=parseInt(h(a).attr("data-column"), 10);if(n){k.sortList=[];if(null!==k.sortForce)for(e=k.sortForce,l=0;l<e.length;l++)e[l][0]!==d&&k.sortList.push(e[l]);e=a.order[a.count];if(2>e&&(k.sortList.push([d,e]),1<a.colSpan))for(l=1;l<a.colSpan;l++)k.sortList.push([d+l,e])}else{if(k.sortAppend&&1<k.sortList.length)for(l=0;l<k.sortAppend.length;l++)f=g.isValueInArray(k.sortAppend[l][0],k.sortList),0<=f&&k.sortList.splice(f,1);if(0<=g.isValueInArray(d,k.sortList))for(l=0;l<k.sortList.length;l++)f=k.sortList[l],e=k.$headers.filter('[data-column="'+ f[0]+'"]:last')[0],f[0]===d&&(f[1]=e.order[a.count],2===f[1]&&(k.sortList.splice(l,1),e.count=-1));else if(e=a.order[a.count],2>e&&(k.sortList.push([d,e]),1<a.colSpan))for(l=1;l<a.colSpan;l++)k.sortList.push([d+l,e])}if(null!==k.sortAppend)for(e=k.sortAppend,l=0;l<e.length;l++)e[l][0]!==d&&k.sortList.push(e[l]);p.trigger("sortBegin",b);setTimeout(function(){G(b);K(b);A(b);p.trigger("sortEnd",b)},1)}function K(b){var a,c,e,d,l,f,k,h,p,w,q,r=0,s=b.config,t=s.textSorter||"",y=s.sortList,x=y.length,z= b.tBodies.length;if(!s.serverSideSorting&&!m(s.cache)){s.debug&&(l=new Date);for(c=0;c<z;c++)f=s.cache[c].colMax,k=s.cache[c].normalized,k.sort(function(c,l){for(a=0;a<x;a++){d=y[a][0];h=y[a][1];r=0===h;if(s.sortStable&&c[d]===l[d]&&1===x)break;(e=/n/i.test(S(s.parsers,d)))&&s.strings[d]?(e="boolean"===typeof s.string[s.strings[d]]?(r?1:-1)*(s.string[s.strings[d]]?-1:1):s.strings[d]?s.string[s.strings[d]]||0:0,p=s.numberSorter?s.numberSorter(c[d],l[d],r,f[d],b):g["sortNumeric"+(r?"Asc":"Desc")](c[d], l[d],e,f[d],d,b)):(w=r?c:l,q=r?l:c,p="function"===typeof t?t(w[d],q[d],r,d,b):"object"===typeof t&&t.hasOwnProperty(d)?t[d](w[d],q[d],r,d,b):g["sortNatural"+(r?"Asc":"Desc")](c[d],l[d],d,b,s));if(p)return p}return c[s.columns].order-l[s.columns].order});s.debug&&u("Sorting on "+y.toString()+" and dir "+h+" time",l)}}function O(b,a){var c=b[0];c.isUpdating&&b.trigger("updateComplete",c);h.isFunction(a)&&a(b[0])}function J(b,a,c){var e=b[0].config.sortList;!1!==a&&!b[0].isProcessing&&e.length?b.trigger("sorton", [e,function(){O(b,c)},!0]):(O(b,c),g.applyWidget(b[0],!1))}function P(b){var a=b.config,c=a.$table;c.unbind("sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(a.namespace+" ")).bind("sortReset"+a.namespace,function(c,d){c.stopPropagation();a.sortList=[];G(b);K(b);A(b);h.isFunction(d)&&d(b)}).bind("updateAll"+a.namespace,function(c,d,l){c.stopPropagation();b.isUpdating= !0;g.refreshWidgets(b,!0,!0);g.restoreHeaders(b);E(b);g.bindEvents(b,a.$headers,!0);P(b);I(b,d,l)}).bind("update"+a.namespace+" updateRows"+a.namespace,function(a,c,l){a.stopPropagation();b.isUpdating=!0;H(b);I(b,c,l)}).bind("updateCell"+a.namespace,function(e,d,l,g){e.stopPropagation();b.isUpdating=!0;c.find(a.selectorRemove).remove();var k,f,p;f=c.find("tbody");p=h(d);e=f.index(h.fn.closest?p.closest("tbody"):p.parents("tbody").filter(":first"));k=h.fn.closest?p.closest("tr"):p.parents("tr").filter(":first"); d=p[0];f.length&&0<=e&&(f=f.eq(e).find("tr").index(k),p=p.index(),a.cache[e].normalized[f][a.columns].$row=k,k="undefined"===typeof a.extractors[p].id?t(b,d,p):a.extractors[p].format(t(b,d,p),b,d,p),d="no-parser"===a.parsers[p].id?"":a.parsers[p].format(k,b,d,p),a.cache[e].normalized[f][p]=a.ignoreCase&&"string"===typeof d?d.toLowerCase():d,"numeric"===(a.parsers[p].type||"").toLowerCase()&&(a.cache[e].colMax[p]=Math.max(Math.abs(d)||0,a.cache[e].colMax[p]||0)),J(c,l,g))}).bind("addRows"+a.namespace, function(e,d,l,g){e.stopPropagation();b.isUpdating=!0;if(m(a.cache))H(b),I(b,l,g);else{d=h(d).attr("role","row");var k,f,p,u,B,r=d.filter("tr").length,s=c.find("tbody").index(d.parents("tbody").filter(":first"));a.parsers&&a.parsers.length||q(b);for(e=0;e<r;e++){f=d[e].cells.length;B=[];u={child:[],$row:d.eq(e),order:a.cache[s].normalized.length};for(k=0;k<f;k++)p="undefined"===typeof a.extractors[k].id?t(b,d[e].cells[k],k):a.extractors[k].format(t(b,d[e].cells[k],k),b,d[e].cells[k],k),p="no-parser"=== a.parsers[k].id?"":a.parsers[k].format(p,b,d[e].cells[k],k),B[k]=a.ignoreCase&&"string"===typeof p?p.toLowerCase():p,"numeric"===(a.parsers[k].type||"").toLowerCase()&&(a.cache[s].colMax[k]=Math.max(Math.abs(B[k])||0,a.cache[s].colMax[k]||0));B.push(u);a.cache[s].normalized.push(B)}J(c,l,g)}}).bind("updateComplete"+a.namespace,function(){b.isUpdating=!1}).bind("sorton"+a.namespace,function(a,d,l,f){var k=b.config;a.stopPropagation();c.trigger("sortStart",this);R(b,d);G(b);k.delayInit&&m(k.cache)&& z(b);c.trigger("sortBegin",this);K(b);A(b,f);c.trigger("sortEnd",this);g.applyWidget(b);h.isFunction(l)&&l(b)}).bind("appendCache"+a.namespace,function(a,c,g){a.stopPropagation();A(b,g);h.isFunction(c)&&c(b)}).bind("updateCache"+a.namespace,function(c,d){a.parsers&&a.parsers.length||q(b);z(b);h.isFunction(d)&&d(b)}).bind("applyWidgetId"+a.namespace,function(c,d){c.stopPropagation();g.getWidgetById(d).format(b,a,a.widgetOptions)}).bind("applyWidgets"+a.namespace,function(a,c){a.stopPropagation();g.applyWidget(b, c)}).bind("refreshWidgets"+a.namespace,function(a,c,l){a.stopPropagation();g.refreshWidgets(b,c,l)}).bind("destroy"+a.namespace,function(a,c,l){a.stopPropagation();g.destroy(b,c,l)}).bind("resetToLoadState"+a.namespace,function(){g.refreshWidgets(b,!0,!0);a=h.extend(!0,g.defaults,a.originalSettings);b.hasInitialized=!1;g.setup(b,a)})}var g=this;g.version="2.18.3";g.parsers=[];g.widgets=[];g.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null, onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0, widgetClass:"widget-{name}",initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssIcon:"tablesorter-icon",cssIconNone:"",cssIconAsc:"",cssIconDesc:"",cssInfoBlock:"tablesorter-infoOnly",cssAllowClicks:"tablesorter-allowClicks",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[]};g.css={table:"tablesorter",cssHasChild:"tablesorter-hasChildRow", childRow:"tablesorter-childRow",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",info:"tablesorter-infoOnly",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"};g.language={sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort", nextNone:"activate to remove the sort"};g.log=f;g.benchmark=u;g.construct=function(b){return this.each(function(){var a=h.extend(!0,{},g.defaults,b);a.originalSettings=b;!this.hasInitialized&&g.buildTable&&"TABLE"!==this.tagName?g.buildTable(this,a):g.setup(this,a)})};g.setup=function(b,a){if(!b||!b.tHead||0===b.tBodies.length||!0===b.hasInitialized)return a.debug?f("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized"):"";var c="",e=h(b),d=h.metadata; b.hasInitialized=!1;b.isProcessing=!0;b.config=a;h.data(b,"tablesorter",a);a.debug&&h.data(b,"startoveralltimer",new Date);a.supportsDataObject=function(a){a[0]=parseInt(a[0],10);return 1<a[0]||1===a[0]&&4<=parseInt(a[1],10)}(h.fn.jquery.split("."));a.string={max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1};a.emptyTo=a.emptyTo.toLowerCase();a.stringTo=a.stringTo.toLowerCase();/tablesorter\-/.test(e.attr("class"))||(c=""!==a.theme?" tablesorter-"+a.theme:"");a.table=b;a.$table= e.addClass(g.css.table+" "+a.tableClass+c).attr("role","grid");a.$headers=e.find(a.selectorHeaders);a.namespace=a.namespace?"."+a.namespace.replace(/\W/g,""):".tablesorter"+Math.random().toString(16).slice(2);a.$table.children().children("tr").attr("role","row");a.$tbodies=e.children("tbody:not(."+a.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"});a.$table.children("caption").length&&(c=a.$table.children("caption")[0],c.id||(c.id=a.namespace.slice(1)+"caption"),a.$table.attr("aria-labelledby", c.id));a.widgetInit={};a.textExtraction=a.$table.attr("data-text-extraction")||a.textExtraction||"basic";E(b);Q(b);q(b);a.totalRows=0;a.delayInit||z(b);g.bindEvents(b,a.$headers,!0);P(b);a.supportsDataObject&&"undefined"!==typeof e.data().sortlist?a.sortList=e.data().sortlist:d&&e.metadata()&&e.metadata().sortlist&&(a.sortList=e.metadata().sortlist);g.applyWidget(b,!0);0<a.sortList.length?e.trigger("sorton",[a.sortList,{},!a.initWidgets,!0]):(G(b),a.initWidgets&&g.applyWidget(b,!1));a.showProcessing&& e.unbind("sortBegin"+a.namespace+" sortEnd"+a.namespace).bind("sortBegin"+a.namespace+" sortEnd"+a.namespace,function(c){clearTimeout(a.processTimer);g.isProcessing(b);"sortBegin"===c.type&&(a.processTimer=setTimeout(function(){g.isProcessing(b,!0)},500))});b.hasInitialized=!0;b.isProcessing=!1;a.debug&&g.benchmark("Overall initialization time",h.data(b,"startoveralltimer"));e.trigger("tablesorter-initialized",b);"function"===typeof a.initialized&&a.initialized(b)};g.getColumnData=function(b,a,c, e){if("undefined"!==typeof a&&null!==a){b=h(b)[0];var d;b=b.config;if(a[c])return e?a[c]:a[b.$headers.index(b.$headers.filter('[data-column="'+c+'"]:last'))];for(d in a)if("string"===typeof d&&(e=b.$headers.filter('[data-column="'+c+'"]:last').filter(d).add(b.$headers.filter('[data-column="'+c+'"]:last').find(d)),e.length))return a[d]}};g.computeColumnIndex=function(b){var a=[],c=0,e,d,g,f,k,n,p,m,u,r;for(e=0;e<b.length;e++)for(k=b[e].cells,d=0;d<k.length;d++){g=k[d];f=h(g);n=g.parentNode.rowIndex; f.index();p=g.rowSpan||1;m=g.colSpan||1;"undefined"===typeof a[n]&&(a[n]=[]);for(g=0;g<a[n].length+1;g++)if("undefined"===typeof a[n][g]){u=g;break}c=Math.max(u,c);f.attr({"data-column":u});for(g=n;g<n+p;g++)for("undefined"===typeof a[g]&&(a[g]=[]),r=a[g],f=u;f<u+m;f++)r[f]="x"}return c+1};g.isProcessing=function(b,a,c){b=h(b);var e=b[0].config,d=c||b.find("."+g.css.header);a?("undefined"!==typeof c&&0<e.sortList.length&&(d=d.filter(function(){return this.sortDisabled?!1:0<=g.isValueInArray(parseFloat(h(this).attr("data-column")), e.sortList)})),b.add(d).addClass(g.css.processing+" "+e.cssProcessing)):b.add(d).removeClass(g.css.processing+" "+e.cssProcessing)};g.processTbody=function(b,a,c){b=h(b)[0];if(c)return b.isProcessing=!0,a.before('<span class="tablesorter-savemyplace"/>'),c=h.fn.detach?a.detach():a.remove();c=h(b).find("span.tablesorter-savemyplace");a.insertAfter(c);c.remove();b.isProcessing=!1};g.clearTableBody=function(b){h(b)[0].config.$tbodies.children().detach()};g.bindEvents=function(b,a,c){b=h(b)[0];var e, d=b.config;!0!==c&&(d.$extraHeaders=d.$extraHeaders?d.$extraHeaders.add(a):a);a.find(d.selectorSort).add(a.filter(d.selectorSort)).unbind(["mousedown","mouseup","sort","keyup",""].join(d.namespace+" ")).bind(["mousedown","mouseup","sort","keyup",""].join(d.namespace+" "),function(c,g){var f;f=c.type;if(!(1!==(c.which||c.button)&&!/sort|keyup/.test(f)||"keyup"===f&&13!==c.which||"mouseup"===f&&!0!==g&&250<(new Date).getTime()-e)){if("mousedown"===f)return e=(new Date).getTime(),/(input|select|button|textarea)/i.test(c.target.tagName)|| h(c.target).closest("td,th").hasClass(d.cssAllowClicks)?"":!d.cancelSelection;d.delayInit&&m(d.cache)&&z(b);f=h.fn.closest?h(this).closest("th, td")[0]:/TH|TD/.test(this.tagName)?this:h(this).parents("th, td")[0];f=d.$headers[a.index(f)];f.sortDisabled||N(b,f,c)}});d.cancelSelection&&a.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})};g.restoreHeaders=function(b){var a=h(b)[0].config;a.$table.find(a.selectorHeaders).each(function(b){h(this).find("."+ g.css.headerIn).length&&h(this).html(a.headerContent[b])})};g.destroy=function(b,a,c){b=h(b)[0];if(b.hasInitialized){g.refreshWidgets(b,!0,!0);var e=h(b),d=b.config,f=e.find("thead:first"),m=f.find("tr."+g.css.headerRow).removeClass(g.css.headerRow+" "+d.cssHeaderRow),k=e.find("tfoot:first > tr").children("th, td");!1===a&&0<=h.inArray("uitheme",d.widgets)&&(e.trigger("applyWidgetId",["uitheme"]),e.trigger("applyWidgetId",["zebra"]));f.find("tr").not(m).remove();e.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState ".split(" ").join(d.namespace+ " "));d.$headers.add(k).removeClass([g.css.header,d.cssHeader,d.cssAsc,d.cssDesc,g.css.sortAsc,g.css.sortDesc,g.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true");m.find(d.selectorSort).unbind(["mousedown","mouseup","keypress",""].join(d.namespace+" "));g.restoreHeaders(b);e.toggleClass(g.css.table+" "+d.tableClass+" tablesorter-"+d.theme,!1===a);b.hasInitialized=!1;delete b.config.cache;"function"===typeof c&&c(b)}};g.regex={chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i};g.sortNatural=function(b,a){if(b===a)return 0;var c,e,d,f,h,k;e=g.regex;if(e.hex.test(a)){c=parseInt(b.match(e.hex),16);d=parseInt(a.match(e.hex),16);if(c<d)return-1;if(c>d)return 1}c=b.replace(e.chunk,"\\0$1\\0").replace(e.chunks,"").split("\\0");e=a.replace(e.chunk,"\\0$1\\0").replace(e.chunks,"").split("\\0");k=Math.max(c.length,e.length);for(h=0;h<k;h++){d=isNaN(c[h])?c[h]||0:parseFloat(c[h])||0;f=isNaN(e[h])?e[h]||0:parseFloat(e[h])||0;if(isNaN(d)!== isNaN(f))return isNaN(d)?1:-1;typeof d!==typeof f&&(d+="",f+="");if(d<f)return-1;if(d>f)return 1}return 0};g.sortNaturalAsc=function(b,a,c,e,d){if(b===a)return 0;c=d.string[d.empties[c]||d.emptyTo];return""===b&&0!==c?"boolean"===typeof c?c?-1:1:-c||-1:""===a&&0!==c?"boolean"===typeof c?c?1:-1:c||1:g.sortNatural(b,a)};g.sortNaturalDesc=function(b,a,c,e,d){if(b===a)return 0;c=d.string[d.empties[c]||d.emptyTo];return""===b&&0!==c?"boolean"===typeof c?c?-1:1:c||1:""===a&&0!==c?"boolean"===typeof c?c? 1:-1:-c||-1:g.sortNatural(a,b)};g.sortText=function(b,a){return b>a?1:b<a?-1:0};g.getTextValue=function(b,a,c){if(c){var e=b?b.length:0,d=c+a;for(c=0;c<e;c++)d+=b.charCodeAt(c);return a*d}return 0};g.sortNumericAsc=function(b,a,c,e,d,f){if(b===a)return 0;f=f.config;d=f.string[f.empties[d]||f.emptyTo];if(""===b&&0!==d)return"boolean"===typeof d?d?-1:1:-d||-1;if(""===a&&0!==d)return"boolean"===typeof d?d?1:-1:d||1;isNaN(b)&&(b=g.getTextValue(b,c,e));isNaN(a)&&(a=g.getTextValue(a,c,e));return b-a};g.sortNumericDesc= function(b,a,c,e,d,f){if(b===a)return 0;f=f.config;d=f.string[f.empties[d]||f.emptyTo];if(""===b&&0!==d)return"boolean"===typeof d?d?-1:1:d||1;if(""===a&&0!==d)return"boolean"===typeof d?d?1:-1:-d||-1;isNaN(b)&&(b=g.getTextValue(b,c,e));isNaN(a)&&(a=g.getTextValue(a,c,e));return a-b};g.sortNumeric=function(b,a){return b-a};g.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119", E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6",O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};g.replaceAccents=function(b){var a,c="[",e=g.characterEquivalents;if(!g.characterRegex){g.characterRegexArray={};for(a in e)"string"===typeof a&&(c+=e[a],g.characterRegexArray[a]=new RegExp("["+e[a]+"]","g"));g.characterRegex= new RegExp(c+"]")}if(g.characterRegex.test(b))for(a in e)"string"===typeof a&&(b=b.replace(g.characterRegexArray[a],a));return b};g.isValueInArray=function(b,a){var c,e=a.length;for(c=0;c<e;c++)if(a[c][0]===b)return c;return-1};g.addParser=function(b){var a,c=g.parsers.length,e=!0;for(a=0;a<c;a++)g.parsers[a].id.toLowerCase()===b.id.toLowerCase()&&(e=!1);e&&g.parsers.push(b)};g.getParserById=function(b){if("false"==b)return!1;var a,c=g.parsers.length;for(a=0;a<c;a++)if(g.parsers[a].id.toLowerCase()=== b.toString().toLowerCase())return g.parsers[a];return!1};g.addWidget=function(b){g.widgets.push(b)};g.hasWidget=function(b,a){b=h(b);return b.length&&b[0].config&&b[0].config.widgetInit[a]||!1};g.getWidgetById=function(b){var a,c,e=g.widgets.length;for(a=0;a<e;a++)if((c=g.widgets[a])&&c.hasOwnProperty("id")&&c.id.toLowerCase()===b.toLowerCase())return c};g.applyWidget=function(b,a){b=h(b)[0];var c=b.config,e=c.widgetOptions,d=" "+c.table.className+" ",f=[],m,k,n;!1!==a&&b.hasInitialized&&(b.isApplyingWidgets|| b.isUpdating)||(c.debug&&(m=new Date),n=new RegExp("\\s"+c.widgetClass.replace(/\{name\}/i,"([\\w-]+)")+"\\s","g"),d.match(n)&&(d=d.match(n))&&h.each(d,function(a,b){c.widgets.push(b.replace(n,"$1"))}),c.widgets.length&&(b.isApplyingWidgets=!0,c.widgets=h.grep(c.widgets,function(a,b){return h.inArray(a,c.widgets)===b}),h.each(c.widgets||[],function(a,b){(n=g.getWidgetById(b))&&n.id&&(n.priority||(n.priority=10),f[a]=n)}),f.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority? 0:1}),h.each(f,function(d,f){if(f){if(a||!c.widgetInit[f.id])c.widgetInit[f.id]=!0,f.hasOwnProperty("options")&&(e=b.config.widgetOptions=h.extend(!0,{},f.options,e)),f.hasOwnProperty("init")&&(c.debug&&(k=new Date),f.init(b,f,c,e),c.debug&&g.benchmark("Initializing "+f.id+" widget",k));!a&&f.hasOwnProperty("format")&&(c.debug&&(k=new Date),f.format(b,c,e,!1),c.debug&&g.benchmark((a?"Initializing ":"Applying ")+f.id+" widget",k))}})),setTimeout(function(){b.isApplyingWidgets=!1;h.data(b,"lastWidgetApplication", new Date)},0),c.debug&&(d=c.widgets.length,u("Completed "+(!0===a?"initializing ":"applying ")+d+" widget"+(1!==d?"s":""),m)))};g.refreshWidgets=function(b,a,c){b=h(b)[0];var e,d=b.config,l=d.widgets,m=g.widgets,k=m.length;for(e=0;e<k;e++)m[e]&&m[e].id&&(a||0>h.inArray(m[e].id,l))&&(d.debug&&f('Refeshing widgets: Removing "'+m[e].id+'"'),m[e].hasOwnProperty("remove")&&d.widgetInit[m[e].id]&&(m[e].remove(b,d,d.widgetOptions),d.widgetInit[m[e].id]=!1));!0!==c&&g.applyWidget(b,a)};g.getData=function(b, a,c){var e="";b=h(b);var d,f;if(!b.length)return"";d=h.metadata?b.metadata():!1;f=" "+(b.attr("class")||"");"undefined"!==typeof b.data(c)||"undefined"!==typeof b.data(c.toLowerCase())?e+=b.data(c)||b.data(c.toLowerCase()):d&&"undefined"!==typeof d[c]?e+=d[c]:a&&"undefined"!==typeof a[c]?e+=a[c]:" "!==f&&f.match(" "+c+"-")&&(e=f.match(new RegExp("\\s"+c+"-([\\w-]+)"))[1]||"");return h.trim(e)};g.formatFloat=function(b,a){if("string"!==typeof b||""===b)return b;var c;b=(a&&a.config?!1!==a.config.usNumberFormat: "undefined"!==typeof a?a:1)?b.replace(/,/g,""):b.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(b)&&(b=b.replace(/^\s*\(([.\d]+)\)/,"-$1"));c=parseFloat(b);return isNaN(c)?h.trim(b):c};g.isDigit=function(b){return isNaN(b)?/^[\-+(]?\d+[)]?$/.test(b.toString().replace(/[,.'"\s]/g,"")):!0}}});var q=h.tablesorter;h.fn.extend({tablesorter:q.construct});q.addParser({id:"no-parser",is:function(){return!1},format:function(){return""},type:"text"});q.addParser({id:"text",is:function(){return!0}, format:function(f,u){var m=u.config;f&&(f=h.trim(m.ignoreCase?f.toLocaleLowerCase():f),f=m.sortLocaleCompare?q.replaceAccents(f):f);return f},type:"text"});q.addParser({id:"digit",is:function(f){return q.isDigit(f)},format:function(f,u){var m=q.formatFloat((f||"").replace(/[^\w,. \-()]/g,""),u);return f&&"number"===typeof m?m:f?h.trim(f&&u.config.ignoreCase?f.toLocaleLowerCase():f):f},type:"numeric"});q.addParser({id:"currency",is:function(f){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((f|| "").replace(/[+\-,. ]/g,""))},format:function(f,u){var m=q.formatFloat((f||"").replace(/[^\w,. \-()]/g,""),u);return f&&"number"===typeof m?m:f?h.trim(f&&u.config.ignoreCase?f.toLocaleLowerCase():f):f},type:"numeric"});q.addParser({id:"url",is:function(f){return/^(https?|ftp|file):\/\//.test(f)},format:function(f){return f?h.trim(f.replace(/(https?|ftp|file):\/\//,"")):f},parsed:!0,type:"text"});q.addParser({id:"isoDate",is:function(f){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(f)},format:function(f, h){var m=f?new Date(f.replace(/-/g,"/")):f;return m instanceof Date&&isFinite(m)?m.getTime():f},type:"numeric"});q.addParser({id:"percent",is:function(f){return/(\d\s*?%|%\s*?\d)/.test(f)&&15>f.length},format:function(f,h){return f?q.formatFloat(f.replace(/%/g,""),h):f},type:"numeric"});q.addParser({id:"image",is:function(f,h,m,q){return 0<q.find("img").length},format:function(f,u,m){return h(m).find("img").attr(u.config.imgAttr||"alt")||f},parsed:!0,type:"text"});q.addParser({id:"usLongDate",is:function(f){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(f)|| /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(f)},format:function(f,h){var m=f?new Date(f.replace(/(\S)([AP]M)$/i,"$1 $2")):f;return m instanceof Date&&isFinite(m)?m.getTime():f},type:"numeric"});q.addParser({id:"shortDate",is:function(f){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((f||"").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(f,h,m,t){if(f){m=h.config;var x=m.$headers.filter("[data-column="+t+"]:last");t=x.length&&x[0].dateFormat||q.getData(x, q.getColumnData(h,m.headers,t),"dateFormat")||m.dateFormat;h=f.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===t?h=h.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===t?h=h.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===t&&(h=h.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3"));h=new Date(h);return h instanceof Date&&isFinite(h)?h.getTime():f}return f},type:"numeric"});q.addParser({id:"time",is:function(f){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(f)}, format:function(f,h){var m=f?new Date("2000/01/01 "+f.replace(/(\S)([AP]M)$/i,"$1 $2")):f;return m instanceof Date&&isFinite(m)?m.getTime():f},type:"numeric"});q.addParser({id:"metadata",is:function(){return!1},format:function(f,q,m){f=q.config;f=f.parserMetadataName?f.parserMetadataName:"sortValue";return h(m).metadata()[f]},type:"numeric"});q.addWidget({id:"zebra",priority:90,format:function(f,q,m){var t,x,z,A,F=new RegExp(q.cssChildRow,"i"),E=q.$tbodies;for(f=0;f<E.length;f++)z=0,t=E.eq(f),t=t.children("tr:visible").not(q.selectorRemove), t.each(function(){x=h(this);F.test(this.className)||z++;A=0===z%2;x.removeClass(m.zebra[A?1:0]).addClass(m.zebra[A?0:1])})},remove:function(f,h,m){var t;h=h.$tbodies;var x=(m.zebra||["even","odd"]).join(" ");for(m=0;m<h.length;m++)t=q.processTbody(f,h.eq(m),!0),t.children().removeClass(x),q.processTbody(f,t,!1)}})}(jQuery);
