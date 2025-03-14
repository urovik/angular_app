import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule, NgForm} from "@angular/forms";

import { Observable } from 'rxjs';



interface User{
    email: string,
    name: string,
    age: number,
    birth: Date
  }

//interface userId {
  //id: number;

//}




@Component({
  selector: 'app-login-components',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './login-components.component.html',
  styleUrl: './login-components.component.css'
})

export class LoginComponentsComponent {
  title = 'login'
  users: User[] = [];
  error: any;


  constructor(private http: HttpClient) {} // Inject HttpClient here

   onSubmitDelete(form:NgForm){
    const body = {
      id: form.value.id
    }

    this.http.delete(`http://194.87.56.253:8082/users/${body.id}`).subscribe({
      next: (response) => {
        console.log("пользователь удален", response);
        form.resetForm();
      },
      error: (error) => {
        console.error("There was an error!", error);
    }
  });

  }
  onSubmitAll(form:NgForm){
    this.getUsers().subscribe(
      (data: User[]) => {
        this.users = data; // Сохраняем полученные данные в массив users
        console.log('Полученные пользователи:', this.users);
        form.resetForm();
      },
      (error) => {
        this.error = error; // Сохраняем ошибку в случае неудачи
        console.error('Ошибка при получении пользователей:', this.error);
      }
    );
  }
  onSubmit(form: NgForm) {
    const body = {
      name: form.value.name,
      email: form.value.email,
      birth: form.value.birth
    };

    console.log(body);

    //POST request to the backend
    this.http.post("http://194.87.56.253:8082/users", body).subscribe({
      next: (response) => {
        console.log("пользователь зарегистрирован", response);
        form.resetForm();
      },
      error: (error) => {
        console.error("There was an error!", error);
      }
    });





}
  onSubmitPut(form: NgForm){
    const bodyId = {
      id: form.value.id
    }
    const newUser = {
      email: form.value.email,
      name: form.value.name
    }

     this.http.put(`http://194.87.56.253:8082/users/${bodyId.id}`,newUser).subscribe({
      next: (response) => {
        console.log("Пользователь изменен",response)
        form.resetForm();
      }
     })


  }
  // Метод для получения пользователей
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://194.87.56.253:8082/users');
  }
}




