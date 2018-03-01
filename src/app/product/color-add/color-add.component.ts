import {Component, OnInit} from '@angular/core';
import {ColorService} from '../../common/restService/ColorService';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.less'],
  providers: [ColorService]
})
export class ColorAddComponent implements OnInit {

  title='';
  color = {
    id: null,
    name: null,
    img: null,
    value: null
  };

  constructor(private colorService: ColorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.color.id = params['id'];
      if (this.color.id) {
        this.getById();
      }

    });
  }

  imageChange(data) {
    this.color.img = data.url;
  }

  getById() {
    (this.colorService as any).getById({params: {id: this.color.id}})
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.color = rep.data;
        } else {
        }
      });
  }

  save() {
    if (this.color.id) {
      (this.colorService as any).update({data: this.color})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/color']);
          } else {
            console.log(response);
          }
        });
    } else {
      (this.colorService as any).add({data: this.color})
        .then(response => {
          const rep = (response as any);
          if (rep.code === 200) {
            this.router.navigate(['/admin/product/color']);
          } else {
            console.log(response);
          }
        });
    }

  }


}
