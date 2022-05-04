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
  movieId: any;
  movieInfo: any;
  movieCast: any[] | undefined = [];
  uid: string = '';
  key: string | undefined = '';
  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.params;
    this.getTrailer();
    this.getMovieDetails();
    this.getMovieCast();
  }

  getMovieDetails() {
    this.movieService.mdb
      .movieInfo({ id: this.movieId['id'] })
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

  getTrailer() {
    this.movieService.mdb.movieVideos({ id: '335787' }).then((response) => {
      if (response.results) {
        console.log(response.results[0]);
        this.key = response.results[0].key;
      }
    });
  }
}
