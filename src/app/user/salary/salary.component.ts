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
  search={
    startTime:(new Date()).getTime()-86400000*30,
    endTime:(new Date()).getTime(),
  };
  startTime=this.search.startTime;
  endTime=this.search.endTime;
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
    this.startTime=this.dateSet.getDate1(this.search.startTime);
    this.endTime=this.dateSet.getDate1(this.search.endTime)+86400000;
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
