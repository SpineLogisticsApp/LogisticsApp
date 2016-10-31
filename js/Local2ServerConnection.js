//alert("Local2Server Edit Connection");
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	EditcheckConn();
}
function EditcheckConn() {
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
    	
		EditcheckLocalTreeValue();
		
    }
}

function EditcheckLocalTreeValue(){
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	db.transaction(getLocalTreeCount, errorCB);
	
	//Success
	function getLocalTreeCount(tx){
		//alert("Get Edit");
		
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			//alert(treeHeadIdlength+"<----Treelength");
			if(treeHeadIdlength !=0){
				Editlocal2ServerImage();
				EditBluePrintImageSelect();
				setTimeout(Editsync, 10000);
			}
			 for (var i=0;i<treeHeadIdlength;i++){
				//prompt("Tree",JSON.stringify(results1.rows.item(i)));
			 }
		});
		/*
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----Lineslength");
			for (var i=0;i<treeHeadIdlength;i++){
				prompt("Lines",JSON.stringify(results1.rows.item(i)));
			}
		});
		tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE ', [], function (tx, results1) {
			var treeHeadIdlength=results1.rows.length;
			alert(treeHeadIdlength+"<----imglength");
			 for (var i=0;i<treeHeadIdlength;i++){
				 prompt("Img",JSON.stringify(results1.rows.item(i)));
			 }
		});
		*/
	}
	
	//Error
	function errorCB(tx, err) {
		//alert("Error");
		//alert("Error processing SQL: "+err);
	}
}


/* BluePrint send to server Start */

function EditBluePrintImageSelect(){
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
				EditSendAjax(dataURL,MI_SYS_ID,fileName);
				
			}
	   });
	}
	function errorCB(tx, err) {
	   //alert("Error");
	  // alert("Error processing SQL: "+err);
	}
	
	function EditSendAjax(dataURL,MI_SYS_ID,fileName){
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
				//alert("MI_SYS_ID->"+MI_SYS_ID);
			},error: function (xhr, ajaxOptions, thrownError) {
				//alert("Error");
				//alert(xhr);alert(ajaxOptions);alert(thrownError);
			}
		});
	}
}

/* BluePrint send to server End */

