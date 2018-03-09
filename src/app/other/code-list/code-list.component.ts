import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CodeService} from '../../common/restService/CodeService';
@Component({
	selector: 'app-code-list',
	templateUrl: './code-list.component.html',
	styleUrls: ['./code-list.component.less'],
	providers: [CodeService]
})
export class CodeListComponent implements OnInit {
	list = [];
	total = 0;
	pageNum = 1;
	pageSize =10;
	loading = false;

	constructor(private codeService: CodeService,
	            private router: Router) {
	}

	ngOnInit() {
		this.getList();
	}

	getList() {
		this.loading = true;
		(this.codeService as any).list({
			params: {
				params2: this.pageNum,
				params3: this.pageSize
			}
		})
			.then(response => {
				//this.loading = false;
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
		this.router.navigate(['/admin/other/code/add'], {queryParams: {id: item ? item.id : ''}});
	}

	del(id) {
		(this.codeService as any).del({params: {id}})
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
