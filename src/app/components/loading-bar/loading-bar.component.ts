import { Component, input } from '@angular/core';
import { LoadingBarProps as LoadingBarProps } from '..';

@Component({
  selector: 'app-loading-bar',
  imports: [],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  loadingBar = input.required<LoadingBarProps>();
}
