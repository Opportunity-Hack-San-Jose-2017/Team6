import { Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { url as BASE_URL } from '../config/url';

@Injectable()
export class UploadService {

	successMessage = new BehaviorSubject(false);
	failedMessage = new BehaviorSubject(false);

	constructor(private _http: HttpClient) { }

	sendFile(file: any) {
		let formdata: FormData = new FormData();
		formdata.append('file', file);
		console.log(file);
		const req = new HttpRequest('POST', `${BASE_URL}/api/aws/s3/upload`, formdata, {
			withCredentials: true
		});
		return this._http.request(req);
	}

	getFile(id: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem('user'))
		return this._http.get(`${BASE_URL}/api/aws/s3/download`, {
			params: new HttpParams().set('key', id),
			withCredentials: true, responseType: 'text' });
	}

	getSuccessMsg(): Observable<any> {
		return this.successMessage;
	}

	closeMsg() {
		this.successMessage.next(false)
		this.failedMessage.next(false)
	}

	getFailedMsg(): Observable<any> {
		return this.failedMessage;
	}

}
