import { SensorReading } from './reading.model'

export interface IoTDevice {
    deviceName: string
    sensors: string[]
    online: boolean
    state: SensorReading
    room?: string
}
