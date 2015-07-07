

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