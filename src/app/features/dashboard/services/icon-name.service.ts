import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class IconNameService {
    private readonly sensorIconNames: { [index: string]: string } = {
        temperature: 'device_thermostat',
        moveSensor: 'directions_walk',
        light: 'light_mode',
    }

    private readonly unknownDeviceIconName: string = 'home_mini'

    public getIconNameFromSensorName(sensor: string): string {
        if (sensor in this.sensorIconNames) {
            return this.sensorIconNames[sensor]
        }
        return this.unknownDeviceIconName
    }
}
