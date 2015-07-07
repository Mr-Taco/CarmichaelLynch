/**
 * Created by Phil on 2/18/2015.
 */


var NewsPostScrollOver = (function() {

    console.log('');

    var NewsPostScrollOver = function (opts) {
        $.extend(this,opts);
        var self = this;

        if (this.enableWidth === undefined) this.enableWidth = 768;


        this.initialize = function () {
            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
        };

        this.enable = function () {
            $('.single-post .fixed-header').css({width: '100%', position: 'fixed'});
            if(window.isTablet || window.isMobile) {
                $(window).on('orientationchange' , this.onResize);
            } else {
                $(window).on('resize' , this.onResize);
            }

            if(!window.isIOS7)
                $(window).on('scroll', this.onScroll);


            this.onScroll();
            this.onResize();
        };

        this.disable = function () {

            $(document).off('scroll', this.onScroll);
            //$(window).off('resize' , this.onResize);
            $(window).off('orientationchange' , this.onResize);
            $('.single-post .fixed-header').css({width: '100%', position: 'absolute'});

            this.onResize();
        };

        this.checkMediaQuery = function (changed) {
            if (!changed.matches && !self.disabled) {
                self.disabled = true;
                self.disable();
            } else {
                self.disabled = false;
                self.enable();
            }
        };


        this.onScroll = function (e) {

        };

        this.onResize = function () {
            var headerHeight;

            setTimeout(function() {
                headerHeight = $('.single-post .sliding-header').outerHeight();
                console.log('hh: ', headerHeight);
                $('.fixed-header .detail-header').css('height', headerHeight);
            }, 150);

        };

        this.destroy = function () {
            this.disable();
        };

        this.initialize();
    };

    return NewsPostScrollOver;


})(window);


module.exports = NewsPostScrollOver;


