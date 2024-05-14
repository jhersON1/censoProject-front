import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user/user.service';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { NabbarComponent } from "../../shared/navbar/nabbar.component";
import { MatIconButton } from "@angular/material/button";


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    MatIconModule,
    HttpClientModule,
    NabbarComponent,
    MatIconButton
  ],
  providers: [
    UserService
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})


export class DataTableComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'name','dni', 'email', 'roles', 'action'];
  dataSource !: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any[]>;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
   this.table.dataSource = this.dataSource;
  }

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUserList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserList(){
    this.userService.getUserList().subscribe({
      next: data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.log(error)
    })
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
      },
      error: error => console.log(error)
    });
  }
}
