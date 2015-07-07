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