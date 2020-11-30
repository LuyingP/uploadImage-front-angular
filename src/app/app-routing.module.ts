import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
