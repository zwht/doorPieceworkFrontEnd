import {Component} from '@angular/core';
import {SetCodeService} from '../../../common/service/set-code.service';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';

	constructor(private setCodeService: SetCodeService,
	            private titleService: Title,
	            private router: Router,
	            private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.setCodeService.init();
		this.router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map(route => {
				while (route.firstChild) {
					route = route.firstChild;
				}
				return route;
			})
			.map(route => route.data)
			.subscribe((event) => {
				if (event['value'] && event['value'].name) {
					this.titleService.setTitle('计件_' + event['value'].name);
				} else {
					this.titleService.setTitle('页面不存在');
				}

			});
	}
}
