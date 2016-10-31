var pictureSource; 
var destinationType; 

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}


$globalV;
// Capture Image
function captureImage($this){
	$globalV=$this;
	var CheckMode = localStorage.getItem("LiveMode");
	//alert("CheckMode-"+CheckMode);
	if(CheckMode=="live_edit_mode"){
		navigator.camera.getPicture(onPhotoDataSuccessOnline, onFail, { targetWidth: 640,targetHeight: 480,
        destinationType: destinationType.FILE_URI });
	}else if(CheckMode=="live_add_mode"){
		navigator.camera.getPicture(onPhotoDataSuccessOnline, onFail, { targetWidth: 640,targetHeight: 480,
        destinationType: destinationType.FILE_URI });
	}else{
		navigator.camera.getPicture(onPhotoDataSuccessOffline, onFail, { targetWidth: 640,targetHeight: 480,
        destinationType: destinationType.FILE_URI });
	}	
}

// GetPicture from Gallery

function getPhoto($this){
	//alert("Get pohot");
	$globalV=$this;
	var CheckMode = localStorage.getItem("LiveMode");
	//alert("CheckMode-"+CheckMode);
	if(CheckMode=="live_edit_mode"){
		navigator.camera.getPicture(getPhotoDataSuccessOnline, onFail, { targetWidth: 640,targetHeight: 480,
        destinationType: destinationType.FILE_URI,sourceType: pictureSource.PHOTOLIBRARY });
	}else if(CheckMode=="live_add_mode"){
		navigator.camera.getPicture(getPhotoDataSuccessOnline, onFail, { targetWidth: 640,targetHeight: 480,
        destinationType: destinationType.FILE_URI,sourceType: pictureSource.PHOTOLIBRARY });
	}else{
		navigator.camera.getPicture(getPhotoDataSuccessOffline, onFail, { targetWidth: 640,targetHeight: 480,
        destinationType: destinationType.FILE_URI,sourceType: pictureSource.PHOTOLIBRARY });
	}	
}



// function captureImage($this) {
	// //console.log($this.parents);
	// $globalV=$this;
	 // navigator.camera.getPicture(onPhotoDataSuccess, onFail, { targetWidth: 640,targetHeight: 480,
        // destinationType: destinationType.FILE_URI });
// }




// OFFLINE
function onPhotoDataSuccessOffline(imageData) {
	var ImageId = Math.floor((Math.random() * 10000) + 1);
	var FileName=imageData.substr(imageData.lastIndexOf('/') + 1);
	var path="https://sedarspine.s3.amazonaws.com/LOGI/"+FileName;
	$globalV.parents('.imageDisplay').find('#Imagecount').append('<div id="RemoveImg" class="form-group '+ImageId+'"><span onclick="DeleteImgServe($(this),'+ImageId+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+path+'" data-desc="otherImage" data-mode="add" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="add"><input type="hidden" name="size[]" ></div>');
	document.getElementById("imageValid").setAttribute('value',"Test");
	getPhotoSize(imageData,ImageId);
}


//Browse image OFFLINE
function getPhotoDataSuccessOffline(imageData) {
	
	var ImageId = Math.floor((Math.random() * 10000) + 1);
	var NameImage = Math.floor((Math.random() * 10000000000) + 1)+".jpg";
	var path = "https://sedarspine.s3.amazonaws.com/LOGI/"+NameImage;
	$globalV.parents('.imageDisplay').find('#Imagecount').append('<div id="RemoveImg" class="form-group '+ImageId+'"><span onclick="DeleteImgServe($(this),'+ImageId+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+path+'" data-desc="otherImage" data-mode="add" data-imgType="Browse" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="add"><input type="hidden" name="size[]" ></div>');
	document.getElementById("imageValid").setAttribute('value',"Test");
	getPhotoSize(imageData,ImageId);
}

//ONLINE 
function onPhotoDataSuccessOnline(imageData) {
	//$globalV.parents('.imageDisplay').find('#Imagecount').append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="add"></div>');
	
	var FileName=imageData.substr(imageData.lastIndexOf('/') + 1);
	var path="https://sedarspine.s3.amazonaws.com/LOGI/"+FileName;
	var ImageId = Math.floor((Math.random() * 10000) + 1);
	$globalV.parents('.imageDisplay').find('#Imagecount').append('<div id="RemoveImg" class="form-group '+ImageId+'"><span onclick="DeleteImgServe($(this),'+ImageId+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+path+'" data-desc="otherImage" data-mode="add" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="add"><input type="hidden" name="size[]" ></div>');
	document.getElementById("imageValid").setAttribute('value',"Test");
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";
	var params = new Object();
	options.params = params;
	options.chunkedMode = false;
	var ft = new FileTransfer();
	ft.upload(imageData, "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionLines_UploadImage", win, fail, options, false);
	
	getPhotoSize(imageData,ImageId);
}



