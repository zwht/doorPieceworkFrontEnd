import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginVo} from '../../../common/class/LoginVo';
import {AuthService} from '../../../common/restService/AuthService';
import {CorporationService} from '../../../common/restService/CorporationService';
import {Md5} from "ts-md5/dist/md5";
import {SetCodeService} from '../../../common/service/set-code.service';
import {NzMessageService} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [AuthService,CorporationService,SetCodeService]
})

export class LoginComponent implements OnInit {
	validateForm: FormGroup;
  loading=false;
  login = new LoginVo();
  roles = '';
  logoImg = localStorage.getItem('logoUrl')||'./assets/images/logo/logo.png';

  constructor(private router: Router,
              private corporationService:CorporationService,
              private message: NzMessageService,
              private authService: AuthService,
              private fb:FormBuilder) {
  }

  ngOnInit() {
	  this.validateForm = this.fb.group({
		  userName: [ null, [ Validators.required ] ],
		  password: [ null, [ Validators.required ] ],
		  remember: [ true ],
	  });
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
	_login() {
		for (const i in this.validateForm.controls) {
			this.validateForm.controls[ i ].markAsDirty();
		}
		if(this.validateForm.valid){
			this.loading=true;
			this.authService['login']({data: {
					password:Md5.hashStr(this.validateForm.value.password).toString(),
					loginName:this.validateForm.value.userName
				}})
				.then(response => {
					const rep = (response as any);
					this.roles=rep.data.roles;
					if (rep.code === 200) {
						localStorage.setItem('loginName', rep.data.loginName);
						localStorage.setItem('userName', rep.data.name);
						localStorage.setItem('userId', rep.data.id);
						localStorage.setItem('token', rep.data.token);
						localStorage.setItem('roles', response.data.roles);
						localStorage.removeItem('logoUrl');
						if(rep.data.corporationId){
							this.getCorporationById(rep.data.corporationId)
						}else{
							this.go()
						}
					} else {
						this.loading=false;
					}

				})
				.catch(err => {
					this.loading=false;
				});
		}
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
        this.router.navigateByUrl('/admin/work/dealers');

        break;
      case '4':
        //this.router.navigateByUrl('/admin/user/company');
        break;
    }
  }
}
