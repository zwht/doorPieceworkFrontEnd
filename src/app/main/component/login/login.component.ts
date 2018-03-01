import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginVo} from '../../../common/class/LoginVo';
import {AuthService} from '../../../common/restService/AuthService';
import {CorporationService} from '../../../common/restService/CorporationService';
import {Md5} from "ts-md5/dist/md5";
import { ElMessageService } from 'element-angular'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [AuthService,CorporationService]
})

export class LoginComponent implements OnInit {
  loading=false;
  login = new LoginVo();
  roles = '';
  logoImg = localStorage.getItem('logoUrl')||'./assets/images/logo/logo.png';

  constructor(private router: Router,
              private corporationService:CorporationService,
              private message: ElMessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    /**const that=this;
    $(document).unbind("keyup");
    $(document).keyup(function(event){
      if(event.keyCode ==13&&that.router.url==='/'){
        that.onLogin()
      }
    });**/
  }

  getCorporationById(id) {
    (this.corporationService as any).getById({params: {id: id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          if(rep.data.img) localStorage.setItem('logoUrl', rep.data.img);
          setTimeout(()=>{
            this.go();
          },10);

        } else {
        }
      });
  }
  onLogin() {
    this.loading=true;
    this.authService['login']({data: {
      password:Md5.hashStr(this.login.password).toString(),
      loginName:this.login.loginName
    }})
      .then(response => {
        const rep = (response as any);
        this.roles=rep.data.roles;
        if (rep.code === 200) {
          localStorage.setItem('loginName', rep.data.loginName);
          localStorage.setItem('userName', rep.data.name);
          localStorage.setItem('token', rep.data.token);
          localStorage.setItem('roles', response.data.roles);
          localStorage.removeItem('logoUrl');
          if(rep.data.corporationId){
            this.getCorporationById(rep.data.corporationId)
          }else{
            this.go()
          }
        } else {

        }
        this.loading=false;
      })
      .catch(err => {
        this.loading=false;
      });
  }

  go(){
    switch (this.roles){
      case '0':
        this.router.navigateByUrl('/admin/user/company');
        break;
      case '1':
        this.router.navigateByUrl('/admin/work/ticket');
        break;
      case '2':
        this.router.navigateByUrl('/admin/work/ticket');
        break;
      case '3':
        //this.router.navigateByUrl('/admin/user/company');
        break;
      case '4':
        //this.router.navigateByUrl('/admin/user/company');
        break;
    }
  }
}
