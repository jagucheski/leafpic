import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Photo} from '../photo/photo';
import {PhotoService} from '../photo/photo.service';
import {UserService} from '../../core/user/user.service';
import {LoadingService} from '../../shared/loading/loading.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private photoService: PhotoService) {
  }

  ngOnInit(): void {
    /*-Dessa maneira ocorre problema o angular não recarregar a pagina quando alteramos o param id do componente: de 'user/maj' para 'user/almeida',
      pois o angular entende que o componente ja foi carregado e nao chama o ngOnInit novamente-
        this.userName = this.activatedRoute.snapshot.params.userName;
        this.photos = this.activatedRoute.snapshot.data['photos'];*/
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) {
          this.hasMore = false;
        }
      });
  }
}
