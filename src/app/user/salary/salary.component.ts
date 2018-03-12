import { Component, OnInit } from '@angular/core';
import {ProcessService} from '../../common/restService/ProcessService';
import {Router} from '@angular/router';
import {DateSet} from '../../common/service/DateSet';
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.less'],
  providers: [ProcessService]
})
export class SalaryComponent implements OnInit {
  search=[(new Date()).getTime()-86400000*30,(new Date()).getTime()];

  startTime=this.search[0];
  endTime=this.search[1];
  list = [];
  total = 0;
  pageSize=20;
  pageNum = 1;
  loading = false;


  constructor(private processService: ProcessService,
              private router: Router,
              private dateSet: DateSet
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.startTime=this.dateSet.getDate1(this.search[0]);
    this.endTime=this.dateSet.getDate1(this.search[1])+86400000;
    (this.processService as any).salary({
      params: {
        params2: this.pageNum,
        params3: this.pageSize
      },
      data:{
        startTime:this.startTime,
        endTime:this.endTime
      }
    })
      .then(response => {
        this.loading = false;
        const rep = (response as any);
        if (rep.code === 200) {
          this.total = response.data.pageCount;
          this.list = response.data.data;
        } else {
          console.log(response);
        }
      });
  }

  add(item) {
    this.router.navigate(['/admin/user/company/add'], {queryParams: {id: item ? item.id : ''}});
  }


}
