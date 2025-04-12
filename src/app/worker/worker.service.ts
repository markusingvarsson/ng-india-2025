import { Injectable, OnDestroy } from '@angular/core';
import { WorkerMessage, WorkerResponse } from '..';

@Injectable({
  providedIn: 'root',
})
export class WorkerService implements OnDestroy {
  worker: Worker | undefined;
  callbacks: Array<(response: WorkerResponse) => void> = [];

  constructor() {
    this.#setupWorker();
  }
  ngOnDestroy(): void {
    this.worker?.terminate();
  }

  #setupWorker() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
    this.worker.onmessage = ({ data }: { data: WorkerResponse }) => {
      this.callbacks.forEach((cb) => cb(data));
    };
  }

  sendMessage(message: WorkerMessage) {
    this.worker?.postMessage(message);
  }

  registerCallback(callback: (response: WorkerResponse) => void) {
    this.callbacks.push(callback);
  }
}
