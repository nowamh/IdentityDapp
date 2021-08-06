import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewIdentityComponent } from './identity/new-identity/new-identity.component';
import { IdentityProfileComponent } from './identity/identity-profile/identity-profile.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { Web3Service } from './services/web3/web3.service';
import { IdentityService } from './services/identity/identity.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NewIdentityComponent,
        IdentityProfileComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [ 
        Web3Service,
        IdentityService,],
    bootstrap: [AppComponent]
})
export class AppModule { }
