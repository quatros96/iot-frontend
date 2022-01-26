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
            state: {
                sensor: 'temperature',
                reading: 15,
                device: '',
                timestamp: 0,
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
                device: '',
                timestamp: 0,
            },
        },
        {
            deviceName: 'esp3',
            online: true,
            sensors: ['contractron'],
            state: {
                sensor: 'contractron',
                reading: 1,
                device: '',
                timestamp: 0,
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
                device: '',
                timestamp: 0,
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
