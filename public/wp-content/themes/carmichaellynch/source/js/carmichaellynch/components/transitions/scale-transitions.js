/**
 * Created by Pavel on 3/18/2015.
 *
 *
 * These functions MUST be BOUND to their instance's context!!!
 *
 */
var defaultTransitions = require("./default-transitions");
var tools = require("./tools");

module.exports.transitionIn = function (d) {
    console.log(this, "transitionIn");
    var self = this;
    var duration = this.$el.data('transition-duration') || 1;
    var delay = this.$el.data('transition-delay') || 0;
    this.transitionInStart();

    var tl = new TimelineMax({
        onComplete:this.transitionInComplete
    });


    var alpha = TweenMax.to(this.$el, duration, {
        autoAlpha:1
    });

    var grow = TweenMax.from(this.$el, duration, {
        scaleX:0.935,
        scaleY:0.935,
        force3D:true,
        ease:Power3.easeOut
    });
    tl.delay(delay);
    tl.add([alpha,grow]);
    return tl;
};


module.exports.transitionInStart = function () {
    //console.log(this , 'transitionInStart');
    $(window).off('scroll' , this.onScroll);
    this.hasTransitioned = true;
};

module.exports.transitionInComplete = function () {
    //console.log(this , 'transitionInComplete');
};

module.exports.transitionOut = defaultTransitions.transitionOut;

module.exports.transitionOutStart = defaultTransitions.transitionOutStart;

module.exports.transitionOutComplete = defaultTransitions.transitionOutComplete;
