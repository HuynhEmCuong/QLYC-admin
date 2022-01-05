import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class FileService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**FILES */
  uploadFile(formData, pathFile) {
    return this.http.post(`${API_URL}/File/UploadMultipleFile?pathFolder=${pathFile}`, formData, { reportProgress: true, observe: 'events' });
  }
  removeFile(fileLocalName) {
    return this.http.delete(`${API_URL}/File/RemoveFile`, { params: { fileLocalName: fileLocalName } });
  }

  downloadFile(fileName) {
     return this.http.get(`${API_URL}/File/DownloadFile?fullPath=${fileName}`, { responseType: 'blob' });
  }
  openFile(fileName) {
    window.open(`${API_URL}/${fileName}`);
  }

  getLinkFile(filePath) {
    return `${API_URL}/File/DownloadFile?fileName=${filePath}`;
  }

  // openUrl(url, filename) {
  //   this.http.get("/fast"+url, { responseType: 'blob' }).subscribe((resp: any) => {
  //     FileSaver.saveAs(resp, filename)
  //   });
  // }


  convertFileUrlToBlob(urlImage){
    return this.http.get(urlImage, { responseType: 'blob' });
  }

}
