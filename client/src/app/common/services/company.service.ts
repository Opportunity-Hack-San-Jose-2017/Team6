import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { url as BASE_URL } from '../config/url';

@Injectable()
export class CompanyService {

	constructor(
		private http: HttpClient,
		private _router: Router
	) { }

	getCompanyProfile(){
		this.http.get(`${BASE_URL}/profile`)
			.subscribe((data: any) => console.log(data))
	}

	getAllOpenings(){
		return this.http.get(`${BASE_URL}/company/allOpenings`, {withCredentials: true})
	}

	register(data: Object){
		this.http.post(`${BASE_URL}/company/register`, data, {withCredentials: true})
			.subscribe(
				(res: any) => {
					if (res.statusCode == "200"){
						localStorage.setItem("company", JSON.stringify(res.company))
						this.login({email: data["email"], password: data["password"]})
					} else {
						console.log(data)
					}
				})
	}

	login(data: Object){
		console.log(data)
		this.http.post(`${BASE_URL}/company/signin`, data, {withCredentials: true })
			.subscribe(
				(data: any) => {
					if (data.statusCode == "200"){
						localStorage.setItem("company", JSON.stringify(data.company))
						this._router.navigate(['company/home'])
					} else {
						console.log(data)
					}
				})
	}

	logout(){
		this.http.post(`${BASE_URL}/company/logout`, {}, {withCredentials: true})
			.subscribe(data => {
				this._router.navigate(['company'])
			})
	}

	acceptApplicant(data) {
		return this.http.post(`${BASE_URL}/company/interview`, data, {withCredentials: true})
	}
}
