var allColumn = 48;
var all_info = [];
var column_name = [];
var user_info = [];
var user_imageSrc = 'image/user/';
var current_user;

/*
var user_info = {
	datetime: '',		// 0
	id: '',				// 1
	name: '',			// 2
	lastName: '',		// 3
	address: '',		// 4
	email: '',			// 5
	phone: '',			// 6
	university: '',		// 27
	faculty: '',		// 28
	major: '',			// 29
	minor: '',			// 30
	gpa: '',			// 31
	skill: [],			// 7 - 26
	language: [],		// 32 - 37
	work: []			// 38 - 47
};
*/

function GetURLParameter(sParam) {
	// ref: https://stackoverflow.com/a/12456725
	// demo: var id = GetURLParameter('id');

    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1])
        }
    }	
}

function onLoadAllUserInfoDone( responseText ) {
	var rawData = responseText;

	// All Info
	for (var iData = 0; iData < rawData.length; iData++) {
		var data = rawData[iData].innerText;
		data.replace('\n', '');
		// data.replace(/<div class="softmerge-inner" style="width: 147px; left: -1px;">/i, ' ');
		// data.replace(/</div>/g, ' ');
		// data.replace(/softmerge/g, 'Hola###########')
		all_info.push( data );
	}

	// Column Name
	for (var iColumn = 0; iColumn < allColumn; iColumn++) {
		column_name.push( all_info[iColumn] );
	}

	// User Info
	var current_column = 0;

	var row_userInfo = {};
	var row_skill = [];
	var row_language = [];
	var row_work = [];
	
	var row_skill_temp = {};
	var row_language_temp = {};
	var row_work_temp = {};

	for (var iUserInfo = allColumn * 2; iUserInfo < all_info.length; iUserInfo++) {

		if (current_column >= 38 && current_column <= 47) {
			// work

			if (current_column % 2 == 0) {
				// name
				row_work_temp.name = all_info[iUserInfo];
			} else {
				// value
				row_work_temp.value = all_info[iUserInfo];
				row_work.push(row_work_temp);
				row_work_temp = {};
			}

		} else if (current_column >= 32 && current_column <= 37) {
			// language

			if (current_column % 2 == 0) {
				// name
				row_language_temp.name = all_info[iUserInfo];
			} else {
				// value
				row_language_temp.value = all_info[iUserInfo];
				row_language.push(row_language_temp);
				row_language_temp = {};
			}

		} else if (current_column >= 7 && current_column <= 26) {
			// skill

			if (current_column % 2 != 0) {
				// name
				row_skill_temp.name = all_info[iUserInfo];
			} else {
				// value
				row_skill_temp.value = all_info[iUserInfo];
				row_skill.push(row_skill_temp);
				row_skill_temp = {};
			}

		} else if (current_column == 0) {
			row_userInfo.datetime = all_info[iUserInfo];
		} else if (current_column == 1) {
			row_userInfo.id = all_info[iUserInfo];
		} else if (current_column == 2) {
			row_userInfo.name = all_info[iUserInfo];
		} else if (current_column == 3) {
			row_userInfo.lastName = all_info[iUserInfo];
		} else if (current_column == 4) {
			row_userInfo.address = all_info[iUserInfo];
		} else if (current_column == 5) {
			row_userInfo.email = all_info[iUserInfo];
		} else if (current_column == 6) {
			row_userInfo.phone = all_info[iUserInfo];
		} else if (current_column == 27) {
			row_userInfo.university = all_info[iUserInfo];
		} else if (current_column == 28) {
			row_userInfo.faculty = all_info[iUserInfo];
		} else if (current_column == 29) {
			row_userInfo.major = all_info[iUserInfo];
		} else if (current_column == 30) {
			row_userInfo.minor = all_info[iUserInfo];
		} else if (current_column == 31) {
			row_userInfo.gpa = all_info[iUserInfo];
		}

		current_column++;

		if (current_column == allColumn) {
			// new row
			current_column = 0;

			row_userInfo.skill = row_skill;
			row_userInfo.language = row_language;
			row_userInfo.work = row_work;

			user_info.push( row_userInfo );
			row_userInfo = {};
			row_skill = [];
			row_language = [];
			row_work = [];
		}
		
	}

	renderUserInfo();
}

