import { Component, output, signal } from '@angular/core';
import { RecordingOutput } from '..';

@Component({
  selector: 'app-audio-recorder',
  templateUrl: 'audio-recorder.component.html',
  styleUrl: 'audio-recorder.component.scss',
})
export class AudioRecorderComponent {
  recordingComplete = output<RecordingOutput>();

  recording = signal(false);
  #mediaRecorder?: MediaRecorder;
  #audioChunks: BlobPart[] = [];

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.#audioChunks = [];
      this.#mediaRecorder = new MediaRecorder(stream);

      this.#mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.#audioChunks.push(e.data);
      };

      this.#mediaRecorder.onstop = () =>
        this.#handleRecordingComplete(
          new Blob(this.#audioChunks, { type: 'audio/webm' })
        );

      this.#mediaRecorder.start();
      this.recording.set(true);
    } catch (error) {
      console.error('Microphone access error:', error);
    }
  }

  stopRecording() {
    if (this.#mediaRecorder && this.recording()) {
      this.#mediaRecorder.stop();
      this.recording.set(false);
    }
  }

  async #handleRecordingComplete(blob: Blob) {
    try {
      const buffer = await blob.arrayBuffer();
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      const decoded = await context.decodeAudioData(buffer);

      const processedAudio = this.#convertToMono(decoded);
      const playbackUrl = URL.createObjectURL(blob);

      this.recordingComplete.emit({ processedAudio, playbackUrl });
    } catch (err) {
      console.error('Audio processing error:', err);
    }
  }

  #convertToMono(buffer: AudioBuffer): Float32Array {
    if (buffer.numberOfChannels === 2) {
      const left = buffer.getChannelData(0);
      const right = buffer.getChannelData(1);
      const mono = new Float32Array(left.length);
      const scale = Math.SQRT2;
      for (let i = 0; i < left.length; i++) {
        mono[i] = (scale * (left[i] + right[i])) / 2;
      }
      return mono;
    }
    return buffer.getChannelData(0);
  }
}
