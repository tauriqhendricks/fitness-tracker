import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose: EventEmitter<void> = new EventEmitter<void>();

  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {

        this.isAuth = authStatus;

      });

  }

  onCloseSidenav(): void {

    this.sidenavClose.emit();

  }

  onLogout(): void {

    this.onCloseSidenav();
    this.authService.logout();

  }

  ngOnDestroy(): void {

    this.authSubscription.unsubscribe();

  }

}
