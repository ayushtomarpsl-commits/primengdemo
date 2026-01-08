// ============================================
// Dashboard Component
// Main dashboard view
// ============================================

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'feature-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      <p class="dashboard__subtitle">Welcome to the Enterprise Application</p>

      <div class="dashboard__cards">
        <div class="dashboard__card">
          <div class="dashboard__card-icon">
            <i class="pi pi-users"></i>
          </div>
          <div class="dashboard__card-content">
            <span class="dashboard__card-value">1,234</span>
            <span class="dashboard__card-label">Total Users</span>
          </div>
        </div>

        <div class="dashboard__card">
          <div class="dashboard__card-icon dashboard__card-icon--success">
            <i class="pi pi-check-circle"></i>
          </div>
          <div class="dashboard__card-content">
            <span class="dashboard__card-value">98.5%</span>
            <span class="dashboard__card-label">Uptime</span>
          </div>
        </div>

        <div class="dashboard__card">
          <div class="dashboard__card-icon dashboard__card-icon--warning">
            <i class="pi pi-exclamation-triangle"></i>
          </div>
          <div class="dashboard__card-content">
            <span class="dashboard__card-value">12</span>
            <span class="dashboard__card-label">Pending Tasks</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      h2 {
        margin: 0 0 var(--spacing-2);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--darkgrey);
      }
    }

    .dashboard__subtitle {
      color: var(--lightgrey);
      margin-bottom: var(--spacing-8);
    }

    .dashboard__cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-6);
    }

    .dashboard__card {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      padding: var(--spacing-6);
      background: var(--color-white);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      box-shadow: var(--card-box-shadow);
      transition: all 0.2s ease;

      &:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
      }
    }

    .dashboard__card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: var(--radius-lg);
      background: var(--primary-button-gradient);
      color: var(--color-white);
      font-size: 1.5rem;

      &--success {
        background: var(--green);
      }

      &--warning {
        background: var(--orange);
      }
    }

    .dashboard__card-content {
      display: flex;
      flex-direction: column;
    }

    .dashboard__card-value {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--darkgrey);
    }

    .dashboard__card-label {
      font-size: var(--font-size-sm);
      color: var(--lightgrey);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}

