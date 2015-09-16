var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
// var Header = require('./Header');
// var Footer = require('./Footer');

function Entry(mount) {
    // Extend Node
    Node.call(this);
    new DOMElement(this, {
    	content: '<h1>Hello faexempressous</h1>'
    });
    this.setAlign(0.4,0.4);

    // makeHeader(this);
    // makeFooter(this);
}

// Extend the prototype
Entry.prototype = Object.create(Node.prototype);

// function makeHeader(node) {
// 	node.addChild()
// 		.setSizeMode('default', 'absolute')
// 		.setAbsoluteSize(null, 100)
// 		.addChild(new Header());
// }

// function makeFooter(node) {
// 	node.addChild
// 		.setDifferentialSize(null, -200)
// 		.setPosition(0, 100)
// 		.addChild(new Footer());
// }

Entry.prototype.onReceive = function(event, payload) {
	console.log(event, payload)
};

module.exports = Entry;
