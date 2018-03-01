import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SalaryComponent} from './salary/salary.component';
const routes: Routes = [
  {
    path: '',
    data: {
      name: '其他'
    },
    children: [
      {
        path: 'salary',
        component: SalaryComponent,
        data: {
          name: '工资管理',
          menu: true
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
export const OtherComponents = [SalaryComponent];
export const OtherList = routes;