function Editsync(){
	$('body').addClass('loading').loader('show', { overlay: true });
	EditDataInsert();
}

	/* Tree and Line Values Send to Server Concept Start */
	
	function EditDataInsert(){
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(EditServe, errorCB);
		function EditServe(tx){
			/* Tree and Line values insert start */
			var NewHeadId = localStorage.getItem("HeadId");
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_TREE WHERE MT_MH_SYS_ID=?', [NewHeadId], function (tx, results) {
				var TreeDataValue =  [];
				var Treelength = results.rows.length;
				//alert("Tree-"+Treelength);
				for (var i=0; i <Treelength; i++){
					var row = results.rows.item(i);
					var MT_PARENT_SYS_ID=null;
					var TreeData = {MT_MH_SYS_ID:row.MT_MH_SYS_ID ,MT_COMP_CODE:row.MT_COMP_CODE ,MT_SYS_ID:row.MT_SYS_ID ,MT_DESC:row.MT_DESC ,MT_PARENT_SYS_ID:MT_PARENT_SYS_ID ,MT_LEVEL_ID:row.MT_LEVEL_ID ,MT_LEVEL_TYPE:row.MT_LEVEL_TYPE ,MT_BUILD_TYPE:row.MT_BUILD_TYPE ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID};
					TreeDataValue.push(TreeData);
				}
				//alert(JSON.stringify(TreeDataValue));
				var len = TreeDataValue.length;
				var linID = 0;
				var ImgID = 0;
				var treelengthcount = 0;
				for(var i=0; i<len;i++){
					var TreeData = TreeDataValue[i];
					$.ajax({
						type: "POST",
						url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasureTreeEdit",
						data :  {"TreeData":TreeData},
						dataType:'json',
						async: false,
						success: function (json){
							//alert("Tree-"+JSON.stringify(json));
							//alert(json.error_message);
							if(json.error_message=="Success"){
								//alert("Id-"+json.pSysId);
								if(json.levelId == 6){
									//alert(json.pSysId);
									tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_LINES WHERE ML_SYS_ID = ?', [json.pSysId], function (tx, results) {
										var lineData =  [];
										var Linelength = results.rows.length;
										//alert("Linelength-"+Linelength);
										for (var i=0; i <Linelength; i++){
											var row = results.rows.item(i);
											//alert("ML_SYS_ID--"+row.ML_SYS_ID);
											var linesValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:LineReId ,ML_COMP_CODE:row.ML_COMP_CODE ,ML_TXN_DT:row.ML_TXN_DT ,ML_LOCN_CODE:row.ML_LOCN_CODE ,ML_LINE:row.ML_LINE ,ML_BULD_TYPE:row.ML_BULD_TYPE ,ML_BUILD:row.ML_BUILD ,ML_FLOOR:row.ML_FLOOR ,ML_FLAT:row.ML_FLAT ,ML_UNIT:row.ML_UNIT ,ML_WIDTH:row.ML_WIDTH ,ML_HEIGHT:row.ML_HEIGHT ,ML_MOUNT_TYPE:row.ML_MOUNT_TYPE ,ML_MOUNT_ON:row.ML_MOUNT_ON ,ML_OPERATE:row.ML_OPERATE ,ML_CONTROL:row.ML_CONTROL ,ML_OPENING:row.ML_OPENING ,ML_PELMET:row.ML_PELMET ,ML_DEPTH:row.ML_DESIGN_DEPTH ,ML_PROJECTION:row.ML_PROJECTION ,ML_FASICA:row.ML_FASICA ,ML_REMARKS:row.ML_REMARKS ,ML_CLOSE_YN:row.ML_CLOSE_YN ,ML_OP_HEAD_SYS_ID:row.ML_OP_HEAD_SYS_ID ,ML_SC_LINE_SYS_ID:row.ML_SC_LINE_SYS_ID ,ML_FULL_WIDTH:row.ML_FULL_WIDTH ,ML_FULL_HEIGHT:row.ML_FULL_HEIGHT ,ML_LEFT_WALL:row.ML_LEFT_WALL ,ML_RIGHT_WALL:row.ML_RIGHT_WALL ,ML_CEILING_UP:row.ML_CEILING_UP ,ML_FLOOR_DOWN:row.ML_FLOOR_DOWN ,ML_WINDOW_DEPTH:row.ML_WINDOW_DEPTH ,ML_WINDOW_OPENING:row.ML_WINDOW_OPENING ,ML_HANDLE_POSITION:row.ML_HANDLE_POSITION ,ML_HANDLE_SIZE:row.ML_HANDLE_SIZE ,ML_POWER_DISTANCE:row.ML_POWER_DISTANCE ,ML_GYPSUM_YN:row.ML_GYPSUM_YN ,ML_GYPSUM_WIDTH:row.ML_GYPSUM_WIDTH ,ML_GYPSUM_HEIGHT:row.ML_GYPSUM_HEIGHT ,ML_GYPSUM_DEPTH:row.ML_GYPSUM_DEPTH ,ML_ROOM_NO:row.ML_ROOM_NO ,ML_WINDOW_NO:row.ML_WINDOW_NO ,ML_POWER_SIDE:row.ML_POWER_SIDE ,ML_SITE_READY_YN:row.ML_SITE_READY_YN ,ML_WINDOW_TYPE:row.ML_WINDOW_TYPE ,ML_DOME_HEIGHT:row.ML_DOME_HEIGHT ,ML_CORNER_DEGREE:row.ML_CORNER_DEGREE ,ML_CORVE_DEPTH:row.ML_CORVE_DEPTH ,ML_PARTITIONED_WINDOW_YN:row.ML_PARTITIONED_WINDOW_YN ,ML_NO_OF_PARTITION:row.ML_NO_OF_PARTITION ,ML_PARTITION_01_WIDTH:row.ML_PARTITION_01_WIDTH ,ML_PARTITION_02_WIDTH:row.ML_PARTITION_02_WIDTH ,ML_PARTITION_03_WIDTH:row.ML_PARTITION_03_WIDTH ,ML_PARTITION_04_WIDTH:row.ML_PARTITION_04_WIDTH ,ML_PARTITION_05_WIDTH:row.ML_PARTITION_05_WIDTH ,ML_PARTITION_06_WIDTH:row.ML_PARTITION_06_WIDTH ,ML_PARTITION_07_WIDTH:row.ML_PARTITION_07_WIDTH ,ML_PARTITION_08_WIDTH:row.ML_PARTITION_08_WIDTH ,ML_PARTITION_09_WIDTH:row.ML_PARTITION_09_WIDTH ,ML_PARTITION_10_WIDTH:row.ML_PARTITION_10_WIDTH ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID};
											lineData.push(linesValue);
										}
										//alert(JSON.stringify(lineData));
										var length = lineData.length;
										//alert("push data-"+length);
										for (var i=0; i<length; i++){
											var linePushData = lineData[i];
											//alert("push-"+linePushData.ML_SYS_ID);
											//alert("Before location-"+lineData[0].ML_LOCN_CODE);
											linePushData.ML_LOCN_CODE=lineData[0].ML_LOCN_CODE;
											linePushData.ML_OP_HEAD_SYS_ID=lineData[0].ML_OP_HEAD_SYS_ID;
											linePushData.ML_SC_LINE_SYS_ID=lineData[0].ML_SC_LINE_SYS_ID;
											//linePushData.ML_UNIT=lineData[0].ML_UNIT;
											//alert("After location-"+linePushData.ML_LOCN_CODE);
											var currentDate = moment();
											var Today = moment(currentDate).format('DD-MMM-YYYY');
											//alert("Today->"+Today);
											//alert("old date->"+linePushData.ML_TXN_DT);
											linePushData.ML_TXN_DT=Today;
											$.ajax({
												type: "POST",
												url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionLines_Local2Server",
												data :  {"lineData":linePushData},
												dataType:'json',
												async: false,
												success: function (json){
													//alert("Line-"+JSON.stringify(json));
													//alert("data-"+data);
													//alert("line Id-->"+json.linesys_id);
													//alert("return_status-->"+json.return_status);
													//alert("error_message-->"+json.error_message);
													var LineReId=localStorage.getItem("HeadId");
													var LinesysIdnew=json.linesys_id;
													//alert(LineReId+"-New Id");
													var linesysid1=linePushData.ML_SYS_ID;
													//alert("linesys_id1-"+linesysid1);
													//tx.executeSql('UPDATE LOGI_T_MEASURE_IMAGE SET ML_SYS_ID =? WHERE  ML_SYS_ID=?', [LinesysIdnew,linesysid1], function (tx, results) {});
													//tx.executeSql('SELECT * FROM LOGI_T_MEASURE_IMAGE WHERE ML_MH_SYS_ID = ? AND ML_SYS_ID = ?', [LineReId,LinesysIdnew], function (tx, results) {
													tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE ML_SYS_ID = ?', [LinesysIdnew], function (tx, results) {
														var imageData =  [];
														var ImageLength = results.rows.length;
														//alert("ImageLength--"+ImageLength);
														for (var i=0; i <ImageLength; i++){
															var row = results.rows.item(i);
															var imageValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:row.ML_MH_SYS_ID ,ML_IMAGE:row.IMAGE_PATH ,USER_ID:row.USER_ID ,LANG_CODE:row.LANG_CODE , ML_COMP_CODE:row.ML_COMP_CODE, MI_DESC:row.MI_DESC,MI_SYS_ID:row.MI_SYS_ID};
															imageData.push(imageValue);
														}
														//alert(JSON.stringify(imageData));
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
																	//alert("Img-"+JSON.stringify(json));
																	//alert("error_message-->"+json.error_message);
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
					treelengthcount++
					if(treelengthcount==len){
						//alert("Measurement Values Are successfully Sync");
						/*var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
						db.transaction(function(tx){
							tx.executeSql('DROP TABLE IF EXISTS LIVE_LOGI_T_MEASURE_TREE');
							tx.executeSql('DROP TABLE IF EXISTS LIVE_LOGI_T_MEASURE_LINES');
							tx.executeSql('DROP TABLE IF EXISTS LIVE_LOGI_T_MEASURE_IMAGE');
							tx.executeSql('DROP TABLE IF EXISTS LIVE_BluePrintImage');
							localStorage.removeItem("HeadDataInsert");
							localStorage.removeItem("HeadId");
							localStorage.removeItem("LineId");
							localStorage.removeItem("HeadDataInsert");
							$('body').removeClass('loading').loader('hide');
							alert("Measurement Values Are successfully Sync");
							window.location.reload(true);
						}); */
					}
				}
			});
		}
		function errorCB(tx, err) {
			//alert("Error");
			//alert("Error processing SQL: "+err);
		}
	}	
	/* Tree and Line Values Send to Server Concept Ends */
	
	
	
	
	/*Image values send to server concept Start*/
	 
	 function Editlocal2ServerImage(){
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(LocalImg, errorCB);
		function LocalImg(tx) {	
			tx.executeSql('SELECT * FROM LIVE_LOGI_T_MEASURE_IMAGE', [], function (tx, results) {
				var Imglength = results.rows.length;
				
				//alert("Imageslength-->"+Imglength);
				for(var i=0; i<Imglength; i++ ){
					var imageURI = results.rows.item(i).ML_IMAGE;
					//alert("Img->"+imageURI);
					var options = new FileUploadOptions();
					options.fileKey = "file";
					options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
					options.mimeType = "image/jpeg";
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