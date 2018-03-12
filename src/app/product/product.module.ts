import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductRoutes, ProductComponents} from './product.routes';
import { SharedModule } from '../common/shared.module';
import {NgZorroAntdModule} from "ng-zorro-antd";

@NgModule({
  imports: [
	  NgZorroAntdModule,
    SharedModule,
    FormsModule,
    CommonModule,
    ProductRoutes
  ],
  providers: [],
  declarations: ProductComponents
})
export class ProductModule {
}
