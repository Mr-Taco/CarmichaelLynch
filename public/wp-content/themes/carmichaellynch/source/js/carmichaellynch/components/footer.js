

var Footer = (function() {

    var Footer = function (opts) {
        $.extend(this,opts);
        var self = this;

        if (this.enableWidth === undefined) this.enableWidth = 768;
        this.scrollTarget = null;


        this.initialize = function () {
            this.handleFooter();
            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
            this.scrollTarget = 300;
        };


        this.enable = function () {
            $(document).on('scroll', this.onScroll);
            $(window).on('resize', this.onResize);
        };



        this.disable = function () {



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



        this.onScroll = (function (e) {
            this.handleFooter();
        }).bind(this);



        this.onResize = (function (e) {
            this.handleFooter();

            if ((window.innerWidth === 480) || (window.innerWidth === 768) || (window.innerWidth === 1280)) {
                this.handleFooter();
            }
        }).bind(this);



        this.handleFooter = (function (e) {

        }).bind(this);


        this.showFixedFooter = function () {
            $('.fixed-footer').addClass('showing');
        };


        this.hideFixedFooter = function () {
            $('.fixed-footer').removeClass('showing');
        };


        this.padContainer = function(bool) {
            var container = $('#container article');

            if (bool) {
                container.css('padding-bottom', 200);
            } else {
                container.css('padding-bottom', 0);
            }
        };


        this.destroy = function () {
            this.disable();
        };


        this.initialize();

    };

    return Footer;

})(window);



module.exports = Footer;
