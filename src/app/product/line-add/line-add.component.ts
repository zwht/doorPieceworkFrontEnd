import {Component, OnInit} from '@angular/core';
import {LineService} from '../../common/restService/LineService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GxService} from '../../common/restService/GxService';
import {debug} from "util";
@Component({
  selector: 'app-line-add',
  templateUrl: './line-add.component.html',
  styleUrls: ['./line-add.component.less'],
  providers: [LineService, GxService]
})
export class LineAddComponent implements OnInit {

  title = '';
  line = {
    id: null,
    name: null,
    img: null,
    value: null,
    gxIds: null,
    gxValues: null
  };
  gxList = [];

  constructor(private lineService: LineService,
              private gxService: GxService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.line.id = params['id'];
      if (this.line.id) {
        this.getById();
      }

    });
    this.getGxList();
  }

  imageChange(data) {
    this.line.img = data.url;
  }

  getById() {
    (this.lineService as any).getById({params: {id: this.line.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          if (rep.data.gxIds) rep.data.gxIds = rep.data.gxIds.split(",");
          if (rep.data.gxValues) rep.data.gxValues = rep.data.gxValues.split(",");
          this.line = rep.data;
        } else {
        }
      });
  }

  getGxList() {
    this.gxService['list']({
      params: {
        params2: 1,
        params3: 1000
      },
      data: {}
    }, {})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.gxList = response.data.data.sort(function (a, b) {
            return a.serial - b.serial;
          });
          if (this.line.id) {
            this.gxList.forEach(item => {
              if (this.line.gxIds) {
                this.line.gxIds.forEach((obj, i) => {
                  if (obj == item.id) {
                    item.active = true;
                    item.price = this.line.gxValues[i];
                  }
                })
              }
            })
          } else {
            this.gxList.forEach(item => {
              item.active = true;
            })
          }
        } else {
          console.log(response);
        }
      });
  }

  save() {
    this.line.gxIds = '';
    this.line.gxValues = '';
    this.gxList.forEach(item => {
      if (item.active) {
        this.line.gxIds += item.id + ',';
        this.line.gxValues += item.price + ',';
      }
    });
    if (this.line.id) {
      (this.lineService as any).update({data: this.line})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/line']);
          } else {
            console.log(response);
          }
        });
    } else {
      (this.lineService as any).add({data: this.line})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/line']);
          } else {
            console.log(response);
          }
        });
    }

  }


}
