import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TicketService} from '../../common/restService/TicketService';
import {UserService} from '../../common/restService/UserService';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  providers: [TicketService,UserService]
})
export class TicketListComponent implements OnInit {
  delId='';
  toggle=false;
  loading = false;
  list = [];
  userList= {};
  total = 0;
  pageNum = 1;

  constructor(private ticketService: TicketService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUser()

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
        params3: 10
      }
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
    this.toggle=true;
  }
  print(item){
    this.router.navigate(['/admin/work/ticket/print'], {queryParams: {id: item.id}});
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
        this.toggle=false;
      });
  }

}
