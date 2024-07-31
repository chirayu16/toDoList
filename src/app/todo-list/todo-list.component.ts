import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  tasks: Task[] = [];
  warning: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.tasks = this.todoService.getTasks();
  }

  toggleTask(task: Task):void {
    task.completed = !task.completed;
    this.todoService.updateTask(task);
  }

  deleteTask(task: Task): void {
    this.todoService.deleteTask(task);
    this.tasks = this.todoService.getTasks();
  }

}

