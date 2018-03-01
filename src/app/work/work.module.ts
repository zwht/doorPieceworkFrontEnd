import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { FormsModule } from '@angular/forms';
import {WorkRoutes, WorkComponents} from './work.routes';
import { SharedModule } from '../common/shared.module';

@NgModule({
  imports: [
    ElModule.forRoot(),
    SharedModule,
    CommonModule,
    WorkRoutes,
    FormsModule
  ],
  declarations: WorkComponents,
  providers: [],
})
export class WorkModule { }
