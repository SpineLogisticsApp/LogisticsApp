document.addEventListener("deviceready", getConnReady, false);

function getConnReady(){
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
		ajaxBuildType();
    }
	
}
        		//alert("inside the script");
        		
        		
        		function ajaxBuildType(){
        			//alert("Server2local");
        			var $id = "spine"
        				 $.ajax
        				    ({
        						type: "POST",                                
        						url: "http://test.sedarspine.com/en/spineLogisticsApp/getBuildTypeLocal",
        						data: {id:$id},
        						dataType : 'json',
        						async: false,
        						success: function (json)
        						{
        						 	var length = json.length
        						 	var j = 0;
        						 	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
        							db.transaction(function(tx){
        								tx.executeSql('DROP TABLE IF EXISTS BUILD_TYPE');
        								tx.executeSql('CREATE TABLE IF NOT EXISTS BUILD_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
        								for (var i = 0; i < length; i++) {
        									tx.executeSql('INSERT OR REPLACE INTO BUILD_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
        									
        									j++;
        									if(j==length){
        										
        									}
        								}
        							});
        						}
        				    }); 
        				 
        				 function successID(){
        						return true;
        					}
        				 
        				 ajaxvalues();
        			 }

        			function ajaxvalues(){
        				 var $id = "spine"
        				 $.ajax
        				    ({
        						type: "POST",                                
        						url: "http://test.sedarspine.com/en/spineLogisticsApp/getUnitTypeLocal",
        						data: {id:$id},
        						dataType : 'json',
        						async: false,
        						success: function (json)
        						{
        						 var length = json.length
        						 var j = 0;
        						 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
        							
        							db.transaction(function(tx){
        								tx.executeSql('DROP TABLE IF EXISTS UNIT_TYPE');
        								tx.executeSql('CREATE TABLE IF NOT EXISTS UNIT_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
        								
        								for (var i = 0; i < length; i++) {
        									tx.executeSql('INSERT OR REPLACE INTO UNIT_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
        									
        									j++;
        									if(j==length){
        										
        									//	alert('Success to updated');
        										
        									}
        									
        								}
        							});
        							
        						},
        				    }); 
        				 
        				 function successID(){
        						return true;
        					}
        				 
        				 ajaxvalues1();
        			 }
        			 
        			 
        			 
        			 function ajaxvalues1(){
        				 var $id = "spine"
        					 $.ajax
        					    ({
        							type: "POST",                                
        							url: "http://test.sedarspine.com/en/spineLogisticsApp/getProductCodeLocal",
        							data: {id:$id},
        							dataType : 'json',
        							async: false,
        							success: function (json)
        							{
        								var j = 0;
        								var length = json.length
        								 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
        									
        									db.transaction(function(tx){
        										tx.executeSql('DROP TABLE IF EXISTS PRODUCT_TYPE');
        										tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCT_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, IF_CODE TEXT, IF_DESC TEXT) ');
        										
        										for (var i = 0; i < length; i++) {
        											tx.executeSql('INSERT OR REPLACE INTO PRODUCT_TYPE (IF_CODE, IF_DESC) VALUES ("' + json[i].IF_CODE + '", "' + json[i].IF_DESC + '")', successID);
        											
        											j++;
        											if(j==length){
        												
        											//	alert('Product Code to updated');
        												
        											}
        											
        										}
        									});
        							},
        					    }); 
        				 
        				 function successID(){
        						return true;
        					}
        				 ajaxvalues2();
        			 }
        			 
        			 function ajaxvalues2(){
        				 var $id = "spine"
        					 $.ajax
        					    ({
	        						type: "POST",                                
	        						url: "http://test.sedarspine.com/en/spineLogisticsApp/getColorCodeLocal",
	        						data: {id:$id},
	        						dataType : 'json',
	        						async: false,
	        						success: function (json)
	        						{
	        							var j = 0;
	        							var length = json.length
	        							var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	        							db.transaction(function(tx){
	        								tx.executeSql('DROP TABLE IF EXISTS COLOR_CODE');
	        								tx.executeSql('CREATE TABLE IF NOT EXISTS COLOR_CODE (ID INTEGER PRIMARY KEY AUTOINCREMENT, IC_CODE TEXT, IC_DESC TEXT) ');
	        								for (var i = 0; i < length; i++) {
	        									tx.executeSql('INSERT OR REPLACE INTO COLOR_CODE (IC_CODE, IC_DESC) VALUES ("' + json[i].IC_CODE + '", "' + json[i].IC_DESC + '")', successID);
	        									j++;
	        									if(j==length){
	        										//alert('Color Code to updated');
	        									}
	        								}
	        							});
	        						}
        					    }); 
        				 function successID(){
        						return true;
        					}
        				 ajaxvalues3();
        			 }
        			 
        		 
        		 function ajaxvalues3(){
        			 
        			 var $id = "spine"
        				 $.ajax
        				    ({
        					
        					type: "POST",                                
        					url: "http://test.sedarspine.com/en/spineLogisticsApp/getMountTypeLocal",
        					data: {id:$id},
        					dataType : 'json',
        					async: false,
        					success: function (json)
        					{
        					 
        						var j = 0;
        						var length = json.length
        						 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
        							
        							db.transaction(function(tx){
        								tx.executeSql('DROP TABLE IF EXISTS MOUNT_TYPE');
        								tx.executeSql('CREATE TABLE IF NOT EXISTS MOUNT_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
        								
        								for (var i = 0; i < length; i++) {
        									tx.executeSql('INSERT OR REPLACE INTO MOUNT_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
        									
        									j++;
        									if(j==length){
        										
        									//	alert('Mount Type to updated');
        										
        									}
        									
        								}
        							});
        					
        					},
        				    }); 
        			 function successID(){
        					return true;
        				}
        			 ajaxvalues4();
        		 }
        		 
        		 function ajaxvalues4(){
        			 
        			 var $id = "spine"
        				 $.ajax
        				    ({
        					
        					type: "POST",                                
        					url: "http://test.sedarspine.com/en/spineLogisticsApp/getMountOnLocal",
        					data: {id:$id},
        					dataType : 'json',
        					async: false,
        					success: function (json)
        					{
        					 
        						var j = 0;
        						var length = json.length
        						 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
        							
        							db.transaction(function(tx){
        								tx.executeSql('DROP TABLE IF EXISTS MOUNT_ON');
        								tx.executeSql('CREATE TABLE IF NOT EXISTS MOUNT_ON (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
        								
        								for (var i = 0; i < length; i++) {
        									tx.executeSql('INSERT OR REPLACE INTO MOUNT_ON (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
        									
        									j++;
        									if(j==length){
        										
        									//	alert('Mount On to updated');
        										 
        										
        									}
        									
        								}
        							});
        						
        					},
        				    }); 
        			 function successID(){
        					return true;
        				}
        			 
        			 ajaxWinOpenType();
        			
        		 }
        		 
        		 function ajaxWinOpenType(){
        			 //alert("success ajax fn");
        			 
        			 var $id = "spine"
        			 $.ajax
        			    ({
        				
        				type: "POST",                                
        				url: "http://test.sedarspine.com/en/spineLogisticsApp/getWinOpenLocal",
        				data: {id:$id},
        				dataType : 'json',
        				async: false,
        				success: function (json)
        				{
        				 
        					//alert("inside json");
        				 	//alert(json.length);
        				 var length = json.length
        				 var j = 0;
        				 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
        					
        					db.transaction(function(tx){
        						tx.executeSql('DROP TABLE IF EXISTS WINOPEN_TYPE');
        						tx.executeSql('CREATE TABLE IF NOT EXISTS WINOPEN_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
        						
        						for (var i = 0; i < length; i++) {
        							tx.executeSql('INSERT OR REPLACE INTO WINOPEN_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
        							//alert("code--"+json[i].VSL_CODE);
        							j++;
        							if(j==length){
        								
        								//alert('Success to updated');
        								
        							}
        							
        						}
        					});
        					
        				},
        			    }); 
        			 
        			 function successID(){
        					return true;
        				}
        			 
        			 ajaxHandlePositionType();
        		 }
        		 
        		 function ajaxHandlePositionType(){
        			 var $id = "spine"
        			 $.ajax
        			    ({
	        				type: "POST",                                
	        				url: "http://test.sedarspine.com/en/spineLogisticsApp/getHandlePositionLocal",
	        				data: {id:$id},
	        				dataType : 'json',
	        				async: false,
	        				success: function (json)
	        				{	
		        				 var length = json.length
		        				 var j = 0;
		        				 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		        				 db.transaction(function(tx){
		        					tx.executeSql('DROP TABLE IF EXISTS HANDLE_TYPE');
		        					tx.executeSql('CREATE TABLE IF NOT EXISTS HANDLE_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
		        					for (var i = 0; i < length; i++) {
		        						tx.executeSql('INSERT OR REPLACE INTO HANDLE_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
		        						j++;
		        						if(j==length){
		        							
		        						}
		        					}
		        				});
	        				},
        			    }); 
        			 
        			function successID(){
        					return true;
        				}
        			ajaxWindowType();
        		 	}

                    function ajaxWindowType(){
                     var $id = "spine"
                     $.ajax
                        ({
                            type: "POST",                                
                            url: "http://test.sedarspine.com/en/spineLogisticsApp/getWindowType",
                            data: {id:$id},
                            dataType : 'json',
                            async: false,
                            success: function (json)
                            {   
                                 var length = json.length
                                 var j = 0;
                                 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
                                 db.transaction(function(tx){
                                    tx.executeSql('DROP TABLE IF EXISTS WINDOW_TYPE');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS WINDOW_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
                                    for (var i = 0; i < length; i++) {
                                        tx.executeSql('INSERT OR REPLACE INTO WINDOW_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
                                        j++;
                                        if(j==length){
                                            
                                        }
                                    }
                                });
                            },
                        }); 
                     
                    function successID(){
                            return true;
                        }
                    ajaxOperateType();
                    }
					
					
				function ajaxOperateType(){
                    var $id = "spine"
                    $.ajax
						({
                            type: "POST",                                
                            url: "http://test.sedarspine.com/en/spineLogisticsApp/getOperateType",
                            data: {id:$id},
                            dataType : 'json',
                            async: false,
                            success: function (json)
                            {   
                                 var length = json.length
                                 var j = 0;
                                 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
                                 db.transaction(function(tx){
                                    tx.executeSql('DROP TABLE IF EXISTS OPERATE_TYPE');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS OPERATE_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
                                    for (var i = 0; i < length; i++) {
                                        tx.executeSql('INSERT OR REPLACE INTO OPERATE_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
                                        j++;
                                        if(j==length){
                                            
                                        }
                                    }
                                });
                            },
                        }); 
                     
                    function successID(){
                            return true;
                        }
                    ajaxControlType();
                }
				
				function ajaxControlType(){
                    var $id = "spine"
                    $.ajax
						({
                            type: "POST",                                
                            url: "http://test.sedarspine.com/en/spineLogisticsApp/getControlType",
                            data: {id:$id},
                            dataType : 'json',
                            async: false,
                            success: function (json)
                            {   
                                 var length = json.length
                                 var j = 0;
                                 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
                                 db.transaction(function(tx){
                                    tx.executeSql('DROP TABLE IF EXISTS CONTROL_TYPE');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS CONTROL_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
                                    for (var i = 0; i < length; i++) {
                                        tx.executeSql('INSERT OR REPLACE INTO CONTROL_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
                                        j++;
                                        if(j==length){
                                            
                                        }
                                    }
                                });
                            },
                        }); 
                     
                    function successID(){
                            return true;
                        }
                    ajaxOpeningType();
                }
				
				function ajaxOpeningType(){
                    var $id = "spine"
                    $.ajax
						({
                            type: "POST",                                
                            url: "http://test.sedarspine.com/en/spineLogisticsApp/getOpeningType",
                            data: {id:$id},
                            dataType : 'json',
                            async: false,
                            success: function (json)
                            {   
                                 var length = json.length
                                 var j = 0;
                                 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
                                 db.transaction(function(tx){
                                    tx.executeSql('DROP TABLE IF EXISTS OPENING_TYPE');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS OPENING_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
                                    for (var i = 0; i < length; i++) {
                                        tx.executeSql('INSERT OR REPLACE INTO OPENING_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
                                        j++;
                                        if(j==length){
                                            
                                        }
                                    }
                                });
                            },
                        }); 
                     
                    function successID(){
                            return true;
                        }
                    ajaxPowerType();
                }
				
				function ajaxPowerType(){
                    var $id = "spine"
                    $.ajax
						({
                            type: "POST",                                
                            url: "http://test.sedarspine.com/en/spineLogisticsApp/getPowerType",
                            data: {id:$id},
                            dataType : 'json',
                            async: false,
                            success: function (json)
                            {   
                                var length = json.length
                                var j = 0;
                                var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
                                db.transaction(function(tx){
                                    tx.executeSql('DROP TABLE IF EXISTS POWER_TYPE');
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS POWER_TYPE (ID INTEGER PRIMARY KEY AUTOINCREMENT, VSL_CODE TEXT, VSL_DESC TEXT) ');
                                    for (var i = 0; i < length; i++) {
                                        tx.executeSql('INSERT OR REPLACE INTO POWER_TYPE (VSL_CODE, VSL_DESC) VALUES ("' + json[i].VSL_CODE + '", "' + json[i].VSL_DESC + '")', successID);
                                        j++;
                                        if(j==length){
                                            
                                        }
                                    }
                                });
                            },
                        }); 
                     
                    function successID(){
                            return true;
                        }
                    //SyncMeasureHeadValue();
                }
/*
        		 function SyncMeasureHeadValue(){
        			 
        			 var $id = "spine"
            			 $.ajax
            			    ({
    	        				type: "POST",                                
    	        				url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncMeasureHeadValue",
    	        				data: {id:$id},
    	        				dataType : 'json',
    	        				async: false,
    	        				success: function (json)
    	        				{	
    		        				 var length = json.length;
									 //alert(length);
    		        				 var j = 0;
    		        				 var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
    		        				 db.transaction(function(tx){
    		        					tx.executeSql('DROP TABLE IF EXISTS Live_Measure_Head');
    		        					tx.executeSql('CREATE TABLE IF NOT EXISTS Live_Measure_Head (MH_SYS_ID INTEGER , MH_COMP_CODE TEXT, MH_LANG_CODE TEXT,MH_TXN_CODE TEXT, MH_TXN_NO TEXT, MH_TXN_DT TEXT,MH_DOC_REF TEXT, MH_LOCN_CODE TEXT, MH_SR_CODE TEXT,MH_REF_SYS_ID INTEGER, MH_REF_TXN_CODE TEXT, MH_REF_TXN_NO TEXT,MH_REF_TXN_DT TEXT, MH_SALE_REF_SYS_ID TEXT, MH_SALE_REF_TXN_CODE TEXT,MH_SALE_REF_TXN_NO TEXT, MH_SALE_REF_TXN_DT TEXT, MH_CONTACT_NO TEXT,MH_CONTACT_PERSON TEXT, MH_CUST_TYPE TEXT, MH_CUST_AC_CODE TEXT,MH_CUST_AC_DESC TEXT, MH_ADD1 TEXT, MH_ADD2 TEXT, MH_ADD3 TEXT, MH_ADD4 TEXT, MH_CN_CODE TEXT, MH_ST_CODE TEXT, MH_CT_CODE TEXT, MH_CT_AR_CODE TEXT, MH_POSTAL TEXT, MH_MOBILE TEXT, MH_PHONE TEXT, MH_FAX TEXT, MH_EMAIL TEXT, MH_DESC TEXT, MH_STATUS TEXT, MH_APPOINT_DT TEXT, MH_CR_DT TEXT, MH_CR_UID TEXT, MH_UPD_DT TEXT, MH_UPD_UID TEXT, MH_SEND_YN TEXT, MH_SEND_DT TEXT, MH_SEND_UID TEXT, MH_APPROVE_YN TEXT, MH_APPROVE_DT TEXT, MH_APPROVE_UID TEXT, MH_FLEX_01 TEXT, MH_FLEX_02 TEXT, MH_FLEX_03 TEXT, MH_FLEX_04 TEXT, MH_FLEX_05 TEXT, MH_FLEX_06 TEXT, MH_FLEX_07 TEXT, MH_FLEX_08 TEXT, MH_FLEX_09 TEXT, MH_FLEX_10 TEXT, MH_FLEX_11 TEXT, MH_FLEX_12 TEXT, MH_FLEX_13 TEXT, MH_FLEX_14 TEXT, MH_FLEX_15 TEXT, MH_FLEX_16 TEXT, MH_FLEX_17 TEXT, MH_FLEX_18 TEXT, MH_FLEX_19 TEXT, MH_FLEX_20 TEXT) ');
    		        					for (var i = 0; i < length; i++) {
    		        						tx.executeSql('INSERT OR REPLACE INTO Live_Measure_Head (MH_SYS_ID , MH_COMP_CODE , MH_LANG_CODE ,MH_TXN_CODE , MH_TXN_NO , MH_TXN_DT ,MH_DOC_REF , MH_LOCN_CODE , MH_SR_CODE ,MH_REF_SYS_ID , MH_REF_TXN_CODE , MH_REF_TXN_NO ,MH_REF_TXN_DT , MH_SALE_REF_SYS_ID , MH_SALE_REF_TXN_CODE ,MH_SALE_REF_TXN_NO , MH_SALE_REF_TXN_DT , MH_CONTACT_NO ,MH_CONTACT_PERSON , MH_CUST_TYPE , MH_CUST_AC_CODE ,MH_CUST_AC_DESC , MH_ADD1 , MH_ADD2 , MH_ADD3 , MH_ADD4 , MH_CN_CODE , MH_ST_CODE , MH_CT_CODE , MH_CT_AR_CODE , MH_POSTAL , MH_MOBILE , MH_PHONE , MH_FAX , MH_EMAIL , MH_DESC , MH_STATUS , MH_APPOINT_DT , MH_CR_DT , MH_CR_UID , MH_UPD_DT , MH_UPD_UID , MH_SEND_YN , MH_SEND_DT , MH_SEND_UID , MH_APPROVE_YN , MH_APPROVE_DT , MH_APPROVE_UID , MH_FLEX_01 , MH_FLEX_02 , MH_FLEX_03 , MH_FLEX_04 , MH_FLEX_05 , MH_FLEX_06 , MH_FLEX_07 , MH_FLEX_08 , MH_FLEX_09 , MH_FLEX_10 , MH_FLEX_11 , MH_FLEX_12 , MH_FLEX_13 , MH_FLEX_14 , MH_FLEX_15 , MH_FLEX_16 , MH_FLEX_17 , MH_FLEX_18 , MH_FLEX_19 , MH_FLEX_20) VALUES ("' + json[i].MH_SYS_ID+ '" , "' + json[i].MH_COMP_CODE + '", "' + json[i].MH_LANG_CODE + '", "' + json[i].MH_TXN_CODE + '", "' + json[i].MH_TXN_NO + '",  "' + json[i].MH_TXN_DT + '", "' + json[i].MH_DOC_REF + '",  "' + json[i].MH_LOCN_CODE + '",  "' + json[i].MH_SR_CODE + '", "' + json[i].MH_REF_SYS_ID + '",  "' + json[i].MH_REF_TXN_CODE + '",  "' + json[i].MH_REF_TXN_NO + '", "' + json[i].MH_REF_TXN_DT + '",  "' + json[i].MH_SALE_REF_SYS_ID + '",  "' + json[i].MH_SALE_REF_TXN_CODE + '", "' + json[i].MH_SALE_REF_TXN_NO + '",  "' + json[i].MH_SALE_REF_TXN_DT + '",  "' + json[i].MH_CONTACT_NO + '", "' + json[i].MH_CONTACT_PERSON + '",  "' + json[i].MH_CUST_TYPE + '",  "' + json[i].MH_CUST_AC_CODE + '", "' + json[i].MH_CUST_AC_DESC + '",  "' + json[i].MH_ADD1 + '",  "' + json[i].MH_ADD2 + '",  "' + json[i].MH_ADD3 + '",  "' + json[i].MH_ADD4 + '",  "' + json[i].MH_CN_CODE + '",  "' + json[i].MH_ST_CODE + '",  "' + json[i].MH_CT_CODE + '",  "' + json[i].MH_CT_AR_CODE + '",  "' + json[i].MH_POSTAL + '",  "' + json[i].MH_MOBILE + '",  "' + json[i].MH_PHONE + '",  "' + json[i].MH_FAX + '",  "' + json[i].MH_EMAIL + '",  "' + json[i].MH_DESC + '",  "' + json[i].MH_STATUS + '",  "' + json[i].MH_APPOINT_DT + '",  "' + json[i].MH_CR_DT + '",  "' + json[i].MH_CR_UID + '",  "' + json[i].MH_UPD_DT + '",  "' + json[i].MH_UPD_UID + '",  "' + json[i].MH_SEND_YN + '",  "' + json[i].MH_SEND_DT + '",  "' + json[i].MH_SEND_UID + '",  "' + json[i].MH_APPROVE_YN + '",  "' + json[i].MH_APPROVE_DT + '",  "' + json[i].MH_APPROVE_UID + '",  "' + json[i].MH_FLEX_01 + '",  "' + json[i].MH_FLEX_02 + '",  "' + json[i].MH_FLEX_03 + '",  "' + json[i].MH_FLEX_04 + '",  "' + json[i].MH_FLEX_05 + '",  "' + json[i].MH_FLEX_06 + '",  "' + json[i].MH_FLEX_07 + '",  "' + json[i].MH_FLEX_08 + '",  "' + json[i].MH_FLEX_09 + '",  "' + json[i].MH_FLEX_10 + '",  "' + json[i].MH_FLEX_11 + '",  "' + json[i].MH_FLEX_12 + '",  "' + json[i].MH_FLEX_13 + '",  "' + json[i].MH_FLEX_14 + '",  "' + json[i].MH_FLEX_15 + '",  "' + json[i].MH_FLEX_16 + '",  "' + json[i].MH_FLEX_17 + '",  "' + json[i].MH_FLEX_18 + '",  "' + json[i].MH_FLEX_19 + '",  "' + json[i].MH_FLEX_20+ '" )', successID);
    		        						j++;
    		        						if(j==length){
    		        							//alert("Success");
    		        						}
    		        					}
    		        				});
    	        				},
            			    }); 
            			 
            			function successID(){
            					return true;
            				}
        		 }*/