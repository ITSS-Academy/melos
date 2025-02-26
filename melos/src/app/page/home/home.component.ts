import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SongModel } from '../../models/song.model';
import { Store } from '@ngrx/store';
import { SongState } from '../../ngrx/song/song.state';
import { SongService } from '../../services/song/song.service';
import * as SongActions from '../../ngrx/song/song.actions';
import { MusicCardComponent } from '../../shared/components/music-card/music-card.component';
import {MaterialModule} from "../../shared/material.module";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MusicCardComponent, MaterialModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  songLists$!: Observable<SongModel[]>;
  subscriptions: Subscription[] = [];

  songLists: SongModel[] = [];
  constructor(
    private store: Store<{
      song: SongState;
    }>,
    public SongService: SongService,
  ) {
    this.songLists$ = store.select('song', 'songList');

    this.store.dispatch(SongActions.getSongList());
  }

  ngOnInit() {
    this.subscriptions.push(
      this.songLists$.subscribe((songLists) => {
        if (songLists.length > 0) {
          this.songLists = songLists;
          console.log(songLists);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  toLeft(list: string) {
    const carousel = document.getElementById(list) as HTMLElement;
    carousel.scrollLeft -= carousel.clientWidth;
  }
  toRight(list: string) {
    const carousel = document.getElementById(list) as HTMLElement;
    carousel.scrollLeft += carousel.clientWidth;
  }
}
