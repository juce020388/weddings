import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {CountdownComponent} from './components/countdown/countdown.component';
import {StoryComponent} from './components/story/story.component';
import {RsvpComponent} from './components/rsvp/rsvp.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {FamilyComponent} from './components/family/family.component';
import {EventComponent} from './components/event/event.component';
import {CoupleComponent} from './components/couple/couple.component';
import {ContactComponent} from './components/contact/contact.component';
import {HttpClientModule} from "@angular/common/http";
import {BaseComponent} from './components/base/base.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TestComponent} from './components/test/test.component';
import { InvitationCardComponent } from './invitation-card/invitation-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountdownComponent,
    StoryComponent,
    RsvpComponent,
    GalleryComponent,
    FamilyComponent,
    EventComponent,
    CoupleComponent,
    ContactComponent,
    BaseComponent,
    TestComponent,
    InvitationCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      // {path: 'svecias/:guestID', component: BaseComponent},
      {path: 'svecias/:countryCode/:guestID', component: BaseComponent},
      {path: '**', component: HomeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
