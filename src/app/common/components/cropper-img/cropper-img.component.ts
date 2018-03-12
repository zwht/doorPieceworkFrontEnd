import {Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';

import {FileService} from '../../restService/FileService';
import {NzModalService} from "ng-zorro-antd";
import {CropperImgModalComponent} from '../cropper-img-modal/cropper-img-modal.component'

@Component({
	selector: 'app-cropper-img',
	templateUrl: './cropper-img.component.html',
	styleUrls: ['./cropper-img.component.less'],
	providers: [FileService]
})
export class CropperImgComponent implements OnInit {

	loading = false;
	dialog = false;
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


	constructor(private fileService: FileService,
	            private nzModalService: NzModalService) {

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

		// Import image
		const URL = window.URL;

		if (URL) {
			const that = this;
			this.inputImage.nativeElement.onchange = function () {
				const files = that.inputImage.nativeElement.files;
				let file;


				if (files && files.length) {
					that.dialog = true;
					file = files[0];
					if (/^image\/\w+/.test(file.type)) {
						that.showModalForComponent(URL.createObjectURL(file));
						//(that.cropper  as any).reset().replace(blobURL);
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

	save(cropper) {
		this.loading = true;
		const result = cropper['getCroppedCanvas']({width: this.boxStyle.width, height: this.boxStyle.height});
		const fileImg = result.toDataURL('image/jpg');
		(this.fileService as any).upToken({}, {})
			.then(response => {
				if (response.code === 200) {
					this.putb64(fileImg, response.data);
				}
			});
	}

	showModalForComponent(blobURL) {
		const subscription = this.nzModalService.open({
			title: '对话框标题',
			content: CropperImgModalComponent,
			onOk() {
			},
			onCancel() {
				console.log('Click cancel');
			},
			footer: false,
			componentParams: {
				blobURL: blobURL,
				boxStyle: this.boxStyle
			}
		});
		subscription.subscribe(result => {
			if (result!='onShown'&&result.getCroppedCanvas) this.save(result)
		})
	}


}
