/*
用來檢查INPUT輸入是否正確
用法:
<div id = 'a'>
	<input cktype ='password' />
</div>
<script>
	$('#a').InputCheck();
	//$('#a').InputCheck([{'border':'1px solid red'}]);//設定格式錯誤的話會直接在input加上紅邊
	//如果有後續SUBMIT的話，可以直接使用if($('.InputError').length == 0){ }
</script>
*/
(function($){
	$.extend($.fn, {
		InputCheck : function (SetStyle) {
			var config = [{'border':'1px solid red'}];
			if (SetStyle){$.extend(config, SetStyle);}
			var CssStyle = '';
			/*for (var i = 0; i < config.length; i++) {
				for (var idx_Key in config[i]) {
					CssStyle += idx_Key + ' : '+ config[i][idx_Key] + ';';
				}
			}
			$('body').append("<style>.InputError{"+CssStyle+"}</style>");*/
			for(var i = 0; i < $(this).find('input').length; i++){
				if($(this).find('input')[i].getAttribute('cktype') == 'date'){
					$('#'+$(this).find('input')[i].id).datepicker();
				}
				if($(this).find('input')[i].getAttribute('cktype') == 'password'){
					$(this).find('input')[i].setAttribute('type','password');
				}
			}
			$(this).find('input').on('change',function(){
				if($(this)[0].getAttribute('cktype') && $(this)[0].value != ''){
					if(!CheckFunction($(this)[0].getAttribute('cktype'),$(this)[0].value)){
						$(this).addClass('InputError');
					}else{
						$(this).removeClass('InputError');
					}
				}
			});
			$(".InputError").css(config);

			var CheckFunction = function(type,str){
				if(type && str){
					var reg = false;
					switch (type){
						case 'number':
							/*Check Number*/
							reg = /^[0-9]+$/;
						break;
						case 'email':
							/*Check email*/
							/*
							reg = /^[a-z0-9]+\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
							*/
							reg = /^[^@^\s]+@[^\.@^\s]+(\.[^\.@^\s]+)+$/;
						break;
						case 'date':
							/*Check date*/
							reg = /^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})+$/;
						break;
						case 'password':
							/*
							Check Password
							but the Password value will change for PsReCh function
							*/
							reg = /^(?=^.{6,12}$)((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))^.*$/;
						break;
						case 'phone':
							reg = /^(\+|\d)+\d+$/;
						break;
						case 'text':
							reg = /^[\_a-zA-Z0-9]+$/;
						break;
					}
					// alert(reg +'--'+str);
					var ret = false;
					if(reg != false){
						if (reg.test(str) ) {
							ret = true;
						}
					}
					return ret;
				}else{
					return false;
				}
			};

		}
	});
})( jQuery );