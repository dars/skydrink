<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="<?=site_url('public/images/logo.ico')?>" type="image/x-icon">  
<title>歡迎光臨 貢茶網路下單系統</title>
<link rel="stylesheet" href="<?=site_url('public/css/validationEngine.jquery.css')?>">
<link rel="stylesheet" href="<?=site_url('public/css/jquery-ui-1.8.7.css')?>">
<link rel="stylesheet" href="<?=site_url('public/css/themes/default/easyui.css')?>">
<link rel="stylesheet" href="<?=site_url('public/css/themes/icon.css')?>">
<link rel="stylesheet" href="<?=site_url('public/css/ui.notify.css')?>">
<link rel="stylesheet" href="<?=site_url('public/css/jquery.fancybox-1.3.4.css')?>">
<link rel="stylesheet" href="<?=site_url('public/css/style.css')?>">
<script>
var jprod = <?=$jprod?>;
</script>
<script src="<?=site_url('public/js/jquery-1.4.4.min.js')?>"></script>
<script src="<?=site_url('public/js/jquery-ui-1.8.7.min.js')?>"></script>
<script src="<?=site_url('public/js/jquery.easyui.min.js')?>"></script>
<script src="<?=site_url('public/js/easyui-lang-zh_TW.js')?>"></script>
<script src="<?=site_url('public/js/jquery.colorize.js')?>"></script>
<script src="<?=site_url('public/js/jquery.validationEngine-zh_tw.js')?>"></script>
<script src="<?=site_url('public/js/jquery.validationEngine.js')?>"></script>
<script src="<?=site_url('public/js/jquery.notify.min.js')?>"></script>
<script src="<?=site_url('public/js/jquery.easing-1.3.pack.js')?>"></script>
<script src="<?=site_url('public/js/jquery.fancybox-1.3.4.pack.js')?>"></script>
<script src="<?=site_url('public/js/jquery.mousewheel-3.0.4.pack.js')?>"></script>
<script src="<?=site_url('public/js/script.js')?>"></script>
<script>
var free_limit=<?=$free_limit?>;
function create( template, vars, opts ){
	return $container.notify("create", template, vars, opts);
}
$(function(){
	<?=$this->session->flashdata('notify');?>
	$('a.prod_img').fancybox();
});
</script>
</head>
<body>
<div id="menu">
	<table>
		<?php
		$tmp = '';
		$i=1;
		$num = 8;
		foreach($prod as $p):
			if($tmp != $p->tname){
				if($i!=1){echo "</table>";}
				if($i%$num != 0){echo "</tr></table>";}
				echo "<table><tr><td class=\"cate_tr\" colspan=".$num.">".$p->tname."</td></tr>";
				$tmp = $p->tname;
				$j=0;
			}
			if($j%$num == 0){
				echo "<tr>";
			}
			echo "<td><a class=\"prod_item\" href='javascript:void(0)' rel=".$p->id.">".$p->name."</a>";
			if(!empty($p->img)){
				echo "<a class='prod_img' href='".site_url('public/files/images/'.$p->img)."'><img src='".site_url("public/images/img_icon.png")."'></a>";
			}
			echo "</td>";
			$j++;
			if($j%$num == 0){
				echo "</tr>";
			}
			$i++;
		endforeach;
		if($i%$num != 0){echo "</tr>";}
		echo "</table>";
		?>
	</ul>
	<div style="clear:both;">&nbsp;</div>
</div>
<div id="nav2">
	<a href="javascript:void(0)" id="toggle_menu"><img src="<?=site_url('public/images/nav_toggle_darker.png')?>"></a>
</div>
<div class="content">
<h1><img src="<?=site_url('public/images/title.png')?>"></h1>
<fieldset id="chose_form">
<legend><img src="<?=site_url('public/images/form_title.png')?>"></legend>
	<table>
	<tr>
		<th>分類</th>
		<th>飲料名稱</th>
		<th>容量</th>
		<th>糖分</th>
		<th>冰塊/熱</th>
		<th>加料1</th>
		<th>加料2</th>
		<th>單價</th>
		<th>數量</th>
		<th>小計</th>
		<th>&nbsp;</th>
	</tr>
	<tr>
		<td><select id="cate_combo" name="cate">
			<option value='' selected>分類</option>
			<?php
				foreach($tax as $t):
				echo "<option value=".$t->id.">".$t->name."</option>";
				endforeach;
			?>
			</select></td>
		<td><select id="prod_combo" name="prod"><option>飲料名稱</option></select></td>
		<td><select id="size_combo" name="size"><option value=''>容量</option><option value='m'>中杯</option><option value='l'>大杯</option></select></td>
		<td><select id="sugure_combo" name="sugure">
			<option value=''>糖分</option>
			<option value=1>全糖</option>
			<option value=2>7分</option>
			<option value=3>5分</option>
			<option value=4>3分</option>
			<option value=5>無糖</option>
			<option value=6>固定甜度</option>
			</select></td>
		<td><select id="ice_combo" name="ice">
			<option value=''>冰塊/熱</option>
			<option value=1>正常</option>
			<option value=2>少冰</option>
			<option value=3>去冰</option>
			<option value=4>溫</option>
			<option value=5>熱</option>
			<option value=6>固定冰塊</option>
			</select></td>
		<td><select id="mate_combo1" name="mate1">
			<option value=''>加料1</option>
			<?php
				foreach($mat as $m):
					echo "<option value=".$m->id.">".$m->name."</option>";
				endforeach;
			?>
			</select></td>
		<td><select id="mate_combo2" name="mate2">
			<option value=''>加料2</option>
			<?php
				foreach($mat as $m):
					echo "<option value=".$m->id.">".$m->name."</option>";
				endforeach;
			?>
			</select></td>
		<td><input type="text" id="price" name="price" class="num" readonly></td>
		<td><input type="text" id="num" name="num" class="num"></td>
		<td><input type="text" id="total" name="total" class="num" readonly></td>
		<td><button id="chose_form_btn">加入</button></td>
	</tr>
	</table>
