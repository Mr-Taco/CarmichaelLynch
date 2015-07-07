/**
 * Created by Pavel on 3/20/2015.
 */
module.exports.randRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.applyExistingTransforms = function(el, animation) {



};


module.exports.directions = [
    'left',
    'right',
    'top',
    'bottom'
];
