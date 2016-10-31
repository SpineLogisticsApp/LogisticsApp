/* Hide and show button start */	
function offlineSchedule(){
	setTimeout(AddColor, 1000);
	/* Job Statistics Table values */
	$("#jobTotal").text(localStorage.getItem("total_jobs"));
	$("#jobCompleted").text(localStorage.getItem("Completed"));
	$("#jobRescheduled").text(localStorage.getItem("Rescheduled"));
	$("#jobPending").text(localStorage.getItem("Pending"));
	$("#jobNotScheduled").text(localStorage.getItem("NotScheduled"));
	$("#jobPartialyCompleted").text(localStorage.getItem("PartComplete"));
	$("#jobScheduled").text(localStorage.getItem("Scheduled"));
	$("#jobClosed").text(localStorage.getItem("Closed"));
	
	/* Select Job Input values */
	var Date = localStorage.getItem("SelectDate");
	$('#OnlineSchedule').addClass("hide");
	$('#OfflineSchedule').removeClass("hide");
	$("#LSH_SYS_ID_NEW").val(Date);
	
	/* vehicle and team Code values*/
	var vehicleCode = localStorage.getItem("Vehicle");
	var teamCode = localStorage.getItem("Team");
	$("#LSH_VEHICLE_CODE").val(vehicleCode);
	$("#LSH_TEAM_CODE").val(teamCode);
	
	/* Job tables values */
	var value = localStorage.getItem("JobTable");
	//prompt("value-",value);
	//$("#LSH_SYS_ID").html(Date);
	$("#RemoveResponsive").html(value);
	$('.selectpicker').selectpicker('refresh');
	
	
}
/* Hide and show button end*/
function AddColor(){
	//alert("Test");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(AddLineColorDB, errorCB);
	function AddLineColorDB(tx) {
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_HEAD ', [], function (tx, results1) {
			var Headlength=results1.rows.length;
			//alert(Headlength+"<----Headlength");
			for(var i=0;i<Headlength;i++){
				var row = results1.rows.item(i);
				//alert(row.MH_REF_SYS_ID+"--"+row.SYS_ID);
				getColorAddId(row.MH_REF_SYS_ID,row.SYS_ID)	
			}
		});
		tx.executeSql('SELECT * FROM SelectedHeadDataValue ', [], function (tx, results1) {
			var Headlength=results1.rows.length;
			//alert(Headlength+"<----Headlength");
			for(var i=0;i<Headlength;i++){
				var row = results1.rows.item(i);
				//alert(row.MH_REF_SYS_ID+"--"+row.SYS_ID);
				getColorAddId(row.MH_REF_SYS_ID,row.MH_SYS_ID);
				getColorLiveAddId(row.MH_REF_SYS_ID,row.MH_SYS_ID);
			}
		});
	}
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
}

function getColorAddId(REF_SYS_ID,SYS_ID){
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(AddColorDB, errorCB);
	function AddColorDB(tx) {
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_LINES WHERE ML_MH_SYS_ID=?', [SYS_ID], function (tx, results) {
			var lineLength = results.rows.length;
			//alert("Offline Linelength-"+lineLength);
			if(lineLength!=0){
				//alert("Ref-"+row.MH_REF_SYS_ID);
				$('table#dataRespTable').find('tbody#ScheduledJobs').find('tr.'+REF_SYS_ID+'').attr('class','odd offlinecolor');
			}
		});
	}
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
}
function getColorLiveAddId(REF_SYS_ID,SYS_ID){
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(LiveAddColorDB, errorCB);
	function LiveAddColorDB(tx) {
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES WHERE ML_MH_SYS_ID=?', [SYS_ID], function (tx, results) {
			var lineLength = results.rows.length;
			//alert("Offline Live Linelength-"+lineLength);
			if(lineLength!=0){
				//alert("Ref-"+row.MH_REF_SYS_ID);
				$('table#dataRespTable').find('tbody#ScheduledJobs').find('tr.'+REF_SYS_ID+'').attr('class','odd offline_live_editmode_color');
			}
		});	
	}
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
}