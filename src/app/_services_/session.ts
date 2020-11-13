import { Injectable } from '@angular/core';
// import '@app/_extensions_';

@Injectable({ providedIn: 'root' })

export class SessionService {
    private _cacheKeys: string[] = [];

    /**
     * Set data to session storage
     * 
     * @param key session key
     * @param data 
     */
    setData (key: string, data: any): void
    {
        if (!this.hasKey(key) ) {
            this.addNewKey(key);
        }

        window.sessionStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Data saved at session storage
     * 
     * @param key session key
     */
    getData (key: string): any
    {
        return JSON.parse(window.sessionStorage.getItem(key));
    }

    /**
     * Add new key to cache
     * 
     * @param key session key
     */
    private addNewKey (key: string): void
    {
        this._cacheKeys.push(key);
    }

    /**
     * Check if key is existed
     * 
     * @param key session key
     * @return boolean
     */
    hasKey (key: string): boolean
    {
        if (key in this._cacheKeys) {
            return true;
        }

        return false;
    }

}