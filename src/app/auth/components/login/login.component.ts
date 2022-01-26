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
export class LoginComponent implements OnInit {
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

    ngOnInit(): void {
        console.log('init')
    }

    get email(): AbstractControl | null {
        return this.loginFormGroup.get('email')
    }

    get password(): AbstractControl | null {
        return this.loginFormGroup.get('password')
    }

    public login(): void {
        console.log('login start')
        if (this.email && this.password) {
            this.loginService
                .login(this.email.value, this.password.value)
                .then((response) => {
                    console.log('Logged in')
                    console.log(response)
                    this.router.navigate(['dashboard'])
                })
                .catch((error) => {
                    console.log('Login error')
                    console.log(error)
                })
        }
    }
}
