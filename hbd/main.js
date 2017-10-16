
var GiftBox = document.querySelector('.GiftBox');
var image_max = 3;
var image_current = 1;
var max_hit = 5;
var count_hit = 0;
var timeoutZoom;
var isFinish = false;

GiftBox.addEventListener('click', GiftBox_onClick);

function GiftBox_onClick() {

	if (count_hit < max_hit) {
		count_hit++;
	} else {
		count_hit = 0;

		if (image_current < image_max) {
			image_current++;

			GiftBox.style.backgroundImage = "url('image/" + image_current + ".png')";
		} else {
			isFinish = true;
			GiftBox.classList.remove('zoom');
			GiftBox.classList.add('finish');
		}

	}

	if (!isFinish) {
		// clearTimeout(timeoutZoom);
		GiftBox.classList.remove('zoom');
		GiftBox.classList.add('zoom');

		timeoutZoom = setTimeout(function(){
			GiftBox.classList.remove('zoom');
		}, 500);
	}
	
}

function init() {

	GiftBox.style.backgroundImage = "url('image/1.png')";

}

window.onload = function() {
	GiftBox.style.display = 'block';

	init();
}


