(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by wildlife009 on 2/4/15.
 */

var global = require("./global");
var controller = require("./controller");



var App = (function () {

    var App = function (opts) {

        var options = opts || {};

        this.initialize = function (opts) {
            global.initGlobal();
            controller.initRouting();
        };







        this.initialize(options);




    };

    return App;


})();


module.exports = App;
},{"./controller":26,"./global":27}],2:[function(require,module,exports){



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



        
},{"../transitions":17}],3:[function(require,module,exports){

var ComponentBase = require('./abstract/componentbase.js');


var AccordionItem = (function () {


    var AccordionItem = function (opts) {
        $.extend(this, opts);
        this.isTablet = $("html").hasClass("tablet");

        this.initialize = function () {


            this.transitionIn = (this.isTablet) ? this.generateTabletTransition() :this.generateTransition();
            this.transition = (this.isTablet) ? this.generateTabletInteractionEffects() : this.generateInteractionEffects();
            this.initialized = false;
            this.$el.data('initialized', this.initialized);
            this.$el.data('component' , this);


            if(!window.isTablet && !window.isMobile){
                TweenMax.set(this.$el.find('.broken').parent(), {
                    transformPerspective:0,
                    z:1000
                });
            }



        };


        this.generateTabletTransition = function () {
            var self = this;
            var tl = new TimelineMax({
                onStart: function () {
                    self.initialized = true;
                    self.$el.data('initialized', self.initialized);
                    self.$el.css('z-index' , 100-self.order);
                }

            });

            var card = TweenMax.fromTo(this.$el.find(".accordion-content-image"),0.95, {
                immediateRender:true,
                autoAlpha:0
            }, {

                autoAlpha:1
            });

            var text = TweenMax.fromTo(this.$el.find(".broken"), 0.95, {
                immediateRender:true,
                autoAlpha:0
            }, {
                autoAlpha:1,
                delay:0.15
            });

            var button = this.$el.find(".broken .button");
            //TweenMax.set(button, {autoAlpha:0});

            tl.add([card , text]);

            tl.paused(true);
            return tl;
        };

        this.generateTabletInteractionEffects = function () {
            var self = this;
            var tl = new TimelineMax({
                data: this.$el,

                onStart: function () {
                    var el = this.vars.data;

                },
                onUpdate: function () {
                    var el = this.vars.data;

                    if (this.reversed() && this.progress() < 1) {
                        el.css('z-index', 1001);
                        el.find('.accordion-content-image').removeClass('fogOut');
                    } else if (!this.reversed() && this.progress() > 0) {
                        el.css('z-index', 10001);
                        el.find('.accordion-content-image').addClass('fogOut');

                    }

                }
            });
            var pop = TweenMax.fromTo(this.$el.find('.accordion-content-image'), 0.75, {
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"


            }, {
                boxShadow: "0px 0px 20px 0px rgba(0,0,0,.75)",
                ease: Power4.easeInOut
            });

            var button = TweenMax.fromTo(this.$el.find(".broken .button"), 0.75, {

                //autoAlpha:0
            }, {
                //autoAlpha:1

            });




            tl.add([pop, button]);

            tl.paused(true);

            return tl;
        };


        this.generateTransition = function () {
            var self = this;
            var tl = new TimelineMax({
                onStart: function () {
                    self.initialized = true;
                    self.$el.data('initialized', self.initialized);
                    self.$el.css('z-index' , 100-self.order);
                },
                onComplete: function () {
                    self.$el.find(".accordion-content-image").addClass("blur");
                }
            });

            var card = TweenMax.fromTo(this.$el.find(".accordion-content-image"),0.95, {
                immediateRender:true,
                transformPerspective:1000,
                y:-this.$el.height(),
                rotationX: 45,
                autoAlpha:0

            }, {
                y:0,
                rotationX:0,
                autoAlpha:1,
                ease:Back.easeOut
            });

            var text = TweenMax.fromTo(this.$el.find(".broken"), 0.95, {
                immediateRender:true,
                transformPerspective:1000,
                y:-this.$el.height(),
                rotationX: 45,
                autoAlpha:0,
                z:3
            }, {
                y:0,
                rotationX:0,
                autoAlpha:1,
                ease:Back.easeOut,
                delay:0.15,
                z:3
            });

            tl.add([card , text]);

            tl.paused(true);
            return tl;
        };

        this.generateInteractionEffects = function () {
            var self = this;
            var tl = new TimelineMax({
                data: this.$el,

                onStart: function () {
                    var el = this.vars.data;

                },
                onUpdate: function () {
                    var el = this.vars.data;

                    if (this.reversed() && this.progress() < 1) {
                        el.css('z-index', 1001);
                        el.find('.accordion-content-image').removeClass('fogOut');
                        el.find('.accordion-content-image').addClass('blur');
                        el.off('mousemove', self.onItemMove);
                    } else if (!this.reversed() && this.progress() > 0) {
                        el.css('z-index', 10001);
                        el.find('.accordion-content-image').addClass('fogOut');
                        el.find('.accordion-content-image').removeClass('blur');
                        el.on('mousemove', self.onItemMove);
                    }

                }
            });
            var pop = TweenMax.fromTo(this.$el.find('.accordion-content-image'), 0.75, {
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                transformPerspective: 1000,
                z: 0

            }, {
                boxShadow: "0px 0px 20px 0px rgba(0,0,0,.75)",
                z: 10,
                ease: Power4.easeInOut
            });

            var broken = TweenMax.fromTo(this.$el.find(".broken"), 0.75, {
                immediateRender:true,
                transformPerspective: 1000,
                z: 3
            }, {
                z: 20,
                ease: Power4.easeInOut
            });




            tl.add([pop, broken]);

            tl.paused(true);

            return tl;
        };


        this.onItemMove = (function (e) {
            var $t = this.$el;

            if(this.initialized){
                var y = e.clientY;
                var itemOffsetTop = $t.offset().top - $(document).scrollTop();
                var itemOffsetY = y - itemOffsetTop;
                var height = $t.height();

                if (itemOffsetY >= 0 && itemOffsetY <= height) {
                    var amount = (itemOffsetY / height);
                    var percent = amount * 100 + "%";

                    var rotationRange = 2.5 - (5 * amount);


                    TweenMax.set($t.find(".accordion-content-image"), {
                        rotationX:rotationRange
                    });

                    /*TweenMax.set($t.find(".accordion-content-image"), {
                     transformOrigin: "50% " + percent
                     });
                     */
                    TweenMax.set($t.find(".broken"), {
                        transformOrigin: "50% " + percent
                    });
                }
            }

        }).bind(this);

        this.initialize();


    };


    return AccordionItem;


})(window);


var Accordion = (function (_super) {

    console.log('tester: ', window.isIE9);

    __extends(Accordion, _super);
    function Accordion(el, opts) {
        Accordion.__super__.constructor.apply(this,arguments);
        this.el = el;
        this.$el = $(el);
        this.$items = this.$el.find(".accordion-item");
        this.items = [];
        this.animations = [];
        this.scrollTimer = null;
        this.shouldCenter = true;
        this.userScrolling = true;


        this.isTablet = $("html").hasClass("tablet");
        this.isIOS7 = $("html").hasClass("ios7");
        this.isIE9 = $("html").hasClass("ie9");

        $.extend(this, opts);



        if (this.enableWidth === undefined) this.enableWidth = 768;

        this.initialize = function () {

            this.initItems();
            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
            this.$el.css('visibility' , 'visible');


        };


        this.destroy = function () {
            this.$items.off('mouseenter', this.onOpen);
        };



        this.events = function (enable) {
            var self = this;
            if(!this.isTablet) {

                if (enable) {
                    this.$items.on('mouseenter', this.onOpen);


                } else {
                    this.$items.off('mouseenter', this.onOpen);

                }


            }else{
                this.$el.find('[data-accordion-wrapper-link]').on('click' , function (e) {e.preventDefault();});

                if (enable) {
                    this.$items.each(function () {
                        var $item = $(this);
                        var hammerInstance = new Hammer(this);
                        hammerInstance.on('tap', self.onOpen);
                        $item.data('hammer', hammerInstance);
                    });

                }else{
                    this.$items.each(function () {
                        var $item = $(this);
                        var hammerInstance =  $item.data('hammer');
                        hammerInstance.off('tap', self.onOpen);
                        $item.data('hammer', null);

                    });
                }

            }

            $(window).scroll(this.onScroll);
            this.onScroll(null,true);



        };

        this.onItemMove = (function (e) {
            var $t = $(e.target).closest('.accordion-item');
            if($t.data('initialized')){
                var y = e.clientY;
                var itemOffsetTop = $t.offset().top - $(document).scrollTop();
                var itemOffsetY = y - itemOffsetTop;
                var height = $t.height();

                if (itemOffsetY >= 0 && itemOffsetY <= height) {
                    var amount = (itemOffsetY / height);
                    var percent = amount * 100 + "%";

                    var rotationRange = 2.5 - (5 * amount);


                    TweenMax.set($t.find(".accordion-content-image"), {
                        rotationX:rotationRange
                    });

                    /*TweenMax.set($t.find(".accordion-content-image"), {
                        transformOrigin: "50% " + percent
                    });
                    TweenMax.set($t.find(".broken"), {
                        transformOrigin: "50% " + percent
                    });*/
                }
            }

        }).bind(this);

        this.onScroll = (function (e,all) {
            var toTransition = 0;

            for(var i in this.items) {
                var item = this.items[i];
                var itemElement = item.$el;

                var scrollBottom = $(document).scrollTop() + window.innerHeight;
                var itemOffsetTop = itemElement.offset().top + ((all) ? 0 : (window.innerHeight/5));

                if((!item.initialized && itemOffsetTop < scrollBottom) && !this.isIOS7 && !window.isIE9) {
                    console.log('not iOS7 or IE9');
                    item.transitionIn.delay(toTransition * 0.15);
                    item.transitionIn.play();
                    toTransition++;
                }else if(window.isIOS7 || window.isIE9){
                    item.transitionIn.delay(toTransition * 0.25);
                    item.transitionIn.play();
                    toTransition++;
                }

            }


        }).bind(this);


        this.checkMediaQuery = (function (changed) {
            if (!changed.matches && !this.disabled) {
                this.disabled = true;
                this.disable();
            } else {
                this.disabled = false;
                this.enable();
            }
        }).bind(this);

        this.enable = function () {
            for (var i in this.items) {
                var item = this.items[i];
                item.transition.pause(0);

                TweenMax.set(item.$el, {
                    height: 375
                });

            }

            this.events(true);

        };


        this.disable = function () {
            for (var i in this.items) {
                var item = this.items[i];
                item.transition.pause(0);
                item.transitionIn.progress(1);


                TweenMax.set(item.$el, {
                    height: 248
                });

            }

            this.events(false);
        };


        this.initItems = function () {
            var self = this;
            this.$items.each(function (i, t) {
                var $t = $(t);
                var item = new AccordionItem({
                    id: $t.attr('id')
                    , order: i
                    , $el: $t
                });
                self.items.push(item);

            });
        };


        this.toggleOpen = (function () {

        }).bind(this);


        this.openItem = function (item) {
            item.transition.play();
            item.open = true;
        };

        this.closeItem = function (item) {
            item.transition.reverse(undefined, false);

            TweenMax.to(item.$el.find(".accordion-content-image"),item.transition.duration(), {
                rotationX:0

            });
            item.open = false;
        };

        this.onOpen = (function (e) {

            var target = $(e.target).closest(".accordion-item");
            var targetId = target.attr('id');


            var self = this;



            for (var i in this.items) {
                var item = this.items[i];
                //console.log(item.id, targetId, item, item.open);
                if (targetId === item.id && item.initialized) {
                    this.openItem(item);
                } else if (item.open === true && item.initialized) {
                    this.closeItem(item);

                }

            }

        }).bind(this);


        this.onClose = (function () {

        }).bind(this);

      /*  this.calcCenter = function (item) {
            var order = item.order;
            var total = this.items.length;
            var windowHeight = window.innerHeight;
            var height = 0;
            for (var i = 1; i < total; i++) {
                if (i <= order) {
                    height += this.compressedHeight;
                    if (i === order) {
                        height += (this.expandHeight * 0.5 - windowHeight * 0.5);
                    }
                } else if (i > order) {
                    break;
                }
            }
            return height;
        };*/


        /*this.center = function () {
            for(var i in this.items) {
             var item = this.items[i];
             if(item.open) {
             var centerHeight = this.calcCenter(item);
             this.scrollToCenter(centerHeight);
             break;
             }
             }
        };*/

        /*this.scrollToCenter = function (centerHeight) {
            if (this.shouldCenter) {
                var self = this;
                TweenMax.to(window, 1.5, {
                    ease: Cubic.easeOut,
                    overwrite: "preexisting",
                    scrollTo: {
                        y: centerHeight
                    },
                    onStart: function () {
                        self.userScrolling = false;
                    },
                    onComplete: function () {
                        self.userScrolling = true;
                    }
                });
            }
        };*/


        this.initialize();


    }

    return Accordion;

})(ComponentBase);
module.exports = window.cl.Accordion = Accordion;

},{"./abstract/componentbase.js":2}],4:[function(require,module,exports){

var element, subtract;


module.exports.onResize = function (e) {
    console.log('onResize');
    if(element !== undefined) {


        //var elementPadding = parseInt(element.css('padding-top'));
        //
        //console.log(element.outerHeight() + subtract , window.innerHeight);
        //if(element.outerHeight() + subtract < window.innerHeight);
        //    element.height(window.innerHeight - subtract);

        setTimeout(function() {
            var docHeight = $(window).height();
            var footerHeight = $('.fixed-footer').height();
            var footerTop = $('.fixed-footer').position().top + footerHeight;
            var difference = docHeight - footerTop;

            if (footerTop < docHeight) {
                $('.fixed-footer').css('margin-top', 0 + difference + 'px');
                $('article').css({paddingBottom: 70 + difference + 'px', marginBottom: -(difference) + 'px'});
            }

        }, 200);
    }



};


module.exports.init = function () {
    element = $('[data-fill-height]');
    subtract = 0;
    if(element.length > 0) {

        $("[data-minus-height]").each(function () {
            subtract += $(this).outerHeight();
        });

        $(window).on('resize' , module.exports.onResize);
        //onResize();
    }



};
},{}],5:[function(require,module,exports){


var Footer = (function() {

    var Footer = function (opts) {
        $.extend(this,opts);
        var self = this;

        if (this.enableWidth === undefined) this.enableWidth = 768;
        this.scrollTarget = null;


        this.initialize = function () {
            this.handleFooter();
            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
            this.scrollTarget = 300;
        };


        this.enable = function () {
            $(document).on('scroll', this.onScroll);
            $(window).on('resize', this.onResize);
        };



        this.disable = function () {



        };



        this.checkMediaQuery = function (changed) {
            if (!changed.matches && !self.disabled) {
                self.disabled = true;
                self.disable();
            } else {
                self.disabled = false;
                self.enable();
            }
        };



        this.onScroll = (function (e) {
            this.handleFooter();
        }).bind(this);



        this.onResize = (function (e) {
            this.handleFooter();

            if ((window.innerWidth === 480) || (window.innerWidth === 768) || (window.innerWidth === 1280)) {
                this.handleFooter();
            }
        }).bind(this);



        this.handleFooter = (function (e) {

        }).bind(this);


        this.showFixedFooter = function () {
            $('.fixed-footer').addClass('showing');
        };


        this.hideFixedFooter = function () {
            $('.fixed-footer').removeClass('showing');
        };


        this.padContainer = function(bool) {
            var container = $('#container article');

            if (bool) {
                container.css('padding-bottom', 200);
            } else {
                container.css('padding-bottom', 0);
            }
        };


        this.destroy = function () {
            this.disable();
        };


        this.initialize();

    };

    return Footer;

})(window);



module.exports = Footer;

},{}],6:[function(require,module,exports){




var ComponentBase = require('./abstract/componentbase');
var VideoServices = require ('./videoservices');
var VideoPanel = require("./videopanel.js");


var Gallery = (function (_super) {


    __extends(Gallery, _super);
    function Gallery(opts) {

        Gallery.__super__.constructor.apply(this,arguments);



        this.collectData = function() {
            var data = this.$el.data();
            for(var k in data) {
                var v = data[k];
                var val = false;
                if(v === 1)
                    val = true;

                if(v > 1)
                    val = v * 1000;

                opts[k] = val;
            }
        };


        this.opts = opts || {};
        this.isTablet = $("html").hasClass("tablet");
        this.isMobile = $("html").hasClass("mobile");
        $.extend(this,opts);


        this.collectData();

        this.peek = this.opts.peek !== undefined ? this.opts.peek  : false;
        this.peek = (window.isTablet || window.isMobile) ? false : this.peek;
        this.inheritColors = false;
        this.directions = this.opts.directions !== undefined ? this.opts.directions : false;
        this.autoplay = this.opts.autoplay !== undefined ? this.opts.autoplay : null;
        this.strap = this.opts.strap !== undefined ? this.opts.strap : null;
        this.info = this.opts.info !== undefined ? this.opts.info : null;
        this.viewAll = this.opts.viewall !== undefined ? this.opts.viewall : null;


        if(this.isTablet || this.isMobile) {
            this.autoplay = null;
        }

        this.directionOpen = true;
        this.peeked = false;

        var prefix = ['-webkit-','-moz-','-o-','-ms-' , ''];

        this.$directionButtons = this.$el.find(".gallery-prev-next .direction");
        this.$blurbs = this.$directionButtons.find(".blurb");
        this.$nextBlurb = this.$directionButtons.filter("#next").find(".blurb span");
        this.$prevBlurb = this.$directionButtons.filter("#prev").find(".blurb span");
        this.$strap = this.$el.find(".gallery-info-strap");
        this.$info = this.$el.find(".gallery-info-strap .info");
        this.$viewAll = this.$el.find(".gallery-view-all");
        this.$viewAllPanel= this.$el.find('.gallery-view-all-panel');
        this.$wrapper= this.$el.find(".swiper-wrapper");
        this.$pagination = this.$el.find(".gallery-pagination");
        this.totalSlides = this.$el.find(".gallery-item").length;

        this.autoplayDisabled = false;



        this.viewAllThumbnails = [];


        var swiperOpts = {
            mode:'horizontal',
            loop:(this.totalSlides > 1) ? true : false,
            pagination:this.$pagination[0],
            createPagination:(this.totalSlides > 1) ? true : false,
            momentumBounce:(this.totalSlides > 1) ? true : false,
            useCSS3Transforms: !window.isIOS7,
            calculateHeight:true,
            paginationClickable:true,
            onSlideChangeEnd: (function (swiper) {

                VideoServices.pauseAll('vimeo');
                VideoServices.pauseAll('youtube');
                swiper.fixLoop();
                if(this.peek)
                    this.switchBlurbCopy();
                if(this.info)
                    this.switchInfoCopy();
            }).bind(this),
            onSlideChangeStart: (function (swiper) {
                /*if(this.peek)
                    this.hideBlurbs();*/
            }).bind(this),
            onSwiperCreated: (function () {

                this.$el.css('visibility', 'visible');
            }).bind(this)
        };

        if(this.autoplay !== null && this.totalSlides > 1) swiperOpts.autoplay = this.autoplay;
        this.swiper = window.swiper = new Swiper(this.$el[0],swiperOpts);

        this.$el.find("[data-gallery-panel]").each(function () {
            new VideoPanel({
                $el: $(this)
            });
        });






        this.startAutoplay = function () {
            if(this.autoplayDisabled){
                this.swiper.startAutoplay();
                this.autoplayDisabled = false;
            }

        };

        this.stopAutoplay = function () {
            if(!this.autoplayDisabled){
                this.swiper.stopAutoplay();
                this.autoplayDisabled = true;
            }
        };

        this.toggleTransition = function(on) {

            var props = (on) ? "transform,top,left" : "none";
            for(var i in prefix) {
                var fix = prefix[i];
                var valFix = (on) ? fix : "";
                this.$wrapper.css(fix+'transition-property', valFix+props);
            }



        };

        this.switchInfoCopy = function () {
            var self = this;
            var currentSlide = $(this.swiper.getSlide(this.swiper.activeIndex));
            var slideTitle = currentSlide.data('subheading');
            if(slideTitle === "") slideTitle = currentSlide.data('title');


            TweenMax.to(this.$info.parent() , 0.25 , {
                alpha:0,
                onComplete: function () {
                    self.$info.text(slideTitle);
                }
            });

            TweenMax.to(this.$info.parent() , 0.25 , {
                alpha:1,
                delay:0.25
            });


        };

        this.switchBlurbCopy = function () {
            var self = this;

            var nextSlide = $(this.swiper.getSlide(this.swiper.activeIndex)).next();
            var prevSlide = $(this.swiper.getSlide(this.swiper.activeIndex)).prev();

            var nextText =  nextSlide.data("subheading");
            if(nextText === "") nextText = nextSlide.data('title');
            var nextColor = nextSlide.find(".theme-color").css("color");
            var prevText =  prevSlide.data("subheading");
            if(prevText === "") prevText = prevSlide.data('title');
            var prevColor = prevSlide.find(".theme-color").css("color");


            if(this.inheritColors) {
                this.$directionButtons.filter("#next").css('background-color' , nextColor).find('.blurp span').css('color' , nextColor);
                this.$directionButtons.filter("#next").find('.blurb span').css('color' , nextColor);
                this.$directionButtons.filter("#prev").css('background-color' , prevColor).find('.blurp span').css('color' , prevColor);
                this.$directionButtons.filter("#prev").find('.blurb span').css('color' , prevColor);
            }


            TweenMax.to([this.$nextBlurb, this.$prevBlurb] , 0.25 , {
                alpha:0,
                onComplete: function () {
                    self.$nextBlurb.html(nextText);
                    //this.$nextBlurb.css('color',nextColor);
                    self.$prevBlurb.html(prevText);
                    //this.$prevBlurb.css('color',prevColor);
                }
            });

            TweenMax.to([this.$nextBlurb, this.$prevBlurb] , 0.25 , {
                alpha:1,
                delay:0.25
            });




        };

        this.generateBlurbAnimation = function (blurb, direction) {

            if(this['button-'+direction] === undefined) {
                var dMod = direction  === "next" ? -1 : 1;
                this['button-'+direction] = new TimelineMax();
                var origin = "100% 50%";
                if(dMod > 0) {
                    origin = "0% 50%";
                }

                var show = TweenMax.fromTo(blurb , 0.25 ,
                    {
                        autoAlpha:0

                    }
                    ,{
                        autoAlpha:1
                    });

                var foldOut = TweenMax.fromTo(blurb,0.25,
                    {

                        rotationY:90 * dMod,
                        transformOrigin:origin
                    },
                    {
                        rotationY:0
                        ,ease:Power4.easeInOut
                    }
                );

                var foldOutBlurb = TweenMax.fromTo(blurb.find(".blurb"),0.25,
                    {
                        rotationY:90 * dMod,
                        transformOrigin:origin
                    },
                    {
                        rotationY:0
                        ,ease:Power4.easeInOut
                    }
                );



                this['button-'+direction].add(show);
                this['button-'+direction].add([foldOut]);
                this['button-'+direction].add([foldOutBlurb] , "-=.15");
                this['button-'+direction].paused(true);
            }


            return this['button-'+direction];

        };

        this.showBlurb = function(blurb) {

            var direction = blurb.attr("id");

            var tl = this.generateBlurbAnimation(blurb,direction);
            tl.play();


        };

        this.hideBlurbs = function() {
            var self = this;
            this.$directionButtons.each(function () {
                var blurb = $(this);
                var direction = blurb.attr("id");
                var tl = self.generateBlurbAnimation(blurb,direction);
                tl.reverse();
            });

        };

        this.generatePeakAnimation = function (wrapperX, toWrapperX, direction) {
            var swiper = this.swiper;
            TweenMax.to(this.swiper,0.3 ,{
                onStart: this.disablePeak,
                onComplete: this.enablePeak,
                onUpdate: function () {
                    var progress =this.progress();
                    var xpos = progress * (wrapperX - toWrapperX);
                    swiper.setWrapperTranslate(wrapperX + xpos,0,0);
                }
            });

        };


        this.performPeek = function (direction) {
            var wrapperX, toWrapperX, nextIndex;
            switch(direction) {
                case "next" :
                    this.wrapperX = this.swiper.getWrapperTranslate("x");
                    toWrapperX = this.wrapperX + 80;
                    break;
                case "prev" :
                    this.wrapperX = this.swiper.getWrapperTranslate("x");
                    toWrapperX = this.wrapperX - 80;
                    break;
            }
            wrapperX = this.wrapperX;
            this.switchBlurbCopy();
            this.generatePeakAnimation(wrapperX,toWrapperX, direction);

        };

        this.over = (function (e, target) {

            if(!this.peeked) {
                this.peeked = true;
                var $t;
                if(e === undefined || e === null)
                    $t = target;
                else
                    $t = $(e.target).closest(".direction");
                var direction = $t.attr('id');
                var blurb = $t.find('.blurb');


                this.swiper.stopAutoplay();
                this.performPeek(direction);
                this.showBlurb($t);

            }

        }).bind(this);

        this.overDirection = (function (target) {
            var dMod = target.attr("id")  === "next" ? -1 : 1;
            var origin = "100% 50%";
            if(dMod > 0) origin = "0% 50%";

            if(!this.directionOpen) {
                this.directionOpen = true;
                TweenMax.fromTo(target ,0.25, {
                    transformOrigin:origin,
                    rotationY:90 * dMod
                },{
                    rotationY:0,
                    ease:Power4.easeInOut
                });
            }



        }).bind(this);
        this.outDirection = (function (e, jump) {

            if(this.directionOpen) {
                this.directionOpen = false;
                var duration = 0.25;
                if(jump)
                    duration = 0.01;
                TweenMax.to(this.$directionButtons.filter("#next"), duration, {
                    rotationY: -90,
                    ease: Power4.easeInOut
                });
                TweenMax.to(this.$directionButtons.filter("#prev"), duration, {
                    rotationY: 90,
                    ease: Power4.easeInOut
                });


            }

            if(!this.autoplayDisabled)
                this.swiper.startAutoplay();


        }).bind(this);

        this.out = (function (e) {


            if(this.peek)
                this.hideBlurbs();

            if(!this.autoplayDisabled)
                this.swiper.startAutoplay();

            this.swiper.swipeTo(this.swiper.activeIndex-1);


            this.peeked = false;
        }).bind(this);


        this.swipeNext = (function () {
            this.swiper.swipeNext();
        }).bind(this);

        this.swipePrev = (function () {
            this.swiper.swipePrev();
        }).bind(this);


        this.startDrag = (function () {
            this.dragging = true;

        }).bind(this);

        this.stopDrag = (function () {
            this.dragging = false;

        }).bind(this);

        this.detectMousePostion = (function(e) {
            if(!this.dragging) {
                var x = e.clientX;
                var galleryWidth = this.$el.width();
                var leftBound = this.$el.offset().left;
                var rightBound = leftBound + galleryWidth;

                var threshHold = 80;
                if(leftBound + x < threshHold){
                    this.over(null, this.$directionButtons.filter("#prev"));
                }else if(x > rightBound-threshHold){
                    this.over(null, this.$directionButtons.filter("#next"));
                }else{

                    this.out();
                }


            }

            this.swiper.stopAutoplay();




        }).bind(this);

        this.detectMousePostionNoPeak = (function(e) {
            var x = e.clientX;

            var galleryWidth = this.$el.width();
            var leftBound = this.$el.offset().left;
            var rightBound = leftBound + galleryWidth;


            var threshHold = 60;
            if(x - leftBound < threshHold){
                this.overDirection(this.$directionButtons.filter("#prev"));
            }else if(x > rightBound-threshHold){
                this.overDirection(this.$directionButtons.filter("#next"));
            }else{
                this.outDirection();
            }
            this.swiper.stopAutoplay();



        }).bind(this);

        this.enablePeak = (function () {


            this.toggleTransition(true);
            //this.$directionButtons.on('mouseenter' , this.over);

            this.$el.on('mousemove', this.detectMousePostion);
            this.$el.on('mouseleave', this.out);



        }).bind(this);

        this.disablePeak = (function () {

            this.toggleTransition(false);
            //this.$directionButtons.off('mouseenter' , this.over);
            this.$el.off('mousemove', this.detectMousePostion);
            this.$el.off('mouseleave', this.out);

        }).bind(this);


        this.adjustForStrap = (function () {
            var self = this;

            $(this.swiper.slides).each(function () {
                var slide = $(this);
                var height = slide.parent().height();

                var newHeight = height - self.$strap.height();
                slide.find('.video-container').height(newHeight);
            });
        }).bind(this);

        if(this.peek) {
            this.switchBlurbCopy();
            this.enablePeak();
            this.$blurbs.show();
            this.peeked = false;
            this.out();
            //this.$directionButtons.on('mouseleave' , this.out);
            //$(window).mouseout(this.out);

        }

        if(this.directions) {
            this.outDirection(null, true);
            TweenMax.set(this.$directionButtons, {autoAlpha:1});
            this.$directionButtons.show();
            this.$directionButtons.filter("#next").on('click' , this.swipeNext);
            this.$directionButtons.filter("#prev").on('click' , this.swipePrev);


            if(!this.peek) {
                this.$el.on('mousemove', this.detectMousePostionNoPeak);
                this.$el.on('mouseleave', this.outDirection);
            }

        }

        this.$el.on('mousedown' , this.startDrag);
        this.$el.on('mouseup' , this.stopDrag);

        if(this.strap) {
            this.$strap.css('background-color','rgba(37,37,37,1)');
            this.adjustForStrap();
            $(window).resize(this.adjustForStrap);
        }

        if(this.info){
            TweenMax.set(this.$info, {autoAlpha:1});
            this.switchInfoCopy();

        }



        this.makeThumbActive = function (slide) {

        };



        this.generateThumbnailItem = function (slide) {
            var category = "category-work";
            var matches = /category-[\w]+/i.exec(slide.attr('class'));
            if(matches !== undefined && matches !== null)
                if(matches[0] !== undefined)
                    category = matches[0];



            var header = slide.data('heading');
            var subheader = slide.data('subheading');

            if(subheader === "") subheader = slide.data('title');


            var id = slide.attr('id');
            var index = slide.data('index');
            var image = slide.find(".image").css("background-image");
            image = image.split(",");
            image = image[image.length-1];

            var $thumb = $("<div />");
            $thumb.addClass("gallery-thumb col-sm-3");
            $thumb.addClass(category);
            $thumb.attr('id', id);
            $thumb.data('index', index);
            var $picture = $("<div />");
            $picture.addClass("thumb-image");
            $picture.css("background-image",image);
            var $info = $("<div />");
            $info.addClass("thumb-info");
            $info.append($("<span />").text(header));
            $info.append($("<span />").text(subheader).addClass("title"));
            $thumb.append($picture,$info);
            return $thumb;
        };


        this.addViewAllItems = function () {
            var slides = this.swiper.slides;
            var container = this.$viewAllPanel.find('.row');
            for(var i in slides) {
                var slide = $(slides[i]);
                if(!slide.hasClass("swiper-slide-duplicate")){
                    var $slide = this.generateThumbnailItem(slide);
                    container.append($slide);
                    this.viewAllThumbnails.push($slide);
                }
            }
        };

        this.showAll = (function () {
            this.disablePeak();
            this.toggleTransition(true);
            this.viewAllEvents(true);
            this.swiper.stopAutoplay();
            TweenMax.to(this.$viewAllPanel, 0.5 , {
                autoAlpha:1
            });
        }).bind(this);

        this.hideAll = (function (e) {
            if(e) {
                e.stopPropagation();
            }
            if(!this.autoplayDisabled)
                this.swiper.startAutoplay();

            if(this.peek)
                this.enablePeak();
            TweenMax.to(this.$viewAllPanel, 0.5 , {
                autoAlpha:0
            });
        }).bind(this);

        this.viewAllEvents = function (enable) {
            for(var i in this.viewAllThumbnails) {
                var $item = this.viewAllThumbnails[i];

                if(enable) {
                    $item.on('click' , this.onViewAllItemClick);
                }else{
                    $item.off('click' , this.onViewAllItemClick);
                }
            }
        };

        this.onViewAllItemClick = (function (e) {

            var item = $(e.target).closest(".gallery-thumb");
            var itemIndex = item.data('index');


            this.swiper.swipeTo(itemIndex);
            var toSlide = $(this.swiper.activeSlide());
            this.hideAll();

            //Play on click?
            /*var videoContainer = toSlide.find('.video-container');
            if(videoContainer.length > 0) {
                toSlide.find('.play-icon').trigger('click');
            }*/



        }).bind(this);

        if(this.viewAll){
            this.addViewAllItems();
            this.makeThumbActive(this.swiper.activeSlide);
            TweenMax.set(this.$viewAll, {autoAlpha:1});

            this.$viewAll.on('click' , this.showAll);
            this.$viewAllPanel.on('click' , this.hideAll);
            this.$viewAllPanel.find(".close").on('click' , this.hideAll);
        }



        this.$el.data('component' , this);



        this.pauseVideos = function () {
            VideoServices.pauseAll();
        };

        this.playVideos = function () {
            VideoServices.playAll();
        };

    }

    return Gallery;

})(ComponentBase);
module.exports.Gallery = Gallery;



module.exports.startAllGalleries = function () {
    var galleries = window.cl.galleries;
    for(var i in galleries) {
        var gallery = galleries[i];
        gallery.startAutoplay();
    }
};


module.exports.stopAllGalleries = function () {
    var galleries = window.cl.galleries;
    for(var i in galleries) {
        var gallery = galleries[i];
        gallery.stopAutoplay();
    }
};
},{"./abstract/componentbase":2,"./videopanel.js":23,"./videoservices":25}],7:[function(require,module,exports){

var ComponentBase = require('./abstract/componentbase.js');

var Header = (function (_super) {
    //__extends(Header, _super);
    function Header(opts) {
        //Header.__super__.constructor.apply(this,arguments);
        this.opts = opts || {};

        $.extend(this, opts);


        this.$button = $(this.opts.button);
        this.$overlay = $(this.opts.overlay);
        this.$close = this.$overlay.find("#close-nav");

        this.$navItems = this.$overlay.find(".nav-item");
        this.$affectedButtons = $(this.affectedClass);
        this.$filterButton = $(this.filterButton);
        this.$filterMenu = $(this.filterMenu);
        this.$filterMenu.show();
        this.$filterItems = this.$filterMenu.find("li");
        this.$closeFilter = this.$filterMenu.find("#close-filter");
        this.navOpen = false;
        this.filterOpen = false;
        this.isTouchDevice = $("html").hasClass('mobile') || $("html").hasClass("tablet") ? true : false;
        this.isMobile = $("html").hasClass("mobile");
        this.activeClass = this.activeClass.split(".").join("");

        this.initialize = function () {
            this.bindButtonEvents();
        };

        this.bindButtonEvents = function () {
            var self = this;
            if(!this.isTouchDevice) {
                this.$button.on("click" , this.handleNav);
                this.$close.on("click" , this.handleNav);
                this.$navItems.find('a').on("click" , this.handleNav);
                this.$affectedButtons.on("mouseenter" , this.handleAffectedButtons);
                this.$affectedButtons.on("mouseleave" , this.handleAffectedButtons);
                //this.$filterButton.on("click" , this.handleFilterButton);
                this.$filterButton.on("mouseenter" , this.handleFilterButton);
                //this.$filterButton.on("mouseleave" , this.handleFilterButton);
                //this.$filterMenu.on("mouseenter" , this.handleFilterButton);
                this.$filterMenu.on("mouseleave" , this.handleFilterButton);
                this.$closeFilter.on("click" , this.handleFilterButton);
                this.$overlay.on("click" , this.handleOverlay);
                this.$closeFilter.hide();

            }else{
                this.$button.on("touchend" , this.handleNav);
                this.$close.on("touchend" , this.handleNav);
                this.$filterButton.on("touchend" , this.handleFilterButton);
                this.$closeFilter.on("touchend" , this.handleFilterButton);

                var ovrlyHmr = new Hammer(this.$overlay[0]);
                ovrlyHmr.on("tap" , this.handleOverlay);

                this.$navItems.each(function () {
                    var itemHmr = new Hammer($(this).find('a')[0]);
                    itemHmr.on('tap' , self.handleNav);


                });


            }


        };

        this.createFilterAnimation = function () {
            var tl = new TimelineMax();

            var fadeIn, flip;

            if (window.isIE9) {

                fadeIn = TweenMax.fromTo(this.$filterMenu,0.05, {
                    autoAlpha:0,
                    display: 'none',
                    zIndex: -500
                },{
                    autoAlpha:1,
                    display: 'block',
                    zIndex: 500
                });

                flip = TweenMax.fromTo(this.$filterMenu, 0.25, {
                    alpha: 0,
                    display: "none"
                },{
                    alpha: 1,
                    display: "block",
                    ease:Power4.easeInOut
                });


            } else {

                fadeIn = TweenMax.fromTo(this.$filterMenu,0.05, {
                    autoAlpha:0
                },{
                    autoAlpha:1
                });

                flip = TweenMax.fromTo(this.$filterMenu, 0.75, {
                    transformOrigin:"50% 0%"
                    ,rotationX:90
                    //,z:150
                    //,alpha: 0
                },{
                    rotationX:0
                    //,z:51
                    //,alpha: 1
                    ,ease:Power4.easeInOut
                });

            }


            var closeButton = TweenMax.fromTo(this.$closeFilter,0.5, {
                transformOrigin:"100% 100%"
                ,z:0
            },{
                z:1
                ,onStart: function () {
                    TweenMax.set(this.$closeFilter, {opacity:1});
                }
                ,onReverseComplete: function () {
                    TweenMax.set(this.$closeFilter, {opacity:0});
                }
            });

            var header = TweenMax.fromTo($('header'),0.1, {
                z:500
            }, {
                z: 50
            });

            var list = TweenMax.staggerFromTo(this.$filterItems, 0.45 , {
                opacity:0
                ,y:-20
            },{
                opacity:1
                ,y:0
                ,ease:Power4.easeOut
            }
            ,0.075);

            tl.add([fadeIn,flip,closeButton, header]);
            tl.add(list);
            //tl.add();
            tl.paused(true);
            return tl;



        };

        this.createNavAnimation = function () {
            var tl = new TimelineMax();
            var fadeInOverlay = TweenMax.fromTo(this.$overlay, 0.25 ,{
                autoAlpha:0
            },{
                autoAlpha:1
            });
            var close = TweenMax.fromTo(this.$close, 0.25, {
                    transformOrigin:"100% 0",
                    rotationY:90
                },{
                    rotationY:0
                    ,delay:0.2
                });
            var button = TweenMax.fromTo(this.$button, 0.25, {
                    transformOrigin:"100% 0",
                    rotationY:0,
                    z:500
                },{
                    rotationY:-90,
                    z: 0
                });
            var list = TweenMax.staggerFromTo(this.$navItems, 0.45 ,
                {
                    y:-40,
                    z:0,
                    autoAlpha:0
                },{
                    y:0,
                    z:500,
                    autoAlpha:1,
                    ease:Power4.easeOut
                },
                0.075);
            tl.add([fadeInOverlay,button,close]);
            tl.add(list);
            tl.paused(true);
            return tl;
        };

        this.navAnimation = this.createNavAnimation();
        this.filterMenuAnimation = this.createFilterAnimation();


        this.closeNav = function () {
            this.navAnimation.timeScale(2);
            this.navAnimation.reverse();
        };

        this.openNav =  function () {
            this.navAnimation.timeScale(1);

            if(this.filterOpen) {
                this.handleFilterButton();
                var that = this;
                setTimeout(function() {
                    that.navAnimation.play();
                }, 1000);
            }
            else {
                this.navAnimation.play();
            }
        };

        this.hideNavBtn = function () {
            this.$button.addClass("hiding");
        };

        this.showNavBtn = function () {
            this.$button.removeClass("hiding");
        };

        this.closeFilter = function () {
            this.filterMenuAnimation.timeScale(2);
            this.filterMenuAnimation.reverse(0);
        };

        this.openFilter =  function () {
            this.filterMenuAnimation.timeScale(1);
            this.filterMenuAnimation.play(0);

        };

        this.hideFilterBtn = function () {
            this.$filterButton.addClass("hiding");
        };

        this.showFilterBtn = function () {
            this.$filterButton.removeClass("hiding");
        };

        this.handleFilterButton = (function (e) {
            console.log('handleFilterButtons');
            //if (e !== undefined) {
            //    e.stopPropagation();
            //}

            if(this.filterOpen) {
                console.log('filter was open');
                this.filterOpen = false;
                this.closeFilter();
            }else{
                console.log('filter was closed');
                this.filterOpen = true;
                this.openFilter();
            }

        }).bind(this);

        this.handleAffectedButtons = (function (e) {
            var $t = $(e.target).closest(this.affectedClass);
            $t.toggleClass(this.activeClass);

        }).bind(this);

        this.handleNav = (function (e) {
            var $target = $(e.target);

            if (window.isIE9) {
                e.stopPropagation();
            }

            if (!window.isIE9) {
                if ($target.is("a")) {
                    var href = $target.attr('href');
                    var path = URI(href).path();
                    page(path);
                }
            }



            if(this.navOpen) {
                this.navOpen = false;
                this.closeNav();
                //this.showFilterBtn();
            }else{
                this.navOpen = true;
                this.openNav();
                //this.hideFilterBtn();
            }

        }).bind(this);


        this.handleOverlay = (function (e) {
            if (this.navOpen) {
                this.navOpen = false;
                this.closeNav();
                this.showFilterBtn();
            } else if (this.filterOpen) {
                this.filterOpen = false;
                this.closeFilter();
                this.showNavBtn();
            } else {
                return false;
            }
        }).bind(this);


        this.initialize();


    }

    return Header;


})(/*ComponentBase*/);



module.exports = Header;

},{"./abstract/componentbase.js":2}],8:[function(require,module,exports){


var ComponentBase = require('./abstract/componentbase.js');

var LinksList = (function (_super) {
    __extends(LinksList, _super);
    function LinksList(el, opts) {
        LinksList.__super__.constructor.apply(this,arguments);
        console.log('linklist!!!!!');
        this.el = el;
        this.$el = $(el);
        this.$items = this.$el.find(".link-item");
        this.items = [];
        this.animations = [];
        this.scrollTimer = null;
        this.shouldCenter = true;
        this.userScrolling = true;
        this.extendHeight = 0;
        $.extend(this, opts);
        this.transitionInComplete = this.transitionInComplete || function () {};
        if(this.disableWidth === undefined) this.disableWidth = 1280;

        this.initialize = function () {
            this.initItems();

            var mq = window.matchMedia('(max-width: '+this.disableWidth+'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
            this.$el.data('component' , this);
        };

        this.events = function (enable) {
            if (enable) {
                this.$items.on('click' , this.open);
            } else {
                this.$items.off('click' , this.open);
                $('.linksList-desktop li.link-item.inactive').on('click', this.flipIn);
            }
        };


        //window.onresize = (function () {
        //  this.initItems();
        //}).bind(this);


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

        this.scrollTo = function(top) {
            console.log('scrolling to: ', top);
            $("html , body").animate({
                scrollTop: top
            }, 500);
        };

        this.generateAnimation = function ($item) {
            console.log('generating');
            var self = this;
            var tl = new TimelineMax();
            var height = TweenMax.fromTo($item, 0.5, {
                height: 37
            },{
                height: ($item.find(".content").height()) + 75
                ,ease:Cubic.easeInOut
            });

            tl.add([height]);
            tl.paused(true);

            return tl;
        };

        this.initItems = function() {
          var self = this;
          this.$items.each(function (i,t) {
              var $t = $(t);
              self.items.push({
                  id: $t.attr('id')
                  ,height: ($t.find(".content").height())
                  ,order:i
                  ,$el: $t
                  ,transition: self.generateAnimation($t)
                  ,top: $t.offset().top - 135
              });
          });
        };

        this.open = (function (e) {
            var target = $(e.target).closest(".link-item");
            var targetId = target.attr('id');
            var self = this;
            var top = 0;
            console.log('this.open');

            for(var i in this.items) {
                var item = this.items[i];

                if(targetId === item.id) {
                    if (item.open) {
                        item.transition.reverse();
                        item.open = false;
                        item.$el.removeClass('open');
                    } else {
                        item.transition.play();
                        item.open = true;
                        item.$el.addClass('open');
                        top = item.top;
                        this.scrollTo(top);
                    }
                } else {
                    item.transition.reverse();
                    item.open = false;
                    item.$el.removeClass('open');
                }
            }
        }).bind(this);


        this.flipIn = (function (e) {
            var index = $(e.target).data('index');
            $('ul.linksList-desktop li.active').removeClass('active').addClass('inactive');
            $(e.target).addClass('active');

            TweenMax.to($('ul.linksList li.active'), 0.75, {
                y: 100,
                z: -20,
                alpha: 0,
                rotationX: -90,
                ease:Cubic.easeInOut,
                onComplete: function() {
                    TweenMax.set($('ul.linksList li.active'), {
                        rotationX: 90,
                        y: -100
                    });

                    $('ul.linksList li.active').removeClass('active').addClass('inactive');
                }
            });

            TweenMax.to($('ul.linksList li.link-item').eq(index), 0.75, {
                delay: 0.1,
                y: 0,
                z: 0,
                alpha: 1,
                rotationX: 0,
                ease:Cubic.easeInOut,
                onComplete: function() {
                    $('ul.linksList li.link-item').eq(index).removeClass('inactive').addClass('active');
                }
            });

        }).bind(this);

        this.initialize();
    }

    return LinksList;

})(ComponentBase);
module.exports = LinksList;
},{"./abstract/componentbase.js":2}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
/**
 * Created by Phil on 2/18/2015.
 */


var NewsPostScrollOver = (function() {

    console.log('');

    var NewsPostScrollOver = function (opts) {
        $.extend(this,opts);
        var self = this;

        if (this.enableWidth === undefined) this.enableWidth = 768;


        this.initialize = function () {
            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
        };

        this.enable = function () {
            $('.single-post .fixed-header').css({width: '100%', position: 'fixed'});
            if(window.isTablet || window.isMobile) {
                $(window).on('orientationchange' , this.onResize);
            } else {
                $(window).on('resize' , this.onResize);
            }

            if(!window.isIOS7)
                $(window).on('scroll', this.onScroll);


            this.onScroll();
            this.onResize();
        };

        this.disable = function () {

            $(document).off('scroll', this.onScroll);
            //$(window).off('resize' , this.onResize);
            $(window).off('orientationchange' , this.onResize);
            $('.single-post .fixed-header').css({width: '100%', position: 'absolute'});

            this.onResize();
        };

        this.checkMediaQuery = function (changed) {
            if (!changed.matches && !self.disabled) {
                self.disabled = true;
                self.disable();
            } else {
                self.disabled = false;
                self.enable();
            }
        };


        this.onScroll = function (e) {

        };

        this.onResize = function () {
            var headerHeight;

            setTimeout(function() {
                headerHeight = $('.single-post .sliding-header').outerHeight();
                console.log('hh: ', headerHeight);
                $('.fixed-header .detail-header').css('height', headerHeight);
            }, 150);

        };

        this.destroy = function () {
            this.disable();
        };

        this.initialize();
    };

    return NewsPostScrollOver;


})(window);


module.exports = NewsPostScrollOver;



},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */




var minRatio = 16/7;
var maxRatio = 7/10;

var ScrollOver = (function() {


    var ScrollOver = function (opts) {
        $.extend(this,opts);
        var self = this;




        if (this.enableWidth === undefined) this.enableWidth = 768;


        this.initialize = function () {


            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);


        };

        this.enable = function () {

            this.showElements();

            if(window.isTablet || window.isMobile) {

                $(window).on('orientationchange' , this.onResize);

            } else {
                $(window).on('resize' , this.onResize);
            }
            if(!window.isIOS7)
                $(window).on('scroll', this.onScroll);







            this.onScroll();
            this.onResize();
        };

        this.disable = function () {


            $(document).off('scroll', this.onScroll);
            $(window).off('resize' , this.onResize);
            $(window).off('orientationchange' , this.onResize);


            self.$header.attr('style', '');
            self.$content.attr('style', '');


            if(self.$pushText.length > 0) {
                console.log('does this happen?');
                self.$pushText.attr('style', '');
                self.$pushText.show();

            }

            this.showElements();



        };

        this.showElements = function () {
            var els = [this.$content, this.$header];
            if(this.$pushText.length > 0) els.push(this.$pushText);

            for(var i in els) {
                var el = els[i];
                el.show();
                this.autoAlpha(el,1);
            }



        };

        this.autoAlpha = function (el, val) {
            TweenMax.set(el,{
               autoAlpha:val
            });
        };



        this.checkMediaQuery = function (changed) {
            if (!changed.matches && !self.disabled) {
                self.disabled = true;
                self.disable();
            } else {
                self.disabled = false;
                self.enable();
            }
        };


        this.onScroll = function (e) {
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();


            if (scrollTop > windowHeight) {
                $('.fixed-header').addClass('faded');
            } else {
                $('.fixed-header').removeClass('faded');
            }




            var marquees = self.$header.find("[data-scroll-marquee]");
            if(marquees.length > 0) {
                TweenMax.set(marquees, {

                    y:-$(window).scrollTop()
                });
            }





        };

        this.onResize = function () {




            var width = window.innerWidth;
            var height = window.innerHeight;

            var windowRatio = width/height;

            if(windowRatio <= minRatio && windowRatio >= maxRatio) {
                self.$header.css('height', window.innerHeight);
                self.$content.css('top', window.innerHeight);
                if(self.$pushText.length > 0) {
                    self.$pushText.css('top', -window.innerHeight);
                    self.$pushText.css('height', window.innerHeight);
                }

            }else{
                self.$header.attr('style', '');
                self.$content.attr('style', '');
                if(self.$pushText.length > 0) {
                    self.$pushText.css('top', -self.$header.height());
                    self.$pushText.css('height', window.innerHeight);
                }

            }

            self.showElements();



        };

        this.destroy = function () {
            this.disable();
        };

        this.initialize();
    };

    return ScrollOver;


})(window);



