import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {UploadFilesService} from'../../services/upload-files.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {

  progressInfo :any=
  { value: null, fileName: null };
  message = '';
  selectedFile:File=null;
  fileInfos:any;
  up:boolean=true;
  success:boolean=true;
  status:boolean=true;
  urlImage="../../../assets/images/image.svg";
  constructor(private uploadService:UploadFilesService) { 
  
  }

  ngOnInit(): void {
  }

  upload(event): void {
    console.log("######### button")
    this.selectedFile=this.onFile(event);
    this.uploadFile(this.selectedFile)
   
  }

  uploadFile(fileS): void {
    // fileS=this.selectedFile;
    
    
    this.progressInfo = { value: 0, fileName: fileS.name };
  
    this.uploadService.upload(fileS).subscribe(
      event => {
        this.up=false;
         setInterval(()=>this.up=true,4000)
        // if (event.type === HttpEventType.UploadProgress) {
        //   var percentage = Math.round(( event.loaded / event.total)*100);
        //   console.log(event.loaded, event.total);
        //   if(percentage==100){
        //     this.up=true;
        //   }
 
        //  } 
        if (event.type === HttpEventType.Response) {
          // this.fileInfos=event.body.imageUrl;
          this.status=false;
          this.urlImage=event.body.imageUrl;
        }
        
      },
      err => {
        
        //  this.progressInfo.percentage = 0;
        this.message = 'Could not upload the file:' + fileS.name;
      });
    
  }

  onFile(event){
     console.log(event)
    this.selectedFile= <File>event.target.files[0];
    
    return this.selectedFile;
    
  }



}
