import { Injectable } from '@angular/core';
// import '@app/_extensions_';

@Injectable({ providedIn: 'root' })

export class UtilityService {
    isMobile() {
        return ( window.innerWidth <= 575.98 ) || ( window.innerHeight <= 600 );
    }
}