module.exports.initialize = function () {

    this.$header = $("[data-fix-header]").first();
    this.$content = $("[data-push-down]").first();
    this.$pushText = this.$content.find("[data-push-text]");
    this.enableWidth = 768;

    this.scrollOver = new ScrollOver(this);


};


module.exports.destroy = function () {
    this.scrollOver.destroy();
};



},{}],13:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */

var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };


var ComponentBase = require('./abstract/componentbase.js');




var Tiles = (function(_super) {

    __extends(Tiles, _super);
    function Tiles(opts) {
        Tiles.__super__.constructor.apply(this,arguments);

        $.extend(this,opts);


        if(this.$el.length === 0)
            return error("No Element");
        else if(this.$el === undefined)
            return error("No $el property has been passed in the options");

        function error(msg) {
            console.error(msg);
            return;
        }

        this.initialize = function () {
            this.$el.data('component' , this);
        };





        this.$el.show();
        this.$tiles = this.$el.find(".tile");

        this.initialize();
    }

    return Tiles;


})(ComponentBase);


module.exports = Tiles;
},{"./abstract/componentbase.js":2}],14:[function(require,module,exports){
/**
 * Created by Pavel on 3/13/2015.
 */


var universalEvent = ['hitType','eventCategory' , 'eventAction','eventLabel'];

var onClickTrack = function (e) {
    e.stopPropagation();
    var _gaq = window._gaq;
    var ga = window.ga;
    var tag = $(e.target).closest("[data-ga]");
    var tagData = tag.data('ga');
    if(_gaq !== undefined){

        console.log("Tracking - ", tagData);
        _gaq.push(tagData);
    }else if(ga !== undefined) {
        tagData.shift();
        tagData.unshift('event');
        var tagDataObj = {};
        for(var i in universalEvent) {
            tagDataObj[universalEvent[i]] = tagData[i];
        }

        ga('send', tagDataObj);

    }

};


module.exports.customEvents = function () {

    $("[data-ga]").on('click' , onClickTrack);

};
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){


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


},{"./default-transitions":15,"./tools":22}],17:[function(require,module,exports){


module.exports = {
    "default" : require('./default-transitions'),
    "flip" : require('./flip-transitions'),
    "scale" : require('./scale-transitions'),
    "tiles" : require('./tiles-transitions'),
    "text" : require('./text-transitions'),
    "slide" : require('./slide-transitions')



};
},{"./default-transitions":15,"./flip-transitions":16,"./scale-transitions":18,"./slide-transitions":19,"./text-transitions":20,"./tiles-transitions":21}],18:[function(require,module,exports){
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

},{"./default-transitions":15,"./tools":22}],19:[function(require,module,exports){
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

},{"./default-transitions":15,"./tools":22}],20:[function(require,module,exports){
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

},{"./default-transitions":15,"./tools":22}],21:[function(require,module,exports){


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


},{"./default-transitions":15,"./tools":22}],22:[function(require,module,exports){
/**
 * Created by Pavel on 3/20/2015.
 */
module.exports.randRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.applyExistingTransforms = function(el, animation) {



};


module.exports.directions = [
    'left',
    'right',
    'top',
    'bottom'
];

},{}],23:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */



