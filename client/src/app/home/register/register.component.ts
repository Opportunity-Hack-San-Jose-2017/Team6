import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	userForm: FormGroup;
	checked: Boolean = false;
	hovered: Boolean = false;
	
	@ViewChild('accept', {read: ElementRef}) accept: ElementRef;

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	handleCheck() {
		this.checked = !this.checked;
	}

	registration() {
		if (this.accept.nativeElement.checked) {
			const obj = {
				email: this.userForm.value.email,
				firstName: this.userForm.value.firstName,
				lastName: this.userForm.value.lastName,
				token: this.userForm.value.caseFileID,
				password: this.userForm.value.passwords.password,
				phoneNumber: "",
				education: "",
				pendingApplications: 0,
				availability: [],
				shift: [],
				introduction: "",
				experience: "",
				skillsSet: [],
				verified: false,
				hashValue: ""
			}
			this._user.register(obj);
		}
	} 

	createForm() {
		this.userForm = this.fb.group({
			firstName: ['', Validators.required ],		
			lastName: ['', Validators.required ],		
			caseFileID: ['', Validators.required ],		
			accept: ['', Validators.required ],		
			email: ['', [Validators.required, Validators.email]],
			passwords: this.fb.group({
				password: ['', Validators.required],
				confirmPassword: ['', Validators.required]
				}, RegisterComponent.areEqual)
		});
	}
	static areEqual(c: AbstractControl): ValidationErrors | null {
		const keys: string[] = Object.keys(c.value);
		for (const i in keys) {
		  if (i !== '0' && c.value[ keys[ +i - 1 ] ] !== c.value[ keys[ i ] ]) {
			return { areEqual: true };
		  }
		}
	  }
}
