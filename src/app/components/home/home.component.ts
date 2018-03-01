import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Article } from '../../domain/article';
import { Resource } from '../../domain/resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const PAGE_SIZE:number=6;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _rest: RestService) { }

  articleList: Resource<Article>;
  changes: BehaviorSubject<Article> = new BehaviorSubject<Article>(null);

  ngOnInit() {
    this.load();
    this.changes.subscribe(u => {
      if (u !== null) {
        this.load();
      }
    });
  }

  private load() {
    var query: { [k: string]: any } = {};
    query.size = PAGE_SIZE;
    this._rest.getList<Article>("api/articles", query).subscribe(re => this.articleList = re);
  }

}
