Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.override(Ext.data.Store, {
		storeOptions : function(o) {
			o = Ext.apply({}, o);
			if(o.params){
				o.params = Ext.apply({}, o.params);
			}
			delete o.callback;
			delete o.scope;
			this.lastOptions = o;
		}
	});
	var tp = new Ext.TabPanel({
		id:'tp',
		region:'center',
		items:[orders,prod_form]
	});
	login_win.show();
	tp.activate(0);
	var vp = new Ext.Viewport({
		layout:'border',
		items:[{
			region:'north',
			html:'<h1><img src="'+base_url+'public/images/title.png"></h1>',
			height:67
		},tp]
	});
});
function show_Growl(type,title,string){
	if(type == 1){
		Ext.ux.Growl.notify({
			title: title, 
			message: string,
			iconCls:'x-growl-notice',
			alignment: "tr-tr",
			offset: [-10, 10]
		});
	}else{
		Ext.ux.Growl.notify({
			title: title, 
			message: string,
			iconCls:'x-growl-error',
			alignment: "tr-tr",
			offset: [-10, 10]
		});
	}
}