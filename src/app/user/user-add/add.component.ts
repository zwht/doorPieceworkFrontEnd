import {Component, OnInit} from '@angular/core';
import {UserService} from '../../common/restService/UserService';
import {GxService} from '../../common/restService/GxService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Md5} from "ts-md5/dist/md5";
import {NzMessageService} from "ng-zorro-antd";
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, GxService]
})
export class AddComponent implements OnInit {
  title='';
  gxList = [];
  user = {
    id: null,
    name: null,
    password: null,
    phone: null,
    loginName: null,
    type: '',
    roles: 4,
    state: 1,
    address: null
  };

  constructor(private userService: UserService,
              private gxService: GxService,
              private router: Router,
              private message: NzMessageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.user.id = params['id'];
      if (this.user.id) {
        this.getById();
      }

    });

    this.getGxList();
  }

  getById() {
    (this.userService as any).getById({params: {id: this.user.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.user = rep.data;
        } else {
        }
      });
  }

  getGxList() {
    (this.gxService as any).list({
      params: {
        params2: 1,
        params3: 1000
      }
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.gxList = response.data.data;
        } else {
          console.log(response);
        }
      });
  }

  save() {
    let user=JSON.parse(JSON.stringify(this.user));
    user.password=Md5.hashStr(this.user.password);
    if (user.id) {
      user.password=null;
      (this.userService as any).update({data: user})
        .then(response => {
          const rep = (response as any);
          if (rep.code == 200) {
            this.message.success(rep.data);
            window.history.back()
          } else {
            this.message.error(rep.message);
          }
        });
    } else {
      (this.userService as any).add({data: user})
        .then(response => {
          const rep = (response as any);
          if (rep.code == 200) {
            this.message.success(rep.data);
            window.history.back()
          } else {
            this.message.error(rep.message);
          }
        });
    }
  }


}
