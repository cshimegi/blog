import { Component, Output, EventEmitter } from '@angular/core';
// for i18n
import { TranslateService } from '@ngx-translate/core';
import { SessionService, UtilityService } from '@app/_services_';
import { ThemePalette } from '@angular/material/core';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    @Output() sidenavClose = new EventEmitter();
    background: ThemePalette = 'primary';
    selectedLang: string = '';
    isMobile: boolean;
    thisYear: number = new Date().getFullYear();

    constructor (
        private translateService: TranslateService,
        private sessionService: SessionService,
        private utilityService: UtilityService
    ){
        this.isMobile = this.utilityService.isMobile();
        let lang = this.sessionService.getData('appLang') ?? window.navigator.language;
        this.setAppLang(lang);
        
        $(function () {
            $('#dropdownMenuButton').on('click touch', function() {
                $('.dropdown-menu').toggle();
            });
        });
    }

    /**
     * Set language for app
     * @params lang The langauge got from user's agent
     * @return none
     */
    private setAppLang(lang: string): void
    {
        this.selectedLang = this.classifyLang(lang);
        this.translateService.setDefaultLang(this.selectedLang);
        this.translateService.use(this.selectedLang);
        this.sessionService.setData('appLang', this.selectedLang);
    }

    /**
     * Classify browser's lang to translation lang
     * 
     * @params lang The langauge got from user's agent
     * @return classified lang
     */
    private classifyLang(lang: string): string
    {
        let lowerizedLang = lang.toLowerCase();
        return lowerizedLang.startsWith('zh') 
                ? "zh_hant" 
                : lowerizedLang.startsWith('ja')
                    ? "ja"
                    : "en";
    }

    public showLanguageMenus(): void
    {
        let menuElemClassList = document.getElementById("language-dropdown-menu").classList;

        if (menuElemClassList.contains('show')) {
            menuElemClassList.remove('show');
        } else {
            menuElemClassList.add('show');
        }
    }

    /**
     * Switch to selected lang
     * @params lang The langauge got from user's agent
     * @return none
     */
    public switchLanguage(lang: string): void
    {
        this.setAppLang(lang);
        window.location.reload();
    }

    onSidenavClose (): void
    {
        this.sidenavClose.emit();
    }
}
