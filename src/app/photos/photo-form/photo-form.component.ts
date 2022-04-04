import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';

import {PhotoService} from '../photo/photo.service';
import {AlertService} from '../../shared/alert/alert.service';
import {UserService} from '../../core/user/user.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(private formBuilder: FormBuilder,
              private photoService: PhotoService,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    /* Foi criado a propriedade 'file: File', para carregar o valor binário do arquivo,
     pois através dp photoForm traria somente a referencia do arquivo,
     devido a isso foi colocado o (change)="file = $event.target.files[0]" para atribuir o valor a 'file:File'
    */
    const file = this.file;

    /*//removido para atribuir os valores individualmente
    const dados = this.photoForm.getRawValue();*/

    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;

    /*Foi necessário pegar o nome do usuario logado para redirecionar somente uma vez para a pagina dele,
    pois redirecionando para 'this.router.navigate([''])' a aplicação vai primeiro para '' e depois para '/user/username'
    assim afetando a logica de mostrar as notificações durante a navegação*/
    const userName = this.userService.getUserName();

    // foi colocado 'event: HttpEvent<any>' para poder lidar com o progresso de upload da foto
    this.photoService
      .upload(description, allowComments, file)
      .pipe(
        finalize(() => { this.router.navigate(['/user/' + userName]); }))
      .subscribe((event: HttpEvent<any>) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.alertService.success('Upload com sucesso!', true);
          }
        },
        err => {
          console.log(err);
          this.alertService.danger('Error no upload!', true);
        }
      );
  }

  removeFile() {
    this.photoForm.get('file').setValue('');
    this.preview = '';
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
