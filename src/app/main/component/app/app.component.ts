import { Component } from '@angular/core';
import {SetCodeService} from "../../../common/service/set-code.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
	constructor(private setCodeService:SetCodeService) {
	}
	ngOnInit() {
		this.setCodeService.init();
	}
}
