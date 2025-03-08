import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentBySong(songId: string) {
    return this.http.get<CommentModel[]>(
      `http://localhost:3000/comment/song-comment?song_id=${songId}`,
    );
  }

  createComment(comment: CommentModel, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    const body = {
      song_id: comment.song_id,
      uid: comment.uid,
      content: comment.content,
    };

    return this.http.post<CommentModel>(`http://localhost:3000/comment`, body, {
      headers,
    });
  }
}
