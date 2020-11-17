import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SessionService } from '@app/_services_';
import { HttpClient } from '@angular/common/http';
import { Blog } from '@app/_models_';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
    // encapsulation: ViewEncapsulation.None // is there another way ?
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
                    this.displayBlogDetail();
                    return;
                }
            }
        });
    }

    /**
     * Create dom and display blog detail
     */
    private displayBlogDetail(): void
    {
        let parent = document.getElementById('blog-post-body');
        let fragment = new DocumentFragment();
        let elem;
        let classes;
        
        for (const [key, line] of Object.entries(this.detail.content)) {
            if (line['tag'] === 'p') {
                elem = document.createElement("p");
                elem.innerHTML = line['text'] + "<br/>";
                classes = ['line' + key];
            } else if (line['tag'] === 'img') {
                elem = document.createElement("img");
                elem.src = line['url'];
                classes = ['line' + key, 'blog-post-img'];
                elem.style.width = "450px";
                elem.style.padding = "30px";
            }

            elem.classList.add(...classes);
            fragment.appendChild(elem);
        }

        parent.appendChild(fragment);
    }
}
