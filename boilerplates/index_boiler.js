var Entry = require('./Entry');
var FamousEngine = require('famous/core/FamousEngine');
//start the Engine
FamousEngine.init();
//create the app and pass in the target element
var entry = FamousEngine.createScene().addChild(new Entry());