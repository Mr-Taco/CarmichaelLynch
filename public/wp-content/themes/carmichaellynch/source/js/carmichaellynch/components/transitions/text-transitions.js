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
    this.show();
    var texts = this.$el.find('.text-wrapper , .contenet-wrapper, [data-transition-text]');
    texts = texts.length > 0 ? texts.children() : this.$el.find("> h1,> h2,> h3,> h4,> h5,> h6,> p,> a,> span");
    console.log(texts);
    this.transitionInStart();
    var tweens = TweenMax.staggerFrom(texts, duration,{
        onComplete:this.transitionInComplete,
        opacity:0,
        y:-20,
        force3D:true,
        ease:Power4.easeOut,
        delay:delay
    }, 0.25);







    return tweens;
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
