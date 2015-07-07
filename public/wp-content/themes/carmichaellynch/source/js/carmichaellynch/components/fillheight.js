
var element, subtract;


module.exports.onResize = function (e) {
    console.log('onResize');
    if(element !== undefined) {


        //var elementPadding = parseInt(element.css('padding-top'));
        //
        //console.log(element.outerHeight() + subtract , window.innerHeight);
        //if(element.outerHeight() + subtract < window.innerHeight);
        //    element.height(window.innerHeight - subtract);

        setTimeout(function() {
            var docHeight = $(window).height();
            var footerHeight = $('.fixed-footer').height();
            var footerTop = $('.fixed-footer').position().top + footerHeight;
            var difference = docHeight - footerTop;

            if (footerTop < docHeight) {
                $('.fixed-footer').css('margin-top', 0 + difference + 'px');
                $('article').css({paddingBottom: 70 + difference + 'px', marginBottom: -(difference) + 'px'});
            }

        }, 200);
    }



};


module.exports.init = function () {
    element = $('[data-fill-height]');
    subtract = 0;
    if(element.length > 0) {

        $("[data-minus-height]").each(function () {
            subtract += $(this).outerHeight();
        });

        $(window).on('resize' , module.exports.onResize);
        //onResize();
    }



};