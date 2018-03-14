import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TicketService} from '../../common/restService/TicketService';
import {UserService} from '../../common/restService/UserService';
import {SetCodeService} from "../../common/service/set-code.service";
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.less'],
  providers: [TicketService,UserService]
})
export class TicketListComponent implements OnInit {
  delId='';
  loading = false;
  list = [];
  userList= {};
  total = 0;
  pageNum = 1;
	state =[];
	stateKey=1;
	pageSize=10;

  constructor(private ticketService: TicketService,
              private userService: UserService,
              private router: Router,
              private setCodeService:SetCodeService) {
  }

  ngOnInit() {
	  switch (this.router.url) {
		  case '/admin/work/ticket':
			  this.state = [1005,1010];
			  this.stateKey=1;
			  break;
		  case '/admin/work/ticket/production':
			  this.state = [1015];
			  this.stateKey=2;
			  break;
		  case '/admin/work/ticket/productionOver':
			  this.state = [1050];
			  this.stateKey=3;
			  break;
		  case '/admin/work/ticket/finish':
			  this.state = [1065];
			  this.stateKey=4;
			  break;
		  case '/admin/work/ticket/all':
			  this.state = [1005,1010,1015,1050,1065];
			  this.stateKey=5;
			  break;
	  }
    this.getUser();
  }

  getUser() {
    this.loading = true;
    (this.userService as any).list({
      params: {
        params2: this.pageNum,
        params3: 1000
      },
      data:{
        roles:3
      }
    })
      .then(response => {
        this.loading = false;
        const rep = (response as any);
        if (rep.code === 200) {
          response.data.data.forEach(item=>{
            this.userList[item.id]=item.name;
          });
          this.getList();
        } else {
          console.log(response);
        }
      });
  }

  getList() {
    this.loading = true;
    (this.ticketService as any).list({
      params: {
        params2: this.pageNum,
        params3: this.pageSize
      },
	    data:{state:this.state}
    })
      .then(response => {
        this.loading = false;
        const rep = (response as any);
        if (rep.code === 200) {
          response.data.data.sort((o,n)=>{
            return o.state-n.state;
          });
          response.data.data.forEach(item=>{
            if(this.userList[item.dealersId]) item.dealersId=this.userList[item.dealersId]
          });
          this.total = response.data.pageCount;
          this.list = response.data.data;
        } else {
          console.log(response);
        }
      });
  }

  add(item) {
    this.router.navigate(['/admin/work/ticket/add'], {queryParams: {id: item ? item.id : ''}});
  }

  del(id) {
    this.delId=id;
  }
  print(item){
    this.router.navigate(['/admin/work/ticket/print'], {queryParams: {id: item.id}});
  }
	see(item){
		this.router.navigate(['/admin/work/ticket/see'], {queryParams: {id: item.id}});
	}
  delQd(){
    (this.ticketService as any).del({params: {id:this.delId}})
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
