import { CommonModule } from '@angular/common';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { effect, computed, OnInit, Component, signal} from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todoList= signal <TodoModel []>([
    
  ]);

  filter = signal<FilterType>('all');

  todoListFiltered = computed(()=>{
    const filter = this.filter();
    const todos = this.todoList();
    if(filter === "completed"){
      return todos.filter((todo)=>todo.completed)
    }else{
      return todos;
    }
  })

  newTodo = new FormControl('',{
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  //Al meter una señal en la función de abajo, al cambiar se dipara el efecto es decir, guardar las tareas, es decir al inicio y cada que todoList cambie
  constructor(){
    effect(()=>{
      localStorage.setItem('todos',JSON.stringify(this.todoList()))
    })

  }

  ngOnInit(): void{
    //en la siguiente recupero el storage cuando inicio el componente
    const storage = localStorage.getItem('todos');
    // con este storage vamos a establecer el local storage cuando haya un atarea nueva
    storage ? this.todoList.set(JSON.parse(storage)): null;
  }

  addTodo(){
    const newTodoTitle= this.newTodo.value.trim();
    if(this.newTodo.valid && newTodoTitle !== ''){
      this.todoList.update((prev_todos)=> {
        return[
          ...prev_todos,
          {id: Date.now(), title: newTodoTitle, completed: false}
        ];
      });
      this.newTodo.reset();

    }else{
      this.newTodo.reset();
    }
  }

  removeTodo(todoId: number){
    this.todoList.update((prev_todos)=> 
    prev_todos.filter((todo)=> todo.id !== todoId)
    );
  }

  selectTodo(todoId: number){
    this.todoList.update((prev_todos)=> prev_todos.map((todo)=>{


      if(todo.id === todoId){
        return{
          ...todo,
          completed:!todo.completed
        };
      }
      return {...todo, editing: false}
    }))

  }

  editTask(todoId: number){
    return this.todoList.update((prev_todos)=> prev_todos.map((todo)=>{
      return todo.id === todoId ? {...todo,editing: true}:{...todo,editing: false};
    }))
  }

  saveEditing(todoId: number, event: Event){
    const task = (event.target as HTMLInputElement).value;
    this.todoList.update((prev_todos)=> prev_todos.map((todo)=>{
      return todo.id === todoId ? {...todo,title: task, editing: false} : {...todo};
    }))
  }

  toggleTodo(todoId: number){
    return this.todoList.update((prev_todos)=>
    prev_todos.map((todo)=>{
      return todo.id === todoId ? {...todo, completed: !todo.completed} : todo;
    })
    )
  }

  changeFilter( filterString: FilterType){
    this.filter.set(filterString)
  }
  

}

