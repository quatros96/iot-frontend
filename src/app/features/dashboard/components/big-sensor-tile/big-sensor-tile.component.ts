import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core'
import { SensorReading } from '@dashboard/models/reading.model'
import { ChartDataService } from '@dashboard/services/chart-data.service'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'iot-big-sensor-tile',
    templateUrl: './big-sensor-tile.component.html',
    styleUrls: ['./big-sensor-tile.component.scss'],
})
export class BigSensorTileComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription()

    public sensorDataValues: number[] = []
    public sensorDataLabels: Date[] = []

    @Input() device: string = ''
    @Input() sensor: string = ''

    constructor(
        private databaseApiService: DatabaseApiService,
        private chartDataService: ChartDataService,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService
                .getDeviceSensorReadings(this.device, this.sensor)
                .subscribe({
                    next: (readings) => {
                        let values: SensorReading[] = []
                        readings.forEach((reading) => {
                            values.push(reading.data())
                        })
                        const data =
                            this.chartDataService.getChartLabelsAndDataFromSensorReadings(
                                values
                            )
                        this.ngZone.run(() => {
                            this.sensorDataLabels = data.labels
                            this.sensorDataValues = data.data
                        })
                    },
                    complete: () => {},
                })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}
