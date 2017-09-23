'use strict';

var execSync = require('child_process').execSync;
var util = require('util');
var pathApi = require('path');

console.log('Foo');

var startx = 7;
var starty = 6;
var cardwidth = 44;
var cardheight = 66;
//var cardoffsetx = 0;
//var cardoffsety = 0;
var areapaddingx = 2;
var areapaddingy = 3;
var areaw = cardwidth - 2 * areapaddingx; //40;
var areah = cardheight - 2 * areapaddingy; //60;
var cardgapx = 17;
var cardgapy = 11;
var groupgapx = 11;
var groupgapy = 10;

var files = ['set_clear.png', 'set_solid.png', 'set_shaded.png'];
var shades = ['clear', 'solid', 'shaded'];

for (var cc = 0; cc < 3; cc++) {
    var file = files[cc];
    var shade = shades[cc];
    if (cc == 2) { // Shaded file is offset a little down...
	starty = 9;
    }
    if (cc > 0) { // Non-clear files seems offset a little right
	startx = 8;
    }
    
    for (var ii = 0; ii < 9; ii++) {
	for (var jj = 0; jj < 3; jj++) {
	    var command = handleCombination(file, shade, ii, jj);
	    //var command = 'date';
	    console.log('Running %s', command);
	    //var result = new Buffer(0);
	    var result = execSync(command);
	    console.log('Result: %s', result.toString().trim());
	}
    }
}

function handleCombination(inpath, shade, ii, jj) {
    var color = getColor(ii, jj);
    var count = getCount(ii, jj);
    var shape = getShape(ii, jj);
    
    var x = getX(ii, jj);
    //var x = startx;
    var y = getY(ii, jj);
    
    var outfile = util.format(
	'%s-%s-%s-%s.png',
	color, shade, shape, count);
    var outpath = pathApi.join('result', outfile);
    
    //console.log('%d %d: [%s,%s] %s %s %s',
    //	    ii, jj, x, y, color, count, shape);
    var command = util.format(
	'convert %s -crop %dx%d+%d+%d %s',
	inpath, areaw, areah, x, y, outpath);
    return command;
}

function getX(ii, jj) {
    var cardx = startx
	//+ (ii + 1) * cardoffsetx * 2
	+ ii * cardwidth
	+ ii * cardgapx
	+ (ii > 2 ? groupgapx : 0)
	+ (ii > 5 ? groupgapx : 0)
    return cardx + areapaddingx;
}

function getY(ii, jj) {
    var cardy = starty
	//+ (jj + 1) * cardoffsety
	+ jj * cardheight
	+ jj * cardgapy
    return cardy + areapaddingy;
}

function getColor(ii, jj) {
    var color;
    if (ii > 5) {
	color = 'purple';
    } else if (ii > 2) {
	color = 'green';
    } else {
	color = 'red';
    }
    return color;
}

function getCount(ii, jj) {
    var count = 1 + ii % 3;
    /*
    if (ii > 5) {
	count = '1';
    } else if (ii > 2) {
	count = '2';
    } else {
	count = '3';
    }
    */
    return count;
}

function getShape(ii, jj) {
    var shape;
    if (jj == 0) {
	shape = 'diamond';
    } else if (jj == 1) {
	shape = 'oval';
    } else if (jj == 2) {
	shape = 'squiggle';
    }
    return shape;
}

function getFill(ii, jj) {
    var fill;
    if (ii > 5) {
	fill = 'r';
    } else if (ii > 2) {
	fill = 'g';
    } else {
	fill = 'p';
    }
    return fill;
}

