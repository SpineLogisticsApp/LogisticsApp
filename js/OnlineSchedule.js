/* Get Schedule Online Value start */
function getJobDate()
{
	//$('body').addClass('loading').loader('show', { overlay: true });
	var currentDate = moment();
	var $id = moment(currentDate).format('DD-MMM-YYYY');
	var USER_ID = localStorage.getItem("user_id");
	var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
	$.ajax
	({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/getJobByDate",
		data: {id:$id,USER_ID:USER_ID,USER_COMP_CODE:USER_COMP_CODE},
		success: function (data)
		{
			if(data.length <= 219){
				alert("Currently No Job scheduled");
			}
			$("#SelectVehicle").html(data);
			$('.selectpicker').selectpicker('refresh');
			 var selectVal = document.getElementById("LSH_SYS_ID").value;
			 var ddlText = $("#LSH_SYS_ID option:selected").text();
			 //alert("Select->"+ddlText);
			 localStorage.setItem("SelectDate", ddlText);
			 getJobMeasure();
		}
	});    
} 
      		
function getJobMeasure(){
	var systemId = $("#LSH_SYS_ID").val();
	//alert(systemId);
	if(systemId!=''){
		$('body').addClass('loading').loader('show', { overlay: true });
		setTimeout(AddColor, 2000);
	}else{
		$('body').removeClass('loading').loader('hide');
		//alert("Currently No Job scheduled");
	}
	var vehicle = $('#LSH_SYS_ID').find(':selected').attr("data-vehicle");
	var team = $('#LSH_SYS_ID').find(':selected').attr("data-team");
	localStorage.setItem("Vehicle", vehicle);
	localStorage.setItem("Team", team);
	var USER_ID = localStorage.getItem("user_id");
	var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
	getTableStat(systemId);
	$("#LSH_VEHICLE_CODE").val(vehicle);
	$("#LSH_TEAM_CODE").val(team);
	$.ajax({
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingAjax',
		type: 'POST',
		data: {id:systemId,vehicleCode:vehicle,USER_COMP_CODE:USER_COMP_CODE,USER_ID:USER_ID},
		success: function (response)
		{
			//alert(response);
			localStorage.setItem("JobTable", response);
			localStorage.setItem("syncStatus","Yes");
			$("#RemoveResponsive").html(response);
			$('.selectpicker').selectpicker('refresh');
		}
	});
	
	
	$.ajax({
		type: "POST",
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingDataHead',
		data :{systemId:systemId},
		dataType:"json",
		async: false,
		success:function (json){
			var j=0;
			var ajaxlength = json.length;
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_SCHEDULE_HEAD');
				tx.executeSql('CREATE TABLE IF NOT EXISTS LOGI_T_SCHEDULE_HEAD (ID INTEGER PRIMARY KEY AUTOINCREMENT, LSH_SYS_ID INTEGER, LSH_COMP_CODE TEXT, LSH_LANG_CODE TEXT, LSH_TXN_CODE TEXT, LSH_TXN_NO TEXT, LSH_TXN_DT TEXT, LSH_DOC_REF TEXT, LSH_VEHICLE_CODE TEXT, LSH_TEAM_CODE TEXT, LSH_APPOINT_DT TEXT, LSH_DESC TEXT, LSH_STATUS TEXT, LSH_CR_DT TEXT, LSH_CR_UID TEXT, LSH_UPD_DT TEXT, LSH_UPD_UID TEXT, LSH_SEND_YN TEXT, LSH_SEND_DT TEXT, LSH_SEND_UID TEXT, LSH_APPROVE_YN TEXT, LSH_APPROVE_DT TEXT, LSH_APPROVE_UID TEXT, LSH_FLEX_01 TEXT, LSH_FLEX_02 TEXT, LSH_FLEX_03 TEXT, LSH_FLEX_04 TEXT, LSH_FLEX_05 TEXT, LSH_FLEX_06 TEXT, LSH_FLEX_07 TEXT, LSH_FLEX_08 TEXT, LSH_FLEX_09 TEXT, LSH_FLEX_10 TEXT, LSH_FLEX_11 TEXT, LSH_FLEX_12 TEXT, LSH_FLEX_13 TEXT, LSH_FLEX_14 TEXT, LSH_FLEX_15 TEXT, LSH_FLEX_16 TEXT, LSH_FLEX_17 TEXT, LSH_FLEX_18 TEXT, LSH_FLEX_19 TEXT, LSH_FLEX_20 TEXT, LSH_CITY_CODE TEXT, LSH_JOB_TOTAL INTEGER, LSH_JOB_COMPLETED INTEGER, LSH_JOB_RESCHEDULED INTEGER, LSH_JOB_CLOSED INTEGER, LSH_JOB_PENDING INTEGER) ');
				
				for (var i = 0; i < ajaxlength; i++) {
					tx.executeSql('INSERT OR REPLACE INTO LOGI_T_SCHEDULE_HEAD (LSH_SYS_ID, LSH_COMP_CODE, LSH_LANG_CODE, LSH_TXN_CODE, LSH_TXN_NO, LSH_TXN_DT, LSH_DOC_REF, LSH_VEHICLE_CODE, LSH_TEAM_CODE, LSH_APPOINT_DT, LSH_DESC, LSH_STATUS, LSH_CR_DT, LSH_CR_UID, LSH_UPD_DT, LSH_UPD_UID, LSH_SEND_YN, LSH_SEND_DT, LSH_SEND_UID, LSH_APPROVE_YN, LSH_APPROVE_DT, LSH_APPROVE_UID, LSH_FLEX_01, LSH_FLEX_02, LSH_FLEX_03, LSH_FLEX_04, LSH_FLEX_05, LSH_FLEX_06, LSH_FLEX_07, LSH_FLEX_08, LSH_FLEX_09, LSH_FLEX_10, LSH_FLEX_11, LSH_FLEX_12, LSH_FLEX_13, LSH_FLEX_14, LSH_FLEX_15, LSH_FLEX_16, LSH_FLEX_17, LSH_FLEX_18, LSH_FLEX_19, LSH_FLEX_20, LSH_CITY_CODE, LSH_JOB_TOTAL, LSH_JOB_COMPLETED, LSH_JOB_RESCHEDULED, LSH_JOB_CLOSED, LSH_JOB_PENDING) VALUES ("' + json[i].LSH_SYS_ID + '", "' + json[i].LSH_COMP_CODE + '", "' + json[i].LSH_LANG_CODE + '", "' + json[i].LSH_TXN_CODE + '", "' + json[i].LSH_TXN_NO + '", "' + json[i].LSH_TXN_DT + '", "' + json[i].LSH_DOC_REF + '", "' + json[i].LSH_VEHICLE_CODE + '", "' + json[i].LSH_TEAM_CODE + '", "' + json[i].LSH_APPOINT_DT + '", "' + json[i].LSH_DESC + '", "' + json[i].LSH_STATUS + '", "' + json[i].LSH_CR_DT + '", "' + json[i].LSH_CR_UID + '", "' + json[i].LSH_UPD_DT + '", "' + json[i].LSH_UPD_UID + '", "' + json[i].LSH_SEND_YN + '", "' + json[i].LSH_SEND_DT + '", "' + json[i].LSH_SEND_UID + '", "' + json[i].LSH_APPROVE_YN + '", "' + json[i].LSH_APPROVE_DT + '", "' + json[i].LSH_APPROVE_UID + '", "' + json[i].LSH_FLEX_01 + '", "' + json[i].LSH_FLEX_02 + '", "' + json[i].LSH_FLEX_03 + '", "' + json[i].LSH_FLEX_04 + '", "' + json[i].LSH_FLEX_05 + '", "' + json[i].LSH_FLEX_06 + '", "' + json[i].LSH_FLEX_07 + '", "' + json[i].LSH_FLEX_08 + '", "' + json[i].LSH_FLEX_09 + '", "' + json[i].LSH_FLEX_10 + '", "' + json[i].LSH_FLEX_11 + '", "' + json[i].LSH_FLEX_12 + '", "' + json[i].LSH_FLEX_13 + '", "' + json[i].LSH_FLEX_14 + '", "' + json[i].LSH_FLEX_15 + '", "' + json[i].LSH_FLEX_16 + '", "' + json[i].LSH_FLEX_17 + '", "' + json[i].LSH_FLEX_18 + '", "' + json[i].LSH_FLEX_19 + '", "' + json[i].LSH_FLEX_20 + '", "' + json[i].LSH_CITY_CODE + '", "' + json[i].LSH_JOB_TOTAL + '", "' + json[i].LSH_JOB_COMPLETED + '", "' + json[i].LSH_JOB_RESCHEDULED + '", "' + json[i].LSH_JOB_CLOSED + '", "' + json[i].LSH_JOB_PENDING + '")', successID);
					j++;
					if(j==ajaxlength){
						//alert('All Transaction Head data will be updated');
					}
					
				}
			});
		}

	});
	
	$.ajax({
		type: "POST",
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingDataLines',
		data :{systemId:systemId},
		dataType:"json",
		async: false,
		success:function (json) {
			var j=0;
			var ajaxlength = json.length;
			localStorage.setItem("lineLength", ajaxlength);
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_SCHEDULE_LINES');
				tx.executeSql('DROP TABLE IF EXISTS SelectedHeadDataValue');
				tx.executeSql('DROP TABLE IF EXISTS SelectedTreeDataValue');
				tx.executeSql('DROP TABLE IF EXISTS SelectedLineDataValue');
				tx.executeSql('DROP TABLE IF EXISTS SelectedImageDataValue');
				tx.executeSql('DROP TABLE IF EXISTS Live_Measure_Head');
				tx.executeSql('DROP TABLE IF EXISTS City_Desc');
				tx.executeSql('DROP TABLE IF EXISTS City_Desc_Head');
				tx.executeSql('CREATE TABLE IF NOT EXISTS LOGI_T_SCHEDULE_LINES (ID INTEGER PRIMARY KEY AUTOINCREMENT, LSL_SYS_ID INTEGER, LSL_LSH_SYS_ID INTEGER, LSL_COMP_CODE TEXT, LSL_LANG_CODE TEXT, LSL_TXN_DT TEXT, LSL_LINE TEXT, LSL_REF_SYS_ID TEXT, LSL_REF_TXN_TYPE TEXT, LSL_REF_TXN_CODE TEXT, LSL_REF_TXN_NO TEXT, LSL_REF_TXN_DT TEXT, LSL_LOCN_CODE TEXT, LSL_REQUESTED_BY TEXT, LSL_APPOINT_DT TEXT, LSL_CUST_AC_CODE TEXT, LSL_CUST_AC_DESC TEXT, LSL_ADD1 TEXT, LSL_ADD2 TEXT, LSL_ADD3 TEXT, LSL_ADD4 TEXT, LSL_CONTACT_PERSON TEXT, LSL_CONTACT_NO TEXT, LSL_CN_CODE TEXT, LSL_ST_CODE TEXT, LSL_CT_CODE TEXT, LSL_CT_AREA_CODE TEXT, LSL_POSTAL TEXT, LSL_MOBILE TEXT, LSL_PHONE TEXT, LSL_FAX TEXT, LSL_EMAIL TEXT, LSL_DESC TEXT, LSL_JOB_CODE TEXT, LSL_JOB_STATUS TEXT, LSL_RE_SCH_DT TEXT, LSL_RE_SCH_REASON TEXT, LSL_CR_DT TEXT, LSL_CR_UID TEXT, LSL_UPD_DT TEXT, LSL_UPD_UID TEXT, LSL_EX_REMARKS TEXT, LSL_EX_UID TEXT, LSL_EX_DT TEXT, LSL_FLEX_01 TEXT, LSL_FLEX_02 TEXT, LSL_FLEX_03 TEXT, LSL_FLEX_04 TEXT, LSL_FLEX_05 TEXT, LSL_FLEX_06 TEXT, LSL_FLEX_07 TEXT, LSL_FLEX_08 TEXT, LSL_FLEX_09 TEXT, LSL_FLEX_10 TEXT, LSL_FLEX_11 TEXT, LSL_FLEX_12 TEXT, LSL_FLEX_13 TEXT, LSL_FLEX_14 TEXT, LSL_FLEX_15 TEXT, LSL_FLEX_16 TEXT, LSL_FLEX_17 TEXT, LSL_FLEX_18 TEXT, LSL_FLEX_19 TEXT, LSL_FLEX_20 TEXT, LSL_SR_CODE TEXT,LSL_CUST_ID TEXT) ');
				for (var i = 0; i < ajaxlength; i++){
					tx.executeSql('INSERT OR REPLACE INTO LOGI_T_SCHEDULE_LINES ( LSL_SYS_ID, LSL_LSH_SYS_ID, LSL_COMP_CODE, LSL_LANG_CODE, LSL_TXN_DT, LSL_LINE, LSL_REF_SYS_ID, LSL_REF_TXN_TYPE, LSL_REF_TXN_CODE, LSL_REF_TXN_NO, LSL_REF_TXN_DT, LSL_LOCN_CODE, LSL_REQUESTED_BY, LSL_APPOINT_DT, LSL_CUST_AC_CODE, LSL_CUST_AC_DESC, LSL_ADD1, LSL_ADD2, LSL_ADD3, LSL_ADD4 , LSL_CONTACT_PERSON, LSL_CONTACT_NO, LSL_CN_CODE, LSL_ST_CODE, LSL_CT_CODE, LSL_CT_AREA_CODE, LSL_POSTAL, LSL_MOBILE, LSL_PHONE, LSL_FAX, LSL_EMAIL, LSL_DESC, LSL_JOB_CODE, LSL_JOB_STATUS, LSL_RE_SCH_DT, LSL_RE_SCH_REASON, LSL_CR_DT, LSL_CR_UID, LSL_UPD_DT, LSL_UPD_UID, LSL_EX_REMARKS, LSL_EX_UID, LSL_EX_DT, LSL_FLEX_01, LSL_FLEX_02, LSL_FLEX_03, LSL_FLEX_04, LSL_FLEX_05, LSL_FLEX_06, LSL_FLEX_07, LSL_FLEX_08, LSL_FLEX_09, LSL_FLEX_10, LSL_FLEX_11, LSL_FLEX_12, LSL_FLEX_13, LSL_FLEX_14, LSL_FLEX_15, LSL_FLEX_16, LSL_FLEX_17, LSL_FLEX_18, LSL_FLEX_19, LSL_FLEX_20, LSL_SR_CODE,LSL_CUST_ID) VALUES ("' + json[i].LSL_SYS_ID + '", "' + json[i].LSL_LSH_SYS_ID + '", "' + json[i].LSL_COMP_CODE + '", "' + json[i].LSL_LANG_CODE + '", "' + json[i].LSL_TXN_DT + '", "' + json[i].LSL_LINE + '", "' + json[i].LSL_REF_SYS_ID + '", "' + json[i].LSL_REF_TXN_TYPE + '", "' + json[i].LSL_REF_TXN_CODE + '", "' + json[i].LSL_REF_TXN_NO + '", "' + json[i].LSL_REF_TXN_DT + '", "' + json[i].LSL_LOCN_CODE + '", "' + json[i].LSL_REQUESTED_BY + '", "' + json[i].LSL_APPOINT_DT + '", "' + json[i].LSL_CUST_AC_CODE + '", "' + json[i].LSL_CUST_AC_DESC + '", "' + json[i].LSL_ADD1 + '", "' + json[i].LSL_ADD2 + '", "' + json[i].LSL_ADD3 + '", "' + json[i].LSL_ADD4 + '", "' + json[i].LSL_CONTACT_PERSON + '", "' + json[i].LSL_CONTACT_NO + '", "' + json[i].LSL_CN_CODE + '", "' + json[i].LSL_ST_CODE + '", "' + json[i].LSL_CT_CODE + '", "' + json[i].LSL_CT_AREA_CODE + '", "' + json[i].LSL_POSTAL + '", "' + json[i].LSL_MOBILE + '", "' + json[i].LSL_PHONE + '", "' + json[i].LSL_FAX + '", "' + json[i].LSL_EMAIL + '", "' + json[i].LSL_DESC + '", "' + json[i].LSL_JOB_CODE + '", "' + json[i].LSL_JOB_STATUS + '", "' + json[i].LSL_RE_SCH_DT + '", "' + json[i].LSL_RE_SCH_REASON + '", "' + json[i].LSL_CR_DT + '", "' + json[i].LSL_CR_UID + '", "' + json[i].LSL_UPD_DT + '", "' + json[i].LSL_UPD_UID + '", "' + json[i].LSL_EX_REMARKS + '", "' + json[i].LSL_EX_UID + '", "' + json[i].LSL_EX_DT + '", "' + json[i].LSL_FLEX_01 + '", "' + json[i].LSL_FLEX_02 + '", "' + json[i].LSL_FLEX_03 + '", "' + json[i].LSL_FLEX_04 + '", "' + json[i].LSL_FLEX_05 + '", "' + json[i].LSL_FLEX_06 + '", "' + json[i].LSL_FLEX_07 + '", "' + json[i].LSL_FLEX_08 + '", "' + json[i].LSL_FLEX_09 + '", "' + json[i].LSL_FLEX_10 + '", "' + json[i].LSL_FLEX_11 + '", "' + json[i].LSL_FLEX_12 + '", "' + json[i].LSL_FLEX_13 + '", "' + json[i].LSL_FLEX_14 + '", "' + json[i].LSL_FLEX_15 + '", "' + json[i].LSL_FLEX_16 + '", "' + json[i].LSL_FLEX_17 + '", "' + json[i].LSL_FLEX_18 + '", "' + json[i].LSL_FLEX_19 + '", "' + json[i].LSL_FLEX_20 + '", "' + json[i].LSL_SR_CODE + '","' + json[i].LSL_CUST_ID + '")', successID);
					//alert("lsl->"+json[i].LSL_SYS_ID);
					getMeasureHeadData(json[i].LSL_SYS_ID);
					getMeasureRefData(json[i].LSL_SYS_ID);
					j++;
					if(j==ajaxlength){
						//alert('All Transaction Line data will be updated');
						$('body').removeClass('loading').loader('hide');
					}
				}
			});
		}

	});
	
	function successID(){
		return true;
	}
	
	 
	
}
function getMeasureHeadData(LSL_SYS_ID){
	//$('body').addClass('loading').loader('show', { overlay: true });
	$.ajax({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedMeasureHeadValue",
		data: {LSL_SYS_ID:LSL_SYS_ID},
		dataType : 'json',
		async: false,
		success: function (json)
		{	
			//alert(json);
			if(json==null){
				//alert("Null");
				//$('body').removeClass('loading').loader('hide');
			}else if(json ==0){
				//alert("000");
			}else{
				var length = json.length;
				//alert("head length-"+length);
				var j = 0;
				var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
				db.transaction(function(tx){
					tx.executeSql('CREATE TABLE IF NOT EXISTS SelectedHeadDataValue (MH_SYS_ID INTEGER , MH_COMP_CODE TEXT, MH_LANG_CODE TEXT,MH_TXN_CODE TEXT, MH_TXN_NO TEXT, MH_TXN_DT TEXT,MH_DOC_REF TEXT, MH_LOCN_CODE TEXT, MH_SR_CODE TEXT,MH_REF_SYS_ID INTEGER, MH_REF_TXN_CODE TEXT, MH_REF_TXN_NO TEXT,MH_REF_TXN_DT TEXT, MH_SALE_REF_SYS_ID TEXT, MH_SALE_REF_TXN_CODE TEXT,MH_SALE_REF_TXN_NO TEXT, MH_SALE_REF_TXN_DT TEXT, MH_CONTACT_NO TEXT,MH_CONTACT_PERSON TEXT, MH_CUST_TYPE TEXT, MH_CUST_AC_CODE TEXT,MH_CUST_AC_DESC TEXT, MH_ADD1 TEXT, MH_ADD2 TEXT, MH_ADD3 TEXT, MH_ADD4 TEXT, MH_CN_CODE TEXT, MH_ST_CODE TEXT, MH_CT_CODE TEXT, MH_CT_AR_CODE TEXT, MH_POSTAL TEXT, MH_MOBILE TEXT, MH_PHONE TEXT, MH_FAX TEXT, MH_EMAIL TEXT, MH_DESC TEXT, MH_STATUS TEXT, MH_APPOINT_DT TEXT, MH_CR_DT TEXT, MH_CR_UID TEXT, MH_UPD_DT TEXT, MH_UPD_UID TEXT, MH_SEND_YN TEXT, MH_SEND_DT TEXT, MH_SEND_UID TEXT, MH_APPROVE_YN TEXT, MH_APPROVE_DT TEXT, MH_APPROVE_UID TEXT, MH_FLEX_01 TEXT, MH_FLEX_02 TEXT, MH_FLEX_03 TEXT, MH_FLEX_04 TEXT, MH_FLEX_05 TEXT, MH_FLEX_06 TEXT, MH_FLEX_07 TEXT, MH_FLEX_08 TEXT, MH_FLEX_09 TEXT, MH_FLEX_10 TEXT, MH_FLEX_11 TEXT, MH_FLEX_12 TEXT, MH_FLEX_13 TEXT, MH_FLEX_14 TEXT, MH_FLEX_15 TEXT, MH_FLEX_16 TEXT, MH_FLEX_17 TEXT, MH_FLEX_18 TEXT, MH_FLEX_19 TEXT, MH_FLEX_20 TEXT) ');
					tx.executeSql('CREATE TABLE IF NOT EXISTS Live_Measure_Head (MH_SYS_ID INTEGER , MH_COMP_CODE TEXT, MH_LANG_CODE TEXT,MH_TXN_CODE TEXT, MH_TXN_NO TEXT, MH_TXN_DT TEXT,MH_DOC_REF TEXT, MH_LOCN_CODE TEXT, MH_SR_CODE TEXT,MH_REF_SYS_ID INTEGER, MH_REF_TXN_CODE TEXT, MH_REF_TXN_NO TEXT,MH_REF_TXN_DT TEXT, MH_SALE_REF_SYS_ID TEXT, MH_SALE_REF_TXN_CODE TEXT,MH_SALE_REF_TXN_NO TEXT, MH_SALE_REF_TXN_DT TEXT, MH_CONTACT_NO TEXT,MH_CONTACT_PERSON TEXT, MH_CUST_TYPE TEXT, MH_CUST_AC_CODE TEXT,MH_CUST_AC_DESC TEXT, MH_ADD1 TEXT, MH_ADD2 TEXT, MH_ADD3 TEXT, MH_ADD4 TEXT, MH_CN_CODE TEXT, MH_ST_CODE TEXT, MH_CT_CODE TEXT, MH_CT_AR_CODE TEXT, MH_POSTAL TEXT, MH_MOBILE TEXT, MH_PHONE TEXT, MH_FAX TEXT, MH_EMAIL TEXT, MH_DESC TEXT, MH_STATUS TEXT, MH_APPOINT_DT TEXT, MH_CR_DT TEXT, MH_CR_UID TEXT, MH_UPD_DT TEXT, MH_UPD_UID TEXT, MH_SEND_YN TEXT, MH_SEND_DT TEXT, MH_SEND_UID TEXT, MH_APPROVE_YN TEXT, MH_APPROVE_DT TEXT, MH_APPROVE_UID TEXT, MH_FLEX_01 TEXT, MH_FLEX_02 TEXT, MH_FLEX_03 TEXT, MH_FLEX_04 TEXT, MH_FLEX_05 TEXT, MH_FLEX_06 TEXT, MH_FLEX_07 TEXT, MH_FLEX_08 TEXT, MH_FLEX_09 TEXT, MH_FLEX_10 TEXT, MH_FLEX_11 TEXT, MH_FLEX_12 TEXT, MH_FLEX_13 TEXT, MH_FLEX_14 TEXT, MH_FLEX_15 TEXT, MH_FLEX_16 TEXT, MH_FLEX_17 TEXT, MH_FLEX_18 TEXT, MH_FLEX_19 TEXT, MH_FLEX_20 TEXT) ');
					for (var i = 0; i < length; i++) {
						tx.executeSql('INSERT OR REPLACE INTO SelectedHeadDataValue (MH_SYS_ID , MH_COMP_CODE , MH_LANG_CODE ,MH_TXN_CODE , MH_TXN_NO , MH_TXN_DT ,MH_DOC_REF , MH_LOCN_CODE , MH_SR_CODE ,MH_REF_SYS_ID , MH_REF_TXN_CODE , MH_REF_TXN_NO ,MH_REF_TXN_DT , MH_SALE_REF_SYS_ID , MH_SALE_REF_TXN_CODE ,MH_SALE_REF_TXN_NO , MH_SALE_REF_TXN_DT , MH_CONTACT_NO ,MH_CONTACT_PERSON , MH_CUST_TYPE , MH_CUST_AC_CODE ,MH_CUST_AC_DESC , MH_ADD1 , MH_ADD2 , MH_ADD3 , MH_ADD4 , MH_CN_CODE , MH_ST_CODE , MH_CT_CODE , MH_CT_AR_CODE , MH_POSTAL , MH_MOBILE , MH_PHONE , MH_FAX , MH_EMAIL , MH_DESC , MH_STATUS , MH_APPOINT_DT , MH_CR_DT , MH_CR_UID , MH_UPD_DT , MH_UPD_UID , MH_SEND_YN , MH_SEND_DT , MH_SEND_UID , MH_APPROVE_YN , MH_APPROVE_DT , MH_APPROVE_UID , MH_FLEX_01 , MH_FLEX_02 , MH_FLEX_03 , MH_FLEX_04 , MH_FLEX_05 , MH_FLEX_06 , MH_FLEX_07 , MH_FLEX_08 , MH_FLEX_09 , MH_FLEX_10 , MH_FLEX_11 , MH_FLEX_12 , MH_FLEX_13 , MH_FLEX_14 , MH_FLEX_15 , MH_FLEX_16 , MH_FLEX_17 , MH_FLEX_18 , MH_FLEX_19 , MH_FLEX_20) VALUES ("' + json[i].MH_SYS_ID+ '" , "' + json[i].MH_COMP_CODE + '", "' + json[i].MH_LANG_CODE + '", "' + json[i].MH_TXN_CODE + '", "' + json[i].MH_TXN_NO + '",  "' + json[i].MH_TXN_DT + '", "' + json[i].MH_DOC_REF + '",  "' + json[i].MH_LOCN_CODE + '",  "' + json[i].MH_SR_CODE + '", "' + json[i].MH_REF_SYS_ID + '",  "' + json[i].MH_REF_TXN_CODE + '",  "' + json[i].MH_REF_TXN_NO + '", "' + json[i].MH_REF_TXN_DT + '",  "' + json[i].MH_SALE_REF_SYS_ID + '",  "' + json[i].MH_SALE_REF_TXN_CODE + '", "' + json[i].MH_SALE_REF_TXN_NO + '",  "' + json[i].MH_SALE_REF_TXN_DT + '",  "' + json[i].MH_CONTACT_NO + '", "' + json[i].MH_CONTACT_PERSON + '",  "' + json[i].MH_CUST_TYPE + '",  "' + json[i].MH_CUST_AC_CODE + '", "' + json[i].MH_CUST_AC_DESC + '",  "' + json[i].MH_ADD1 + '",  "' + json[i].MH_ADD2 + '",  "' + json[i].MH_ADD3 + '",  "' + json[i].MH_ADD4 + '",  "' + json[i].MH_CN_CODE + '",  "' + json[i].MH_ST_CODE + '",  "' + json[i].MH_CT_CODE + '",  "' + json[i].MH_CT_AR_CODE + '",  "' + json[i].MH_POSTAL + '",  "' + json[i].MH_MOBILE + '",  "' + json[i].MH_PHONE + '",  "' + json[i].MH_FAX + '",  "' + json[i].MH_EMAIL + '",  "' + json[i].MH_DESC + '",  "' + json[i].MH_STATUS + '",  "' + json[i].MH_APPOINT_DT + '",  "' + json[i].MH_CR_DT + '",  "' + json[i].MH_CR_UID + '",  "' + json[i].MH_UPD_DT + '",  "' + json[i].MH_UPD_UID + '",  "' + json[i].MH_SEND_YN + '",  "' + json[i].MH_SEND_DT + '",  "' + json[i].MH_SEND_UID + '",  "' + json[i].MH_APPROVE_YN + '",  "' + json[i].MH_APPROVE_DT + '",  "' + json[i].MH_APPROVE_UID + '",  "' + json[i].MH_FLEX_01 + '",  "' + json[i].MH_FLEX_02 + '",  "' + json[i].MH_FLEX_03 + '",  "' + json[i].MH_FLEX_04 + '",  "' + json[i].MH_FLEX_05 + '",  "' + json[i].MH_FLEX_06 + '",  "' + json[i].MH_FLEX_07 + '",  "' + json[i].MH_FLEX_08 + '",  "' + json[i].MH_FLEX_09 + '",  "' + json[i].MH_FLEX_10 + '",  "' + json[i].MH_FLEX_11 + '",  "' + json[i].MH_FLEX_12 + '",  "' + json[i].MH_FLEX_13 + '",  "' + json[i].MH_FLEX_14 + '",  "' + json[i].MH_FLEX_15 + '",  "' + json[i].MH_FLEX_16 + '",  "' + json[i].MH_FLEX_17 + '",  "' + json[i].MH_FLEX_18 + '",  "' + json[i].MH_FLEX_19 + '",  "' + json[i].MH_FLEX_20+ '" )', successID);
						tx.executeSql('INSERT OR REPLACE INTO Live_Measure_Head (MH_SYS_ID , MH_COMP_CODE , MH_LANG_CODE ,MH_TXN_CODE , MH_TXN_NO , MH_TXN_DT ,MH_DOC_REF , MH_LOCN_CODE , MH_SR_CODE ,MH_REF_SYS_ID , MH_REF_TXN_CODE , MH_REF_TXN_NO ,MH_REF_TXN_DT , MH_SALE_REF_SYS_ID , MH_SALE_REF_TXN_CODE ,MH_SALE_REF_TXN_NO , MH_SALE_REF_TXN_DT , MH_CONTACT_NO ,MH_CONTACT_PERSON , MH_CUST_TYPE , MH_CUST_AC_CODE ,MH_CUST_AC_DESC , MH_ADD1 , MH_ADD2 , MH_ADD3 , MH_ADD4 , MH_CN_CODE , MH_ST_CODE , MH_CT_CODE , MH_CT_AR_CODE , MH_POSTAL , MH_MOBILE , MH_PHONE , MH_FAX , MH_EMAIL , MH_DESC , MH_STATUS , MH_APPOINT_DT , MH_CR_DT , MH_CR_UID , MH_UPD_DT , MH_UPD_UID , MH_SEND_YN , MH_SEND_DT , MH_SEND_UID , MH_APPROVE_YN , MH_APPROVE_DT , MH_APPROVE_UID , MH_FLEX_01 , MH_FLEX_02 , MH_FLEX_03 , MH_FLEX_04 , MH_FLEX_05 , MH_FLEX_06 , MH_FLEX_07 , MH_FLEX_08 , MH_FLEX_09 , MH_FLEX_10 , MH_FLEX_11 , MH_FLEX_12 , MH_FLEX_13 , MH_FLEX_14 , MH_FLEX_15 , MH_FLEX_16 , MH_FLEX_17 , MH_FLEX_18 , MH_FLEX_19 , MH_FLEX_20) VALUES ("' + json[i].MH_SYS_ID+ '" , "' + json[i].MH_COMP_CODE + '", "' + json[i].MH_LANG_CODE + '", "' + json[i].MH_TXN_CODE + '", "' + json[i].MH_TXN_NO + '",  "' + json[i].MH_TXN_DT + '", "' + json[i].MH_DOC_REF + '",  "' + json[i].MH_LOCN_CODE + '",  "' + json[i].MH_SR_CODE + '", "' + json[i].MH_REF_SYS_ID + '",  "' + json[i].MH_REF_TXN_CODE + '",  "' + json[i].MH_REF_TXN_NO + '", "' + json[i].MH_REF_TXN_DT + '",  "' + json[i].MH_SALE_REF_SYS_ID + '",  "' + json[i].MH_SALE_REF_TXN_CODE + '", "' + json[i].MH_SALE_REF_TXN_NO + '",  "' + json[i].MH_SALE_REF_TXN_DT + '",  "' + json[i].MH_CONTACT_NO + '", "' + json[i].MH_CONTACT_PERSON + '",  "' + json[i].MH_CUST_TYPE + '",  "' + json[i].MH_CUST_AC_CODE + '", "' + json[i].MH_CUST_AC_DESC + '",  "' + json[i].MH_ADD1 + '",  "' + json[i].MH_ADD2 + '",  "' + json[i].MH_ADD3 + '",  "' + json[i].MH_ADD4 + '",  "' + json[i].MH_CN_CODE + '",  "' + json[i].MH_ST_CODE + '",  "' + json[i].MH_CT_CODE + '",  "' + json[i].MH_CT_AR_CODE + '",  "' + json[i].MH_POSTAL + '",  "' + json[i].MH_MOBILE + '",  "' + json[i].MH_PHONE + '",  "' + json[i].MH_FAX + '",  "' + json[i].MH_EMAIL + '",  "' + json[i].MH_DESC + '",  "' + json[i].MH_STATUS + '",  "' + json[i].MH_APPOINT_DT + '",  "' + json[i].MH_CR_DT + '",  "' + json[i].MH_CR_UID + '",  "' + json[i].MH_UPD_DT + '",  "' + json[i].MH_UPD_UID + '",  "' + json[i].MH_SEND_YN + '",  "' + json[i].MH_SEND_DT + '",  "' + json[i].MH_SEND_UID + '",  "' + json[i].MH_APPROVE_YN + '",  "' + json[i].MH_APPROVE_DT + '",  "' + json[i].MH_APPROVE_UID + '",  "' + json[i].MH_FLEX_01 + '",  "' + json[i].MH_FLEX_02 + '",  "' + json[i].MH_FLEX_03 + '",  "' + json[i].MH_FLEX_04 + '",  "' + json[i].MH_FLEX_05 + '",  "' + json[i].MH_FLEX_06 + '",  "' + json[i].MH_FLEX_07 + '",  "' + json[i].MH_FLEX_08 + '",  "' + json[i].MH_FLEX_09 + '",  "' + json[i].MH_FLEX_10 + '",  "' + json[i].MH_FLEX_11 + '",  "' + json[i].MH_FLEX_12 + '",  "' + json[i].MH_FLEX_13 + '",  "' + json[i].MH_FLEX_14 + '",  "' + json[i].MH_FLEX_15 + '",  "' + json[i].MH_FLEX_16 + '",  "' + json[i].MH_FLEX_17 + '",  "' + json[i].MH_FLEX_18 + '",  "' + json[i].MH_FLEX_19 + '",  "' + json[i].MH_FLEX_20+ '" )', successID);
						//alert(json[i].MH_SYS_ID);
						getMeasureTreeData(json[i].MH_SYS_ID);
						//getMeasureLineData(json[i].MH_SYS_ID);
						//getMeasureImageData(json[i].MH_SYS_ID);
						j++;
						/*
						if(j==length){
							alert("Success");
							tx.executeSql('SELECT * FROM Live_Measure_Head ', [], function (tx, results1) {
								var treeHeadIdlength=results1.rows.length;
								alert(treeHeadIdlength+"<----Headlength")
								for (var i=0;i<treeHeadIdlength;i++){
									prompt("head",JSON.stringify(results1.rows.item(i)));
								}
							});
						}*/
					}
				});
			}
			 
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		}
	}); 

	function getMeasureTreeData(MH_SYS_ID){
		$.ajax({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedMeasureTreeValue",
		data: {MH_SYS_ID:MH_SYS_ID},
		dataType : 'json',
		async: false,
		success: function (json)
		{	
			 var length = json.length;
			 //alert("TreeLength->"+length);
			 var j = 0;
			 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			 db.transaction(function(tx){
				tx.executeSql('CREATE TABLE IF NOT EXISTS SelectedTreeDataValue (MT_MH_SYS_ID INTEGER , MT_COMP_CODE TEXT, MT_LANG_CODE TEXT,MT_SYS_ID TEXT, MT_DESC TEXT, MT_PARENT_SYS_ID TEXT,MT_LEVEL_ID TEXT, MT_LEVEL_TYPE TEXT, MT_BUILD_TYPE TEXT,MT_CR_DT TEXT, MT_CR_UID TEXT, MT_UPD_DT TEXT,MT_UPD_UID TEXT) ');
				for (var i = 0; i < length; i++) {
					tx.executeSql('INSERT OR REPLACE INTO SelectedTreeDataValue (MT_MH_SYS_ID , MT_COMP_CODE , MT_LANG_CODE ,MT_SYS_ID , MT_DESC , MT_PARENT_SYS_ID ,MT_LEVEL_ID , MT_LEVEL_TYPE , MT_BUILD_TYPE ,MT_CR_DT , MT_CR_UID , MT_UPD_DT ,MT_UPD_UID) VALUES ("' + json[i].MT_MH_SYS_ID+ '" , "' + json[i].MT_COMP_CODE + '", "' + json[i].MT_LANG_CODE + '", "' + json[i].MT_SYS_ID + '", "' + json[i].MT_DESC + '",  "' + json[i].MT_PARENT_SYS_ID + '", "' + json[i].MT_LEVEL_ID + '",  "' + json[i].MT_LEVEL_TYPE + '",  "' + json[i].MT_BUILD_TYPE + '", "' + json[i].MT_CR_DT + '",  "' + json[i].MT_CR_UID + '",  "' + json[i].MT_UPD_DT + '", "' + json[i].MT_UPD_UID + '")', successID);
					
					j++;
					if(j==length){
						//alert("Tree Success"+);
						/*alert("Success");
							tx.executeSql('SELECT * FROM SelectedTreeDataValue ', [], function (tx, results1) {
								var treeHeadIdlength=results1.rows.length;
								alert(treeHeadIdlength+"<----Treelength")
								for (var i=0;i<treeHeadIdlength;i++){
									prompt("Tree",JSON.stringify(results1.rows.item(i)));
								}
							}); */
						getMeasureLineData(MH_SYS_ID);
						
					}
				}
			});
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		}
	});
	}
	
	function getMeasureLineData(MH_SYS_ID){
		//alert("id"+MT_SYS_ID);
		$.ajax({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedMeasureLineValue",
		data: {MH_SYS_ID:MH_SYS_ID},
		dataType : 'json',
		async: false,
		success: function (json)
		{	
			 var length = json.length;
			 //alert("LineLength->"+length);
			 var j = 0;
			 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			 db.transaction(function(tx){
				tx.executeSql('CREATE TABLE IF NOT EXISTS SelectedLineDataValue (ML_SYS_ID INTEGER,ML_MH_SYS_ID INTEGER,ML_COMP_CODE TEXT,ML_LANG_CODE TEXT,ML_TXN_DT TEXT,ML_LOCN_CODE TEXT,ML_LINE INTEGER,ML_BUILD TEXT,ML_FLOOR TEXT,ML_FLAT TEXT,ML_UNIT TEXT,ML_PRODUCT_CODE TEXT,ML_COLOR_CODE TEXT,ML_WIDTH INTEGER,ML_HEIGHT INTEGER,ML_QTY INTEGER,ML_MOUNT_TYPE TEXT,ML_MOUNT_ON TEXT,ML_OPERATE TEXT,ML_CONTROL TEXT,ML_OPENING TEXT,ML_DESIGN_YN TEXT,ML_DESIGN_WIDTH INTEGER,ML_DESIGN_HEIGHT INTEGER,ML_REMARKS TEXT,ML_GEO_LATI TEXT,ML_GEO_LONGI TEXT,ML_CR_DT TEXT,ML_CR_UID TEXT,ML_UPD_DT TEXT,ML_UPD_UID TEXT,ML_CLOSE_YN TEXT,ML_CLOSE_DT TEXT,ML_CLOSE_UID TEXT,ML_FLEX_01 TEXT,ML_FLEX_02 TEXT,ML_FLEX_03 TEXT,ML_FLEX_04 TEXT,ML_FLEX_05 TEXT,ML_FLEX_06 TEXT,ML_FLEX_07 TEXT,ML_FLEX_08 TEXT,ML_FLEX_09 TEXT,ML_FLEX_10 TEXT,ML_FLEX_11 TEXT,ML_FLEX_12 TEXT,ML_FLEX_13 TEXT,ML_FLEX_14 TEXT,ML_FLEX_15 TEXT,ML_FLEX_16 TEXT,ML_FLEX_17 TEXT,ML_FLEX_18 TEXT,ML_FLEX_19 TEXT,ML_FLEX_20 TEXT,ML_OP_HEAD_SYS_ID INTEGER,ML_SC_LINE_SYS_ID INTEGER,ML_QT_LINE_SYS_ID INTEGER,ML_SO_LINE_SYS_ID INTEGER,ML_WO_LINE_SYS_ID INTEGER,ML_PR_LINE_SYS_ID INTEGER,ML_DN_LINE_SYS_ID INTEGER,ML_IN_LINE_SYS_ID INTEGER,ML_SR_LINE_SYS_ID INTEGER,ML_FULL_WIDTH INTEGER,ML_FULL_HEIGHT INTEGER,ML_LEFT_WALL INTEGER,ML_RIGHT_WALL INTEGER,ML_CEILING_UP INTEGER,ML_FLOOR_DOWN INTEGER,ML_WINDOW_DEPTH INTEGER,ML_WINDOW_OPENING TEXT,ML_HANDLE_POSITION TEXT,ML_HANDLE_SIZE INTEGER,ML_POWER_DISTANCE TEXT,ML_GYPSUM_YN TEXT,ML_GYPSUM_WIDTH INTEGER,ML_GYPSUM_HEIGHT INTEGER,ML_GYPSUM_DEPTH INTEGER,ML_BULD_TYPE TEXT,ML_ROOM_NO TEXT,ML_WINDOW_NO INTEGER,ML_POWER_SIDE TEXT,ML_SITE_READY_YN TEXT,ML_WINDOW_TYPE TEXT,ML_DOME_HEIGHT INTEGER,ML_CORNER_DEGREE INTEGER,ML_CORVE_DEPTH INTEGER,ML_PARTITIONED_WINDOW_YN TEXT,ML_NO_OF_PARTITION INTEGER,ML_PARTITION_01_WIDTH INTEGER,ML_PARTITION_02_WIDTH INTEGER,ML_PARTITION_03_WIDTH INTEGER,ML_PARTITION_04_WIDTH INTEGER,ML_PARTITION_05_WIDTH INTEGER,ML_PARTITION_06_WIDTH INTEGER,ML_PARTITION_07_WIDTH INTEGER,ML_PARTITION_08_WIDTH INTEGER,ML_PARTITION_09_WIDTH INTEGER,ML_PARTITION_10_WIDTH INTEGER,ML_DESIGN_DEPTH INTEGER)');
				for (var i = 0; i < length; i++) {
					tx.executeSql('INSERT OR REPLACE INTO SelectedLineDataValue (ML_SYS_ID ,ML_MH_SYS_ID ,ML_COMP_CODE ,ML_LANG_CODE ,ML_TXN_DT ,ML_LOCN_CODE ,ML_LINE ,ML_BUILD ,ML_FLOOR ,ML_FLAT ,ML_UNIT ,ML_PRODUCT_CODE ,ML_COLOR_CODE ,ML_WIDTH ,ML_HEIGHT ,ML_QTY ,ML_MOUNT_TYPE ,ML_MOUNT_ON ,ML_OPERATE ,ML_CONTROL ,ML_OPENING ,ML_DESIGN_YN ,ML_DESIGN_WIDTH ,ML_DESIGN_HEIGHT ,ML_REMARKS ,ML_GEO_LATI ,ML_GEO_LONGI ,ML_CR_DT ,ML_CR_UID ,ML_UPD_DT ,ML_UPD_UID ,ML_CLOSE_YN ,ML_CLOSE_DT ,ML_CLOSE_UID ,ML_FLEX_01 ,ML_FLEX_02 ,ML_FLEX_03 ,ML_FLEX_04 ,ML_FLEX_05 ,ML_FLEX_06 ,ML_FLEX_07 ,ML_FLEX_08 ,ML_FLEX_09 ,ML_FLEX_10 ,ML_FLEX_11 ,ML_FLEX_12 ,ML_FLEX_13 ,ML_FLEX_14 ,ML_FLEX_15 ,ML_FLEX_16 ,ML_FLEX_17 ,ML_FLEX_18 ,ML_FLEX_19 ,ML_FLEX_20 ,ML_OP_HEAD_SYS_ID ,ML_SC_LINE_SYS_ID ,ML_QT_LINE_SYS_ID ,ML_SO_LINE_SYS_ID ,ML_WO_LINE_SYS_ID ,ML_PR_LINE_SYS_ID ,ML_DN_LINE_SYS_ID ,ML_IN_LINE_SYS_ID ,ML_SR_LINE_SYS_ID ,ML_FULL_WIDTH ,ML_FULL_HEIGHT ,ML_LEFT_WALL ,ML_RIGHT_WALL ,ML_CEILING_UP ,ML_FLOOR_DOWN ,ML_WINDOW_DEPTH ,ML_WINDOW_OPENING ,ML_HANDLE_POSITION ,ML_HANDLE_SIZE ,ML_POWER_DISTANCE ,ML_GYPSUM_YN ,ML_GYPSUM_WIDTH ,ML_GYPSUM_HEIGHT ,ML_GYPSUM_DEPTH ,ML_BULD_TYPE ,ML_ROOM_NO ,ML_WINDOW_NO ,ML_POWER_SIDE ,ML_SITE_READY_YN ,ML_WINDOW_TYPE ,ML_DOME_HEIGHT ,ML_CORNER_DEGREE ,ML_CORVE_DEPTH ,ML_PARTITIONED_WINDOW_YN ,ML_NO_OF_PARTITION ,ML_PARTITION_01_WIDTH ,ML_PARTITION_02_WIDTH ,ML_PARTITION_03_WIDTH ,ML_PARTITION_04_WIDTH ,ML_PARTITION_05_WIDTH ,ML_PARTITION_06_WIDTH ,ML_PARTITION_07_WIDTH ,ML_PARTITION_08_WIDTH ,ML_PARTITION_09_WIDTH ,ML_PARTITION_10_WIDTH ,ML_DESIGN_DEPTH) VALUES ("' + json[i].ML_SYS_ID+ '" ,"' + json[i].ML_MH_SYS_ID+ '" ,"' + json[i].ML_COMP_CODE+ '" ,"' + json[i].ML_LANG_CODE+ '" ,"' + json[i].ML_TXN_DT+ '" ,"' + json[i].ML_LOCN_CODE+ '" ,"' + json[i].ML_LINE+ '" ,"' + json[i].ML_BUILD+ '" ,"' + json[i].ML_FLOOR+ '" ,"' + json[i].ML_FLAT+ '" ,"' + json[i].ML_UNIT+ '" ,"' + json[i].ML_PRODUCT_CODE+ '" ,"' + json[i].ML_COLOR_CODE+ '" ,"' + json[i].ML_WIDTH+ '" ,"' + json[i].ML_HEIGHT+ '" ,"' + json[i].ML_QTY+ '" ,"' + json[i].ML_MOUNT_TYPE+ '" ,"' + json[i].ML_MOUNT_ON+ '" ,"' + json[i].ML_OPERATE+ '" ,"' + json[i].ML_CONTROL+ '" ,"' + json[i].ML_OPENING+ '" ,"' + json[i].ML_DESIGN_YN+ '" ,"' + json[i].ML_DESIGN_WIDTH+ '" ,"' + json[i].ML_DESIGN_HEIGHT+ '" ,"' + json[i].ML_REMARKS+ '" ,"' + json[i].ML_GEO_LATI+ '" ,"' + json[i].ML_GEO_LONGI+ '" ,"' + json[i].ML_CR_DT +'","' + json[i].ML_CR_UID+ '" ,"' + json[i].ML_UPD_DT +'","' + json[i].ML_UPD_UID+ '" ,"' + json[i].ML_CLOSE_YN+ '" ,"' + json[i].ML_CLOSE_DT +'","' + json[i].ML_CLOSE_UID+ '" ,"' + json[i].ML_FLEX_01+ '" ,"' + json[i].ML_FLEX_02+ '" ,"' + json[i].ML_FLEX_03+ '" ,"' + json[i].ML_FLEX_04+ '" ,"' + json[i].ML_FLEX_05+ '" ,"' + json[i].ML_FLEX_06+ '" ,"' + json[i].ML_FLEX_07+ '" ,"' + json[i].ML_FLEX_08+ '" ,"' + json[i].ML_FLEX_09+ '" ,"' + json[i].ML_FLEX_10+ '" ,"' + json[i].ML_FLEX_11+ '" ,"' + json[i].ML_FLEX_12+ '" ,"' + json[i].ML_FLEX_13+ '" ,"' + json[i].ML_FLEX_14+ '" ,"' + json[i].ML_FLEX_15+ '" ,"' + json[i].ML_FLEX_16+ '" ,"' + json[i].ML_FLEX_17+ '" ,"' + json[i].ML_FLEX_18+ '" ,"' + json[i].ML_FLEX_19+ '" ,"' + json[i].ML_FLEX_20+ '" ,"' + json[i].ML_OP_HEAD_SYS_ID+ '" ,"' + json[i].ML_SC_LINE_SYS_ID+ '" ,"' + json[i].ML_QT_LINE_SYS_ID+ '" ,"' + json[i].ML_SO_LINE_SYS_ID+ '" ,"' + json[i].ML_WO_LINE_SYS_ID+ '" ,"' + json[i].ML_PR_LINE_SYS_ID+ '" ,"' + json[i].ML_DN_LINE_SYS_ID+ '" ,"' + json[i].ML_IN_LINE_SYS_ID+ '" ,"' + json[i].ML_SR_LINE_SYS_ID+ '" ,"' + json[i].ML_FULL_WIDTH+ '" ,"' + json[i].ML_FULL_HEIGHT+ '" ,"' + json[i].ML_LEFT_WALL+ '" ,"' + json[i].ML_RIGHT_WALL+ '" ,"' + json[i].ML_CEILING_UP+ '" ,"' + json[i].ML_FLOOR_DOWN+ '" ,"' + json[i].ML_WINDOW_DEPTH+ '" ,"' + json[i].ML_WINDOW_OPENING+ '" ,"' + json[i].ML_HANDLE_POSITION+ '" ,"' + json[i].ML_HANDLE_SIZE+ '" ,"' + json[i].ML_POWER_DISTANCE+ '" ,"' + json[i].ML_GYPSUM_YN+ '" ,"' + json[i].ML_GYPSUM_WIDTH+ '" ,"' + json[i].ML_GYPSUM_HEIGHT+ '" ,"' + json[i].ML_GYPSUM_DEPTH+ '" ,"' + json[i].ML_BULD_TYPE+ '" ,"' + json[i].ML_ROOM_NO+ '" ,"' + json[i].ML_WINDOW_NO+ '" ,"' + json[i].ML_POWER_SIDE+ '" ,"' + json[i].ML_SITE_READY_YN+ '" ,"' + json[i].ML_WINDOW_TYPE+ '" ,"' + json[i].ML_DOME_HEIGHT+ '" ,"' + json[i].ML_CORNER_DEGREE+ '" ,"' + json[i].ML_CORVE_DEPTH+ '" ,"' + json[i].ML_PARTITIONED_WINDOW_YN+ '" ,"' + json[i].ML_NO_OF_PARTITION+ '" ,"' + json[i].ML_PARTITION_01_WIDTH+ '" ,"' + json[i].ML_PARTITION_02_WIDTH+ '" ,"' + json[i].ML_PARTITION_03_WIDTH+ '" ,"' + json[i].ML_PARTITION_04_WIDTH+ '" ,"' + json[i].ML_PARTITION_05_WIDTH+ '" ,"' + json[i].ML_PARTITION_06_WIDTH+ '" ,"' + json[i].ML_PARTITION_07_WIDTH+ '" ,"' + json[i].ML_PARTITION_08_WIDTH+ '" ,"' + json[i].ML_PARTITION_09_WIDTH+ '" ,"' + json[i].ML_PARTITION_10_WIDTH+ '" ,"' + json[i].ML_DESIGN_DEPTH+ '")', successID);
					
					j++;
					if(j==length){
						//alert("Line Success");
						/*alert("Success");
							tx.executeSql('SELECT * FROM SelectedLineDataValue ', [], function (tx, results1) {
								var treeHeadIdlength=results1.rows.length;
								alert(treeHeadIdlength+"<----Linelength")
								for (var i=0;i<treeHeadIdlength;i++){
									prompt("Line",JSON.stringify(results1.rows.item(i)));
								}
							});*/
						getMeasureImageData(MH_SYS_ID);
					}
				}
			});
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		}
	});
	}
	
	function getMeasureImageData(MH_SYS_ID){
		//alert(ML_SYS_ID);
		
		$.ajax({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedMeasureImageValue",
		data: {MH_SYS_ID:MH_SYS_ID},
		dataType : 'json',
		async: false,
		success: function (json)
		{	
			//prompt(" ",JSON.stringify(json));
			var length = json.length;
			//alert("ImageLength->"+length);
			var j = 0;
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS SelectedImageDataValue (ID INTEGER PRIMARY KEY AUTOINCREMENT,ML_SYS_ID INTEGER,MI_ML_SYS_ID INTEGER,MI_MH_SYS_ID INTEGER,ML_IMAGE TEXT,USER_ID TEXT, LANG_CODE TEXT, ML_COMP_CODE INTEGER,IMAGE_PATH TEXT,MI_DESC TEXT,MI_SIZE TEXT)",[]);
			for (var i = 0; i < length; i++) {
				// tx.executeSql('INSERT OR REPLACE INTO SelectedImageDataValue (ML_SYS_ID , MI_ML_SYS_ID,MI_MH_SYS_ID , ML_IMAGE , USER_ID, LANG_CODE, ML_COMP_CODE, IMAGE_PATH, MI_DESC, MI_SIZE) VALUES ("'+ json[i].MI_SYS_ID+'","'+ json[i].MI_ML_SYS_ID +'","'+ json[i].MI_MH_SYS_ID +'","'+ json[i].MI_FILE_NAME +'","'+ json[i].MI_CR_DT +'","en","'+ json[i].MI_COMP_CODE +'","'+ json[i].MI_FILE_NAME +'","'+ json[i].MI_DESC +'","'+ json[i].MI_SIZE +'")', successID);
				// j++;
				// if(j==length){
					// //alert("success");
					// $('body').removeClass('loading').loader('hide');
				// }
				
				if(json[i].MI_FILE_NAME==null){
					//alert("null");
				}else{
					/* image download start */
					//alert(json[i].MI_FILE_NAME);
					var folderName = 'Spine';
					var fileName;
					var url = json[i].MI_FILE_NAME;
					downloadFile(url);
					function downloadFile(URL) {
						// window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,fileSystemSuccess, fileSystemFail);
						// function fileSystemSuccess(fileSystem) {
							// var download_link = encodeURI(URL);
							// fileName = download_link.substr(download_link.lastIndexOf('/') + 1);		
							// fileSystem.getDirectory(folderName, {create: true,exclusive: false}, onDirectorySuccess, onDirectoryFail);
							// var fp = cordova.file.externalRootDirectory;
							// localStorage.removeItem("localPath");
							// fp = fp + "/" + folderName + "/" + fileName;
							// var fullPath =cordova.file.externalRootDirectory + "/" + folderName + "/";
							// localStorage.setItem("localPath", fullPath);
							// filetransfer(download_link, fp);
						// }
						
						var download_link = encodeURI(URL);
						fileName = download_link.substr(download_link.lastIndexOf('/') + 1);
						var fp = cordova.file.externalDataDirectory;
						//var fp = cordova.file.externalRootDirectory;
						//alert("data");
						//prompt("",cordova.file.externalDataDirectory);
						localStorage.removeItem("localPath");
						fp = fp + "/" + folderName + "/" + fileName;
						//var fullPath =cordova.file.externalRootDirectory + "/" + folderName + "/";
						var fullPath =cordova.file.externalDataDirectory + "/" + folderName + "/";
						localStorage.setItem("localPath", fullPath);
						filetransfer(download_link, fp);

						function onDirectorySuccess(parent) {
							// Directory created successfuly
							//alert("dir succ");
						} 

						function onDirectoryFail(error) {
							//Error while creating directory
							//alert("Unable to create new directory: " + error.code);
						}

						function fileSystemFail(evt) {
							//Unable to access file system
							//alert(evt.target.error.code);
						}
						
					}

					function filetransfer(download_link, fp) {
						var fileTransfer = new FileTransfer();
						fileTransfer.download(download_link, fp,
							function(entry) {
								//alert("download complete: " + entry.fullPath);
							},
							function(error) {
								//alert("download error source " + error.source);
							}
						);
					}
					//alert(fp);
					var local_Path = localStorage.getItem("localPath");
					//prompt("local",local_Path);
					if(local_Path==null){
						//var local = "file:///storage/emulated/0//Spine/";
						var local = "file:///storage/emulated/0/Android/data/io.cordova.hellocordova/files/";
						var LivePath = json[i].MI_FILE_NAME;
						var Name = LivePath.substr(LivePath.lastIndexOf('/') + 1);
						var localPath = local+Name;
					}else{
						var local = localStorage.getItem("localPath");
						var LivePath = json[i].MI_FILE_NAME;
						var Name = LivePath.substr(LivePath.lastIndexOf('/') + 1);
						var localPath = local+Name;
					}
					
					//var localPath = json[i].MI_FILE_NAME;
					//alert(localPath);
					tx.executeSql('INSERT OR REPLACE INTO SelectedImageDataValue (ML_SYS_ID , MI_ML_SYS_ID,MI_MH_SYS_ID , ML_IMAGE , USER_ID, LANG_CODE, ML_COMP_CODE, IMAGE_PATH, MI_DESC, MI_SIZE) VALUES ("'+ json[i].MI_SYS_ID+'","'+ json[i].MI_ML_SYS_ID +'","'+ json[i].MI_MH_SYS_ID +'","'+ json[i].MI_FILE_NAME +'","'+ json[i].MI_CR_DT +'","en","'+ json[i].MI_COMP_CODE +'","'+ localPath +'","'+ json[i].MI_DESC +'","'+ json[i].MI_SIZE +'")', successID);
					j++;
					if(j==length){
						$('body').removeClass('loading').loader('hide');
						/*alert("Success");
							tx.executeSql('SELECT * FROM SelectedImageDataValue ', [], function (tx, results1) {
								var treeHeadIdlength=results1.rows.length;
								alert(treeHeadIdlength+"<----Imglength")
								for (var i=0;i<treeHeadIdlength;i++){
									prompt("img",JSON.stringify(results1.rows.item(i)));
								}
							});*/
					}
					/* image download end */
				}
				
				
			}
			});
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		}
	});
	} 
	
	function successID(){
		return true;
	}
	
}

