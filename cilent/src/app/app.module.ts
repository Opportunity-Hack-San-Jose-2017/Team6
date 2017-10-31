import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsService } from './common/services/jobs.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserService } from './common/services/user.service';
import { StepOneComponent } from './profile-setup/step-one/step-one.component';
import { StepTwoComponent } from './profile-setup/step-two/step-two.component';
import { StepThreeComponent } from './profile-setup/step-three/step-three.component';
import { SearchService } from './common/services/search.service';
import { CompanyService } from './common/services/company.service';
import { JobCellComponent } from './user-landing/job-cell/job-cell.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CompanyLoginComponent } from './company-home/company-login/company-login.component';
import { CompanyRegisterComponent } from './company-home/company-register/company-register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmployersLandingpageComponent } from './employers-landingpage/employers-landingpage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSetupComponent,
    UserLandingComponent,
    JobCellComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    JobCellComponent,
    JobListingComponent,
    CompanyHomeComponent,
    CompanyLoginComponent,
    CompanyRegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    EmployersLandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    SearchService,
    CompanyService,
    JobsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }