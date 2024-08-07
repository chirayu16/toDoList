  import { Component, ViewChild } from '@angular/core';
  import { AddTaskComponent } from '../add-task/add-task.component';
  import { TodoListComponent } from '../todo-list/todo-list.component';

  @Component({
    selector: 'app-todo-container',
    standalone: true,
    imports: [AddTaskComponent, TodoListComponent],
    templateUrl: './todo-container.component.html',
    styleUrl: './todo-container.component.scss'
  })
  export class TodoContainerComponent {
    @ViewChild(TodoListComponent) todoListComponent!: TodoListComponent;
    @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;

    ngAfterViewInit(): void {
      this.addTaskComponent.focusInput();
    }

    onTaskAdded(): void {
      if (this.todoListComponent) {
        this.todoListComponent.loadTasks(); // Refresh tasks
      }
    }
    focusAddTask(): void {
      if (this.addTaskComponent) {
        this.addTaskComponent.focusInput(); // Focus the input field in AddTaskComponent
      }
    }

  }
