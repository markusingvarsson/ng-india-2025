/// <reference lib="webworker" />

import { ProgressInfo } from '@huggingface/transformers';
import { WorkerMessage, WorkerResponse } from '..';
import { TranscriberPipeline } from '../transcriber-pipeline';

addEventListener('message', async ({ data }: { data: WorkerMessage }) => {
  switch (data.messageType) {
    case 'speech-to-text':
      const transcriber = await TranscriberPipeline.getInstance(
        progressCallback
      );
      break;

    default:
      break;
  }
});

function progressCallback(progressInfo: ProgressInfo): void {
  if (progressInfo.status === 'progress') {
    const progressResponse: WorkerResponse = {
      responseType: 'speech-to-text',
      status: 'progress',
      fileName: progressInfo.file,
      progress: progressInfo.progress,
    };
    postMessage(progressResponse);
  }
  if (progressInfo.status === 'ready') {
    const readyResponse: WorkerResponse = {
      responseType: 'speech-to-text',
      status: 'progress',
      fileName: '',
      progress: 0,
    };
    postMessage(readyResponse);
  }
}
