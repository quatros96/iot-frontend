import { Component, OnInit } from '@angular/core'
import { LoginService } from '@auth/services/login.service'

@Component({
    selector: 'iot-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private loginService: LoginService) {}

    public logout(): void {
        this.loginService.logout()
    }
}
