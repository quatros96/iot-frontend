export interface IoTDeviceStatus {
    deviceName: string
    currentState: number
    setState: number
    actuator: string
    lastChanged: number
}
