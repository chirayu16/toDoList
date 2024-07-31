import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoContainerComponent } from './todo-container/todo-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TodoContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'to-do-list';
}
