/**
 * Created by Pavel on 2/18/2015.
 */




var minRatio = 16/7;
var maxRatio = 7/10;

var ScrollOver = (function() {


    var ScrollOver = function (opts) {
        $.extend(this,opts);
        var self = this;




        if (this.enableWidth === undefined) this.enableWidth = 768;


        this.initialize = function () {


            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);


        };

        this.enable = function () {

            this.showElements();

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
            $(window).off('resize' , this.onResize);
            $(window).off('orientationchange' , this.onResize);


            self.$header.attr('style', '');
            self.$content.attr('style', '');


            if(self.$pushText.length > 0) {
                console.log('does this happen?');
                self.$pushText.attr('style', '');
                self.$pushText.show();

            }

            this.showElements();



        };

        this.showElements = function () {
            var els = [this.$content, this.$header];
            if(this.$pushText.length > 0) els.push(this.$pushText);

            for(var i in els) {
                var el = els[i];
                el.show();
                this.autoAlpha(el,1);
            }



        };

        this.autoAlpha = function (el, val) {
            TweenMax.set(el,{
               autoAlpha:val
            });
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
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();


            if (scrollTop > windowHeight) {
                $('.fixed-header').addClass('faded');
            } else {
                $('.fixed-header').removeClass('faded');
            }




            var marquees = self.$header.find("[data-scroll-marquee]");
            if(marquees.length > 0) {
                TweenMax.set(marquees, {

                    y:-$(window).scrollTop()
                });
            }





        };

        this.onResize = function () {




            var width = window.innerWidth;
            var height = window.innerHeight;

            var windowRatio = width/height;

            if(windowRatio <= minRatio && windowRatio >= maxRatio) {
                self.$header.css('height', window.innerHeight);
                self.$content.css('top', window.innerHeight);
                if(self.$pushText.length > 0) {
                    self.$pushText.css('top', -window.innerHeight);
                    self.$pushText.css('height', window.innerHeight);
                }

            }else{
                self.$header.attr('style', '');
                self.$content.attr('style', '');
                if(self.$pushText.length > 0) {
                    self.$pushText.css('top', -self.$header.height());
                    self.$pushText.css('height', window.innerHeight);
                }

            }

            self.showElements();



        };

        this.destroy = function () {
            this.disable();
        };

        this.initialize();
    };

    return ScrollOver;


})(window);



module.exports.initialize = function () {

    this.$header = $("[data-fix-header]").first();
    this.$content = $("[data-push-down]").first();
    this.$pushText = this.$content.find("[data-push-text]");
    this.enableWidth = 768;

    this.scrollOver = new ScrollOver(this);


};


module.exports.destroy = function () {
    this.scrollOver.destroy();
};


