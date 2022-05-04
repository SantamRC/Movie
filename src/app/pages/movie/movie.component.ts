import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movieId: string = '';
  movieInfo: any;
  movieCast: any[] | undefined = [];
  uid: string = '';
  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id;

    this.getMovieDetails();
    this.getMovieCast();
  }

  getMovieDetails() {
    this.movieService.mdb
      .movieInfo({ id: this.movieId })
      .then((response) => {
        this.movieInfo = response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMovieCast() {
    this.movieService.mdb
      .movieCredits({ id: this.movieId })
      .then((response) => {
        this.movieCast = response.cast;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
