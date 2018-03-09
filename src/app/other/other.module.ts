import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OtherRoutes, OtherComponents} from './other.routes';
import { SharedModule } from '../common/shared.module';
import {NgZorroAntdModule} from "ng-zorro-antd";

@NgModule({
  imports: [
	  NgZorroAntdModule,
    SharedModule,
    CommonModule,
    OtherRoutes,
    FormsModule
  ],
  declarations: OtherComponents,
  providers: [],
})
export class OtherModule { }
