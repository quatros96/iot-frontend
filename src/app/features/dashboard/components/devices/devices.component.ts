import { Component, OnDestroy, OnInit } from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'
import { SensorReading } from '@dashboard/models/reading.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
import { DeviceService } from '@dashboard/services/device.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'iot-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit, OnDestroy {
    public devicesDataSource: IoTDevice[] = [
        {
            deviceName: 'esp1',
            online: true,
            sensors: ['temperature'],
            status: {
                actuator: '',
                setState: 0,
                currentState: 0,
                lastChanged: 0,
                deviceName: '',
            },
            frequency: 0,
        },
        {
            deviceName: 'esp2',
            online: true,
            sensors: ['temperature', 'humidity'],
            status: {
                actuator: '',
                setState: 0,
                currentState: 0,
                lastChanged: 0,
                deviceName: '',
            },
            frequency: 0,
        },
        {
            deviceName: 'esp3',
            online: true,
            sensors: ['contractron'],
            status: {
                actuator: '',
                setState: 0,
                currentState: 0,
                lastChanged: 0,
                deviceName: '',
            },
            frequency: 0,
        },
        {
            deviceName: 'esp4',
            online: false,
            sensors: ['pollution'],
            status: {
                actuator: '',
                setState: 0,
                currentState: 0,
                lastChanged: 0,
                deviceName: '',
            },
            frequency: 0,
        },
    ]

    public displayedColumns: string[] = ['deviceName', 'sensors', 'online']

    public deviceStatusMap: Map<string, Promise<boolean>> = new Map<
        string,
        Promise<boolean>
    >()

    private subscriptions: Subscription = new Subscription()
    private intervals: number[] = []

    constructor(
        private databaseApiService: DatabaseApiService,
        public deviceService: DeviceService
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService.getDevicesObservable().subscribe({
                next: (devices) => {
                    this.clearIntervals()
                    this.devicesDataSource = devices
                    this.devicesDataSource.forEach((device) => {
                        this.addDeviceToStatusMap(device)
                        const intervalID = window.setInterval(
                            () => this.addDeviceToStatusMap(device),
                            this.convertMinutesToMiliseconds(device.frequency)
                        )
                        this.intervals.push(intervalID)
                    })
                },
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        this.clearIntervals()
    }

    private addDeviceToStatusMap(device: IoTDevice): void {
        this.deviceStatusMap.set(
            device.deviceName,
            this.deviceService.isDeviceOnline(device)
        )
    }

    private convertMinutesToMiliseconds(minutes: number): number {
        return minutes * 60 * 1000
    }

    private clearIntervals(): void {
        this.intervals.forEach((id) => {
            window.clearInterval(id)
        })
        this.intervals.length = 0
    }
}
