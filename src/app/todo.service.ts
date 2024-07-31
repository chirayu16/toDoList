import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  addTask(taskName: string) {
    console.log('Adding task:', taskName); 
    this.tasks.push({ name: taskName, completed: false });
    console.log('Tasks after addition:', this.tasks); 
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.name === updatedTask.name)
    if( index > -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(taskToDelete: Task): void {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
  }
}

