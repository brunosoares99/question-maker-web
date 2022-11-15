import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({});
  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.activatedRoute.queryParams.pipe(take(1)).subscribe({
      next: ({ registered }) => {
        if (registered) {
          this.matDialog.open(FeedbackComponent, {
            data: {
              title: 'Sua conta foi criada com sucesso',
              message: 'Você já pode fazer login na plataforma'
            }
          })
        }
      }
    })
  }

  onSubmit(form: FormGroupDirective) {
    this.loading = true;
    this.authService.authUser(form.value).pipe(take(1)).subscribe({
      next: ({ token }) => {
        this.authService.authRoutine(token);
        this.router.navigate(['/courses']);
        this.loading = false;
      },
      error: (err) => {
        this.matDialog.open(FeedbackComponent, {
          data: {
            title: 'Erro ao criar conta',
            message: err.error.message
            }
        });
        this.loading = false;
      }
    });
  }

}
