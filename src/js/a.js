+ function($){
    "use strict";
    var timeout;
    $.sidePanel = function(){
        clearTimeout(timeout);
        $(".side-panel").show();
        timeout = setTimeout(function(){
            $(".side-panel-content").addClass('side-show');
            $(".side-overlay").addClass('weui_mask_visible');
        },50);
    }
    $(document).on("tap",".side-overlay,.side-close",function(){
        $(".side-panel-content").removeClass('side-show');
        $(".side-overlay").removeClass('weui_mask_visible');
        timeout = setTimeout(function(){
            $(".side-panel").hide();
        },200);
    });
}($);
