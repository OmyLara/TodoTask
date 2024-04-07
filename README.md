# ListaTareas

Este proyecto fue creado con [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3. y NG-ZORRO versión 17.3.0. 
Para estilos ser utilizó principlamnete Tailwind

## Development server

Correr ng serve -o para abrirlo y después Navega a `http://localhost:4200/`.
O bien, ingresa a https://addyourtasks-app.netlify.app/todo para verlo en tu localstorage.

## Detalles

todo.component.html => Contiene todo el HTML incluído con los estilos de TailwindCSS
app.routes.ts => Se creó una ruta para el sitio /todo
todo.component.ts => Contiene toda la lógica que permite que la app funcione, desde agregar una tarea nueva, editarla, eliminarla y los filtros para saber si la tarea fue completada o aún no


## How it works

Ingresa una tarea de mínimo 3 caracteres en"Enter new task", an dar enter con el teclado o dar click en "Add Task" aparecerá en el listado.
La tarea puede editarse o eliminarse y al dar click en el checkbox se agregará dicha tarea al filtro de "Completed"