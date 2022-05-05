import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  movie: any;
  movieInfo: any;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    public movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.movie = this.data;
    console.log(this.data);
    this.getMovieDetails();
  }

  getMovieDetails() {
    this.movieService.mdb
      .movieInfo({ id: this.movie.movieObject.id })
      .then((response) => {
        this.movieInfo = response;
        console.log(this.movieInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  details() {
    this.dialogRef.close();
  }
}
