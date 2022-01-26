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
    onSnapshot,
    limit,
    limitToLast,
} from '@angular/fire/firestore'
import { IoTDevice } from '@dashboard/models/device.model'
import { SensorReading } from '@dashboard/models/reading.model'
import { Room } from '@dashboard/models/room.model'
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
        device: string,
        sensor: string
    ): Observable<QuerySnapshot<SensorReading>> {
        const sensorReadingsCollection = collection(this.firestore, 'telemetry')
        const q = query(
            sensorReadingsCollection,
            where('device', '==', `devices/${device}`),
            where('sensor', '==', sensor),
            orderBy('timestamp'),
            limitToLast(10)
        )
        const queryObservable = new Observable<QuerySnapshot<SensorReading>>(
            (subscriber) => {
                let unsub = onSnapshot(q, {
                    next: (querySnap) => {
                        subscriber.next(
                            querySnap as QuerySnapshot<SensorReading>
                        )
                    },
                    error: (error) => {
                        console.log(error)
                        subscriber.complete()
                    },
                })
            }
        )

        return queryObservable
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

    public getRooms(): Observable<Room[]> {
        const roomsCollection = collection(this.firestore, 'rooms')
        return collectionData(roomsCollection) as Observable<Room[]>
    }
}
