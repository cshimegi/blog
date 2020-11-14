import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import '@app/_extensions_';

@Injectable({ providedIn: 'root' })

export class DatabaseService {
    private tables: object = {
        'blog': 'assets/storages/blog.'
    };
    private table: string;
    private appLang: string;
    private suffix: string = '.json';
    private _dataCache;

    constructor(
        private http: HttpClient
    ) {
        
    }

    public setBasicTableParams(params: object): this
    {
        this.table = params['table'];
        this.appLang = params['appLang'];
        return this;
    }

    /**
     * Get data by data id
     * @param id 
     * @return data
     */
    public getDataById(id: number): object
    {
        return this._dataCache.filte(d => d.id === id)[0];
    }

    /**
     * Get all saved blogs
     */
    public getAllBlogs(): any[] {
        let url = this.tables[this.table] + this.appLang + this.suffix;
        console.log(url);
        this.http.get(url).subscribe(data => {
            this._dataCache = data;
        });

        return this._dataCache;
    }

}