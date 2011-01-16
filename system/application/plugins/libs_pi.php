<?php
function msg_block($title,$text,$type){
	return "create('msg_".$type."', { msg_title:'".$title."', text:'".$text."' },{custom: true});";
}