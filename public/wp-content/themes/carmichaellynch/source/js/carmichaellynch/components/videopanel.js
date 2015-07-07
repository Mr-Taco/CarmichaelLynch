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