function changePage(pageName, data) {

	var param = ''

	if (data) {
		param = '?' + $.param(data)
	}

	window.location.href = pageName + '.html' + param
}

function renderUserInfo() {

	// user id
	var user_id = GetURLParameter('id');
	current_user = {};

	if (user_id == null) {
		$('#log').text('Sorry, Not found this user :(');
		$('#log').show();
		$('.spinner').hide();
		$('#loader').show();
		// return;
	}

	// get current user
	var user_exist = false;
	for (user in user_info) {
		if ( user_id == user_info[user].id ) {
			user_exist = true;
			current_user = user_info[user];
			break;
		}
	}

	if (user_exist) {

		/*
		var user_info = {
			datetime: '',		// 0
			id: '',				// 1
			name: '',			// 2
			lastName: '',		// 3
			address: '',		// 4
			email: '',			// 5
			phone: '',			// 6
			university: '',		// 27
			faculty: '',		// 28
			major: '',			// 29
			minor: '',			// 30
			gpa: '',			// 31
			skill: [],			// 7 - 26
			language: [],		// 32 - 37
			work: []			// 38 - 47
		};
		*/

		$('.__title').text(current_user.name +' '+ current_user.lastName +' ');
		$('.__image-src').attr('src', user_imageSrc + current_user.id +'.jpg');
		$('.__image-bg').css('background-image', 'url(' + user_imageSrc + current_user.id +'.jpg' + ')');

		$('.__datetime').text(current_user.datetime);
		$('.__id').text(current_user.id);
		$('.__name').text(current_user.name);
		$('.__lastname').text(current_user.lastName);
		$('.__address').text(current_user.address);
		$('.__email').text(current_user.email);
		$('.__phone').text(current_user.phone);
		$('.__university').text(current_user.university);
		$('.__faculty').text(current_user.faculty);
		$('.__major').text(current_user.major);
		$('.__minor').text(current_user.name);
		$('.__gpa').text(current_user.gpa);

		var __all_skill = '';
		var __all_language = '';
		var __all_work = '';

		for (skill in current_user.skill) {
			if (current_user.skill[skill].name != '') {
				__all_skill += `
					<p>` + current_user.skill[skill].name + `</p>
			        <div class="w3-light-grey w3-round-xlarge w3-small">
						<div class="w3-container w3-center w3-round-xlarge coloryellow" style="width:` + current_user.skill[skill].value * 10 + `%">` + current_user.skill[skill].value * 10 + `%</div>
					</div>
				`;
			}
		}

		for (language in current_user.language) {
			if (current_user.language[language].name != '') {
				__all_language += `
					<p>` + current_user.language[language].name + `</p>
			        <div class="w3-light-grey w3-round-xlarge w3-small">
						<div class="w3-container w3-center w3-round-xlarge coloryellow" style="width:` + current_user.language[language].value * 10 + `%">` + current_user.language[language].value * 10 + `%</div>
					</div>
				`;
			}
		}

		for (work in current_user.work) {
			if (current_user.work[work].name != '') {
				__all_work += `
					<h5 class="w3-opacity"><b>` + current_user.work[work].name + `</b></h5>
			        <p>` + current_user.work[work].value + `</p>
			        <hr>
				`;
			}
		}

		$('.__allskill').html(__all_skill);
		$('.__alllanguage').html(__all_language);
		$('.__allwork').html(__all_work);

		onRendered();

	} else {
		$('#log').text('Sorry, Not found this user :(');
		$('#log').show();
		$('.spinner').hide();
		$('#loader').show();
	}

}

function onRendered() {

	// hide loader
	$('#loader').fadeOut(300);

}



$(document).ready(function() {

	// ref: https://stackoverflow.com/a/3151479
	var loc = window.location.pathname;
	var current_directory = loc.substring(0, loc.lastIndexOf('/'));

	$('#result_uesrInfo').load(current_directory + '/form.html', null, function(responseText) {
		
		$('#result_uesrInfo').html(responseText);

		onLoadAllUserInfoDone( $('#result_uesrInfo td') );

	});

});