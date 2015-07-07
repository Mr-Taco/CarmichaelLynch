


/*


 */


var Transitions = require('../transitions');



var ComponentBase = (function () {


    var ComponentBase = function (opts) {
        $.extend(this, opts);


        this.getData();
        this.hasTransitioned = false;

        this.inViewport = this.inViewport.bind(this);
        this.onScroll = this.onScroll.bind(this);


    };

    ComponentBase.prototype.getData = function () {
        if(this.$el !== undefined) this.data = this.$el.data() || {};

        //TODO
        /*
        * Something?
        *
        * */
    };


    ComponentBase.prototype.generateTransitions = function () {

        var transitionType = this.$el.data('transition-type');

        var transitions = Transitions[transitionType];
        transitions = transitions || Transitions['default'];

        for(var i in transitions) {

            var method = transitions[i];
            this[i] = method.bind(this);

        }





    };

    ComponentBase.prototype.enableAnimationScrollHandler = function () {
        if(!window.isIOS7 && this.$el.data('transition') !== undefined){

            $(window).on('scroll' , this.onScroll);
        }
    };


    ComponentBase.prototype.show = function () {
        TweenMax.set(this.$el, {autoAlpha:1});
    };

    ComponentBase.prototype.onScroll = function () {
        var transitionPadding = (window.isMobile) ? 50 : 125;
        if(this.inViewport(transitionPadding) && !this.hasTransitioned) {
            this.transitionIn();


        }



    };



    ComponentBase.prototype.inViewport = function (o) {
        var offset = o || 0;
        var elTop = this.$el.offset().top;
        var elHeight = this.$el.outerHeight();
        var scrollTop = $(window).scrollTop();
        var windowHeight = window.innerHeight;

        return elTop + offset  < scrollTop + windowHeight && elTop + elHeight > scrollTop ;

    };

    return ComponentBase;

})();

module.exports = ComponentBase;



        