import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { NoteCardProps } from '..';

@Component({
  selector: 'app-note-card',
  imports: [DatePipe],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  noteCardProps = input.required<NoteCardProps>();
}
