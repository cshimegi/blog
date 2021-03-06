import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// for i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelComponent } from '@app/travel';
import { LearningComponent } from './learning/learning.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AboutComponent } from './about/about.component';
import { DetailComponent } from './detail/detail.component';

// material modules
import { MATERIAL_MODULES } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        TravelComponent,
        LearningComponent,
        SubscribeComponent,
        AboutComponent,
        DetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({ // for i18n
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        ...MATERIAL_MODULES
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
    exports: [
        TranslateModule,// for i18n
    ]
})

export class AppModule { }

// for i18n
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/');
}