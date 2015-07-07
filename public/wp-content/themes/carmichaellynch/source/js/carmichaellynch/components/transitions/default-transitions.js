/**
 * Created by Pavel on 3/18/2015.
 *
 *
 * These functions MUST be BOUND to their instance's context!!!
 *
 */



module.exports.transitionIn = function (d) {

    var self = this;
    var duration = this.$el.data('transition-duration') || 1;
    var delay = this.$el.data('transition-delay') || 0;

    this.transitionInStart();

    return TweenMax.to(this.$el, duration, {
        autoAlpha:1,
        immediateRender:true,
        delay:delay,
        onComplete: this.transitionInComplete
    });
};


module.exports.transitionInStart = function () {
    //console.log(this , 'transitionInStart');
    $(window).off('scroll' , this.onScroll);
    this.hasTransitioned = true;
};

module.exports.transitionInComplete = function () {
    //console.log(this , 'transitionInComplete');
};


module.exports.transitionOut = function (d) {
    console.log(this.$el , 'transitionOut');
    var duration = d ||0.5;
    this.transitionOutStart();
    return TweenMax.to(this.$el, duration, {
        onComplete: this.transitionOutComplete,
        autoAlpha:0
    });

};

module.exports.transitionOutStart = function () {
    console.log(this.$el , 'transitionOutStart');
    this.hasTransitioned = false;
};

module.exports.transitionOutComplete = function () {
    console.log(this.$el , 'transitionOutComplete');

};