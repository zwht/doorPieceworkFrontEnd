import {Component, OnInit} from '@angular/core';
import {GxService} from '../../common/restService/GxService';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-gx-add',
  templateUrl: './gx-add.component.html',
  styleUrls: ['./gx-add.component.css'],
  providers: [GxService]
})
export class GxAddComponent implements OnInit {

  title:null;
  gx = {
    id: null,
    name: null,
    price: null,
    type: 1,
    serial: null,
    state: 0
  };
  gxTypes=[
    {
      name:'门工序',
      id:1
    },
    {
      name:'线条工序',
      id:2
    }
  ];

  constructor(private gxService: GxService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.gx.id = params['id'];
      if (this.gx.id) {
        this.getById();
      }

    });
  }

  getById() {
    (this.gxService as any).getById({params: {id: this.gx.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.gx = rep.data;
        } else {
        }
      });
  }

  save() {
    if (this.gx.id) {
      (this.gxService as any).update({data: this.gx})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/gx']);
          } else {
            console.log(response);
          }
        });
    } else {
      (this.gxService as any).add({data: this.gx})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/gx']);
          } else {
            console.log(response);
          }
        });
    }

  }

}
