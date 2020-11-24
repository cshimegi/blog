import { Component, OnInit } from '@angular/core';
import { SessionService, UtilityService } from '@app/_services_';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
    isMobile: boolean;

    constructor(
        private utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        this.isMobile = this.utilityService.isMobile();
    }

}
