var loader = new Image();
loader.src = "../public/images/ajax-loader.gif";
var prod_ds = new Ext.data.JsonStore({
	proxy:new Ext.data.HttpProxy({url:'products',method:'post'}),
	totalProperty:'totalProperty',
	root:'root',
	fields:[
		{name:'id',type:'int'},
		{name:'name',type:'string'},
		{name:'t_id',type:'int'},
		{name:'tname',type:'string'},
		{name:'m_price',type:'string'},
		{name:'l_price',type:'string'},
		{name:'weight',type:'int'},
		{name:'sugure',type:'string'},
		{name:'sugure1',type:'string'},
		{name:'sugure2',type:'string'},
		{name:'sugure3',type:'string'},
		{name:'sugure4',type:'string'},
		{name:'sugure5',type:'string'},
		{name:'sugure6',type:'string'},
		{name:'ice',type:'string'},
		{name:'ice1',type:'string'},
		{name:'ice2',type:'string'},
		{name:'ice3',type:'string'},
		{name:'ice4',type:'string'},
		{name:'ice5',type:'string'},
		{name:'ice6',type:'string'},
		{name:'img',type:'string'}
	]
});
prod_ds.load({params:{limit:20,start:0}});
//var prod_sm = new Ext.grid.CheckboxSelectionModel();
var prod_cm = new Ext.grid.ColumnModel([
	//prod_sm,
	new Ext.grid.RowNumberer(),
	{header:'id',dataIndex:'id',hidden:true},
	{header:'產品名稱',dataIndex:'name'},
	{header:'分類',dataIndex:'tname'},
	{header:'中杯',dataIndex:'m_price',renderer:price_render,align:'right'},
	{header:'大杯',dataIndex:'l_price',renderer:price_render,align:'right'}
]);
var products = new Ext.grid.GridPanel({
	id:'prod',
	title:'產品列表',
	frame:true,
	loadMask:true,
	store:prod_ds,
	cm:prod_cm,
	//sm:prod_sm,
	enableHdMenu:false,
	stripeRows:true,
	columnLines:true,
	autoHeight:true,
	viewConfig:{
		forceFit:true
	},
	bbar:new Ext.PagingToolbar({
		pageSize:20,
		store:prod_ds
	})
});
products.on('rowdblclick',function(grid,rowIndex){
	var record = grid.getStore().getAt(rowIndex);
	prod_form.getForm().loadRecord(record);
	prod_form.getForm().findField('img').setValue('');
	Ext.get('prod_img').dom.src = Ext.BLANK_IMAGE_URL;
	if(record.data.img){
		Ext.get('prod_img').dom.src = loader.src;
		tmp=new Image();
		tmp.src='../public/files/images/'+record.data.img;
		tmp.onload = function(){
			Ext.get('prod_img').dom.src = tmp.src;
		}
	}
});
var cate_ds = new Ext.data.JsonStore({
	proxy:new Ext.data.HttpProxy({method:'post',url:'cate_list'}),
	root:'root',
	fields:[
		{name:'id'},
		{name:'name'}
	]
});
cate_ds.load();
var cate_combo = new Ext.form.ComboBox({
	fieldLabel:'類別',
	id:'cate_combo',
	store:cate_ds,
	mode:'local',
	hiddenName:'t_id',
	displayField:'name',
	valueField:'id',
	emptyText:'請選擇',
	allowBlank:false,
	triggerAction:'all',
	editable:false
});
var prod_form = new Ext.form.FormPanel({
	autoScroll:true,
	labelAlign:'right',
	title:'產品列表',
	labelWidth:100,
	frame:true,
	fileUpload:true,
	defaults:{
		anchor:'95%',
		msgTarget:'side'
	},
	items:[{
		layout:'column',
		items:[{
			columnWidth:0.4,
			layout:'fit',
			items:[products]
		},{
			columnWidth:0.6,
			xtype:'fieldset',
			labelWidth:120,
			title:'產品基本資料',
			border:true,
			autoHeight:true,
			defaults:{anchor:'90%'},
			style:'margin-left:10px;padding:5px',
			items:[cate_combo,{
				fieldLabel:'產品名稱',
				xtype:'textfield',
				name:'name'
			},{
				fieldLabel:'中杯價',
				xtype:'numberfield',
				name:'m_price'
			},{
				fieldLabel:'大杯價',
				xtype:'numberfield',
				name:'l_price'
			},{
				fieldLabel:'糖分',
				xtype:'checkboxgroup',
				itemCls:'x-check-group-alt',
				columns:6,
				items:[
					{boxLabel:'全糖',name:'sugure1',value:1},
					{boxLabel:'7分',name:'sugure2',value:2},
					{boxLabel:'5分',name:'sugure3',value:3},
					{boxLabel:'3分',name:'sugure4',value:4},
					{boxLabel:'無糖',name:'sugure5',value:5},
					{boxLabel:'固定甜度',name:'sugure6',value:6}
				]
			},{
				fieldLabel:'冰塊/熱',
				xtype:'checkboxgroup',
				itemCls:'x-check-group-alt',
				columns:6,
				items:[
					{boxLabel:'正常',name:'ice1',value:1},
					{boxLabel:'少冰',name:'ice2',value:2},
					{boxLabel:'去冰',name:'ice3',value:3},
					{boxLabel:'溫',name:'ice4',value:4},
					{boxLabel:'熱',name:'ice5',value:5},
					{boxLabel:'固定冰塊',name:'ice6',value:6}
				]
			},{
				name:'img',
				id:'img_txt',
				xtype:'fileuploadfield',
				fieldLabel:'圖片',
				buttonText:'瀏覽'
			},{
	    		xtype:'box',
	    		autoEl:{
	    		    tag:'div',
	    		    id:'img_dv', 
	    		    align:'center',
	    		    children:[{
	    		    	id:'prod_img',
	    		    	tag:'img',
	    		    	src:Ext.BLANK_IMAGE_URL
 	    		    }]
 	    		}
			},{
				name:'id',
				xtype:'hidden'
			}],
			buttons:[{
				text:'儲存',
				handler:function(){
					if(prod_form.getForm().isValid()){
						prod_form.getForm().submit({
							url:'prod_save',
							waitMsg:'資料儲存中...',
							success:function(fp,o){
								show_Growl(1,'訊息','資料已儲存');
								prod_form.getForm().reset();
								Ext.get('prod_img').dom.src = Ext.BLANK_IMAGE_URL;
								prod_ds.reload();
							}
						});
					}
				}
			},{
				text:'取消',
				handler:function(){
					prod_form.getForm().reset();
					Ext.get('prod_img').dom.src = Ext.BLANK_IMAGE_URL;
				}
			},{
				text:'新增一筆',
				handler:function(){
					prod_form.getForm().reset();
					Ext.get('prod_img').dom.src = Ext.BLANK_IMAGE_URL;
				}
			},{
				text:'刪除',
				handler:function(){
					var id = prod_form.getForm().findField('id').getValue();
					if(id === ''){
						Ext.Msg.alert('提醒','請選擇需要刪除的資料！');
					}else{
						Ext.Msg.confirm('提醒','確定刪除此筆資料？若已有相關訂單將會無法刪除',function(btn){
							if(btn == 'yes'){
								Ext.Ajax.request({
									url:'prod_del',
									params:{id:prod_form.getForm().findField('id').getValue()},
									success:function(){
										show_Growl(1,'訊息','資料已刪除');
        	    						prod_form.getForm().reset();
        	    						Ext.get('prod_img').dom.src = Ext.BLANK_IMAGE_URL;
										prod_ds.reload();
									}
								});
							}
						});
					}
				}
			}]
		}]
	}]
});