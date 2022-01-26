import { Component, OnInit } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { LoginService } from '@auth/services/login.service'

@Component({
    selector: 'iot-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public loginFormGroup: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    get email(): AbstractControl | null {
        return this.loginFormGroup.get('email')
    }

    get password(): AbstractControl | null {
        return this.loginFormGroup.get('password')
    }

    public login(): void {
        if (this.email && this.password) {
            this.loginService
                .login(this.email.value, this.password.value)
                .then((response) => {
                    this.router.navigate(['dashboard'])
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