function getMeasureRefData(systemLineId){
	var Comp_code=localStorage.getItem("USER_COMP_CODE");
	$.ajax
	({
		type: "POST",                               
		url: "http://test.sedarspine.com/en/spineLogisticsApp/Get_City_Desc_Line",
		data: {systemId:systemLineId,Comp_code:Comp_code},
		dataType : 'json',
		async: false,
		success: function (json)
		{   
			 var length = json.length;
			 //alert("Get_City_Desc"+length);
			 var j = 0;
			 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			 db.transaction(function(tx){
				tx.executeSql('CREATE TABLE IF NOT EXISTS City_Desc (LSL_SYS_ID TEXT, LSL_LSH_SYS_ID TEXT, LSL_COMP_CODE TEXT, LSL_LANG_CODE TEXT, LSL_TXN_DT TEXT, LSL_LINE TEXT, LSL_REF_SYS_ID TEXT, LSL_REF_TXN_TYPE TEXT, LSL_REF_TXN_CODE TEXT, LSL_REF_TXN_NO TEXT, LSL_REF_TXN_DT TEXT, LSL_LOCN_CODE TEXT, LSL_REQUESTED_BY TEXT, LSL_APPOINT_DT TEXT, LSL_CUST_AC_CODE TEXT, LSL_CUST_AC_DESC TEXT, LSL_ADD1 TEXT, LSL_ADD2 TEXT, LSL_ADD3 TEXT, LSL_ADD4 TEXT, LSL_CONTACT_PERSON TEXT, LSL_CONTACT_NO TEXT, LSL_CN_CODE TEXT, CN_DESC TEXT, LSL_ST_CODE TEXT, ST_DESC TEXT, LSL_CT_CODE TEXT, CT_DESC TEXT, LSL_CT_AREA_CODE TEXT, AREA_DESC TEXT, LSL_POSTAL TEXT, LSL_MOBILE TEXT, LSL_PHONE TEXT, LSL_FAX TEXT, LSL_EMAIL TEXT, LSL_DESC TEXT, LSL_JOB_CODE TEXT, LSL_JOB_STATUS TEXT, LSL_RE_SCH_DT TEXT, LSL_RE_SCH_REASON TEXT, LSL_CR_DT TEXT, LSL_CR_UID TEXT, LSL_UPD_DT TEXT, LSL_UPD_UID TEXT, LSL_EX_REMARKS TEXT, LSL_EX_UID TEXT, LSL_EX_DT TEXT, LSL_SR_CODE TEXT, LSL_ASIGN_TO_EMP TEXT, LSL_START_TIME TEXT, LSL_END_TIME TEXT, LSL_TIME_TAKEN TEXT, LSL_TIME_SLOT TEXT, LSL_TIME TEXT,LSL_CUST_ID TEXT) ');
				for (var i = 0; i < length; i++) {
					tx.executeSql('INSERT OR REPLACE INTO City_Desc (LSL_SYS_ID,LSL_LSH_SYS_ID,LSL_COMP_CODE,LSL_LANG_CODE,LSL_TXN_DT,LSL_LINE,LSL_REF_SYS_ID,LSL_REF_TXN_TYPE,LSL_REF_TXN_CODE,LSL_REF_TXN_NO,LSL_REF_TXN_DT,LSL_LOCN_CODE,LSL_REQUESTED_BY,LSL_APPOINT_DT,LSL_CUST_AC_CODE,LSL_CUST_AC_DESC,LSL_ADD1,LSL_ADD2,LSL_ADD3,LSL_ADD4,LSL_CONTACT_PERSON,LSL_CONTACT_NO,LSL_CN_CODE,CN_DESC,LSL_ST_CODE,ST_DESC,LSL_CT_CODE,CT_DESC,LSL_CT_AREA_CODE,AREA_DESC,LSL_POSTAL,LSL_MOBILE,LSL_PHONE,LSL_FAX,LSL_EMAIL,LSL_DESC,LSL_JOB_CODE,LSL_JOB_STATUS,LSL_RE_SCH_DT,LSL_RE_SCH_REASON,LSL_CR_DT,LSL_CR_UID,LSL_UPD_DT,LSL_UPD_UID,LSL_EX_REMARKS,LSL_EX_UID,LSL_EX_DT,LSL_SR_CODE,LSL_ASIGN_TO_EMP,LSL_START_TIME,LSL_END_TIME,LSL_TIME_TAKEN,LSL_TIME_SLOT,LSL_TIME,LSL_CUST_ID) VALUES ("' + json[i].LSL_SYS_ID +'","' + json[i].LSL_LSH_SYS_ID+'","' + json[i].LSL_COMP_CODE+'","' + json[i].LSL_LANG_CODE+'","' + json[i].LSL_TXN_DT+'","' + json[i].LSL_LINE+'","' + json[i].LSL_REF_SYS_ID+'","' + json[i].LSL_REF_TXN_TYPE+'","' + json[i].LSL_REF_TXN_CODE+'","' + json[i].LSL_REF_TXN_NO+'","' + json[i].LSL_REF_TXN_DT+'","' + json[i].LSL_LOCN_CODE+'","' + json[i].LSL_REQUESTED_BY+'","' + json[i].LSL_APPOINT_DT+'","' + json[i].LSL_CUST_AC_CODE+'","' + json[i].LSL_CUST_AC_DESC+'","' + json[i].LSL_ADD1+'","' + json[i].LSL_ADD2+'","' + json[i].LSL_ADD3+'","' + json[i].LSL_ADD4+'","' + json[i].LSL_CONTACT_PERSON+'","' + json[i].LSL_CONTACT_NO+'","' + json[i].LSL_CN_CODE+'","' + json[i].CN_DESC+'","' + json[i].LSL_ST_CODE+'","' + json[i].ST_DESC+'","' + json[i].LSL_CT_CODE+'","' + json[i].CT_DESC+'","' + json[i].LSL_CT_AREA_CODE+'","' + json[i].AREA_DESC+'","' + json[i].LSL_POSTAL+'","' + json[i].LSL_MOBILE+'","' + json[i].LSL_PHONE+'","' + json[i].LSL_FAX+'","' + json[i].LSL_EMAIL+'","' + json[i].LSL_DESC+'","' + json[i].LSL_JOB_CODE+'","' + json[i].LSL_JOB_STATUS+'","' + json[i].LSL_RE_SCH_DT+'","' + json[i].LSL_RE_SCH_REASON+'","' + json[i].LSL_CR_DT+'","' + json[i].LSL_CR_UID+'","' + json[i].LSL_UPD_DT+'","' + json[i].LSL_UPD_UID+'","' + json[i].LSL_EX_REMARKS+'","' + json[i].LSL_EX_UID+'","' + json[i].LSL_EX_DT+'","' + json[i].LSL_SR_CODE+'","' + json[i].LSL_ASIGN_TO_EMP+'","' + json[i].LSL_START_TIME+'","' + json[i].LSL_END_TIME+'","' + json[i].LSL_TIME_TAKEN+'","' + json[i].LSL_TIME_SLOT+'","' + json[i].LSL_TIME+'","' + json[i].LSL_CUST_ID +'")', successID);
					j++;
					if(j==length){
					   //alert("Success");
					}
				}
			});
		},
	});
	
	$.ajax
	({
		type: "POST",                               
		url: "http://test.sedarspine.com/en/spineLogisticsApp/Get_City_Desc_Head",
		data: {systemId:systemLineId,Comp_code:Comp_code},
		dataType : 'json',
		async: false,
		success: function (json)
		{   
			 var length = json.length;
			 //alert("Get_City_Desc"+length);
			 var j = 0;
			 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			 db.transaction(function(tx){
				tx.executeSql('CREATE TABLE IF NOT EXISTS City_Desc_Head (MH_SYS_ID TEXT, MH_COMP_CODE TEXT, MH_LANG_CODE TEXT,MH_REF_SYS_ID TEXT,MH_REF_TXN_CODE TEXT,MH_REF_TXN_NO TEXT,MH_REF_TXN_DT TEXT,MH_SALE_REF_SYS_ID TEXT, MH_SALE_REF_TXN_CODE TEXT,MH_SALE_REF_TXN_NO TEXT, MH_SALE_REF_TXN_DT TEXT,MH_CONTACT_NO TEXT, MH_CONTACT_PERSON TEXT,MH_CUST_TYPE TEXT,MH_LOCN_CODE TEXT, MH_CUST_AC_CODE TEXT, MH_CUST_AC_DESC TEXT, MH_ADD1 TEXT,MH_ADD2 TEXT, MH_ADD3 TEXT, MH_ADD4 TEXT,MH_CN_CODE TEXT,CN_DESC TEXT,MH_ST_CODE TEXT,ST_DESC TEXT,MH_CT_CODE TEXT,CT_DESC TEXT,MH_CT_AR_CODE TEXT,AREA_DESC TEXT)');
				for (var i = 0; i < length; i++) {
					tx.executeSql('INSERT OR REPLACE INTO City_Desc_Head (MH_SYS_ID,MH_COMP_CODE,MH_LANG_CODE,MH_REF_SYS_ID,MH_REF_TXN_CODE,MH_REF_TXN_NO,MH_REF_TXN_DT,MH_SALE_REF_SYS_ID, MH_SALE_REF_TXN_CODE,MH_SALE_REF_TXN_NO, MH_SALE_REF_TXN_DT,MH_CONTACT_NO, MH_CONTACT_PERSON,MH_CUST_TYPE,MH_LOCN_CODE, MH_CUST_AC_CODE, MH_CUST_AC_DESC, MH_ADD1,MH_ADD2, MH_ADD3, MH_ADD4,MH_CN_CODE,CN_DESC,MH_ST_CODE,ST_DESC,MH_CT_CODE,CT_DESC,MH_CT_AR_CODE,AREA_DESC) VALUES ("'+json[i].MH_SYS_ID+'","' +json[i].MH_COMP_CODE+'","' +json[i].MH_LANG_CODE+'","' +json[i].MH_REF_SYS_ID+'","' +json[i].MH_REF_TXN_CODE+'","' +json[i].MH_REF_TXN_NO+'","' +json[i].MH_REF_TXN_DT+'","' +json[i].MH_SALE_REF_SYS_ID+'","' + json[i].MH_SALE_REF_TXN_CODE+'","' +json[i].MH_SALE_REF_TXN_NO+'","' + json[i].MH_SALE_REF_TXN_DT+'","' +json[i].MH_CONTACT_NO+'","' + json[i].MH_CONTACT_PERSON+'","' +json[i].MH_CUST_TYPE+'","' +json[i].MH_LOCN_CODE+'","' + json[i].MH_CUST_AC_CODE+'","' + json[i].MH_CUST_AC_DESC+'","' + json[i].MH_ADD1+'","' +json[i].MH_ADD2+'","' + json[i].MH_ADD3+'","' + json[i].MH_ADD4+'","' +json[i].MH_CN_CODE+'","' +json[i].CN_DESC+'","' +json[i].MH_ST_CODE+'","' +json[i].ST_DESC+'","' +json[i].MH_CT_CODE+'","' +json[i].CT_DESC+'","' +json[i].MH_CT_AR_CODE+'","' +json[i].AREA_DESC+'")', successID);
					j++;
					if(j==length){
					   //alert("Success");
					  /* alert("Success");
						tx.executeSql('SELECT * FROM City_Desc_Head ', [], function (tx, results1) {
							var treeHeadIdlength=results1.rows.length;
							alert(treeHeadIdlength+"<----City_Desc_Head")
							for (var i=0;i<treeHeadIdlength;i++){
								prompt("City_Desc_Head",JSON.stringify(results1.rows.item(i)));
							}
						});*/
					}
				}
			});
		}
	});
		 
	function successID(){
			return true;
	}
}
	
