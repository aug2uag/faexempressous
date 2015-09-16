#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
	version: '0.0.1',
	addHelp:true,
	description: 'Famous Express Boilerplate'
});


parser.addArgument(
	[ '-n', '--name' ],
	{
		help: 'name of your app',
		required: true,
		type: 'string'
	}
);

var args = parser.parseArgs();
var fname = path.join(args.name, 'package.json');

fs.readFile(fname, 'utf8', function(err, json) {
	json = JSON.parse(json);
	json.scripts.dev = 'node ./bin/index.js';
	fs.writeFile(fname, JSON.stringify(json, null, 2), function() {
		process.exit();
	});
});
