$(document).ready(function(){
	alert("Schedule");
	//getJobByDate();
	function getJobByDate()
	{
		
		var USER_ID = localStorage.getItem("user_id");
		var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
	    var $id = "Spine";
	    $("#ScheduledJobs").html(" ");
	    $("#jobCompleted").text("0");
	    $("#jobTotal").text("0");
	    $("#jobRescheduled").text("0");
	    $("#jobPending").text("0");
	    $("#jobNotScheduled").text("0");
	    $("#jobPartialyCompleted").text("0");
	    $("#jobScheduled").text("0");
	    $("#jobClosed").text("0");
	    $('.selectpicker').selectpicker('refresh');
	    $("#LSH_VEHICLE_CODE").val("");
	   
	     $.ajax
	    ({
	    	type: "POST",                                
			url: "http://test.sedarspine.com/en/spineLogisticsApp/getJobByDate",
			data: {USER_ID:USER_ID,USER_COMP_CODE:USER_COMP_CODE},
			success: function (data)
			{
			 	
			    $("#SelectVehicle").html(data);
			    $('.selectpicker').selectpicker('refresh');
			    getJobMeasure();
			}
	    });
			    
	}
	
	function getJobMeasure(){
		getJobMeasurement($('#LSH_SYS_ID'));
		getJobMeasurementStatistics($('#LSH_SYS_ID'));
    	getDataValues($('#LSH_SYS_ID'));
	}
	
	function getJobMeasurement($this)
    {
		alert("schedule Job Measure");
    	//getJobMeasurementStatistics($this);
    	//getDataValues($this);
		$id=$($this).val();
		var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
		var vehicleCode = $('option:selected', $this).attr("data-vehicle");
		$("#LSH_VEHICLE_CODE").val(vehicleCode);
		$.ajax({
    		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingAjax',
		    type: 'POST',
		    data: {id:$id,vehicleCode:vehicleCode,USER_COMP_CODE:USER_COMP_CODE},
		    success: function (response)
		    {
		    	
				$("#RemoveResponsive").html(response);
				$('.selectpicker').selectpicker('refresh');
		    }
		});
    }
	
	
	
	function getDataValues($this)
    {
	//getJobMeasurementStatistics($this);
	var systemId =$($this).val();
	alert("systemId-"+systemId);
	localStorage.setItem("systemId", systemId);
	

	
	$.ajax({
		type: "POST",
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingDataHead',
		data :{systemId:systemId},
		dataType:"json",
		success:function (json) {
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
		success:function (json) {
			var j=0;
			var ajaxlength = json.length;
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_SCHEDULE_LINES');
				tx.executeSql('CREATE TABLE IF NOT EXISTS LOGI_T_SCHEDULE_LINES (ID INTEGER PRIMARY KEY AUTOINCREMENT, LSL_SYS_ID INTEGER, LSL_LSH_SYS_ID INTEGER, LSL_COMP_CODE TEXT, LSL_LANG_CODE TEXT, LSL_TXN_DT TEXT, LSL_LINE TEXT, LSL_REF_SYS_ID TEXT, LSL_REF_TXN_TYPE TEXT, LSL_REF_TXN_CODE TEXT, LSL_REF_TXN_NO TEXT, LSL_REF_TXN_DT TEXT, LSL_LOCN_CODE TEXT, LSL_REQUESTED_BY TEXT, LSL_APPOINT_DT TEXT, LSL_CUST_AC_CODE TEXT, LSL_CUST_AC_DESC TEXT, LSL_ADD1 TEXT, LSL_ADD2 TEXT, LSL_ADD3 TEXT, LSL_ADD4 TEXT, LSL_CONTACT_PERSON TEXT, LSL_CONTACT_NO TEXT, LSL_CN_CODE TEXT, LSL_ST_CODE TEXT, LSL_CT_CODE TEXT, LSL_CT_AREA_CODE TEXT, LSL_POSTAL TEXT, LSL_MOBILE TEXT, LSL_PHONE TEXT, LSL_FAX TEXT, LSL_EMAIL TEXT, LSL_DESC TEXT, LSL_JOB_CODE TEXT, LSL_JOB_STATUS TEXT, LSL_RE_SCH_DT TEXT, LSL_RE_SCH_REASON TEXT, LSL_CR_DT TEXT, LSL_CR_UID TEXT, LSL_UPD_DT TEXT, LSL_UPD_UID TEXT, LSL_EX_REMARKS TEXT, LSL_EX_UID TEXT, LSL_EX_DT TEXT, LSL_FLEX_01 TEXT, LSL_FLEX_02 TEXT, LSL_FLEX_03 TEXT, LSL_FLEX_04 TEXT, LSL_FLEX_05 TEXT, LSL_FLEX_06 TEXT, LSL_FLEX_07 TEXT, LSL_FLEX_08 TEXT, LSL_FLEX_09 TEXT, LSL_FLEX_10 TEXT, LSL_FLEX_11 TEXT, LSL_FLEX_12 TEXT, LSL_FLEX_13 TEXT, LSL_FLEX_14 TEXT, LSL_FLEX_15 TEXT, LSL_FLEX_16 TEXT, LSL_FLEX_17 TEXT, LSL_FLEX_18 TEXT, LSL_FLEX_19 TEXT, LSL_FLEX_20 TEXT, LSL_SR_CODE TEXT) ');
				
				for (var i = 0; i < ajaxlength; i++) {
					tx.executeSql('INSERT OR REPLACE INTO LOGI_T_SCHEDULE_LINES ( LSL_SYS_ID, LSL_LSH_SYS_ID, LSL_COMP_CODE, LSL_LANG_CODE, LSL_TXN_DT, LSL_LINE, LSL_REF_SYS_ID, LSL_REF_TXN_TYPE, LSL_REF_TXN_CODE, LSL_REF_TXN_NO, LSL_REF_TXN_DT, LSL_LOCN_CODE, LSL_REQUESTED_BY, LSL_APPOINT_DT, LSL_CUST_AC_CODE, LSL_CUST_AC_DESC, LSL_ADD1, LSL_ADD2, LSL_ADD3, LSL_ADD4 , LSL_CONTACT_PERSON, LSL_CONTACT_NO, LSL_CN_CODE, LSL_ST_CODE, LSL_CT_CODE, LSL_CT_AREA_CODE, LSL_POSTAL, LSL_MOBILE, LSL_PHONE, LSL_FAX, LSL_EMAIL, LSL_DESC, LSL_JOB_CODE, LSL_JOB_STATUS, LSL_RE_SCH_DT, LSL_RE_SCH_REASON, LSL_CR_DT, LSL_CR_UID, LSL_UPD_DT, LSL_UPD_UID, LSL_EX_REMARKS, LSL_EX_UID, LSL_EX_DT, LSL_FLEX_01, LSL_FLEX_02, LSL_FLEX_03, LSL_FLEX_04, LSL_FLEX_05, LSL_FLEX_06, LSL_FLEX_07, LSL_FLEX_08, LSL_FLEX_09, LSL_FLEX_10, LSL_FLEX_11, LSL_FLEX_12, LSL_FLEX_13, LSL_FLEX_14, LSL_FLEX_15, LSL_FLEX_16, LSL_FLEX_17, LSL_FLEX_18, LSL_FLEX_19, LSL_FLEX_20, LSL_SR_CODE) VALUES ("' + json[i].LSL_SYS_ID + '", "' + json[i].LSL_LSH_SYS_ID + '", "' + json[i].LSL_COMP_CODE + '", "' + json[i].LSL_LANG_CODE + '", "' + json[i].LSL_TXN_DT + '", "' + json[i].LSL_LINE + '", "' + json[i].LSL_REF_SYS_ID + '", "' + json[i].LSL_REF_TXN_TYPE + '", "' + json[i].LSL_REF_TXN_CODE + '", "' + json[i].LSL_REF_TXN_NO + '", "' + json[i].LSL_REF_TXN_DT + '", "' + json[i].LSL_LOCN_CODE + '", "' + json[i].LSL_REQUESTED_BY + '", "' + json[i].LSL_APPOINT_DT + '", "' + json[i].LSL_CUST_AC_CODE + '", "' + json[i].LSL_CUST_AC_DESC + '", "' + json[i].LSL_ADD1 + '", "' + json[i].LSL_ADD2 + '", "' + json[i].LSL_ADD3 + '", "' + json[i].LSL_ADD4 + '", "' + json[i].LSL_CONTACT_PERSON + '", "' + json[i].LSL_CONTACT_NO + '", "' + json[i].LSL_CN_CODE + '", "' + json[i].LSL_ST_CODE + '", "' + json[i].LSL_CT_CODE + '", "' + json[i].LSL_CT_AREA_CODE + '", "' + json[i].LSL_POSTAL + '", "' + json[i].LSL_MOBILE + '", "' + json[i].LSL_PHONE + '", "' + json[i].LSL_FAX + '", "' + json[i].LSL_EMAIL + '", "' + json[i].LSL_DESC + '", "' + json[i].LSL_JOB_CODE + '", "' + json[i].LSL_JOB_STATUS + '", "' + json[i].LSL_RE_SCH_DT + '", "' + json[i].LSL_RE_SCH_REASON + '", "' + json[i].LSL_CR_DT + '", "' + json[i].LSL_CR_UID + '", "' + json[i].LSL_UPD_DT + '", "' + json[i].LSL_UPD_UID + '", "' + json[i].LSL_EX_REMARKS + '", "' + json[i].LSL_EX_UID + '", "' + json[i].LSL_EX_DT + '", "' + json[i].LSL_FLEX_01 + '", "' + json[i].LSL_FLEX_02 + '", "' + json[i].LSL_FLEX_03 + '", "' + json[i].LSL_FLEX_04 + '", "' + json[i].LSL_FLEX_05 + '", "' + json[i].LSL_FLEX_06 + '", "' + json[i].LSL_FLEX_07 + '", "' + json[i].LSL_FLEX_08 + '", "' + json[i].LSL_FLEX_09 + '", "' + json[i].LSL_FLEX_10 + '", "' + json[i].LSL_FLEX_11 + '", "' + json[i].LSL_FLEX_12 + '", "' + json[i].LSL_FLEX_13 + '", "' + json[i].LSL_FLEX_14 + '", "' + json[i].LSL_FLEX_15 + '", "' + json[i].LSL_FLEX_16 + '", "' + json[i].LSL_FLEX_17 + '", "' + json[i].LSL_FLEX_18 + '", "' + json[i].LSL_FLEX_19 + '", "' + json[i].LSL_FLEX_20 + '", "' + json[i].LSL_SR_CODE + '")', successID);
					
					j++;
					if(j==ajaxlength){
						
						//alert('All Transaction Line data will be updated');
						
					}
					
				}
			});
		}

	});
	
	function successID(){
		return true;
	}
	
    }
	
	function getJobMeasurementStatistics($this)
    {
		alert("schedule Get Job Measure");
		$id=$($this).val();
		var USER_ID = localStorage.getItem("user_id");
		var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
		alert("stat-"+$id);
		alert("stat user id-"+USER_ID);
		alert("stat cmp code-"+USER_COMP_CODE);
		$.ajax
		({
		url: 'http://test.sedarspine.com/en/spineLogisticsApp/getJobMeasurementStatistics',
		type: 'POST',
		data: {id:$id,USER_ID:USER_ID,USER_COMP_CODE:USER_COMP_CODE},
		dataType:"json",
		success: function (json)
		{
			alert("json schedule table-"+json);
		    $("#jobCompleted").text(json.job_Completed);
		    $("#jobTotal").text(json.total_jobs);
		    $("#jobRescheduled").text(json.jobtobe_Rescheduled);
		    $("#jobPending").text(json.jobtobe_pending);
		    $("#jobNotScheduled").text(json.NotScheduled);
		    $("#jobPartialyCompleted").text(json.PartComplete);
		    $("#jobScheduled").text(json.Scheduled);
		    $("#jobClosed").text(json.jobtobe_closed);
	
		},error: function (xhr, ajaxOptions, thrownError) {
	         alert(xhr);
	         alert(ajaxOptions);alert(thrownError);
        }
		});
    }
	
	
	
});