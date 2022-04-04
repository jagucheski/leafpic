import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private titleService: Title) {
  }

  ngOnInit(): void {
    //algoritmo criado para alterar o valor do title da pagina exibida.
    //ele capturar a rota da pagina exibida no momento e seta o title de acordo com valor 'title' contido no 'app.routing.module' e 'home.routing.module' e
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleService.setTitle(event.title));
  }

}
