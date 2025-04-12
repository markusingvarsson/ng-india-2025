import { Injectable, signal } from '@angular/core';
import { NoteCardProps } from './components';

@Injectable({
  providedIn: 'root',
})
export class TranscriberService {
  notes = signal<NoteCardProps[]>([]);

  transcribeAudio(
    processedAudio: Float32Array<ArrayBufferLike>,
    playbackUrl: string
  ) {
    this.notes.update((prevNotes) => [
      {
        date: new Date(),
        playbackUrl,
        text: 'Transcribing...',
      },
      ...prevNotes,
    ]);
  }
}
