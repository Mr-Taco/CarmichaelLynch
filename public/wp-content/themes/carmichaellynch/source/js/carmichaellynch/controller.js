/**
 * Created by wildlife009 on 2/4/15.
 */

var global = require('./global');
var transitions = require('./transitions');
var fillHeight = require('./components/fillheight');

var buildNewPage = function ($content , title ,bodyId, bodyClass) {

    $("body").attr('id' , bodyId);
    $("body").attr('class' , bodyClass);

    var $currentHeader = $('[data-fix-header]');
    var $newHeader = $content.find('[data-fix-header]');
    var $currentContainer = $('#container');
    var $newContainer = $content.find("#container");
    var $currentPagination = $("#pagination");
    var $newPagination = $content.find("#pagination");

    //if($newPagination.length > 0) {
    //    if($currentPagination.length > 0) {
    //        $currentPagination.replaceWith($newPagination);
    //    }else{
    //        $("[data-fix-footer]").prepend($newPagination);
    //    }
    //}else{
    //    $currentPagination.remove();
    //}




    if($newHeader.length > 0) {
        if($currentHeader.length > 0) {
            $currentHeader.replaceWith($newHeader);
        }else{
            $("nav").after($newHeader);
        }
    }else{
        $currentHeader.remove();
    }

    $currentContainer.replaceWith($newContainer);


    $("html").find('title').text(title);

    applyPagination();
    global.initPageComponents();

};

var applyPagination = function () {
    var next = $("#next-page").parent().attr('href');
    var prev = $("#prev-page").parent().attr('href');
    var all = $("#view-all-pages").find('a').attr('href');

    $("#header-next").parent().attr('href', next);
    $("#header-prev").parent().attr('href', prev);
    $("#header-view-all").find('a').attr('href', all);


};


var pageLoaded = function (ctx, next) {

    return function (data,status) {
        var bodyPattern = /<body[\s]*id=["|']([\w-_]*)["|'][\s]*class=["|']([\w\d-_ ]*)["|']>/gi;
        var content = "";
        var title = "";
        var bodyId = "";
        var bodyClass = "";

        try{
            var html = data.responseText;

            var bodyData = bodyPattern.exec(html);

            if(bodyData) {
                bodyId = bodyData[1];
                bodyClass = bodyData[2];
            }




            var meta = "<div>" + html.replace(/^[\s\S]*<head>|<\/head>[\s\S]*$/g, '') + "</div>";
            content = "<div>" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') + "</div>";
            title = $(meta).find("title").text();

        }catch(e) {
            console.error("HTML Parse Error" , e);
        }finally{

            buildNewPage($(content) , title, bodyId, bodyClass);
            if(next !== undefined) next();
        }
    };

};



var transitionOut = function (ctx , next) {
    //console.log("transitionOut", arguments);


    if(ctx.path !== URI(window.location.href).path()) {
        transitions.transitionOutElements(next);
    }


};


var transitionIn = function (ctx, next) {
    //console.log("transitionIn", arguments);


    transitions.transitionInElements(next);

    fillHeight.onResize();


    //if(next !== undefined) next();

};



var scrollUp = function (ctx,next) {

    TweenMax.set(window ,  {
        scrollTo: {
            y:0
        }
    });

    if(next !== undefined) next();
};


var handlePageLoad = function (ctx, next) {
    console.log("handlePageLoad");

    $.ajax({
        url:ctx.path,
        progress:function (data) {
            console.log('progress', data);
        },
        complete:pageLoaded(ctx,next)
    });


};


module.exports.initRouting = function () {
    if (!window.isIE9) {
        page({});
        page('*', transitionOut, scrollUp, handlePageLoad, transitionIn);
    }
    transitionIn();

};


