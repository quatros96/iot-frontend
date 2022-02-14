import { Injectable } from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'
import { SensorReading } from '@dashboard/models/reading.model'
import { DatabaseApiService } from './database-api.service'

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    constructor(private databaseApiService: DatabaseApiService) {}

    public isDeviceOnline(device: IoTDevice): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.databaseApiService
                .getDeviceLastTelemetryReading(device.deviceName)
                .then((readingQuerySnapshot) => {
                    const reading: SensorReading =
                        readingQuerySnapshot.docs[0].data()
                    const maxMinutesFromLastTelemetry: number = 10
                    const now = new Date().getTime()
                    if (
                        now - reading.timestamp >
                        maxMinutesFromLastTelemetry * 60 * 1000
                    ) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}
