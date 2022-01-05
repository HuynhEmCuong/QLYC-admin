import { environment } from "src/environments/environment";

declare var $: any;
declare var Cropper: any;
const api = environment.apiUrl;
export function InitCrop(pathFolder, BEARER_TOKEN,callback) {

  var $image = $('#image');
  var $inputImage = $('.input-crop');
  var $modalUpload = $("#modal-upload");
  var $imgPreview  =$("#img-preview");
  var $lightboxPreview =$(".lightbox-preview");
   var l = $("#crop").ladda();
  var uploadedImageName;
  var uploadedImageType;
  var options = {
      autoCropArea: 1,
      restore: true,
      guides: true,
      center: true,
      highlight: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      dragMode: "move",
      toggleDragModeOnDblclick: false,
      minContainerWidth: 270,
      minContainerHeight: 200,
        responsive:true,
        minCanvasWidth:200
  };
  var uploadedImageURL;
  var typeImage;

  // Cropper
  $image.cropper(options);

      $inputImage.change(function () {
          var files = this.files;
          var file;

          if (!$image.data('cropper')) {
              return;
          }

          if (files && files.length) {
              file = files[0];
              typeImage = file.type.split("/")[1]
              if (/^image\/\w+$/.test(file.type)) {
                  uploadedImageName = file.name;
                  uploadedImageType = file.type;

                  if (uploadedImageURL) {
                      URL.revokeObjectURL(uploadedImageURL);
                  }

                  uploadedImageURL = URL.createObjectURL(file);

                  $("#modal-upload").modal('show');
                  $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);

              } else {
                  window.alert('Vui lòng chọn file hình ảnh');
              }
          }
      });


  //wating load img preview
  var imgPreview:any = document.getElementById('img-preview')

  function loaded() {
      $(".main-overlay").hide();
  }
  if (imgPreview.complete) {
      loaded()
  } else {
      imgPreview.addEventListener('load', loaded)
      imgPreview.addEventListener('error', function () {
          console.log('img error')
      })
  }
  // Methods crop
  $('#crop').on('click', function () {
     l.ladda("start");
      let folder = $(this).data("folder");
      $image.cropper('getCroppedCanvas').toBlob(function (blob) {


          //Render filename
          var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
          });


          //Upload file
          let sizeDefine = [
              { folder: "Lg", size: 750 }
            ];

          for (var i = 0; i < sizeDefine.length; i++) {
              resizeImage({
                  file: blob,
                  maxSize: sizeDefine[i].size,
                  folder: sizeDefine[i].folder
              }).then(function (resizedImage ) {
               let result = resizedImage as any;
                  var formData = new FormData();
                  formData.append("file", result.blob, guid + "." + typeImage);
                  _send(folder, formData, result.folder);
              }).catch(function (err) {
                  console.error(err);
              });
          }

      });
  });

  var resizeImage = function (settings) {
      var file = settings.file;
      var maxSize = settings.maxSize;
      var reader = new FileReader();
      var image:any = new Image();
      var canvas = document.createElement('canvas');
      var dataURItoBlob = function (dataURI) {
          var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
              atob(dataURI.split(',')[1]) :
              unescape(dataURI.split(',')[1]);
          var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
          var max = bytes.length;
          var ia = new Uint8Array(max);
          for (var i = 0; i < max; i++)
              ia[i] = bytes.charCodeAt(i);
          return { blob: new Blob([ia], { type: mime }), folder: settings.folder };
      };
      var resize = function () {
          var width = image.width;
          var height = image.height;
          if (maxSize) {
              if (width > height) {
                  if (width > maxSize) {
                      height *= maxSize / width;
                      width = maxSize;
                  }
              } else {
                  if (height > maxSize) {
                      width *= maxSize / height;
                      height = maxSize;
                  }
              }
          }

          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/jpeg');
          return dataURItoBlob(dataUrl);
      };
      return new Promise(function (ok, no) {
          if (!file.type.match(/image.*/)) {
              no(new Error("Not an image"));
              return;
          }
          reader.onload = function (readerEvent) {
            let res = readerEvent as any;
              image.onload = function () { return ok(resize()); };
              image.src = res.target.result;
          };
          reader.readAsDataURL(file);
      });
  };
  //Send image to server
  var _send = function (folder, formDataResize, folderSize) {
      $.ajax(api + '/File/UploadFile?pathFolder=' + folder + "&folderSize=" + folderSize, {
          method: "POST",
          data: formDataResize,
          processData: false,
          contentType: false,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization','Bearer '+ BEARER_TOKEN);
        },
          success: function (res) {
              callback(res.FileResponse.FileFullPath);
              l.ladda("stop");
              $imgPreview.attr("src", environment.apiUrl+"/" + res.FileResponse.FileFullPath);
              $lightboxPreview.attr("href",  environment.apiUrl +"/" +  res.FileResponse.FileFullPath);
              $modalUpload.modal('hide');
          },
          error: function () {
              l.ladda("stop");
              throw "Lỗi tải lên hình ảnh! Vui lòng thử lại.";
          }
      });
  }

  $(".file-upload-thumb-remove").click(function () {
    var parent = $(this).closest(".file-upload-container");
    parent.find(".file-upload-control").val("");
    parent.find(".result-crop-thumb").val("");
    parent.find("#HiddenField_Avatar").val("/assets/images/noimage.png");
    parent.find(".lightbox-preview").attr("href", "/assets/images/noimage.png");
    parent
      .find("[class*='file-upload-preview']")
      .attr("src", "/assets/images/noimage.png");
    parent.find(".full-file-url").val("");
  });

  $modalUpload.on('hide.bs.modal', function () {
    $inputImage.val("");
  })

   //Range
   let range = $('#range-zoom').slider();
   range.change(function (res) {
       if ($image.attr('src') != null) {
           let oldValue = res.value.oldValue;
           let newValue = res.value.newValue;
           if (newValue > oldValue) {
               $image.cropper('zoom', 0.1);
           }
           else {
               $image.cropper('zoom', -0.1);
           }
       }
   })

   $("#select-file").click(function () {
       $("#select-file-hide").click();
   })
}
