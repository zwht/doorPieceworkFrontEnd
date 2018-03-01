import {Component, OnInit} from '@angular/core';
import {CorporationService} from '../../common/restService/CorporationService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-corporation-list',
  templateUrl: './corporation-list.component.html',
  styleUrls: ['./corporation-list.component.css'],
  providers: [CorporationService]
})
export class CorporationListComponent implements OnInit {
  list = [];
  total = 0;
  pageNum = 1;
  loading = false;

  constructor(private corporationService: CorporationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    (this.corporationService as any).list({
      params: {
        params2: this.pageNum,
        params3: 10
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

  updateState(item, k) {
    (this.corporationService as any).updateState({
      data: {
        id: item.id,
        state: k
      }
    })
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
