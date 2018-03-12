import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserRoutes, UserComponents} from './user.routes';
import { SharedModule } from '../common/shared.module';
import {NgZorroAntdModule} from "ng-zorro-antd";


@NgModule({
  imports: [
	  NgZorroAntdModule,
    FormsModule,
    CommonModule,
    UserRoutes,
    SharedModule
  ],
  providers: [],
  declarations: UserComponents
})
export class UserModule {
}
