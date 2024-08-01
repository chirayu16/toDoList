import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  completedTodos: Task[] = [];
  incompleteTodos: Task[] = [];
  warning: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.todoService.getTasks();
    this.filterTasks();
  }

  filterTasks(): void {
    this.completedTodos = this.tasks.filter(task => task.completed);
    this.incompleteTodos = this.tasks.filter(task => !task.completed);
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.todoService.updateTask(task);
    this.loadTasks(); // Refresh tasks after update
  }

  deleteTask(task: Task): void {
    this.todoService.deleteTask(task);
    this.loadTasks(); // Refresh tasks after deletion
  }
}
