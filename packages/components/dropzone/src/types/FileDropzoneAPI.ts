import { ReactDivDragEvent, ReactDragEventHandler } from './DragHandlers';

type ReactInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type LoadEvent = ReactDivDragEvent | ReactInputChangeEvent;

export type FileDropzoneAPI = {
  fullscreenVisible: boolean;
  closeFullscreenVisible: VoidFunction;
  handleDragEnter: ReactDragEventHandler;
  handleDragLeave: ReactDragEventHandler;
  handleDragOver: ReactDragEventHandler;
  handleLoad: (e: LoadEvent) => void;
};
