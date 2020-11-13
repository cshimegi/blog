import { Component } from '@angular/core';
// import { MDCTooltip } from '@material/tooltip'; // Todo: tooltips
// for i18n
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '@app/_services_';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    selectedLang: string = '';

    constructor (
        private translateService: TranslateService,
        private sessionService: SessionService
    ){
        let lang = this.sessionService.getData('appLang') ?? window.navigator.language;
        this.setAppLang(lang);
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

}
