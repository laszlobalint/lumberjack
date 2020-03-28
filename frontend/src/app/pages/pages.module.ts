import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductsModule } from './products/products.module';
import { PagesComponent } from './_pages/pages.component';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule, DashboardModule, ProductsModule],
  declarations: [PagesComponent],
})
export class PagesModule {}