function getTableStat(systemId)
{
	$id=systemId;
	var USER_ID = localStorage.getItem("user_id");
	var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
	$.ajax
	({
		url: 'http://test.sedarspine.com/en/LogiCtr/getJobMeasurementStatistics12',
		type: 'POST',
		data: {id:$id,USER_ID:USER_ID,USER_COMP_CODE:USER_COMP_CODE},
		dataType:"json",
		success: function (json)
		{
			
			$("#jobTotal").text(json.total_jobs);
			localStorage.setItem("total_jobs", json.total_jobs);
			$("#jobCompleted").text(json.job_Completed);
			localStorage.setItem("Completed", json.job_Completed);
			$("#jobRescheduled").text(json.jobtobe_Rescheduled);
			localStorage.setItem("Rescheduled", json.jobtobe_Rescheduled);
			$("#jobPending").text(json.jobtobe_pending);
			localStorage.setItem("Pending", json.jobtobe_pending);
			$("#jobNotScheduled").text(json.NotScheduled);
			localStorage.setItem("NotScheduled", json.NotScheduled);
			$("#jobPartialyCompleted").text(json.PartComplete);
			localStorage.setItem("PartComplete", json.PartComplete);
			$("#jobScheduled").text(json.Scheduled);
			localStorage.setItem("Scheduled", json.Scheduled);
			$("#jobClosed").text(json.jobtobe_closed);
			localStorage.setItem("Closed", json.jobtobe_closed);
			
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		
		} 
	});
} 

