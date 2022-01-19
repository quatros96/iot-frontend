import { Component } from '@angular/core'

@Component({
    selector: 'iot-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    public date: Date = new Date()

    constructor() {}
}
