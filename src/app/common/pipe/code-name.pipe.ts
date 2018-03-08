import { Pipe, PipeTransform } from '@angular/core';
import {SetCodeService} from "../service/set-code.service";

@Pipe({
  name: 'codeName'
})
export class CodeNamePipe implements PipeTransform {
	constructor(private setCodeService: SetCodeService) {
	}
  transform(value: any, args?: any): any {
		if(this.setCodeService["codeObj"][value]){
			return this.setCodeService["codeObj"][value];
		}else{
			return value;
		}
  }

}
