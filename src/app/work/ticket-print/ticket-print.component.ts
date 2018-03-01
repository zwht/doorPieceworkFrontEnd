import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../common/restService/TicketService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../common/restService/UserService';
import {GxService} from '../../common/restService/GxService';
import {DoorService} from '../../common/restService/DoorService';
import {ColorService} from '../../common/restService/ColorService';
import {LineService} from '../../common/restService/LineService';
import {ProductService} from '../../common/restService/ProductService';
import {ProcessService} from '../../common/restService/ProcessService';
import {DateSet} from '../../common/service/DateSet';
import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.less'],
  providers: [ProcessService,ProductService, TicketService, UserService, GxService, DoorService, DateSet, ColorService, LineService]
})
export class TicketPrintComponent implements OnInit {
  printCSS: string[];
  printStyle=
  `.tableBox{display: block;}
      table{border-collapse: collapse; border: 1px solid #000; width: 100%;}
      th{text-align: center; font-weight: bold; background: #fff;}
      td{ padding: 6px;border:1px solid #000;}
      `;
  printBtnBoolean = true;
  printItem = {
    id:null,
    contact:null,
    address:null,
    idcard:null,
    contacttel:null,
    licenseplate:null,
    cartype:null

  };



  colorList = [];
  colorListObj = {};
  lineList = [];
  lineListObj = {};
  changeDate = true;
  userObj={};
  ticket = {
    id: null,
    name: null,
    dealersId: null,
    brandId: 1,
    odd: null,
    address: null,
    startTime: null,
    endTime: null,
    createTime: null,
    overTime: null,
    processIds: null,
    corporationId: null,
    state: 0,
    number: 0,
    pay: null,
    sumDoor:null,
    sumTaoban:null,
    sumLine:null
  };
  gxList = [];
  gxListObj = {};
  doorList = [];
  doorListObj = {};
  emptyDoor = {
    id: null,
    ticketId: null,
    doorId: 0,
    coverWidth: 100,
    coverHeight: 180,
    coverDepth: 70,
    width: 100,
    height: 180,
    sum: 1,
    lbWidth: 100,
    lbHeight: 180,
    lbSum: 2,
    dbWidth: 100,
    dbHeight: 180,
    dbSum: 1,
    lineSum: 1,
    lineLength: 2200,

  };
  productList = [JSON.parse(JSON.stringify(this.emptyDoor))];

  brandList = [
    {
      name: '川峰门业',
      id: 1
    },
    {
      name: '御驰门业',
      id: 2
    }
  ];
  getDataKey = 0;

  constructor(private ticketService: TicketService,
              private gxService: GxService,
              private colorService: ColorService,
              private doorService: DoorService,
              private lineService: LineService,
              private productService: ProductService,
              private processService: ProcessService,
              private router: Router,
              private message: ElMessageService,
              private dateSet: DateSet,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const thant = this;

    function init() {
      thant.getDataKey++;
      if (thant.getDataKey == 4) {
        thant.activatedRoute.queryParams.subscribe((params: Params) => {
          thant.ticket.id = params['id'];
          if (thant.ticket.id) {
            thant.getById();
            thant.getProductList();
            thant.getProcessList();
          }
        });
      }
    }

    this.getUserList(init);
    this.getDoorList(init);
    this.getColorList(init);
    this.getLineList(init);

  }

  printComplete() {
    this.printBtnBoolean = true;
  }

  beforePrint() {
    this.printBtnBoolean = false;
  }


  getById() {
    this.changeDate = false;
    (this.ticketService as any).getById({params: {id: this.ticket.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          rep.data.dealersId=this.userObj[rep.data.dealersId]
          this.ticket = rep.data;
          this.changeDate = true;

        } else {
        }
      });

  }

  getProductList() {
    this.productService['list']({
      params: {
        params2: 1,
        params3: 100
      },
      data: {ticketId: this.ticket.id}
    })
      .then(rep => {
        if (rep.data.data && rep.data.data.length) {
          rep.data.data.forEach(item => {
            if (item.doorId && item.doorId != '0') item.doorId = this.doorListObj[item.doorId].name;
            if (item.colorId && item.colorId != '0') item.colorId = this.colorListObj[item.colorId].name;
            if (item.lineId && item.lineId != '0') item.lineId = this.lineListObj[item.lineId].name;
          });


          this.productList = rep.data.data;
        }
      })
  }
  getProcessList(){
    this.processService['list']({
      params: {
        params2: 1,
        params3: 100
      },
      data: {ticketId: this.ticket.id}
    })
      .then(rep => {
        if (rep.data.data && rep.data.data.length) {
          rep.data.data.forEach(item => {
            this.gxList.forEach(item1=>{
              item1.forEach(obj=>{
                if(item.gxId==obj.id){
                  obj.processId=item.id;
                  obj.price=item.price;
                  obj.userId=this.userObj[item.userId];
                }
              })
            });


          });
        }
      })
  }

  getUserList(callBack) {
    (this.userService as any).list({
      params: {
        params2: 1,
        params3: 1000
      }
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          response.data.data.forEach(item => {
            this.userObj[item.id]=item.name;
          });
          this.getGxList(callBack);
        } else {
          console.log(response);
        }
      });
  }

  getDoorList(callBack) {
    (this.doorService as any).list({
      params: {
        params2: 1,
        params3: 1000
      }
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.doorList = response.data.data;
          this.doorList.forEach(item => {
            this.doorListObj[item.id] = item;
          })

        } else {
          console.log(response);
        }
        callBack();
      });
  }

  getGxList(callBack) {
    (this.gxService as any).list({
      params: {
        params2: 1,
        params3: 1000
      }
    })
      .then(response => {
        callBack();
        const rep = (response as any);
        if (rep.code === 200) {

          let result=[];
          for(var i=0,len=response.data.data.length;i<len;i+=9){
            result.push(response.data.data.slice(i,i+9));
          };
          this.gxList = result;
        } else {
          console.log(response);
        }
      });
  }

  getColorList(callBack) {
    (this.colorService as any).list({
      params: {
        params2: 1,
        params3: 1000
      }
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.colorList = response.data.data;
          this.colorList.forEach(item => {
            this.colorListObj[item.id] = item;
          })
        } else {
          console.log(response);
        }
        callBack();
      });
  }

  getLineList(callBack) {
    (this.lineService as any).list({
      params: {
        params2: 1,
        params3: 1000
      }
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.lineList = response.data.data;
          this.lineList.forEach(item => {
            this.lineListObj[item.id] = item;
          })
        } else {
          console.log(response);
        }
        callBack();
      });
  }

  print(){
    this.router.navigate(['/admin/work/ticket/print'], {queryParams: {id: this.ticket.id}});
  }

}
