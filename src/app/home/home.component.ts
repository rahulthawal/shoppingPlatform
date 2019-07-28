import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.getAll();
  }

  ngOnInit() {}
  getAll() {
    this.items = this.db.list('/products').valueChanges();
  }
}
