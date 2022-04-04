import {FormGroup, ValidatorFn} from '@angular/forms';

export const usernamePassword: ValidatorFn = (formGroup: FormGroup) => {
  const userName = formGroup.get('userName').value;
  const password = formGroup.get('password').value;

  // primeiro verifica se os campos estao em branco
  if (userName.trim() + password.trim()) {
    // verifica se userName é igual a password
    return userName != password
      ? null
      : {userNamePassword: true};
  } else {
    return null;
  }
};
