import { Component, Input, OnInit } from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'
import { Room } from '@dashboard/models/room.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'iot-room-sensors-tiles',
    templateUrl: './room-sensors-tiles.component.html',
    styleUrls: ['./room-sensors-tiles.component.scss'],
})
export class RoomSensorsTilesComponent implements OnInit {
    private subscriptions: Subscription = new Subscription()
    public devices: IoTDevice[] = []
    @Input() room: Room = {
        roomName: '',
        devices: [],
    }

    constructor(private databaseApiService: DatabaseApiService) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService.getDevicesObservable().subscribe({
                next: (devices) => {
                    this.devices = this.filterDevices(devices)
                },
            })
        )
    }

    private filterDevices(devices: IoTDevice[]): IoTDevice[] {
        let result: IoTDevice[] = []
        this.room.devices.forEach((deviceString: string) => {
            let foundDevice = devices.find(
                (device) => `/devices/${device.deviceName}` === deviceString
            )
            if (foundDevice) {
                result.push(foundDevice)
            }
        })
        return result
    }
}
