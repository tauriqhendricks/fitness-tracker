import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  isAuth: boolean = false;
  authSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authSubs = this.authService.authChange.subscribe(
      authStatus => {

        this.isAuth = authStatus;

      }
    );

  }

  onToggleSidenav(): void {

    this.sidenavToggle.emit();

  }

  onLogout(): void {

    this.authService.logout();

  }

  ngOnDestroy(): void {

    if (this.authSubs)
      this.authSubs.unsubscribe();

  }


}
