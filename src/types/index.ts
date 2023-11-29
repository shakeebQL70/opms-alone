export interface ISelectedFiles extends File {
  preview: string;
  isSupported: boolean;
  isFileSizeExceeded: boolean;
}

export type selectedFile = {
  file: File | null;
  msg: string;
};
