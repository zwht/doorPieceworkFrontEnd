import {Component, OnInit} from '@angular/core';
import {DoorService} from '../../common/restService/DoorService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GxService} from '../../common/restService/GxService';
@Component({
  selector: 'app-door-add',
  templateUrl: './door-add.component.html',
  styleUrls: ['./door-add.component.less'],
  providers: [DoorService, GxService]
})
export class DoorAddComponent implements OnInit {
  title:null;
  gxList = [];
  door = {
    id: null,
    name: null,
    img: null,
    gxIds: null,
    gxValues: null,
    createTime: null,
    number:null,
    state: 0
  };

  constructor(private doorService: DoorService,
              private gxService: GxService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.door.id = params['id'];
      if (this.door.id) {
        this.getById();
      } else {
        this.getGxList();
      }
    });

  }

  getGxList() {
    this.gxService['list']({
      params: {
        params2: 1,
        params3: 1000
      },
      data:{ }
    }, {

    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.gxList = response.data.data.sort(function (a, b) {
            return a.serial - b.serial;
          });
          if (this.door.id) {
            this.gxList.forEach(item => {
              if (this.door.gxIds) {
                this.door.gxIds.forEach((obj,i) => {
                  if (obj == item.id){
                    item.active = true;
                    item.price = this.door.gxValues[i];
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

  imageChange(data) {
    this.door.img = data.url;
  }

  getById() {
    (this.doorService as any).getById({params: {id: this.door.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          if(rep.data.gxIds)rep.data.gxIds = rep.data.gxIds.split(",");
          if(rep.data.gxValues)rep.data.gxValues = rep.data.gxValues.split(",");
          this.door = rep.data;
          this.getGxList();
        } else {
        }
      });
  }

  save() {
    this.door.gxIds = '';
    this.door.gxValues = '';
    this.gxList.forEach(item => {
      if (item.active) {
        this.door.gxIds += item.id + ',';
        this.door.gxValues += item.price + ',';
      }
    });
    if (this.door.gxIds) {
      this.door.gxIds = this.door.gxIds.substring(0, this.door.gxIds.length - 1);
      this.door.gxValues = this.door.gxValues.substring(0, this.door.gxValues.length - 1)
    }
    if (this.door.id) {
      (this.doorService as any).update({data: this.door})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/door']);
          } else {
            console.log(response);
          }
        });
    } else {
      (this.doorService as any).add({data: this.door})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/door']);
          } else {
            console.log(response);
          }
        });
    }

  }

}
