(function () {
    if(console === undefined){
        console = {};
    }
    console.log = console.log || function () {};
    console.error = console.error || function () {};
    console.warn = console.warn || function () {};
    console.info = console.info || function () {};
});