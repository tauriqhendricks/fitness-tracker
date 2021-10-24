import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IState>) { }

  ngOnInit(): void {

    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuth));

  }

  onToggleSidenav(): void {

    this.sidenavToggle.emit();

  }

  onLogout(): void {

    this.authService.logout();

  }

}
