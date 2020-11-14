import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribeComponent } from '@app/subscribe';
import { AboutComponent } from '@app/about';
import { TravelComponent } from '@app/travel';
import { LanguageComponent } from '@app/language';
import { DetailComponent } from '@app/detail';

const routes: Routes = [
    { path: '', component: TravelComponent }, // travel as default page
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'travel', component: TravelComponent },
    { path: 'language', component: LanguageComponent },
    { path: ':category/detail/:id', component: DetailComponent },
    // otherwise redirect to dashboard
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
