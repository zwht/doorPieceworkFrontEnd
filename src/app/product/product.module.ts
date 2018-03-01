import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductRoutes, ProductComponents} from './product.routes';
import {ElModule} from 'element-angular';
import { SharedModule } from '../common/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ElModule.forRoot(),
    FormsModule,
    CommonModule,
    ProductRoutes
  ],
  providers: [],
  declarations: ProductComponents
})
export class ProductModule {
}
