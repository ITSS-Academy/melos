export interface SongModel {
  id: string;

  title: string;

  composer: string;

  performer: string;

  file_path: string;

  image_url: string;

  category_id: string;

  createdAt: Date;

  uuid: string;

  views: number;
}
