import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
  <div class="container">
  <span><img src='../assets/Photos/logo.jpg'/></span> 
  <h1 class="lead"> {{title}}</h1>

  <router-outlet></router-outlet>
  </div> 
`,

})
export class AppComponent {
  title = '';
}
