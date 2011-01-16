

(function($) {
	$.fn.validationEngineLanguage = function() {};
	$.validationEngineLanguage = {
		newLang: function() {
			$.validationEngineLanguage.allRules = 	{"required":{    			// Add your regex rules here, you can take telephone as an example
						"regex":"none",
						"alertText":"* 此欄位必填",
						"alertTextCheckboxMultiple":"* 請選擇數值",
						"alertTextCheckboxe":"* 此核選清單為必填"},
					"length":{
						"regex":"none",
						"alertText":"*此欄位要求請輸入 ",
						"alertText2":" ~ ",
						"alertText3": " 字數"},
					"maxCheckbox":{
						"regex":"none",
						"alertText":"* Checks allowed Exceeded"},	
					"minCheckbox":{
						"regex":"none",
						"alertText":"* 請選擇 ",
						"alertText2":" options"},
					"confirm":{
						"regex":"none",
						"alertText":"* 您輸入的密碼並不相符"},		
					"telephone":{
						"regex":"/^[0-9\-\(\)\ ]+$/",
						"alertText":"* Invalid phone number"},	
					"email":{
						"regex":"/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
						"alertText":"* 錯誤的email格式"},	
					"date":{
                         "regex":"/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/",
                         "alertText":"* Invalid date, must be in YYYY-MM-DD format"},
					"onlyNumber":{
						"regex":"/^[0-9\ ]+$/",
						"alertText":"* 只接受數字"},	
					"noSpecialCaracters":{
						"regex":"/^[0-9a-zA-Z]+$/",
						"alertText":"* No special caracters allowed"},	
					"ajaxName":{
						"file":"admin/users/chk_user",
						"alertText":"* 此帳號已被使用",
						"alertTextOk":"* 此帳號允許註冊",	
						"alertTextLoad":"* 確認中,請稍等..."},
					"ajaxEmail":{
						"file":"admin/users/chk_email",
						"alertText":"* 此email已被使用",
						"alertTextOk":"* 此email允許註冊",	
						"alertTextLoad":"* 確認中,請稍等..."},		
					"onlyLetter":{
						"regex":"/^[a-zA-Z\ \']+$/",
						"alertText":"* 僅接受文字"},
					"validate2fields":{
    					"nname":"validate2fields",
    					"alertText":"* You must have a firstname and a lastname"}	
					}	
					
		}
	}
})(jQuery);

$(document).ready(function() {	
	$.validationEngineLanguage.newLang()
});