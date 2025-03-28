import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Vehicle, VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule
  ],
  template: `
    <div class="vehicle-list-container">
      <div class="header">
        <h1>Veículos</h1>
        <button mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon>
          Novo Veículo
        </button>
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="vehicles">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let vehicle"> {{vehicle.id}} </td>
          </ng-container>

          <ng-container matColumnDef="plate">
            <th mat-header-cell *matHeaderCellDef> Placa </th>
            <td mat-cell *matCellDef="let vehicle"> {{vehicle.plate}} </td>
          </ng-container>

          <ng-container matColumnDef="chassi">
            <th mat-header-cell *matHeaderCellDef> Chassi </th>
            <td mat-cell *matCellDef="let vehicle"> {{vehicle.chassi}} </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Ações </th>
            <td mat-cell *matCellDef="let vehicle">
              <button mat-icon-button color="primary" [routerLink]="[vehicle.id, 'edit']">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteVehicle(vehicle)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .vehicle-list-container
      padding: 20px

    .header
      display: flex
      justify-content: space-between
      align-items: center
      margin-bottom: 20px

    .table-container
      position: relative
      min-height: 200px
      max-height: 400px
      overflow: auto

    table
      width: 100%

    .mat-column-actions
      width: 120px
      text-align: center
  `]
})
export class VehicleListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'plate', 'chassi', 'actions'];
  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar veículos', 'Fechar', {
          duration: 3000
        });
        console.error('Error loading vehicles:', error);
      }
    });
  }

  deleteVehicle(vehicle: Vehicle): void {
    if (confirm(`Tem certeza que deseja excluir o veículo ${vehicle.plate}?`)) {
      this.vehicleService.deleteVehicle(vehicle.id).subscribe({
        next: () => {
          this.snackBar.open('Veículo excluído com sucesso', 'Fechar', {
            duration: 3000
          });
          this.loadVehicles();
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir veículo', 'Fechar', {
            duration: 3000
          });
          console.error('Error deleting vehicle:', error);
        }
      });
    }
  }
}