import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MusicCardComponent} from "../../shared/components/music-card/music-card.component";
import {NgForOf} from "@angular/common";
import {MaterialModule} from "../../shared/material.module";
import {MusicTabComponent} from "../../shared/components/music-tab/music-tab.component";
import {Observable, Subscription} from "rxjs";
import {SongModel} from "../../models/song.model";
import {SongState} from "../../ngrx/song/song.state";
import {Store} from "@ngrx/store";
import * as SongActions from "../../ngrx/song/song.actions";
import {ActivatedRoute} from "@angular/router";
import * as PlayAction from "../../ngrx/play/play.actions";
import {SongService} from "../../services/song/song.service";
import {PlayState} from "../../ngrx/play/play.state";
@Component({
  selector: 'app-detail-song',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MusicCardComponent,
        NgForOf,
        MaterialModule,
        MusicTabComponent
    ],
  templateUrl: './detail-song.component.html',
  styleUrl: './detail-song.component.scss'
})
export class DetailSongComponent implements OnInit, OnDestroy {
    isPlaying = false;
    isPlaying$!: Observable<boolean>;
    subscriptions: Subscription[] = [];
    songDetail!: SongModel;
    songDetail$!: Observable<SongModel>;
    constructor(
        private songService: SongService,
        private activatedRoute: ActivatedRoute,
        private store: Store<{
            song: SongState;
            play: PlayState;
        }>
    ) {
        this.songDetail$ = this.store.select('song', 'songDetail');
        this.isPlaying$ = this.store.select('play', 'isPlaying');
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
                console.log("id: \n",id);

                this.store.dispatch(SongActions.getSongById({id: id}));
            }
        }),
        this.subscriptions.push(
            this.songDetail$.subscribe((songDetail) => {
                if (songDetail) {
                    this.songDetail = songDetail;
                    console.log("Get song detail: ",songDetail);
                }
            }),
            this.isPlaying$.subscribe((isPlaying) => {
                this.isPlaying = isPlaying;
            }),

        )

    }

    isPlayingSong() {
        return this.isPlaying && this.songDetail?.id == this.songService.currentPlaySong?.id;
    }
    playSong() {
        if (this.isPlaying) {
            if (this.songDetail!.id == this.songService.currentPlaySong!.id) {
                this.store.dispatch(PlayAction.pause());
                return;
            } else {
                this.songService.setCurrentSong(this.songDetail!);
                this.store.dispatch(PlayAction.play());
                return;
            }
        } else {
            if (this.songDetail!.id == this.songService.currentPlaySong!.id) {
                this.store.dispatch(PlayAction.play());
                return;
            } else {
                this.songService.setCurrentSong(this.songDetail!);
                this.store.dispatch(PlayAction.play());
                return;
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
