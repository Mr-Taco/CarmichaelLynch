
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
