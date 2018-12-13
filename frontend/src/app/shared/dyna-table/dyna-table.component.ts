import {
  Component,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  PageEvent,
  Sort,
  MatCheckboxChange
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  trigger,
  state,
  transition,
  style,
  animate,
  query,
  stagger,
  sequence
} from '@angular/animations';
import {
  Operator,
  QueryPart,
  QueryStringBuilder,
  FilterField
} from '../filter.util';
import { Observable, Subscription } from 'rxjs';

export interface Identifiable {
  id: string;
}

const detailExpandAnim = trigger('detailExpand', [
  state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
  state('*', style({ height: '*', visibility: 'visible' })),
  transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
]);

const tableItemAnim = trigger('itemAnim', [
  transition('* => *', [
    query(':enter', style({ opacity: 0, transform: 'scale(1)' }), {
      optional: true
    }),
    query(
      ':enter',
      animate(
        '100ms ease-in',
        style({ opacity: 0.5, transform: 'scale(1.1)' })
      ),
      { optional: true }
    ),
    query(
      ':enter',
      stagger(100, [
        animate('100ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      {
        optional: true
      }
    )
  ])
]);

const rowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({
      height: '*',
      opacity: '0',
      transform: 'translateX(-550px)',
      'box-shadow': 'none'
    }),
    sequence([
      animate(
        '.35s ease',
        style({
          height: '*',
          opacity: '.2',
          transform: 'translateX(0)',
          'box-shadow': 'none'
        })
      ),
      animate(
        '.35s ease',
        style({ height: '*', opacity: 1, transform: 'translateX(0)' })
      )
    ])
  ])
]);

export enum DisplayType {
  TEXT = 0,
  BOOLEAN,
  DATE,
  NUMBER,
  JSON,
  LINK
}

export enum AlignType {
  LEFT = 0,
  CENTER,
  RIGHT
}
export interface ColumnDef {
  field: FilterField;
  cell: (c: any) => any;
  display: DisplayType;
  align: AlignType;
  filterOperators?: Operator[];
  sticky?: string;
}

@Component({
  selector: 'ngx-dyna-table',
  templateUrl: './dyna-table.component.html',
  styleUrls: ['./dyna-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tableItemAnim, rowsAnimation]
})
export class DynaTableComponent implements OnInit, OnDestroy {
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() itemClicked = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() selectChange = new EventEmitter<any[]>();
  @Output() filterChange = new EventEmitter<string>();
  @Input() tpl: TemplateRef<any>;
  @Input() columns: ColumnDef[] = [];
  @Input() pageSize = 20;
  @Input() total = 0;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions = [5, 10, 20, 100];
  @Input() selectable = false;
  @Input() sortable = true;
  @Input() filterable = true;
  @Input() headerSticky = true;
  @Input() data$: Observable<Identifiable[]>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Identifiable>(true, []);
  queryParts: QueryPart[] = [];
  ds: MatTableDataSource<Identifiable> = new MatTableDataSource();
  displayedColumns: string[];
  isHighlight = false;
  selectedIndex = -1;
  subscription: Subscription = Subscription.EMPTY;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription = this.data$.subscribe(data => (this.ds.data = data));
    this.displayedColumns = this.selectable
      ? [...['select'], ...this.columns.map(c => c.field.name)]
      : this.columns.map(c => c.field.name);
  }

  ngOnDestroy(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    this.subscription = Subscription.EMPTY;
  }

  styleMatrix(column: ColumnDef) {
    switch (column.align) {
      case AlignType.LEFT: {
        return {
          left: true,
          center: false,
          right: false
        };
      }
      case AlignType.CENTER: {
        return {
          left: false,
          center: true,
          right: false
        };
      }
      case AlignType.RIGHT: {
        return {
          left: false,
          center: false,
          right: true
        };
      }
      default: {
        return {
          left: true,
          center: false,
          right: false
        };
      }
    }
  }

  toggleHighlight(enable: boolean, index: number) {
    this.isHighlight = enable;
    this.selectedIndex = index;
  }

  emitClick(row: any) {
    this.itemClicked.emit(row);
  }

  emitPage(ev: PageEvent) {
    this.selection.clear();
    this.pageChange.emit(ev);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ds.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.ds.data.forEach(row => this.selection.select(row));
    this.selectChange.emit(this.selection.selected);
  }

  handleSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  handleSelectChange(ev: MatCheckboxChange, row: any) {
    if (!ev) {
      return;
    }
    this.selection.toggle(row);
    this.selectChange.emit(this.selection.selected);
  }

  handleFilterRemove(queryPart: QueryPart) {
    this.queryParts = this.queryParts.filter(
      part => part.toString() !== queryPart.toString()
    );
    this.filterChange.emit(
      new QueryStringBuilder().QueryParts(this.queryParts).build()
    );
  }

  handleFilterAdd(queryPart: QueryPart) {
    this.queryParts = [...this.queryParts, queryPart];
    this.filterChange.emit(
      new QueryStringBuilder().QueryParts(this.queryParts).build()
    );
  }

  handleFilterClear(queryParts: QueryPart[]) {
    this.queryParts = this.queryParts.filter(
      part => !queryParts.includes(part)
    );
    this.filterChange.emit(
      new QueryStringBuilder().QueryParts(this.queryParts).build()
    );
  }
}
