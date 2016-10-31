//alert("Local2Server Connection");
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	checkConnTest();
}
function checkConnTest() {
	var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection'; 
    states[Connection.NONE]     = 'No network connection';
	//alert('[Connection](connection.html) type: ' + states[networkState]);
    if(states[networkState] == 'No network connection'){
    	//alert("No Net conn..");
		offlineSchedule();
		//$('ul.dropdown-menu').find('li#DataCheck').addClass('hide');
    }else{
		//alert("S Net conn..");
		//checkLocalTreeValue();
		getJobDate();
		//$('ul.dropdown-menu').find('li#DataCheck').removeClass('hide');
		
    }
}

function checkLocalTreeValue(){
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(getLocalTreeCount, errorCB);
	//db.transaction(getLocalLiveTreeCount, errorCB);
	//Success
	function getLocalTreeCount(tx){
		//alert("Get");
		getLocalLiveTreeCount(tx);
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			//alert(treeHeadIdlength+"<----Treelength");
			if(treeHeadIdlength !=0){
				$('body').addClass('loading').loader('show', { overlay: true });
				local2ServerImage();
				BluePrintImageSelect();
				setTimeout(sync, 15000);
			}else{
				LiveTreeCount(tx);
			}
			
		});
	}
	
	function LiveTreeCount(tx){
		//alert("Get");
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			//alert(treeHeadIdlength+"<----liveTreelength");
			if(treeHeadIdlength !=0){
				localStorage.setItem('ReloadPageCheck','Yes');
				checkLocalTreeValue1();
			}else{
				//alert("GetData");
				//getJobDate();
			}
			
		});
	}
	
	function getLocalLiveTreeCount(tx){
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			//alert(treeHeadIdlength+"<----liveTreelength");
			if(treeHeadIdlength !=0){
				localStorage.setItem('ReloadPageCheck','Yes');
			}
			
		});
	}
	
	//Error
	function errorCB(tx, err) {
		//alert("error");
		//getJobDate();
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
}


/* BluePrint send to server Start */

function BluePrintImageSelect(){
	//alert("BP select");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	var blueprintlength = 0;
	db.transaction(Local_BluePrint, errorCB);
	function Local_BluePrint(tx){
		tx.executeSql('SELECT * FROM BluePrintImage ', [], function (tx, results) {
			var LengthOfBluePrint = results.rows.length;
			//alert("blueprintlength"+LengthOfBluePrint);
			for(var i=0;i<LengthOfBluePrint;i++){
				//alert(blueprintlength);
				var MI_SYS_ID = results.rows.item(i).MI_ML_SYS_ID;
				//alert(MI_SYS_ID);
				var dataURL = results.rows.item(i).MI_IMAGE_PATH;
				var fileName = results.rows.item(i).MI_ML_IMAGE;
				//alert("dataURL->"+dataURL);
				blueprintlength++;
				//setTimeout(SendAjax, 2000,dataURL,MI_SYS_ID);
				SendAjax(dataURL,MI_SYS_ID,fileName);
				
			}
	   });
	}
	function errorCB(tx, err) {
	   //alert("Error");
	  // alert("Error processing SQL: "+err);
	}
	
	function SendAjax(dataURL,MI_SYS_ID,fileName){
		//alert(fileName);
		var BlobUrl = dataURL;
		//var te = prompt("get",BlobUrl);
		var blobBin = atob(BlobUrl.split(',')[1]);
		var array   = [];
		for(var i = 0; i < blobBin.length; i++) {
			array.push(blobBin.charCodeAt(i));
		}
		var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
		var data = new FormData();
		data.append('file', file,fileName);
		//alert("BP Path->"+data);
			$.ajax({
			type: "POST",
			url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasureLinesCanvas_Upload",
			data :  data,
			contentType: false,
			processData: false,
			success: function (data) {
				//alert("success");
				//alert(data);
				//var tets = prompt("data",data);
			},error: function (xhr, ajaxOptions, thrownError) {
				//alert("Error");
				//alert(xhr);alert(ajaxOptions);alert(thrownError);
			}
		});
	}
}

/* BluePrint send to server End */

function sync(){
	HeadValueSend2Server();
}

