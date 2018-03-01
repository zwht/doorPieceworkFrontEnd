/**
 * Created by zhaowei on 2017/10/23.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class DateSet {

  condateuctor() {
  }

  getDate(date) {
    if(!date) return null;
    if(typeof(date)=="number") return date;
    const year = date.split('')[0] + date.split('')[1] + date.split('')[2] + date.split('')[3];
    let month = date.split('')[5] + date.split('')[6];
    const day = date.split('')[8] + date.split('')[9];
    return (new Date(parseInt(year), parseInt(month), parseInt(day))).getTime();
  }
  getDate1(date) {
    if(!date) return null;
    if(typeof(date)=="number") return date;
    const year = date.split('')[0] + date.split('')[1] + date.split('')[2] + date.split('')[3];
    let month = date.split('')[5] + date.split('')[6];
    const day = date.split('')[8] + date.split('')[9];
    return (new Date(parseInt(year), parseInt(month)-1, parseInt(day))).getTime();
  }
}