/* Get Schedule Online Value end*/


/* Select BOX Value Start */

function getJobMeasurement($this)
{
	$('body').addClass('loading').loader('show', { overlay: true });
	var ddlText = $("#LSH_SYS_ID option:selected").text();
	localStorage.setItem("SelectDate", ddlText);
	var systemId =$($this).val();
	getJobMeasurementStatistics(systemId);
	localStorage.setItem("systemId", systemId);
	var vehicleCode=$('option:selected', $this).attr("data-vehicle");
	localStorage.setItem("vehicleCode", vehicleCode);
	var USER_ID = localStorage.getItem("user_id");
	var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
	var vehicleCode = $('option:selected', $this).attr("data-vehicle");
	var teamCode = $('option:selected', $this).attr("data-team");
	localStorage.setItem("Vehicle", vehicleCode);
	localStorage.setItem("Team", teamCode);
	$("#LSH_VEHICLE_CODE").val(vehicleCode);
	$("#LSH_TEAM_CODE").val(teamCode);
	$.ajax({
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingAjax',
	    type: 'POST',
	    data: {id:systemId,vehicleCode:vehicleCode,USER_COMP_CODE:USER_COMP_CODE,USER_ID:USER_ID},
	    success: function (response)
	    {
	    	localStorage.setItem("JobTable", response);
			$("#RemoveResponsive").html(response);
			$('.selectpicker').selectpicker('refresh');
	    }
	});
	
	
	$.ajax({
		type: "POST",
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingDataHead',
		data :{systemId:systemId},
		dataType:"json",
		async: false,
		success:function (json){
			var j=0;
			var ajaxlength = json.length;
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_SCHEDULE_HEAD');
				tx.executeSql('CREATE TABLE IF NOT EXISTS LOGI_T_SCHEDULE_HEAD (ID INTEGER PRIMARY KEY AUTOINCREMENT, LSH_SYS_ID INTEGER, LSH_COMP_CODE TEXT, LSH_LANG_CODE TEXT, LSH_TXN_CODE TEXT, LSH_TXN_NO TEXT, LSH_TXN_DT TEXT, LSH_DOC_REF TEXT, LSH_VEHICLE_CODE TEXT, LSH_TEAM_CODE TEXT, LSH_APPOINT_DT TEXT, LSH_DESC TEXT, LSH_STATUS TEXT, LSH_CR_DT TEXT, LSH_CR_UID TEXT, LSH_UPD_DT TEXT, LSH_UPD_UID TEXT, LSH_SEND_YN TEXT, LSH_SEND_DT TEXT, LSH_SEND_UID TEXT, LSH_APPROVE_YN TEXT, LSH_APPROVE_DT TEXT, LSH_APPROVE_UID TEXT, LSH_FLEX_01 TEXT, LSH_FLEX_02 TEXT, LSH_FLEX_03 TEXT, LSH_FLEX_04 TEXT, LSH_FLEX_05 TEXT, LSH_FLEX_06 TEXT, LSH_FLEX_07 TEXT, LSH_FLEX_08 TEXT, LSH_FLEX_09 TEXT, LSH_FLEX_10 TEXT, LSH_FLEX_11 TEXT, LSH_FLEX_12 TEXT, LSH_FLEX_13 TEXT, LSH_FLEX_14 TEXT, LSH_FLEX_15 TEXT, LSH_FLEX_16 TEXT, LSH_FLEX_17 TEXT, LSH_FLEX_18 TEXT, LSH_FLEX_19 TEXT, LSH_FLEX_20 TEXT, LSH_CITY_CODE TEXT, LSH_JOB_TOTAL INTEGER, LSH_JOB_COMPLETED INTEGER, LSH_JOB_RESCHEDULED INTEGER, LSH_JOB_CLOSED INTEGER, LSH_JOB_PENDING INTEGER) ');
				
				for (var i = 0; i < ajaxlength; i++) {
					tx.executeSql('INSERT OR REPLACE INTO LOGI_T_SCHEDULE_HEAD (LSH_SYS_ID, LSH_COMP_CODE, LSH_LANG_CODE, LSH_TXN_CODE, LSH_TXN_NO, LSH_TXN_DT, LSH_DOC_REF, LSH_VEHICLE_CODE, LSH_TEAM_CODE, LSH_APPOINT_DT, LSH_DESC, LSH_STATUS, LSH_CR_DT, LSH_CR_UID, LSH_UPD_DT, LSH_UPD_UID, LSH_SEND_YN, LSH_SEND_DT, LSH_SEND_UID, LSH_APPROVE_YN, LSH_APPROVE_DT, LSH_APPROVE_UID, LSH_FLEX_01, LSH_FLEX_02, LSH_FLEX_03, LSH_FLEX_04, LSH_FLEX_05, LSH_FLEX_06, LSH_FLEX_07, LSH_FLEX_08, LSH_FLEX_09, LSH_FLEX_10, LSH_FLEX_11, LSH_FLEX_12, LSH_FLEX_13, LSH_FLEX_14, LSH_FLEX_15, LSH_FLEX_16, LSH_FLEX_17, LSH_FLEX_18, LSH_FLEX_19, LSH_FLEX_20, LSH_CITY_CODE, LSH_JOB_TOTAL, LSH_JOB_COMPLETED, LSH_JOB_RESCHEDULED, LSH_JOB_CLOSED, LSH_JOB_PENDING) VALUES ("' + json[i].LSH_SYS_ID + '", "' + json[i].LSH_COMP_CODE + '", "' + json[i].LSH_LANG_CODE + '", "' + json[i].LSH_TXN_CODE + '", "' + json[i].LSH_TXN_NO + '", "' + json[i].LSH_TXN_DT + '", "' + json[i].LSH_DOC_REF + '", "' + json[i].LSH_VEHICLE_CODE + '", "' + json[i].LSH_TEAM_CODE + '", "' + json[i].LSH_APPOINT_DT + '", "' + json[i].LSH_DESC + '", "' + json[i].LSH_STATUS + '", "' + json[i].LSH_CR_DT + '", "' + json[i].LSH_CR_UID + '", "' + json[i].LSH_UPD_DT + '", "' + json[i].LSH_UPD_UID + '", "' + json[i].LSH_SEND_YN + '", "' + json[i].LSH_SEND_DT + '", "' + json[i].LSH_SEND_UID + '", "' + json[i].LSH_APPROVE_YN + '", "' + json[i].LSH_APPROVE_DT + '", "' + json[i].LSH_APPROVE_UID + '", "' + json[i].LSH_FLEX_01 + '", "' + json[i].LSH_FLEX_02 + '", "' + json[i].LSH_FLEX_03 + '", "' + json[i].LSH_FLEX_04 + '", "' + json[i].LSH_FLEX_05 + '", "' + json[i].LSH_FLEX_06 + '", "' + json[i].LSH_FLEX_07 + '", "' + json[i].LSH_FLEX_08 + '", "' + json[i].LSH_FLEX_09 + '", "' + json[i].LSH_FLEX_10 + '", "' + json[i].LSH_FLEX_11 + '", "' + json[i].LSH_FLEX_12 + '", "' + json[i].LSH_FLEX_13 + '", "' + json[i].LSH_FLEX_14 + '", "' + json[i].LSH_FLEX_15 + '", "' + json[i].LSH_FLEX_16 + '", "' + json[i].LSH_FLEX_17 + '", "' + json[i].LSH_FLEX_18 + '", "' + json[i].LSH_FLEX_19 + '", "' + json[i].LSH_FLEX_20 + '", "' + json[i].LSH_CITY_CODE + '", "' + json[i].LSH_JOB_TOTAL + '", "' + json[i].LSH_JOB_COMPLETED + '", "' + json[i].LSH_JOB_RESCHEDULED + '", "' + json[i].LSH_JOB_CLOSED + '", "' + json[i].LSH_JOB_PENDING + '")', successID);
					j++;
					if(j==ajaxlength){
						//alert('All Transaction Head data will be updated');
					}
					
				}
			});
		}

	});
	
	$.ajax({
		type: "POST",
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingDataLines',
		data :{systemId:systemId},
		dataType:"json",
		async: false,
		success:function (json) {
			var j=0;
			var ajaxlength = json.length;
			localStorage.setItem("lineLength", ajaxlength);
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_SCHEDULE_LINES');
				tx.executeSql('DROP TABLE IF EXISTS SelectedHeadDataValue');
				tx.executeSql('DROP TABLE IF EXISTS SelectedTreeDataValue');
				tx.executeSql('DROP TABLE IF EXISTS SelectedLineDataValue');
				tx.executeSql('DROP TABLE IF EXISTS SelectedImageDataValue');
				tx.executeSql('DROP TABLE IF EXISTS Live_Measure_Head');
				tx.executeSql('DROP TABLE IF EXISTS City_Desc');
				tx.executeSql('DROP TABLE IF EXISTS City_Desc_Head');
				tx.executeSql('CREATE TABLE IF NOT EXISTS LOGI_T_SCHEDULE_LINES (ID INTEGER PRIMARY KEY AUTOINCREMENT, LSL_SYS_ID INTEGER, LSL_LSH_SYS_ID INTEGER, LSL_COMP_CODE TEXT, LSL_LANG_CODE TEXT, LSL_TXN_DT TEXT, LSL_LINE TEXT, LSL_REF_SYS_ID TEXT, LSL_REF_TXN_TYPE TEXT, LSL_REF_TXN_CODE TEXT, LSL_REF_TXN_NO TEXT, LSL_REF_TXN_DT TEXT, LSL_LOCN_CODE TEXT, LSL_REQUESTED_BY TEXT, LSL_APPOINT_DT TEXT, LSL_CUST_AC_CODE TEXT, LSL_CUST_AC_DESC TEXT, LSL_ADD1 TEXT, LSL_ADD2 TEXT, LSL_ADD3 TEXT, LSL_ADD4 TEXT, LSL_CONTACT_PERSON TEXT, LSL_CONTACT_NO TEXT, LSL_CN_CODE TEXT, LSL_ST_CODE TEXT, LSL_CT_CODE TEXT, LSL_CT_AREA_CODE TEXT, LSL_POSTAL TEXT, LSL_MOBILE TEXT, LSL_PHONE TEXT, LSL_FAX TEXT, LSL_EMAIL TEXT, LSL_DESC TEXT, LSL_JOB_CODE TEXT, LSL_JOB_STATUS TEXT, LSL_RE_SCH_DT TEXT, LSL_RE_SCH_REASON TEXT, LSL_CR_DT TEXT, LSL_CR_UID TEXT, LSL_UPD_DT TEXT, LSL_UPD_UID TEXT, LSL_EX_REMARKS TEXT, LSL_EX_UID TEXT, LSL_EX_DT TEXT, LSL_FLEX_01 TEXT, LSL_FLEX_02 TEXT, LSL_FLEX_03 TEXT, LSL_FLEX_04 TEXT, LSL_FLEX_05 TEXT, LSL_FLEX_06 TEXT, LSL_FLEX_07 TEXT, LSL_FLEX_08 TEXT, LSL_FLEX_09 TEXT, LSL_FLEX_10 TEXT, LSL_FLEX_11 TEXT, LSL_FLEX_12 TEXT, LSL_FLEX_13 TEXT, LSL_FLEX_14 TEXT, LSL_FLEX_15 TEXT, LSL_FLEX_16 TEXT, LSL_FLEX_17 TEXT, LSL_FLEX_18 TEXT, LSL_FLEX_19 TEXT, LSL_FLEX_20 TEXT, LSL_SR_CODE TEXT) ');
				for (var i = 0; i < ajaxlength; i++){
					tx.executeSql('INSERT OR REPLACE INTO LOGI_T_SCHEDULE_LINES ( LSL_SYS_ID, LSL_LSH_SYS_ID, LSL_COMP_CODE, LSL_LANG_CODE, LSL_TXN_DT, LSL_LINE, LSL_REF_SYS_ID, LSL_REF_TXN_TYPE, LSL_REF_TXN_CODE, LSL_REF_TXN_NO, LSL_REF_TXN_DT, LSL_LOCN_CODE, LSL_REQUESTED_BY, LSL_APPOINT_DT, LSL_CUST_AC_CODE, LSL_CUST_AC_DESC, LSL_ADD1, LSL_ADD2, LSL_ADD3, LSL_ADD4 , LSL_CONTACT_PERSON, LSL_CONTACT_NO, LSL_CN_CODE, LSL_ST_CODE, LSL_CT_CODE, LSL_CT_AREA_CODE, LSL_POSTAL, LSL_MOBILE, LSL_PHONE, LSL_FAX, LSL_EMAIL, LSL_DESC, LSL_JOB_CODE, LSL_JOB_STATUS, LSL_RE_SCH_DT, LSL_RE_SCH_REASON, LSL_CR_DT, LSL_CR_UID, LSL_UPD_DT, LSL_UPD_UID, LSL_EX_REMARKS, LSL_EX_UID, LSL_EX_DT, LSL_FLEX_01, LSL_FLEX_02, LSL_FLEX_03, LSL_FLEX_04, LSL_FLEX_05, LSL_FLEX_06, LSL_FLEX_07, LSL_FLEX_08, LSL_FLEX_09, LSL_FLEX_10, LSL_FLEX_11, LSL_FLEX_12, LSL_FLEX_13, LSL_FLEX_14, LSL_FLEX_15, LSL_FLEX_16, LSL_FLEX_17, LSL_FLEX_18, LSL_FLEX_19, LSL_FLEX_20, LSL_SR_CODE) VALUES ("' + json[i].LSL_SYS_ID + '", "' + json[i].LSL_LSH_SYS_ID + '", "' + json[i].LSL_COMP_CODE + '", "' + json[i].LSL_LANG_CODE + '", "' + json[i].LSL_TXN_DT + '", "' + json[i].LSL_LINE + '", "' + json[i].LSL_REF_SYS_ID + '", "' + json[i].LSL_REF_TXN_TYPE + '", "' + json[i].LSL_REF_TXN_CODE + '", "' + json[i].LSL_REF_TXN_NO + '", "' + json[i].LSL_REF_TXN_DT + '", "' + json[i].LSL_LOCN_CODE + '", "' + json[i].LSL_REQUESTED_BY + '", "' + json[i].LSL_APPOINT_DT + '", "' + json[i].LSL_CUST_AC_CODE + '", "' + json[i].LSL_CUST_AC_DESC + '", "' + json[i].LSL_ADD1 + '", "' + json[i].LSL_ADD2 + '", "' + json[i].LSL_ADD3 + '", "' + json[i].LSL_ADD4 + '", "' + json[i].LSL_CONTACT_PERSON + '", "' + json[i].LSL_CONTACT_NO + '", "' + json[i].LSL_CN_CODE + '", "' + json[i].LSL_ST_CODE + '", "' + json[i].LSL_CT_CODE + '", "' + json[i].LSL_CT_AREA_CODE + '", "' + json[i].LSL_POSTAL + '", "' + json[i].LSL_MOBILE + '", "' + json[i].LSL_PHONE + '", "' + json[i].LSL_FAX + '", "' + json[i].LSL_EMAIL + '", "' + json[i].LSL_DESC + '", "' + json[i].LSL_JOB_CODE + '", "' + json[i].LSL_JOB_STATUS + '", "' + json[i].LSL_RE_SCH_DT + '", "' + json[i].LSL_RE_SCH_REASON + '", "' + json[i].LSL_CR_DT + '", "' + json[i].LSL_CR_UID + '", "' + json[i].LSL_UPD_DT + '", "' + json[i].LSL_UPD_UID + '", "' + json[i].LSL_EX_REMARKS + '", "' + json[i].LSL_EX_UID + '", "' + json[i].LSL_EX_DT + '", "' + json[i].LSL_FLEX_01 + '", "' + json[i].LSL_FLEX_02 + '", "' + json[i].LSL_FLEX_03 + '", "' + json[i].LSL_FLEX_04 + '", "' + json[i].LSL_FLEX_05 + '", "' + json[i].LSL_FLEX_06 + '", "' + json[i].LSL_FLEX_07 + '", "' + json[i].LSL_FLEX_08 + '", "' + json[i].LSL_FLEX_09 + '", "' + json[i].LSL_FLEX_10 + '", "' + json[i].LSL_FLEX_11 + '", "' + json[i].LSL_FLEX_12 + '", "' + json[i].LSL_FLEX_13 + '", "' + json[i].LSL_FLEX_14 + '", "' + json[i].LSL_FLEX_15 + '", "' + json[i].LSL_FLEX_16 + '", "' + json[i].LSL_FLEX_17 + '", "' + json[i].LSL_FLEX_18 + '", "' + json[i].LSL_FLEX_19 + '", "' + json[i].LSL_FLEX_20 + '", "' + json[i].LSL_SR_CODE + '")', successID);
					getMeasureHeadData(json[i].LSL_SYS_ID);
					getMeasureRefData(json[i].LSL_SYS_ID);
					j++;
					if(j==ajaxlength){
						//alert('All Transaction Line data will be updated');
						$('body').removeClass('loading').loader('hide');
					}
					//alert("Selected lsl->"+json[i].LSL_SYS_ID);
				}
			});
		}

	});
	
	function successID(){
		return true;
	}
	
} 
  	    

