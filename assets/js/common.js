
/*!
 * common.js v1.0.0
 */

jQuery(function($) {
    $(document).ready(function(){
        new WOW().init();
        scroll_down()
    });

    function scroll_down(){
        let button = $('.pf-nav a');

        button.on('click', function(e){
            e.preventDefault()
            let scroll_to = $(this).attr('href');
            console.log(scroll_to)
            $([document.documentElement, document.body]).animate({ scrollTop: $(scroll_to).offset().top }, 300, "linear");
        });
    }

});