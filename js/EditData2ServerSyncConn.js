//alert("Local2Server Connection");
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
		checkConnTest1();
}
function checkConnTest1() {
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
    }else{
		//alert("S Net conn..");
    	
		//checkLocalTreeValue1();
		
    }
}

function checkLocalTreeValue1(){
	//alert("checkLocalTreeValue1");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(getLocalTreeCount1, errorCB);
	
	//Success
	function getLocalTreeCount1(tx){
		//alert("Get");
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			//alert(treeHeadIdlength+"<----Treelength");
			if(treeHeadIdlength !=0){
				$('body').addClass('loading').loader('show', { overlay: true });
				local2ServerImage1();
				BluePrintImageSelect1();
				setTimeout(sync1, 10000);
				//sync1();
			}
		});
	}
	
	//Error
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
}


/* BluePrint send to server Start */

function BluePrintImageSelect1(){
	//alert("BP select");
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	var blueprintlength = 0;
	db.transaction(Local_BluePrint, errorCB);
	function Local_BluePrint(tx){
		tx.executeSql('SELECT * FROM LIVE_BluePrintImage ', [], function (tx, results) {
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

function sync1(){
	EditValueTreeSend();
}


/* Head Values Send to Server Concept Start */
	
	function EditValueTreeSend(){
		$('body').addClass('loading').loader('show', { overlay: true });
		//setTimeout(uloading, 10000); 
		//alert("HeadValueSend2Server");
		var MT_MH_SYS_ID=localStorage.getItem("HeadId");
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(EditDataTree, errorCB);
		function EditDataTree(tx) {
			
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES ', [], function (tx, results1) {
				var treeHeadIdlength=results1.rows.length;
				//alert(treeHeadIdlength+"<----Treelength");
				if(treeHeadIdlength <=10){
					setTimeout(uloading, 12000);
				}else if(treeHeadIdlength <=20){
					setTimeout(uloading, 22000);
				}else{
					setTimeout(uloading, 35000);
				}
				
			});
			
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE', [], function (tx, results) {
				var TreeDataValue =  [];
				var Treelength = results.rows.length;
				for(var i=0; i <Treelength; i++){
					var row = results.rows.item(i);
					var TreeData = {MT_MH_SYS_ID:row.MT_MH_SYS_ID ,MT_COMP_CODE:row.MT_COMP_CODE ,MT_SYS_ID:row.MT_SYS_ID ,MT_DESC:row.MT_DESC ,MT_PARENT_SYS_ID:row.MT_PARENT_SYS_ID ,MT_LEVEL_ID:row.MT_LEVEL_ID ,MT_LEVEL_TYPE:row.MT_LEVEL_TYPE ,MT_BUILD_TYPE:row.MT_BUILD_TYPE ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID,MT_MODE:row.MT_MODE};
					TreeDataValue.push(TreeData);
				}
				var len = TreeDataValue.length;
				var TotalLength=0;
				//alert("len-"+len);
				for(var i=0; i<len;i++){
					var TreeData = TreeDataValue[i];
					//alert("MT_MODE->"+TreeData.MT_MODE);
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
						url: "http://test.sedarspine.com/en/spineLogisticsApp/EditModeTreeValues",
						data :  {"TreeData":TreeData},
						dataType:'json',
						async: false,
						success: function (json){ 
							//alert("Tree->"+JSON.stringify(json));
							if(json.error_message=="Success"){
								
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
									//alert("json.pSysId->"+json.pSysId);
									tx.executeSql('UPDATE LIVE_LOGI_T_MEASURE_LINES SET ML_SYS_ID =? WHERE ML_SYS_ID = ?', [json.pSysId,TreeData.MT_SYS_ID], function (tx, results) {
										//alert("Update success");
									});
									tx.executeSql('UPDATE LIVE_LOGI_T_MEASURE_IMAGE SET ML_SYS_ID =? WHERE ML_SYS_ID = ?', [json.pSysId,TreeData.MT_SYS_ID], function (tx, results) {
										//alert("Img Update success");
									});
									tx.executeSql('UPDATE LIVE_BluePrintImage SET MI_ML_SYS_ID =? WHERE MI_ML_SYS_ID = ?', [json.pSysId,TreeData.MT_SYS_ID], function (tx, results) {
										//alert("Img Update success");
									});
									
									tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES WHERE ML_SYS_ID = ?', [json.pSysId], function (tx, results) {
										var lineData =  [];
										var Linelength = results.rows.length;
										//alert("Linelength-"+Linelength);
										for (var i=0; i <Linelength; i++){
											var row = results.rows.item(i);
											var ML_SYS_ID=json.pSysId;
											//alert("ML_SYS_ID--"+row.ML_SYS_ID);
											var linesValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:row.ML_MH_SYS_ID ,ML_COMP_CODE:row.ML_COMP_CODE ,ML_TXN_DT:row.ML_TXN_DT ,ML_LOCN_CODE:row.ML_LOCN_CODE ,ML_LINE:row.ML_LINE ,ML_BULD_TYPE:row.ML_BULD_TYPE ,ML_BUILD:row.ML_BUILD ,ML_FLOOR:row.ML_FLOOR ,ML_FLAT:row.ML_FLAT ,ML_UNIT:row.ML_UNIT ,ML_WIDTH:row.ML_WIDTH ,ML_HEIGHT:row.ML_HEIGHT ,ML_MOUNT_TYPE:row.ML_MOUNT_TYPE ,ML_MOUNT_ON:row.ML_MOUNT_ON ,ML_OPERATE:row.ML_OPERATE ,ML_CONTROL:row.ML_CONTROL ,ML_OPENING:row.ML_OPENING ,ML_PELMET:row.ML_PELMET ,ML_DEPTH:row.ML_DESIGN_DEPTH ,ML_PROJECTION:row.ML_PROJECTION ,ML_FASICA:row.ML_FASICA ,ML_REMARKS:row.ML_REMARKS ,ML_CLOSE_YN:row.ML_CLOSE_YN ,ML_OP_HEAD_SYS_ID:row.ML_OP_HEAD_SYS_ID ,ML_SC_LINE_SYS_ID:row.ML_SC_LINE_SYS_ID ,ML_FULL_WIDTH:row.ML_FULL_WIDTH ,ML_FULL_HEIGHT:row.ML_FULL_HEIGHT ,ML_LEFT_WALL:row.ML_LEFT_WALL ,ML_RIGHT_WALL:row.ML_RIGHT_WALL ,ML_CEILING_UP:row.ML_CEILING_UP ,ML_FLOOR_DOWN:row.ML_FLOOR_DOWN ,ML_WINDOW_DEPTH:row.ML_WINDOW_DEPTH ,ML_WINDOW_OPENING:row.ML_WINDOW_OPENING ,ML_HANDLE_POSITION:row.ML_HANDLE_POSITION ,ML_HANDLE_SIZE:row.ML_HANDLE_SIZE ,ML_POWER_DISTANCE:row.ML_POWER_DISTANCE ,ML_GYPSUM_YN:row.ML_GYPSUM_YN ,ML_GYPSUM_WIDTH:row.ML_GYPSUM_WIDTH ,ML_GYPSUM_HEIGHT:row.ML_GYPSUM_HEIGHT ,ML_GYPSUM_DEPTH:row.ML_GYPSUM_DEPTH ,ML_ROOM_NO:row.ML_ROOM_NO ,ML_WINDOW_NO:row.ML_WINDOW_NO ,ML_POWER_SIDE:row.ML_POWER_SIDE ,ML_SITE_READY_YN:row.ML_SITE_READY_YN ,ML_WINDOW_TYPE:row.ML_WINDOW_TYPE ,ML_DOME_HEIGHT:row.ML_DOME_HEIGHT ,ML_CORNER_DEGREE:row.ML_CORNER_DEGREE ,ML_CORVE_DEPTH:row.ML_CORVE_DEPTH ,ML_PARTITIONED_WINDOW_YN:row.ML_PARTITIONED_WINDOW_YN ,ML_NO_OF_PARTITION:row.ML_NO_OF_PARTITION ,ML_PARTITION_01_WIDTH:row.ML_PARTITION_01_WIDTH ,ML_PARTITION_02_WIDTH:row.ML_PARTITION_02_WIDTH ,ML_PARTITION_03_WIDTH:row.ML_PARTITION_03_WIDTH ,ML_PARTITION_04_WIDTH:row.ML_PARTITION_04_WIDTH ,ML_PARTITION_05_WIDTH:row.ML_PARTITION_05_WIDTH ,ML_PARTITION_06_WIDTH:row.ML_PARTITION_06_WIDTH ,ML_PARTITION_07_WIDTH:row.ML_PARTITION_07_WIDTH ,ML_PARTITION_08_WIDTH:row.ML_PARTITION_08_WIDTH ,ML_PARTITION_09_WIDTH:row.ML_PARTITION_09_WIDTH ,ML_PARTITION_10_WIDTH:row.ML_PARTITION_10_WIDTH ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID,MODE:row.ML_MODE};
											lineData.push(linesValue);
										}
										//alert(JSON.stringify(lineData));
										var length = lineData.length;
										//alert("push data-"+length);
										var treelengthcount = 0;
										for (var i=0; i<length; i++){
											treelengthcount++;
											var linePushData = lineData[i];
											//alert("push-"+linePushData.ML_SYS_ID);
											//alert("Before location-"+lineData[0].ML_LOCN_CODE);
											
											//linePushData.ML_LOCN_CODE=lineData[0].ML_LOCN_CODE;
											//linePushData.ML_OP_HEAD_SYS_ID=lineData[0].ML_OP_HEAD_SYS_ID;
											//linePushData.ML_SC_LINE_SYS_ID=lineData[0].ML_SC_LINE_SYS_ID;
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
												url: "http://test.sedarspine.com/en/spineLogisticsApp/EditModeLineValues",
												data :  {"lineData":linePushData},
												dataType:'json',
												async: false,
												success: function (json){
													//alert("lines->"+JSON.stringify(json));
													//alert("data-"+data);
													//alert("line Id-->"+json.linesys_id);
													//alert("return_status-->"+json.return_status);
													//alert("error_message-->"+json.error_message);
													
													var LinesysIdnew=json.linesys_id;
													
													/* BluePrint Image Save To DB Start */ 
													
													
													tx.executeSql('SELECT * FROM LIVE_BluePrintImage WHERE MI_ML_SYS_ID = ?', [LinesysIdnew], function (tx, results) {
														var BPimageData =  [];
														var ImageLength = results.rows.length;
														//alert("BluePrint ImageLength--"+ImageLength);
														for (var i=0; i <ImageLength; i++){
															var row = results.rows.item(i);
															var imageValue = {MI_SYS_ID:row.MI_SYS_ID,ML_SYS_ID:row.MI_ML_SYS_ID ,ML_MH_SYS_ID:row.MI_ML_MH_SYS_ID ,ML_IMAGE:row.MI_ML_IMAGE ,USER_ID:row.MI_USER_ID ,LANG_CODE:row.MI_LANG_CODE , ML_COMP_CODE:row.MI_ML_COMP_CODE, MI_DESC:row.MI_DESC,MI_SIZE:row.MI_SIZE,MODE:row.MI_MODE};
															BPimageData.push(imageValue);
														}
														//alert(JSON.stringify(imageData));
														//alert("live PRINT url ->"+JSON.stringify(BPimageData));
														var imgLen = BPimageData.length;
														var countimg = 0;
														for( var i=0; i < imgLen; i++){
															var imagePushData = BPimageData[i];
															$.ajax({
																type: "POST",
																url: "http://test.sedarspine.com/en/spineLogisticsApp/EditModeImageValues",
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
													
													tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE WHERE ML_SYS_ID = ?', [LinesysIdnew], function (tx, results) {
														var imageData =  [];
														var ImageLength = results.rows.length;
														//alert("ajax ImageLength--"+ImageLength);
														for (var i=0; i <ImageLength; i++){
															var row = results.rows.item(i);
															var imageValue = {MI_SYS_ID:row.MI_SYS_ID,ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:row.ML_MH_SYS_ID ,ML_IMAGE:row.IMAGE_PATH ,USER_ID:row.USER_ID ,LANG_CODE:row.LANG_CODE , ML_COMP_CODE:row.ML_COMP_CODE, MI_DESC:row.MI_DESC,MI_SIZE:row.MI_SIZE,MODE:row.MI_MODE};
															imageData.push(imageValue);
														}
														//alert(JSON.stringify(imageData));
														//alert("ready to send server ->"+JSON.stringify(imageData));
														var imgLen = imageData.length;
														//alert("imgLen-"+imgLen);
														var countimg = 0;
														for( var i=0; i < imgLen; i++){
															var imagePushData = imageData[i];
															$.ajax({
																type: "POST",
																url: "http://test.sedarspine.com/en/spineLogisticsApp/EditModeImageValues",
																data :  {"imageData":imagePushData},
																dataType:'json',
																async: false,
																success: function (json) {
																	//alert("img->"+JSON.stringify(json));
																	//alert("img error_message-->"+json.error_message);
																	//alert("return_status-->"+json.return_status);
																}
															});
														}
													}); 
												}
											});						
										}
									});
									
								}
							}
						}
					});
					TotalLength++
					//if(TotalLength==len){
					//	alert("Success");
					//}
				}
			});
			
		}
		function errorCB(tx, err) {
			//alert("Error");
			//alert("Error processing SQL: "+err);
		}
	}
	
	function uloading(){
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(function(tx){
			tx.executeSql('DROP TABLE IF EXISTS LIVE_LOGI_T_MEASURE_TREE');
			tx.executeSql('DROP TABLE IF EXISTS LIVE_LOGI_T_MEASURE_LINES');
			tx.executeSql('DROP TABLE IF EXISTS LIVE_LOGI_T_MEASURE_IMAGE');
			tx.executeSql('DROP TABLE IF EXISTS LIVE_BluePrintImage');
			localStorage.removeItem("LocalHeadlength");
			localStorage.removeItem("HeadDataInsert");
			localStorage.removeItem("HeadId");
			localStorage.removeItem("LineId");
			$('body').removeClass('loading').loader('hide');
			alert("Measurement Values Are successfully Sync");
			window.location.reload(true);
		});
	}
	
	/* Head Values Send to Server Concept Ends */
	
	
	/*Image values send to server concept Start*/
	 
	 function local2ServerImage1(){
		// var Imagelen = localStorage.getItem("Imageslength");
			//alert("Imagelen->"+Imagelen);
		/*	if(localStorage.getItem("Imageslength") === null){
				//alert("Value Null");
			}else{ */
				//alert("Value Select");
				 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
					db.transaction(LocalImg, errorCB);
					function LocalImg(tx) {	
						tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE', [], function (tx, results) {
							var Imglength = results.rows.length;
							
							//alert("Imageslength-->"+Imglength);
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
			//}
	 }
	 
	 /*Image values send to server concept Ends*/