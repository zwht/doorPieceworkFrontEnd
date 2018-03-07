import {Component, OnInit} from '@angular/core';
import {CodeService} from '../../common/restService/CodeService';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
	selector: 'app-code-add',
	templateUrl: './code-add.component.html',
	styleUrls: ['./code-add.component.less'],
	providers: [CodeService]
})
export class CodeAddComponent implements OnInit {

	title='';
	code = {
		id: null,
		name: null,
		type: null,
		value: null
	};
	typeList=[
		"工单类型",
		"用户类型"
	];

	constructor(private codeService: CodeService,
	            private router: Router,
	            private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.code.id = params['id'];
			if (this.code.id) {
				this.getById();
			}

		});
	}

	getById() {
		(this.codeService as any).getById({params: {id: this.code.id}})
			.then(response => {
				const rep = (response as any);
				if (rep.code === 200) {
					this.code = rep.data;
				} else {
				}
			});
	}

	save() {
		if (this.code.id) {
			(this.codeService as any).update({data: this.code})
				.then(response => {
					const rep = (response as any);
					if (rep.code === 200) {
						this.router.navigate(['/admin/other/code']);
					} else {
						console.log(response);
					}
				});
		} else {
			(this.codeService as any).add({data: this.code})
				.then(response => {
					const rep = (response as any);
					if (rep.code === 200) {
						this.router.navigate(['/admin/other/code']);
					} else {
						console.log(response);
					}
				});
		}

	}


}
