import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core'
import { IoTDevice } from '@dashboard/models/device.model'
import { IoTDeviceStatus } from '@dashboard/models/iot-device-state.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'

@Component({
    selector: 'iot-switch-tile',
    templateUrl: './switch-tile.component.html',
    styleUrls: ['./switch-tile.component.scss'],
})
export class SwitchTileComponent implements OnInit, OnChanges {
    @Input() device: IoTDevice = {
        deviceName: '',
        online: true,
        sensors: [],
        status: {
            actuator: '',
            currentState: 0,
            lastChanged: 0,
            setState: 0,
            deviceName: '',
        },
    }

    @Input() statuses: IoTDeviceStatus[] = []

    public status: IoTDeviceStatus = {
        actuator: '',
        currentState: 0,
        lastChanged: 0,
        setState: 0,
        deviceName: '',
    }

    constructor(private databaseApiService: DatabaseApiService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('statuses')) {
            const found = this.statuses.find(
                (status) => status.deviceName === this.device.deviceName
            )
            if (found) {
                this.status = found
            }
        }
    }

    public changeState(): void {
        this.databaseApiService.updateDeviceStatusSetState(
            this.status.deviceName,
            this.status.currentState === 1 ? 0 : 1
        )
    }
}
