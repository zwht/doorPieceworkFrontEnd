import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TicketListComponent} from './ticket-list/ticket-list.component';
import {TicketAddComponent} from './ticket-add/ticket-add.component';
import {TicketPrintComponent} from './ticket-print/ticket-print.component';
import {TicketAddDealersComponent} from './ticket-add-dealers/ticket-add-dealers.component';
import {TicketListDealersComponent} from './ticket-list-dealers/ticket-list-dealers.component';



const routes: Routes = [
  {
    path: '',
    data: {
      name: '工单管理'
    },
    children: [
      {
        path: 'ticket',
        component: TicketListComponent,
        data: {
          name: '新订单',
	        type: [0,1,2],
          menu: true
        }
      },
	    {
		    path: 'ticket/production',
		    component: TicketListComponent,
		    data: {
			    name: '生产中订单',
			    type: [0,1,2],
			    menu: true
		    }
	    },
      {
        path: 'ticket/add',
        component: TicketAddComponent,
        data: {
          name: '添加',
	        type: [0,1,2],
        }
      },
	    {
		    path: 'dealers',
		    component: TicketListDealersComponent,
		    data: {
			    name: '未提交订单',
			    type: [0,3],
			    menu: true
		    }
	    },
	    {
		    path: 'dealers/add',
		    component: TicketAddDealersComponent,
		    data: {
			    name: '添加',
			    type: [0,3],
		    }
	    },
	    {
		    path: 'dealers/submit',
		    component: TicketListDealersComponent,
		    data: {
			    name: '已提交订单',
			    type: [0,3],
			    menu: true
		    }
	    },
	    {
		    path: 'dealers/finish',
		    component: TicketListDealersComponent,
		    data: {
			    name: '已完成订单',
			    type: [0,3],
			    menu: true
		    }
	    },
      {
        path: 'ticket/print',
        component: TicketPrintComponent,
        data: {
          name: '打印'
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

export class WorkRoutes {
}
export const WorkComponents = [TicketListDealersComponent,TicketAddDealersComponent,TicketPrintComponent,TicketListComponent, TicketAddComponent];
export const WorkList = routes;
