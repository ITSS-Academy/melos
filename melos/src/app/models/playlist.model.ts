export interface PlaylistModel {
  id: string;
  name: string;
  songs_id: string[];
  uid: string;
  created_at: string;
  image_url: string | File;
  is_pined: boolean;
  description: string;
}
