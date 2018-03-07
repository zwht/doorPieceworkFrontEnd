import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketState'
})
export class TicketStatePipe implements PipeTransform {

	private list={
		200:'新订单',
		210:'已提交',
		220:'已审核',
		230:'开始生产',
		800:'生成完成',
		810:'发货',
		820:'收货',
		830:'收款完成',
	};
  transform(value: any, args?: any): any {
    return this.list[value]?this.list[value]:value;
  }

}
