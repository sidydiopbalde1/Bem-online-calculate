import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chrono } from '../chrono/chrono';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Chrono],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chrono-bem');
}
