import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Pipe({
  name: 'idToName',
  standalone: true,
})
export class IdToNamePipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(uid: string): Observable<string> {
    return this.authService.getAuthByUid(uid).pipe(
      map((auth: any) => {
        const url = auth.name;
        return url;
      }),
    );
  }
}
