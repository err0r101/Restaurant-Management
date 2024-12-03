import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { TableBookingComponent } from './components/table-booking/table-booking.component'; 
import { OrdersComponent } from './components/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminMenuComponent} from './components/admin/admin-menu/admin-menu.component';
import { AdminOrdersComponent} from './components/admin/admin-orders/admin-orders.component';
import { AdminUsersComponent} from './components/admin/admin-users/admin-users.component';
import { AdminBookingsComponent} from './components/admin/admin-bookings/admin-bookings.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/login', component: AdminLoginComponent },

  // Protected routes
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent,
    canActivate: [authGuard],
    data: { requiresAuth: true }
  },
  { 
    path: 'menu', 
    component: MenuComponent
  },
  { 
    path: 'cart', 
    component: CartComponent
  },
  { 
    path: 'checkout', 
    component: CheckoutComponent
  },
  { 
    path: 'book-table', 
    component: TableBookingComponent,
    canActivate: [authGuard],
    data: { requiresAuth: true }
  },
  { 
    path: 'orders', 
    component: OrdersComponent,
    canActivate: [authGuard],
    data: { requiresAuth: true }
  },

  // Admin routes
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },
  { 
    path: 'admin/menu', 
    component: AdminMenuComponent,
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent,
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },
  { 
    path: 'admin/users', 
    component: AdminUsersComponent,
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },
  { 
    path: 'admin/bookings', 
    component: AdminBookingsComponent,
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },

  // Wildcard route
  { path: '**', redirectTo: '/login' }
];