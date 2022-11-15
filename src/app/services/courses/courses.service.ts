import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICourseRes } from 'src/app/types/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly url: string = environment.url;
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getCourses(): Observable<{data: ICourseRes[]}> {
    return this.httpClient.get<{data: ICourseRes[]}>(`${this.url}/courses`);
  }

  createCourse({ name, description }: { name: string, description: string }) {
    return this.httpClient.post(`${this.url}/courses`, {
      name,
      description
    });
  }

}