//Browse image ONLINE 
function getPhotoDataSuccessOnline(imageData) {
	//$globalV.parents('.imageDisplay').find('#Imagecount').append('<div id="RemoveImg" class="form-group"><span onclick="DeleteImg($(this))" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="add"></div>');
	
	var NameImage = Math.floor((Math.random() * 10000000000) + 1)+".jpg";
	var path = "https://sedarspine.s3.amazonaws.com/LOGI/"+NameImage;
	//var path="https://sedarspine.s3.amazonaws.com/LOGI/"+FileName;
	var ImageId = Math.floor((Math.random() * 10000) + 1);
	$globalV.parents('.imageDisplay').find('#Imagecount').append('<div id="RemoveImg" class="form-group '+ImageId+'"><span onclick="DeleteImgServe($(this),'+ImageId+')" class="close glyphicon glyphicon-trash"></span><img id="imgProfile" name="imgProfile[]" src="'+imageData+'" data-src="'+path+'" data-desc="otherImage" data-mode="add" data-imgType="Browse" style="width:50%;height:50%"><input type="hidden" name="mode[]" value="add"><input type="hidden" name="size[]" ></div>');
	document.getElementById("imageValid").setAttribute('value',"Test");
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = NameImage;
	options.mimeType = "image/jpeg";
	var params = new Object();
	options.params = params;
	options.chunkedMode = false;
	var ft = new FileTransfer();
	ft.upload(imageData, "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionLines_UploadImage", win, fail, options, false);
	
	getPhotoSize(imageData,ImageId);
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

function getPhotoSize(imageUri,ImageId) {
	window.resolveLocalFileSystemURI(imageUri, function(fileEntry) {
        fileEntry.file(function(fileObj) {
            var sizeInMB = (fileObj.size/1024).toFixed(2)+"KB";
			//alert(sizeInMB);
			$globalV.parents('.imageDisplay').find('.'+ImageId+'').find('#imgProfile').attr('data-val',sizeInMB);
			$globalV.parents('.imageDisplay').find('.'+ImageId+'').find('[name="size[]"]').attr('value',sizeInMB);
        });
    });
}

// Called if something bad happens.
// 
function captureError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

function onFail(message) {
  //alert('Failed because: ' + message);
}

function DeleteImg($this){
	$this.parents('.imageDisplay').find('#RemoveImg').remove();
};
function DeleteImgServe($this,$id){
	bootbox.confirm("Are you sure you want to delete?", function(confirmed){
		if (confirmed) {
			var CheckMode = localStorage.getItem("LiveMode");
			var USER_ID = localStorage.getItem("user_id");
			var USER_COMP_CODE = localStorage.getItem("USER_COMP_CODE");
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
				var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
				db.transaction(deleteImage, errorCB);
				function deleteImage(tx){
					if(localStorage.getItem("ImgModeCheck")=="live_edit"){
						tx.executeSql('DELETE FROM SelectedImageDataValue WHERE ML_SYS_ID=?', [$id], function (tx, results) {});
						$this.parents('.imageDisplay').find('div#Imagecount').find('.'+$id+'').remove();
					}else if(localStorage.getItem("ImgModeCheck")=="live_edit_local"){
						tx.executeSql('DELETE FROM LIVE_LOGI_T_MEASURE_IMAGE WHERE ML_SYS_ID=?', [$id], function (tx, results) {});
						$this.parents('.imageDisplay').find('div#Imagecount').find('.'+$id+'').remove();
					}else{
						tx.executeSql('DELETE FROM LOGI_T_MEASURE_IMAGE WHERE ML_SYS_ID=?', [$id], function (tx, results) {});
						$this.parents('.imageDisplay').find('div#Imagecount').find('.'+$id+'').remove();
					}
				}
				function errorCB(tx, err){
					//alert("Error");
					//alert("Error processing SQL: "+err);
				}
			}else{
				if(CheckMode=="live_edit_mode"){
					$.ajax({
						type: "POST",
						url: "http://test.sedarspine.com/en/spineLogisticsApp/MeasurementTransactionImage_Delete",
						data :  {USER_COMP_CODE:USER_COMP_CODE,imgId:$id,USER_ID:USER_ID},
						dataType: "json",
						success: function (json) {
							//alert("success");
							$this.parents('.imageDisplay').find('div#Imagecount').find('.'+$id+'').remove();
						},error: function (xhr, ajaxOptions, thrownError) {
							//alert("Error");
							//alert(xhr);alert(ajaxOptions);alert(thrownError);
						}
					});
				}
			}
		}
	});
};