import { Routes } from '@angular/router';

import { LoginComponentsComponent } from './login-components/login-components.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {path:"",
  component:MainPageComponent
},
  {
  path:"login",
  component: LoginComponentsComponent,
  }

];
