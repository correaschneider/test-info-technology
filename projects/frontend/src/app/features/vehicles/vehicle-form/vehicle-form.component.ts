import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { chassisValidator } from '../../../shared/validators/chassis.validator';
import { licensePlateValidator } from '../../../shared/validators/license-plate.validator';
import { renavamValidator } from '../../../shared/validators/renavam.validator';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="vehicle-form-container">
      <h1>{{ isEditMode ? 'Editar Veículo' : 'Novo Veículo' }}</h1>

      <form [formGroup]="vehicleForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Placa</mat-label>
          <input matInput maxlength="7" formControlName="plate" placeholder="Digite a placa do veículo">
          <mat-error *ngIf="vehicleForm.get('plate')?.hasError('required')">
            Placa é obrigatória
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('plate')?.hasError('invalidLength')">
            A placa deve ter exatamente 7 caracteres
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('plate')?.hasError('invalidLetters')">
            Os três primeiros caracteres devem ser letras
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('plate')?.hasError('invalidFormat')">
            Formato inválido. Use AAA9999 ou AAA9A99
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Chassi</mat-label>
          <input matInput maxlength="17" formControlName="chassi" placeholder="Digite o chassi do veículo">
          <mat-error *ngIf="vehicleForm.get('chassi')?.hasError('required')">
            Chassi é obrigatório
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('chassi')?.hasError('invalidLength')">
            O chassi deve ter exatamente 17 caracteres
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('chassi')?.hasError('invalidCharacters')">
            O chassi não pode conter as letras O, Q ou I
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('chassi')?.hasError('invalidWMI')">
            Os três primeiros caracteres (WMI) são inválidos
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('chassi')?.hasError('invalidVDS')">
            Os caracteres 4-9 (VDS) são inválidos
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('chassi')?.hasError('invalidVIS')">
            Os últimos 8 caracteres (VIS) são inválidos
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Renavam</mat-label>
          <input matInput
                 maxlength="11"
                 formControlName="renavam"
                 placeholder="Digite o Renavam do veículo"
                 type="number"
                 pattern="[0-9]*"
                 inputmode="numeric">
          <mat-error *ngIf="vehicleForm.get('renavam')?.hasError('required')">
            Renavam é obrigatório
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('renavam')?.hasError('nonNumeric')">
            O Renavam deve conter apenas números
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('renavam')?.hasError('invalidLength')">
            O Renavam deve ter 9 ou 11 dígitos
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('renavam')?.hasError('invalidCheckDigit')">
            O dígito verificador do Renavam é inválido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Modelo</mat-label>
          <input matInput formControlName="model" placeholder="Digite o modelo do veículo">
          <mat-error *ngIf="vehicleForm.get('model')?.hasError('required')">
            Modelo é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Marca</mat-label>
          <input matInput formControlName="brand" placeholder="Digite a marca do veículo">
          <mat-error *ngIf="vehicleForm.get('brand')?.hasError('required')">
            Marca é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Ano</mat-label>
          <input matInput
                 type="number"
                 formControlName="year"
                 [min]="minYear"
                 [max]="maxYear"
                 [step]="1"
                 placeholder="Digite o ano do veículo">
          <mat-error *ngIf="vehicleForm.get('year')?.hasError('required')">
            Ano é obrigatório
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('year')?.hasError('min')">
            O ano não pode ser menor que {{minYear}}
          </mat-error>
          <mat-error *ngIf="vehicleForm.get('year')?.hasError('max')">
            O ano não pode ser maior que {{maxYear}}
          </mat-error>
        </mat-form-field>

        <div class="actions">
          <button mat-button type="button" routerLink="/vehicles">Cancelar</button>
          <button mat-raised-button color="primary" type="submit"
                  [disabled]="!vehicleForm.valid || isLoading">
            {{ isEditMode ? 'Salvar' : 'Criar' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .vehicle-form-container
      max-width: 600px
      margin: 0 auto
      padding: 20px

    form
      display: flex
      flex-direction: column
      gap: 16px

    mat-form-field
      width: 100%

    .actions
      display: flex
      gap: 16px
      justify-content: flex-end
      margin-top: 24px
  `]
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  minYear: number;
  maxYear: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    this.minYear = currentYear - 50;
    this.maxYear = currentYear + 1;

    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required, licensePlateValidator()]],
      chassi: ['', [Validators.required, chassisValidator()]],
      renavam: ['', [Validators.required, renavamValidator()]],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [currentYear, [
        Validators.required,
        Validators.min(this.minYear),
        Validators.max(this.maxYear)
      ]],
    });

    // Add value change subscriptions for uppercase conversion
    this.vehicleForm.get('plate')?.valueChanges.subscribe(value => {
      if (value) {
        this.vehicleForm.get('plate')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });

    this.vehicleForm.get('chassi')?.valueChanges.subscribe(value => {
      if (value) {
        this.vehicleForm.get('chassi')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });

    this.vehicleForm.get('renavam')?.valueChanges.subscribe(value => {
      if (value) {
        this.vehicleForm.get('renavam')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadVehicle(id);
    }

    this.vehicleForm.get('plate')?.setValue('AAA9A99', { emitEvent: false });
    this.vehicleForm.get('chassi')?.setValue('9BWHE21JX24060831', { emitEvent: false });
    this.vehicleForm.get('renavam')?.setValue('76981392504', { emitEvent: false });
    this.vehicleForm.get('model')?.setValue('Gol', { emitEvent: false });
    this.vehicleForm.get('brand')?.setValue('Volkswagen', { emitEvent: false });
    this.vehicleForm.get('year')?.setValue(new Date().getFullYear(), { emitEvent: false });
  }

  loadVehicle(id: string): void {
    this.isLoading = true;
    this.vehicleService.getVehicle(id).subscribe({
      next: (vehicle) => {
        this.vehicleForm.patchValue({
          plate: vehicle.plate,
          chassi: vehicle.chassi,
          renavam: vehicle.renavam,
          model: vehicle.model,
          brand: vehicle.brand,
          year: vehicle.year,
        });
        this.isLoading = false;
      },
      error: (error) => {
        const errorMessage = error.error?.erro || 'Erro ao carregar veículo';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000
        });
        console.error('Error loading vehicle:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      this.isLoading = true;
      const vehicleData = {
        ...this.vehicleForm.value,
        year: Number(this.vehicleForm.value.year)
      };
      const id = this.route.snapshot.paramMap.get('id');

      const operation = id
        ? this.vehicleService.updateVehicle(id, vehicleData)
        : this.vehicleService.createVehicle(vehicleData);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            `Veículo ${this.isEditMode ? 'atualizado' : 'criado'} com sucesso`,
            'Fechar',
            { duration: 5000 }
          );
          this.router.navigate(['/vehicles']);
        },
        error: (error) => {
          const errorMessage = error.error?.error || `Erro ao ${this.isEditMode ? 'atualizar' : 'criar'} veículo`;
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000
          });
          console.error('Error saving vehicle:', error);
          this.isLoading = false;
        }
      });
    }
  }
}