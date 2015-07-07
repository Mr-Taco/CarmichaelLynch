
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
