export interface Subtask {
  name: string;
  completed: boolean;
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks: Subtask[];
  newSubtaskName?: string;
  subtaskWarning?: string; // Change: Optional property for input binding
   // Change: Optional property for input binding
}
