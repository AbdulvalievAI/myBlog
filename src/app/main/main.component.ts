import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../api/news-api.service';
import { INew } from '../api/inew';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public isLoad: boolean;
  private page = 1;
  public news: Array<INew> = [];

  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.getNews();
  }

  public getNews(): void {
    this.isLoad = true;
    this.newsApiService
      .getTopHeadlines(this.page)
      .pipe(map((value) => value.articles))
      .subscribe({
        next: (data) => {
          if (data.length) {
            this.page += 1;
            this.news.push(...data);
            console.log(this.news.length);
          }
        },
        error: (err) => {
          console.log(err);
          console.error(err.error.message);
        },
        complete: () => {
          this.isLoad = false;
        },
      });
  }
}
