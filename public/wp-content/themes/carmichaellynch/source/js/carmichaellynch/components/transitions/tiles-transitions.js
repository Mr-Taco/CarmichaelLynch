

//var VideoServices = require('../videoservices');
var defaultTransitions = require("./default-transitions");


/**
 * Created by Pavel on 3/18/2015.
 *
 *
 * These functions MUST be BOUND to their instance's context!!!
 *
 */
var tools = require("./tools");

module.exports.transitionIn = function (d) {
    var tl = new TimelineMax({
        onStart:this.transitionInStart,
        onComplete:this.transitionInComplete
    });

    var tweens = [];




    this.show();
    var delay = this.$el.data('transition-delay') || 0;
    var i = this.$el.data("transition");


    var mod = i%2 === 0 ? 1 : -1;
    var modOrigin = mod > 0 ? "center top": "center bottom";
    var cardHeight = this.$el.height();

    var tweens = [];

    if(window.isTablet || window.isMobile || window.isIE9) {

        var fade =TweenMax.fromTo(this.$el,0.3, {
            autoAlpha: 0
        },{
            autoAlpha: 1
        });


        var grow = TweenMax.fromTo(this.$el,1, {
            scaleX:0.8,
            scaleY:0.8,
            ease:Power4.easOut
        },{
            scaleX:1,
            scaleY:1
        });


        tl.add([fade,grow]);



    }else{


        TweenMax.set(this.$el.parent() , {
            z:1000
        });

        var flip = TweenMax.fromTo(this.$el,2, {
            transformPerspective:1000,
            transformOrigin:modOrigin,
            rotationX:90 * mod,
            z:-cardHeight

        },{
            rotationX:0,
            force3D:true,
            ease:Power4.easeOut,
            z:0
        });

        tl.add(flip);
    }

    tl.delay(delay);
    return tl;
};


module.exports.transitionInStart = defaultTransitions.transitionInStart;

module.exports.transitionInComplete = function () {
    if(this.$el.is(':last-child')) {
        TweenMax.set(this.$el.parent(), {
            clearProps:"z"
        });
    }




    defaultTransitions.transitionInComplete.apply(this,arguments);
};

module.exports.transitionOut = defaultTransitions.transitionOut;

module.exports.transitionOutStart = defaultTransitions.transitionOutStart;

module.exports.transitionOutComplete = defaultTransitions.transitionOutComplete;

