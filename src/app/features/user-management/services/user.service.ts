// ============================================
// User Service
// Business logic for user-management feature
// ============================================

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../../core';
import { PaginatedResponse } from '../../../shared';
import { User, CreateUserDto, UpdateUserDto, UserFilters } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpService);
  private readonly baseUrl = '/api/users';

  // Mock data for demonstration
  private readonly mockUsers: User[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'manager',
      status: 'active',
      createdAt: '2024-02-20T14:30:00Z',
      updatedAt: '2024-02-20T14:30:00Z',
    },
    {
      id: '3',
      email: 'bob.wilson@example.com',
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'user',
      status: 'pending',
      createdAt: '2024-03-10T09:15:00Z',
      updatedAt: '2024-03-10T09:15:00Z',
    },
  ];

  getUsers(filters?: UserFilters): Observable<PaginatedResponse<User>> {
    // Mock implementation - replace with actual API call
    // return this.http.get<PaginatedResponse<User>>(this.baseUrl, filters);
    return of({
      data: this.mockUsers,
      total: this.mockUsers.length,
      page: filters?.page ?? 1,
      pageSize: filters?.pageSize ?? 10,
      totalPages: 1,
    });
  }

  getUserById(id: string): Observable<User> {
    // return this.http.get<User>(`${this.baseUrl}/${id}`);
    const user = this.mockUsers.find(u => u.id === id);
    return of(user!);
  }

  createUser(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, dto);
  }

  updateUser(id: string, dto: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, dto);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

