export interface SongModel {
  id: string;

  title: string;

  composer: string;

  performer: string;

  file_path: string | File;

  image_url: string | File;

  category_id: string;

  createdAt: string;

  uuid: string;

  views: number;

  duration: number;
}
