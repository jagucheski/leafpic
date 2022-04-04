import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserNotTakenValidatorService} from './user-not-taken.validator.service';
import {NewUser} from './new-user';
import {SignUpService} from './sign-up.service';
import {PlatformDetectorService} from '../../core/platform-detector/platform-detector.service';
import {AlertService} from '../../shared/alert/alert.service';
import {lowerCaseValidator} from '../../shared/validators/lower-case.validator';
import {usernamePassword} from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {

  singupform: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder,
              private userNotTakenValidatorService: UserNotTakenValidatorService,
              private signUpService: SignUpService,
              private router: Router,
              private platformDetectorService: PlatformDetectorService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.singupform = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator, // Foi implementado o lowerCaseValidator ao invés de utilizar o Validador do Angular=> Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken() // validador assincrono
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
      },
      {validator: usernamePassword} // valida se userName e Password são iguais,
                                         // como este validador foi colocado nesta posicao ele consegue validar todos os campos
    );

    this.platformDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus();
  }

  signup() {
    /*const email = this.singupform.get('email').value;
    const fullName = this.singupform.get('fullName').value;
    const userName = this.singupform.get('userName').value;
    const password = this.singupform.get('password').value;

    foi criado uma interface para os dados do formulario assim não precisamos capturar cada um dos campos separadamente*/

    if (this.singupform.valid && !this.singupform.pending) {
      const newUser = this.singupform.getRawValue() as NewUser;
      this.signUpService.signup(newUser)
        .subscribe(
          () => {
            this.alertService.success('User add!', true);
            this.router.navigate(['']);
          },
          err => {
            this.alertService.danger(`Didn't possible to add user!`, true);
            console.log(err);
          }
        );
    }



  }

}
