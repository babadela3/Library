import { Component, OnInit } from '@angular/core';
import { RestService } from './../../services/rest.service';
import { Resource } from './../../domain/resource';
import { User } from './../../domain/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditorComponent } from '../user-editor/user-editor.component';

const PAGE_SIZE: number = 6;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: Resource<User>;
  page: number = 0;
  searchTerm: string = "";
  sortCol: string = "fullName";
  sortDir: boolean = true;
  selectedId: number;

  changes: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private _rest: RestService, private _modalSv: NgbModal) { }

  ngOnInit() {
    this.changes.subscribe(u => {
      if (u !== null) {
        this.load();
      }
    });
  }

  private load() {
    var query: { [k: string]: any } = {};
    query.size = PAGE_SIZE;
    query.search = this.searchTerm;
    query.page = this.page - 1;
    query.sort = this.sortCol + "," + (this.sortDir ? "asc" : "desc");
    this._rest.getList<User>("api/user", query).subscribe(re => this.userList = re);
  }

  sort(col: string): void {
    if (this.sortCol === col) {
      this.sortDir = !this.sortDir;
    } else {
      this.sortCol = col;
      this.sortDir = true;
    }
    this.load()
  }

  deleteSelected(): void {
    this._rest.delete("api/user/" + this.selectedId).subscribe(re => this.load());
  }

  edit(u: User): void {
    const modalRef = this._modalSv.open(UserEditorComponent);
    modalRef.componentInstance.user = u;
    modalRef.componentInstance.callback = this.changes;
  }

createNew(): void {
    let u: User = new User();
    this.edit(u);
  }

}
