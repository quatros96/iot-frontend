import { Injectable } from '@angular/core'
import {
    Firestore,
    collectionData,
    collection,
    doc,
    DocumentReference,
    query,
    where,
    getDocs,
    orderBy,
    QuerySnapshot,
} from '@angular/fire/firestore'
import { IoTDevice } from '@dashboard/models/device.model'
import { SensorReading } from '@dashboard/models/reading.model'
import { from, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class DatabaseApiService {
    constructor(private firestore: Firestore) {}

    public getDevicesObservable(): Observable<IoTDevice[]> {
        const deviceCollection = collection(this.firestore, 'devices')
        return collectionData(deviceCollection) as Observable<IoTDevice[]>
    }

    public getDeviceSensorReadings(
        device: DocumentReference<IoTDevice>,
        sensor: string
    ): Observable<QuerySnapshot<SensorReading>> {
        const sensorReadingsCollection = collection(this.firestore, 'telemetry')
        const q = query(
            sensorReadingsCollection,
            where('device', '==', device),
            where('sensor', '==', sensor),
            orderBy('timestamp')
        )
        return from(getDocs(q)) as Observable<QuerySnapshot<SensorReading>>
    }

    public getDeviceReference(
        deviceName: string
    ): DocumentReference<IoTDevice> {
        const deviceRef = doc(
            this.firestore,
            `devices/${deviceName}`
        ) as DocumentReference<IoTDevice>
        return deviceRef
    }
}
