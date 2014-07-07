var CC = CC || {};

(function($){

    $.fn.cycleCarousel = function() {

        var data = arguments[0].data,
            speed = arguments[0].speed || 5000,
            animateInterval = arguments[0].animateInterval || 1000,
            maxHeight = arguments[0].maxHeight || 500,
            itemNumber = arguments[0].itemNumber || 1,
            screenWidth = $('html,body').outerWidth(),


            $container = $(this[0]),

            worker = setInterval('__rotate', speed);

        __calculateWidth = function (index) {
            // var itemWidth = $('.item').eq(__nowIndex(index).now).find('img').width(),
            //     prevItemWidth = $('.item').eq(__nowIndex(index).prev).find('img').width(),
            //     shiftX = (screenWidth - itemWidth)/2;

            // return (prevItemWidth - shiftX)
            var left=0;
            for (var i=0, l=index; i<l; i++) {
                left += $('.item').eq(i).find('img').width();
                console.log($('.item').eq(i).find('img').width())
            };

            left -= (screenWidth - $('.item').eq(index).find('img').width())/2;

            return -1 * left
        }

        __nowIndex = function (index) {
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
                html += '<div id="slide'+ (i) +'" class="item unfocus"><a href="'+ data[i].link +'"><img height="'+ maxHeight +'" src="' + data[i].img + '" alt="' + data[i].name +'" /></a></div>';
            };

            return html
        });



        // event binding
        $('.item').on('click',function(){
            var index = $(this).index();

            if(index == CC.I.now) return false;

            // 1. 高亮
            $(this).removeClass('unfocus').siblings().addClass("unfocus");

            __nowIndex(index);
            // 2. 先移動
            $container.animate({
                'left' : __calculateWidth(index)
            }, animateInterval,function(){

                // if(index > CC.I.now){
                //     $container.find('.item:first').before($container.find('.item:last'));
                // }else{
                //     $container.find('.item:last').after($container.find('.item:first'));
                // }

            });

            return false;
        }).eq(__nowIndex(itemNumber).now).removeClass('unfocus');

        // $container.css({'margin-left': __calculateWidth(itemNumber) + 'px'});

        $(window).resize(function(){



            $container.stop(true).animate({
                'margin-left' : ($('html,body').outerWidth() - screenWidth)/2
            }, animateInterval,function(){

                // if(index > CC.I.now){
                //     $container.find('.item:first').before($container.find('.item:last'));
                // }else{
                //     $container.find('.item:last').after($container.find('.item:first'));
                // }

            });

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

