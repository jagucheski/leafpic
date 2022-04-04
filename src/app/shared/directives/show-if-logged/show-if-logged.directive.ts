import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../../core/user/user.service';

@Directive({
  selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  currentDisplay: string;

  constructor(private element: ElementRef<any>,
              private render: Renderer2,
              private userService: UserService) {
  }

  ngOnInit(): void {
    //!this.userService.isLogged() && this.render.setStyle(this.element.nativeElement, 'display', 'none');

    //código alterado para poder capturar se o usuario esta logado e atualizar o menu
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
    this.userService.getUser().subscribe(user => {
      if (user) {
        this.render.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
      } else {
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.render.setStyle(this.element.nativeElement, 'display', 'none');
      }
    });

  }

}
