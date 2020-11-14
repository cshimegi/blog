import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SessionService } from '@app/_services_';
import { HttpClient } from '@angular/common/http';
import { Blog } from '@app/_models_';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    private params: object;
    detail = new Blog();
    private _dataId: number;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private sessionService: SessionService
    ) {
        this.route.params.subscribe(params => this.params = params);
        this._dataId = Number(this.params['id']);
    }

    ngOnInit(): void {
        let appLang = this.sessionService.getData('appLang');
        let url = 'assets/storages/blog.' + appLang + '.json';
        
        this.http.get(url).subscribe(data => {
            for (const [key, value] of Object.entries(data)) {
                if (value.id === this._dataId) {
                    this.detail = value;
                    return;
                }
            }
        });
    }

}
