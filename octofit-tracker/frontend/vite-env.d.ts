/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_CODESPACE_NAME: string | undefined;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
