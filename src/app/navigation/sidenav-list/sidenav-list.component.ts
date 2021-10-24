import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose: EventEmitter<void> = new EventEmitter<void>();

  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IState>) { }

  ngOnInit(): void {

    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuth));

  }

  onCloseSidenav(): void {

    this.sidenavClose.emit();

  }

  onLogout(): void {

    this.onCloseSidenav();
    this.authService.logout();

  }

}
