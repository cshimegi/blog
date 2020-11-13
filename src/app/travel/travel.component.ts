import { Component, OnInit } from '@angular/core';
import { Blog } from '@app/_models_';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})

export class TravelComponent implements OnInit {
    private blogDataUrl: string;
    private appLang: string;

    newestBlog = new Blog();
    blogs: Blog[];

    constructor(
        private http: HttpClient,
        private translateService: TranslateService
    ) {
        this.appLang = this.translateService.getDefaultLang();
        this.blogDataUrl = 'assets/storages/blog.' + this.appLang + '.json';
    }
    
    ngOnInit(): void {
        this.getAllBlogs().subscribe(data => {
            this.newestBlog = data.shift();
            this.blogs = data;
        });
    }

    /**
     * Get all saved blogs
     */
    public getAllBlogs(): Observable<any> {
        return this.http.get(this.blogDataUrl);
    }

}
