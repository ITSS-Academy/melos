// import { Pipe, PipeTransform } from '@angular/core';
// import { ProfileModel } from '../../models/profile.models';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { ProfileService } from '../../services/profile/profile.services';
// import * as url from 'node:url';
//
// @Pipe({
//   name: 'idToAvatar',
//   standalone: true,
// })
// export class IdToAvatarPipe implements PipeTransform {
//   constructor(private profileService: ProfileService) {}
//
//   transform(uid: string): Observable<string> {
//     return this.profileService.getById(uid).pipe(
//       map((profile: ProfileModel) => {
//         const url = profile.avatarUrl;
//         return url;
//       }),
//     );
//   }
// }
