import { Component, OnDestroy, OnInit } from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'
import { SensorReading } from '@dashboard/models/reading.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
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
            room: 'łazienka',
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
            room: 'sypialnia',
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
        },
    ]

    public displayedColumns: string[] = [
        'deviceName',
        'sensors',
        'state',
        'online',
        'room',
    ]

    private subscriptions: Subscription = new Subscription()

    public dataForChart: SensorReading[] = []

    constructor(private databaseApiService: DatabaseApiService) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService.getDevicesObservable().subscribe({
                next: (devices) => {
                    this.devicesDataSource = devices
                },
            })
        )

        // TODO: delete this after moving to another component
        // const deviceRef =
        //     this.databaseApiService.getDeviceReference('esp32_test')
        // this.subscriptions.add(
        //     this.databaseApiService
        //         .getDeviceSensorReadings(deviceRef, 'temperature')
        //         .subscribe({
        //             next: (querySnap) => {
        //                 let result: SensorReading[] = []
        //                 querySnap.forEach((element) => {
        //                     result.push(element.data())
        //                 })
        //                 console.log(result)
        //                 this.dataForChart = result
        //             },
        //         })
        // )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}
