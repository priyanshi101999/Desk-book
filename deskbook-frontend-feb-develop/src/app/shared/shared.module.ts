import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from './shorten.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { UpdateProfileModalService } from './services/update-profile-modal.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    ShortenPipe,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShortenPipe,
    OverlayModule
  ],
  providers: [
    UpdateProfileModalService
  ]
})
export class SharedModule { }
