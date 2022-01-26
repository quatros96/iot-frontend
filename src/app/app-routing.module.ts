import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UnauthorizedGuard } from '@auth/guards/unauthorized.guard'

const routes: Routes = [
    {
        path: 'dashboard',
        canLoad: [UnauthorizedGuard],
        loadChildren: () =>
            import('@dashboard/dashboard.module').then(
                (module) => module.DashboardModule
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('@auth/auth.module').then((module) => module.AuthModule),
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
