/// <reference lib="webworker" />

import { WorkerMessage } from '..';

addEventListener('message', async ({ data }: { data: WorkerMessage }) => {
  switch (data.messageType) {
    case 'speech-to-text':
      console.log('hello from speech-to-text', data);
      break;

    default:
      break;
  }
});
