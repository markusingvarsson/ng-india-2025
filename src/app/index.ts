export interface SpeechToTextMessage {
  messageType: 'speech-to-text';
  audio: Float32Array<ArrayBufferLike>;
  playbackUrl: string;
}

export type WorkerMessage = SpeechToTextMessage;

export type SpeechToTextResponse =
  | SpeechToTextProgressResponse
  | SpeechToTextCompleteResponse;

interface SpeechToTextResponseBase {
  responseType: 'speech-to-text';
  status: 'progress' | 'complete';
}

export interface SpeechToTextProgressResponse extends SpeechToTextResponseBase {
  status: 'progress';
  progress: number;
  fileName: string;
}

export interface SpeechToTextCompleteResponse extends SpeechToTextResponseBase {
  status: 'complete';
  text: string;
  playbackUrl: string;
}

export type WorkerResponse = SpeechToTextResponse;
