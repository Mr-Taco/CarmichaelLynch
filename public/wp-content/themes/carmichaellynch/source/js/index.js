

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



