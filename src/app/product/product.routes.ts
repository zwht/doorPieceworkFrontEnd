import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DoorComponent} from './door-list/door.component';
import {DoorAddComponent} from './door-add/door-add.component';
import {GxListComponent} from './gx-list/gx-list.component';
import {GxAddComponent} from './gx-add/gx-add.component';
import {ColorListComponent} from './color-list/color-list.component';
import {ColorAddComponent} from './color-add/color-add.component';
import {LineListComponent} from './line-list/line-list.component';
import {LineAddComponent} from './line-add/line-add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      name: '产品管理'
    },
    children: [
      {
        path: 'door',
        component: DoorComponent,
        data: {
          name: '门列表',
          menu: true
        }
      },
      {
        path: 'door/add',
        component: DoorAddComponent,
        data: {
          name: '添加'
        }
      },
      {
        path: 'color',
        component: ColorListComponent,
        data: {
          name: '颜色列表',
          menu: true
        }
      },
      {
        path: 'color/add',
        component: ColorAddComponent,
        data: {
          name: '添加'
        }
      },
      {
        path: 'line',
        component: LineListComponent,
        data: {
          name: '线条列表',
          menu: true
        }
      },
      {
        path: 'line/add',
        component: LineAddComponent,
        data: {
          name: '添加'
        }
      },
      {
        path: 'gx',
        component: GxListComponent,
        data: {
          name: '工序列表',
          menu: true
        }
      },
      {
        path: 'gx/add',
        component: GxAddComponent,
        data: {
          name: '添加'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ProductRoutes {
}
export const ProductComponents = [DoorComponent, DoorAddComponent, GxListComponent,
  GxAddComponent, ColorListComponent, ColorAddComponent, LineListComponent, LineAddComponent];
export const ProductList = routes;
