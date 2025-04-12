import { inject, Injectable, signal } from '@angular/core';
import { LoadingBarProps, NoteCardProps } from './components';
import { WorkerService } from './worker/worker.service';

@Injectable({
  providedIn: 'root',
})
export class TranscriberService {
  notes = signal<NoteCardProps[]>([]);
  loadingBar = signal<LoadingBarProps>({ label: 'Loading...', progress: 0 });

  #workerService = inject(WorkerService);

  constructor() {
    this.#workerService.registerCallback((response) => {
      if (response.responseType !== 'speech-to-text') return;

      switch (response.status) {
        case 'progress':
          this.loadingBar.set({
            label: response.fileName,
            progress: response.progress,
          });
          break;

        default:
          break;
      }
    });
  }

  transcribeAudio(
    processedAudio: Float32Array<ArrayBufferLike>,
    playbackUrl: string
  ) {
    this.#workerService.sendMessage({
      messageType: 'speech-to-text',
      audio: processedAudio,
      playbackUrl,
    });

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