var ComponentBase = require('./abstract/componentbase.js');




var VideoPanel = (function(_super) {

    __extends(VideoPanel, _super);
    function VideoPanel(opts) {
        VideoPanel.__super__.constructor.apply(this,arguments);
        $.extend(this,opts);

        this.videoLoaded = false;
        this.id = Math.round(Math.random()*10000);
        this.type = "autoplay";
        if(this.$el === undefined)
            if(this.$el.length === 0)
                return error("No Video Element");
        else
            return error("No $el property has been passed in the options");

        function error(msg) {
            console.error(msg);
            return;
        }


        this.isMobile = $('html').hasClass("mobile");
        this.isTablet = $('html').hasClass("tablet");


        this.initialize = function () {
            if(this.detectVideo())
                this.deviceDetection();


            this.$el.data('component' , this);


        };

        this.initVideo = function () {

            this.video = this.$video.find('video')[0];


            if(this.video.readyState > 0) {
                this.videoMetadata();
            }else{
                this.video.addEventListener('loadeddata' , this.videoMetadata);
                this.video.addEventListener('loadedmetadata' , this.videoMetadata);
            }



            window.cl.players[this.id] = this;


        };

        this.videoMetadata = (function (e) {
            this.video.removeEventListener('loadeddata' , this.videoMetadata);
            this.video.removeEventListener('loadedmetadata' , this.videoMetadata);
            if(this.videoLoaded === false) {
                this.videoLoaded = true;
                this.$image.hide();
                this.initVideoRegistration();
            }


        }).bind(this);


        this.initVideoRegistration = function () {

            this.videoRatio = this.video.videoWidth/this.video.videoHeight;
            $(window).resize(this.resizeVideo);
            this.resizeVideo();
        };

        this.resizeVideo = (function () {


            var containerWidth = this.$video.width();
            var containerHeight = this.$video.height();

            var containerRatio = containerWidth/containerHeight;

            if(containerRatio > this.videoRatio) {
                this.video.style.width = "100%";
                this.video.style.height = "auto";
            }else{
                this.video.style.width = "auto";
                this.video.style.height = "100%";
            }








        }).bind(this);

        this.detectVideo = function () {


            if(this.$video.find('video').length > 0)
                return true;
            else
                return this.removeVideo();


        };

        this.deviceDetection = function () {
            if(this.isMobile || this.isTablet) {
                this.removeVideo();
            }else{
                this.initVideo();
            }
        };

        this.removeVideo = function () {
            this.$video.remove();
            this.$image.show();
            return false;
        };


        this.pause = this.stop = function () {
            if(this.video !== undefined) {
                this.video.pause();
            }

        };

        this.play = function () {
            if(this.video !== undefined) {
                this.video.play();
            }

        };

        this.$video = this.$el.find('[data-panel-video]');
        this.$image = this.$el.find('[data-panel-image]');


        this.initialize();
    }

    return VideoPanel;


})(ComponentBase);


