import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'
import { IoTDeviceStatus } from '@dashboard/models/iot-device-state.model'
import { Room } from '@dashboard/models/room.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'iot-room-switch-tiles',
    templateUrl: './room-switch-tiles.component.html',
    styleUrls: ['./room-switch-tiles.component.scss'],
})
export class RoomSwitchTilesComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription()
    public devices: IoTDevice[] = []
    public statuses: IoTDeviceStatus[] = []
    @Input() room: Room = {
        roomName: '',
        devices: [],
    }

    constructor(
        private databaseApiService: DatabaseApiService,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService.getDevicesObservable().subscribe({
                next: (devices) => {
                    this.devices = this.filterDevices(devices)
                },
            })
        )
        this.subscriptions.add(
            this.databaseApiService.getStatuses().subscribe({
                next: (statuses) => {
                    this.ngZone.run(() => {
                        this.statuses = statuses
                    })
                },
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
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
