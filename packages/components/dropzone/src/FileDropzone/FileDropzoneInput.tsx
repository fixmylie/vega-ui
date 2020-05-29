import React from 'react';
import { FileInput } from '@gpn-prototypes/vega-file-input/src';
import { IconAttach } from '@gpn-prototypes/vega-icons';

import { useFileDropzoneProvider } from './use-file-dropzone-provider';

type FileDropzoneInputProps = {
  className?: string;
  label?: string;
  id: string;
};

export const FileDropzoneInput: React.FC<FileDropzoneInputProps> = ({
  className,
  label = 'Добавьте файл',
  id,
}) => {
  const { handleLoad } = useFileDropzoneProvider();

  return (
    <FileInput
      id={id}
      view="ghost"
      iconLeft={IconAttach}
      size="s"
      iconSize="xs"
      label={label}
      onChange={handleLoad}
      className={className}
    />
  );
};
