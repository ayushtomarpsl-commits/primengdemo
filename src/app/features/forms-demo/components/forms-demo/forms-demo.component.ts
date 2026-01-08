// ============================================
// Forms Demo Component
// Showcases all form elements
// ============================================

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputComponent,
  DropdownComponent,
  DropdownOption,
  DatePickerComponent,
  TextareaComponent,
  CheckboxComponent,
  RadioGroupComponent,
  RadioOption,
  InputNumberComponent,
  MultiSelectComponent,
  MultiSelectOption,
  SwitchComponent,
} from '../../../../ui';
import { NotificationService } from '../../../../core';

@Component({
  selector: 'feature-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    DropdownComponent,
    DatePickerComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioGroupComponent,
    InputNumberComponent,
    MultiSelectComponent,
    SwitchComponent,
  ],
  template: `
    <div class="forms-demo">
      <div class="forms-demo__header">
        <h2>Form Elements Demo</h2>
        <p>Showcase of all PrimeNG form wrapper components</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="forms-demo__form">
        <!-- Personal Information Section -->
        <div class="form-section">
          <h3 class="form-section__title">
            <i class="pi pi-user"></i>
            Personal Information
          </h3>

          <div class="form-grid">
            <div class="form-field">
              <label for="firstName">First Name *</label>
              <ui-input
                formControlName="firstName"
                placeholder="Enter first name"
              />
              @if (form.get('firstName')?.invalid && form.get('firstName')?.touched) {
                <small class="form-error">First name is required</small>
              }
            </div>

            <div class="form-field">
              <label for="lastName">Last Name *</label>
              <ui-input
                formControlName="lastName"
                placeholder="Enter last name"
              />
              @if (form.get('lastName')?.invalid && form.get('lastName')?.touched) {
                <small class="form-error">Last name is required</small>
              }
            </div>

            <div class="form-field">
              <label for="email">Email *</label>
              <ui-input
                formControlName="email"
                type="email"
                placeholder="Enter email address"
              />
              @if (form.get('email')?.invalid && form.get('email')?.touched) {
                <small class="form-error">Valid email is required</small>
              }
            </div>

            <div class="form-field">
              <label for="phone">Phone Number</label>
              <ui-input
                formControlName="phone"
                type="tel"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        <!-- Date & Numbers Section -->
        <div class="form-section">
          <h3 class="form-section__title">
            <i class="pi pi-calendar"></i>
            Date & Numbers
          </h3>

          <div class="form-grid">
            <div class="form-field">
              <label for="birthDate">Birth Date</label>
              <ui-datepicker
                formControlName="birthDate"
                placeholder="Select birth date"
                [showButtonBar]="true"
              />
            </div>

            <div class="form-field">
              <label for="appointmentDate">Appointment Date & Time</label>
              <ui-datepicker
                formControlName="appointmentDate"
                placeholder="Select date and time"
                [showTime]="true"
                dateFormat="dd/mm/yy"
              />
            </div>

            <div class="form-field">
              <label for="age">Age</label>
              <ui-input-number
                formControlName="age"
                placeholder="Enter age"
                [min]="0"
                [max]="150"
                [showButtons]="true"
              />
            </div>

            <div class="form-field">
              <label for="salary">Expected Salary</label>
              <ui-input-number
                formControlName="salary"
                placeholder="Enter salary"
                mode="currency"
                currency="USD"
                [minFractionDigits]="2"
              />
            </div>
          </div>
        </div>

        <!-- Selection Section -->
        <div class="form-section">
          <h3 class="form-section__title">
            <i class="pi pi-list"></i>
            Selection Options
          </h3>

          <div class="form-grid">
            <div class="form-field">
              <label for="country">Country *</label>
              <ui-dropdown
                formControlName="country"
                [options]="countryOptions"
                placeholder="Select a country"
                [filter]="true"
                [showClear]="true"
              />
              @if (form.get('country')?.invalid && form.get('country')?.touched) {
                <small class="form-error">Country is required</small>
              }
            </div>

            <div class="form-field">
              <label for="skills">Skills</label>
              <ui-multiselect
                formControlName="skills"
                [options]="skillOptions"
                placeholder="Select skills"
                display="chip"
              />
            </div>

            <div class="form-field">
              <label>Gender</label>
              <ui-radio-group
                formControlName="gender"
                [options]="genderOptions"
                styleClass="horizontal"
              />
            </div>

            <div class="form-field">
              <label>Experience Level</label>
              <ui-radio-group
                formControlName="experience"
                [options]="experienceOptions"
              />
            </div>
          </div>
        </div>

        <!-- Additional Information Section -->
        <div class="form-section">
          <h3 class="form-section__title">
            <i class="pi pi-info-circle"></i>
            Additional Information
          </h3>

          <div class="form-grid form-grid--single">
            <div class="form-field">
              <label for="bio">Bio / Description</label>
              <ui-textarea
                formControlName="bio"
                placeholder="Tell us about yourself..."
                [rows]="4"
                [autoResize]="true"
              />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-field">
              <ui-checkbox
                formControlName="newsletter"
                label="Subscribe to newsletter"
              />
            </div>

            <div class="form-field">
              <ui-checkbox
                formControlName="terms"
                label="I agree to the terms and conditions *"
              />
              @if (form.get('terms')?.invalid && form.get('terms')?.touched) {
                <small class="form-error">You must accept the terms</small>
              }
            </div>

            <div class="form-field">
              <ui-switch
                formControlName="notifications"
                label="Enable notifications"
              />
            </div>

            <div class="form-field">
              <ui-switch
                formControlName="darkMode"
                label="Dark mode"
              />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <ui-button
            label="Reset"
            variant="outlined"
            icon="pi pi-refresh"
            (onClick)="onReset()"
          />
          <ui-button
            label="Submit"
            icon="pi pi-check"
            type="submit"
            [disabled]="form.invalid"
            [loading]="submitting()"
          />
        </div>
      </form>

      <!-- Form Values Preview -->
      <div class="form-preview">
        <h3>Form Values (Debug)</h3>
        <pre>{{ form.value | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .forms-demo {
      max-width: 1000px;
      margin: 0 auto;
    }

    .forms-demo__header {
      margin-bottom: var(--spacing-8);

      h2 {
        margin: 0 0 var(--spacing-2);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
      }

      p {
        color: var(--text-secondary);
        margin: 0;
      }
    }

    .forms-demo__form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-8);
    }

    .form-section {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
    }

    .form-section__title {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      margin: 0 0 var(--spacing-6);
      padding-bottom: var(--spacing-4);
      border-bottom: 1px solid var(--surface-border);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);

      i {
        color: var(--color-primary);
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-6);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .form-grid--single {
      grid-template-columns: 1fr;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);

      label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
      }
    }

    .form-error {
      color: var(--color-danger);
      font-size: var(--font-size-xs);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-4);
      padding-top: var(--spacing-4);
    }

    .form-preview {
      margin-top: var(--spacing-8);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);

      h3 {
        margin: 0 0 var(--spacing-4);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        color: var(--text-secondary);
      }

      pre {
        margin: 0;
        padding: var(--spacing-4);
        background: var(--surface-ground);
        border-radius: var(--radius-md);
        font-family: var(--font-family-mono);
        font-size: var(--font-size-sm);
        color: var(--text-primary);
        overflow-x: auto;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsDemoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly notification = inject(NotificationService);

  readonly submitting = signal(false);

  // Dropdown options
  readonly countryOptions: DropdownOption<string>[] = [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
    { label: 'India', value: 'IN' },
    { label: 'Japan', value: 'JP' },
  ];

  // MultiSelect options
  readonly skillOptions: MultiSelectOption<string>[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'SQL', value: 'sql' },
  ];

  // Radio options
  readonly genderOptions: RadioOption<string>[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  readonly experienceOptions: RadioOption<string>[] = [
    { label: 'Entry Level (0-2 years)', value: 'entry' },
    { label: 'Mid Level (3-5 years)', value: 'mid' },
    { label: 'Senior (5-10 years)', value: 'senior' },
    { label: 'Expert (10+ years)', value: 'expert' },
  ];

  // Form definition
  readonly form: FormGroup = this.fb.group({
    // Personal Information
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],

    // Date & Numbers
    birthDate: [null],
    appointmentDate: [null],
    age: [null],
    salary: [null],

    // Selection
    country: ['', Validators.required],
    skills: [[]],
    gender: [''],
    experience: [''],

    // Additional
    bio: [''],
    newsletter: [false],
    terms: [false, Validators.requiredTrue],
    notifications: [true],
    darkMode: [false],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitting.set(true);

      // Simulate API call
      setTimeout(() => {
        this.submitting.set(false);
        this.notification.success({
          summary: 'Success',
          detail: 'Form submitted successfully!',
        });
        console.log('Form values:', this.form.value);
      }, 1500);
    } else {
      this.form.markAllAsTouched();
      this.notification.error({
        summary: 'Validation Error',
        detail: 'Please fill in all required fields.',
      });
    }
  }

  onReset(): void {
    this.form.reset({
      notifications: true,
      darkMode: false,
      newsletter: false,
      terms: false,
      skills: [],
    });
    this.notification.info({
      summary: 'Form Reset',
      detail: 'All fields have been cleared.',
    });
  }
}

