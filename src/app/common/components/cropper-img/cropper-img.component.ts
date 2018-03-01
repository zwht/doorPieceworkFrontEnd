import {Component,Input, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import Cropper from 'cropperjs';
import {FileService} from '../../../common/restService/FileService';

@Component({
  selector: 'app-cropper-img',
  templateUrl: './cropper-img.component.html',
  styleUrls: ['./cropper-img.component.less'],
  providers: [FileService]
})
export class CropperImgComponent implements OnInit {

  loading = false;
  dialog = false;
  cropper = {};
  contentDialogStyle = {};

  @Input()
  boxStyle;
  @Input()
  cpImg;
  @ViewChild('image')
  image: ElementRef;
  @ViewChild('inputImage')
  inputImage: ElementRef;
  @ViewChild('cImg')
  cImg: ElementRef;
  @Output()
  saveEnd: EventEmitter<Object> = new EventEmitter();


  constructor(private fileService: FileService) {

  }

  ngOnInit() {
    if (this.boxStyle) {
      this.boxStyle.width = this.boxStyle.width ? this.boxStyle.width : 200;
      this.boxStyle.height = this.boxStyle.height ? this.boxStyle.height : 200;
    } else {
      this.boxStyle = {width: 200, height: 200};
    }
    this.contentDialogStyle = {width: this.boxStyle.width + 'px', height: this.boxStyle.height + 'px'};


    this.cropperInit();
  }

  cropperInit() {
    this.cropper = new Cropper(this.image.nativeElement, {
      viewMode: 3,
      aspectRatio: this.boxStyle.width / this.boxStyle.height,
      autoCropArea: 1,
      dragMode: 'move',
      cropBoxResizable: false,
      cropBoxMovable: false,
      crop: function (e) {
      }
    });
    // Import image
    const URL = window.URL;
    let blobURL;

    if (URL) {
      const that = this;
      this.inputImage.nativeElement.onchange = function () {
        const files = that.inputImage.nativeElement.files;
        let file;

        if (that.cropper && files && files.length) {
          that.dialog = true;
          file = files[0];

          if (/^image\/\w+/.test(file.type)) {
            blobURL = URL.createObjectURL(file);
            (that.cropper  as any).reset().replace(blobURL);
          } else {
            window.alert('Please choose an image file.');
          }
        }
        // $(inputImage).find('img').hide();
      };
    } else {
      // inputImage.disabled = true;
    }
  }

  showDialog() {
    this.inputImage.nativeElement.setAttribute('type', 'text');
    this.inputImage.nativeElement.setAttribute('type', 'file');
    this.inputImage.nativeElement.click();
  }

  putb64(fileImg, token) {

    const pic = fileImg.split(',')[1];
    const url = 'http://upload-z2.qiniu.com/putb64/-1';
    const xhr = new XMLHttpRequest();
    const that = this;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const obj = JSON.parse(xhr.response);
        if (obj.hash) {
          that.cpImg = obj.url = 'http://ozq3tirki.bkt.clouddn.com/' + obj.hash;
        }
        that.inputImage.nativeElement.files = null;
        that.saveEnd.emit(obj);
        that.dialog = false;
        that.loading = false;
        // http://ozq3tirki.bkt.clouddn.com/FhwDUd1ybmmc5TW0fQAgxzqGlS2R
      }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Authorization', 'UpToken ' + token);
    xhr.send(pic);
  }

  save() {
    // this.dialog = false;
    this.loading = true;
    const result = (this.cropper as any).getCroppedCanvas({width: this.boxStyle.width, height: this.boxStyle.height});
    const fileImg = result.toDataURL('image/jpg');
    /*this.cImg.nativeElement.src = fileImg;*/
    (this.fileService as any).upToken({}, {})
      .then(response => {
        if (response.code === 200) {
          this.putb64(fileImg, response.data);
        }
      });
  }


}
