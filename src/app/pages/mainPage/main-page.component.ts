import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectFriends} from "../../store/selectors/friends.selectors";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  selectedFriend: any;
  friends$: Observable<any[]> = new Observable<any[]>();
  constructor(private store: Store) {
    this.friends$ = this.store.pipe(
      select(selectFriends)
    );

    this.friends$.subscribe((friends) => {
      this.selectedFriend = friends.length > 0 ? friends[0] : undefined;
    });


  }
  handleDataFromChild(data: any) {
    this.selectedFriend = data
  }
}
