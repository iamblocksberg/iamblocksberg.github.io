
var bucketColor = ""
var currentTool = "brush"
var readyToDraw = false

function draw(target) {
	$(target).css('background', bucketColor)
	// console.log(target.css('background'))
	// console.log('draw')
}

$(document).ready(function(){

	// Asset
	// $('.asset.draw').click(function(){
	// 	bucketColor = $(this).css('background')
	// })
	$('.asset.draw').on('touchend mouseup', function(){
		bucketColor = $(this).css('background')
	})

	$('.asset.erase').on('touchend mouseup', function(){
		bucketColor = ""
	})

	// Draw
	$(document).on('touchend mouseup', function(){
		readyToDraw = false
	})

	$('.grid-node').on('touchstart mousedown', function(){
		
		readyToDraw = true
		draw( $(this) )

	})

	$('.grid-node').on('touchmove mousemove', function(){

		if (readyToDraw) {
			draw( $(this) )
			// console.log('move : ' + readyToDraw)
		}

	})

})

/*

set grid point each node
use grid point dont position

*/