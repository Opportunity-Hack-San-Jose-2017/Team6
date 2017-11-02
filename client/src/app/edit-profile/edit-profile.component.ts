import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	img: String;
	userForm: FormGroup;
	first: Boolean = false;
	second: Boolean = false;
	third: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;
	user: any = {
		"email":"",
		"token": "",
		"password":"",
		"firstName":"",
		"lastName":"",
		"phoneNumber": "",
		"availability":[],
		"shift":[],
		"position":null,
		"introduction":"",
		"experience":"",
		"education":null,
		"verified":false,
		"hashValue":"",
		"city":null,
		"country":null,
		"rating":0,
		"numberOfRatings":0,
		"skillsSet":[],
		"pendingApplications":0,
		"imageUrl":null
	}

	constructor(
		private _user: UserService,
		private fb: FormBuilder,
		private _router: Router
	) {
		this.createForm();
		this.user = localStorage.getItem("user")
	}

	ngOnInit() {		
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
	}
  
	createForm() {
		this.userForm = this.fb.group({
			firstName: [this.user.firstName, Validators.required],
			lastName: [this.user.lastName, Validators.required],
			email: [this.user.email, [Validators.required, Validators.email]],
			phone: [this.user.phoneNumber],
			skillsSet: this.user.skillsSet,
			experiences: [this.user.experience]
		});
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}

	handleClick() {
		const obj = Object.assign(this.userForm.value, {
			availability: Object.assign({}, {
				morning: this.first ? true : false,
				noon: this.second ? true : false,
				night: this.third ? true : false
			}),
			jobType: Object.assign({}, {
				fullTime: this.ft ? true : false,
				partTime: this.pt ? true : false,
				temporary: this.temp ? true : false
			})
		})
		var temp = this.userForm.value.skillsSet.split(",")
		for (var i = 0; i < temp.length; i++) {
			temp[i] = temp[i].trim();
		}
		obj["skillsSet"] = temp;
		console.log(obj)
		const newObj = Object.assign(this.user, obj);
		//this broke the front page, fixing when we meet.
		// this._user.updateProfile(newObj);
	}
  	
  	backButton(){
  		this._router.navigate(["applicant/home"])
  	}

}