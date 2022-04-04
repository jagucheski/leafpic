import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService} from '../../core/auth/auth.service';
import {PlatformDetectorService} from '../../core/platform-detector/platform-detector.service';
import {AlertService} from '../../shared/alert/alert.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  fromUrl: '';
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //pega a que query params 'fromUrl'
    this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticated(userName, password)
      .subscribe(
        () => {
          this.fromUrl ? this.router.navigate([this.fromUrl]) : this.router.navigate(['user/', userName]);
        },
        err => {
          this.loginForm.reset();
          this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
          this.alertService.danger('Invalid userName or password');
        }
      );
  }

}
