import { Routes } from '@angular/router';
import { VehicleFormComponent } from './features/vehicles/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'vehicles',
        children: [
          {
            path: '',
            component: VehicleListComponent
          },
          {
            path: 'new',
            component: VehicleFormComponent
          },
          {
            path: ':id/edit',
            component: VehicleFormComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: 'vehicles',
        pathMatch: 'full'
      }
    ]
  }
];
