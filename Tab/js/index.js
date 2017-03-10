/**
 * Created by huipo on 17-3-10.
 */
$(function () {
    //点击选项卡
    $('.title>li').click(function () {
        $(this).addClass('hot').siblings().removeClass('hot');
        var index = $(this).index();
        $('.con>ul').eq(index).show().siblings().hide();
    })
    var objPage={
        one:'onePage.html',
        two:'twoPage.html',
        three:'threePage.html',
        getNum:function (num) {
            if(num==this.one){
                return 0
            }else if(num==this.two){
                return 1
            }else if(num==this.three){
                return 2
            }
        }
    }
    var url = document.referrer;
    var index = url.substring(url.lastIndexOf('/') + 1);
    if (index == objPage.one) {
        call(objPage.getNum(objPage.one))
    } else if (index == objPage.two) {
        call(objPage.getNum(objPage.two))
    } else if (index == objPage.three) {
        call(objPage.getNum(objPage.three))
    }
   function call (index) {
        $($('.title>li')[index]).addClass('hot').siblings().removeClass('hot');
        $('.con>ul').eq(index).show().siblings().hide();
    }
})