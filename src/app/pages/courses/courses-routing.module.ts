import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CreateEditCoursesComponent } from './create-edit-courses/create-edit-courses.component';
import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: {
      title: 'Listagem de cursos'
    }
  },
  {
    path: ':id/edit',
    component: CreateEditCoursesComponent,
    data: {
      title: 'Editar curso'
    }
  },
  {
    path: 'create',
    component: CreateEditCoursesComponent,
    data: {
      title: 'Criar curso'
    }
  },
  { 
    path: ':id/details',
    component: ModulesComponent,
    data: {
      title: 'Detalhes do curso e módulos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
