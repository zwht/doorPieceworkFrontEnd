import { Component, OnInit } from '@angular/core';
import {UserService} from '../../common/restService/UserService';
import { ElMessageService } from 'element-angular'
import {Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  providers: [UserService]
})
export class DetailComponent implements OnInit {
  title='';
  data={
    loginName:'',
    name:'',
    id:''
  };
  user={
    newPassword:'',
    rPassword:'',
    password:''
  };
  constructor(
    private userService:UserService,
    private message: ElMessageService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService['detail']({})
      .then(response=>{
        this.data=response.data;
      })
  }
  save() {
    if(!this.user.password||!this.user.newPassword){
      this.message.error('请输入密码');
      return;
    }
    if(this.user.newPassword!=this.user.rPassword){
      this.message.error('两次密码不匹配');
      return;
    }
    this.userService['resetPassword']({data:{
      userId: this.data.id,
      oldPwd:Md5.hashStr(this.user.password),
      newPwd: Md5.hashStr(this.user.newPassword)
    }})
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
