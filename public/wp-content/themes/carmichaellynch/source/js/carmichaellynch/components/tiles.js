/**
 * Created by Pavel on 2/18/2015.
 */

var __hasProp = {}.hasOwnProperty,
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


var ComponentBase = require('./abstract/componentbase.js');




var Tiles = (function(_super) {

    __extends(Tiles, _super);
    function Tiles(opts) {
        Tiles.__super__.constructor.apply(this,arguments);

        $.extend(this,opts);


        if(this.$el.length === 0)
            return error("No Element");
        else if(this.$el === undefined)
            return error("No $el property has been passed in the options");

        function error(msg) {
            console.error(msg);
            return;
        }

        this.initialize = function () {
            this.$el.data('component' , this);
        };





        this.$el.show();
        this.$tiles = this.$el.find(".tile");

        this.initialize();
    }

    return Tiles;


})(ComponentBase);


module.exports = Tiles;