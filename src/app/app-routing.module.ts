import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PostComponent } from './pages/post/post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'post',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    component: PostComponent,
  },
  {
    path: 'post/:id',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    component: PostComponent,
  },
  {
    path: 'view-post/:id',
    component: ViewPostComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
