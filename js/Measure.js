document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   //onload();
   getConn();
}

function getConn() {
	localStorage.removeItem("Internet");
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
		//alert("No Network");
		localStorage.setItem("Internet","No");
		getMeasureModeType();
		//onload();
    }else{
    	localStorage.setItem("Internet","Yes");
		getDatafromServer();
    }
}

function getMeasureModeType(){
	var GetModeType = localStorage.getItem("Mesure_Mode");
	if(GetModeType=='edit'){
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(HeadqueryDB, errorCB);
		function HeadqueryDB(tx){
			var mesurementTransaction_id = localStorage.getItem("mesurementTransaction_id");
			tx.executeSql('SELECT * FROM City_Desc_Head WHERE MH_REF_SYS_ID=?', [mesurementTransaction_id], function (tx, results) {
				var MH_CUST_AC_DESC = results.rows.item(0).MH_CUST_AC_DESC;
				var MH_CONTACT_PERSON = results.rows.item(0).MH_CONTACT_PERSON;
				var MH_SALE_REF_TXN_CODE = results.rows.item(0).MH_SALE_REF_TXN_CODE;
				var MH_SALE_REF_TXN_NO = results.rows.item(0).MH_SALE_REF_TXN_NO;
				
				var ADD1 = results.rows.item(0).MH_ADD1;
				var ADD2 = results.rows.item(0).MH_ADD2;
				var ADD3 = results.rows.item(0).MH_ADD3;
				var ADD4 = results.rows.item(0).MH_ADD4;
				
				if(ADD1 != "null"){
					var MH_ADD1 = results.rows.item(0).MH_ADD1;
				}else{
					var MH_ADD1 ="";
				}
				if(ADD2 != "null"){
					var MH_ADD2 = results.rows.item(0).MH_ADD2;
				}else{
					var MH_ADD2 ="";
				}
				if(ADD3 != "null"){
					var MH_ADD3 = results.rows.item(0).MH_ADD3;
				}
				else{
					var MH_ADD3 ="";
				}
				if(ADD4 !="null"){
					var MH_ADD4 = results.rows.item(0).MH_ADD4;
				}else{
					var MH_ADD4 ="";
				}
				
				var ADDRESS = MH_ADD1 + "," + MH_ADD2+","+MH_ADD3+","+MH_ADD4;
				
				var AREA = results.rows.item(0).AREA_DESC;
				var CT = results.rows.item(0).CT_DESC;
				var CN = results.rows.item(0).CN_DESC;
				var LSL_CUST_ID = results.rows.item(0).LSL_CUST_ID;
				if(AREA != "null"){
				  //alert(AREA_DESC);
				  var AREA_DESC = results.rows.item(0).AREA_DESC;
				}else{
					var AREA_DESC ="";
				}
				if(CT != "null"){
				  var CT_DESC = results.rows.item(0).CT_DESC;
				  var city1 = AREA_DESC+","+CT_DESC;
				}else{
					var CT_DESC ="";
				}
				if(CN != "null"){
				  var CN_DESC = results.rows.item(0).CN_DESC;
				}
				else{
					var CN_DESC ="";
				}
				var NewCityAdr= AREA_DESC + "," + CT_DESC +","+CN_DESC;
			
				document.getElementById("City").setAttribute('value',NewCityAdr);
				
				document.getElementById("MH_CUST_AC_DESC").setAttribute('value',MH_CUST_AC_DESC);
				document.getElementById("MH_CONTACT_PERSON").setAttribute('value',MH_CONTACT_PERSON);
				document.getElementById("MH_ADD1").setAttribute('value',ADDRESS);
				document.getElementById("MH_SALE_REF_TXN_CODE").setAttribute('value',MH_SALE_REF_TXN_CODE);
				document.getElementById("MH_SALE_REF_TXN_NO").setAttribute('value',MH_SALE_REF_TXN_NO);
				DisplaySelect();
			});
		}
		function errorCB(tx, err){
			//alert("Error");
			//alert("Error processing SQL: "+err);
	 	}
	}else{
		onload();
	}
} 

<!-- fetch local data from sqlite db start -->

function onload(){
	DisplaySelect();
	var GetModeType = localStorage.getItem("Mesure_Mode");
	if(GetModeType=='edit'){
		
	}else{
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		/* Head Table values start */
		//alert("Onload");
		db.transaction(queryDB, errorCB);  
		function queryDB(tx) {
			tx.executeSql('SELECT * FROM LOGI_T_SCHEDULE_HEAD ', [], function (tx, results) {
				var logic_head = results.rows.length;
				var LSH_TXN_CODE = results.rows.item(0).LSH_TXN_CODE;
				var LSH_TXN_DT = results.rows.item(0).LSH_TXN_DT;
				var LSH_TXN_NO = results.rows.item(0).LSH_TXN_NO;
				var LSH_DOC_REF = results.rows.item(0).LSH_DOC_REF;
				//alert(LSH_TXN_CODE+"-"+LSH_TXN_DT+"-"+LSH_TXN_NO+"-"+LSH_DOC_REF);
				/* Head values start */
				
				var currentDate = moment();
				var Today = moment(currentDate).format('DD-MMM-YYYY');
				
				document.getElementById("defaultdate1").setAttribute('value',Today);
				var USER_ID=localStorage.getItem("user_id");
				var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
				document.getElementById("USER_ID").setAttribute('value',USER_ID);
				document.getElementById("USER_COMP_CODE").setAttribute('value',USER_COMP_CODE);
				
				document.getElementById("LSH_TXN_CODE").setAttribute('value',LSH_TXN_CODE);
				document.getElementById("LSH_TXN_DT").setAttribute('value',LSH_TXN_DT);
				document.getElementById("LSH_TXN_NO").setAttribute('value',LSH_TXN_NO);
				document.getElementById("LSH_DOC_REF").setAttribute('value',LSH_DOC_REF);
					
				/* Head values end */
				
				
			});
		}
		/* Head Table values end */

		/* Lines Table values start */
		db.transaction(LineDB, errorCB);
		function LineDB(tx) {
			var mesurementTransaction_id = localStorage.getItem("mesurementTransaction_id");
			//alert(mesurementTransaction_id);
			tx.executeSql('SELECT * FROM LOGI_T_SCHEDULE_LINES WHERE LSL_SYS_ID = ? ', [mesurementTransaction_id], function (tx, results) {
				var fetch_len = results.rows.length;
				localStorage.setItem("lsl_sys_id", results.rows.item(0).LSL_SYS_ID);
				var lsl_sys_id = results.rows.item(0).LSL_SYS_ID;				
				var LSL_REF_TXN_CODE = results.rows.item(0).LSL_REF_TXN_CODE;
				var LSL_CT_AREA_CODE = results.rows.item(0).LSL_CT_AREA_CODE;
				var LSL_CT_CODE = results.rows.item(0).LSL_CT_CODE;
				var LSL_REF_TXN_NO = results.rows.item(0).LSL_REF_TXN_NO;
				var LSL_REF_TXN_DT = results.rows.item(0).LSL_REF_TXN_DT;
				var LSL_CUST_AC_DESC = results.rows.item(0).LSL_CUST_AC_DESC;
				var LSL_CONTACT_PERSON = results.rows.item(0).LSL_CONTACT_PERSON;
				var LSL_CONTACT_NO = results.rows.item(0).LSL_CONTACT_NO;
				var LSL_LOCN_CODE = results.rows.item(0).LSL_LOCN_CODE;
				localStorage.setItem("LSL_LOCN_CODE",LSL_LOCN_CODE);
				var LSL_REQUESTED_BY = results.rows.item(0).LSL_REQUESTED_BY;
				var LSL_JOB_CODE = results.rows.item(0).LSL_JOB_CODE;
				var LSL_JOB_STATUS = results.rows.item(0).LSL_JOB_STATUS;
				var LSL_SYS_ID = results.rows.item(0).LSL_SYS_ID;
				var ADD1 = results.rows.item(0).LSL_ADD1;
				var ADD2 = results.rows.item(0).LSL_ADD2;
				var ADD3 = results.rows.item(0).LSL_ADD3;
				var ADD4 = results.rows.item(0).LSL_ADD4;
				var LSL_CUST_ID = results.rows.item(0).LSL_CUST_ID;
				var LSL_CN_CODE = results.rows.item(0).LSL_CN_CODE;
				var LSL_CUST_AC_CODE = results.rows.item(0).LSL_CUST_AC_CODE;
				var LSL_APPOINT_DT = results.rows.item(0).LSL_APPOINT_DT;
				var LSL_JOB_STATUS = results.rows.item(0).LSL_JOB_STATUS;
				var LSL_DESC = results.rows.item(0).LSL_DESC;
				var LSL_EMAIL = results.rows.item(0).LSL_EMAIL;
				var LSL_FAX = results.rows.item(0).LSL_FAX;
				var LSL_PHONE = results.rows.item(0).LSL_PHONE;
				var LSL_MOBILE = results.rows.item(0).LSL_MOBILE;
				var LSL_POSTAL = results.rows.item(0).LSL_POSTAL;
				var LSL_CONTACT_NO = results.rows.item(0).LSL_CONTACT_NO;
				var LSL_REF_SYS_ID = results.rows.item(0).LSL_REF_SYS_ID;
				var LSL_SR_CODE = results.rows.item(0).LSL_SR_CODE;
				var LSL_ST_CODE = results.rows.item(0).LSL_ST_CODE;
				
				if(ADD1 != "null"){
					var LSL_ADD1 = results.rows.item(0).LSL_ADD1;
				}else{
					var LSL_ADD1 ="";
				}
				if(ADD2 != "null"){
					var LSL_ADD2 = results.rows.item(0).LSL_ADD2;
				}else{
					var LSL_ADD2 ="";
				}
				if(ADD3 != "null"){
					var LSL_ADD3 = results.rows.item(0).LSL_ADD3;
				}
				else{
					var LSL_ADD3 ="";
				}
				if(ADD4 !="null"){
					var LSL_ADD4 = results.rows.item(0).LSL_ADD4;
				}else{
					var LSL_ADD4 ="";
				}
				
				
				var LSL_ADDRESS = LSL_ADD1 + "," + LSL_ADD2+","+LSL_ADD3+","+LSL_ADD4;
				
				var LSL_CITY = LSL_CT_AREA_CODE + "," + LSL_CT_CODE +","+LSL_CN_CODE;
				
				/* Line value display start */ 

				document.getElementById("LSL_REF_TXN_CODE").setAttribute('value',LSL_REF_TXN_CODE);
				document.getElementById("LSL_REF_TXN_NO").setAttribute('value',LSL_REF_TXN_NO);
				document.getElementById("P_MH_SALE_REF_TXN_DT").setAttribute('value',LSL_REF_TXN_DT);
				document.getElementById("defaultdate3").setAttribute('value',LSL_REF_TXN_DT);

				document.getElementById("lsl_sys_id").setAttribute('value',lsl_sys_id);
				 document.getElementById("MH_SALE_REF_SYS_ID").setAttribute('value',LSL_REF_SYS_ID);
				 document.getElementById("MH_CUST_AC_DESC").setAttribute('value',LSL_CUST_AC_DESC);
				 document.getElementById("MH_CONTACT_PERSON").setAttribute('value',LSL_CONTACT_PERSON);
				 document.getElementById("MH_ADD1").setAttribute('value',LSL_ADDRESS);
				 //document.getElementById("City").setAttribute('value',LSL_CITY);
				 document.getElementById("MH_CT_CODE").setAttribute('value',LSL_CT_CODE);
				 document.getElementById("MH_SALE_REF_TXN_CODE").setAttribute('value',LSL_REF_TXN_CODE);
				 document.getElementById("MH_SALE_REF_TXN_NO").setAttribute('value',LSL_REF_TXN_NO);
				 document.getElementById("LSL_CN_CODE").setAttribute('value',LSL_CN_CODE);
				 document.getElementById("LSL_CUST_AC_CODE").setAttribute('value',LSL_CUST_AC_CODE);
				 document.getElementById("LSL_APPOINT_DT").setAttribute('value',LSL_APPOINT_DT);
				 document.getElementById("LSL_JOB_STATUS").setAttribute('value',LSL_JOB_STATUS);
				 document.getElementById("LSL_DESC").setAttribute('value',LSL_DESC);
				 document.getElementById("LSL_EMAIL").setAttribute('value',LSL_EMAIL);
				 document.getElementById("LSL_FAX").setAttribute('value',LSL_FAX);
				 document.getElementById("LSL_PHONE").setAttribute('value',LSL_PHONE);
				 document.getElementById("LSL_MOBILE").setAttribute('value',LSL_MOBILE);
				 document.getElementById("LSL_POSTAL").setAttribute('value',LSL_POSTAL);
				 document.getElementById("LSL_CONTACT_NO").setAttribute('value',LSL_CONTACT_NO);
				 document.getElementById("LSL_SR_CODE").setAttribute('value',LSL_SR_CODE);
				 document.getElementById("LSL_ADD1").setAttribute('value',LSL_ADD1);
				 document.getElementById("LSL_ADD2").setAttribute('value',LSL_ADD2);
				 document.getElementById("LSL_ADD3").setAttribute('value',LSL_ADD3);
				 document.getElementById("LSL_ADD4").setAttribute('value',LSL_ADD4);
				 //document.getElementById("LSL_CUST_ID").setAttribute('value',LSL_CUST_ID);
				 
				 
			 /* hidden values start */
				document.getElementById("LSL_LOCN_CODE").setAttribute('value',LSL_LOCN_CODE);
				document.getElementById("LSL_REF_SYS_ID").setAttribute('value',LSL_SYS_ID);
				document.getElementById("LSL_REF_TXN_DT").setAttribute('value',LSL_REF_TXN_DT);
				document.getElementById("LSL_CONTACT_NO").setAttribute('value',LSL_CONTACT_NO);
				document.getElementById("LSL_CN_CODE").setAttribute('value',LSL_CN_CODE);
				document.getElementById("LSL_ST_CODE").setAttribute('value',LSL_ST_CODE);
				document.getElementById("LSL_POSTAL").setAttribute('value',LSL_POSTAL);
				document.getElementById("LSL_MOBILE").setAttribute('value',LSL_MOBILE);
				document.getElementById("LSL_PHONE").setAttribute('value',LSL_PHONE);
				document.getElementById("LSL_FAX").setAttribute('value',LSL_FAX);
				document.getElementById("LSL_EMAIL").setAttribute('value',LSL_EMAIL);
				document.getElementById("LSL_DESC").setAttribute('value',LSL_DESC);
				document.getElementById("LSL_JOB_STATUS").setAttribute('value',LSL_JOB_STATUS);
				document.getElementById("LSL_APPOINT_DT").setAttribute('value',LSL_APPOINT_DT);
				document.getElementById("LSL_CUST_AC_CODE").setAttribute('value',LSL_CUST_AC_CODE);
				document.getElementById("LSL_CT_AREA_CODE").setAttribute('value',LSL_CT_AREA_CODE);
				document.getElementById("LSL_ADD2").setAttribute('value',LSL_ADD2);
				document.getElementById("LSL_ADD3").setAttribute('value',LSL_ADD3);
				document.getElementById("LSL_ADD4").setAttribute('value',LSL_ADD4);
				//document.getElementById("LSL_CUST_ID").setAttribute('value',LSL_CUST_ID);
				 /* hidden values end */
				 
					/* Line value display end */			
					
				});

			tx.executeSql('SELECT * FROM City_Desc WHERE LSL_SYS_ID = ? ', [mesurementTransaction_id], function (tx, results) {
				var fetch_len = results.rows.length;
				//alert(fetch_len);
				
				var AREA = results.rows.item(0).AREA_DESC;
				var CT = results.rows.item(0).CT_DESC;
				var CN = results.rows.item(0).CN_DESC;
				var LSL_CUST_ID = results.rows.item(0).LSL_CUST_ID;
				if(AREA != "null"){
				  //alert(AREA_DESC);
				  var AREA_DESC = results.rows.item(0).AREA_DESC;
				}else{
					var AREA_DESC ="";
				}
				if(CT != "null"){
				  var CT_DESC = results.rows.item(0).CT_DESC;
				  var city1 = AREA_DESC+","+CT_DESC;
				}else{
					var CT_DESC ="";
				}
				if(CN != "null"){
				  var CN_DESC = results.rows.item(0).CN_DESC;
				}
				else{
					var CN_DESC ="";
				}
				var NewCityAdr= AREA_DESC + "," + CT_DESC +","+CN_DESC;
				
				//alert(NewCityAdr);
				document.getElementById("City").setAttribute('value',NewCityAdr);
				document.getElementById("LSL_CUST_ID").setAttribute('value',LSL_CUST_ID);
			   
			});
			}
		function errorCB(tx, err) {
			//alert("Error");
			//alert("Error processing SQL: "+err);
		}
	}
	
	}
 	
