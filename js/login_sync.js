/*
$(document).ready(function(){

var Head = localStorage.getItem("logic_head");
var Line =localStorage.getItem("logis_line");
var Team =localStorage.getItem("Team_count");
var TeamEmp =localStorage.getItem("TeamEmp_count");
/*
alert("local count");
alert("Head:"+Head);
alert("Line:"+Line);
alert("Team:"+Team);
alert("TeamEmp:"+TeamEmp); */
/*
var name='Spine';
$.ajax({
	type: "POST",
	url: 'http://test.sedarspine.com/en/spineLogisticsApp/getUserLength',
	data : 'uname='+name ,
	dataType:"json",
	processData: false,
	success:function (json) {	
		var server_row_count = json.userLength;
		var local_count = localStorage.getItem("app_user_count");
		
		
		if ( local_count != server_row_count) {
			update_user();
		}else{
			alert("no updates");
		}
		
	}
});


/* user updates check end */
/*
function update_user(){
	
var name = "spine";
$.ajax({
	type: "POST",
	url: 'http://test.sedarspine.com/en/spineLogisticsApp/getUSerData',
	data :  'userid='+name,
	dataType:"json",
	processData: true,
	success:function (json) {
		var j=0;
		var ajaxlength = json.length;
	
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		
		db.transaction(function(tx){
			tx.executeSql('DROP TABLE IF EXISTS APPS_USER');
			tx.executeSql('CREATE TABLE IF NOT EXISTS APPS_USER (ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_COMP_CODE TEXT, USER_ID TEXT, USER_DESC TEXT, USER_PERS_CODE TEXT, USER_PASSWD TEXT, USER_PW_CHANGE_YN TEXT, USER_EMAIL TEXT, USER_OFFICE_PHONE TEXT, USER_HOME_PHONE TEXT, USER_CELL_PHONE TEXT, USER_IMAGE_BLOB TEXT, USER_IMAGE_FILE TEXT, USER_FROM_DT TEXT, USER_UPTO_DT TEXT, USER_LOGIN_FROM TEXT, USER_LOGIN_UPTO TEXT, USER_ACTIVE_YN TEXT, USER_LANG_CODE TEXT, USER_CR_UID TEXT, USER_CR_DT TEXT, USER_UPD_UID TEXT, USER_UPD_DT TEXT, USER_LOCN_CODE TEXT) ');
		//	tx.executeSql('CREATE UNIQUE INDEX `id_UNIQUE` ON `APPS_USER` (`ID` ASC)');
			for (var i = 0; i < ajaxlength; i++) {
				
				tx.executeSql('INSERT OR REPLACE INTO APPS_USER (USER_COMP_CODE, USER_ID, USER_DESC, USER_PERS_CODE, USER_PASSWD, USER_PW_CHANGE_YN, USER_EMAIL, USER_OFFICE_PHONE, USER_HOME_PHONE, USER_CELL_PHONE, USER_IMAGE_BLOB, USER_IMAGE_FILE, USER_FROM_DT, USER_UPTO_DT, USER_LOGIN_FROM, USER_LOGIN_UPTO, USER_ACTIVE_YN, USER_LANG_CODE, USER_CR_UID, USER_CR_DT, USER_UPD_UID, USER_UPD_DT, USER_LOCN_CODE) VALUES ("' + json[i].USER_COMP_CODE + '", "' + json[i].USER_ID + '", "' + json[i].USER_DESC + '", "' + json[i].USER_PERS_CODE + '", "' + json[i].USER_PASSWD + '", "' + json[i].USER_PW_CHANGE_YN + '", "' + json[i].USER_EMAIL + '", "' + json[i].USER_OFFICE_PHONE + '", "' + json[i].USER_HOME_PHONE + '", "' + json[i].USER_CELL_PHONE + '", "' + json[i].USER_IMAGE_BLOB + '", "' + json[i].USER_IMAGE_FILE + '", "' + json[i].USER_FROM_DT + '", "' + json[i].USER_UPTO_DT + '", "' + json[i].USER_LOGIN_FROM + '", "' + json[i].USER_LOGIN_UPTO + '", "' + json[i].USER_ACTIVE_YN + '", "' + json[i].USER_LANG_CODE + '", "' + json[i].USER_CR_UID + '", "' + json[i].USER_CR_DT + '", "' + json[i].USER_UPD_UID + '", "' + json[i].USER_UPD_DT + '", "' + json[i].USER_LOCN_CODE + '")', successID);
				j++;
				if(j==ajaxlength){
					
					alert('All data user updated');
					
				}
				
			}
		});
	}
});
}

function successID(){
	return true;
}



});

*/