import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TicketService} from '../../common/restService/TicketService';
import {UserService} from '../../common/restService/UserService';

@Component({
	selector: 'app-ticket-list-dealers',
	templateUrl: './ticket-list-dealers.component.html',
	styleUrls: ['./ticket-list-dealers.component.less'],
	providers: [TicketService, UserService]
})
export class TicketListDealersComponent implements OnInit {
	delId = '';
	toggle = false;
	loading = false;
	list = [];
	userList = {};
	total = 0;
	pageNum = 1;
	pageSize =10;
	state = [];
	stateKey=1;

	constructor(private ticketService: TicketService,
	            private userService: UserService,
	            private router: Router) {
	}

	ngOnInit() {
		switch (this.router.url) {
			case '/admin/work/dealers':
				this.state = [200];
				this.stateKey=1;
				break;
			case '/admin/work/dealers/submit':
				this.state = [210,220,230,800,810,820];
				this.stateKey=2;
				break;
			case '/admin/work/dealers/finish':
				this.state = [830];
				this.stateKey=3;
				break;
		}
		this.getUser()

	}

	submit(id) {
		this.ticketService['updateState']({params: {id: id, state: 210}})
			.then(response => {
				this.getList();
			})
	}

	getUser() {
		this.loading = true;
		(this.userService as any).list({
			params: {
				params2: this.pageNum,
				params3: 1000
			},
			data: {
				roles: 3
			}
		})
			.then(response => {
				this.loading = false;
				const rep = (response as any);
				if (rep.code === 200) {
					response.data.data.forEach(item => {
						this.userList[item.id] = item.name;
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
			data: {state: this.state}
		})
			.then(response => {
				this.loading = false;
				const rep = (response as any);
				if (rep.code === 200) {
					response.data.data.sort((o, n) => {
						return o.state - n.state;
					});
					response.data.data.forEach(item => {
						if (this.userList[item.dealersId]) item.dealersId = this.userList[item.dealersId]
					});
					this.total = response.data.pageCount;
					this.list = response.data.data;
				} else {
					console.log(response);
				}
			});
	}

	add(item) {
		this.router.navigate(['/admin/work/dealers/add'], {queryParams: {id: item ? item.id : ''}});
	}

	del(id) {
		this.delId = id;
		this.toggle = true;
	}

	print(item) {
		this.router.navigate(['/admin/work/ticket/print'], {queryParams: {id: item.id}});
	}

	delQd() {
		(this.ticketService as any).del({params: {id: this.delId}})
			.then(response => {
				const rep = (response as any);
				if (rep.code === 200) {
					this.getList();
				} else {
					console.log(response);
				}
				this.toggle = false;
			});
	}

}
