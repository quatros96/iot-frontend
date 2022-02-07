import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IoTDevice } from '@dashboard/models/device.model'
import { Room } from '@dashboard/models/room.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'

@Component({
    selector: 'iot-add-device-to-room',
    templateUrl: './add-device-to-room.component.html',
    styleUrls: ['./add-device-to-room.component.scss'],
})
export class AddDeviceToRoomComponent {
    public selectedDevice: string = ''
    constructor(
        public dialogRef: MatDialogRef<AddDeviceToRoomComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { room: Room; devices: IoTDevice[] },
        private databaseApiService: DatabaseApiService
    ) {}

    public addSelectedDeviceToRoom(): void {
        this.databaseApiService
            .addDeviceToRoom(this.data.room, this.selectedDevice)
            .then(() => {
                this.dialogRef.close()
            })
    }
}
