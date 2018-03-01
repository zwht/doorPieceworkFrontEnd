import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GxService} from '../../common/restService/GxService';
@Component({
  selector: 'app-gx-list',
  templateUrl: './gx-list.component.html',
  styleUrls: ['./gx-list.component.css'],
  providers: [GxService]
})
export class GxListComponent implements OnInit {
  loading = false;
  list = [];
  total = 0;
  pageNum = 1;
  pageSize =10;

  constructor(private gxService: GxService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    (this.gxService as any).list({
      params: {
        params2: this.pageNum,
        params3: this.pageSize
      }
    }, {})
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
    this.router.navigate(['/admin/product/gx/add'], {queryParams: {id: item ? item.id : ''}});
  }

  del(id) {
    (this.gxService as any).del({params: {id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.getList();
        } else {
          console.log(response);
        }
      });
  }

}
