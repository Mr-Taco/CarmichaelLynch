/**
 * Created by Pavel on 3/18/2015.
 *
 *
 * These functions MUST be BOUND to their instance's context!!!
 *
 */


var defaultTransitions = require("./default-transitions");
var tools = require("./tools");


module.exports.transitionIn = function () {


    var duration = this.$el.data('transition-duration') || 1;
    var direction = this.$el.data('transition-direction');
    var delay = this.$el.data('transition-delay') || 0;
    var animation = {};
    var complete = {};





    var height = this.$el.height()/2;
    var width = this.$el.width()/2;

    switch(direction) {
        case 'top' :
            animation.y = -height;
            break;
        case 'bottom' :
            animation.y = height;
            break;

        case 'left' :
            animation.x = -width;
            break;
        case 'right' :
            animation.x = width;
            break;
    }

    animation.ease = Power4.easeOut;
    animation.force3D = true;


    TweenMax.set(this.$el, {clearProps:"autoAlpha"});


    this.transitionInStart();

    var tl = new TimelineMax({
        onComplete:this.transitionInComplete
    });

    var alpha = TweenMax.fromTo(this.$el, duration, {autoAlpha:0,immediateRender:true},{autoAlpha:1});
    var slide = TweenMax.from(this.$el, duration, animation);

    tl.delay(delay);
    tl.add([slide,alpha]);


    return tl;
};


module.exports.transitionInStart = function () {
    //console.log(this , 'transitionInStart');
    $(window).off('scroll' , this.onScroll);
    this.hasTransitioned = true;
};

module.exports.transitionInComplete = function () {
    //console.log(this , 'transitionInComplete');

    TweenMax.set(this.$el, {clearProps:"x,y"});

};


module.exports.transitionOut = defaultTransitions.transitionOut;

module.exports.transitionOutStart = defaultTransitions.transitionOutStart;

module.exports.transitionOutComplete = defaultTransitions.transitionOutComplete;
