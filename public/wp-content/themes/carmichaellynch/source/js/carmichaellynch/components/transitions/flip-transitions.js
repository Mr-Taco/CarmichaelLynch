

//var VideoServices = require('../videoservices');
var defaultTransitions = require("./default-transitions");
var tools = require("./tools");


/**
 * Created by Pavel on 3/18/2015.
 *
 *
 * These functions MUST be BOUND to their instance's context!!!
 *
 */


module.exports.transitionIn = function (d) {
    var tl = new TimelineMax({
        onStart:this.transitionInStart,
        onComplete:this.transitionInComplete
    });
    var delay = this.$el.data('transition-delay') || 0;
    if(!window.isTablet && !window.isMobile && !window.isIE9) {

        TweenMax.set(this.$el, {
            autoAlpha:1
        });

        TweenMax.set(this.$el.parent(), {
            z:1000
        });



        var flip = TweenMax.fromTo(this.$el ,0.5, {
            immediateRender:true,
            transformPerspective:1000,
            transformOrigin:"50% 0%",
            rotationX:-90,
            ease:Power4.easeOut

        },{
            rotationX:0
        });

        tl.add(flip);

    }else{

        var fade = TweenMax.to(this.$el,0.25, {
            autoAlpha:1
        });


        var zoom = TweenMax.fromTo(this.$el ,0.75, {
            immediateRender:true,
            scaleX:0.5,
            scaleY:0.5,
            ease:Power4.easeOut

        },{
            scaleX:1,
            scaleY:1

        });

        tl.add([fade,zoom]);
    }
    tl.delay(delay);
    return tl;
};


module.exports.transitionInStart = function () {

    if(typeof this.pauseVideos === 'function') {
        this.playVideos();
    }

    defaultTransitions.transitionInStart.apply(this,arguments);
};

module.exports.transitionInComplete = function () {
    TweenMax.set(this.$el.parent(), {
        clearProps:"z"
    });

    if(typeof this.playVideos === 'function') {
        this.playVideos();
    }



    defaultTransitions.transitionInComplete.apply(this,arguments);
};

module.exports.transitionOut = defaultTransitions.transitionOut;

module.exports.transitionOutStart = defaultTransitions.transitionOutStart;

module.exports.transitionOutComplete = defaultTransitions.transitionOutComplete;

