import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular7-data-table';
import { CustomFormsModule } from 'ng2-validation';
import { environment } from './../environments/environment';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AdminAuthGuardService } from './services/admin-auth-guard/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { UserService } from './services/user/user.service';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { ProductFilterComponent } from './shared/product-filter/product-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    // NgbModule.forRoot(),
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'admin/products/new',
        component: ProductFormComponent
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ]),
    NoopAnimationsModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
