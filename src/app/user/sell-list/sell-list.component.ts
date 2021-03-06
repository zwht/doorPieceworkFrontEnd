import {Component, OnInit} from '@angular/core';
import {UserService} from '../../common/restService/UserService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sell-list',
  templateUrl: './sell-list.component.html',
  styleUrls: ['./sell-list.component.less'],
  providers: [UserService]
})
export class SellListComponent implements OnInit {
  list = [];
  total = 0;
  pageNum = 1;
	pageSize =10;
  loading = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  add(item) {
    this.router.navigate(['/admin/user/sell/add'], {queryParams: {id: item ? item.id : ''}});
  }

  getList() {
    this.loading = true;
    (this.userService as any).list({
      params: {
        params2: this.pageNum,
        params3: this.pageSize
      },
      data:{
        roles:5
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

  del(id) {
    (this.userService as any).del({params: {id}})
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
