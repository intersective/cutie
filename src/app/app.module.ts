import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '@environments/environment';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestModule } from '@shared/request/request.module';
import { PusherModule } from '@shared/pusher/pusher.module';
import { UtilsService } from '@services/utils.service';
import { PopupModule } from '@shared/popup/popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { urlFormatter } from 'helper';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RequestModule,
    PusherModule.forRoot({
      apiurl: urlFormatter(environment.APIEndpointOld),
      pusherKey: environment.pusherKey,
    }),
    ApolloModule,
    HttpLinkModule,
    PopupModule,
    NgbModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private apollo: Apollo,
    httpLink: HttpLink
  ) {
    this.apollo.create(
      {
        link: httpLink.create({
          uri: urlFormatter(environment.chatGraphQL)
        }),
        cache: new InMemoryCache(),
      },
      'chat'
    );

    this.apollo.create(
      {
        link: httpLink.create({
          uri: urlFormatter(environment.graphQL)
        }),
        cache: new InMemoryCache(),
      },
      'practera'
    );
  }
}
