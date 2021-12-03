import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Input() username: string;

  @Output() onLogout = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = this.authService.whoAmI();
  }

  logout() {
    this.onLogout.emit();
  }

}
