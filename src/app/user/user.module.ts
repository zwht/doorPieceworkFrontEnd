import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserRoutes, UserComponents} from './user.routes';
import { ElModule } from 'element-angular';
import { SharedModule } from '../common/shared.module';


@NgModule({
  imports: [
    ElModule.forRoot(),
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
