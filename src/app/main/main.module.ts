import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from '../common/shared.module';

import {AppComponent} from './component/app/app.component';
import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {MenuComponent} from './component/menu/menu.component';
import {NgZorroAntdModule} from "ng-zorro-antd";

@NgModule({
  declarations: [AppComponent,LoginComponent, NotFoundComponent, MenuComponent],
  imports: [
	  ReactiveFormsModule,
	  NgZorroAntdModule.forRoot(),
    BrowserModule,
    NoopAnimationsModule,
	  BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: MenuComponent,
        children: [
          {
            path: 'user',
            loadChildren: 'app/user/user.module#UserModule',
            data: {
              name: '用户管理',
              type: [0,1],
              menu: true
            }
          },
          {
            path: 'work',
            loadChildren: 'app/work/work.module#WorkModule',
            data: {
              name: '工单管理',
              type: [0,1,2,3],
              menu: true
            }
          },
          {
            path: 'product',
            loadChildren: 'app/product/product.module#ProductModule',
            data: {
              name: '产品管理',
              type: [0,1],
              menu: true
            }
          },
          {
            path: 'other',
            loadChildren: 'app/other/other.module#OtherModule',
            data: {name: '其他', menu: true}
          },
        ]
      },
      {
        path: '**',
        component: NotFoundComponent
      }

    ], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class MainModule {
}
