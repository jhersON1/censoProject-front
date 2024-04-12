import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { UsuarioService } from '../services/usuario.service';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';


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
    HttpClientModule
  ], 
  providers: [
    UsuarioService
  ], 
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})


export class DataTableComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'name','ci', 'email', 'role', 'action'];
  dataSource !: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any[]>;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.table.dataSource = this.dataSource;
  }
  
  constructor(private _http: HttpClient, private _usuario: UsuarioService){

  }

  ngOnInit(): void {
    this.getUserList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  getUserList(){
    this._usuario.getUserList().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  deleteUser(id: number) {
    this._usuario.deleteUser(id).subscribe({
      next: (res) => {
        alert('usuario eliminado');
        this.getUserList();
      },
      error: console.log,
    });
  }


}
