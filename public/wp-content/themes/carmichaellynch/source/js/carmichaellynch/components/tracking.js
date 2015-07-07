/**
 * Created by Pavel on 3/13/2015.
 */


var universalEvent = ['hitType','eventCategory' , 'eventAction','eventLabel'];

var onClickTrack = function (e) {
    e.stopPropagation();
    var _gaq = window._gaq;
    var ga = window.ga;
    var tag = $(e.target).closest("[data-ga]");
    var tagData = tag.data('ga');
    if(_gaq !== undefined){

        console.log("Tracking - ", tagData);
        _gaq.push(tagData);
    }else if(ga !== undefined) {
        tagData.shift();
        tagData.unshift('event');
        var tagDataObj = {};
        for(var i in universalEvent) {
            tagDataObj[universalEvent[i]] = tagData[i];
        }

        ga('send', tagDataObj);

    }

};


module.exports.customEvents = function () {

    $("[data-ga]").on('click' , onClickTrack);

};