function login() {
//	alert("enter to login");
	
	var name = document.getElementById("user_id").value;
	var password = document.getElementById("password").value;
	
	
	

	if (name == '' || password == '') {
		alert("Please Fill All Fields");
	}
	else {
		/*if(network_status=='No network connection'){
			md5pwd = calcMD5(password);
			
			onDeviceReady();
		}
		else
		{*/
			// AJAX code to submit form.
	
			$.ajax({
				type: "POST",
				url: "http://test.sedarspine.com/en/spineLogisticsApp/loginAuthentication",
				data :  'user_id='+name+'&password='+password ,
				dataType: "json",
				processData: true,
				
				success: function(json) {
					
					if (json.login_status=='Success') {
						window.open('ScheduleTrackingDashboard_View.html', '_blank','location=no');
					//	alert("Success");
						localStorage.setItem("user_id", json.USER_ID);
						localStorage.setItem("USER_COMP_CODE", json.USER_COMP_CODE);
						localStorage.setItem("USER_DESC", json.USER_DESC);
					}else{
						alert('Incorrect Username and Password');
					}
				}
			});
		//}
	}
	return false;
}







/* Head Values Send to Server Concept Start */
	
	function HeadValueSend2Server(){
		localStorage.setItem("TreeParent", "null");
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		db.transaction(Server_Head, errorCB);
		function Server_Head(tx) {
			tx.executeSql('SELECT * FROM LOGI_T_MEASURE_HEAD ', [], function (tx, results) {
				var headData =  [];
				var Headlength = results.rows.length;
			 	  
			 	 var len = headData.length;
				 var headLengthCount=0;
			 	 for (var i=0; i<len; i++){
					 headLengthCount++;
			 		var headPush = headData[i];
			 		var currentDate = moment();
		 			var Today = moment(currentDate).format('DD-MMM-YYYY');
		 			//alert("Today->"+Today);
		 			headPush.MH_TXN_DT=Today;
			 		//alert("Date->"+headPush.MH_TXN_DT);
					$.ajax({
						type: "POST",
					    url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionHead_Local2Server",
					    data : {"headData":headPush},
					    dataType:'json',
					    async: false,
					    success: function (json){
						localStorage.setItem("SYS_ID", json.system_id);
						var HeadId = headPush.SYS_ID;
						//alert("Haed Intial Id"+HeadId)
						var LineReId = json.system_id;
						//alert("H msg->"+json.error_message);
						//alert("Head Id for Tree"+LineReId);
						tx.executeSql('UPDATE LOGI_T_MEASURE_TREE SET MT_MH_SYS_ID =? WHERE MT_MH_SYS_ID =?', [LineReId,HeadId], function (tx, results) {
						});
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
								for(var i=0; i<len;i++){
									var TreeData = TreeDataValue[i];
									//alert("Tree Level->"+TreeData.MT_LEVEL_ID);
									//alert("Tree Type->"+TreeData.MT_LEVEL_TYPE);
									if(i!=0){
										var MT_PARENT_SYS_ID = localStorage.getItem("MT_PARENT_SYS_ID");
										TreeData.MT_PARENT_SYS_ID = MT_PARENT_SYS_ID;
									}
									//var TypeID = localStorage.getItem("Data_level_id");
									//alert("Type->"+TypeID);

									if(TreeData.MT_LEVEL_ID==6){
										var NewWindowType = localStorage.getItem("WindowTypeLocal");
										//alert("NewWindowType->"+NewWindowType);
										TreeData.MT_LEVEL_TYPE=NewWindowType;
										//alert("Win Type Select"+TreeData.MT_LEVEL_TYPE);
									}else{
										TreeData.MT_LEVEL_TYPE=null;
										//alert("else"+TreeData.MT_LEVEL_TYPE);
									}

									// if(TreeData.MT_LEVEL_ID==6){
									// 	var n = TreeData.indexOf("MT_LEVEL_TYPE");
									// 	alert(n);
									// 	alert("Win Type Select");
									// }
									$.ajax({
										type: "POST",
									    url: "http://test.sedarspine.com/en/spineLogisticsApp/LOGI_T_MEASURE_TREE",
									    data :  {"TreeData":TreeData},
									    dataType:'json',
									    async: false,
										success: function (json){
											//alert(JSON.stringify(json));
											if(json.error_message=="Success"){
												var MT_PARENT_SYS_ID = json.pSysId;
												var previousParent=MT_PARENT_SYS_ID;
												localStorage.setItem("MT_PARENT_SYS_ID", MT_PARENT_SYS_ID);
												localStorage.setItem("TreeParent", "New");
											}
										}
									})
								}
								tx.executeSql('SELECT * FROM LOGI_T_MEASURE_TREE WHERE MT_MH_SYS_ID = ? AND MT_LEVEL_TYPE = ?', [NewHeadId,'6'], function (tx, results) {
								var treeFData =  [];
								var treeFDatalength = results.rows.length;
								for (var i=0; i < treeFDatalength; i++){
									var row = results.rows.item(i);
										localStorage.setItem("ML_SYS_ID", json.pSysId);
										//var MT_PARENT_SYS_ID= json.pSysId-1;
										//localStorage.setItem("MT_PARENT_SYS_ID", MT_PARENT_SYS_ID);
										var HeadId = headPush.SYS_ID;
										var LineReId=localStorage.getItem("SYS_ID");
										//alert("Head Id for Line"+LineReId);
											tx.executeSql('UPDATE LOGI_T_MEASURE_LINES SET ML_MH_SYS_ID =? WHERE ML_MH_SYS_ID =?', [LineReId,HeadId], function (tx, results) {
											});
										tx.executeSql('SELECT * FROM LOGI_T_MEASURE_LINES WHERE ML_MH_SYS_ID = ?', [LineReId], function (tx, results) {
											var lineData =  [];
											var Linelength = results.rows.length;
											for (var i=0; i <Linelength; i++){
												var row = results.rows.item(i);
												var ML_SYS_ID=localStorage.getItem("ML_SYS_ID");
												var linesValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:LineReId ,ML_COMP_CODE:row.ML_COMP_CODE ,ML_TXN_DT:row.ML_TXN_DT ,ML_LOCN_CODE:row.ML_LOCN_CODE ,ML_LINE:row.ML_LINE ,ML_BULD_TYPE:row.ML_BULD_TYPE ,ML_BUILD:row.ML_BUILD ,ML_FLOOR:row.ML_FLOOR ,ML_FLAT:row.ML_FLAT ,ML_UNIT:row.ML_UNIT ,ML_WIDTH:row.ML_WIDTH ,ML_HEIGHT:row.ML_HEIGHT ,ML_MOUNT_TYPE:row.ML_MOUNT_TYPE ,ML_MOUNT_ON:row.ML_MOUNT_ON ,ML_OPERATE:row.ML_OPERATE ,ML_CONTROL:row.ML_CONTROL ,ML_OPENING:row.ML_OPENING ,ML_PELMET:row.ML_PELMET ,ML_DESIGN_DEPTH:row.ML_DESIGN_DEPTH ,ML_PROJECTION:row.ML_PROJECTION ,ML_FASICA:row.ML_FASICA ,ML_REMARKS:row.ML_REMARKS ,ML_CLOSE_YN:row.ML_CLOSE_YN ,ML_OP_HEAD_SYS_ID:row.ML_OP_HEAD_SYS_ID ,ML_SC_LINE_SYS_ID:row.ML_SC_LINE_SYS_ID ,ML_FULL_WIDTH:row.ML_FULL_WIDTH ,ML_FULL_HEIGHT:row.ML_FULL_HEIGHT ,ML_LEFT_WALL:row.ML_LEFT_WALL ,ML_RIGHT_WALL:row.ML_RIGHT_WALL ,ML_CEILING_UP:row.ML_CEILING_UP ,ML_FLOOR_DOWN:row.ML_FLOOR_DOWN ,ML_WINDOW_DEPTH:row.ML_WINDOW_DEPTH ,ML_WINDOW_OPENING:row.ML_WINDOW_OPENING ,ML_HANDLE_POSITION:row.ML_HANDLE_POSITION ,ML_HANDLE_SIZE:row.ML_HANDLE_SIZE ,ML_POWER_DISTANCE:row.ML_POWER_DISTANCE ,ML_GYPSUM_YN:row.ML_GYPSUM_YN ,ML_GYPSUM_WIDTH:row.ML_GYPSUM_WIDTH ,ML_GYPSUM_HEIGHT:row.ML_GYPSUM_HEIGHT ,ML_GYPSUM_DEPTH:row.ML_GYPSUM_DEPTH ,ML_ROOM_NO:row.ML_ROOM_NO ,ML_WINDOW_NO:row.ML_WINDOW_NO ,ML_POWER_SIDE:row.ML_POWER_SIDE ,ML_SITE_READY_YN:row.ML_SITE_READY_YN ,ML_WINDOW_TYPE:row.ML_WINDOW_TYPE ,ML_DOME_HEIGHT:row.ML_DOME_HEIGHT ,ML_CORNER_DEGREE:row.ML_CORNER_DEGREE ,ML_CORVE_DEPTH:row.ML_CORVE_DEPTH ,ML_PARTITIONED_WINDOW_YN:row.ML_PARTITIONED_WINDOW_YN ,ML_NO_OF_PARTITION:row.ML_NO_OF_PARTITION ,ML_PARTITION_01_WIDTH:row.ML_PARTITION_01_WIDTH ,ML_PARTITION_02_WIDTH:row.ML_PARTITION_02_WIDTH ,ML_PARTITION_03_WIDTH:row.ML_PARTITION_03_WIDTH ,ML_PARTITION_04_WIDTH:row.ML_PARTITION_04_WIDTH ,ML_PARTITION_05_WIDTH:row.ML_PARTITION_05_WIDTH ,ML_PARTITION_06_WIDTH:row.ML_PARTITION_06_WIDTH ,ML_PARTITION_07_WIDTH:row.ML_PARTITION_07_WIDTH ,ML_PARTITION_08_WIDTH:row.ML_PARTITION_08_WIDTH ,ML_PARTITION_09_WIDTH:row.ML_PARTITION_09_WIDTH ,ML_PARTITION_10_WIDTH:row.ML_PARTITION_10_WIDTH ,LANG_CODE:row.LANG_CODE ,USER_ID:row.USER_ID};
												lineData.push(linesValue);
												//alert(JSON.stringify(lineData));
											}
											var length = lineData.length;
											for (var i=0; i<length; i++){
												var linePushData = lineData[i];
												var currentDate = moment();
									 			var Today = moment(currentDate).format('DD-MMM-YYYY');
									 			//alert("Today->"+Today);
									 			//alert("old date->"+linePushData.ML_TXN_DT);
									 			linePushData.ML_TXN_DT=Today;
									 			//alert("new date->"+linePushData.ML_TXN_DT);
												$.ajax({
													type: "POST",
													url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionLines_Local2Server",
													data :  {"lineData":linePushData},
													dataType:'json',
													async: false,
													success: function (json){
														//alert("line Id-->"+json.linesys_id);
														//alert("return_status-->"+json.return_status);
														//alert("error_message-->"+json.error_message);
														var HeadId = headPush.SYS_ID;
														var LineReId=localStorage.getItem("SYS_ID");
														var LinesysIdnew=json.linesys_id;
														//alert(HeadId + LineReId+"Head Old and New Id");
														var linesysid1=linePushData.ML_SYS_ID;
														//alert("linesys_id1"+linesysid1);
															tx.executeSql('UPDATE LOGI_T_MEASURE_IMAGE SET ML_MH_SYS_ID =?,ML_SYS_ID =? WHERE ML_MH_SYS_ID =? AND ML_SYS_ID=?', [LineReId,LinesysIdnew,HeadId,linesysid1], function (tx, results) {
															//alert("img id upadted success");
															});
														tx.executeSql('SELECT * FROM LOGI_T_MEASURE_IMAGE WHERE ML_MH_SYS_ID = ? AND ML_SYS_ID = ?', [LineReId,LinesysIdnew], function (tx, results) {
															var imageData =  [];
															var ImageLength = results.rows.length;
															for (var i=0; i <ImageLength; i++){
																var row = results.rows.item(i);
																var imageValue = {ML_SYS_ID:row.ML_SYS_ID ,ML_MH_SYS_ID:row.ML_MH_SYS_ID ,ML_IMAGE:row.IMAGE_PATH ,USER_ID:row.USER_ID ,LANG_CODE:row.LANG_CODE , ML_COMP_CODE:row.ML_COMP_CODE};
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
							});
					    });
					}//loop end
					});//ajax end
					if(headLengthCount==len){
					var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
					db.transaction(function(tx){
						tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_HEAD');
						tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_TREE');
						tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_LINES');
						tx.executeSql('DROP TABLE IF EXISTS LOGI_T_MEASURE_IMAGE');
						localStorage.removeItem("LocalHeadlength");
						alert("Measurement Values Are successfully Sync");
					});
				 }
			 	 }
			});
		}
			
		function errorCB(tx, err) {
			//alert("Error");
			//alert("Error processing SQL: "+err);
		}
	}
	/* Head Values Send to Server Concept Ends */

