import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { FormsModule } from '@angular/forms';
import {OtherRoutes, OtherComponents} from './other.routes';
import { SharedModule } from '../common/shared.module';

@NgModule({
  imports: [
    ElModule.forRoot(),
    SharedModule,
    CommonModule,
    OtherRoutes,
    FormsModule
  ],
  declarations: OtherComponents,
  providers: [],
})
export class OtherModule { }
