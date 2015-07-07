/**
 * Created by Pavel on 3/18/2015.
 */

var ComponentBase = require("./components/abstract/componentbase");
var loader = require("./components/loader");

var sortComponents = function (reverse) {


    return function (c1,c2) {
        return reverse ? (c2.order - c1.order) : (c1.order - c2.order);
    };
};



var createTransition = function (components, method , delay ,next) {

    if(components.length > 0) {
        var delay = delay || 0;
        var tl = new TimelineMax({
            onComplete:function () {
                if(next !== undefined) {
                    setTimeout(function () {
                        next();
                    },delay * 1000);

                }
            }
        });
        var tweens = [];
        for(var i =0; i < components.length; i++) {
            var com = components[i];

            if(!window.isIOS7) {

                if(com.inViewport()){

                    tweens.push(com[method]());
                }else{
                    com.enableAnimationScrollHandler();
                }
            }else{
                tweens.push(com[method]());
            }

        }

        //console.log(tweens);
        tl.delay(delay);
        tl.add(tweens,'-=0' , 'normal' , 0.15);

    }else{
        if(next !== undefined) next();
    }




};

module.exports.getComponents = function () {
    var components = [];
    $("[data-transition]").each(function () {

        var $el = $(this);
        var order = $el.data('transition');
        var component = $el.data('component');

        if (component === undefined) {
            component = new ComponentBase({
                $el: $el
            });
        }

        component.generateTransitions();
        component.order = order;

        components.push(component);
    });
    return components;
};
module.exports.transitionInElements = function (next) {
    var components = this.getComponents();
    components.sort(sortComponents());

    loader.transitionOut();
    createTransition(components,'transitionIn' , 1 ,next);

};


module.exports.transitionOutElements = function (next) {
    var components = this.getComponents();
    components.sort(sortComponents(true));
    loader.transitionIn();
    createTransition(components,'transitionOut' , 0 ,next);

};


