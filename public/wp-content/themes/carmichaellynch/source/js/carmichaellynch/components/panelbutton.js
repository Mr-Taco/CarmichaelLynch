var PanelButton = (function (window) {

    var PanelButton = function (el, opts) {

        this.el = el;
        this.$el = this.el.$el;
        this.image = this.$el.parents(".row").find(".image-tile > div");
        this.animations = [];
        $.extend(this, opts);
        if(this.disableWidth === undefined) this.disableWidth = 768;

        this.initialize = function () {
            this.initItems();

            var mq = window.matchMedia('(min-width: '+this.disableWidth+'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
        };

        this.events = function (enable) {
            if (enable) {
                this.$el.on('mouseenter' , this.enterImage);
                this.$el.on('mouseleave' , this.leaveImage);
            } else {
            }
        };


        this.checkMediaQuery = (function (changed) {
            if(!changed.matches && !this.disabled) {
                this.disabled = true;
                this.disable();
            }else{
                this.disabled = false;
                this.enable();
            }
        }).bind(this);


        this.enable = function() {
            this.events(true);
        };

        this.disable = function() {
            this.events(false);
        };

        this.enterImage = (function() {
            this.image.addClass('hovered');
        }).bind(this);

        this.leaveImage = (function() {
            this.image.removeClass('hovered');
        }).bind(this);

        this.initItems = function() {
            var self = this;
        };

        this.initialize();
    };

    return PanelButton;

})(window);
module.exports = window.cl.PanelButton = PanelButton;