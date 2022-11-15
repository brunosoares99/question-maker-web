import { take, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup = this.fb.group({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required, this.passwordMatchValidator]
    });
  }

  onSubmit(form: FormGroupDirective) {
    this.loading = true;
    const { name, email, password } = form.value;
    this.userService.createUser({ name, email, password}).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate(['/login'], { queryParams: { registered: true } });
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

  passwordMatchValidator = (formGroup: FormGroup): ValidationErrors | null => {
    return new Observable<ValidationErrors | null>(observer => {
      const parent = formGroup.parent as FormGroup
      if (!parent) {
        observer.next(null);
      }
     if(parent.get('password')?.value === parent.get('confirmPassword')?.value) {
        observer.next(null);
     } else {
      observer.next({ mismatch: true });
     }
      observer.complete();
    });
  }


}
