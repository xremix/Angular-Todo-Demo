import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularTodoDemo';
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  newTodoDueDate?: Date;

  constructor(private todoService: TodoService) {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  public toggleTodo(todo: Todo): void {
    this.todoService.toggleTodo(todo);
  }

  public addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo = new Todo({
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        dueDate: this.newTodoDueDate
      });
      this.todoService.addTodo(newTodo);
      // Reset form
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.newTodoDueDate = undefined;
    }
  }
}
