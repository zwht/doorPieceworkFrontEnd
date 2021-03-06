import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CorporationListComponent} from './corporation-list/corporation-list.component';
import {CorporationAddComponent} from './corporation-add/corporation-add.component';
import {ListComponent} from './user-list/list.component';
import {AddComponent} from './user-add/add.component';
import {SalaryComponent} from './salary/salary.component';
import {DealersListComponent} from './dealers-list/dealers-list.component';
import {DealersAddComponent} from './dealers-add/dealers-add.component';
import {SellListComponent} from './sell-list/sell-list.component';
import {SellAddComponent} from './sell-add/sell-add.component';
import {AdminListComponent} from './admin-list/admin-list.component';
import {AdminAddComponent} from './admin-add/admin-add.component';
import {DetailComponent} from './detail/detail.component';
export const routes: Routes = [
  {
    path: '',
    data: {
      name: '用户管理'
    },
    children: [
      {
        path: 'company',
        component: CorporationListComponent,
        data: {
          name: '企业列表',
          type: [0],
          menu: true
        }
      },
      {
        path: 'detail',
        component: DetailComponent,
        data: {
          name: '个人中心',
	        type: [0,1]
        }
      },
      {
        path: 'company/add',
        component: CorporationAddComponent,
        data: {
          name: '添加企业',
	        type: [0,1]
        }
      },
      {
        path: 'admin',
        component: AdminListComponent,
        data: {
          name: '管理员管理',
	        type: [0,1],
          menu: true
        }
      },
      {
        path: 'admin/add',
        component: AdminAddComponent,
        data: {
          name: '添加管理员用户',
	        type: [0,1]
        }
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          name: '员工管理',
	        type: [0,1],
          menu: true
        }
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          name: '添加用户',
	        type: [0,1]
        }
      },
      {
        path: 'dealers',
        component: DealersListComponent,
        data: {
          name: '经销商管理',
	        type: [0,1],
          menu: true
        }
      },
      {
        path: 'dealers/add',
        component: DealersAddComponent,
        data: {
          name: '添加经销商用户',
	        type: [0,1]
        }
      },
	    {
		    path: 'sell',
		    component: SellListComponent,
		    data: {
			    name: '销售列表',
			    type: [0,1],
			    menu: true
		    }
	    },
	    {
		    path: 'sell/add',
		    component: SellAddComponent,
		    data: {
			    name: '添加销售',
			    type: [0,1]
		    }
	    },

      {
        path: 'salary',
        component: SalaryComponent,
        data: {
          name: '工资计算',
	        type: [0,1],
          menu: true
        }

      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutes {
}

export const UserComponents = [
	SellAddComponent,
	SellListComponent,
  DetailComponent,
  AdminListComponent,
  AdminAddComponent,
  DealersAddComponent,
  DealersListComponent,
  CorporationListComponent,
  CorporationAddComponent,
  ListComponent,
  AddComponent,
  SalaryComponent
];
export const UserList = routes;
