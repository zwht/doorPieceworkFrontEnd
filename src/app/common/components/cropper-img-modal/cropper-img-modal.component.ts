import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NzModalSubject} from "ng-zorro-antd";
import Cropper from 'cropperjs';
@Component({
  selector: 'app-cropper-img-modal',
  templateUrl: './cropper-img-modal.component.html',
  styleUrls: ['./cropper-img-modal.component.less']
})
export class CropperImgModalComponent implements OnInit {

	blobURL: string;

	@ViewChild('image')
	image: ElementRef;

	@Input()
	boxStyle;
	@Input()
	blobURL;

	cropper: Cropper;

	emitDataOutside() {
		this.subject.next(this.cropper);
		this.handleCancel();
	}

	handleCancel() {
		this.subject.destroy('onCancel');
	}

	constructor(private subject: NzModalSubject) {
		this.subject.on('onDestory', () => {
		});
	}

	ngOnInit() {
		setTimeout(()=>{
			this.cropper= new Cropper(this.image.nativeElement, {
				viewMode: 3,
				//dragMode: 'move',
				aspectRatio: this.boxStyle.width / this.boxStyle.height,
				autoCropArea: 1,
				cropBoxResizable: false,
				cropBoxMovable: false,
				crop: function (e) {
				}
			});
			this.cropper.reset().replace(this.blobURL);
		},100);
	}

}
