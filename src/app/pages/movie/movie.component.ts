import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  playerConfig = {
    controls: 0,
    mute: 0,
    autoplay: 1,
  };

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
        console.log(this.movieInfo.genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMovieCast() {
    this.movieService.mdb
      .movieCredits({ id: this.movieId['id'] })
      .then((response) => {
        this.movieCast = response.cast;
        //console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getTrailer() {
    this.movieService.mdb
      .movieVideos({ id: this.movieId['id'] })
      .then((response) => {
        if (response.results) {
          //console.log(response.results[0]);
          this.key = response.results[0].key;
        }
      });
  }
}
