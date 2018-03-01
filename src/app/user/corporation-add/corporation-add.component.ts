import {Component, OnInit} from '@angular/core';
import {CorporationService} from '../../common/restService/CorporationService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ElMessageService } from 'element-angular'
@Component({
  selector: 'app-corporation-add',
  templateUrl: './corporation-add.component.html',
  styleUrls: ['./corporation-add.component.css'],
  providers: [CorporationService]
})
export class CorporationAddComponent implements OnInit {
  title='';
  component = {
    id: null,
    name: null,
    address: null,
    state: 1,
    img:null
  };

  constructor(private corporationService: CorporationService,
              private router: Router,
              private message: ElMessageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.component.id = params['id'];
      if (this.component.id) {
        this.getById();
      }

    });
  }
  imageChange(data) {
    this.component.img = data.url;
  }

  getById() {
    (this.corporationService as any).getById({params: {id: this.component.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.component = rep.data;
        } else {
        }
      });
  }

  save() {
    if (this.component.id) {
      (this.corporationService as any).update({data: this.component})
        .then(response => {
          const rep = (response as any);
          if (rep.code == 200) {
            this.message.success(rep.data);
            window.history.back()
          } else {
            this.message.error(rep.message);
          }
        });
    } else {
      (this.corporationService as any).add({data: this.component})
        .then(response => {
          const rep = (response as any);
          if (rep.code == 200) {
            this.message.success(rep.data);
            window.history.back()
          } else {
            this.message.error(rep.message);
          }
        });
    }

  }

}
