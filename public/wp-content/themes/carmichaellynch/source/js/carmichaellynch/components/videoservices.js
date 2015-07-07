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
