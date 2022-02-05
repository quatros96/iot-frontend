import { Pipe, PipeTransform } from '@angular/core'
import { IconNameService } from '@dashboard/services/icon-name.service'

@Pipe({
    name: 'sensorIcon',
})
export class SensorIconPipe implements PipeTransform {
    constructor(private iconNameService: IconNameService) {}

    transform(value: string): string {
        return this.iconNameService.getIconNameFromSensorName(value)
    }
}
