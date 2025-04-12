import { Component, inject } from '@angular/core';
import { AudioRecorderComponent } from './components/audio-recorder/audio-recorder.component';
import { RecordingOutput } from './components';
import { TranscriberService } from './transcriber.service';
import { NoteCardComponent } from './components/note-card/note-card.component';

@Component({
  selector: 'app-root',
  imports: [AudioRecorderComponent, NoteCardComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Voice Notes</h1>
        <p>Record your thoughts and convert them to text with ease.</p>
      </header>

      <section class="audio-section">
        <h2>Record a Note</h2>
        <p>Click the button below to start recording your voice.</p>
        <app-audio-recorder
          (recordingComplete)="onRecordingComplete($event)"
        ></app-audio-recorder>
      </section>

      <section>
        <h2>Notes</h2>
        @for(note of transcriberService.notes(); track $index) {
        <app-note-card [noteCardProps]="note"></app-note-card>
        }
      </section>
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .audio-recorder,
      .status,
      .notes-list {
        margin-bottom: 1.5rem;
      }

      .loading-bar,
      .spinner {
        margin-bottom: 1rem;
      }

      .note-card {
        margin-bottom: 1rem;
        padding: 0.75rem;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class AppComponent {
  transcriberService = inject(TranscriberService);

  onRecordingComplete($event: RecordingOutput) {
    this.transcriberService.transcribeAudio(
      $event.processedAudio,
      $event.playbackUrl
    );
  }
}
