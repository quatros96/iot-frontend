import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component'
import { HeaderComponent } from './components/header/header.component'
import { SharedModule } from '@shared/shared.module';
import { DevicesComponent } from './components/devices/devices.component';
import { FooterComponent } from './components/footer/footer.component'

@NgModule({
    declarations: [DashboardComponent, HeaderComponent, DevicesComponent, FooterComponent],
    imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
