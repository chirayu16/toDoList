import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storageKey = 'tasks';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasks(); // Ensure tasks are loaded from localStorage on initialization
    }
  }

  getTasks(): Task[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    return [];
  }

  addTask(taskName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const tasks = this.getTasks();
      tasks.push({ name: taskName, completed: false });
      this.saveTasks(tasks);
    }
  }

  updateTask(updatedTask: Task): void {
    if (isPlatformBrowser(this.platformId)) {
      const tasks = this.getTasks();
      const index = tasks.findIndex(task => task.name === updatedTask.name);
      if (index > -1) {
        tasks[index] = updatedTask;
        this.saveTasks(tasks);
      }
    }
  }

  deleteTask(taskToDelete: Task): void {
    if (isPlatformBrowser(this.platformId)) {
      let tasks = this.getTasks();
      tasks = tasks.filter(task => task.name !== taskToDelete.name);
      this.saveTasks(tasks);
    }
  }

  private saveTasks(tasks: Task[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  private loadTasks(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load tasks initially to ensure they're available
      this.getTasks();
    }
  }
}
