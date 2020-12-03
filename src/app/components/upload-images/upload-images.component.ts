import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UploadFilesService } from '../../services/upload-files.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {

  progressInfo: any = { value: null, fileName: null };
  message = '';
  selectedFile: File = null;
  up: boolean = true;
  success: boolean = true;
  status: boolean = true;
  urlImage = "../../../assets/images/image.svg";
  progress: number = 0;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void { }

  upload(event): void {
    this.selectedFile = this.onFile(event);
    this.uploadFile(this.selectedFile)
  }

  uploadFile(fileS): void {
    this.progressInfo = { value: 0, fileName: fileS.name };
    this.uploadService.upload(fileS).subscribe(
      event => {
        this.up = false;
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          if (this.progress == 100) {
            setInterval(() => this.up = true, 4000)
          }
        }

        if (event.type === HttpEventType.Response) {
          this.status = false;
          this.urlImage = event.body.imageUrl;
        }
      },
      err => {
        this.status = false;
        this.success = false;
        this.message = 'Could not upload the file:';
      });

  }

  onFile(event) {
    this.selectedFile = <File>event.target.files[0];
    return this.selectedFile;
  }
}
