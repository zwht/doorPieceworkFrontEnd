import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ColorService} from '../../common/restService/ColorService';
@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.less'],
  providers: [ColorService]
})
export class ColorListComponent implements OnInit {
  list = [];
  total = 0;
  pageNum = 1;
  loading = false;

  constructor(private colorService: ColorService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    (this.colorService as any).list({
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
    this.router.navigate(['/admin/product/color/add'], {queryParams: {id: item ? item.id : ''}});
  }

  del(id) {
    (this.colorService as any).del({params: {id}})
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
