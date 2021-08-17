import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { IdentityProfileComponent } from './identity/identity-profile/identity-profile.component';
import { NewIdentityComponent } from './identity/new-identity/new-identity.component';
import { AddSocialMediaComponent } from './identity/add-social-media/add-social-media.component';

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'identity/identity-profile',     component: IdentityProfileComponent },
    { path: 'identity/new-identity',     component: NewIdentityComponent },
    { path: 'identity/socialMedia',     component: AddSocialMediaComponent }

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
