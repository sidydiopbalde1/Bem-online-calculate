import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-date-calculator',
  templateUrl: './chrono.html',
  styleUrls: ['./chrono.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class Chrono {
  timeForm: FormGroup;
  result: string = '';

  constructor(private fb: FormBuilder) {
    this.timeForm = this.fb.group({
      h1: [0, [Validators.min(0)]],
      m1: [0, [Validators.min(0), Validators.max(59)]],
      s1: [0, [Validators.min(0), Validators.max(59)]],
      h2: [0, [Validators.min(0)]],
      m2: [0, [Validators.min(0), Validators.max(59)]],
      s2: [0, [Validators.min(0), Validators.max(59)]],
      operation: ['add']
    });
  }

  onSubmit() {
    const { h1, m1, s1, h2, m2, s2, operation } = this.timeForm.value;
    const totalSec1 = h1 * 3600 + m1 * 60 + s1;
    const totalSec2 = h2 * 3600 + m2 * 60 + s2;
  
    let resultInSec = 0;
    let resultText = '';
  
    if (operation === 'add') {
      resultInSec = totalSec1 + totalSec2;
      resultText = `${this.formatDuration(resultInSec)} (${resultInSec} secondes)`;
    } else if (operation === 'sub') {
      resultInSec = Math.abs(totalSec1 - totalSec2); // différence absolue
      resultText = `${this.formatDuration(resultInSec)} (${resultInSec} secondes)`;
    } else if (operation === 'compare') {
      if (totalSec1 === totalSec2) {
        resultText = 'Les deux durées sont égales.';
      } else if (totalSec1 > totalSec2) {
        resultText = 'La première durée est plus longue.';
      } else {
        resultText = 'La deuxième durée est plus longue.';
      }
    }
  
    this.result = resultText;
  }
  

  formatDuration(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  }
}
