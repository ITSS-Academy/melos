import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Pipe({
  name: 'idToAvatar',
  standalone: true,
})
export class IdToAvatarPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(uid: string| null): Observable<string> {
    if(uid) {
      return this.authService.getAuthByUid(uid).pipe(
        map((auth: any) => {
          const url = auth.picture;
          return url;
        }),
      );
    }else {
      return new Observable((observer) => {
        observer.next('');
      });
    }
  }
}
