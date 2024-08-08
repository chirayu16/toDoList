import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task, Subtask } from './../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  completedTodos: Task[] = [];
  incompleteTodos: Task[] = [];

  @Output() focusAddTask = new EventEmitter<void>();

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
    this.loadTasks();
  }

  deleteTask(task: Task): void {
    this.todoService.deleteTask(task);
    this.loadTasks();
  }

  handleFocusAddTask(): void {
    this.focusAddTask.emit();
  }

  addSubtask(task: Task): void {
    const subtaskName = task.newSubtaskName?.trim();
    if (subtaskName) {
      // Check if the subtask already exists
      const existingSubtask = task.subtasks.find(
        (subtask) => subtask.name.toLowerCase() === subtaskName.toLowerCase()
      );
      if (existingSubtask) {
        task.subtaskWarning = 'Subtask already exists.';
        return;
      }

      this.todoService.addSubtask(task.name, subtaskName);
      task.newSubtaskName = ''; // Clear the input field after adding a subtask
      task.subtaskWarning = ''; // Clear any previous warning
      this.loadTasks();
    } else {
      task.subtaskWarning = 'You cannot add an empty subtask.';
    }
  }

  toggleSubtask(task: Task, subtask: Subtask): void {
    subtask.completed = !subtask.completed;
    this.todoService.updateSubtask(task.name, subtask);
    this.loadTasks();
  }

  deleteSubtask(task: Task, subtaskName: string): void {
    this.todoService.deleteSubtask(task.name, subtaskName);
    this.loadTasks();
  }
}