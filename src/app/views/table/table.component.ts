import { Component, OnDestroy, ViewChild, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { COMMON_MODULES } from '@app/core/constants';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HTTPService } from '@app/core/services/http.service';
import { Issues } from '@app/core/models/issues.model';
import * as Endpoints from '@app/core/constants/endpoints';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResponseModel } from '@app/core/models/response.model';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [
    COMMON_MODULES,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
  ],
  providers: [
    HTTPService
  ]
})
export class AppTableComponent implements OnDestroy {

  public displayedColumns: string[] = ['created_at', 'updated_at', 'title'];
  public dataSource = new MatTableDataSource<Issues>([]);
  public page = signal(1);
  public pageSize = signal(100);
  public totalItems = signal(0);
  public sortActive = signal('');
  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _httpService: HTTPService,
  ) {
    this.loadResources()
  }

  public loadResources(event: any = null) {
    this.isLoading = true;
    const page = event ? event.pageIndex + 1 : 1;
    this.page.set(page);
    this._httpService.requestEntity(
      'GET',
      Endpoints.searchIssues,
      {
        q: 'repo:angular/components',
        per_page: this.pageSize(),
        page: this.page(),
        sort: this.sortActive(),
        order: 'desc'

      }
    )
      .subscribe({
        next: (res: ResponseModel) => {
          this.dataSource = new MatTableDataSource<Issues>(res?.items)
          this.isLoading = false;
          this.totalItems.set(res?.total_count);
          this.dataSource.sort = this.sort;
        },
        error: (err: any) => {
          this.isLoading = false;
          console.log(err);
        }
      })
  }

  announceSortChange(e: any) {
    this.sortActive.set(e.active);
    this.loadResources();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.dataSource = new MatTableDataSource<Issues>([]);
  }
}