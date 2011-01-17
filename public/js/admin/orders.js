var size_render = function(v){
	if(v == 'm'){
		return 'M';
	}else if(v == 'l'){
		return 'L';
	}else{
		return '';
	}
};
var price_render = function(v){
	if(v === '' || v===0){
		return '';
	}else{
		tmp = '$'+v;
		return tmp;
	}
};
var order_ds = new Ext.data.JsonStore({
	proxy:new Ext.data.HttpProxy({url:'orders',method:'post'}),
	totalProperty:'totalProperty',
	root:'root',
	fields:[
		{name:'id',type:'int'},
		{name:'name',type:'string'},
		{name:'tel',type:'string'},
		{name:'address',type:'string'},
		{name:'date',type:'string'},
		{name:'time',type:'string'},
		{name:'remark',type:'string'},
		{name:'total',type:'string'},
		{name:'created',type:'string'}
	]
});
order_ds.load({params:{limit:20,start:0}});
var order_sm = new Ext.grid.CheckboxSelectionModel();
var order_cm = new Ext.grid.ColumnModel([
	order_sm,
	new Ext.grid.RowNumberer(),
	{header:'id',dataIndex:'id',hidden:true},
	{header:'姓名',dataIndex:'name'},
	{header:'電話',dataIndex:'tel'},
	{header:'地址',dataIndex:'address'},
	{header:'日期',dataIndex:'date'},
	{header:'時間',dataIndex:'time'},
	{header:'備註',dataIndex:'remark'},
	{header:'總金額',dataIndex:'total',align:'right',renderer:price_render},
	{header:'建立時間',dataIndex:'created',sortable:true}
]);
var orders = new Ext.grid.GridPanel({
	id:'order_m',
	title:'訂單列表',
	frame:true,
	loadMask:true,
	store:order_ds,
	cm:order_cm,
	sm:order_sm,
	enableHdMenu:false,
	stripeRows:true,
	columnLines:true,
	autoScroll:true,
	viewConfig:{
		forceFit:true
	},
	bbar:new Ext.PagingToolbar({
		pageSize:20,
		store:order_ds,
		items:['-',{
			text:'刪除'
		}]
	})
});
orders.on('rowdblclick',function(){
	var sm = orders.getSelectionModel();
	edit_order_record = sm.getSelected();
	order_d_ds.baseParams.order_id = edit_order_record.data.id;
	order_d_ds.load();
	order_win.show();
});
var order_d_ds = new Ext.data.JsonStore({
	proxy:new Ext.data.HttpProxy({url:'order_d',method:'post'}),
	root:'root',
	fields:[
		{name:'id',type:'int'},
		{name:'order_id',type:'int'},
		{name:'prod_id',type:'int'},
		{name:'size_id',type:'string'},
		{name:'sugure_id',type:'int'},
		{name:'ice_id',type:'int'},
		{name:'mate1_id',type:'int'},
		{name:'mate2_id',type:'int'},
		{name:'num',type:'int'},
		{name:'price',type:'int'},
		{name:'total',type:'int'},
		{name:'pname',type:'string'},
		{name:'sname',type:'string'},
		{name:'iname',type:'string'},
		{name:'mname1',type:'string'},
		{name:'mname2',type:'string'}
	]
});

var order_d_cm = new Ext.grid.ColumnModel([
	new Ext.grid.RowNumberer(),
	{header:'飲料名稱',dataIndex:'pname'},
	{header:'容量',dataIndex:'size_id',align:'center',renderer:size_render},
	{header:'糖分',dataIndex:'sname'},
	{header:'冰塊/熱',dataIndex:'iname'},
	{header:'加料1',dataIndex:'mname1'},
	{header:'加料2',dataIndex:'mname2'},
	{header:'數量',dataIndex:'num',align:'right'},
	{header:'單價',dataIndex:'price',align:'right',renderer:price_render},
	{header:'小計',dataIndex:'total',align:'right',renderer:price_render}
]);
var order_d = new Ext.grid.GridPanel({
	store:order_d_ds,
	cm:order_d_cm,
	id:'orderd',
	title:'明細列表',
	frame:true,
	loadMask:true,
	enableHdMenu:false,
	stripeRows:true,
	columnLines:true,
	autoScroll:true,
	viewConfig:{
		forceFit:true
	}
});
var order_win = new Ext.Window({
	renderTo:Ext.get('order_win'),
	width:670,
	title:'訂單表單',
	layout:'fit',
	modal:true,
	height:380,
	closeAction:'hide',
	items:[order_d]
});