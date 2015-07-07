



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