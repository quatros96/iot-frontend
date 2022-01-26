import { Component, OnDestroy, OnInit } from '@angular/core'
import { Room } from '@dashboard/models/room.model'
import { DatabaseApiService } from '@dashboard/services/database-api.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'iot-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription()

    public rooms: Room[] = []

    constructor(private databaseApiService: DatabaseApiService) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.databaseApiService.getRooms().subscribe({
                next: (rooms) => {
                    this.rooms = rooms
                },
            })
        )
        this.databaseApiService
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}
