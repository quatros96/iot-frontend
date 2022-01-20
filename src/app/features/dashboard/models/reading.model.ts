import { DocumentReference } from 'firebase/firestore'
import { IoTDevice } from './device.model'

export interface SensorReading {
    sensor: string
    reading: number
    timestamp?: number
    device?: DocumentReference<IoTDevice>
}
