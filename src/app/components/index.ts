export interface LoadingBarProps {
  label: string;
  progress: number;
}

export interface NoteCardProps {
  playbackUrl: string;
  text: string;
  date: Date;
}

export interface RecordingOutput {
  processedAudio: Float32Array;
  playbackUrl: string;
}
