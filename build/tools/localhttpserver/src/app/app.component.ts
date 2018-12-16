import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataFiles = [
    'product-info.json',
    'module-info.json',
    'module-deps.json',
  ];
}