module.exports = VideoPanel;
},{"./abstract/componentbase.js":2}],24:[function(require,module,exports){
/**
 * Created by Pavel on 3/8/2015.
 */

var videoservice = require('./videoservices');
var ComponentBase = require('./abstract/componentbase.js');

var VideoComponent = (function(_super) {

    __extends(VideoComponent, _super);
    function VideoComponent(el,opts) {
        this.$el = $(el);
        VideoComponent.__super__.constructor.apply(this,arguments);



        this.id = this.$el.attr('id');
        this.player = null;
        this.playerActive = false;


        $.extend(this,opts);

        var self = this;


        this.isMobile = $('html').hasClass("mobile");
        this.isTablet = $('html').hasClass("tablet");



        this.initialize = function () {


            //this.player = $f(this.iframe);
            //this.addVimeoEvents();

            this.embedCode = this.$el.data("iframe-embed");
            this.$iframe = $('<iframe src="'+this.embedCode+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
            this.$cover = this.$el.nextAll().filter("[data-panel-image] , [data-panel-play-button]");
            this.$cover.show();

            this.iframe = this.$iframe[0];

            this.addEvents();

            this.$el.data('component' , this);






        };



        this.loadVimeoPanel = function () {


            videoservice.stopAll(null, self.id);
            if(self.playerActive === true && self.player !== null) {

                self.player.api('play');
            }else{
                self.$iframe.load(function () {

                    self.playerActive = true;
                    self.player = $f(self.iframe);

                    self.player.addEvent('ready' , function () {
                        self.player.removeEvent('ready');
                        self.player.addEvent('pause' , self.onVideoPause);
                        self.player.addEvent('play' , self.onVideoPlay);


                    });
                });
                self.$el.empty();
                self.$el.append(self.$iframe);
            }







        };

        this.unloadVimeoPanel = function () {


            self.player.removeEvent('play');
            self.player.removeEvent('pause');

            self.transitionCover(true);
            self.playerActive = false;
            self.player = null;
            self.$el.empty();


        };

        this.addEvents = function () {

            self.$cover.filter('[data-panel-play-button]').on('click' , self.onClickCover);

        };


        this.unloadPanel = function () {
            switch(self.type) {
                case "vimeo" :
                    self.unloadVimeoPanel();
                    break;
            }

        };
        this.loadPanel = function () {
            videoservice.stopAllGalleries();
            switch(self.type) {
                case "vimeo" :
                    self.loadVimeoPanel();
                    break;
            }


        };

        this.onVideoPause = function (e) {
            videoservice.startAllGalleries();
            videoservice.playAll('autoplay');
            self.transitionCover(true);

        };

        this.onVideoPlay = function (e) {

            videoservice.stopAllGalleries();
            self.transitionCover();

        };

        this.onClickCover = function (e) {



            self.$el.show();
            self.transitionCover(false, self.loadPanel);







        };

        this.transitionCover = function (fadeIn, cb) {
            var callback = cb;

            var opts = {
                scaleY:0.8,
                scaleX:0.8,
                autoAlpha:0


            };
            if(callback !== undefined) {
                opts.onComplete = function () {

                    cb();
                };
            }
            if(fadeIn) {
                opts.scaleY = 1;
                opts.scaleX = 1;
                opts.autoAlpha = 1;
            }

            TweenMax.to(self.$cover ,0.5, opts);

        };

        this.play = function () {
            switch(self.type) {
                case "vimeo" :
                    if(self.player !== null) {
                        self.player.api('play');
                    }
                    break;
            }
        };

        this.pause = function () {
            switch(self.type) {
                case "vimeo" :
                    if(self.player !== null) {
                        self.player.api('pause');
                    }
                    break;
            }
        };

        this.stop = function () {

                if(self.player !== null) {
                    self.unloadPanel();
                }

        };

        this.show = function () {

        };

        this.hide = function () {

        };


        this.destroy = function () {
            this.stop();
            this.$cover.filter('[data-panel-play-button]').off('click' , this.onClickCover);

        };



        this.initialize();
    }

    return VideoComponent;


})(ComponentBase);


module.exports = VideoComponent;
},{"./abstract/componentbase.js":2,"./videoservices":25}],25:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */

var VideoComponent = require('./videoservicecomponent.js');

module.exports.gatherVimeoPlayers = function (t) {
    var self = this;
    var $target = $('body');
    if(t !== undefined){
        $target = $(t);
    }
    $target.find("[data-vimeo]").each(function () {
        var player = new VideoComponent(this, {
            type: "vimeo"
        });
        window.cl.players[$(this).attr('id')] = player;
    });


};


var execute = function (type, id, cb) {
    var players = window.cl.players;
    for (var i in players) {
        var player = players[i];
        if ((player.type === type || type === undefined || type === null) && (player.id !== id || id === undefined || id === null)) {
            if (cb === "stop") {
                if (player.playerActive === true)
                    player[cb]();
            } else {

                player[cb]();
            }


        }

    }
};



module.exports.startAllGalleries = function () {
    var galleries = window.cl.galleries;
    for(var i in galleries) {
        var gallery = galleries[i];
        gallery.startAutoplay();
    }
};


module.exports.stopAllGalleries = function () {
    var galleries = window.cl.galleries;
    for(var i in galleries) {
        var gallery = galleries[i];
        gallery.stopAutoplay();
    }
};


module.exports.pauseAll = function (type, id) {
    execute(type, id, 'pause');
};


module.exports.playAll = function (type, id) {
    execute(type, id, 'play');
};


module.exports.stopAll = function (type, id) {
    execute(type, id, 'stop');
};

},{"./videoservicecomponent.js":24}],26:[function(require,module,exports){
/**
 * Created by wildlife009 on 2/4/15.
 */

var global = require('./global');
var transitions = require('./transitions');
var fillHeight = require('./components/fillheight');

var buildNewPage = function ($content , title ,bodyId, bodyClass) {

    $("body").attr('id' , bodyId);
    $("body").attr('class' , bodyClass);

    var $currentHeader = $('[data-fix-header]');
    var $newHeader = $content.find('[data-fix-header]');
    var $currentContainer = $('#container');
    var $newContainer = $content.find("#container");
    var $currentPagination = $("#pagination");
    var $newPagination = $content.find("#pagination");

    //if($newPagination.length > 0) {
    //    if($currentPagination.length > 0) {
    //        $currentPagination.replaceWith($newPagination);
    //    }else{
    //        $("[data-fix-footer]").prepend($newPagination);
    //    }
    //}else{
    //    $currentPagination.remove();
    //}




    if($newHeader.length > 0) {
        if($currentHeader.length > 0) {
            $currentHeader.replaceWith($newHeader);
        }else{
            $("nav").after($newHeader);
        }
    }else{
        $currentHeader.remove();
    }

    $currentContainer.replaceWith($newContainer);


    $("html").find('title').text(title);

    applyPagination();
    global.initPageComponents();

};

var applyPagination = function () {
    var next = $("#next-page").parent().attr('href');
    var prev = $("#prev-page").parent().attr('href');
    var all = $("#view-all-pages").find('a').attr('href');

    $("#header-next").parent().attr('href', next);
    $("#header-prev").parent().attr('href', prev);
    $("#header-view-all").find('a').attr('href', all);


};


var pageLoaded = function (ctx, next) {

    return function (data,status) {
        var bodyPattern = /<body[\s]*id=["|']([\w-_]*)["|'][\s]*class=["|']([\w\d-_ ]*)["|']>/gi;
        var content = "";
        var title = "";
        var bodyId = "";
        var bodyClass = "";

        try{
            var html = data.responseText;

            var bodyData = bodyPattern.exec(html);

            if(bodyData) {
                bodyId = bodyData[1];
                bodyClass = bodyData[2];
            }




            var meta = "<div>" + html.replace(/^[\s\S]*<head>|<\/head>[\s\S]*$/g, '') + "</div>";
            content = "<div>" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') + "</div>";
            title = $(meta).find("title").text();

        }catch(e) {
            console.error("HTML Parse Error" , e);
        }finally{

            buildNewPage($(content) , title, bodyId, bodyClass);
            if(next !== undefined) next();
        }
    };

};



var transitionOut = function (ctx , next) {
    //console.log("transitionOut", arguments);


    if(ctx.path !== URI(window.location.href).path()) {
        transitions.transitionOutElements(next);
    }


};


var transitionIn = function (ctx, next) {
    //console.log("transitionIn", arguments);


    transitions.transitionInElements(next);

    fillHeight.onResize();


    //if(next !== undefined) next();

};



var scrollUp = function (ctx,next) {

    TweenMax.set(window ,  {
        scrollTo: {
            y:0
        }
    });

    if(next !== undefined) next();
};


var handlePageLoad = function (ctx, next) {
    console.log("handlePageLoad");

    $.ajax({
        url:ctx.path,
        progress:function (data) {
            console.log('progress', data);
        },
        complete:pageLoaded(ctx,next)
    });


};


module.exports.initRouting = function () {
    if (!window.isIE9) {
        page({});
        page('*', transitionOut, scrollUp, handlePageLoad, transitionIn);
    }
    transitionIn();

};



},{"./components/fillheight":4,"./global":27,"./transitions":28}],27:[function(require,module,exports){
/**
 * Created by wildlife009 on 2/4/15.
 */

var Header = require('./components/header');
var Footer = require('./components/footer');
var VideoPanel = require('./components/videopanel');
var Tiles = require('./components/tiles');
var Gallery = require('./components/gallery').Gallery;
var LinksList = require('./components/linksList');
var Accordion = require('./components/accordion');
var PanelButton = require('./components/panelbutton');
var VideoServices = require('./components/videoservices');
var ScrollOver = require('./components/scrollover');
var NewsPostScrollOver = require('./components/newspostscrollover');
var Tracking = require('./components/tracking');
var FillHeight = require('./components/fillheight');




var nav = function () {
    new Header({
        button: "#menu"
        ,overlay: "nav"
        ,filterMenu: "#filter-menu"
        ,filterButton: "#filter"
        ,activeClass: ".active-state"
        ,affectedClass: ".flip-button"
    });

};

var linklists = function () {
    $('.linksList').each(function () {
        new LinksList(this , {
            disableWidth:1280
        });
    });

};

var galleries = function () {

    $('[data-gallery]').each(function () {
        var gallery = new Gallery({
            $el: $(this)
        });

        window.cl.galleries.push(gallery);


    });
};

var videos = function () {
    $("[data-video-panel]").each(function () {
        new VideoPanel({
            $el: $(this)
        });
    });
};


var videoServices = function () {
    VideoServices.gatherVimeoPlayers();
};


var accordions = function () {
    $("[data-accordion]").each(function () {
        console.log('accordion' , this);
        new Accordion(this, {
            expandHeight: 400,
            compressedHeight: 375,
            enableWidth: 768
        });
    });
};



var tiles = function () {
    $("[data-tiles]").each(function () {
        new Tiles({
            $el: $(this)
        });
    });
};



var panelbuttons = function () {
    $("a.button").each(function () {
        new PanelButton({
            $el: $(this)
        });
    });
};



var foot = function () {
    new Footer({
        $el: $('.fixed-footer')
    });
};


var newspostscrollover = function () {
    new NewsPostScrollOver({
        $el: $('.category-news .fixed-footer')
    });
};





module.exports.initPageComponents = function () {
    window.cl.galleries = [];
    window.cl.players = [];
    ScrollOver.initialize();
    galleries();

    videos();

    linklists();
    accordions();
    tiles();
    panelbuttons();
    videoServices();
    Tracking.customEvents();
    FillHeight.init();

    newspostscrollover();
};


module.exports.initGlobal = function () {

    module.exports.initPageComponents();
    nav();
    foot();

};





},{"./components/accordion":3,"./components/fillheight":4,"./components/footer":5,"./components/gallery":6,"./components/header":7,"./components/linksList":8,"./components/newspostscrollover":10,"./components/panelbutton":11,"./components/scrollover":12,"./components/tiles":13,"./components/tracking":14,"./components/videopanel":23,"./components/videoservices":25}],28:[function(require,module,exports){
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



},{"./components/abstract/componentbase":2,"./components/loader":9}],29:[function(require,module,exports){


__hasProp = {}.hasOwnProperty;
__extends = function(child, parent) {
    for (var key in parent) {
        if (__hasProp.call(parent, key))
            child[key] = parent[key];
    }
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};




window.cl = {};
window.cl.players = [];
window.cl.galleries = [];

window.isMobile = $("html").hasClass("mobile");
window.isTablet = $("html").hasClass("tablet");
window.isIOS7 = $("html").hasClass("ios7");
window.isIE9 = $("html").hasClass("ie9");


var App = require("./carmichaellynch/app");

$(document).ready(function () {
    var app = new App();

});




},{"./carmichaellynch/app":1}]},{},[29]);
