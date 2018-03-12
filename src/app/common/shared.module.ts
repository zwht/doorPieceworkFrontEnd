// 公共模块
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CropperImgComponent} from './components/cropper-img/cropper-img.component';
import {ZwHttpInterceptor} from './service/ZwHttpInterceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpServer} from './service/HttpServer';
import {DateSet} from './service/DateSet';
import {SetCodeService} from './service/set-code.service';
import {EssenceNg2PrintModule} from "essence-ng2-print";
import { TicketStatePipe } from './pipe/ticket-state.pipe';
import {CodeService} from './restService/CodeService';
import { CodeNamePipe } from './pipe/code-name.pipe';
import {NgZorroAntdModule, NzModalModule} from 'ng-zorro-antd';
import { CropperImgModalComponent } from './components/cropper-img-modal/cropper-img-modal.component'

@NgModule({
  imports: [
	  NgZorroAntdModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [CropperImgComponent, TicketStatePipe, CodeNamePipe, CropperImgModalComponent],
  exports: [
  	CropperImgComponent,
	  EssenceNg2PrintModule,
	  TicketStatePipe,
	  CodeNamePipe,
	  CropperImgModalComponent
  ],
  providers: [
    DateSet,
	  SetCodeService,
	  CodeService,
    HttpServer,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ZwHttpInterceptor,
      multi: true,
    }
  ],
	entryComponents: [
		CropperImgModalComponent
	]
})
export class SharedModule {
}
