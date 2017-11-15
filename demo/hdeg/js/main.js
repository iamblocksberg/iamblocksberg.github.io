
// Event
$(document).ready(function(){

	// DOM
	var canvasDOM = document.getElementById('canvas')
	var canvas = canvasDOM.getContext('2d')

	// Event
	var isDrawing = false
	var currentAsset = ''

	// Init
	var gridSize = 32
	var canvasBGColor = '#fff'

	function init() {
		canvasDOM.width = $('.canvas-container').width()
		canvasDOM.height = $('.canvas-container').height()
		canvas.fillStyle = canvasBGColor
		canvas.fillRect(0, 0, canvasDOM.width, canvasDOM.height)
	}

	// Asset
	$('.asset.draw').on('touchend', function(){
		currentAsset = $(this).data('asset-name')
	})

	$('.asset.erase').on('touchend', function(){
		currentAsset = ""
	})


	// Draw
	$(document).on('touchend', function(){
		isDrawing = false
	})

	$('#canvas').on('touchstart', function(e){
		var touchPos = getTouchPos(e)
		
		isDrawing = true
		drawObject(touchPos.x, touchPos.y)

	})

	$('#canvas').on('touchmove', function(e){

		if (isDrawing) {
			var touchPos = getTouchPos(e)
			drawObject(touchPos.x, touchPos.y)
		}

	})

	// Start \\

	init()




	// =====

	// Func
	function drawObject(x, y) {
		// console_log(x + ' ' + y)

		x = positionSnapGrid(x)
		y = positionSnapGrid(y)

		if (currentAsset != "") {

			var texture = new Image()
			texture.src = 'image/assets/' + currentAsset + '.png'
			texture.onload = function() {
				canvas.drawImage(
					texture,
					0,
					0,
					texture.width,
					texture.height,
					x,
					y,
					gridSize,
					gridSize
				)

			}

		} else {
			// Erase
			canvas.fillStyle = canvasBGColor
			canvas.fillRect(x, y, gridSize, gridSize)
		} 

	}

	function positionToGridPoint(pos) {
		return Math.floor(pos / gridSize)
	}

	function positionToGridPoints(x, y) {
		var gridPoint = {}
		gridPoint.x = Math.floor(x / gridSize)
		gridPoint.y = Math.floor(y / gridSize)
		return gridPoint
	}

	function positionSnapGrid(pos) {
		return positionToGridPoint(pos) * gridSize
	}

	function positionSnapGrids(x, y) {
		var gridPosition = {}
		gridPosition.x = positionToGridPoint(x) * gridSize
		gridPosition.y = positionToGridPoint(y) * gridSize
		return gridPosition
	}

	function getTouchPos(touchEvent) {
		var rect = canvasDOM.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	// =====

	function console_log(text) {
		console.log(text)
	}

})



/*

set grid point each node
use grid point dont position

*/