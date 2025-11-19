import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CosmeticsDetailComponent } from './cosmetics-detail/cosmetics-detail.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'cosmetic/:id', component: CosmeticsDetailComponent },
];
