import { Component, OnInit } from '@angular/core';
import { UtilityService, SessionService } from '@app/_services_';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
    isMobile: boolean;
    appLang: string;

    constructor(
        private utilityService: UtilityService,
        private sessionService: SessionService
    ) {
        this.isMobile = this.utilityService.isMobile();
        this.appLang = this.sessionService.getData('appLang');
    }

    ngOnInit(): void {
    }
}
