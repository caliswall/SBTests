import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'age', 'registered date', 'email', 'balance'];
  userData!: MatTableDataSource<User>;
  users: Array<User> = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getActiveUsers().subscribe((users) => {
      this.users = users;
      this.reloadTable();
    });

  }

  ngAfterViewInit() {
    this.userData.sort = this.sort;
  }

  reloadTable() {
      this.userData = new MatTableDataSource(this.users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userData.filter = filterValue.trim().toLowerCase();

  }

  validDateFormat(dateString: string) {
    if(dateString) {
      return dateString.replace(/\s/, '');
    }
    return null;
  }

  normaliseNumber(number: string) {
    return number.replace(/,/g, '');
  }

  resetBalance() {
    this.users.forEach(user => user.balance = '0');
    this.reloadTable();
  }
}