function Local2Copy(){
	//alert("inside Local2Copy");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(Local2CopyDB, errorCB);
	function Local2CopyDB(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS COPY_LOGI_T_MEASURE_HEAD (ID INTEGER PRIMARY KEY AUTOINCREMENT,MH_TXN_CODE TEXT,MH_TXN_DT TEXT,MH_DOC_REF TEXT,MH_LOCN_CODE TEXT,MH_SR_CODE TEXT,MH_REF_SYS_ID INTEGER,MH_REF_TXN_CODE TEXT,MH_REF_TXN_NO TEXT,MH_REF_TXN_DT TEXT,MH_SALE_REF_SYS_ID TEXT,MH_SALE_REF_TXN_CODE TEXT,MH_SALE_REF_TXN_NO TEXT,MH_SALE_REF_TXN_DT TEXT,MH_CONTACT_NO TEXT,MH_CONTACT_PERSON TEXT,MH_CUST_TYPE TEXT,MH_CUST_AC_CODE TEXT,MH_CUST_AC_DESC TEXT,MH_ADD1 TEXT,MH_ADD2 TEXT,MH_ADD3 TEXT,MH_ADD4 TEXT,MH_CN_CODE TEXT,MH_ST_CODE TEXT,MH_CT_CODE TEXT,MH_CT_AR_CODE TEXT,MH_POSTAL TEXT,MH_MOBILE TEXT,MH_PHONE TEXT,MH_FAX TEXT,MH_EMAIL TEXT,MH_DESC TEXT,MH_STATUS TEXT,MH_APPOINT_DT TEXT,LANG_CODE TEXT,USER_ID TEXT,SYS_ID TEXT,TXN_NO TEXT,MH_COMP_CODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS COPY_LOGI_T_MEASURE_TREE (ID INTEGER PRIMARY KEY AUTOINCREMENT,MT_MH_SYS_ID INTEGER TEXT,MT_COMP_CODE INTEGER TEXT,MT_SYS_ID INTEGER,MT_DESC TEXT,MT_PARENT_SYS_ID INTEGER,MT_LEVEL_ID INTEGER,MT_LEVEL_TYPE TEXT,MT_BUILD_TYPE TEXT,LANG_CODE TEXT,USER_ID TEXT,MT_MODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS COPY_LOGI_T_MEASURE_LINES (ID INTEGER PRIMARY KEY AUTOINCREMENT,ML_SYS_ID INTEGER,ML_MH_SYS_ID INTEGER,ML_COMP_CODE INTEGER,ML_LANG_CODE TEXT,ML_TXN_DT TEXT,ML_LOCN_CODE TEXT,ML_LINE TEXT,ML_BULD_TYPE TEXT,ML_BUILD TEXT,ML_FLOOR TEXT,ML_FLAT TEXT,ML_UNIT TEXT,ML_WIDTH TEXT,ML_HEIGHT TEXT,ML_MOUNT_TYPE TEXT,ML_MOUNT_ON TEXT,ML_OPERATE TEXT,ML_CONTROL TEXT,ML_OPENING TEXT,ML_PELMET TEXT,ML_DESIGN_DEPTH TEXT, ML_PROJECTION TEXT,ML_FASICA TEXT,ML_REMARKS TEXT,ML_CLOSE_YN TEXT,ML_OP_HEAD_SYS_ID TEXT,ML_SC_LINE_SYS_ID TEXT,ML_FULL_WIDTH TEXT,ML_FULL_HEIGHT TEXT,ML_LEFT_WALL TEXT,ML_RIGHT_WALL TEXT,ML_CEILING_UP TEXT,ML_FLOOR_DOWN TEXT,ML_WINDOW_DEPTH TEXT,ML_WINDOW_OPENING TEXT,ML_HANDLE_POSITION TEXT,ML_HANDLE_SIZE TEXT,ML_POWER_DISTANCE TEXT,ML_GYPSUM_YN TEXT,ML_GYPSUM_WIDTH TEXT,ML_GYPSUM_HEIGHT TEXT,ML_GYPSUM_DEPTH TEXT,ML_ROOM_NO TEXT,ML_WINDOW_NO TEXT,ML_POWER_SIDE TEXT,ML_SITE_READY_YN TEXT,ML_WINDOW_TYPE TEXT,ML_DOME_HEIGHT TEXT,ML_CORNER_DEGREE TEXT,ML_CORVE_DEPTH TEXT,ML_PARTITIONED_WINDOW_YN TEXT,ML_NO_OF_PARTITION TEXT,ML_PARTITION_01_WIDTH TEXT,ML_PARTITION_02_WIDTH TEXT,ML_PARTITION_03_WIDTH TEXT,ML_PARTITION_04_WIDTH TEXT,ML_PARTITION_05_WIDTH TEXT,ML_PARTITION_06_WIDTH TEXT,ML_PARTITION_07_WIDTH TEXT,ML_PARTITION_08_WIDTH TEXT,ML_PARTITION_09_WIDTH TEXT,ML_PARTITION_10_WIDTH TEXT,LANG_CODE TEXT,USER_ID TEXT, ML_BLOB BLOB,ML_MODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS COPY_BluePrintImage (ID INTEGER PRIMARY KEY AUTOINCREMENT,MI_ML_SYS_ID INTEGER,MI_ML_MH_SYS_ID INTEGER,MI_ML_IMAGE TEXT,MI_USER_ID TEXT, MI_LANG_CODE TEXT, MI_ML_COMP_CODE INTEGER,MI_IMAGE_PATH BLOB,MI_DESC TEXT,MI_SIZE TEXT,MI_MODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS COPY_LOGI_T_MEASURE_IMAGE (ID INTEGER PRIMARY KEY AUTOINCREMENT,ML_SYS_ID INTEGER,ML_MH_SYS_ID INTEGER,ML_IMAGE TEXT,USER_ID TEXT, LANG_CODE TEXT, ML_COMP_CODE INTEGER,IMAGE_PATH TEXT,MI_DESC TEXT,MI_SIZE TEXT,MI_MODE TEXT)",[]);
		tx.executeSql('INSERT INTO COPY_LOGI_T_MEASURE_HEAD SELECT * FROM LOGI_T_MEASURE_HEAD', successID);
		tx.executeSql('INSERT INTO COPY_LOGI_T_MEASURE_TREE SELECT * FROM LOGI_T_MEASURE_TREE', successID);
		tx.executeSql('INSERT INTO COPY_LOGI_T_MEASURE_LINES SELECT * FROM LOGI_T_MEASURE_LINES', successID);
		tx.executeSql('INSERT INTO COPY_BluePrintImage SELECT * FROM BluePrintImage', successID);
		tx.executeSql('INSERT INTO COPY_LOGI_T_MEASURE_IMAGE SELECT * FROM LOGI_T_MEASURE_IMAGE', successID);
		function successID(){
			return true;
		}
	}
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}

}


function Copy2Local(){
	//alert("inside Copy2Local");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(Copy2LocalDB, errorCB);
	function Copy2LocalDB(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS LOGI_T_MEASURE_HEAD (ID INTEGER PRIMARY KEY AUTOINCREMENT,MH_TXN_CODE TEXT,MH_TXN_DT TEXT,MH_DOC_REF TEXT,MH_LOCN_CODE TEXT,MH_SR_CODE TEXT,MH_REF_SYS_ID INTEGER,MH_REF_TXN_CODE TEXT,MH_REF_TXN_NO TEXT,MH_REF_TXN_DT TEXT,MH_SALE_REF_SYS_ID TEXT,MH_SALE_REF_TXN_CODE TEXT,MH_SALE_REF_TXN_NO TEXT,MH_SALE_REF_TXN_DT TEXT,MH_CONTACT_NO TEXT,MH_CONTACT_PERSON TEXT,MH_CUST_TYPE TEXT,MH_CUST_AC_CODE TEXT,MH_CUST_AC_DESC TEXT,MH_ADD1 TEXT,MH_ADD2 TEXT,MH_ADD3 TEXT,MH_ADD4 TEXT,MH_CN_CODE TEXT,MH_ST_CODE TEXT,MH_CT_CODE TEXT,MH_CT_AR_CODE TEXT,MH_POSTAL TEXT,MH_MOBILE TEXT,MH_PHONE TEXT,MH_FAX TEXT,MH_EMAIL TEXT,MH_DESC TEXT,MH_STATUS TEXT,MH_APPOINT_DT TEXT,LANG_CODE TEXT,USER_ID TEXT,SYS_ID TEXT,TXN_NO TEXT,MH_COMP_CODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS LOGI_T_MEASURE_TREE (ID INTEGER PRIMARY KEY AUTOINCREMENT,MT_MH_SYS_ID INTEGER TEXT,MT_COMP_CODE INTEGER TEXT,MT_SYS_ID INTEGER,MT_DESC TEXT,MT_PARENT_SYS_ID INTEGER,MT_LEVEL_ID INTEGER,MT_LEVEL_TYPE TEXT,MT_BUILD_TYPE TEXT,LANG_CODE TEXT,USER_ID TEXT,MT_MODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS LOGI_T_MEASURE_LINES (ID INTEGER PRIMARY KEY AUTOINCREMENT,ML_SYS_ID INTEGER,ML_MH_SYS_ID INTEGER,ML_COMP_CODE INTEGER,ML_LANG_CODE TEXT,ML_TXN_DT TEXT,ML_LOCN_CODE TEXT,ML_LINE TEXT,ML_BULD_TYPE TEXT,ML_BUILD TEXT,ML_FLOOR TEXT,ML_FLAT TEXT,ML_UNIT TEXT,ML_WIDTH TEXT,ML_HEIGHT TEXT,ML_MOUNT_TYPE TEXT,ML_MOUNT_ON TEXT,ML_OPERATE TEXT,ML_CONTROL TEXT,ML_OPENING TEXT,ML_PELMET TEXT,ML_DESIGN_DEPTH TEXT, ML_PROJECTION TEXT,ML_FASICA TEXT,ML_REMARKS TEXT,ML_CLOSE_YN TEXT,ML_OP_HEAD_SYS_ID TEXT,ML_SC_LINE_SYS_ID TEXT,ML_FULL_WIDTH TEXT,ML_FULL_HEIGHT TEXT,ML_LEFT_WALL TEXT,ML_RIGHT_WALL TEXT,ML_CEILING_UP TEXT,ML_FLOOR_DOWN TEXT,ML_WINDOW_DEPTH TEXT,ML_WINDOW_OPENING TEXT,ML_HANDLE_POSITION TEXT,ML_HANDLE_SIZE TEXT,ML_POWER_DISTANCE TEXT,ML_GYPSUM_YN TEXT,ML_GYPSUM_WIDTH TEXT,ML_GYPSUM_HEIGHT TEXT,ML_GYPSUM_DEPTH TEXT,ML_ROOM_NO TEXT,ML_WINDOW_NO TEXT,ML_POWER_SIDE TEXT,ML_SITE_READY_YN TEXT,ML_WINDOW_TYPE TEXT,ML_DOME_HEIGHT TEXT,ML_CORNER_DEGREE TEXT,ML_CORVE_DEPTH TEXT,ML_PARTITIONED_WINDOW_YN TEXT,ML_NO_OF_PARTITION TEXT,ML_PARTITION_01_WIDTH TEXT,ML_PARTITION_02_WIDTH TEXT,ML_PARTITION_03_WIDTH TEXT,ML_PARTITION_04_WIDTH TEXT,ML_PARTITION_05_WIDTH TEXT,ML_PARTITION_06_WIDTH TEXT,ML_PARTITION_07_WIDTH TEXT,ML_PARTITION_08_WIDTH TEXT,ML_PARTITION_09_WIDTH TEXT,ML_PARTITION_10_WIDTH TEXT,LANG_CODE TEXT,USER_ID TEXT, ML_BLOB BLOB,ML_MODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS BluePrintImage (ID INTEGER PRIMARY KEY AUTOINCREMENT,MI_ML_SYS_ID INTEGER,MI_ML_MH_SYS_ID INTEGER,MI_ML_IMAGE TEXT,MI_USER_ID TEXT, MI_LANG_CODE TEXT, MI_ML_COMP_CODE INTEGER,MI_IMAGE_PATH BLOB,MI_DESC TEXT,MI_SIZE TEXT,MI_MODE TEXT)",[]);
		tx.executeSql("CREATE TABLE IF NOT EXISTS LOGI_T_MEASURE_IMAGE (ID INTEGER PRIMARY KEY AUTOINCREMENT,ML_SYS_ID INTEGER,ML_MH_SYS_ID INTEGER,ML_IMAGE TEXT,USER_ID TEXT, LANG_CODE TEXT, ML_COMP_CODE INTEGER,IMAGE_PATH TEXT,MI_DESC TEXT,MI_SIZE TEXT,MI_MODE TEXT)",[]);
		tx.executeSql('INSERT INTO LOGI_T_MEASURE_HEAD SELECT * FROM COPY_LOGI_T_MEASURE_HEAD', successID);
		tx.executeSql('INSERT INTO LOGI_T_MEASURE_TREE SELECT * FROM COPY_LOGI_T_MEASURE_TREE', successID);
		tx.executeSql('INSERT INTO LOGI_T_MEASURE_LINES SELECT * FROM COPY_LOGI_T_MEASURE_LINES', successID);
		tx.executeSql('INSERT INTO BluePrintImage SELECT * FROM COPY_BluePrintImage', successID);
		tx.executeSql('INSERT INTO LOGI_T_MEASURE_IMAGE SELECT * FROM COPY_LOGI_T_MEASURE_IMAGE', successID);
		function successID(){
			return true;
		}
	}
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}

}



/* Head Values Send to Server Concept Start */
	
	function HeadValueSend2Server(){
		//alert("HeadValueSend2Server");
		//setTimeout(LocalDataDelete, 10000);
		localStorage.setItem("TreeParent", "null");
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(Server_Head_1, errorCB);
		function Server_Head_1(tx) {
			
			tx.executeSql('SELECT * FROM LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				//alert(treeHeadIdlength+"<----Treelength");
				if(treeHeadIdlength <=10){
					setTimeout(LocalDataDelete, 12000);
				}else if(treeHeadIdlength <=20){
					setTimeout(LocalDataDelete, 22000);
				}else{
					setTimeout(LocalDataDelete, 50000);
				}
				
			});
			
			//alert("LOGI_T_MEASURE_HEAD");
			tx.executeSql('SELECT * FROM LOGI_T_MEASURE_HEAD', [], function (tx, results) {
				//alert("In Query");
				var headData =  [];
				var Headlength = results.rows.length;
				for (var i = 0; i < Headlength; i++) {
					var row = results.rows.item(i);
					//alert(row.MH_SR_CODE+"<---MH_SR_CODE");
					var headValues = {USER_COMP_CODE:row.MH_COMP_CODE,MH_TXN_CODE:row.MH_TXN_CODE,MH_TXN_DT:row.MH_TXN_DT,LSH_DOC_REF:row.MH_DOC_REF,LSL_LOCN_CODE:row.MH_LOCN_CODE,LSL_SR_CODE:row.MH_SR_CODE,LSL_REF_SYS_ID:row.MH_REF_SYS_ID,LSL_REF_TXN_CODE:row.MH_REF_TXN_CODE,LSL_REF_TXN_NO:row.MH_REF_TXN_NO,LSL_REF_TXN_DT:row.MH_REF_TXN_DT,MH_SALE_REF_TXN_CODE:row.MH_SALE_REF_TXN_CODE,MH_SALE_REF_TXN_NO:row.MH_SALE_REF_TXN_NO,MH_SALE_REF_SYS_ID:row.MH_SALE_REF_SYS_ID,MH_SALE_REF_TXN_DT:row.MH_SALE_REF_TXN_DT,LSL_CONTACT_NO:row.MH_CONTACT_NO,MH_CONTACT_PERSON:row.MH_CONTACT_PERSON,LSL_CUST_AC_CODE:row.MH_CUST_AC_CODE,MH_CUST_AC_DESC:row.MH_CUST_AC_DESC,MH_ADD1:row.MH_ADD1,LSL_ADD2:row.MH_ADD2,LSL_ADD3:row.MH_ADD3,LSL_ADD4:row.MH_ADD4,LSL_CN_CODE:row.MH_CN_CODE,LSL_ST_CODE:row.MH_ST_CODE,MH_CT_CODE:row.MH_CT_CODE,LSL_CT_AREA_CODE:row.MH_CT_AR_CODE,LSL_POSTAL:row.MH_POSTAL,LSL_MOBILE:row.MH_MOBILE,LSL_PHONE:row.MH_PHONE,LSL_FAX:row.MH_FAX,LSL_EMAIL:row.MH_EMAIL,LSL_DESC:row.MH_DESC,LSL_APPOINT_DT:row.MH_APPOINT_DT,USER_ID:row.USER_ID,MH_REF_TXN_DT:row.MH_REF_TXN_DT,SYS_ID:row.SYS_ID,MH_CUST_ID:row.MH_CUST_ID};
					headData.push(headValues);
				}
			 	var len = headData.length;
				//alert(headData.length+"<---headData.length");
				var headLengthCount=0;
				var measureLinesysId = 6;
				var linID = 0;
				var ImgID = 0;
			 	for (var i=0; i<len; i++){
					headLengthCount++;
			 		var headPush = headData[i];
			 		//var currentDate = moment();
		 			//var Today = moment(currentDate).format('DD-MMM-YYYY');
		 			//alert("Today->"+Today);
		 			//headPush.MH_TXN_DT=Today;
			 		//alert("Date->"+headPush.MH_TXN_DT);
					var comp_code = localStorage.getItem("USER_COMP_CODE");
					//alert(JSON.stringify(headPush)+"headPush"); 
					//alert("USER_COMP_CODE->"+headPush.USER_COMP_CODE);
					//alert("LSL_SR_CODE->"+headPush.LSL_SR_CODE);
					$.ajax({
						type: "POST",
					    url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionHead_Local2Server",
					    data : {"headData":headPush},
					    dataType:'json',
					    async: false,
					    success: function (json){
							//prompt(JSON.stringify(json)+"JSON.stringify(json)");
							//alert(json+"json");
							if(json.error_message=="Success"){
								localStorage.setItem("SYS_ID", json.system_id);
								var HeadIdOld = headPush.SYS_ID;
								//alert("Haed Intial Id"+HeadId)
								var HeadIdNew = json.system_id;
								//alert("H msg->"+json.error_message);
								//alert("Head Id for Tree"+LineReId);
								tx.executeSql('UPDATE LOGI_T_MEASURE_TREE SET MT_MH_SYS_ID =? WHERE MT_MH_SYS_ID =?', [HeadIdNew,HeadIdOld], function (tx, results) {});
								tx.executeSql('UPDATE LOGI_T_MEASURE_LINES SET ML_MH_SYS_ID =? WHERE ML_MH_SYS_ID =?', [HeadIdNew,HeadIdOld], function (tx, results) {});
								tx.executeSql('UPDATE LOGI_T_MEASURE_IMAGE SET ML_MH_SYS_ID =? WHERE ML_MH_SYS_ID =?', [HeadIdNew,HeadIdOld], function (tx, results) {});
								tx.executeSql('UPDATE BluePrintImage SET MI_ML_MH_SYS_ID =? WHERE MI_ML_MH_SYS_ID =?', [HeadIdNew,HeadIdOld], function (tx, results) {});
								
								var NewHeadId = json.system_id;
								tx.executeSql('SELECT * FROM LOGI_T_MEASURE_TREE WHERE MT_MH_SYS_ID = ?', [NewHeadId], function (tx, results) {
									var TreeDataValue =  [];
									var Treelength = results.rows.length;
									for (var i=0; i <Treelength; i++){
										var row = results.rows.item(i);
										var MT_PARENT_SYS_ID=null;
										var TreeData = {MT_MH_SYS_ID:row.MT_MH_SYS_ID ,MT_COMP_CODE:row.MT_COMP_CODE ,MT_SYS_ID:row.MT_SYS_ID ,MT_DESC:row.MT_DESC ,MT_PARENT_SYS_ID:MT_PARENT_SYS_ID ,MT_LEVEL_ID:row.MT_LEVEL_ID ,MT_LEVEL_TYPE:row.MT_LEVEL_TYPE ,MT_BUILD_TYPE:row.MT_BUILD_TYPE ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID};
										TreeDataValue.push(TreeData);
									}
									var len = TreeDataValue.length;
									
									/* Tree, Line and Image sync start */
									for(var i=0; i<len;i++){
										var TreeData = TreeDataValue[i];
										if(i!=0){
											var MT_PARENT_SYS_ID = localStorage.getItem("MT_PARENT_SYS_ID");
											TreeData.MT_PARENT_SYS_ID = MT_PARENT_SYS_ID;
										}
										
										if(TreeData.MT_LEVEL_ID==6){
											var NewWindowType = localStorage.getItem("WindowTypeLocal");
											var IdData6 = localStorage.getItem("checkId6");
											TreeData.MT_PARENT_SYS_ID = IdData6;
											//alert("IdData->"+IdData);
										}else if(TreeData.MT_LEVEL_ID==5){
											var IdData5 = localStorage.getItem("checkId5");
											TreeData.MT_PARENT_SYS_ID = IdData5;
											TreeData.MT_LEVEL_TYPE=null;
										}else if(TreeData.MT_LEVEL_ID==4){
											var IdData4 = localStorage.getItem("checkId4");
											TreeData.MT_PARENT_SYS_ID = IdData4;
											TreeData.MT_LEVEL_TYPE=null;
										}else if(TreeData.MT_LEVEL_ID==3){
											var IdData3 = localStorage.getItem("checkId3");
											TreeData.MT_PARENT_SYS_ID = IdData3;
											TreeData.MT_LEVEL_TYPE=null;
										}else if(TreeData.MT_LEVEL_ID==2){
											var IdData2 = localStorage.getItem("checkId2");
											TreeData.MT_PARENT_SYS_ID = IdData2;
											TreeData.MT_LEVEL_TYPE=null;
										}else{
											TreeData.MT_LEVEL_TYPE=null;
											//alert("else"+TreeData.MT_LEVEL_TYPE);
										}
										
										$.ajax({
											type: "POST",
											url: "http://test.sedarspine.com/en/spineLogisticsApp/LOGI_T_MEASURE_TREE",
											data :  {"TreeData":TreeData},
											dataType:'json',
											async: false,
											success: function (json){
												//alert(json.error_message);
												if(json.error_message=="Success"){
													//alert("Id-"+json.pSysId);
													var MT_PARENT_SYS_ID = json.pSysId;
													var previousParent=MT_PARENT_SYS_ID;
													localStorage.setItem("MT_PARENT_SYS_ID", MT_PARENT_SYS_ID);
													localStorage.setItem("TreeParent", "New");
													//alert(json.levelId);
													if(json.levelId == 5){
														//alert("json.pSysId->"+json.pSysId);
														localStorage.setItem("checkId6", json.pSysId);
													}else if(json.levelId == 4){
														//alert("json.pSysId->"+json.pSysId);
														localStorage.setItem("checkId5", json.pSysId);
													}else if(json.levelId == 3){
														//alert("json.pSysId->"+json.pSysId);
														localStorage.setItem("checkId4", json.pSysId);
													}else if(json.levelId == 2){
														//alert("json.pSysId->"+json.pSysId);
														localStorage.setItem("checkId3", json.pSysId);
													}else if(json.levelId == 1){
														//alert("json.pSysId->"+json.pSysId);
														localStorage.setItem("checkId2", json.pSysId);
													}else if(json.levelId == 6){
														measureLinesysId++;
														localStorage.setItem("newPsysId", json.pSysId);
														
														/* Update fn start in line  */
														//alert("Old Tree Id->"+TreeData.MT_SYS_ID+"--<Return Id->"+json.pSysId);
														
														tx.executeSql('UPDATE LOGI_T_MEASURE_LINES SET ML_SYS_ID =? WHERE ML_SYS_ID = ?', [json.pSysId,TreeData.MT_SYS_ID], function (tx, results) {
															//alert("Update success");
														});
														tx.executeSql('UPDATE LOGI_T_MEASURE_IMAGE SET ML_SYS_ID =? WHERE ML_SYS_ID = ?', [json.pSysId,TreeData.MT_SYS_ID], function (tx, results) {
															//alert("Img Update success");
														});
														tx.executeSql('UPDATE BluePrintImage SET MI_ML_SYS_ID =? WHERE MI_ML_SYS_ID = ?', [json.pSysId,TreeData.MT_SYS_ID], function (tx, results) {
															//alert("Bp Update success");
														});
														/* Update fn end in line  */
														
														//Line and img sync start
														
														tx.executeSql('SELECT * FROM LOGI_T_MEASURE_LINES WHERE ML_SYS_ID = ?', [json.pSysId], function (tx, results) {
															var lineData =  [];
															var Linelength = results.rows.length;
															//alert("Linelength-"+Linelength);
															for (var i=0; i <Linelength; i++){
																var row = results.rows.item(i);
																var linesValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:row.ML_MH_SYS_ID ,ML_COMP_CODE:row.ML_COMP_CODE ,ML_TXN_DT:row.ML_TXN_DT ,ML_LOCN_CODE:row.ML_LOCN_CODE ,ML_LINE:row.ML_LINE ,ML_BULD_TYPE:row.ML_BULD_TYPE ,ML_BUILD:row.ML_BUILD ,ML_FLOOR:row.ML_FLOOR ,ML_FLAT:row.ML_FLAT ,ML_UNIT:row.ML_UNIT ,ML_WIDTH:row.ML_WIDTH ,ML_HEIGHT:row.ML_HEIGHT ,ML_MOUNT_TYPE:row.ML_MOUNT_TYPE ,ML_MOUNT_ON:row.ML_MOUNT_ON ,ML_OPERATE:row.ML_OPERATE ,ML_CONTROL:row.ML_CONTROL ,ML_OPENING:row.ML_OPENING ,ML_PELMET:row.ML_PELMET ,ML_DEPTH:row.ML_DESIGN_DEPTH ,ML_PROJECTION:row.ML_PROJECTION ,ML_FASICA:row.ML_FASICA ,ML_REMARKS:row.ML_REMARKS ,ML_CLOSE_YN:row.ML_CLOSE_YN ,ML_OP_HEAD_SYS_ID:row.ML_OP_HEAD_SYS_ID ,ML_SC_LINE_SYS_ID:row.ML_SC_LINE_SYS_ID ,ML_FULL_WIDTH:row.ML_FULL_WIDTH ,ML_FULL_HEIGHT:row.ML_FULL_HEIGHT ,ML_LEFT_WALL:row.ML_LEFT_WALL ,ML_RIGHT_WALL:row.ML_RIGHT_WALL ,ML_CEILING_UP:row.ML_CEILING_UP ,ML_FLOOR_DOWN:row.ML_FLOOR_DOWN ,ML_WINDOW_DEPTH:row.ML_WINDOW_DEPTH ,ML_WINDOW_OPENING:row.ML_WINDOW_OPENING ,ML_HANDLE_POSITION:row.ML_HANDLE_POSITION ,ML_HANDLE_SIZE:row.ML_HANDLE_SIZE ,ML_POWER_DISTANCE:row.ML_POWER_DISTANCE ,ML_GYPSUM_YN:row.ML_GYPSUM_YN ,ML_GYPSUM_WIDTH:row.ML_GYPSUM_WIDTH ,ML_GYPSUM_HEIGHT:row.ML_GYPSUM_HEIGHT ,ML_GYPSUM_DEPTH:row.ML_GYPSUM_DEPTH ,ML_ROOM_NO:row.ML_ROOM_NO ,ML_WINDOW_NO:row.ML_WINDOW_NO ,ML_POWER_SIDE:row.ML_POWER_SIDE ,ML_SITE_READY_YN:row.ML_SITE_READY_YN ,ML_WINDOW_TYPE:row.ML_WINDOW_TYPE ,ML_DOME_HEIGHT:row.ML_DOME_HEIGHT ,ML_CORNER_DEGREE:row.ML_CORNER_DEGREE ,ML_CORVE_DEPTH:row.ML_CORVE_DEPTH ,ML_PARTITIONED_WINDOW_YN:row.ML_PARTITIONED_WINDOW_YN ,ML_NO_OF_PARTITION:row.ML_NO_OF_PARTITION ,ML_PARTITION_01_WIDTH:row.ML_PARTITION_01_WIDTH ,ML_PARTITION_02_WIDTH:row.ML_PARTITION_02_WIDTH ,ML_PARTITION_03_WIDTH:row.ML_PARTITION_03_WIDTH ,ML_PARTITION_04_WIDTH:row.ML_PARTITION_04_WIDTH ,ML_PARTITION_05_WIDTH:row.ML_PARTITION_05_WIDTH ,ML_PARTITION_06_WIDTH:row.ML_PARTITION_06_WIDTH ,ML_PARTITION_07_WIDTH:row.ML_PARTITION_07_WIDTH ,ML_PARTITION_08_WIDTH:row.ML_PARTITION_08_WIDTH ,ML_PARTITION_09_WIDTH:row.ML_PARTITION_09_WIDTH ,ML_PARTITION_10_WIDTH:row.ML_PARTITION_10_WIDTH ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID};
																lineData.push(linesValue);
															}
															//alert(" push Line ->"+JSON.stringify(lineData));
															var length = lineData.length;
															//alert("push data-"+length);
															var treelengthcount = 0;
															for (var i=0; i<length; i++){
																treelengthcount++;
																var linePushData = lineData[i];
																//alert("push-"+linePushData.ML_SYS_ID);
																//alert("Before location-"+lineData[0].ML_LOCN_CODE);
																
																linePushData.ML_LOCN_CODE=lineData[0].ML_LOCN_CODE;
																linePushData.ML_OP_HEAD_SYS_ID=lineData[0].ML_OP_HEAD_SYS_ID;
																linePushData.ML_SC_LINE_SYS_ID=lineData[0].ML_SC_LINE_SYS_ID;
																
																//linePushData.ML_UNIT=lineData[0].ML_UNIT;
																//alert("After location-"+linePushData.ML_LOCN_CODE);
																//var currentDate = moment();
																//var Today = moment(currentDate).format('DD-MMM-YYYY');
																//alert("Today->"+Today);
																//alert("old date->"+linePushData.ML_TXN_DT);
																//linePushData.ML_TXN_DT=Today;
																//alert("new date->"+linePushData.ML_TXN_DT);
																$.ajax({
																	type: "POST",
																	url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionLines_Local2Server",
																	data :  {"lineData":linePushData},
																	dataType:'json',
																	async: false,
																	success: function (json){
																		//alert("Line ->"+JSON.stringify(json));
																		//alert("data-"+data);
																		if(json.error_message=="Success"){ 
																			//alert("line Id-->"+json.linesys_id);
																			//alert("return_status-->"+json.return_status);
																			//alert("error_message-->"+json.error_message);
																			
																			var LinesysIdnew=json.linesys_id;
																			var linesysid1=linePushData.ML_SYS_ID;
																			
																			/* BluePrint Image Save To DB Start */ 
																			
																			tx.executeSql('SELECT * FROM BluePrintImage WHERE MI_ML_SYS_ID = ?', [LinesysIdnew], function (tx, results) {
																				var imageData =  [];
																				var ImageLength = results.rows.length;
																				//alert("BluePrint ImageLength--"+ImageLength);
																				for (var i=0; i <ImageLength; i++){
																					var row = results.rows.item(i);
																					var imageValue = {ML_SYS_ID:row.MI_ML_SYS_ID ,ML_MH_SYS_ID:row.MI_ML_MH_SYS_ID ,ML_IMAGE:row.MI_ML_IMAGE ,USER_ID:row.MI_USER_ID ,LANG_CODE:row.MI_LANG_CODE , ML_COMP_CODE:row.MI_ML_COMP_CODE, MI_DESC:row.MI_DESC,MI_SIZE:row.MI_SIZE};
																					imageData.push(imageValue);
																				}
																				//alert(JSON.stringify(imageData));
																				//alert("live PRINT url ->"+JSON.stringify(imageData));
																				var imgLen = imageData.length;
																				var countimg = 0;
																				for( var i=0; i < imgLen; i++){
																					var imagePushData = imageData[i];
																					$.ajax({
																						type: "POST",
																						url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionImage_Local2Server",
																						data :  {"imageData":imagePushData},
																						dataType:'json',
																						async: false,
																						success: function (json) {
																							//alert("blueprint error_message-->"+json.error_message);
																							//alert("return_status-->"+json.return_status);
																						}
																					});
																				}
																			}); 
																			
																			/* BluePrint Image Save To DB End */
																			
																			tx.executeSql('SELECT * FROM LOGI_T_MEASURE_IMAGE WHERE ML_SYS_ID = ?', [LinesysIdnew], function (tx, results) {
																				var imageData =  [];
																				var ImageLength = results.rows.length;
																				//alert("ajax ImageLength--"+ImageLength);
																				for (var i=0; i <ImageLength; i++){
																					var row = results.rows.item(i);
																					var imageValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:row.ML_MH_SYS_ID ,ML_IMAGE:row.IMAGE_PATH ,USER_ID:row.USER_ID ,LANG_CODE:row.LANG_CODE , ML_COMP_CODE:row.ML_COMP_CODE, MI_DESC:row.MI_DESC,MI_SIZE:row.MI_SIZE};
																					imageData.push(imageValue);
																				}
																				//alert(JSON.stringify(imageData));
																				//alert("ready to send server ->"+JSON.stringify(imageData));
																				var imgLen = imageData.length;
																				//alert(imgLen);
																				var countimg = 0;
																				for( var i=0; i < imgLen; i++){
																					var imagePushData = imageData[i];
																					$.ajax({
																						type: "POST",
																						url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionImage_Local2Server",
																						data :  {"imageData":imagePushData},
																						dataType:'json',
																						async: false,
																						success: function (json) {
																							//alert("img error_message-->"+json.error_message);
																							//alert("return_status-->"+json.return_status);
																						}
																					});
																				}
																			});
																		}else{
																			alert(json.error_message);
																		}
																	}
																});						
															}
														});													
														//Line and img sync end
													}
												}else{
													alert(json.error_message);
												}
											}
										})
									}
									
								});
							}else{
								alert(json.error_message);
							}
						},
						error: function (error) {
							//prompt('Ajax error; ' + JSON.stringify(eval(error)));
						}
					});
					if(headLengthCount==len){
						//alert("succss");
					}
			 	}
			});
		}	
		function errorCB(tx, err) {
			//alert("Error");
			//alert("Error processing SQL: "+err);
		}
	}
	
	function LocalDataDelete(){
		//alert(localStorage.getItem('ReloadPageCheck'));
		if(localStorage.getItem('ReloadPageCheck')=='Yes'){
			//alert("Inside if");
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_HEAD');
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_TREE');
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_LINES');
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_IMAGE');
				tx.executeSql('DROP TABLE IF EXISTS BluePrintImage');
				localStorage.removeItem("LocalHeadlength");
				localStorage.removeItem("HeadDataInsert");
				localStorage.removeItem("HeadId");
				localStorage.removeItem("LineId");
				localStorage.removeItem('ReloadPageCheck');
				checkLocalTreeValue1();
			});
		}else{
			//alert("Inside else");
			var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_HEAD');
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_TREE');
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_LINES');
				tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_IMAGE');
				tx.executeSql('DROP TABLE IF EXISTS BluePrintImage');
				localStorage.removeItem("LocalHeadlength");
				localStorage.removeItem("HeadDataInsert");
				localStorage.removeItem("HeadId");
				localStorage.removeItem("LineId");
				localStorage.removeItem('ReloadPageCheck');
				$('body').removeClass('loading').loader('hide');
				alert("Measurement Values Are successfully Sync");
				window.location.reload(true);
			});
		}
	}
	/* Head Values Send to Server Concept Ends */
	
	/*Image values send to server concept Start*/
	
	function local2ServerImage(){
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(LocalImg, errorCB);
		function LocalImg(tx) {	
			tx.executeSql('SELECT * FROM LOGI_T_MEASURE_IMAGE', [], function (tx, results) {
				var Imglength = results.rows.length;
				for(var i=0; i<Imglength; i++ ){
					var imageU = results.rows.item(i).ML_IMAGE;
					
					var FileName=imageU.substr(imageU.lastIndexOf('.jpg') + 1);
					//alert("FileName-"+FileName);
					if(FileName == "jpg"){
						var imageURI = results.rows.item(i).ML_IMAGE;
						var options = new FileUploadOptions();
						options.fileKey = "file";
						options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
						options.mimeType = "image/jpeg";
					}else{
						var imageURI = results.rows.item(i).ML_IMAGE;
						var img = results.rows.item(i).IMAGE_PATH;
						var options = new FileUploadOptions();
						options.fileKey = "file";
						options.fileName = img.substr(img.lastIndexOf('/') + 1);
						options.mimeType = "image/jpeg";
					}
					
					
					// var options = new FileUploadOptions();
					// options.fileKey = "file";
					// options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
					// options.mimeType = "image/jpeg";
					var params = new Object();
					options.params = params;
					options.chunkedMode = false;
					var ft = new FileTransfer();
					ft.upload(imageURI, "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionLines_UploadImage", win, fail, options, false);
				}
				function win(r) {
					//alert("Response = " + r.response);
				}
				function fail(error) {
					//alert("error");
					//alert("An error has occurred: Code = " + error.code);
					//alert("upload error source " + error.source);
					//alert("upload error target " + error.target);
				}
			});
		}
		function errorCB(tx, err) {
			//alert("Error");
			//alert("Error processing SQL: "+err);
		}
	}
	 
	 /*Image values send to server concept Ends*/