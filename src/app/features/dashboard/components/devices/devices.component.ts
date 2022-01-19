import { Component } from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'

@Component({
    selector: 'iot-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent {
    public devicesDataSource: IoTDevice[] = [
        {
            deviceName: 'esp1',
            online: true,
            sensors: ['temperature'],
            state: {
                sensor: 'temperature',
                reading: 15,
            },
            room: 'łazienka',
        },
        {
            deviceName: 'esp2',
            online: true,
            sensors: ['temperature', 'humidity'],
            state: {
                sensor: 'temperature',
                reading: 10,
            },
        },
        {
            deviceName: 'esp3',
            online: true,
            sensors: ['contractron'],
            state: {
                sensor: 'contractron',
                reading: 1,
            },
            room: 'sypialnia',
        },
        {
            deviceName: 'esp4',
            online: false,
            sensors: ['pollution'],
            state: {
                sensor: 'pollution',
                reading: 50,
            },
        },
    ]

    public displayedColumns: string[] = [
        'deviceName',
        'sensors',
        'state',
        'online',
        'room',
    ]

    constructor() {}
}
