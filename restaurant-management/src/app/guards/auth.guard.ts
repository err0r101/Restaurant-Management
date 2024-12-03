import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Skip auth check during server-side rendering
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const isLoggedIn = localStorage.getItem('userMobile');
  const isAdmin = localStorage.getItem('adminToken');

  if (route.data['requiresAdmin'] && !isAdmin) {
    router.navigate(['/admin/login']);
    return false;
  }

  if (route.data['requiresAuth'] && !isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};