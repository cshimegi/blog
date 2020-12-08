import { Component, OnInit } from '@angular/core';
import { SessionService, UtilityService } from '@app/_services_';

@Component({
    selector: 'app-learning',
    templateUrl: './learning.component.html',
    styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
    isMobile: boolean;

    constructor(
        private utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        this.isMobile = this.utilityService.isMobile();
    }

}
