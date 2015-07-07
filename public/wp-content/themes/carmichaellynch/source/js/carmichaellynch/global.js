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