/* Lines Table values end */

/* Select Box values start */ 
 function DisplaySelect(){
	 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	 
	 db.transaction(BuildType, errorCB);                        

	 function BuildType(tx) {
	 	tx.executeSql('SELECT * FROM BUILD_TYPE ', [], function (tx, results) {
	 		var BuildType_len = results.rows.length;
			var length = 0;
	 		$("#BuildType").ready(function () {
	 			for (var i = 0; i < BuildType_len; i++) {
	 				$('#ML_BULD_TYPE').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
				}
	 		  });
	 		});
	 }
	 
	                        
db.transaction(UnitType, errorCB);
	 function UnitType(tx) {
	 	tx.executeSql('SELECT * FROM UNIT_TYPE ', [], function (tx, results) {
	 		var UnitType_len = results.rows.length;
			var length = 0;
	 		//alert("UnitType_len-"+UnitType_len);
	 		$("#UnitType").ready(function () {
	 			for (var i = 0; i < UnitType_len; i++) {
	 				$('[name="ML_UNIT[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
				}
	 		});
	 	});
	 }
	 
	 
	 
	 db.transaction(Product, errorCB);                        

	 function Product(tx) {
	 	tx.executeSql('SELECT * FROM PRODUCT_TYPE ', [], function (tx, results) {
	 		var Product_len = results.rows.length;
	 		//alert("Product_len-"+Product_len);
	 		$("#ProductType").ready(function () {
		 		 for (var i = 0; i < Product_len; i++) {
	                $('#ML_PRODUCT_CODE').append('<option value="'+results.rows.item(i).IF_CODE+'">'+results.rows.item(i).IF_DESC+'</option>');
	             }
	             
		 		  });
	 		
	 	});
	 }
	 
	 db.transaction(ColorCode, errorCB);                        

	 function ColorCode(tx) {
	 	tx.executeSql('SELECT * FROM COLOR_CODE ', [], function (tx, results) {
	 		var ColorCode_len = results.rows.length;
	 	//	alert("ColorCode_len-"+ColorCode_len);
	 		$("#ColorCode").ready(function () {
		 		  for (var i = 0; i < ColorCode_len; i++) {
	                $('#ML_COLOR_CODE').append('<option value="'+results.rows.item(i).IC_CODE+'">'+results.rows.item(i).IC_DESC+'</option>');
	             }
	             
		 	});
	 	});
	 }
	 
	 db.transaction(MountType, errorCB);                        

	 function MountType(tx) {
	 	tx.executeSql('SELECT * FROM MOUNT_TYPE ', [], function (tx, results) {
	 		var MountType_len = results.rows.length;
	 	//	alert("MountType_len-"+MountType_len);
	 		$("#MountType").ready(function () {
	             for (var i = 0; i < MountType_len; i++) {
	                $('[name="ML_MOUNT_TYPE[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	             }
	 		});
	 	});
	 }
	 
	 db.transaction(MountOn, errorCB);
	 function MountOn(tx) {
	 	tx.executeSql('SELECT * FROM MOUNT_ON ', [], function (tx, results) {
	 		var MountOn_len = results.rows.length;
	 		$("#MountOn").ready(function () {
	 			for (var i = 0; i < MountOn_len; i++) {
	 				$('[name="ML_MOUNT_ON[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	             }
	 		});
	 	});
	 }
	 
	 db.transaction(WinOpen, errorCB);
	 function WinOpen(tx) {
	 	tx.executeSql('SELECT * FROM WINOPEN_TYPE ', [], function (tx, results) {
	 		var winopen_len = results.rows.length;
	 		$("#WinOpenType").ready(function () {
		 		for (var i = 0; i < winopen_len; i++) {
	                $('[name="ML_WINDOW_OPENING[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	            }
		 	});
	 	});
	 }
	 
	 db.transaction(HandleType, errorCB);
	 function HandleType(tx) {
	 	tx.executeSql('SELECT * FROM HANDLE_TYPE ', [], function (tx, results) {
	 		var handle_len = results.rows.length;
	 		$("#HandlePositionType").ready(function () {
	 			for (var i = 0; i < handle_len; i++) {
	                $('[name="ML_HANDLE_POSITION[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	            }
		 	});
	 	});
	 }
	 
	 db.transaction(OperateType, errorCB);
	 function OperateType(tx) {
	 	tx.executeSql('SELECT * FROM OPERATE_TYPE ', [], function (tx, results) {
	 		var handle_len = results.rows.length;
	 		$("#HandlePositionType").ready(function () {
	 			for (var i = 0; i < handle_len; i++) {
	                $('[name="ML_OPERATE[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	            }
		 	});
	 	});
	 }
	 
	 db.transaction(ControlType, errorCB);
	 function ControlType(tx) {
	 	tx.executeSql('SELECT * FROM CONTROL_TYPE ', [], function (tx, results) {
	 		var handle_len = results.rows.length;
	 		$("#HandlePositionType").ready(function () {
	 			for (var i = 0; i < handle_len; i++) {
	                $('[name="ML_CONTROL[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	            }
		 	});
	 	});
	 }
	 
	 db.transaction(OpeningType, errorCB);
	 function OpeningType(tx) {
	 	tx.executeSql('SELECT * FROM OPENING_TYPE ', [], function (tx, results) {
	 		var handle_len = results.rows.length;
	 		$("#HandlePositionType").ready(function () {
	 			for (var i = 0; i < handle_len; i++) {
	                $('[name="ML_OPENING[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	            }
		 	});
	 	});
	 }
	 
	db.transaction(PowerType, errorCB);
	function PowerType(tx) {
	 	tx.executeSql('SELECT * FROM POWER_TYPE ', [], function (tx, results) {
	 		var handle_len = results.rows.length;
	 		$("#HandlePositionType").ready(function () {
	 			for (var i = 0; i < handle_len; i++) {
	                $('[name="ML_POWER_SIDE[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
	            }
		 	});
	 	});
	}

	 db.transaction(WindowType, errorCB);
	 function WindowType(tx) {
	 	tx.executeSql('SELECT * FROM WINDOW_TYPE ', [], function (tx, results) {
	 		var handle_len = results.rows.length;
			var length=0;
	 		$("#WindowType").ready(function () {
	 			for (var i = 0; i < handle_len; i++) {
	                $('[name="MT_LEVEL_TYPE[]"]').append('<option value="'+results.rows.item(i).VSL_CODE+'">'+results.rows.item(i).VSL_DESC+'</option>');
					length++;
					if(handle_len == length){
						//alert("success");
						
						var CheckMode = localStorage.getItem("LiveMode");
						//alert("CheckMode->"+CheckMode);
						if(CheckMode=="live_edit_mode"){
							generateLiveEditModeMeasurementTree();
						}else{
							//var Mode = localStorage.getItem("Mode", "edit_mode");
							var Mode = localStorage.getItem("Mode");
							//alert("Mode->"+Mode);
							if(Mode == "edit_mode"){
								//generateMeasurementTree();
								tets123();
							}
						}
						
					}else{
						//alert("Error");
					}
				}
		 	});
	 	});
	 }

	 function errorCB(tx, err) {
	 	//alert("Error");
	 	//alert("Error processing SQL: "+err);
	 	} 
	 
 }
 /* Select Box values end */  
 
 function tets123(){
	//alert("Get Ready");
	var treeHeadId = localStorage.getItem("HeadId");
	//alert("offlinetreeHeadId->"+treeHeadId);
	localStorage.setItem("GetDataTree","OfflineNewData");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(OffDataGet, errorCB);
	function OffDataGet(tx){

		/*
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_HEAD', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----Headlength")
			for (var i=0;i<treeHeadIdlength;i++){
				prompt("Head",JSON.stringify(results1.rows.item(i)));
			}
		});
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_TREE ORDER BY MT_SYS_ID', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----Treelength")
			for (var i=0;i<treeHeadIdlength;i++){
				prompt("Tree",JSON.stringify(results1.rows.item(i)));
			}
		});
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_LINES ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----Linelength")
			for (var i=0;i<treeHeadIdlength;i++){
				prompt("Line",JSON.stringify(results1.rows.item(i)));
			}
		}); 
		tx.executeSql('SELECT * FROM BluePrintImage ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----BPlength")
			for (var i=0;i<treeHeadIdlength;i++){
				prompt("BP",JSON.stringify(results1.rows.item(i)));
			}
		});
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_IMAGE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----Imglength")
			for (var i=0;i<treeHeadIdlength;i++){
				prompt("Img",JSON.stringify(results1.rows.item(i)));
			}
		});
		*/
		tx.executeSql('SELECT * FROM LOGI_T_MEASURE_TREE WHERE MT_MH_SYS_ID = ? ORDER BY MT_SYS_ID', [treeHeadId], function (tx, results) {
			var totallength=results.rows.length;
			var Treelength=0;
			//alert("Tree length->"+totallength);
			for (var i = 0; i < totallength;i++) {
			//alert(results.rows.item(i).MT_LEVEL_ID);
				if (results.rows.item(i).MT_LEVEL_ID=="1" && results.rows.item(i).MT_DESC!="" && i==0) {
					$('#measurementTab').append('<li class="input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-line-sys-id="" value="'+results.rows.item(i).MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
					//$('[name="ML_BULD_TYPE"]').val(results.rows.item(i).ML_BULD_TYPE);
				}else if(results.rows.item(i).MT_LEVEL_ID=="2" && results.rows.item(i).MT_DESC!=""){
					$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Floor</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback floor" type="text" data-toggle="tooltip" data-level-id="2" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" name="ML_FLOOR[]" value="'+results.rows.item(i).MT_DESC+'" data-original-title="" title="" data-fv-field="ML_FLOOR[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><span class="input-group-btn"><button class="btn btn-success btn-sm floor" onclick=addChildNode($(this),".appartmentList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'floor\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></span></li></ul>');
				}else if(results.rows.item(i).MT_LEVEL_ID=="3" && results.rows.item(i).MT_DESC!=""){
					$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="appLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Appartment</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback appartment" type="text" data-toggle="tooltip" data-level-id="3" name="ML_FLAT[]" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_FLAT[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm appartment" onclick=addWindowAndProduct($(this),"room",".roomList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'appartment\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
				}else if(results.rows.item(i).MT_LEVEL_ID=="4" && results.rows.item(i).MT_DESC!=""){
					$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="roomLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Room</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback room" type="text" data-toggle="tooltip" data-level-id="4" name="ML_ROOM_NO[]" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_ROOM_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement room" data-product-id=#measurementId_'+results.rows.item(i+2).MT_SYS_ID+' onclick="showRoomTab($(this))" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm" onclick=addWindowAndProduct($(this),"wall",".wallList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'room\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
				}else if(results.rows.item(i).MT_LEVEL_ID=="5" && results.rows.item(i).MT_DESC!=""){
					$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="wallLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Wall</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback wall" type="text" data-toggle="tooltip" data-level-id="5" name="ML_WALL[]" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_WALL[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement wall" onclick="showWallTab($(this))" data-product-id=#measurementId_'+results.rows.item(i+1).MT_SYS_ID+' name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm"  onclick=addWindowAndProduct($(this),"window",".windowList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'wall\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')"  type="button"><i class="fa fa-trash"></i></button></li></ul>');
				}else if(results.rows.item(i).MT_LEVEL_ID=="6" && results.rows.item(i).MT_DESC!=""){
					localStorage.removeItem("GetNewLineID");
					//alert(results.rows.item(i).MT_SYS_ID);
					localStorage.setItem("GetNewLineID", results.rows.item(i).MT_SYS_ID);
					$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Window</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback window" type="text" data-toggle="tooltip" data-level-id="6" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" name="ML_WINDOW_NO[]" value="'+results.rows.item(i).MT_DESC+'" data-original-title="" title="" data-fv-field="ML_WINDOW_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm window" onclick="showWindowTab($(this))" data-product-id=#measurementId_'+results.rows.item(i).MT_SYS_ID+' type="button" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'window\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
					LineDataApp(results.rows.item(i).MT_SYS_ID);
					
				}
				Treelength++
				if(Treelength==totallength){
					var CheckMode = localStorage.getItem("SubmitMode");
					$('body').removeClass('loading').loader('hide');
					if(CheckMode=='wait'){
						localStorage.removeItem("SubmitMode")
						$(".next").click();
					}
				}
			}
			
			function LineDataApp(MT_SYS_ID){
				//var Line_ID = localStorage.getItem("GetNewLineID");
				//alert("Line_ID-"+MT_SYS_ID);
				tx.executeSql('SELECT * FROM LOGI_T_MEASURE_LINES WHERE ML_SYS_ID = ?', [MT_SYS_ID], function (tx, results1) {
					var totallength1=results1.rows.length;
					//alert("line length--"+totallength1);
					for(var i=0;i<totallength1;i++){						
						$measurement=results1.rows.item(i).ML_SYS_ID;
						$templateProduct=$('#step2').find('#productTab');
						$cloneProduct=$templateProduct.clone().removeClass('hide').insertBefore($templateProduct);
						$cloneProduct.addClass('active_measurement').attr('id','measurementId_'+$measurement);
						$cloneProduct.find("input").prop('disabled', false);
						$cloneProduct.find("select").prop('disabled', false);
						$cloneProduct.find('#imageAdd').attr('data-target','#measurementId_'+$measurement+'_modal');
						$cloneProduct.find('#headingOne a').attr('href','#dimensions_'+$measurement);
						$cloneProduct.find('#collapseOne').attr('id','dimensions_'+$measurement);
						$cloneProduct.find('#headingTwo a').attr('href','#operations_'+$measurement);
						$cloneProduct.find('#collapseTwo').attr('id','operations_'+$measurement);
						$cloneProduct.find('#headingThree a').attr('href','#others_'+$measurement);
						$cloneProduct.find('#collapseThree').attr('id','others_'+$measurement);
						$cloneProduct.find('#accordion a').attr('data-parent','#measurementCollapse_'+$measurement);
						$cloneProduct.find('#accordion').attr('id','measurementCollapse_'+$measurement);
						//$cloneProduct.find('[name="MT_LEVEL_TYPE[]"]').change();
						//$cloneProduct.find('[name="ML_PELMET[]"]').change();
						$templateModal=$('div.panel-body').find('div#addImage');
						$cloneModal=$templateModal.clone().removeClass('hide').insertBefore($templateModal);
						$cloneModal.attr('id','measurementId_'+$measurement+'_modal').find('form').attr('id','measurementId_'+$measurement+'_modal_data');
						
						//value set to fileds
						var measurementId='#measurementId_'+$measurement;
						//alert("getMeasure->"+measurementId);
						localStorage.setItem("measurementIdNew", measurementId);
						localStorage.setItem("measurementId", measurementId);
						var setValue=results1.rows.item(i);
						$(measurementId).find('.roomTab').addClass('activeRoomTab');
						$(measurementId).find('.wallTab').addClass('activeWallTab');
						$(measurementId).find('.windowTab').addClass('activeWindowTab');
						$(measurementId).find('.roomTab').addClass('active');
						$(measurementId).find('.wallTab').addClass('active');
						$(measurementId).find('.windowTab').addClass('active');
						$(measurementId).find('[name="ML_SYS_ID[]"]').val(setValue.ML_SYS_ID);
						$(measurementId).find('[name="ML_MH_SYS_ID[]"]').val(setValue.ML_MH_SYS_ID);
						$(measurementId).find('[name="mode[]"]').val(setValue.ML_MODE);
						var USER_ID=localStorage.getItem("user_id");
						var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
						$(measurementId).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
						$(measurementId).find('[name="USER_ID[]"]').val(USER_ID);
						$(measurementId).find('[name="headSysIdLines[]"]').val(setValue.ML_MH_SYS_ID);
						$(measurementId).find('[name="headSysId"]').val(setValue.ML_MH_SYS_ID);
						$(measurementId).find('[name="ML_COMP_CODE[]"]').val(setValue.ML_COMP_CODE);
						$(measurementId).find('[name="ML_LANG_CODE[]"]').val(setValue.ML_LANG_CODE);
						$(measurementId).find('[name="MH_TXN_DT[]"]').val(setValue.ML_TXN_DT);
						$(measurementId).find('[name="LSL_LOCN_CODE[]"]').val(setValue.ML_LOCN_CODE);
						$(measurementId).find('[name="ML_Line_Value[]"]').val(setValue.ML_LINE);
						$('[name="ML_BULD_TYPE"]').val(setValue.ML_BULD_TYPE);
						$(measurementId).find('[name="buildingValue[]"]').val(setValue.ML_BUILD);    	
						$(measurementId).find('[name="floorValue[]"]').val(setValue.ML_FLOOR);
						$(measurementId).find('[name="appartmentValue[]"]').val(setValue.ML_FLAT);
						$(measurementId).find('[name="ML_UNIT[]"]').val(setValue.ML_UNIT);
						$(measurementId).find('[name="ML_WIDTH[]"]').val(setValue.ML_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_HEIGHT[]"]').val(setValue.ML_HEIGHT).formatCurrency();
							
							$(measurementId).find('[name="ML_MOUNT_TYPE[]"]').val(setValue.ML_MOUNT_TYPE);
							$(measurementId).find('[name="ML_MOUNT_ON[]"]').val(setValue.ML_MOUNT_ON);
							$(measurementId).find('[name="ML_OPERATE[]"]').val(setValue.ML_OPERATE);
							$(measurementId).find('[name="ML_CONTROL[]"]').val(setValue.ML_CONTROL);
							$(measurementId).find('[name="ML_OPENING[]"]').val(setValue.ML_OPENING);
							$(measurementId).find('[name="ML_PELMET[]"]').val(setValue.ML_PELMET);
							$(measurementId).find('[name="ML_DESIGN_DEPTH[]"]').val(setValue.ML_DESIGN_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_PROJECTION[]"]').val(setValue.ML_PROJECTION).formatCurrency();
							$(measurementId).find('[name="ML_FASICA[]"]').val(setValue.ML_FASICA).formatCurrency();
							$(measurementId).find('[name="ML_REMARKS[]"]').val(setValue.ML_REMARKS);
							$(measurementId).find('[name="ML_CLOSE_YN[]"]').val(setValue.ML_CLOSE_YN);
							$(measurementId).find('[name="MH_SALE_REF_SYS_ID[]"]').val(setValue.ML_OP_HEAD_SYS_ID);
							$(measurementId).find('[name="LSL_REF_SYS_ID[]"]').val(setValue.ML_SC_LINE_SYS_ID);
							localStorage.setItem('ML_OP_HEAD_SYS_ID',setValue.ML_OP_HEAD_SYS_ID);
							localStorage.setItem('ML_SC_LINE_SYS_ID',setValue.ML_SC_LINE_SYS_ID);
							$(measurementId).find('[name="ML_FULL_WIDTH[]"]').val(setValue.ML_FULL_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_FULL_HEIGHT[]"]').val(setValue.ML_FULL_HEIGHT).formatCurrency();
							$(measurementId).find('[name="ML_LEFT_WALL[]"]').val(setValue.ML_LEFT_WALL).formatCurrency();
							//$(measurementId).find('[name="ML_RIGHT_WALL[]"]').val(setValue.ML_RIGHT_WALL);
							$(measurementId).find('[name="ML_CEILING_UP[]"]').val(setValue.ML_CEILING_UP).formatCurrency();
							//$(measurementId).find('[name="ML_FLOOR_DOWN[]"]').val(setValue.ML_FLOOR_DOWN);
							$(measurementId).find('[name="ML_WINDOW_DEPTH[]"]').val(setValue.ML_WINDOW_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_WINDOW_OPENING[]"]').val(setValue.ML_WINDOW_OPENING);
							$(measurementId).find('[name="ML_HANDLE_POSITION[]"]').val(setValue.ML_HANDLE_POSITION);
							$(measurementId).find('[name="ML_HANDLE_SIZE[]"]').val(setValue.ML_HANDLE_SIZE).formatCurrency();
							$(measurementId).find('[name="ML_POWER_DISTANCE[]"]').val(setValue.ML_POWER_DISTANCE).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_YN[]"]').val(setValue.ML_GYPSUM_YN);
							$(measurementId).find('[name="ML_GYPSUM_WIDTH[]"]').val(setValue.ML_GYPSUM_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_HEIGHT[]"]').val(setValue.ML_GYPSUM_HEIGHT).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_DEPTH[]"]').val(setValue.ML_GYPSUM_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_ROOM_NO[]"]').attr('data-level-id',setValue.ML_ROOM_NO);
							$(measurementId).find('[name="ML_WINDOW_NO[]"]').attr('data-level-id',setValue.ML_WINDOW_NO);
							$(measurementId).find('[name="ML_POWER_SIDE[]"]').val(setValue.ML_POWER_SIDE);
							$(measurementId).find('[name="ML_SITE_READY_YN[]"]').val(setValue.ML_SITE_READY_YN);
							$(measurementId).find('[name="MT_LEVEL_TYPE[]"]').val(setValue.ML_WINDOW_TYPE);
							if(setValue.ML_DOME_HEIGHT=="null"){
								$(measurementId).find('[name="ML_DOME_HEIGHT[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_DOME_HEIGHT[]"]').val(setValue.ML_DOME_HEIGHT);
							}
							
							if(setValue.ML_CORNER_DEGREE=="null"){
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val(setValue.ML_CORNER_DEGREE);
							}
							
							if(setValue.ML_CORVE_DEPTH=="null"){
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_CORVE_DEPTH[]"]').val(setValue.ML_CORVE_DEPTH);
							}
							$(measurementId).find('[name="ML_PARTITIONED_WINDOW_YN[]"]').val(setValue.ML_PARTITIONED_WINDOW_YN);
							$(measurementId).find('[name="ML_NO_OF_PARTITION[]"]').val(setValue.ML_NO_OF_PARTITION);
							$(measurementId).find('[name="ML_PARTITION_01_WIDTH[]"]').val(setValue.ML_PARTITION_01_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_02_WIDTH[]"]').val(setValue.ML_PARTITION_02_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_03_WIDTH[]"]').val(setValue.ML_PARTITION_03_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_04_WIDTH[]"]').val(setValue.ML_PARTITION_04_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_05_WIDTH[]"]').val(setValue.ML_PARTITION_05_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_06_WIDTH[]"]').val(setValue.ML_PARTITION_06_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_07_WIDTH[]"]').val(setValue.ML_PARTITION_07_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_08_WIDTH[]"]').val(setValue.ML_PARTITION_08_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_09_WIDTH[]"]').val(setValue.ML_PARTITION_09_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_10_WIDTH[]"]').val(setValue.ML_PARTITION_10_WIDTH).formatCurrency();
						$(measurementId).find('[name="LANG_CODE[]"]').val(setValue.LANG_CODE);
						$(measurementId).find('[name="USER_ID[]"]').val(setValue.USER_ID);
						$('.selectpicker').selectpicker('refresh');
						$('.active_measurement').hide();
						fieldsForMeasurement('addField',$cloneProduct);
						fieldsForMeasurement('revalidateField',$cloneProduct);
						labelNumbering();
						/*
						$('#form_validation').formValidation('addField', 'ML_UNIT[]');
						$('#form_validation').formValidation('addField', 'ML_FULL_WIDTH[]');
						$('#form_validation').formValidation('addField', 'ML_FULL_HEIGHT[]');
						$('#form_validation').formValidation('addField', 'ML_WIDTH[]');
						$('#form_validation').formValidation('addField', 'ML_HEIGHT[]');
						$('#form_validation').formValidation('addField', 'ML_LEFT_WALL[]');
						$('#form_validation').formValidation('addField', 'ML_CEILING_UP[]');
						$('#form_validation').formValidation('addField', 'ML_WINDOW_DEPTH[]');
						$('#form_validation').formValidation('addField', 'ML_WINDOW_OPENING[]');
						$('#form_validation').formValidation('addField', 'ML_HANDLE_POSITION[]');
						$('#form_validation').formValidation('addField', 'ML_HANDLE_SIZE[]');
						$('#form_validation').formValidation('addField', 'ML_POWER_DISTANCE[]');
						$('#form_validation').formValidation('addField', 'ML_POWER_SIDE[]');
						$('#form_validation').formValidation('addField', 'MT_LEVEL_TYPE[]');
						$('#form_validation').formValidation('addField', 'ML_MOUNT_TYPE[]');
						$('#form_validation').formValidation('addField', 'ML_MOUNT_ON[]');
						$('#form_validation').formValidation('addField', 'ML_OPERATE[]');
						$('#form_validation').formValidation('addField', 'ML_CONTROL[]');
						$('#form_validation').formValidation('addField', 'ML_OPENING[]');
						$('#form_validation').formValidation('addField', 'ML_PELMET[]');
						$('#form_validation').formValidation('addField', 'ML_PROJECTION[]');
						$('#form_validation').formValidation('addField', 'ML_FASICA[]');
						
						//revalidateField
						$('#form_validation').formValidation('revalidateField', 'ML_UNIT[]');
						$('#form_validation').formValidation('revalidateField', 'ML_FULL_WIDTH[]');
						$('#form_validation').formValidation('revalidateField', 'ML_FULL_HEIGHT[]');
						$('#form_validation').formValidation('revalidateField', 'ML_WIDTH[]');
						$('#form_validation').formValidation('revalidateField', 'ML_HEIGHT[]');
						$('#form_validation').formValidation('revalidateField', 'ML_LEFT_WALL[]');
						$('#form_validation').formValidation('revalidateField', 'ML_CEILING_UP[]');
						$('#form_validation').formValidation('revalidateField', 'ML_WINDOW_DEPTH[]');
						$('#form_validation').formValidation('revalidateField', 'ML_WINDOW_OPENING[]');
						$('#form_validation').formValidation('revalidateField', 'ML_HANDLE_POSITION[]');
						$('#form_validation').formValidation('revalidateField', 'ML_HANDLE_SIZE[]');
						$('#form_validation').formValidation('revalidateField', 'ML_POWER_DISTANCE[]');
						$('#form_validation').formValidation('revalidateField', 'ML_POWER_SIDE[]');
						$('#form_validation').formValidation('revalidateField', 'MT_LEVEL_TYPE[]');
						$('#form_validation').formValidation('revalidateField', 'ML_MOUNT_TYPE[]');
						$('#form_validation').formValidation('revalidateField', 'ML_MOUNT_ON[]');
						$('#form_validation').formValidation('revalidateField', 'ML_OPERATE[]');
						$('#form_validation').formValidation('revalidateField', 'ML_CONTROL[]');
						$('#form_validation').formValidation('revalidateField', 'ML_OPENING[]');
						$('#form_validation').formValidation('revalidateField', 'ML_PELMET[]');
						$('#form_validation').formValidation('revalidateField', 'ML_PROJECTION[]');
						$('#form_validation').formValidation('revalidateField', 'ML_FASICA[]');
						*/
						
						/* image */
						//alert("Image");
						//alert("Line measureId-"+$measurement);
						tx.executeSql('SELECT * FROM LOGI_T_MEASURE_IMAGE WHERE ML_SYS_ID = ?', [$measurement], function (tx, results1) {
							var totallength1=results1.rows.length;
							//alert("img length-"+totallength1);
							for(var i=0;i<totallength1;i++){
								//alert("mi_sys_Id"+results1.rows.item(i).ML_SYS_ID);
								//alert("sys id->"+results1.rows.item(i).MI_ML_SYS_ID);
								//alert("img path->"+results1.rows.item(i).ML_IMAGE);
								//alert(results1.rows.item(i).MI_DESC);
								var $measurement=results1.rows.item(i).ML_SYS_ID;
								var imageData = results1.rows.item(i).ML_IMAGE;
								//var imageData = results1.rows.item(i).IMAGE_PATH;
								var LivePath = results1.rows.item(i).ML_IMAGE;
								var imageSize = results1.rows.item(i).MI_SIZE;
								var imageDesc = results1.rows.item(i).MI_DESC;
								var mode = results1.rows.item(i).MI_MODE;
								//alert(imageData);
								//alert($measurement+"--"+imageData+"--"+imageSize);
								//alert($measurement);
								var measurementIdNew='#measurementId_'+$measurement+'_modal_data';
								//alert(imageDesc);
								if(imageDesc=='bluePrintImage'){
									//alert("BP_sysId->"+results1.rows.item(i).ML_SYS_ID);
									$(measurementIdNew).find('[name="BP_MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
									//var bule = "BP"+results1.rows.item(i).ML_SYS_ID;
									//alert(bule);
									//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group dp'+ bule +'" data-blue="'+ bule +'"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
								}else if(imageDesc=='otherImage'){
									//alert("img_sysId->"+results1.rows.item(i).ML_SYS_ID);
									$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
									//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									
									var USER_ID=localStorage.getItem("user_id");
									var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
									$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
									$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
									//alert("img"+results1.rows.item(i).MI_MODE);
									$(measurementIdNew).find('[name="mode_check[]"]').val(results1.rows.item(i).MI_MODE);
									$(measurementIdNew).find('[name="linesys_id[]"]').val(results1.rows.item(i).MI_ML_SYS_ID);
									$(measurementIdNew).find('[name="system_id[]"]').val(results1.rows.item(i).MI_MH_SYS_ID);
									$(measurementIdNew).find('[name="MI_DESC[]"]').val(results1.rows.item(i).MI_DESC);
									//alert(results1.rows.item(i).MI_MH_SYS_ID);
									$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group '+results1.rows.item(i).ML_SYS_ID+'"><span onclick="DeleteImgServe($(this),'+results1.rows.item(i).ML_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+LivePath+'" data-val="'+imageSize+'" data-mode="edit" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
								
								}
							}
						});
						
						/* BluePrintImage */
						if(setValue.ML_WINDOW_TYPE!=05){
							tx.executeSql('SELECT * FROM BluePrintImage WHERE MI_ML_SYS_ID = ?', [$measurement], function (tx, results1) {
								var totallength1=results1.rows.length;
								for(var i=0;i<totallength1;i++){
									var $measurement=results1.rows.item(i).MI_ML_SYS_ID;
									var measurementIdNew='#measurementId_'+$measurement+'_modal_data';
									var imageData = results1.rows.item(i).MI_IMAGE_PATH;
									var LivePath = results1.rows.item(i).MI_ML_IMAGE;
									var imageSize = results1.rows.item(i).MI_SIZE;
									var imageDesc = results1.rows.item(i).MI_DESC;
									var mode=results1.rows.item(i).MI_MODE;
									if(imageDesc=='bluePrintImage'){
										$(measurementIdNew).find('[name="BP_MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
										var USER_ID=localStorage.getItem("user_id");
										var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
										$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
										$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
										//alert("BP"+results1.rows.item(i).MI_MODE);
										$(measurementIdNew).find('[name="mode_check[]"]').val(results1.rows.item(i).MI_MODE);
										$(measurementIdNew).find('[name="linesys_id[]"]').val(results1.rows.item(i).MI_ML_SYS_ID);
										$(measurementIdNew).find('[name="system_id[]"]').val(results1.rows.item(i).MI_MH_SYS_ID);
										$(measurementIdNew).find('[name="MI_DESC[]"]').val(results1.rows.item(i).MI_DESC);
										$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group '+results1.rows.item(i).ML_SYS_ID+'"><span onclick="DeleteImgServe($(this),'+results1.rows.item(i).ML_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+LivePath+'" data-val="'+imageSize+'" data-mode="'+mode+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									}
								}
							});
						}
						
						/* BluePrintImage ends*/
						
					}
				});
			}	
		});
	}
	function errorCB(tx, err) {
		//alert("Error");
		//window.open('Measure_Add.html', '_blank','location=no');
		//alert("Error processing SQL: "+err);
	}
	
 }
 
 <!-- fetch local data from sqlite db end -->
 
 // generateLiveEditModeMeasurementTree start
 
 function generateLiveEditModeMeasurementTree(){
	var treeHeadId = localStorage.getItem("Live_Data_HeadId");
	//alert("treeHeadId->"+treeHeadId);
	localStorage.setItem("HeadId",treeHeadId)
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
		//alert("No Network");
		localStorage.setItem("Internet","No");
		//OnlineMeasureEditModeTreeGenerate();
		OfflineGetNewData();
    }else{
		localStorage.setItem("GetDataTree","OnlineNewData");
    	localStorage.setItem("Internet","Yes");
		onlineEditMeasure(treeHeadId);
    }
	/*
	var treeHeadId = localStorage.getItem("Live_Data_HeadId");
	//alert("New Gen->"+treeHeadId);
	var Net = localStorage.getItem("Internet");
	if(Net=="Yes"){
		onlineEditMeasure(treeHeadId);
	}else{
		OnlineMeasureEditModeTreeGenerate();
	} */
 }
 
 function OfflineGetNewData(){
	var treeHeadId = localStorage.getItem("Live_Data_HeadId");
	//alert(treeHeadId);
	localStorage.removeItem("GetDataTree");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(Check_Tree_data, errorCB);
	function Check_Tree_data(tx){
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE WHERE MT_MH_SYS_ID = ?', [treeHeadId], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			//alert(treeHeadIdlength+"<----Treelength");
			if (treeHeadIdlength==0){
				localStorage.setItem("ImgModeCheck","live_edit");
				OnlineMeasureEditModeTreeGenerate();
			}else{
				localStorage.setItem("ImgModeCheck","live_edit_local");
				NewOfflineEditDataTree();
			}
			// for (var i=0;i<treeHeadIdlength;i++){
				// prompt("Tree",JSON.stringify(results1.rows.item(i)));
			// }
		});
	}
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
	
	// if(localStorage.getItem("GetDataTree")=="OfflineNewData"){
		// NewOfflineEditDataTree();
	// }else{
		// OnlineMeasureEditModeTreeGenerate();
	// }
 }
 
 
 function OnlineMeasureEditModeTreeGenerate(){
	//alert("Live Edit mode");
	localStorage.setItem("GetDataTree","OnlineNewData");
	var treeHeadId = localStorage.getItem("Live_Data_HeadId");
	//alert("livetreeHeadId->"+treeHeadId);
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(Get_Tree_data, errorCB);
		function Get_Tree_data(tx) {
			
		/*
			tx.executeSql('SELECT * FROM SelectedTreeDataValue ORDER BY MT_LEVEL_ID', [], function (tx, results1) {
					var treeHeadIdlength=results1.rows.length;
					alert(treeHeadIdlength+"<----Treelength")
					for (var i=0;i<treeHeadIdlength;i++){
						prompt("Tree",JSON.stringify(results1.rows.item(i)));
					}
				});
			tx.executeSql('SELECT * FROM SelectedLineDataValue ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				alert(treeHeadIdlength+"<----Linelength")
				for (var i=0;i<treeHeadIdlength;i++){
					prompt("Line",JSON.stringify(results1.rows.item(i)));
				}
			}); 
			tx.executeSql('SELECT * FROM SelectedImageDataValue ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				alert(treeHeadIdlength+"<----Imglength")
				for (var i=0;i<treeHeadIdlength;i++){
					prompt("img",JSON.stringify(results1.rows.item(i)));
				}
			});
		*/
			tx.executeSql('SELECT * FROM SelectedTreeDataValue WHERE MT_MH_SYS_ID = ? ORDER BY MT_SYS_ID', [treeHeadId], function (tx, results) {
					var totallength=results.rows.length;
					//alert("Tree length->"+totallength);
					for (var i = 0; i < totallength;i++) {
					//alert(results.rows.item(i).MT_LEVEL_ID);
						if (results.rows.item(i).MT_LEVEL_ID=="1" && results.rows.item(i).MT_DESC!="" && i==0) {
							$('#measurementTab').append('<li class="input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-line-sys-id="" value="'+results.rows.item(i).MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
							//$('[name="ML_BULD_TYPE"]').val(results.rows.item(i).ML_BULD_TYPE);
						}else if(results.rows.item(i).MT_LEVEL_ID=="2" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Floor</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback floor" type="text" data-toggle="tooltip" data-level-id="2" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" name="ML_FLOOR[]" value="'+results.rows.item(i).MT_DESC+'" data-original-title="" title="" data-fv-field="ML_FLOOR[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><span class="input-group-btn"><button class="btn btn-success btn-sm floor" onclick=addChildNode($(this),".appartmentList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'floor\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></span></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="3" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="appLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Appartment</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback appartment" type="text" data-toggle="tooltip" data-level-id="3" name="ML_FLAT[]" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_FLAT[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm appartment" onclick=addWindowAndProduct($(this),"room",".roomList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'appartment\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="4" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="roomLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Room</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback room" type="text" data-toggle="tooltip" data-level-id="4" name="ML_ROOM_NO[]" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_ROOM_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement room" data-product-id=#measurementId_'+results.rows.item(i+2).MT_SYS_ID+' onclick="showRoomTab($(this))" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm" onclick=addWindowAndProduct($(this),"wall",".wallList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'room\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="5" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="wallLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Wall</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback wall" type="text" data-toggle="tooltip" data-level-id="5" name="ML_WALL[]" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_WALL[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement wall" onclick="showWallTab($(this))" data-product-id=#measurementId_'+results.rows.item(i+1).MT_SYS_ID+' name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm"  onclick=addWindowAndProduct($(this),"window",".windowList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'wall\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')"  type="button"><i class="fa fa-trash"></i></button></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="6" && results.rows.item(i).MT_DESC!=""){
							localStorage.removeItem("GetNewLineID");
							//alert(results.rows.item(i).MT_SYS_ID);
							localStorage.setItem("GetNewLineID", results.rows.item(i).MT_SYS_ID);
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Window</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback window" type="text" data-toggle="tooltip" data-level-id="6" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" name="ML_WINDOW_NO[]" value="'+results.rows.item(i).MT_DESC+'" data-original-title="" title="" data-fv-field="ML_WINDOW_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm window" onclick="showWindowTab($(this))" data-product-id=#measurementId_'+results.rows.item(i).MT_SYS_ID+' type="button" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'window\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
							LineDataApp(results.rows.item(i).MT_SYS_ID);
							
						}
					}
					
				function LineDataApp(MT_SYS_ID){
					//var Line_ID = localStorage.getItem("GetNewLineID");
					//alert("Line_ID-"+MT_SYS_ID);
					tx.executeSql('SELECT * FROM SelectedLineDataValue WHERE ML_SYS_ID = ?', [MT_SYS_ID], function (tx, results1) {
						var totallength1=results1.rows.length;
						//alert("line length--"+totallength1);
						for(var i=0;i<totallength1;i++){						
							$measurement=results1.rows.item(i).ML_SYS_ID;
							$templateProduct=$('#step2').find('#productTab');
							$cloneProduct=$templateProduct.clone().removeClass('hide').insertBefore($templateProduct);
							$cloneProduct.addClass('active_measurement').attr('id','measurementId_'+$measurement);
							$cloneProduct.find("input").prop('disabled', false);
							$cloneProduct.find("select").prop('disabled', false);
							$cloneProduct.find('#imageAdd').attr('data-target','#measurementId_'+$measurement+'_modal');
							$cloneProduct.find('#headingOne a').attr('href','#dimensions_'+$measurement);
							$cloneProduct.find('#collapseOne').attr('id','dimensions_'+$measurement);
							$cloneProduct.find('#headingTwo a').attr('href','#operations_'+$measurement);
							$cloneProduct.find('#collapseTwo').attr('id','operations_'+$measurement);
							$cloneProduct.find('#headingThree a').attr('href','#others_'+$measurement);
							$cloneProduct.find('#collapseThree').attr('id','others_'+$measurement);
							$cloneProduct.find('#accordion a').attr('data-parent','#measurementCollapse_'+$measurement);
							$cloneProduct.find('#accordion').attr('id','measurementCollapse_'+$measurement);
							//$cloneProduct.find('[name="MT_LEVEL_TYPE[]"]').change();
							//$cloneProduct.find('[name="ML_PELMET[]"]').change();
							$templateModal=$('div.panel-body').find('div#addImage');
							$cloneModal=$templateModal.clone().removeClass('hide').insertBefore($templateModal);
							$cloneModal.attr('id','measurementId_'+$measurement+'_modal').find('form').attr('id','measurementId_'+$measurement+'_modal_data');
							
							//value set to fileds
							var measurementId='#measurementId_'+$measurement;
							//alert("getMeasure->"+measurementId);
							localStorage.setItem("measurementIdNew", measurementId);
							localStorage.setItem("measurementId", measurementId);
							var setValue=results1.rows.item(i);
							$(measurementId).find('.roomTab').addClass('activeRoomTab');
							$(measurementId).find('.wallTab').addClass('activeWallTab');
							$(measurementId).find('.windowTab').addClass('activeWindowTab');
							$(measurementId).find('.roomTab').addClass('active');
							$(measurementId).find('.wallTab').addClass('active');
							$(measurementId).find('.windowTab').addClass('active');
							$(measurementId).find('[name="ML_SYS_ID[]"]').val(setValue.ML_SYS_ID);
							//$(measurementId).find('[name="ML_MH_SYS_ID[]"]').val(setValue.ML_MH_SYS_ID);
							$(measurementId).find('[name="mode[]"]').val('edit');
							var USER_ID=localStorage.getItem("user_id");
							var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
							$(measurementId).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
							$(measurementId).find('[name="USER_ID[]"]').val(USER_ID);
							$(measurementId).find('[name="headSysIdLines[]"]').val(setValue.ML_MH_SYS_ID);
							$(measurementId).find('[name="headSysId"]').val(setValue.ML_MH_SYS_ID);
							$(measurementId).find('[name="ML_COMP_CODE[]"]').val(setValue.ML_COMP_CODE);
							$(measurementId).find('[name="ML_LANG_CODE[]"]').val(setValue.ML_LANG_CODE);
							$(measurementId).find('[name="MH_TXN_DT[]"]').val(setValue.ML_TXN_DT);
							$(measurementId).find('[name="LSL_LOCN_CODE[]"]').val(setValue.ML_LOCN_CODE);
							$(measurementId).find('[name="ML_Line_Value[]"]').val(setValue.ML_LINE);
							$('[name="ML_BULD_TYPE"]').val(setValue.ML_BULD_TYPE);
							$(measurementId).find('[name="buildingValue[]"]').val(setValue.ML_BUILD);    	
							$(measurementId).find('[name="floorValue[]"]').val(setValue.ML_FLOOR);
							$(measurementId).find('[name="appartmentValue[]"]').val(setValue.ML_FLAT);
							$(measurementId).find('[name="ML_UNIT[]"]').val(setValue.ML_UNIT);
							$(measurementId).find('[name="ML_WIDTH[]"]').val(setValue.ML_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_HEIGHT[]"]').val(setValue.ML_HEIGHT).formatCurrency();
							
							$(measurementId).find('[name="ML_MOUNT_TYPE[]"]').val(setValue.ML_MOUNT_TYPE);
							$(measurementId).find('[name="ML_MOUNT_ON[]"]').val(setValue.ML_MOUNT_ON);
							$(measurementId).find('[name="ML_OPERATE[]"]').val(setValue.ML_OPERATE);
							$(measurementId).find('[name="ML_CONTROL[]"]').val(setValue.ML_CONTROL);
							$(measurementId).find('[name="ML_OPENING[]"]').val(setValue.ML_OPENING);
							$(measurementId).find('[name="ML_PELMET[]"]').val(setValue.ML_PELMET);
							$(measurementId).find('[name="ML_DESIGN_DEPTH[]"]').val(setValue.ML_DESIGN_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_PROJECTION[]"]').val(setValue.ML_PROJECTION).formatCurrency();
							$(measurementId).find('[name="ML_FASICA[]"]').val(setValue.ML_FASICA).formatCurrency();
							$(measurementId).find('[name="ML_REMARKS[]"]').val(setValue.ML_REMARKS);
							$(measurementId).find('[name="ML_CLOSE_YN[]"]').val(setValue.ML_CLOSE_YN);
							$(measurementId).find('[name="MH_SALE_REF_SYS_ID[]"]').val(setValue.ML_OP_HEAD_SYS_ID);
							$(measurementId).find('[name="LSL_REF_SYS_ID[]"]').val(setValue.ML_SC_LINE_SYS_ID);
							localStorage.setItem('ML_OP_HEAD_SYS_ID',setValue.ML_OP_HEAD_SYS_ID);
							localStorage.setItem('ML_SC_LINE_SYS_ID',setValue.ML_SC_LINE_SYS_ID);
							$(measurementId).find('[name="ML_FULL_WIDTH[]"]').val(setValue.ML_FULL_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_FULL_HEIGHT[]"]').val(setValue.ML_FULL_HEIGHT).formatCurrency();
							$(measurementId).find('[name="ML_LEFT_WALL[]"]').val(setValue.ML_LEFT_WALL).formatCurrency();
							//$(measurementId).find('[name="ML_RIGHT_WALL[]"]').val(setValue.ML_RIGHT_WALL);
							$(measurementId).find('[name="ML_CEILING_UP[]"]').val(setValue.ML_CEILING_UP).formatCurrency();
							//$(measurementId).find('[name="ML_FLOOR_DOWN[]"]').val(setValue.ML_FLOOR_DOWN);
							$(measurementId).find('[name="ML_WINDOW_DEPTH[]"]').val(setValue.ML_WINDOW_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_WINDOW_OPENING[]"]').val(setValue.ML_WINDOW_OPENING);
							$(measurementId).find('[name="ML_HANDLE_POSITION[]"]').val(setValue.ML_HANDLE_POSITION);
							$(measurementId).find('[name="ML_HANDLE_SIZE[]"]').val(setValue.ML_HANDLE_SIZE).formatCurrency();
							$(measurementId).find('[name="ML_POWER_DISTANCE[]"]').val(setValue.ML_POWER_DISTANCE).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_YN[]"]').val(setValue.ML_GYPSUM_YN);
							$(measurementId).find('[name="ML_GYPSUM_WIDTH[]"]').val(setValue.ML_GYPSUM_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_HEIGHT[]"]').val(setValue.ML_GYPSUM_HEIGHT).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_DEPTH[]"]').val(setValue.ML_GYPSUM_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_ROOM_NO[]"]').attr('data-level-id',setValue.ML_ROOM_NO);
							$(measurementId).find('[name="ML_WINDOW_NO[]"]').attr('data-level-id',setValue.ML_WINDOW_NO);
							$(measurementId).find('[name="ML_POWER_SIDE[]"]').val(setValue.ML_POWER_SIDE);
							$(measurementId).find('[name="ML_SITE_READY_YN[]"]').val(setValue.ML_SITE_READY_YN);
							//alert(setValue.ML_WINDOW_TYPE+","+setValue.ML_DOME_HEIGHT+","+setValue.ML_CORNER_DEGREE+","+setValue.ML_CORVE_DEPTH);
							$(measurementId).find('[name="MT_LEVEL_TYPE[]"]').val(setValue.ML_WINDOW_TYPE);
							if(setValue.ML_DOME_HEIGHT=="null"){
								$(measurementId).find('[name="ML_DOME_HEIGHT[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_DOME_HEIGHT[]"]').val(setValue.ML_DOME_HEIGHT);
							}
							
							if(setValue.ML_CORNER_DEGREE=="null"){
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val(setValue.ML_CORNER_DEGREE);
							}
							
							if(setValue.ML_CORVE_DEPTH=="null"){
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_CORVE_DEPTH[]"]').val(setValue.ML_CORVE_DEPTH);
							}
							
							
							$(measurementId).find('[name="ML_PARTITIONED_WINDOW_YN[]"]').val(setValue.ML_PARTITIONED_WINDOW_YN);
							$(measurementId).find('[name="ML_NO_OF_PARTITION[]"]').val(setValue.ML_NO_OF_PARTITION);
							$(measurementId).find('[name="ML_PARTITION_01_WIDTH[]"]').val(setValue.ML_PARTITION_01_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_02_WIDTH[]"]').val(setValue.ML_PARTITION_02_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_03_WIDTH[]"]').val(setValue.ML_PARTITION_03_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_04_WIDTH[]"]').val(setValue.ML_PARTITION_04_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_05_WIDTH[]"]').val(setValue.ML_PARTITION_05_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_06_WIDTH[]"]').val(setValue.ML_PARTITION_06_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_07_WIDTH[]"]').val(setValue.ML_PARTITION_07_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_08_WIDTH[]"]').val(setValue.ML_PARTITION_08_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_09_WIDTH[]"]').val(setValue.ML_PARTITION_09_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_10_WIDTH[]"]').val(setValue.ML_PARTITION_10_WIDTH).formatCurrency();
							$(measurementId).find('[name="LANG_CODE[]"]').val(setValue.LANG_CODE);
							$(measurementId).find('[name="USER_ID[]"]').val(setValue.USER_ID);
							$('.selectpicker').selectpicker('refresh');
							$('.active_measurement').hide();
							fieldsForMeasurement('addField',$cloneProduct);
							fieldsForMeasurement('revalidateField',$cloneProduct);
							labelNumbering();
							/*
							$('#form_validation').formValidation('addField', 'ML_UNIT[]');
							$('#form_validation').formValidation('addField', 'ML_FULL_WIDTH[]');
							$('#form_validation').formValidation('addField', 'ML_FULL_HEIGHT[]');
							$('#form_validation').formValidation('addField', 'ML_WIDTH[]');
							$('#form_validation').formValidation('addField', 'ML_HEIGHT[]');
							$('#form_validation').formValidation('addField', 'ML_LEFT_WALL[]');
							$('#form_validation').formValidation('addField', 'ML_CEILING_UP[]');
							$('#form_validation').formValidation('addField', 'ML_WINDOW_DEPTH[]');
							$('#form_validation').formValidation('addField', 'ML_WINDOW_OPENING[]');
							$('#form_validation').formValidation('addField', 'ML_HANDLE_POSITION[]');
							$('#form_validation').formValidation('addField', 'ML_HANDLE_SIZE[]');
							$('#form_validation').formValidation('addField', 'ML_POWER_DISTANCE[]');
							$('#form_validation').formValidation('addField', 'ML_POWER_SIDE[]');
							$('#form_validation').formValidation('addField', 'MT_LEVEL_TYPE[]');
							$('#form_validation').formValidation('addField', 'ML_MOUNT_TYPE[]');
							$('#form_validation').formValidation('addField', 'ML_MOUNT_ON[]');
							$('#form_validation').formValidation('addField', 'ML_OPERATE[]');
							$('#form_validation').formValidation('addField', 'ML_CONTROL[]');
							$('#form_validation').formValidation('addField', 'ML_OPENING[]');
							$('#form_validation').formValidation('addField', 'ML_PELMET[]');
							$('#form_validation').formValidation('addField', 'ML_PROJECTION[]');
							$('#form_validation').formValidation('addField', 'ML_FASICA[]');
							
							//revalidateField
							$('#form_validation').formValidation('revalidateField', 'ML_UNIT[]');
							$('#form_validation').formValidation('revalidateField', 'ML_FULL_WIDTH[]');
							$('#form_validation').formValidation('revalidateField', 'ML_FULL_HEIGHT[]');
							$('#form_validation').formValidation('revalidateField', 'ML_WIDTH[]');
							$('#form_validation').formValidation('revalidateField', 'ML_HEIGHT[]');
							$('#form_validation').formValidation('revalidateField', 'ML_LEFT_WALL[]');
							$('#form_validation').formValidation('revalidateField', 'ML_CEILING_UP[]');
							$('#form_validation').formValidation('revalidateField', 'ML_WINDOW_DEPTH[]');
							$('#form_validation').formValidation('revalidateField', 'ML_WINDOW_OPENING[]');
							$('#form_validation').formValidation('revalidateField', 'ML_HANDLE_POSITION[]');
							$('#form_validation').formValidation('revalidateField', 'ML_HANDLE_SIZE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_POWER_DISTANCE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_POWER_SIDE[]');
							$('#form_validation').formValidation('revalidateField', 'MT_LEVEL_TYPE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_MOUNT_TYPE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_MOUNT_ON[]');
							$('#form_validation').formValidation('revalidateField', 'ML_OPERATE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_CONTROL[]');
							$('#form_validation').formValidation('revalidateField', 'ML_OPENING[]');
							$('#form_validation').formValidation('revalidateField', 'ML_PELMET[]');
							$('#form_validation').formValidation('revalidateField', 'ML_PROJECTION[]');
							$('#form_validation').formValidation('revalidateField', 'ML_FASICA[]');
							*/
							
							/* image */
							//alert("Image");
							//alert("Line measureId-"+$measurement);
							
							tx.executeSql('SELECT * FROM SelectedImageDataValue WHERE MI_ML_SYS_ID = ?', [$measurement], function (tx, results1) {
								var totallength1=results1.rows.length;
								//alert("img length-"+totallength1);
								for(var i=0;i<totallength1;i++){
									//alert("mi_sys_Id"+results1.rows.item(i).ML_SYS_ID);
									//alert("sys id->"+results1.rows.item(i).MI_ML_SYS_ID);
									//alert("img path->"+results1.rows.item(i).ML_IMAGE);
									//alert(results1.rows.item(i).MI_DESC);
									var $measurement=results1.rows.item(i).MI_ML_SYS_ID;
									//var imageData = results1.rows.item(i).ML_IMAGE;
									var imageData = results1.rows.item(i).IMAGE_PATH;
									var LivePath = results1.rows.item(i).ML_IMAGE;
									var imageSize = results1.rows.item(i).MI_SIZE;
									var imageDesc = results1.rows.item(i).MI_DESC;
									//alert($measurement+"--"+imageData+"--"+imageSize);
									//alert($measurement);
									var measurementIdNew='#measurementId_'+$measurement+'_modal_data';
									//alert(imageDesc);
									if(imageDesc=='bluePrintImage'){
										//alert("BP_sysId->"+results1.rows.item(i).ML_SYS_ID);
										$(measurementIdNew).find('[name="BP_MI_SYS_ID[]"]').val(results1.rows.item(i).ML_SYS_ID);
										//var bule = "BP"+results1.rows.item(i).ML_SYS_ID;
										//alert(bule);
										//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group dp'+ bule +'" data-blue="'+ bule +'"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									}else if(imageDesc=='otherImage'){
										//alert("img_sysId->"+results1.rows.item(i).ML_SYS_ID);
										$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(results1.rows.item(i).ML_SYS_ID);
										//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									}else{
										//alert("else");
										$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(results1.rows.item(i).ML_SYS_ID);
										//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									}
									
									//alert(measurementIdNew);
									//$(measurementIdNew).find('[name="mode_check[]"]').val('edit');
									var USER_ID=localStorage.getItem("user_id");
									var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
									$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
									$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
									$(measurementIdNew).find('[name="mode_check[]"]').val('edit');
									$(measurementIdNew).find('[name="linesys_id[]"]').val(results1.rows.item(i).MI_ML_SYS_ID);
									$(measurementIdNew).find('[name="system_id[]"]').val(results1.rows.item(i).MI_MH_SYS_ID);
									$(measurementIdNew).find('[name="MI_DESC[]"]').val(results1.rows.item(i).MI_DESC);
									//alert(results1.rows.item(i).MI_MH_SYS_ID);
									$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group '+results1.rows.item(i).ML_SYS_ID+'"><span onclick="DeleteImgServe($(this),'+results1.rows.item(i).ML_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+LivePath+'" data-val="'+imageSize+'" data-mode="edit" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									
								}
							});
							
						}
					});
				}
					
			});
		}
		function errorCB(tx, err) {
			//alert("Error");
			//window.open('Measure_Add.html', '_blank','location=no');
			//alert("Error processing SQL: "+err);
		}					
}
 
 // generateLiveEditModeMeasurementTree End
 
 // generate Live Edit Mode New Measurement Tree Start
  
 function NewOfflineEditDataTree(){
	//alert("Live Edit mode");
	localStorage.setItem("GetDataTree","OfflineNewData");
	var treeHeadId = localStorage.getItem("Live_Data_HeadId");
	//alert("livetreeHeadId->"+treeHeadId);
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(Get_Tree_data, errorCB);
		function Get_Tree_data(tx) {
			/*
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				alert(treeHeadIdlength+"<----Treelength")
				for (var i=0;i<treeHeadIdlength;i++){
					prompt("Tree",JSON.stringify(results1.rows.item(i)));
				}
			});
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				alert(treeHeadIdlength+"<----Linelength")
				for (var i=0;i<treeHeadIdlength;i++){
					prompt("Line",JSON.stringify(results1.rows.item(i)));
				}
			}); 
			tx.executeSql('SELECT * FROM LIVE_BluePrintImage ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				alert(treeHeadIdlength+"<----BPlength")
				for (var i=0;i<treeHeadIdlength;i++){
					prompt("BP",JSON.stringify(results1.rows.item(i)));
				}
			});
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				alert(treeHeadIdlength+"<----Imglength")
				for (var i=0;i<treeHeadIdlength;i++){
					prompt("Img",JSON.stringify(results1.rows.item(i)));
				}
			});
			
			*/
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE WHERE MT_MH_SYS_ID = ? ORDER BY MT_SYS_ID', [treeHeadId], function (tx, results) {
					var totallength=results.rows.length;
					var Treelength=0
					//alert("Tree length->"+totallength);
					for (var i = 0; i < totallength;i++) {
					//alert(results.rows.item(i).MT_LEVEL_ID);
						if (results.rows.item(i).MT_LEVEL_ID=="1" && results.rows.item(i).MT_DESC!="" && i==0) {
							$('#measurementTab').append('<li class="input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-line-sys-id="" value="'+results.rows.item(i).MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
							//$('[name="ML_BULD_TYPE"]').val(results.rows.item(i).ML_BULD_TYPE);
						}else if(results.rows.item(i).MT_LEVEL_ID=="2" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Floor</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback floor" type="text" data-toggle="tooltip" data-level-id="2" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" name="ML_FLOOR[]" value="'+results.rows.item(i).MT_DESC+'" data-original-title="" title="" data-fv-field="ML_FLOOR[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><span class="input-group-btn"><button class="btn btn-success btn-sm floor" onclick=addChildNode($(this),".appartmentList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'floor\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></span></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="3" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="appLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Appartment</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback appartment" type="text" data-toggle="tooltip" data-level-id="3" name="ML_FLAT[]" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_FLAT[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm appartment" onclick=addWindowAndProduct($(this),"room",".roomList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'appartment\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="4" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="roomLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Room</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback room" type="text" data-toggle="tooltip" data-level-id="4" name="ML_ROOM_NO[]" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_ROOM_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement room" data-product-id=#measurementId_'+results.rows.item(i+2).MT_SYS_ID+' onclick="showRoomTab($(this))" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm" onclick=addWindowAndProduct($(this),"wall",".wallList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'room\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="5" && results.rows.item(i).MT_DESC!=""){
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="wallLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Wall</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback wall" type="text" data-toggle="tooltip" data-level-id="5" name="ML_WALL[]" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" data-original-title="" value="'+results.rows.item(i).MT_DESC+'" title="" data-fv-field="ML_WALL[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement wall" onclick="showWallTab($(this))" data-product-id=#measurementId_'+results.rows.item(i+1).MT_SYS_ID+' name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm"  onclick=addWindowAndProduct($(this),"window",".windowList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'wall\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')"  type="button"><i class="fa fa-trash"></i></button></li></ul>');
						}else if(results.rows.item(i).MT_LEVEL_ID=="6" && results.rows.item(i).MT_DESC!=""){
							localStorage.removeItem("GetNewLineID");
							//alert(results.rows.item(i).MT_SYS_ID);
							localStorage.setItem("GetNewLineID", results.rows.item(i).MT_SYS_ID);
							$('.parent_'+results.rows.item(i).MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+results.rows.item(i).MT_SYS_ID+' "><span class="label sedar-color">Window</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback window" type="text" data-toggle="tooltip" data-level-id="6" data-mode="'+ results.rows.item(i).MT_MODE +'" data-sys-id="'+ results.rows.item(i).MT_SYS_ID +'" name="ML_WINDOW_NO[]" value="'+results.rows.item(i).MT_DESC+'" data-original-title="" title="" data-fv-field="ML_WINDOW_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm window" onclick="showWindowTab($(this))" data-product-id=#measurementId_'+results.rows.item(i).MT_SYS_ID+' type="button" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'window\','+results.rows.item(i).MT_SYS_ID+','+results.rows.item(i).MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
							LineDataApp(results.rows.item(i).MT_SYS_ID);
							
						}
						Treelength++
						if(Treelength==totallength){
							var CheckMode = localStorage.getItem("SubmitMode");
							$('body').removeClass('loading').loader('hide');
							if(CheckMode=='wait'){
								localStorage.removeItem("SubmitMode")
								$(".next").click();
							}
						}
					}
					
				function LineDataApp(MT_SYS_ID){
					//var Line_ID = localStorage.getItem("GetNewLineID");
					//alert("Line_ID-"+MT_SYS_ID);
					tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES WHERE ML_SYS_ID = ?', [MT_SYS_ID], function (tx, results1) {
						var totallength1=results1.rows.length;
						//alert("line length--"+totallength1);
						for(var i=0;i<totallength1;i++){						
							$measurement=results1.rows.item(i).ML_SYS_ID;
							$templateProduct=$('#step2').find('#productTab');
							$cloneProduct=$templateProduct.clone().removeClass('hide').insertBefore($templateProduct);
							$cloneProduct.addClass('active_measurement').attr('id','measurementId_'+$measurement);
							$cloneProduct.find("input").prop('disabled', false);
							$cloneProduct.find("select").prop('disabled', false);
							$cloneProduct.find('#imageAdd').attr('data-target','#measurementId_'+$measurement+'_modal');
							$cloneProduct.find('#headingOne a').attr('href','#dimensions_'+$measurement);
							$cloneProduct.find('#collapseOne').attr('id','dimensions_'+$measurement);
							$cloneProduct.find('#headingTwo a').attr('href','#operations_'+$measurement);
							$cloneProduct.find('#collapseTwo').attr('id','operations_'+$measurement);
							$cloneProduct.find('#headingThree a').attr('href','#others_'+$measurement);
							$cloneProduct.find('#collapseThree').attr('id','others_'+$measurement);
							$cloneProduct.find('#accordion a').attr('data-parent','#measurementCollapse_'+$measurement);
							$cloneProduct.find('#accordion').attr('id','measurementCollapse_'+$measurement);
							//$cloneProduct.find('[name="MT_LEVEL_TYPE[]"]').change();
							//$cloneProduct.find('[name="ML_PELMET[]"]').change();
							$templateModal=$('div.panel-body').find('div#addImage');
							$cloneModal=$templateModal.clone().removeClass('hide').insertBefore($templateModal);
							$cloneModal.attr('id','measurementId_'+$measurement+'_modal').find('form').attr('id','measurementId_'+$measurement+'_modal_data');
							
							//value set to fileds
							var measurementId='#measurementId_'+$measurement;
							//alert("getMeasure->"+measurementId);
							localStorage.setItem("measurementIdNew", measurementId);
							localStorage.setItem("measurementId", measurementId);
							var setValue=results1.rows.item(i);
							$(measurementId).find('.roomTab').addClass('activeRoomTab');
							$(measurementId).find('.wallTab').addClass('activeWallTab');
							$(measurementId).find('.windowTab').addClass('activeWindowTab');
							$(measurementId).find('.roomTab').addClass('active');
							$(measurementId).find('.wallTab').addClass('active');
							$(measurementId).find('.windowTab').addClass('active');
							$(measurementId).find('[name="ML_SYS_ID[]"]').val(setValue.ML_SYS_ID);
							//$(measurementId).find('[name="ML_MH_SYS_ID[]"]').val(setValue.ML_MH_SYS_ID);
							$(measurementId).find('[name="mode[]"]').val(setValue.ML_MODE);
							var USER_ID=localStorage.getItem("user_id");
							var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
							$(measurementId).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
							$(measurementId).find('[name="USER_ID[]"]').val(USER_ID);
							$(measurementId).find('[name="headSysIdLines[]"]').val(setValue.ML_MH_SYS_ID);
							$(measurementId).find('[name="headSysId"]').val(setValue.ML_MH_SYS_ID);
							$(measurementId).find('[name="ML_COMP_CODE[]"]').val(setValue.ML_COMP_CODE);
							$(measurementId).find('[name="ML_LANG_CODE[]"]').val(setValue.ML_LANG_CODE);
							$(measurementId).find('[name="MH_TXN_DT[]"]').val(setValue.ML_TXN_DT);
							$(measurementId).find('[name="LSL_LOCN_CODE[]"]').val(setValue.ML_LOCN_CODE);
							$(measurementId).find('[name="ML_Line_Value[]"]').val(setValue.ML_LINE);
							$('[name="ML_BULD_TYPE"]').val(setValue.ML_BULD_TYPE);
							$(measurementId).find('[name="buildingValue[]"]').val(setValue.ML_BUILD);    	
							$(measurementId).find('[name="floorValue[]"]').val(setValue.ML_FLOOR);
							$(measurementId).find('[name="appartmentValue[]"]').val(setValue.ML_FLAT);
							$(measurementId).find('[name="ML_UNIT[]"]').val(setValue.ML_UNIT);
							$(measurementId).find('[name="ML_WIDTH[]"]').val(setValue.ML_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_HEIGHT[]"]').val(setValue.ML_HEIGHT).formatCurrency();
							
							$(measurementId).find('[name="ML_MOUNT_TYPE[]"]').val(setValue.ML_MOUNT_TYPE);
							$(measurementId).find('[name="ML_MOUNT_ON[]"]').val(setValue.ML_MOUNT_ON);
							$(measurementId).find('[name="ML_OPERATE[]"]').val(setValue.ML_OPERATE);
							$(measurementId).find('[name="ML_CONTROL[]"]').val(setValue.ML_CONTROL);
							$(measurementId).find('[name="ML_OPENING[]"]').val(setValue.ML_OPENING);
							$(measurementId).find('[name="ML_PELMET[]"]').val(setValue.ML_PELMET);
							$(measurementId).find('[name="ML_DESIGN_DEPTH[]"]').val(setValue.ML_DESIGN_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_PROJECTION[]"]').val(setValue.ML_PROJECTION).formatCurrency();
							$(measurementId).find('[name="ML_FASICA[]"]').val(setValue.ML_FASICA).formatCurrency();
							$(measurementId).find('[name="ML_REMARKS[]"]').val(setValue.ML_REMARKS);
							$(measurementId).find('[name="ML_CLOSE_YN[]"]').val(setValue.ML_CLOSE_YN);
							$(measurementId).find('[name="MH_SALE_REF_SYS_ID[]"]').val(setValue.ML_OP_HEAD_SYS_ID);
							$(measurementId).find('[name="LSL_REF_SYS_ID[]"]').val(setValue.ML_SC_LINE_SYS_ID);
							localStorage.setItem('ML_OP_HEAD_SYS_ID',setValue.ML_OP_HEAD_SYS_ID);
							localStorage.setItem('ML_SC_LINE_SYS_ID',setValue.ML_SC_LINE_SYS_ID);
							$(measurementId).find('[name="ML_FULL_WIDTH[]"]').val(setValue.ML_FULL_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_FULL_HEIGHT[]"]').val(setValue.ML_FULL_HEIGHT).formatCurrency();
							$(measurementId).find('[name="ML_LEFT_WALL[]"]').val(setValue.ML_LEFT_WALL).formatCurrency();
							//$(measurementId).find('[name="ML_RIGHT_WALL[]"]').val(setValue.ML_RIGHT_WALL);
							$(measurementId).find('[name="ML_CEILING_UP[]"]').val(setValue.ML_CEILING_UP).formatCurrency();
							//$(measurementId).find('[name="ML_FLOOR_DOWN[]"]').val(setValue.ML_FLOOR_DOWN);
							$(measurementId).find('[name="ML_WINDOW_DEPTH[]"]').val(setValue.ML_WINDOW_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_WINDOW_OPENING[]"]').val(setValue.ML_WINDOW_OPENING);
							$(measurementId).find('[name="ML_HANDLE_POSITION[]"]').val(setValue.ML_HANDLE_POSITION);
							$(measurementId).find('[name="ML_HANDLE_SIZE[]"]').val(setValue.ML_HANDLE_SIZE).formatCurrency();
							$(measurementId).find('[name="ML_POWER_DISTANCE[]"]').val(setValue.ML_POWER_DISTANCE).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_YN[]"]').val(setValue.ML_GYPSUM_YN);
							$(measurementId).find('[name="ML_GYPSUM_WIDTH[]"]').val(setValue.ML_GYPSUM_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_HEIGHT[]"]').val(setValue.ML_GYPSUM_HEIGHT).formatCurrency();
							$(measurementId).find('[name="ML_GYPSUM_DEPTH[]"]').val(setValue.ML_GYPSUM_DEPTH).formatCurrency();
							$(measurementId).find('[name="ML_ROOM_NO[]"]').attr('data-level-id',setValue.ML_ROOM_NO);
							$(measurementId).find('[name="ML_WINDOW_NO[]"]').attr('data-level-id',setValue.ML_WINDOW_NO);
							$(measurementId).find('[name="ML_POWER_SIDE[]"]').val(setValue.ML_POWER_SIDE);
							$(measurementId).find('[name="ML_SITE_READY_YN[]"]').val(setValue.ML_SITE_READY_YN);
							$(measurementId).find('[name="MT_LEVEL_TYPE[]"]').val(setValue.ML_WINDOW_TYPE);
							if(setValue.ML_DOME_HEIGHT=="null"){
								$(measurementId).find('[name="ML_DOME_HEIGHT[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_DOME_HEIGHT[]"]').val(setValue.ML_DOME_HEIGHT);
							}
							
							if(setValue.ML_CORNER_DEGREE=="null"){
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val(setValue.ML_CORNER_DEGREE);
							}
							
							if(setValue.ML_CORVE_DEPTH=="null"){
								$(measurementId).find('[name="ML_CORNER_DEGREE[]"]').val('');
							}else{
								$(measurementId).find('[name="ML_CORVE_DEPTH[]"]').val(setValue.ML_CORVE_DEPTH);
							}
							$(measurementId).find('[name="ML_PARTITIONED_WINDOW_YN[]"]').val(setValue.ML_PARTITIONED_WINDOW_YN);
							$(measurementId).find('[name="ML_NO_OF_PARTITION[]"]').val(setValue.ML_NO_OF_PARTITION);
							$(measurementId).find('[name="ML_PARTITION_01_WIDTH[]"]').val(setValue.ML_PARTITION_01_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_02_WIDTH[]"]').val(setValue.ML_PARTITION_02_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_03_WIDTH[]"]').val(setValue.ML_PARTITION_03_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_04_WIDTH[]"]').val(setValue.ML_PARTITION_04_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_05_WIDTH[]"]').val(setValue.ML_PARTITION_05_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_06_WIDTH[]"]').val(setValue.ML_PARTITION_06_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_07_WIDTH[]"]').val(setValue.ML_PARTITION_07_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_08_WIDTH[]"]').val(setValue.ML_PARTITION_08_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_09_WIDTH[]"]').val(setValue.ML_PARTITION_09_WIDTH).formatCurrency();
							$(measurementId).find('[name="ML_PARTITION_10_WIDTH[]"]').val(setValue.ML_PARTITION_10_WIDTH).formatCurrency();
							$(measurementId).find('[name="LANG_CODE[]"]').val(setValue.LANG_CODE);
							$(measurementId).find('[name="USER_ID[]"]').val(setValue.USER_ID);
							$('.selectpicker').selectpicker('refresh');
							$('.active_measurement').hide();
							fieldsForMeasurement('addField',$cloneProduct);
							fieldsForMeasurement('revalidateField',$cloneProduct);
							labelNumbering();
							/*
							$('#form_validation').formValidation('addField', 'ML_UNIT[]');
							$('#form_validation').formValidation('addField', 'ML_FULL_WIDTH[]');
							$('#form_validation').formValidation('addField', 'ML_FULL_HEIGHT[]');
							$('#form_validation').formValidation('addField', 'ML_WIDTH[]');
							$('#form_validation').formValidation('addField', 'ML_HEIGHT[]');
							$('#form_validation').formValidation('addField', 'ML_LEFT_WALL[]');
							$('#form_validation').formValidation('addField', 'ML_CEILING_UP[]');
							$('#form_validation').formValidation('addField', 'ML_WINDOW_DEPTH[]');
							$('#form_validation').formValidation('addField', 'ML_WINDOW_OPENING[]');
							$('#form_validation').formValidation('addField', 'ML_HANDLE_POSITION[]');
							$('#form_validation').formValidation('addField', 'ML_HANDLE_SIZE[]');
							$('#form_validation').formValidation('addField', 'ML_POWER_DISTANCE[]');
							$('#form_validation').formValidation('addField', 'ML_POWER_SIDE[]');
							$('#form_validation').formValidation('addField', 'MT_LEVEL_TYPE[]');
							$('#form_validation').formValidation('addField', 'ML_MOUNT_TYPE[]');
							$('#form_validation').formValidation('addField', 'ML_MOUNT_ON[]');
							$('#form_validation').formValidation('addField', 'ML_OPERATE[]');
							$('#form_validation').formValidation('addField', 'ML_CONTROL[]');
							$('#form_validation').formValidation('addField', 'ML_OPENING[]');
							$('#form_validation').formValidation('addField', 'ML_PELMET[]');
							$('#form_validation').formValidation('addField', 'ML_PROJECTION[]');
							$('#form_validation').formValidation('addField', 'ML_FASICA[]');
							
							//revalidateField
							$('#form_validation').formValidation('revalidateField', 'ML_UNIT[]');
							$('#form_validation').formValidation('revalidateField', 'ML_FULL_WIDTH[]');
							$('#form_validation').formValidation('revalidateField', 'ML_FULL_HEIGHT[]');
							$('#form_validation').formValidation('revalidateField', 'ML_WIDTH[]');
							$('#form_validation').formValidation('revalidateField', 'ML_HEIGHT[]');
							$('#form_validation').formValidation('revalidateField', 'ML_LEFT_WALL[]');
							$('#form_validation').formValidation('revalidateField', 'ML_CEILING_UP[]');
							$('#form_validation').formValidation('revalidateField', 'ML_WINDOW_DEPTH[]');
							$('#form_validation').formValidation('revalidateField', 'ML_WINDOW_OPENING[]');
							$('#form_validation').formValidation('revalidateField', 'ML_HANDLE_POSITION[]');
							$('#form_validation').formValidation('revalidateField', 'ML_HANDLE_SIZE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_POWER_DISTANCE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_POWER_SIDE[]');
							$('#form_validation').formValidation('revalidateField', 'MT_LEVEL_TYPE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_MOUNT_TYPE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_MOUNT_ON[]');
							$('#form_validation').formValidation('revalidateField', 'ML_OPERATE[]');
							$('#form_validation').formValidation('revalidateField', 'ML_CONTROL[]');
							$('#form_validation').formValidation('revalidateField', 'ML_OPENING[]');
							$('#form_validation').formValidation('revalidateField', 'ML_PELMET[]');
							$('#form_validation').formValidation('revalidateField', 'ML_PROJECTION[]');
							$('#form_validation').formValidation('revalidateField', 'ML_FASICA[]');
							*/
							
							/* image */
							//alert("Image");
							//alert("Line measureId-"+$measurement);
							tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE WHERE ML_SYS_ID = ?', [$measurement], function (tx, results1) {
								var totallength1=results1.rows.length;
								//alert("img length-"+totallength1);
								for(var i=0;i<totallength1;i++){
									//alert("mi_sys_Id"+results1.rows.item(i).ML_SYS_ID);
									//alert("sys id->"+results1.rows.item(i).MI_ML_SYS_ID);
									//alert("img path->"+results1.rows.item(i).ML_IMAGE);
									//alert(results1.rows.item(i).MI_DESC);
									var $measurement=results1.rows.item(i).ML_SYS_ID;
									var imageData = results1.rows.item(i).ML_IMAGE;
									//var imageData = results1.rows.item(i).IMAGE_PATH;
									var LivePath = results1.rows.item(i).ML_IMAGE;
									var imageSize = results1.rows.item(i).MI_SIZE;
									var imageDesc = results1.rows.item(i).MI_DESC;
									var mode = results1.rows.item(i).MI_MODE;
									//alert(imageData);
									//alert($measurement+"--"+imageData+"--"+imageSize);
									//alert($measurement);
									var measurementIdNew='#measurementId_'+$measurement+'_modal_data';
									//alert(imageDesc);
									if(imageDesc=='bluePrintImage'){
										//alert("BP_sysId->"+results1.rows.item(i).ML_SYS_ID);
										$(measurementIdNew).find('[name="BP_MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
										//var bule = "BP"+results1.rows.item(i).ML_SYS_ID;
										//alert(bule);
										//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group dp'+ bule +'" data-blue="'+ bule +'"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									}else if(imageDesc=='otherImage'){
										//alert("img_sysId->"+results1.rows.item(i).ML_SYS_ID);
										$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
										//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
										
										var USER_ID=localStorage.getItem("user_id");
										var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
										$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
										$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
										//alert("img"+results1.rows.item(i).MI_MODE);
										$(measurementIdNew).find('[name="mode_check[]"]').val(results1.rows.item(i).MI_MODE);
										$(measurementIdNew).find('[name="linesys_id[]"]').val(results1.rows.item(i).MI_ML_SYS_ID);
										$(measurementIdNew).find('[name="system_id[]"]').val(results1.rows.item(i).MI_MH_SYS_ID);
										$(measurementIdNew).find('[name="MI_DESC[]"]').val(results1.rows.item(i).MI_DESC);
										//alert(results1.rows.item(i).MI_MH_SYS_ID);
										$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group '+results1.rows.item(i).ML_SYS_ID+'"><span onclick="DeleteImgServe($(this),'+results1.rows.item(i).ML_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+LivePath+'" data-val="'+imageSize+'" data-mode="'+mode+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									
									}/*
									else{
										//alert("else");
										$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
										//$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
										
										var USER_ID=localStorage.getItem("user_id");
										var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
										$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
										$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
										$(measurementIdNew).find('[name="mode_check[]"]').val(results1.rows.item(i).MI_MODE);
										$(measurementIdNew).find('[name="linesys_id[]"]').val(results1.rows.item(i).MI_ML_SYS_ID);
										$(measurementIdNew).find('[name="system_id[]"]').val(results1.rows.item(i).MI_MH_SYS_ID);
										$(measurementIdNew).find('[name="MI_DESC[]"]').val(results1.rows.item(i).MI_DESC);
										//alert(results1.rows.item(i).MI_MH_SYS_ID);
										$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group '+results1.rows.item(i).ML_SYS_ID+'"><span onclick="DeleteImgServe($(this),'+results1.rows.item(i).ML_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+LivePath+'" data-val="'+imageSize+'" data-mode="edit" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									
									} */
								}
							});
							
							/* BluePrintImage */
							if(setValue.ML_WINDOW_TYPE!=05){
								tx.executeSql('SELECT * FROM LIVE_BluePrintImage WHERE MI_ML_SYS_ID = ?', [$measurement], function (tx, results1) {
									var totallength1=results1.rows.length;
									for(var i=0;i<totallength1;i++){
										var $measurement=results1.rows.item(i).MI_ML_SYS_ID;
										var measurementIdNew='#measurementId_'+$measurement+'_modal_data';
										var imageData = results1.rows.item(i).MI_IMAGE_PATH;
										var LivePath = results1.rows.item(i).MI_ML_IMAGE;
										var imageSize = results1.rows.item(i).MI_SIZE;
										var imageDesc = results1.rows.item(i).MI_DESC;
										var mode=results1.rows.item(i).MI_MODE;
										if(imageDesc=='bluePrintImage'){
											$(measurementIdNew).find('[name="BP_MI_SYS_ID[]"]').val(results1.rows.item(i).MI_SYS_ID);
											var USER_ID=localStorage.getItem("user_id");
											var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
											$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
											$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
											//alert("BP"+results1.rows.item(i).MI_MODE);
											$(measurementIdNew).find('[name="mode_check[]"]').val(results1.rows.item(i).MI_MODE);
											$(measurementIdNew).find('[name="linesys_id[]"]').val(results1.rows.item(i).MI_ML_SYS_ID);
											$(measurementIdNew).find('[name="system_id[]"]').val(results1.rows.item(i).MI_MH_SYS_ID);
											$(measurementIdNew).find('[name="MI_DESC[]"]').val(results1.rows.item(i).MI_DESC);
											$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImg" class="form-group '+results1.rows.item(i).ML_SYS_ID+'"><span onclick="DeleteImgServe($(this),'+results1.rows.item(i).ML_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+LivePath+'" data-val="'+imageSize+'" data-mode="'+mode+'" data-desc="'+ imageDesc +'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
										}
									}
								});
							}
							
							/* BluePrintImage ends*/
							
						}
					});
				}
					
			});
		} 
		function errorCB(tx, err) {
			//alert("Error");
			//window.open('Measure_Add.html', '_blank','location=no');
			//alert("Error processing SQL: "+err);
		}					
}
 // generate Live Edit Mode New Measurement Tree End
 
 /* Cancel Button Start */
 
function getCancel(){
	window.location="ScheduleTrackingDashboard_View.html";
}