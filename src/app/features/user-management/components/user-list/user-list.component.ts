// ============================================
// User List Component
// Displays paginated list of users
// ============================================

import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, DataTableComponent, TableColumn, DropdownComponent, DropdownOption } from '../../../../ui';
import { UserService } from '../../services/user.service';
import { User, UserRole, UserStatus } from '../../models/user.model';

@Component({
  selector: 'feature-user-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DataTableComponent, DropdownComponent],
  template: `
    <div class="user-list">
      <div class="user-list__header">
        <h2>User Management</h2>
        <ui-button
          label="Add User"
          icon="pi pi-plus"
          (onClick)="onAddUser()"
        />
      </div>

      <div class="user-list__filters">
        <ui-dropdown
          [options]="roleOptions"
          placeholder="Filter by Role"
          [showClear]="true"
          (onChange)="onRoleFilter($event)"
        />
        <ui-dropdown
          [options]="statusOptions"
          placeholder="Filter by Status"
          [showClear]="true"
          (onChange)="onStatusFilter($event)"
        />
      </div>

      <ui-data-table
        [data]="users()"
        [columns]="columns"
        [loading]="loading()"
        [totalRecords]="totalRecords()"
        [rows]="10"
      />
    </div>
  `,
  styles: [`
    .user-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-6);
    }

    .user-list__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin: 0;
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
      }
    }

    .user-list__filters {
      display: flex;
      gap: var(--spacing-4);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly totalRecords = signal(0);

  readonly columns: TableColumn[] = [
    { field: 'firstName', header: 'First Name', sortable: true },
    { field: 'lastName', header: 'Last Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'role', header: 'Role', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
  ];

  readonly roleOptions: DropdownOption<UserRole>[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

  readonly statusOptions: DropdownOption<UserStatus>[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: response => {
        this.users.set(response.data);
        this.totalRecords.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onAddUser(): void {
    // Navigate to add user form or open dialog
    console.log('Add user clicked');
  }

  onRoleFilter(event: { value: UserRole }): void {
    console.log('Filter by role:', event.value);
    // Apply role filter
  }

  onStatusFilter(event: { value: UserStatus }): void {
    console.log('Filter by status:', event.value);
    // Apply status filter
  }
}

