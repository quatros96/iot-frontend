import { Injectable } from '@angular/core'
import {
    Auth,
    signInWithEmailAndPassword,
    UserCredential,
    signOut,
} from '@angular/fire/auth'

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private fireAuth: Auth) {}

    public login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.fireAuth, email, password)
    }

    public logout(): Promise<void> {
        return signOut(this.fireAuth)
    }
}
