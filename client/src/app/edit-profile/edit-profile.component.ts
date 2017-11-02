import { UploadService } from '../common/services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	img: String;
	userForm: FormGroup;
	progress: any;
	first: Boolean = false;
	second: Boolean = false;
	third: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;
	user: any = {
		"availability": [""],
		"shift": [""],
		"skillsSet":[],
	}

	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['ft', 'pt', 'temp'];
	success: Boolean = true;
	failed: Boolean = false;

	constructor(
		private _user: UserService,
		private fb: FormBuilder,
		private _router: Router,
		private _upload: UploadService
	) {
		this.user = JSON.parse(localStorage.getItem("user"));
		this.checkCircles();
		this.createForm();
		_upload.getSuccessMsg().subscribe((v: any) => this.success = v)
		_upload.getFailedMsg().subscribe((v: any) => this.failed = v)
		// this._upload.getFile()
		// 	.subscribe(v => console.log(v));
	}

	ngOnInit() {	
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
		console.log(this.user)
	}

	checkCircles() {
		this.user.shift.forEach(s => this[s] = true);
		this.user.availability.forEach(a => this[a] = true);
	}

	createForm() {
		var tempSkillsSet = this.user.skillsSet.join(", ");
		this.userForm = this.fb.group({
			firstName: [this.user.firstName , Validators.required],
			lastName: [this.user.lastName, Validators.required],
			email: [this.user.email, [Validators.required, Validators.email]],
			phoneNumber: [this.user.phoneNumber],
			skillsSet: tempSkillsSet,
			introduction: [this.user.introduction]
		});
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}

	handleClick() {
		const obj = Object.assign(this.userForm.value, {
			shift: this.shifts.filter(x => this[x]),
			availability: this.types.filter(x => this[x])
		})
		try {
			var temp = this.userForm.value.skillsSet.split(",")
		} catch(err) {
			temp = []
		}
		for (var i = 0; i < temp.length; i++) {
			temp[i] = temp[i].trim();
		}
		obj["skillsSet"] = temp;
		console.log(obj)
		this._user.updateProfile(obj);

	}

	closeMsg() {
		this._upload.closeMsg();
	}
  	
  	backButton(){
  		this._router.navigate(["applicant"]);
	}
	  
	handleFiles(e: Event) {
		const x = e.target['files'];
		const file = x.item(0);
		this._upload.sendFile(file)
			.subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if (event instanceof HttpResponse) {
					console.log('File is completely uploaded!');
				}
			})
	}

	logout() {
		this._user.logout();
	}

}
