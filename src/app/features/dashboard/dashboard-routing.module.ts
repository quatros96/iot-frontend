import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DevicesComponent } from './components/devices/devices.component'
import { SummaryComponent } from './components/summary/summary.component'
import { DashboardComponent } from './dashboard.component'

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'devices',
                component: DevicesComponent,
            },
            {
                path: '',
                component: SummaryComponent,
            },
            {
                path: '**',
                redirectTo: 'devices',
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
