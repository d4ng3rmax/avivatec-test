import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { HomeComponent }        from './home/home.component';
import { RickDetailComponent }  from './rick-detail/rick-detail.component';
import { RicksComponent }       from './ricks/ricks.component';
import { RickSearchComponent }  from './rick-search/rick-search.component';
import { MessagesComponent }    from './messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,

    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    RicksComponent,
    RickDetailComponent,
    MessagesComponent,
    RickSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