function getJobMeasurementStatistics(systemId)
{
	$id=systemId;
	var USER_ID = localStorage.getItem("user_id");
	var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
	$.ajax
	({
		url: 'http://test.sedarspine.com/en/LogiCtr/getJobMeasurementStatistics12',
		type: 'POST',
		data: {id:$id,USER_ID:USER_ID,USER_COMP_CODE:USER_COMP_CODE},
		dataType:"json",
		success: function (json)
		{
			$("#jobTotal").text(json.total_jobs);
			localStorage.setItem("total_jobs", json.total_jobs);
			$("#jobCompleted").text(json.job_Completed);
			localStorage.setItem("Completed", json.job_Completed);
			$("#jobRescheduled").text(json.jobtobe_Rescheduled);
			localStorage.setItem("Rescheduled", json.jobtobe_Rescheduled);
			$("#jobPending").text(json.jobtobe_pending);
			localStorage.setItem("Pending", json.jobtobe_pending);
			$("#jobNotScheduled").text(json.NotScheduled);
			localStorage.setItem("NotScheduled", json.NotScheduled);
			$("#jobPartialyCompleted").text(json.PartComplete);
			localStorage.setItem("PartComplete", json.PartComplete);
			$("#jobScheduled").text(json.Scheduled);
			localStorage.setItem("Scheduled", json.Scheduled);
			$("#jobClosed").text(json.jobtobe_closed);
			localStorage.setItem("Closed", json.jobtobe_closed);
			
		},error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr);alert(ajaxOptions);alert(thrownError);
    	
    	} 
	});
}

/* Select BOX Value end */
