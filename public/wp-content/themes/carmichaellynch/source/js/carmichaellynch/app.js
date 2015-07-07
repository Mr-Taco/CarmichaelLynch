/**
 * Created by wildlife009 on 2/4/15.
 */

var global = require("./global");
var controller = require("./controller");



var App = (function () {

    var App = function (opts) {

        var options = opts || {};

        this.initialize = function (opts) {
            global.initGlobal();
            controller.initRouting();
        };







        this.initialize(options);




    };

    return App;


})();


module.exports = App;