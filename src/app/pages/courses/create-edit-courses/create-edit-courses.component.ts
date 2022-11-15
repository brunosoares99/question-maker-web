import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-create-edit-courses',
  templateUrl: './create-edit-courses.component.html',
  styleUrls: ['./create-edit-courses.component.scss']
})
export class CreateEditCoursesComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  loading: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly coursesService: CoursesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    })
  }

  onSubmit(form: FormGroupDirective) {
    this.loading = true;
    this.coursesService.createCourse(form.value).pipe(take(1)).subscribe({
      next: () => {
        this.matDialog.open(FeedbackComponent, {
          disableClose: true,
          data: {
            title: 'Sucesso!',
            message: 'Curso criado com sucesso, clique em "Ok" para continuar'
            }
        }).afterClosed().pipe(take(1)).subscribe({
          next: () => {
            this.router.navigate(['/courses']);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        this.matDialog.open(FeedbackComponent, {
          data: {
            title: 'Erro ao criar curso',
            message: err.error.message
            }
        });
        this.loading = false;
      }
    });
  }

}
