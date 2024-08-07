import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task, Subtask } from './model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'tasks';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasks();
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
      tasks.push({ name: taskName, completed: false, subtasks: [] });
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

  addSubtask(taskName: string, subtaskName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const tasks = this.getTasks();
      const taskIndex = tasks.findIndex(task => task.name === taskName);
      if (taskIndex > -1) {
        tasks[taskIndex].subtasks.push({ name: subtaskName, completed: false });
        this.saveTasks(tasks);
      }
    }
  }

  updateSubtask(taskName: string, updatedSubtask: Subtask): void {
    if (isPlatformBrowser(this.platformId)) {
      const tasks = this.getTasks();
      const taskIndex = tasks.findIndex(task => task.name === taskName);
      if (taskIndex > -1) {
        const subtaskIndex = tasks[taskIndex].subtasks.findIndex(subtask => subtask.name === updatedSubtask.name);
        if (subtaskIndex > -1) {
          tasks[taskIndex].subtasks[subtaskIndex] = updatedSubtask;
          this.saveTasks(tasks);
        }
      }
    }
  }

  deleteSubtask(taskName: string, subtaskName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const tasks = this.getTasks();
      const taskIndex = tasks.findIndex(task => task.name === taskName);
      if (taskIndex > -1) {
        tasks[taskIndex].subtasks = tasks[taskIndex].subtasks.filter(subtask => subtask.name !== subtaskName);
        this.saveTasks(tasks);
      }
    }
  }

  private saveTasks(tasks: Task[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  private loadTasks(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getTasks();
    }
  }
}