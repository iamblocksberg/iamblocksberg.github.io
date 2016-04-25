
var boxOutput = document.getElementById("boxOutput");
var boxInput = document.getElementById("boxInput");
var textUsername = document.getElementById("textUsername");
var textFrontInput = document.getElementById("textFrontInput");
var indexUserLogin, username = '';
var allUser = [['root', '123'], ['admin', '012']];
var cmdLoginBefore = ['print', 'save'];
var statusLoadYoutubeApi = false;
var statusAddBoxPlayYoutube = false;

var inputType = 'text';

function scrollToBottom(){
	window.scrollTo(0, document.body.offsetHeight);
}

function println(text){
	boxOutput.innerHTML += username + '> ' + text + '<br>';
	scrollToBottom();
}

function printOutput(text){
	boxOutput.innerHTML += '' + text + '<br><br>';
	scrollToBottom();
}

function checkCmdLoginBefore(text){
	var stt = false;

	for(var i = 0; i < cmdLoginBefore.length; i++){
		if(cmdLoginBefore[i] == text){
			stt = true;
		}
	}

	return stt
}

function checkUserLogin(){

	var stt = false;

	for(var i = 0; i < allUser.length; i++){
		if(allUser[i][0] == indexUserLogin){
			stt = true;
			indexUserLogin = i;
			break;
		}
	}

	return stt;
}

function checkPassLogin(text){

	if(checkUserLogin() && allUser[indexUserLogin][1] == text){
		username = allUser[indexUserLogin][0];
		textUsername.innerHTML = username;
		printOutput("Login Success.");
	}else{
		printOutput("Login Fail.");
	}

	indexUserLogin = null;
	textFrontInput.innerHTML = '';
	inputType = 'text';
	boxInput.type = inputType;

}

function loadYoutubeApi(){
	gapi.client.load('youtube', 'v3', function(){
		gapi.client.setApiKey('AIzaSyD8sdguhPDCa5i3Dj2yP3u6tQ4bLXd85KU');
		statusLoadYoutubeApi = true;
	});
}

function youtubeSearch(val, max){

	if(max == null){
		max = 10;
	}

	if(!statusLoadYoutubeApi){
		loadYoutubeApi();
	}else{
		var request = gapi.client.youtube.search.list({
			part: 'snippet',
			q: val,
			maxResults: max,
			type: 'video'
		});

		function searchResponse(response){
			var text = '';

			for(var i = 0; i < max; i++){
				var title = response.items[i].snippet.title;
				var videoId = response.items[i].id.videoId;
				var channelTitle = response.items[i].snippet.channelTitle;
				text += '<br><a onclick="playYoutube(\'' + videoId + '\', true)">' + (i + 1) + '.' + title + ' by ' + channelTitle + '</a>';
			}

			printOutput(text);
		}

		request.execute(searchResponse);
	}

}

//Function for user use-------------------------------------------------------

function changeColor(bg, text){

	if(bg != null){
		document.getElementById("main").style.backgroundColor = bg;
		document.getElementById("boxInput").style.backgroundColor = bg;
	}

	if(text != null){
		document.getElementById("main").style.color = text;
		document.getElementById("boxInput").style.color = text;
	}

}

function clearScreen(){
	boxOutput.innerHTML = '[cmd-o by I am BlocksBerg]<br><br>';
}

function decode(tar, val){

	if(val != null){

		switch(tar){
			case 'url' : printOutput('New URL: ' + decodeURIComponent(val)); break;
		}

	}

}

function encode(tar, val){

	if(val != null){

		switch(tar){
			case 'url' : printOutput('New URL: ' + encodeURIComponent(val)); break;
		}

	}

}

function exit(){
	window.close();
}

function help(text){
	printOutput('All Command.<br>clear : Clear screen.<br>color [bg] [text] : Change color.<br>decode [type] [text] : Decode text.<br>encode [type] [text] : Encode text.<br>exit : Close program.<br>login [username] : Login.<br>logout : Logout.<br>print [text] : Print text.<br>youtube [link/param] [autoplay/text] : Play video from Youtube.');
}

function login(text){
	
	indexUserLogin = text;
	textFrontInput.innerHTML = ' Password: ';
	inputType = 'password';
	boxInput.type = inputType;

}

function logout(){
	username = '';
	textUsername.innerHTML = username;
	printOutput('Logout Success.');
}

function playYoutube(param1, param2, param3){

	if(param1 == '-s'){
		//search

		if(!statusLoadYoutubeApi){
			loadYoutubeApi();
		}

		youtubeSearch(param2, param3);

	}else if(param1 != null){
		if(param2 == null){
			param2 = false;
		}

		if(statusAddBoxPlayYoutube){
			document.getElementById('boxOutput').removeChild(document.getElementById('boxPlayYoutube'));
			statusAddBoxPlayYoutube = false;
		}

		boxOutput.innerHTML += '<div id="boxPlayYoutube"></div>';
		statusAddBoxPlayYoutube = true;

		var height = window.innerHeight - 50;

		document.getElementById('boxPlayYoutube').innerHTML = '<br><iframe width="100%" height="' + height + '" src="http://www.youtube.com/embed/' + param1 + '?autoplay=' + param2 + '" frameborder="0" allowfullscreen></iframe><br><br>';
	}
	
	scrollToBottom();

}

//-------------------------------------------------------------------------


function checkCmd(cmd){

	if(inputType == 'password'){

		checkPassLogin(cmd);

	}else{

		println(cmd);

		var cmdNew = cmd.split(" ");

		for(var i = cmdNew.length; i > 0; i--){
			if(cmdNew[i] == ''){
				cmdNew.splice(i, 1);
			}
		}

		var funcName = cmdNew[0];
		var param1 = cmdNew[1];
		var param2 = cmdNew[2];
		var param3 = cmdNew[3];

		if(username == '' && checkCmdLoginBefore(funcName)){
			printOutput('Please Login.');
		}else{

			switch(funcName){
				case '-help' : help(); break;
				case 'clear' : clearScreen(); break;
				case 'color' : changeColor(param1, param2); break;
				case 'decode' : decode(param1, param2); break;
				case 'encode' : encode(param1, param2); break;
				case 'exit' : exit(); break;
				case 'login' : login(param1); break;
				case 'logout' : logout(); break;
				case 'print' : printOutput(param1); break;
				case 'youtube' : playYoutube(param1, param2, param3); break;
				default : printOutput('Unknow "' + funcName + '", Try -help');
			}

		}

	}

}

window.onkeypress = function(e){

	if(e.which == 13){

		if(boxInput.value != ''){
			checkCmd(boxInput.value);
		}

		boxInput.value = '';
		boxInput.focus();

	}

}
