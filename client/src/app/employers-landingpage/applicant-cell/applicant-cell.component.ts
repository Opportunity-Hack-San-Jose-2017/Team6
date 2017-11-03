import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from './../../common/services/company.service';
import { Router } from '@angular/router';
import { JobsService } from './../../common/services/jobs.service';
import { UploadService } from './../../common/services/upload.service';

@Component({
  selector: 'app-applicant-cell',
  templateUrl: './applicant-cell.component.html',
  styleUrls: ['./applicant-cell.component.css']
})
export class ApplicantCellComponent {

	@Input() applicant: any;
  user: any
  isAccessible: Boolean;
  constructor(
  	private _company: CompanyService,
  	private router: Router,
    private upload: UploadService
		) {
		}

		ngOnInit() {
			console.log(this.applicant)		
      this.user = this.applicant["applicant"];	
    }

  interviewApplicant(){
  	this._company.acceptApplicant({applicationId: this.applicant["application_id"]})
  	.subscribe(data => {
  		if (data["statusCode"] == "200"){
  			this.router.navigate(['company/jobs'])
  		} else  {
  			alert(data["message"])
  		}
  	})
  }

  reject(){
    this._company.rejectApplicant({applicationId: this.applicant["application_id"] })
  }

  downloadResume(){
    // this.upload.getFile(this.applicant["resumeURL"])
  }
}
