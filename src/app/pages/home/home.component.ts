import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: any[] | undefined;
  page = 1;
  constructor(public movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.discoverMovies(this.page);
  }

  discoverMovies(page: number = 1) {
    this.movieService.mdb
      .discoverMovie({
        page: page,
        include_video: false,
        include_adult: false,
        sort_by: 'popularity.desc',
        language: 'en-US',
      })
      .then((response) => {
        if (response.page == 1) {
          this.movies = response.results;
        }
        // else {
        //   this.movies = [...this.movies, response.results];
        // }
        console.log(response.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  stringToDate(date: string): Date {
    return new Date(date);
  }

  openPopup(movie: any) {
    const dialogRef = this.dialog.open(PopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
