import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromRoot from '../../app.reducer';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.IState>) { }

  canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // finish after gettig one value
    return this.store.pipe(select(fromRoot.getIsAuth)).pipe(take(1));

    // if (this.authService.isAuth())
    //   return true;

    // this.router.navigate(['/login']);
    // return false;

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // finish after gettig one value
    return this.store.pipe(select(fromRoot.getIsAuth)).pipe(take(1));

    // if (this.authService.isAuth())
    //   return true;

    // this.router.navigate(['/login']);
    // return false;

  }

}
