import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {PhotoService} from '../photo/photo.service';
import {Photo} from '../photo/photo';
import {AlertService} from '../../shared/alert/alert.service';
import {UserService} from '../../core/user/user.service';

@Component({
  templateUrl: 'photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(private route: ActivatedRoute,
              private photoService: PhotoService,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(
      () => {
      },
      err => {
        console.log(err);
        this.alertService.warning('Erro to load photos', true);
        this.router.navigate(['not-found']);
      });
  }

  remove() {
    /*Foi necessário pegar o nome do usuario logado para redirecionar somente uma vez para a pagina dele,
    pois redirecionando para 'this.router.navigate([''])' a aplicação vai primeiro para '' e depois para '/user/username'
    assim afetando a logica de mostrar as notificações durante a navegação*/
    const userName = this.userService.getUserName();

    this.photoService
      .removePhoto(this.photoId)
      .subscribe(() => {
          this.alertService.success('Photo removed', true);
          this.router.navigate(['/user/' + userName], {replaceUrl: true});
        },
        err => this.alertService.warning('Could not delete this photo!', true));
  }

  like(photo: Photo) {
    this.photoService.like(photo.id).subscribe(
      liked => {
        if (liked) {
          this.photo$ = this.photoService.findById(photo.id);
        }
      }
    );

  }
}
