import { Injectable } from '@angular/core'
import { ChartLabelsAndData } from '@dashboard/models/chart-labels-data.model'
import { SensorReading } from '@dashboard/models/reading.model'

@Injectable({
    providedIn: 'root',
})
export class ChartDataService {
    constructor() {}

    public getChartLabelsAndDataFromSensorReadings(
        sensorReadings: SensorReading[]
    ): ChartLabelsAndData {
        let values = sensorReadings.map((reading) => reading.reading)
        let labels = sensorReadings.map((reading) =>
            new Date(reading.timestamp).toLocaleString('pl-PL')
        )
        return { data: values, labels: labels }
    }
}
