import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { IoTDevice } from '@dashboard/models/device.model'
import { Room } from '@dashboard/models/room.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
import { Subscription } from 'rxjs'
import { AddDeviceToRoomComponent } from '../add-device-to-room/add-device-to-room.component'

@Component({
    selector: 'iot-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription()
    private sensorsFromInstalledDevicesSubscription: Subscription =
        new Subscription()

    public rooms: Room[] = []
    public devices: IoTDevice[] = []

    public roomsSensors: Map<string, string[]> = new Map()
    constructor(
        private databaseApiService: DatabaseApiService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService.getRooms().subscribe({
                next: (rooms) => {
                    this.sensorsFromInstalledDevicesSubscription.unsubscribe()
                    this.rooms = rooms
                    this.rooms.forEach((room) => {
                        this.roomsSensors.set(room.roomName, [])
                    })
                    this.getSensorsFromInstalledDevices()
                },
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        this.sensorsFromInstalledDevicesSubscription.unsubscribe()
    }

    private getSensorsFromInstalledDevices(): void {
        this.sensorsFromInstalledDevicesSubscription = this.databaseApiService
            .getDevicesObservable()
            .subscribe({
                next: (devices) => {
                    this.devices = devices
                    this.clearRoomsSensors()
                    devices.forEach((device) => {
                        const foundRooms = this.rooms.filter((room) => {
                            return room.devices.includes(
                                `/devices/${device.deviceName}`
                            )
                        })
                        if (foundRooms) {
                            foundRooms.forEach((room) => {
                                this.roomsSensors
                                    .get(room.roomName)
                                    ?.push(...device.sensors)
                            })
                        }
                    })
                },
            })
    }

    private clearRoomsSensors(): void {
        this.roomsSensors.forEach((value, key) => {
            this.roomsSensors.set(key, [])
        })
    }

    public openAddDeviceDialog(room: Room) {
        const dialogRef = this.dialog.open<
            AddDeviceToRoomComponent,
            { room: Room; devices: IoTDevice[] }
        >(AddDeviceToRoomComponent, {
            width: '400px',
            data: {
                room: room,
                devices: this.devices.filter(
                    (device) =>
                        !room.devices.includes(`/devices/${device.deviceName}`)
                ),
            },
        })
    }

    public removeDeviceFromRoom(room: Room, device: string): void {
        this.databaseApiService.removeDeviceFromRoom(room, device)
    }
}
