// src/app/interceptors/admin-auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Only intercept admin API calls
  if (req.url.includes('/api/admin')) {
    if (isPlatformBrowser(platformId)) {
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        router.navigate(['/admin/login']);
        return next(req);
      }

      // Clone the request and add auth header
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${adminToken}`)
      });

      return next(authReq);
    }
  }

  return next(req);
};