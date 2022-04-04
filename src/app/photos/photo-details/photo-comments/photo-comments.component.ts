import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {PhotoComment} from '../../photo/photo-comment';
import {PhotoService} from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: 'photo-comments.component.html',
  styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(private photoService: PhotoService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;

    /*-Forma simples porém s  recarregar a lista de comentários-
    this.photoService.addComments(this.photoId, comment)
      .subscribe(() => {
          this.commentForm.reset();
          alert('Comentário adicionado com sucesso!');
        },
        err => {
          console.log('Erro ao adicionar o comentário');
          console.log(err);
        });*/

    /*-Devido a necessidade de recarregar a lista de comentários após a adição é necessario fazer novo subscribe para 'getComments'-*/
    this.comments$ = this.photoService
      .addComments(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(tap(() => {
        this.commentForm.reset();
        this.commentForm.get('comment').setValue('');
      }));
  }
}
