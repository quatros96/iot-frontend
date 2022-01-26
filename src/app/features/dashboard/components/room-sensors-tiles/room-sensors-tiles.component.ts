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
                    this.devices = devices
                },
            })
        )
    }
}
