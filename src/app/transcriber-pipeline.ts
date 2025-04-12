import {
  AutomaticSpeechRecognitionPipeline,
  pipeline,
  ProgressInfo,
} from '@huggingface/transformers';

export class TranscriberPipeline {
  static instance: Promise<AutomaticSpeechRecognitionPipeline>;
  static getInstance(progress_callback: (progressInfo: ProgressInfo) => void) {
    if (!this.instance) {
      this.instance = pipeline(
        'automatic-speech-recognition',
        'Xenova/whisper-base',
        { progress_callback }
      );
    }
    return this.instance;
  }
}
