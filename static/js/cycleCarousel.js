var CC = CC || {};

(function($){

    $.fn.cycleCarousel = function() {

        var data = arguments[0].data,
            speed = arguments[0].speed || 5000,
            animateInterval = arguments[0].animateInterval || 1000,
            maxHeight = arguments[0].maxHeight || 500,
            itemNumber = arguments[0].itemNumber || 1,
            substitute = arguments[0].substitute || 2,
            screenWidth = $('html,body').outerWidth(),


            $container = $(this[0]),

            worker = setInterval('__rotate', speed);

        __calculateWidth = function (I) {
            // var itemWidth = $('.item').eq(__nowIndex(index).now).find('img').width(),
            //     prevItemWidth = $('.item').eq(__nowIndex(index).prev).find('img').width(),
            //     shiftX = (screenWidth - itemWidth)/2;

            // return (prevItemWidth - shiftX)

            // 有可能 0 補到了後面 所以要看 0 現在的位置

            var left=0;
            for (var i=0, l=__posId(I); i<l; i++) {
                left += $('.item').eq(i).find('img').width();
                console.log($('.item').eq(i).find('img').width())
            };

            left -= (screenWidth - $('.item').eq(I).find('img').width())/2;
            console.log('置中',(screenWidth - $('.item').eq(I).find('img').width())/2)
            return -1 * left
        }

        __posId = function (I) {
            for (var i=0, l=$('.item').length; i<l; i++) {
                if($('.item').eq(i).attr('id').split('-')[1] == I) {
                    console.log('Id='+I+'的位置在'+i+'(012345)')
                    return i
                }
            };
        }

        __nowIndex = function (index) {
            // update index
            var p,n,obj;

            if(index == 0) {
                p = data.length - 1;
                n = index + 1;
            }else if(index == data.length - 1){
                p = data.length - 2;
                n = 0;
            }else{
                p = index - 1;
                n = index + 1;
            }

            obj = {
                prev: p,
                now: index,
                next: n
            };

            window.CC.I = obj;

            return obj
        }

        __substitute = function(I, i) {


            __nowIndex(I);


            if(i < middleNum) {
                for (var i = 0, l = middleNum - i; i < l; i++) {
                    $('#container').find('.item:first').before($('#container').find('.item:last')).end().animate({'left' : CC.L -1*$('.item').eq(0).find('img').width()},0,function(){});
                    // __nowIndex(i - 1);
                    console.log('點左邊')
                };
            }

            if(i > middleNum) {
                for (var i = 0, l = i - middleNum; i < l; i++) {
                    $('#container').find('.item:last').after($('#container').find('.item:first')).end().animate({'left' : CC.L + $('.item').eq(-1).find('img').width()},0,function(){});
                    // __nowIndex(i + 1);
                    console.log('點右邊')
                };

            }
            // middleNum = i;


        }

        __rotate = function () {
            $('#right').click();
        }

        __init = function () {
            // 根據一開始的 data 去抓取每一張圖的寬度
            // b = screenWidth / 2;

            // for (var i = 0 ,l = data.length; i < l; i++) {
            //     // data
            // };
            // data = [{
            //     centerPos: ,
            //     imgWidth: ,
            // }]


        }

        // DOM
        $container.append(function(){
            var html = '';

            for (var i = 0 ,l = data.length; i < l; i++) {
                html += '<div id="slide-'+ (i) +'" class="item unfocus"><a href="'+ data[i].link +'"><img height="'+ maxHeight +'" src="' + data[i].img + '" alt="' + data[i].name +'" /></a></div>';
            };

            return html
        });

        // 等 item  append
        var middleNum = parseInt($('.item').length/2);

        // event binding
        $('.item').on('click',function(){
            var itemI = $(this).index(), // 商品列第幾個 會變
                itemId = parseInt($(this).attr('id').split('-')[1]); // 商品id 不會變


            // 1. 高亮
            $(this).removeClass('unfocus').siblings().addClass("unfocus");

            // 2. update index and 補照片
            // __nowIndex(index);
            // __substitute(itemId, itemI);

            console.log('/////////')
            console.log('現在點擊Id='+CC.I)
            console.log('現在點擊Id='+itemId)
            console.log(CC.I,middleNum)

            // 3. 移動
            $container.animate({
                'left' : __calculateWidth(itemId)
            }, animateInterval,function(){

            });

            return false;

        }).eq(__nowIndex(middleNum).now).removeClass('unfocus');


        setTimeout(function(){
            CC.L = __calculateWidth(middleNum);
            $container.css({'left': CC.L + 'px'});
        },100)

        $(window).resize(function(){
            var a = CC.L + ($('html,body').outerWidth() - screenWidth)/2;
            $container.stop(true).animate({
                'left' : a
            }, animateInterval,function(){

            });
            console.log(CC.L,a)
        });

        return (function(){
            window.CC.U = {
                console: function () {
                    console.log('data='+data+',\nspeed='+speed+',\nworker='+worker+'__calculateWidth='+__calculateWidth(__nowIndex().now))
                    console.log(__nowIndex().now)
                },

                stop: function() {
                    clearInterval(worker);
                }
            };
        })()
    };

})(jQuery)

