import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'angular_todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const savedTodos = localStorage.getItem(this.storageKey);
    if (savedTodos) {
      const todos = JSON.parse(savedTodos).map((todo: any) => Todo.fromJSON(todo));
      this.todosSubject.next(todos);
    } else {
      // Initialize with sample todos if none exist
      const initialTodos = [
        new Todo({
          title: 'Learn Angular',
          description: 'Study Angular fundamentals and build a sample application',
          dueDate: new Date('2024-03-30')
        }),
        new Todo({
          title: 'Complete Todo App',
          description: 'Implement all features of the todo application',
          dueDate: new Date('2024-04-15')
        }),
        new Todo({
          title: 'Write Tests',
          description: 'Add unit tests and e2e tests for the application',
          completed: true
        })
      ];
      this.saveTodos(initialTodos);
    }
  }

  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  getTodos(): Todo[] {
    return this.todosSubject.value;
  }

  toggleTodo(todo: Todo): void {
    const todos = this.getTodos();
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodos = todos.map(t => t.id === todo.id ? updatedTodo : t);
    this.saveTodos(updatedTodos);
  }

  addTodo(todo: Todo): void {
    const todos = this.getTodos();
    this.saveTodos([...todos, todo]);
  }

  deleteTodo(todoId: number): void {
    const todos = this.getTodos();
    this.saveTodos(todos.filter(todo => todo.id !== todoId));
  }

  updateTodo(updatedTodo: Todo): void {
    const todos = this.getTodos();
    this.saveTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  }
} 