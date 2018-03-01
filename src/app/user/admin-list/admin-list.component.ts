import {Component, OnInit} from '@angular/core';
import {UserService} from '../../common/restService/UserService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.less'],
  providers: [UserService]
})
export class AdminListComponent implements OnInit {
  list = [];
  total = 0;
  pageNum = 1;
  loading = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  add(item) {
    this.router.navigate(['/admin/user/admin/add'], {queryParams: {id: item ? item.id : ''}});
  }

  getList() {
    this.loading = true;
    (this.userService as any).list({
      params: {
        params2: this.pageNum,
        params3: 10
      },
      data:{
        roles:2
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
