
export interface Option {
  label: string;
  next: string;
}

export interface ScreenData {
  id: string;
  title: string;
  text: string;
  options: Option[];
  ai_prompt?: string;
}

export interface AppData {
  version: string;
  app: {
    name: string;
    description: string;
  };
  screens: ScreenData[];
}

export interface AlbumEntry {
  id: number;
  title: string;
  date: string;
  beat: string;
  lyrics: string;
  image: string;
}
