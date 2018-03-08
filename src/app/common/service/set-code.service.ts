import {Injectable} from '@angular/core';
import {CodeService} from '../restService/CodeService';

@Injectable()
export class SetCodeService {
	private list = [];
	private codeObj = {};

	constructor(private codeService: CodeService) {
		this.getLocalStorageData();

	}
	getLocalStorageData(){
		if (!this.list.length && localStorage.getItem('codeLost')) this.list = JSON.parse(localStorage.getItem('codeLost'));
		if(!this.list.length){
			this.init();
		}else{
			this.initData();
		}
	}
	init() {
		(this.codeService as any).list({
			params: {
				params2: 1,
				params3: 1000
			}
		})
			.then(response => {
				const rep = (response as any);
				if (rep.code === 200) {
					this.list = response.data.data;
					this.initData();
					localStorage.setItem('codeList', JSON.stringify(this.list));
				} else {
					console.log(response);
				}
			});
	}

	initData(){
		this.codeObj={};
		this.list.forEach(item => {
			this.codeObj[item.value]=item.name;
		})
	}
}
