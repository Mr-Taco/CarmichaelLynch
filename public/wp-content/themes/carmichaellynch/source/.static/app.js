(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by wildlife009 on 2/4/15.
 */

var global = require("./global");



var App = (function () {

    var App = function (opts) {

        var options = opts || {};

        this.initialize = function (opts) {
            global.initGlobal();
        };







        this.initialize(options);




    };

    return App;


})();


module.exports = App;
},{"./global":11}],2:[function(require,module,exports){
var AccordionItem = (function () {


    var AccordionItem = function (opts) {
        $.extend(this, opts);


        this.initialize = function () {
            this.transitionIn = this.generateTransition();
            this.transition = this.generateInteractionEffects();
            this.initialized = false;
            this.$el.data('initialized', this.initialized);
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
                autoAlpha:0
            }, {
                y:0,
                rotationX:0,
                autoAlpha:1,
                ease:Back.easeOut,
                delay:0.15
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

                transformPerspective: 1000,
                z: 0
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


var Accordion = (function (window) {


    var Accordion = function (el, opts) {

        this.el = el;
        this.$el = $(el);
        this.$items = this.$el.find(".accordion-item");
        this.items = [];
        this.animations = [];
        this.scrollTimer = null;
        this.shouldCenter = true;
        this.userScrolling = true;

        $.extend(this, opts);

        this.transitionInComplete = this.transitionInComplete || function () {};

        if (this.enableWidth === undefined) this.enableWidth = 768;

        this.initialize = function () {
            this.initItems();
            var mq = window.matchMedia('(min-width: ' + this.enableWidth + 'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);

        };




        this.events = function (enable) {
            if (enable) {
                this.$items.on('mouseenter', this.onOpen);


            } else {
                this.$items.off('mouseenter', this.onOpen);

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

                    console.log(rotationRange);
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

                if(!item.initialized && itemOffsetTop < scrollBottom) {
                    item.transitionIn.delay(toTransition * 0.15);
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


        this.onOpen = (function (e) {

            var target = $(e.target).closest(".accordion-item");
            var targetId = target.attr('id');


            var self = this;

            console.log(this.items);

            for (var i in this.items) {
                var item = this.items[i];
                //console.log(item.id, targetId, item, item.open);
                if (targetId === item.id && item.initialized) {
                    item.transition.play();
                    item.open = true;
                } else if (item.open === true && item.initialized) {

                    item.transition.reverse(undefined, false);
                    console.log(item.transition.duration());
                    TweenMax.to(item.$el.find(".accordion-content-image"),item.transition.duration(), {
                        rotationX:0

                    });
                    item.open = false;
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


    };

    return Accordion;

})(window);
module.exports = window.cl.Accordion = Accordion;

},{}],3:[function(require,module,exports){

var VideoServices = require ('./videoservices');

var VideoPanel = require("./videopanel.js");


var Gallery = (function (window) {


    var CATEGORIES = [
        'news',
        'agency-news',
        'culute',
        'roofstage-pass',
        'carmichael-collective',
        'carmichael-cares',
        'about',
        'people',
        'our-thinking',
        'work',
        'new-work',
        'contact',
        'careers'

    ];

    var Gallery = function (opts) {
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
        $.extend(this,opts);

        this.transitionInComplete = this.transitionInComplete || function () {};

        this.collectData();

        this.peek = this.opts.peek !== undefined ? this.opts.peek  : false;
        this.inheritColors = false;
        this.directions = this.opts.directions !== undefined ? this.opts.directions : false;
        this.autoplay = this.opts.autoplay !== undefined ? this.opts.autoplay : null;
        this.strap = this.opts.strap !== undefined ? this.opts.strap : null;
        this.info = this.opts.info !== undefined ? this.opts.info : null;
        this.viewAll = this.opts.viewall !== undefined ? this.opts.viewall : null;

        this.autoplay = null;
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



        this.viewAllThumbnails = [];


        var swiperOpts = {
            mode:'horizontal',
            loop:(this.totalSlides > 1) ? true : false,
            pagination:this.$pagination[0],
            createPagination:(this.totalSlides > 1) ? true : false,
            calculateHeight:true,
            paginationClickable:true,
            onSlideChangeEnd: (function (swiper) {
                console.log('slideChangeEnd');
                VideoServices.pauseAll('vimeo');
                VideoServices.pauseAll('youtube');
                swiper.fixLoop();
                if(this.peek)
                    this.switchBlurbCopy();
            }).bind(this),
            onSlideChangeStart: (function (swiper) {
                if(this.peek)
                    this.hideBlurbs();
            }).bind(this),
            onSwiperCreated: (function () {
                console.log("swiper created");
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






        this.toggleTransition = function(on) {

            var props = (on) ? "transform,top,left" : "none";
            for(var i in prefix) {
                var fix = prefix[i];
                var valFix = (on) ? fix : "";
                this.$wrapper.css(fix+'transition-property', valFix+props);
            }



        };

        this.switchBlurbCopy = function () {
            var nextSlide = $(this.swiper.getSlide(this.swiper.activeIndex)).next();
            var prevSlide = $(this.swiper.getSlide(this.swiper.activeIndex)).prev();

            var nextText =  nextSlide.find(".copy p");
            var nextColor = nextSlide.find(".theme-color").css("color");
            var prevText =  prevSlide.find(".copy p");
            var prevColor = prevSlide.find(".theme-color").css("color");


            if(this.inheritColors) {
                this.$directionButtons.filter("#next").css('background-color' , nextColor).find('.blurp span').css('color' , nextColor);
                this.$directionButtons.filter("#next").find('.blurb span').css('color' , nextColor);
                this.$directionButtons.filter("#prev").css('background-color' , prevColor).find('.blurp span').css('color' , prevColor);
                this.$directionButtons.filter("#prev").find('.blurb span').css('color' , prevColor);
            }






            this.$nextBlurb.text(nextText.text());
            //this.$nextBlurb.css('color',nextColor);
            this.$prevBlurb.text(prevText.text());
            //this.$prevBlurb.css('color',prevColor);
        };

        this.generateBlurbAnimation = function (blurb, direction) {

            if(this['button-'+direction] === undefined) {
                var dMod = direction  === "next" ? -1 : 1;
                this['button-'+direction] = new TimelineMax();

                var show = TweenMax.fromTo(blurb , 0.25 ,
                    {
                        autoAlpha:0
                    }
                    ,{
                        autoAlpha:1
                    });

                var foldOut = TweenMax.fromTo(blurb,0.25,
                    {
                        rotationY:90 * dMod
                    },
                    {
                        rotationY:0
                        ,ease:Power4.easeInOut
                    }
                );

                var foldOutBlurb = TweenMax.fromTo(blurb.find(".blurb"),0.25,
                    {
                        rotationY:90 * dMod
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

            if(!this.directionOpen) {
                this.directionOpen = true;
                TweenMax.fromTo(target ,0.25, {
                    rotationY:90 * dMod
                },{
                    rotationY:0,
                    ease:Power4.easeInOut
                });
            }



        }).bind(this);
        this.outDirection = (function () {

            if(this.directionOpen) {
                this.directionOpen = false;
                TweenMax.to(this.$directionButtons.filter("#next"), 0.25, {
                    rotationY: -90,
                    ease: Power4.easeInOut
                });
                TweenMax.to(this.$directionButtons.filter("#prev"), 0.25, {
                    rotationY: 90,
                    ease: Power4.easeInOut
                });
            }


        }).bind(this);

        this.out = (function (e) {


            if(this.peek)
                this.hideBlurbs();
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
                    this.swiper.stopAutoplay();
                    this.over(null, this.$directionButtons.filter("#prev"));
                }else if(x > rightBound-threshHold){
                    this.swiper.stopAutoplay();
                    this.over(null, this.$directionButtons.filter("#next"));
                }else{
                    this.swiper.startAutoplay();
                    this.out();
                }
            }




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
            TweenMax.set(this.$directionButtons, {autoAlpha:1});
            this.$directionButtons.show();
            this.$directionButtons.filter("#next").on('click' , this.swipeNext);
            this.$directionButtons.filter("#prev").on('click' , this.swipePrev);
            this.outDirection();

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

        }



        this.makeThumbActive = function (slide) {

        };

        this.generateThumbnailItem = function (slide) {
            var category = "";
            var matches = /category-[\w]+/i.exec(slide.attr('class'));
            if(matches !== undefined)
                category = matches[0];


            var id = slide.attr('id');
            var index = slide.data('index');
            var header = slide.find(".marquee .copy h1").text();
            var subheader = slide.find(".marquee .copy p").text();
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

        this.hideAll = (function () {
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



        }).bind(this);

        if(this.viewAll){
            this.addViewAllItems();
            this.makeThumbActive(this.swiper.activeSlide);
            TweenMax.set(this.$viewAll, {autoAlpha:1});

            this.$viewAll.on('click' , this.showAll);
            this.$viewAllPanel.find(".close").on('click' , this.hideAll);
        }







    };

    return Gallery;

})(window);
module.exports = window.cl.Gallery = Gallery;

},{"./videopanel.js":8,"./videoservices":10}],4:[function(require,module,exports){



var Header = (function () {

    var Header = function (opts) {

        this.opts = opts || {};

        $.extend(this, opts);
        this.transitionInComplete = this.transitionInComplete || function () {};

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

            if(!this.isTouchDevice) {
                this.$button.on("click" , this.handleNav);
                this.$close.on("click" , this.handleNav);
                this.$navItems.on("click" , this.handleNav);
                this.$affectedButtons.on("mouseenter" , this.handleAffectedButtons);
                this.$affectedButtons.on("mouseleave" , this.handleAffectedButtons);
                this.$filterButton.on("click" , this.handleFilterButton);
                this.$closeFilter.on("click" , this.handleFilterButton);
                this.$overlay.on("click" , this.handleOverlay);

            }else{
                this.$button.on("touchend" , this.handleNav);
                this.$close.on("touchend" , this.handleNav);
                this.$navItems.on("touchend" , this.handleNav);
                this.$filterButton.on("touchend" , this.handleFilterButton);
                this.$closeFilter.on("touchend" , this.handleFilterButton);
                this.$overlay.on("touchend" , this.handleOverlay);
            }


        };

        this.createFilterAnimation = function () {
            var tl = new TimelineMax();

            var overlay;
            if(this.isMobile) {
                overlay = TweenMax.to(this.$overlay,0.5, {
                    autoAlpha: 1,
                    //zIndex: 10000
                });
            } else {
                overlay = TweenMax.to(this.$overlay,0.5, {
                    visibility: 'inherit',
                    zIndex: 1
                });
            }

            var fadeIn = TweenMax.to(this.$filterMenu,0.05, {
                autoAlpha:1
            });

            var flip = TweenMax.fromTo(this.$filterMenu, 0.75, {
                rotationX:-90
            },{
                rotationX:0
                ,ease:Power4.easeInOut
            });

            var closeButton = TweenMax.fromTo(this.$closeFilter,0.5, {
                rotationX:90
            },{
                rotationX:0,
                onStart: function () {
                    TweenMax.set(this.$closeFilter, {opacity:1});
                },
                onReverseComplete: function () {
                    TweenMax.set(this.$closeFilter, {opacity:0});
                }
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

            tl.add([overlay,fadeIn,flip]);
            tl.add(list);
            tl.add(closeButton);
            tl.paused(true);
            return tl;



        };

        this.createNavAnimation = function () {
            var tl = new TimelineMax();
            var fadeInOverlay = TweenMax.to(this.$overlay, 0.25 ,{
                autoAlpha:1
            });
            var close = TweenMax.fromTo(this.$close, 0.25, {
                    rotationY:90
                },{
                    rotationY:0
                    ,delay:0.2
                });
            var button = TweenMax.fromTo(this.$button, 0.25, {
                    rotationY:0
                },{
                    rotationY:-90
                });
            var list = TweenMax.staggerFromTo(this.$navItems, 0.45 ,
                {
                    y:-40,
                    autoAlpha:0
                },{
                    y:0,
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
            this.filterMenuAnimation.reverse();
        };

        this.openFilter =  function () {
            this.filterMenuAnimation.timeScale(1);
            this.filterMenuAnimation.play();

        };

        this.hideFilterBtn = function () {
            this.$filterButton.addClass("hiding");
        };

        this.showFilterBtn = function () {
            this.$filterButton.removeClass("hiding");
        };

        this.handleFilterButton = (function (e) {
            if (e !== undefined) {
                e.stopPropagation();
            }

            if(this.filterOpen) {
                this.filterOpen = false;
                this.closeFilter();

                if (this.isMobile) {
                    this.showNavBtn();
                }
            }else{
                this.filterOpen = true;
                this.openFilter();
                if (this.isMobile) {
                    this.hideNavBtn();
                }
            }

        }).bind(this);

        this.handleAffectedButtons = (function (e) {
            var $t = $(e.target).closest(this.affectedClass);
            $t.toggleClass(this.activeClass);

        }).bind(this);

        this.handleNav = (function (e) {
            if (e !== undefined) {
                e.stopPropagation();
            }


            if(this.navOpen) {
                this.navOpen = false;
                this.closeNav();
                this.showFilterBtn();
            }else{
                this.navOpen = true;
                this.openNav();
                this.hideFilterBtn();
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


    };

    return Header;


})();



module.exports = Header;

},{}],5:[function(require,module,exports){
var LinksList = (function (window) {

    var LinksList = function (el, opts) {

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
        if(this.disableWidth === undefined) this.disableWidth = 767;

        this.initialize = function () {
            this.initItems();

            var mq = window.matchMedia('(max-width: '+this.disableWidth+'px)');
            mq.addListener(this.checkMediaQuery);
            this.checkMediaQuery(mq);
        };

        this.events = function (enable) {
            if (enable) {
                this.$items.on('click' , this.open);
            } else {
                this.$items.off('click' , this.open);
                $('.linksList-desktop li.link-item.inactive').on('click', this.flipIn);
            }
        };


        window.onresize = (function () {
          this.initItems();
        }).bind(this);


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

        this.generateAnimation = function ($item) {
            var self = this;
            var tl = new TimelineMax();
            var height = TweenMax.to($item, 0.5, {
                height: ($item.find(".content").height()) + 75,
                ease:Cubic.easeInOut
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
              });
          });
        };

        this.open = (function (e) {
            var target = $(e.target).closest(".link-item");
            var targetId = target.attr('id');
            var self = this;

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
            console.log('index: ', index);
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
    };

    return LinksList;

})(window);
module.exports = window.cl.LinksList = LinksList;
},{}],6:[function(require,module,exports){
var PanelButton = (function (window) {

    var PanelButton = function (el, opts) {

        this.el = el;
        this.$el = this.el.$el;
        this.image = this.$el.parents(".row").find(".image-tile");
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
            $(this.image).addClass('hovered');
        }).bind(this);

        this.leaveImage = (function() {
            $(this.image).removeClass('hovered');
        }).bind(this);

        this.initItems = function() {
            var self = this;
        };

        this.initialize();
    };

    return PanelButton;

})(window);
module.exports = window.cl.PanelButton = PanelButton;
},{}],7:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */








var Tiles = (function() {


    var Tiles = function (opts) {
        $.extend(this,opts);
        this.transitionInComplete = this.transitionInComplete || function () {};

        if(this.$el.length === 0)
            return error("No Element");
        else if(this.$el === undefined)
            return error("No $el property has been passed in the options");

        function error(msg) {
            console.error(msg);
            return;
        }

        this.initialize = function () {
            this.transitionIn();
        };



        this.transitionIn = function () {



            var tl = new TimelineMax({
                onComplete:this.transitionInComplete
            });

            var tweens = [];
            this.$tiles.each(function (i) {
                var mod = i%2 === 0 ? 1 : -1;
                var modOrigin = mod > 0 ? "center top": "center bottom";
                var tileTl = new TimelineMax();
                var cardHeight = $(this).height();
                var flip = TweenMax.fromTo(this,2, {
                    transformPerspective:1000,
                    transformOrigin:modOrigin,
                    rotationX:90 * mod,
                    z:-cardHeight

                },{
                    rotationX:0,
                    ease:Power4.easeOut,
                    z:0
                });


                tileTl.add([flip]);





                tweens.push(tileTl);
            });

            tl.add(tweens, "-=0" , 'normal' ,0.15);


        };

        this.$el.show();
        this.$tiles = this.$el.find(".tile");
        console.log(this);

        this.initialize();
    };

    return Tiles;


})(window);


module.exports = Tiles;
},{}],8:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */








var VideoPanel = (function() {


    var VideoPanel = function (opts) {
        $.extend(this,opts);
        this.transitionInComplete = this.transitionInComplete || function () {};
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
    };

    return VideoPanel;


})(window);


module.exports = VideoPanel;
},{}],9:[function(require,module,exports){
/**
 * Created by Pavel on 3/8/2015.
 */

var videoservice = require('./videoservices');

var VideoComponent = (function() {


    var VideoComponent = function (el,opts) {


        var self = this;
        this.$el = $(el);
        this.id = this.$el.attr('id');
        this.player = null;
        this.playerActive = false;


        $.extend(this,opts);


        this.isMobile = $('html').hasClass("mobile");
        this.isTablet = $('html').hasClass("tablet");



        this.initialize = function () {

            console.log("init");

            //this.player = $f(this.iframe);
            //this.addVimeoEvents();

            this.embedCode = this.$el.data("iframe-embed");
            this.$iframe = $('<iframe src="'+this.embedCode+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
            this.$cover = this.$el.nextAll().filter("[data-panel-image] , [data-panel-play-button]");
            this.$cover.show();

            this.iframe = this.$iframe[0];

            this.addEvents();






        };



        this.loadVimeoPanel = function () {


            videoservice.stopAll(null, self.id);
            if(self.playerActive === true && self.player !== null) {

                self.player.api('play');
            }else{
                self.$iframe.load(function () {

                    self.playerActive = true;
                    self.player = $f(self.iframe);
                    console.log(self.player, self.id);
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
            console.log("init" , self.$cover.filter('[data-panel-play-button]'));
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

            switch(self.type) {
                case "vimeo" :
                    self.loadVimeoPanel();
                    break;
            }


        };

        this.onVideoPause = function (e) {
            console.log('pause');
            videoservice.playAll('autoplay');
            self.transitionCover(true);

        };

        this.onVideoPlay = function (e) {
            console.log('play');
            self.transitionCover();

        };

        this.onClickCover = function (e) {


            console.log('hello?');
            self.$el.show();
            self.transitionCover(false, self.loadPanel);
            console.log('click cover' , self.id);






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
                    console.log("oncomplete", self.id);
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
    };

    return VideoComponent;


})(window);


module.exports = VideoComponent;
},{"./videoservices":10}],10:[function(require,module,exports){
/**
 * Created by Pavel on 2/18/2015.
 */

VideoComponent = require('./videoservicecomponent.js');

module.exports.gatherVimeoPlayers = function () {
    var self = this;
    $("[data-vimeo]").each(function () {
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


module.exports.pauseAll = function (type, id) {
    execute(type, id, 'pause');
};


module.exports.playAll = function (type, id) {
    execute(type, id, 'play');
};


module.exports.stopAll = function (type, id) {
    execute(type, id, 'stop');
};

},{"./videoservicecomponent.js":9}],11:[function(require,module,exports){
/**
 * Created by wildlife009 on 2/4/15.
 */

var Header = require('./components/header');
var VideoPanel = require('./components/videopanel');
var Tiles = require('./components/tiles');
var Gallery = require('./components/gallery');
var LinksList = require('./components/linksList');
var Accordion = require('./components/accordion');
var PanelButton = require('./components/panelbutton');
var VideoServices = require('./components/videoservices');



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
    new LinksList(".linksList" , {
        disableWidth:767
    });
};

var galleries = function () {

    $('[data-gallery]').each(function () {
        new Gallery({
            $el: $(this)
        });
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



module.exports.initGlobal = function () {
    galleries();
    nav();
    videos();

    linklists();
    accordions();
    tiles();
    panelbuttons();
    videoServices();


};





},{"./components/accordion":2,"./components/gallery":3,"./components/header":4,"./components/linksList":5,"./components/panelbutton":6,"./components/tiles":7,"./components/videopanel":8,"./components/videoservices":10}],12:[function(require,module,exports){

window.cl = {};
window.cl.players = {};
require('./carmichaellynch/components/gallery');
require('./carmichaellynch/components/accordion');
require('./carmichaellynch/components/linksList');
var App = require("./carmichaellynch/app");

$(document).ready(function () {
    var app = new App();

});




},{"./carmichaellynch/app":1,"./carmichaellynch/components/accordion":2,"./carmichaellynch/components/gallery":3,"./carmichaellynch/components/linksList":5}]},{},[12]);
