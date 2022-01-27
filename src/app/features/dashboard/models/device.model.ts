import { IoTDeviceStatus } from './iot-device-state.model'

export interface IoTDevice {
    deviceName: string
    sensors: string[]
    online: boolean
    status: IoTDeviceStatus
    room?: string
}
