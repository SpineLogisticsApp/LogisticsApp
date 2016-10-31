function onlineEditMeasure(MH_SYS_ID){
	$('body').addClass('loading').loader('show', { overlay: true });
	//alert("get-"+MH_SYS_ID);
	getMeasureTreeData(MH_SYS_ID);
	function getMeasureTreeData(MH_SYS_ID){
		$.ajax({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedTreeValue",
		data: {MH_SYS_ID:MH_SYS_ID},
		dataType : 'json',
		async: false,
		success: function (json)
		{	
			var length = json.length;
			//alert("TreeLength->"+length);
			
			if(length==1){
				for(var i=0;i<length;i++){
					//alert(json[i].MT_LEVEL_ID);
					
					if (json[i].MT_LEVEL_ID=="1" && json[i].MT_DESC!="" && i==0) {
						$('#measurementTab').append('<li class="input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-line-sys-id="" value="'+json[i].MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
					}
				}
				$('body').removeClass('loading').loader('hide');
			}else if(length==2){
				for(var i=0;i<length;i++){
					if (json[i].MT_LEVEL_ID=="1" && json[i].MT_DESC!="" && i==0) {
						$('#measurementTab').append('<li class="input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-line-sys-id="" value="'+json[i].MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
					}else if(json[i].MT_LEVEL_ID=="2" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Floor</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback floor" type="text" data-toggle="tooltip" data-level-id="2" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" name="ML_FLOOR[]" value="'+json[i].MT_DESC+'" data-original-title="" title="" data-fv-field="ML_FLOOR[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><span class="input-group-btn"><button class="btn btn-success btn-sm floor" onclick=addChildNode($(this),".appartmentList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'floor\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></span></li></ul>');
					}
				}
				$('body').removeClass('loading').loader('hide');
			}else if(length==3){
				for(var i=0;i<length;i++){
					if (json[i].MT_LEVEL_ID=="1" && json[i].MT_DESC!="" && i==0) {
						$('#measurementTab').append('<li class="input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-line-sys-id="" value="'+json[i].MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
					}else if(json[i].MT_LEVEL_ID=="2" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Floor</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback floor" type="text" data-toggle="tooltip" data-level-id="2" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" name="ML_FLOOR[]" value="'+json[i].MT_DESC+'" data-original-title="" title="" data-fv-field="ML_FLOOR[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><span class="input-group-btn"><button class="btn btn-success btn-sm floor" onclick=addChildNode($(this),".appartmentList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'floor\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></span></li></ul>');
					}else if(json[i].MT_LEVEL_ID=="3" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="appLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Appartment</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback appartment" type="text" data-toggle="tooltip" data-level-id="3" name="ML_FLAT[]" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-original-title="" value="'+json[i].MT_DESC+'" title="" data-fv-field="ML_FLAT[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm appartment" onclick=addWindowAndProduct($(this),"room",".roomList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'appartment\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
					}
				}
				$('body').removeClass('loading').loader('hide');
			}else{
				for(var i=0;i<length;i++){
					//alert(json[i].MT_LEVEL_ID);
					
					if (json[i].MT_LEVEL_ID=="1" && json[i].MT_DESC!="" && i==0) {
						$('#measurementTab').append('<li class="input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Building</span><div class="input-group"><span class="input-group-btn"><button onclick="closeChildren($(this))" class="btn sedar-color btn-xs glyphicon glyphicon-minus" type="button"></button></span><input type="text" data-toggle="tooltip" onkeyup="headingChange($(this),null)" data-level-id="1" data-parent-id="" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-line-sys-id="" value="'+json[i].MT_DESC+'" class="form-control input-sm sedar has-feedback" name="ML_BUILDING[]" data-original-title="" title="" data-fv-field="ML_BUILDING[]" onchange="treeModeCheck($(this))"><i style="pointer-events: none; display: none;" class="form-control-feedback fv-icon-no-label" data-fv-icon-for="ML_BUILDING[]"></i><button class="hide" onclick="deleteMeasurementTreeInDb(12168)" name="deleteTree[]" type="button"></button><span class="input-group-btn"><button onclick=addChildNode($(this),".floorList") class="btn btn-success btn-sm btn-addNode" type="button"><i class="fa fa-plus"></i></button><button onclick="" class="btn sedar-white btn-sm btn-removeNode" type="button"><i class="fa fa-trash"></i></button></span></div></li>');
					}else if(json[i].MT_LEVEL_ID=="2" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Floor</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback floor" type="text" data-toggle="tooltip" data-level-id="2" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" name="ML_FLOOR[]" value="'+json[i].MT_DESC+'" data-original-title="" title="" data-fv-field="ML_FLOOR[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><span class="input-group-btn"><button class="btn btn-success btn-sm floor" onclick=addChildNode($(this),".appartmentList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'floor\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></span></li></ul>');
					}else if(json[i].MT_LEVEL_ID=="3" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="appLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Appartment</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback appartment" type="text" data-toggle="tooltip" data-level-id="3" name="ML_FLAT[]" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-original-title="" value="'+json[i].MT_DESC+'" title="" data-fv-field="ML_FLAT[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm appartment" onclick=addWindowAndProduct($(this),"room",".roomList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'appartment\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
					}else if(json[i].MT_LEVEL_ID=="4" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="roomLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Room</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback room" type="text" data-toggle="tooltip" data-level-id="4" name="ML_ROOM_NO[]" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-original-title="" value="'+json[i].MT_DESC+'" title="" data-fv-field="ML_ROOM_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement room" data-product-id=#measurementId_'+json[i+2].MT_SYS_ID+' onclick="showRoomTab($(this))" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm" onclick=addWindowAndProduct($(this),"wall",".wallList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'room\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
					}else if(json[i].MT_LEVEL_ID=="5" && json[i].MT_DESC!=""){
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="wallLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Wall</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback wall" type="text" data-toggle="tooltip" data-level-id="5" name="ML_WALL[]" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" data-original-title="" value="'+json[i].MT_DESC+'" title="" data-fv-field="ML_WALL[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button type="button" class="btn btn-success btn-sm windowMeasurement wall" onclick="showWallTab($(this))" data-product-id=#measurementId_'+json[i+1].MT_SYS_ID+' name="measurement[]"><i class="fa fa-road"></i></button><button class="btn btn-success btn-sm"  onclick=addWindowAndProduct($(this),"window",".windowList") type="button"><i class="fa fa-plus"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'wall\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')"  type="button"><i class="fa fa-trash"></i></button></li></ul>');
					}else if(json[i].MT_LEVEL_ID=="6" && json[i].MT_DESC!=""){
						localStorage.removeItem("GetNewLineID");
						//alert(json[i].MT_SYS_ID);
						localStorage.setItem("GetNewLineID", json[i].MT_SYS_ID);
						$('.parent_'+json[i].MT_PARENT_SYS_ID+'').append('<ul class="collapse in activeNode" aria-expanded="true"><li class="floorLi input-group activeNode parent_'+json[i].MT_SYS_ID+' "><span class="label sedar-color">Window</span><div class="input-group"><span class="input-group-btn"><button class="btn sedar-color btn-xs glyphicon glyphicon-minus" onclick="closeChildren($(this))" type="button"></button></span><input class="form-control input-sm sedar has-feedback window" type="text" data-toggle="tooltip" data-level-id="6" data-mode="edit" data-sys-id="'+ json[i].MT_SYS_ID +'" name="ML_WINDOW_NO[]" value="'+json[i].MT_DESC+'" data-original-title="" title="" data-fv-field="ML_WINDOW_NO[]" onchange="treeModeCheck($(this))"><span class="input-group-btn"><button class="btn btn-success btn-sm window" onclick="showWindowTab($(this))" data-product-id=#measurementId_'+json[i].MT_SYS_ID+' type="button" name="measurement[]"><i class="fa fa-road"></i></button><button class="btn sedar-white btn-sm" onclick="removeCurrentNode($(this),\'window\','+json[i].MT_SYS_ID+','+json[i].MT_MH_SYS_ID+')" type="button"><i class="fa fa-trash"></i></button></li></ul>');
						//alert(json[i].MT_SYS_ID);
						getMeasureLineData(json[i].MT_SYS_ID);
						
					}
				}
			}
			
			//getMeasureLineData(MH_SYS_ID);
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		}
	});
	}
	
	function getMeasureLineData(MT_SYS_ID){
		//alert("id"+MT_SYS_ID);
		$.ajax({
		type: "POST",                                
		url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedLineValue",
		data: {MT_SYS_ID:MT_SYS_ID},
		dataType : 'json',
		async: false,
		success: function (json)
		{
			//alert(JSON.stringify(json));
			if(json==null){
				//alert("error");
			}else{
				var length = json.length;
				var j=0
				//alert("LineLength->"+length);
				for(var i=0;i<length;i++){
					//alert(json[i].ML_SYS_ID);
					$measurement=json[i].ML_SYS_ID;
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
					var setValue=json[i];
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
					//alert(setValue.ML_LOCN_CODE);
					$(measurementId).find('[name="LSL_LOCN_CODE[]"]').val(setValue.ML_LOCN_CODE);
					localStorage.setItem('ML_LOCN_CODE',setValue.ML_LOCN_CODE);
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
					$(measurementId).find('[name="ML_RIGHT_WALL[]"]').val(setValue.ML_RIGHT_WALL);
					$(measurementId).find('[name="ML_CEILING_UP[]"]').val(setValue.ML_CEILING_UP).formatCurrency();
					$(measurementId).find('[name="ML_FLOOR_DOWN[]"]').val(setValue.ML_FLOOR_DOWN);
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
					*/
					
					//getMeasureImageData(json[i].ML_SYS_ID);
					
					//Images
					$.ajax({
						type: "POST",                                
						url: "http://test.sedarspine.com/en/spineLogisticsApp/SyncSelectedImageValue",
						data: {ML_SYS_ID:json[i].ML_SYS_ID},
						dataType : 'json',
						async: false,
						success: function (json)
						{
							//alert("Img ->"+JSON.stringify(json));
							if(json.status=='Error'){
								//alert("Error");
							}else{
								var length = json.length;
								//alert("ImageLength->"+length);
								for(var i=0;i<length;i++){
									var $measurement=json[i].MI_ML_SYS_ID;
									var imageData = json[i].MI_FILE_NAME;
									var imageSize = json[i].MI_SIZE;
									var imageDesc = json[i].MI_DESC;
									//alert($measurement+"--"+imageData+"--"+imageSize);
									//alert($measurement);
									var measurementIdNew='#measurementId_'+$measurement+'_modal_data';
									//alert(imageDesc);
									if(imageDesc=='bluePrintImage'){
										//alert("BP_sysId->"+json[i].MI_SYS_ID);
										$(measurementIdNew).find('[name="BP_MI_SYS_ID[]"]').val(json[i].MI_SYS_ID);
									}else if(imageDesc=='otherImage'){
										//alert("img_sysId->"+json[i].ML_SYS_ID);
										$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(json[i].MI_SYS_ID);
									}else{
										//alert("else");
										$(measurementIdNew).find('[name="MI_SYS_ID[]"]').val(json[i].MI_SYS_ID);
									}
									
									//alert(measurementIdNew);
									//$(measurementIdNew).find('[name="mode_check[]"]').val('edit');
									var USER_ID=localStorage.getItem("user_id");
									var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
									$(measurementIdNew).find('[name="USER_COMP_CODE[]"]').val(USER_COMP_CODE);
									$(measurementIdNew).find('[name="USER_ID[]"]').val(USER_ID);
									$(measurementIdNew).find('[name="mode_check[]"]').val('edit');
									$(measurementIdNew).find('[name="mode[]"]').val('edit');
									$(measurementIdNew).find('[name="linesys_id[]"]').val(json[i].MI_ML_SYS_ID);
									$(measurementIdNew).find('[name="system_id[]"]').val(json[i].MI_MH_SYS_ID);
									$(measurementIdNew).find('[name="MI_DESC[]"]').val(json[i].MI_DESC);
									$(measurementIdNew).find("#Imagecount").append('<div id="RemoveImgEditMode" class="form-group '+ json[i].MI_SYS_ID +'"><span onclick="DeleteImgServe($(this),'+json[i].MI_SYS_ID+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+imageData+'" data-val="'+imageSize+'" data-desc="'+ imageDesc +'" data-mode="edit" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="edit"></div>');
									//alert(json[i].MI_MH_SYS_ID);
									
								}
							}
							
						},error: function (xhr, ajaxOptions, thrownError) {
							//alert(xhr);alert(ajaxOptions);alert(thrownError);
						}
					});
					j++;
					if(j==length){
						var CheckMode = localStorage.getItem("SubmitMode");
						$('body').removeClass('loading').loader('hide');
						if(CheckMode=='wait'){
							localStorage.removeItem("SubmitMode")
							$(".next").click();
						}
					}
				}
			}
		},error: function (xhr, ajaxOptions, thrownError) {
			//alert(xhr);alert(ajaxOptions);alert(thrownError);
		}
	});
	}
	
	 
	
	function successID(){
		return true;
	}
	
}


//Online Add Mode

function getDatafromServer(){
	var systemLineId = localStorage.getItem("mesurementTransaction_id");
	var GetModeType = localStorage.getItem("Mesure_Mode");
	var Comp_code=localStorage.getItem("USER_COMP_CODE");
	//alert(systemLineId+"--"+GetModeType);
	
	if(GetModeType=='edit'){
		//measure Head
		$.ajax({
			type: "POST",
			url: 'http://test.sedarspine.com/en/spineLogisticsApp/Get_City_Desc_Head',
			data :{systemId:systemLineId,Comp_code:Comp_code},
			dataType:"json",
			async: false,
			success:function (json) {
				var j=0;
				var ajaxlength = json.length;
				
				for (var i = 0; i < ajaxlength; i++){
					
					var MH_CUST_AC_DESC = json[i].MH_CUST_AC_DESC;
					var MH_CONTACT_PERSON = json[i].MH_CONTACT_PERSON;
					var MH_SALE_REF_TXN_CODE = json[i].MH_SALE_REF_TXN_CODE;
					var MH_SALE_REF_TXN_NO = json[i].MH_SALE_REF_TXN_NO;
					
					var ADD1 = json[i].MH_ADD1;
					var ADD2 = json[i].MH_ADD2;
					var ADD3 = json[i].MH_ADD3;
					var ADD4 = json[i].MH_ADD4;
					//alert(ADD1+"="+ADD2+"="+ADD3+"="+ADD4);
					if(ADD1==null){
						var MH_ADD1 ="";
					} else if(ADD1==""){
						var MH_ADD1 ="";
					}if(ADD1==undefined){
						var MH_ADD1 ="";
					}
					else{
						var MH_ADD1 = json[i].MH_ADD1;
					}
					
					if(ADD2==null){
						var MH_ADD2 ="";
					} else if(ADD2==""){
						var MH_ADD2 ="";
					}if(ADD2==undefined){
						var MH_ADD2 ="";
					}else{
						var MH_ADD2 = json[i].MH_ADD2;
					}
					
					if(ADD3==null){
						var MH_ADD3 ="";
					} else if(ADD3==""){
						var MH_ADD3 ="";
					}if(ADD3==undefined){
						var MH_ADD3 ="";
					}
					else{
						var MH_ADD3 = json[i].MH_ADD3;
					}
					
					if(ADD4==null){
						var MH_ADD4 ="";
					} else if(ADD4==""){
						var MH_ADD4 ="";
					}if(ADD4==undefined){
						var MH_ADD4 ="";
					}
					else{
						var MH_ADD4 = json[i].MH_ADD4;
					}
					
					/*
					if(ADD2!=null){
						var MH_ADD2 = json[i].MH_ADD2;
					}else{
						var MH_ADD2 ="";
					}
					if(ADD3!=null){
						var MH_ADD3 = json[i].MH_ADD3;
					}
					else{
						var MH_ADD3 ="";
					}
					if(ADD4!=null){
						var MH_ADD4 = json[i].MH_ADD4;
					}else{
						var MH_ADD4 ="";
					}*/
					
					
					var ADDRESS = MH_ADD1 + "," + MH_ADD2+","+MH_ADD3+","+MH_ADD4;
					
					/* Head Reference value display start */ 

					
					document.getElementById("MH_CUST_AC_DESC").setAttribute('value',MH_CUST_AC_DESC);
					document.getElementById("MH_CONTACT_PERSON").setAttribute('value',MH_CONTACT_PERSON);
					document.getElementById("MH_ADD1").setAttribute('value',ADDRESS);
					document.getElementById("MH_SALE_REF_TXN_CODE").setAttribute('value',MH_SALE_REF_TXN_CODE);
					document.getElementById("MH_SALE_REF_TXN_NO").setAttribute('value',MH_SALE_REF_TXN_NO);
					
					
					var AREA = json[i].AREA_DESC;
					var CT = json[i].CT_DESC;
					var CN = json[i].CN_DESC;
					if(AREA!=null){
					  var AREA_DESC = json[i].AREA_DESC;
					}else{
						var AREA_DESC ="";
					}
					if(CT!=null){
					  var CT_DESC = json[i].CT_DESC;
					  var city1 = AREA_DESC+","+CT_DESC;
					}else{
						var CT_DESC ="";
					}
					if(CN!=null){
					  var CN_DESC = json[i].CN_DESC;
					}
					else{
						var CN_DESC ="";
					}
					var NewCityAdr= AREA_DESC + "," + CT_DESC +","+CN_DESC;
					
					document.getElementById("City").setAttribute('value',NewCityAdr);
					DisplaySelect();
					/* Head Reference value display end */	
					
				}
			}
		});
	}else{
		//schedule Line
		$.ajax({
			type: "POST",
			url: 'http://test.sedarspine.com/en/spineLogisticsApp/getJobTrackingLinesId',
			data :{systemId:systemLineId},
			dataType:"json",
			async: false,
			success:function (json) {
				//alert(JSON.stringify(json));
				if(json.status=='Error'){
					//alert("error");
				}else{
					var j=0;
					var ajaxlength = json.length;
					for (var i = 0; i < ajaxlength; i++){
						getJobHead(json[i].LSL_LSH_SYS_ID);
						localStorage.setItem("lsl_sys_id", json[i].LSL_SYS_ID);
						var lsl_sys_id = json[i].LSL_SYS_ID;				
						var LSL_REF_TXN_CODE = json[i].LSL_REF_TXN_CODE;
						var LSL_CT_AREA_CODE = json[i].LSL_CT_AREA_CODE;
						var LSL_CT_CODE = json[i].LSL_CT_CODE;
						var LSL_REF_TXN_NO = json[i].LSL_REF_TXN_NO;
						var LSL_REF_TXN_DT = json[i].LSL_REF_TXN_DT;
						var LSL_CUST_AC_DESC = json[i].LSL_CUST_AC_DESC;
						var LSL_CONTACT_PERSON = json[i].LSL_CONTACT_PERSON;
						var LSL_CONTACT_NO = json[i].LSL_CONTACT_NO;
						var LSL_LOCN_CODE = json[i].LSL_LOCN_CODE;
						localStorage.setItem("LSL_LOCN_CODE",LSL_LOCN_CODE);
						var LSL_REQUESTED_BY = json[i].LSL_REQUESTED_BY;
						var LSL_JOB_CODE = json[i].LSL_JOB_CODE;
						var LSL_JOB_STATUS = json[i].LSL_JOB_STATUS;
						var LSL_SYS_ID = json[i].LSL_SYS_ID;
						var ADD1 = json[i].LSL_ADD1;
						var ADD2 = json[i].LSL_ADD2;
						var ADD3 = json[i].LSL_ADD3;
						var ADD4 = json[i].LSL_ADD4;
						var LSL_CUST_ID = json[i].LSL_CUST_ID;
						var LSL_CN_CODE = json[i].LSL_CN_CODE;
						var LSL_CUST_AC_CODE = json[i].LSL_CUST_AC_CODE;
						var LSL_APPOINT_DT = json[i].LSL_APPOINT_DT;
						var LSL_JOB_STATUS = json[i].LSL_JOB_STATUS;
						var LSL_DESC = json[i].LSL_DESC;
						var LSL_EMAIL = json[i].LSL_EMAIL;
						var LSL_FAX = json[i].LSL_FAX;
						var LSL_PHONE = json[i].LSL_PHONE;
						var LSL_MOBILE = json[i].LSL_MOBILE;
						var LSL_POSTAL = json[i].LSL_POSTAL;
						var LSL_CONTACT_NO = json[i].LSL_CONTACT_NO;
						var LSL_REF_SYS_ID = json[i].LSL_REF_SYS_ID;
						var LSL_SR_CODE = json[i].LSL_SR_CODE;
						var LSL_ST_CODE = json[i].LSL_ST_CODE;
						/*
						if(ADD1 != "null"){
							var LSL_ADD1 = json[i].LSL_ADD1;
						}else{
							var LSL_ADD1 ="";
						}
						if(ADD2 != "null"){
							var LSL_ADD2 = json[i].LSL_ADD2;
						}else{
							var LSL_ADD2 ="";
						}
						if(ADD3 != "null"){
							var LSL_ADD3 = json[i].LSL_ADD3;
						}
						else{
							var LSL_ADD3 ="";
						}
						if(ADD4 !="null"){
							var LSL_ADD4 = json[i].LSL_ADD4;
						}else{
							var LSL_ADD4 ="";
						}
						*/
						
						
						if(ADD1==null){
							var LSL_ADD1 ="";
						} else if(ADD1==""){
							var LSL_ADD1 ="";
						}if(ADD1==undefined){
							var LSL_ADD1 ="";
						}
						else{
							var LSL_ADD1 = json[i].LSL_ADD1;
						}
						
						if(ADD2==null){
							var LSL_ADD2 ="";
						} else if(ADD2==""){
							var LSL_ADD2 ="";
						}if(ADD2==undefined){
							var LSL_ADD2 ="";
						}else{
							var LSL_ADD2 = json[i].LSL_ADD2;
						}
						
						if(ADD3==null){
							var LSL_ADD3 ="";
						} else if(ADD3==""){
							var LSL_ADD3 ="";
						}if(ADD3==undefined){
							var LSL_ADD3 ="";
						}
						else{
							var LSL_ADD3 = json[i].LSL_ADD3;
						}
						
						if(ADD4==null){
							var LSL_ADD4 ="";
						} else if(ADD4==""){
							var LSL_ADD4 ="";
						}if(ADD4==undefined){
							var LSL_ADD4 ="";
						}
						else{
							var LSL_ADD4 = json[i].LSL_ADD4;
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
						 //document.getElementById("LSL_APPOINT_DT").setAttribute('value',LSL_APPOINT_DT);
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
						DisplaySelect();
						 /* hidden values end */
						 
							/* Line value display end */	
						j++;
						if(j==ajaxlength){
							//alert('All Transaction Line data will be updated');
						}
						
					}
				}
			}
		});
		
		//City

		$.ajax({
			type: "POST",                               
			url: "http://test.sedarspine.com/en/spineLogisticsApp/Get_City_Desc_Line",
			data :{systemId:systemLineId,Comp_code:Comp_code},
			dataType : 'json',
			async: false,
			success: function (json)
			{   
				var length = json.length;
				//alert("Get_City_Desc"+length);
				var j = 0;
				for (var i = 0; i < length; i++) {
				var AREA = json[i].AREA_DESC;
				var CT = json[i].CT_DESC;
				var CN = json[i].CN_DESC;
				var LSL_CUST_ID = json[i].LSL_CUST_ID;
				/*
				if(AREA != "null"){
				  //alert(AREA_DESC);
				  var AREA_DESC = json[i].AREA_DESC;
				}else{
					var AREA_DESC ="";
				}
				if(CT != "null"){
				  var CT_DESC = json[i].CT_DESC;
				  var city1 = AREA_DESC+","+CT_DESC;
				}else{
					var CT_DESC ="";
				}
				if(CN != "null"){
				  var CN_DESC = json[i].CN_DESC;
				}
				else{
					var CN_DESC ="";
				}*/
				
				if(AREA ==null){
				  var AREA_DESC = "";
				}else if(AREA ==undefined){
					var AREA_DESC ="";
				}else if(AREA ==""){
					var AREA_DESC ="";
				}else{
					var AREA_DESC = json[i].AREA_DESC;
				}
				
				if(CT == null){
				  var CT_DESC ="";
				}else if(CT ==undefined){
					var CT_DESC ="";
				}else if(CT == ""){
					var CT_DESC ="";
				}else{
					var CT_DESC = json[i].CT_DESC;
				}
				
				if(CN == null){
				  var CN_DESC ="";
				}else if(CN == undefined){
					var CN_DESC ="";
				}else if(CN == ""){
					var CN_DESC ="";
				}else{
					var CN_DESC = json[i].CN_DESC;
				}
				
				
				var NewCityAdr= AREA_DESC + "," + CT_DESC +","+CN_DESC;
				
				//alert(NewCityAdr);
				document.getElementById("City").setAttribute('value',NewCityAdr);
				document.getElementById("LSL_CUST_ID").setAttribute('value',LSL_CUST_ID);
					j++;
					if(j==length){
					   //alert("Success");
					}
				}
			},
		});
	}
	
	function getJobHead(systemHeadId){
		//schedule Head
		$.ajax({
			type: "POST",
			url: 'http://test.sedarspine.com/en/spineLogisticsApp/getSchduleTrackingDataHead',
			data :{systemId:systemHeadId},
			dataType:"json",
			async: false,
			success:function (json){
				var j=0;
				var ajaxlength = json.length;
				for (var i = 0; i < ajaxlength; i++) {
					
					var currentDate = moment();
					var Today = moment(currentDate).format('DD-MMM-YYYY');				
					document.getElementById("defaultdate1").setAttribute('value',Today);
					var USER_ID=localStorage.getItem("user_id");
					var USER_COMP_CODE=localStorage.getItem("USER_COMP_CODE");
					document.getElementById("USER_ID").setAttribute('value',USER_ID);
					document.getElementById("USER_COMP_CODE").setAttribute('value',USER_COMP_CODE);
					document.getElementById("LSH_TXN_CODE").setAttribute('value',json[i].LSH_TXN_CODE);
					document.getElementById("LSH_TXN_DT").setAttribute('value',json[i].LSH_TXN_DT);
					document.getElementById("LSH_TXN_NO").setAttribute('value',json[i].LSH_TXN_NO);
					document.getElementById("LSH_DOC_REF").setAttribute('value',json[i].LSH_DOC_REF);
					
					j++;
					if(j==ajaxlength){
						//alert('All Transaction Head data will be updated');
					}
					
				}
			}

		});
	}
	
}