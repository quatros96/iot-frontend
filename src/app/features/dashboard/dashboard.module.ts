import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component'
import { HeaderComponent } from './components/header/header.component'
import { SharedModule } from '@shared/shared.module';
import { DevicesComponent } from './components/devices/devices.component';
import { FooterComponent } from './components/footer/footer.component';
import { SummaryComponent } from './components/summary/summary.component';
import { BigSensorTileComponent } from './components/big-sensor-tile/big-sensor-tile.component';
import { LineChartComponent } from './components/big-sensor-tile/line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { RoomSensorsTilesComponent } from './components/room-sensors-tiles/room-sensors-tiles.component';
import { SwitchTileComponent } from './components/switch-tile/switch-tile.component';
import { RoomSwitchTilesComponent } from './components/room-switch-tiles/room-switch-tiles.component'

@NgModule({
    declarations: [DashboardComponent, HeaderComponent, DevicesComponent, FooterComponent, SummaryComponent, BigSensorTileComponent, LineChartComponent, RoomSensorsTilesComponent, SwitchTileComponent, RoomSwitchTilesComponent],
    imports: [CommonModule, DashboardRoutingModule, SharedModule, NgChartsModule],
})
export class DashboardModule {}
