import { Injectable } from '@angular/core'
import {
    Firestore,
    collectionData,
    collection,
    doc,
    DocumentReference,
    query,
    where,
    orderBy,
    QuerySnapshot,
    onSnapshot,
    getDocs,
    limitToLast,
    limit,
    updateDoc,
} from '@angular/fire/firestore'
import { IoTDevice } from '@dashboard/models/device.model'
import { IoTDeviceStatus } from '@dashboard/models/iot-device-state.model'
import { SensorReading } from '@dashboard/models/reading.model'
import { Room } from '@dashboard/models/room.model'
import { Observable } from 'rxjs'

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

    public getRooms(): Observable<Room[]> {
        const roomsCollection = collection(this.firestore, 'rooms')
        return collectionData(roomsCollection) as Observable<Room[]>
    }

    public getStatuses(): Observable<IoTDeviceStatus[]> {
        const statusCollection = collection(this.firestore, 'status')
        return collectionData(statusCollection) as Observable<IoTDeviceStatus[]>
    }

    public updateDeviceStatusSetState(deviceName: string, value: number) {
        const statusRef = doc(this.firestore, `status/${deviceName}`)
        updateDoc(statusRef, { setState: value })
            .then((response) => {})
            .catch((error) => {
                console.log(error)
            })
    }

    public getDeviceLastTelemetryReading(
        device: string
    ): Promise<QuerySnapshot<SensorReading>> {
        const sensorReadingsCollection = collection(this.firestore, 'telemetry')
        const q = query(
            sensorReadingsCollection,
            where('device', '==', `devices/${device}`),
            orderBy('timestamp', 'desc'),
            limit(1)
        )
        return getDocs(q) as Promise<QuerySnapshot<SensorReading>>
    }
}
