import {Injectable} from '@angular/core';
import {CodeService} from '../restService/CodeService';

@Injectable()
export class SetCodeService {
	private allList = [];

	constructor(private codeService:CodeService) {
	}

	getAll() {
		(this.codeService as any).list({
			params: {
				params2: 1,
				params3: 1000
			}
		})
			.then(response => {
				const rep = (response as any);
				if (rep.code === 200) {
					this.allList = response.data.data;
					this.allList.forEach(item=>{

					})
				} else {
					console.log(response);
				}
			});
	}
}
