/**
 * Created by huipo on 17-3-10.
 */
$(function () {
    $('ul.page>li').click(function () {
        location.href=document.referrer;
    })
})
