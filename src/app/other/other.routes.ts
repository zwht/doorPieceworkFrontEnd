import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CodeListComponent} from './code-list/code-list.component';
import {CodeAddComponent} from './code-add/code-add.component';
const routes: Routes = [
  {
    path: '',
    data: {
      name: '其他'
    },
    children: [
	    {
		    path: 'code',
		    component: CodeListComponent,
		    data: {
			    name: '码管理',
			    menu: true
		    }
	    },
	    {
		    path: 'code/add',
		    component: CodeAddComponent,
		    data: {
			    name: '码添加'
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

export class OtherRoutes {
}
export const OtherComponents = [CodeAddComponent,CodeListComponent];
export const OtherList = routes;
