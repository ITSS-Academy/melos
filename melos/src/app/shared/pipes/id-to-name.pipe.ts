// import { Pipe, PipeTransform } from '@angular/core';
// import { ProfileService } from '../../services/profile/profile.services';
// import { Observable } from 'rxjs';
// import { ProfileModel } from '../../models/profile.model';
// import { map } from 'rxjs/operators';
//
// @Pipe({
//   name: 'idToName',
//   standalone: true,
// })
// export class IdToNamePipe implements PipeTransform {
//   constructor(private profileService: ProfileService) {}
//
//   transform(uid: string): Observable<string> {
//     return this.profileService.getById(uid).pipe(
//       map((profile: ProfileModel) => {
//         return profile.userName;
//       }),
//     );
//   }
// }
