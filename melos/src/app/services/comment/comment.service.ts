import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../../models/comment.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentBySong(songId: string) {
    return this.http.get<CommentModel[]>(
      `${environment.apiUrl}comment/song-comment?song_id=${songId}`,
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

    return this.http.post<CommentModel>(`${environment.apiUrl}comment`, body, {
      headers,
    });
  }
}
