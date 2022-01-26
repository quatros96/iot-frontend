import { Injectable } from '@angular/core'
import { Auth, onAuthStateChanged } from '@angular/fire/auth'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UnauthorizedGuard implements CanLoad {
    constructor(private fireAuth: Auth, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable((subscriber) => {
            this.fireAuth.onAuthStateChanged({
                next: (user) => {
                    console.log('test')
                    if (user) {
                        subscriber.next(true)
                        subscriber.complete()
                    } else {
                        this.router.navigate(['auth/login'])
                    }
                },
                error: (error) => console.log(error),
                complete: () => {},
            })
        })
    }
}
