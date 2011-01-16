$(function(){
	$container = $("#notify_template").notify();
	$('#order_form').validationEngine();
	$('#order_form')[0].reset();
	function count_order_price(){
		var gp=$('.order_price');
		var cp=$('input[name="num[]"]');
		var c = 0;
		var i = 0;
		var t = 0;
		while(i<gp.length){
			t+=Number(gp.eq(i).html());
			c+=Number(cp.eq(i).val());
			i++;
		}
		if(c>=free_limit){
			var free = Math.floor(c/free_limit);
			var price = Math.floor(t/c);
			t-=(price*free);
		}
		$('#order_total').html('$'+t);
	}
	$('#date').combobox({
		editable:false,
		required:true,
		missingMessage:'此欄位必填'
	});
	$('#time').combobox({
		editable:false,
		required:true,
		missingMessage:'此欄位必填'
	});
	$('#chose_form_btn')
		.click(function(){
			if($('#cate_combo').val() == ''){
				alert('請選擇類別');
				return false;
			}
			if($('#prod_combo').val() == ''){
				alert('請飲料名稱');
				return false;
			}
			if($('#size_combo').val() == ''){
				alert('請選擇容量');
				return false;
			}
			if($('#sugure_combo').val() == ''){
				alert('請選擇糖分');
				return false;
			}
			if($('#ice_combo').val() == ''){
				alert('請選擇冰塊/熱');
				return false;
			}
			tmp_mate=new Array();
			tmp_mate.push($('#size_combo option:selected').text());
			tmp_mate.push($('#sugure_combo option:selected').text());
			tmp_mate.push($('#ice_combo option:selected').text());
			if($('#mate_combo1').val() !== ''){
				tmp_mate.push($('#mate_combo1 option:selected').text());
			}
			if($('#mate_combo2').val() !== ''){
				tmp_mate.push($('#mate_combo2 option:selected').text());
			}
			tmp_html = '<tr>'+
				'<td class="list_sn">'+$('#order_list_tb tr').length+'</td>'+
				'<td><a class="list_del" href="javascript:void(0)" alt="刪除" title="刪除">'+
					'<span class="ui-icon ui-icon-close"></span></a>'+
				'</td>'+
				'<td>'+
					'<div class="prod_name">'+$('#prod_combo option:selected').text()+'</div>'+
					'<div class="material">'+tmp_mate.join(',')+'</div>'+
					'<input type="hidden" name="prod_id[]" value="'+$('#prod_combo').val()+'">'+
					'<input type="hidden" name="size_id[]" value="'+$('#size_combo').val()+'">'+
					'<input type="hidden" name="sugure_id[]" value="'+$('#sugure_combo').val()+'">'+
					'<input type="hidden" name="ice_id[]" value="'+$('#ice_combo').val()+'">'+
					'<input type="hidden" name="mate_id1[]" value="'+$('#mate_combo1').val()+'">'+
					'<input type="hidden" name="mate_id2[]" value="'+$('#mate_combo2').val()+'">'+
					'<input type="hidden" name="price[]" value="'+$('#price').val()+'">'+
				'</td>'+
				'<td class="num"><input type="text" id="num_'+$('#order_list_tb tr').length+'" name="num[]" class="list_num num validate[required,custom[onlyNumber]]" value='+$('#num').val()+'></td>'+
				'<td class="price num">$<span class="order_price">'+$('#total').val()+'</span></td>'+
			'</tr>';
			$(tmp_html).appendTo($('#order_list_tb tbody'));
			count_order_price();
			reset_size();
			reset_ice();
			reset_sugure();
			reset_mate();
			$('#cate_combo').val('');
			$('#prod_combo').val('');
			$('#size_combo').val('');
			$('#ice_combo').val('');
			$('#sugure_combo').val('');
			$('#mate_combo1').val('');
			$('#mate_combo2').val('');
			$('#num').val('');
			$('#price').val('');
			$('#total').val('');
	});
	$('.list_num').live('change',function(){
		var index = this.parentNode.parentNode.rowIndex;
		var price = $('#order_list_tb tr').eq(index).find('input[name="price[]"]').val();
		var num = $('#order_list_tb tr').eq(index).find('input[name="num[]"]').val();
		var tmp_price = price*num;
		$('#order_list_tb tr').eq(index).find('.order_price').html(tmp_price);
		count_order_price()
	});
	
	$('#menu').hide();
	$('#toggle_menu').click(function(){
		$('#menu').slideToggle('slow');
	});
	$('#menu a').click(function(obj){
		$('#menu').slideUp('fast');
		
	});
	
	
	$('.order_list_tb').colorize({
		altColor:'#FAFAFA',
		hoverColor:'#FFF5F5'
	});
	$('#cate_combo').change(function(){
		reset_size();
		reset_ice();
		reset_sugure();
		reset_mate();
		$('#num').val('');
		$('#price').val('');
		$('#total').val('');
		var id = $('#cate_combo').val();
		if(id !== ''){
			var obj = jprod.data[jprod.index[id]];
			var count = obj.data.length;
			$('#prod_combo').html("");
			var i = 0;
			$('#prod_combo').get(0).add(new Option('飲料名稱',''),document.all?i:null);
			while(i<count){
				$('#prod_combo').get(0).add(new Option(obj.data[i].name,obj.data[i].id),document.all?i:null);
				i++;
			}
		}
	});
	$('#prod_combo').change(function(){
		var cate_id = $('#cate_combo').val();
		var prod_id = $('#prod_combo').val();
		var obj = jprod.data[jprod.index[cate_id]].data[jprod.data[jprod.index[cate_id]].index[prod_id]];
		reset_size();
		reset_ice();
		reset_sugure();
		if(obj.m_price === null){
			$('#size_combo option[value=m]').remove();
		}
		if(obj.l_price === null){
			$('#size_combo option[value=l]').remove();
		}
		if(obj.sugure == '6'){
			$('#sugure_combo').html("<option value=6>固定甜度</option>");
		}else{
			var tmp_ar=obj.sugure.split(',');
			var i = ($('#sugure_combo option').length-1);
			while(i>=0){
				var tmp_val=$('#sugure_combo option').eq(i).val();
				if(tmp_val != '' && $.inArray(tmp_val,tmp_ar) == -1){
					$('#sugure_combo option[value='+tmp_val+']').remove();
				}
				i--;
			}
		}
		if(obj.ice == '6'){
			$('#ice_combo').html("<option value=6>固定冰塊</option>");
		}else{
			var tmp_ar=obj.ice.split(',');
			var i = ($('#ice_combo option').length-1);
			while(i>=0){
				var tmp_val=$('#ice_combo option').eq(i).val();
				if(tmp_val != '' && $.inArray(tmp_val,tmp_ar) == -1){
					$('#ice_combo option[value='+tmp_val+']').remove();
				}
				i--;
			}
		}
		$('#num').val(1);
		count_chose_price();
	});
	$('#size_combo').change(function(){
		var cate_id = $('#cate_combo').val();
		var prod_id = $('#prod_combo').val();
		var obj = jprod.data[jprod.index[cate_id]].data[jprod.data[jprod.index[cate_id]].index[prod_id]];
		if($('#size_combo').val() == 'm'){
			$('#price').val(obj.m_price);
			$('#total').val(obj.m_price*$('#num').val());
		}
		if($('#size_combo').val() == 'l'){
			$('#price').val(obj.l_price);
			$('#total').val(obj.l_price*$('#num').val());
		}
		count_chose_price();
	});
	$('#ice_combo').change(function(){
		reset_mate();
		if($('#ice_combo').val() == 4 || $('#ice_combo').val() == 5){
			$('#mate_combo1 option[value=3]').remove();
			$('#mate_combo1 option[value=4]').remove();
			$('#mate_combo2 option[value=3]').remove();
			$('#mate_combo2 option[value=4]').remove();
		}
	});
	$('#mate_combo1').change(function(){
		count_chose_price();
	});
	$('#mate_combo2').change(function(){
		count_chose_price();
	});
	$('#num').change(function(){
		count_chose_price();
	});
	
	/* count price */
	function count_chose_price(){
		var cate_id = $('#cate_combo').val();
		var prod_id = $('#prod_combo').val();
		var obj = jprod.data[jprod.index[cate_id]].data[jprod.data[jprod.index[cate_id]].index[prod_id]];
		if($('#size_combo').val() == ''){
			return false;
		}
		if($('#num').val() == ''){
			return false;
		}
		if($('#prod_combo').val() == ''){
			return false;
		}
		tmp_price = 0;
		//單價
		$('#price').val(eval('obj.'+$('#size_combo').val()+'_price'));
		//加料
		if(price_mate($('#mate_combo1').val())){
			$('#price').val(Number($('#price').val())+Number(price_mate($('#mate_combo1').val())));
		}
		if(price_mate($('#mate_combo2').val())){
			$('#price').val(Number($('#price').val())+Number(price_mate($('#mate_combo2').val())));
		}
		//總價
		$('#total').val($('#price').val()*$('#num').val());
	}
	/* material price */
	function price_mate(v){
		if(v != ''){
			switch(v){
				case '1':
				case '2':
				case '3':
				case '4':
					return 5;
					break;
				case '5':
				case '6':
					return 10;
					break;
				case '7':
					return 15;
					break;
				case '8':
					return 20;
					break;
				default:
					return 0;
					break;
			}
		}
		return 0;
	}
	/* reset function */
	function reset_size(){
		$('#size_combo').html("<option value=''>容量</option><option value='m'>中杯</option><option value='l'>大杯</option>");
	}
	function reset_sugure(){
		$('#sugure_combo').html("<option value=''>糖分</option><option value=1>全糖</option><option value=2>7分</option><option value=3>5分</option><option value=4>3分</option><option value=5>無糖</option><option value=6>固定甜度</option>");
	}
	function reset_ice(){
		$('#ice_combo').html("<option value=''>冰塊/熱</option><option value=1>正常</option><option value=2>少冰</option><option value=3>去冰</option><option value=4>溫</option><option value=5>熱</option><option value=6>固定冰塊</option>");
	}
	function reset_mate(){
		$('#mate_combo1').html(mate_html1);
		$('#mate_combo2').html(mate_html2);
	}
	var mate_html1 = $('#mate_combo1').html();
	var mate_html2 = $('#mate_combo2').html();
	$('#cate_combo').val('');
	$('#prod_combo').val('');
	$('#size_combo').val('');
	$('#ice_combo').val('');
	$('#sugure_combo').val('');
	$('#mate_combo1').val('');
	$('#mate_combo2').val('');
	$('#num').val('');
	$('#price').val('');
	$('#total').val('');
	
	/* 刪除tb */
	$('.list_del').live('click',function(obj){
		var rowIndex = this.parentNode.parentNode.rowIndex;
		var flag = confirm('確定刪除？');
		if(flag){
			$('#order_list_tb tr').eq(rowIndex).remove();
		}
	});
})