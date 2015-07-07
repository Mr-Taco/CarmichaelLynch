/**
 * Created by Pavel on 3/19/2015.
 */





var loader;
var pulse;

var makePulse = function () {

    pulse = new TimelineMax();
    pulse.yoyo(true);
    pulse.repeat(-1);

    var alpha = TweenMax.fromTo(loader.find('.loading-container'),1, {alpha:1},{alpha:0.5});



    pulse.add([alpha]);

    return pulse;


};


module.exports.transitionIn = function (next) {
    loader = loader || $("[data-loader]");


    var tl = new TimelineMax({
        onComplete:function () {
            if(typeof next === 'function') next();
        }
    });

    var t1 =TweenMax.fromTo(loader,0.15, {
        autoAlpha:0

    },{
        autoAlpha:1
    });


    var t2 = TweenMax.fromTo(loader.find('.loading-container'),0.5, {
        scaleX:0.67,
        scaleY:0.67
    },{
        scaleX:1,
        scaleY:1,
        ease:Back.easeOut
    });







    tl.add([t1,t2],'-=0','normal',0.15);
};



module.exports.transitionOut = function (next) {
    loader = loader || $("[data-loader]");

    var tl = new TimelineMax({
        onComplete:function () {
            if(typeof next === 'function') next();
        }
    });
    var t1 = TweenMax.fromTo(loader,0.15, {
        autoAlpha:1

    },{
        autoAlpha:0
    });



    var t2 = TweenMax.fromTo(loader.find('.loading-container'),0.5, {
        scaleX:1,
        scaleY:1
    },{
        scaleX:0.5,
        scaleY:0.5,
        ease:Back.easeIn
    });

    tl.add([t2,t1],'-=0','normal',0.35);

};
