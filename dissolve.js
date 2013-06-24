function displaySlices(imgSrc, slices, interval, layer) {
	var imageObj = new Image();
	imageObj.src = imgSrc;
	imageObj.onload = function () {
		parts = fisherYates(splitLine(this.width, slices))
		for (a = 0; a <= parts.length - 1; a++) {
			var slice = parts[a];
			doSetTimeout(this, slice, a * interval, layer)
		}

	}
}

function doSetTimeout(imgObj, slice, time, layer) {
	setTimeout(function () {
		displaySlice(imgObj, slice, layer)
	}, time);
}

function displaySlice(imgObj, slice, layer) {
	sliceWidth = slice[1] - slice[0];
	var slicedImage = new Kinetic.Image({
			x: slice[0],
			y: 0,
			image: imgObj,
			width: sliceWidth,
			height: imgObj.height,
		}

	);
	slicedImage.setCrop({
		x: slice[0],
		y: 0,
		width: sliceWidth,
		height: imgObj.height
	});

	layer.add(slicedImage);
	layer.draw();

}

/* Helper functions */

function splitLine(length, pieces) {
	parts = new Array();
	interval = length / pieces;
	for (a = 0; a < pieces; a++) {
		start = Math.floor(a * interval);
		end = Math.ceil(start + interval);
		parts.push([start, end]);

	}
	return parts;
}

function fisherYates(myArray) {
	var i = myArray.length,
		j, temp;
	if (i === 0) return false;
	while (--i) {
		j = Math.floor(Math.random() * (i + 1));
		temp = myArray[i];
		myArray[i] = myArray[j];
		myArray[j] = temp;
	}
	return myArray;
}
          