</fieldset>
<form method="post" action="welcome/save" name="order_form" id="order_form">
<fieldset id="order_list_block">
	<legend><img src="<?=site_url('public/images/order_list_title.png')?>"></legend>
	<table class="order_list_tb" id="order_list_tb">
		<tr><th></th><th></th><th>名稱</th><th>數量</th><th>小計</th></tr>
	</table>
	<div id="order_price">總金額：<span id="order_total">$0</span></div>
	<div style="text-align:right;color:#F00;font-size:12px;padding-right:20px;">買五送一優惠中!!</div>
</fieldset>
<fieldset id="contact_block">
	<legend><img src="<?=site_url('public/images/contact_form_title.png')?>"></legend>
	<table class="contact_tb">
		<tr>
			<th>*姓名</th>
			<td><input type="text" name="name" id="name" class="validate[required]" autocomplete="off"></td>
		</tr>
		<tr>
			<th>*電話</th>
			<td><input type="text" name="tel" id="tel" class="validate[required]" autocomplete="off"></td>
		</tr>
		<tr>
			<th>*送貨地點</th>
			<td><input type="text" name="addr" id="addr" class="validate[required]" autocomplete="off"></td>
		</tr>
		<tr>
			<th>*希望送達日期</th>
			<td>
				<select name="date" id="date">
					<?php
						$i=0;
						while($i<7){
							$str=date('Y-m-d',mktime(0,0,0,date('m'),date('d')+$i,date('Y')));
							echo "<option value='".$str."'>".$str."</option>";
							$i++;
						}
					?>
				</select>
			</td>
		</tr>
		<tr>
			<th>*希望送達時間</th>
			<td>
				<select name="time" id="time">
					<?php
						$i=10;
						while($i<=22){
							echo "<option value='".$i.":00'>".$i.":00</option>";
							echo "<option value='".$i.":30'>".$i.":30</option>";
							$i++;
						}
					?>
				</select>
			</td>
		</tr>
		<tr>
			<th>備註</th>
			<td><input type="text" name="remark" id="remark" autocomplete="off"></td>
		</tr>
		<tr>
			<td colspan=2 class="ps">*為必填欄位 ; 訂單需提早三小時下單</td>
		</tr>
	</table>
	<button id="sub_btn" type="submit">確定送出</button>
</fieldset>
<p style="clear:both;"><br>頁面產生時間 {elapsed_time} 秒</p>
</div>
<div id="notify_template">
    <div id="default">
    	<h1>#{title}</h1>
    	<p>#{text}</p>
    </div>
    <div id="sticky">
    	<a class="ui-notify-close ui-notify-cross" href="#">x</a>
    	<h1>#{title}</h1>
    	<p>#{text}</p>
    </div>    
    <div id="msg_error" class="ui-state-error" style="padding:10px; -moz-box-shadow:0 0 6px #980000; -webkit-box-shadow:0 0 6px #980000; box-shadow:0 0 6px #980000;">
    	<a class="ui-notify-close" href="#"><span class="ui-icon ui-icon-close" style="float:right"></span></a>
    	<span style="float:left; margin:0 5px 0 0;" class="ui-icon ui-icon-alert"></span>
    	<h1>#{title}</h1>
    	<p>#{text}</p>
    	<p style="text-align:center"><a class="ui-notify-close" href="#">關閉</a></p>
    </div>
    <div id="msg_info" class="ui-state-highlight" style="padding:10px; -moz-box-shadow:0 0 6px #000099; -webkit-box-shadow:0 0 6px #000099; box-shadow:0 0 6px #000099;">
    	<a class="ui-notify-close" href="#"><span class="ui-icon ui-icon-close" style="float:right"></span></a>
    	<span style="float:left; margin:0 5px 0 0;" class="ui-icon ui-icon-info"></span>
    	<h1>#{title}</h1>
    	<p>#{text}</p>
    	<p style="text-align:center"><a class="ui-notify-close" href="#">確認</a></p>
    </div>
</div>
</body>
</html>