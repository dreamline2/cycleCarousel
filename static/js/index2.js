$(function(){


	//設定rotate的輪播
	var speed = 2000;
	var run = setInterval('rotate()', speed);	
	
	//設定li的寬度
	var item_width = $('#slidershow li').outerWidth(); 
	var left_value = parseInt(item_width * (-1)/2, 10); 

	// terry介紹的方法

	var slidershow = $('#slidershow');
	var slidershow_width = slidershow.width();

	$(window).resize(function(){
		var cur_width = $('html,body').outerWidth();
        var div_left = (parseInt(cur_width/2, 10)) - (parseInt(slidershow_width/2, 10));
        console.log(cur_width, div_left)
        slidershow.find('ul').css({'margin-left':div_left+'px'});
	});


        
    //將slidershow 弟一個
	$('#slidershow li:first').before($('#slidershow li:last'));
	
	
	$('#slidershow ul').css({'left' : left_value});

    //點擊right
	$('#right').click(function() {

		//左邊的     
		var left_indent = parseInt($('#slidershow ul').css('left')) + item_width;

		

		//在UL還沒有有動態效果時后     
		$('#slidershow ul:not(:animated)').animate({'left' : left_indent}, 200,function(){    

            //第一個 li前面加入  li最後一個	
			 $('#slidershow li:first').before($('#slidershow li:last'));           

			//設定ul 的css

			$('#slidershow ul').css({'left' : left_value});
			$('#slidershow li').eq(2).fadeTo(400,1).siblings().fadeTo(400,0.8);

			console.log(left_value,"右邊");
		
		});

		// 阻止連泡模式         
		return false;
            
	});

 
    //點擊左邊的按鈕
	$('#left').click(function() {
		
		//設定動畫的
		var left_indent = parseInt($('#slidershow ul').css('left')) - item_width;
		
		//slide the item
		$('#slidershow ul:not(:animated)').animate({'left' : left_indent}, 200, function () {
            
            //move the first item and put it as last item
			$('#slidershow li:last').after($('#slidershow li:first'));                 	
			
			//set the default item to correct position
			$('#slidershow ul').css({'left' : left_value});
			$('#slidershow li').eq(2).fadeTo(400,1).siblings().fadeTo(400,0.8);



			console.log(left_value,"左邊");
		
		});
		         
		
		return false;
		
	});        
	
	//輪播設定停止
	$('#slidershow').hover(
		
		function() {
			clearInterval(run);
		}, 
		function() {
			run = setInterval('rotate()', speed);	
		}
	); 

	$('#slidershow li').eq(2).css({'opacity':1}).siblings().css({'opacity':0.8})



	
	


});



function rotate() {
	$('#right').click();
	}

