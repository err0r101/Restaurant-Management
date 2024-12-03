// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('adminToken')) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};