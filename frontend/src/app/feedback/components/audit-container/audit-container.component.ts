import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuditVM } from '@app/feedback';
import {
  ColumnDef,
  DisplayType,
  AlignType
} from '@app/shared/dyna-table/dyna-table.component';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'tgkpi-audit-container',
  templateUrl: './audit-container.component.html',
  styleUrls: ['./audit-container.component.scss']
})
export class AuditContainerComponent implements OnInit {
  data$: Observable<AuditVM[]> = of([
    {
      id: 1,
      reviewInvitation: {
        id: 1,
        reviewee: {
          id: 1,
          name: 'Zhang San',
          email: 'zhangsan@local.dev'
        },
        reviewers: [
          {
            id: 3,
            name: 'Wang Wu',
            email: 'wangwu@local.dev'
          },
          {
            id: 4,
            name: 'Zhao Liu',
            email: 'zhaoliu@local.dev'
          }
        ]
      }
    }
  ]);
  columns: ColumnDef[] = [
    {
      field: { name: 'id', label: 'ID' },
      cell: (e: AuditVM) => `${e.id}`,
      display: DisplayType.TEXT,
      align: AlignType.LEFT
    },
    {
      field: { name: 'reviewee.name', label: '员工姓名' },
      cell: (e: AuditVM) => e.reviewInvitation.reviewee.name,
      display: DisplayType.TEXT,
      align: AlignType.LEFT
    },
    {
      field: { name: 'reviewee.email', label: '员工 Email' },
      cell: (e: AuditVM) => `${e.reviewInvitation.reviewee.email}`,
      display: DisplayType.TEXT,
      align: AlignType.LEFT
    },
    {
      field: { name: 'reviewers', label: '评价者' },
      cell: (e: AuditVM) => `${e.reviewInvitation.reviewers}`,
      display: DisplayType.TEXT,
      align: AlignType.LEFT
    },
    {
      field: { name: 'auditBy', label: '修订人' },
      cell: (e: AuditVM) => (e.auditedBy ? '未审核' : '已审核'),
      display: DisplayType.TEXT,
      align: AlignType.LEFT
    }
  ];
  page$: Observable<number> = of(0);
  size$: Observable<number> = of(1);
  sort$: Observable<string> = of('id');
  total$: Observable<number> = of(1);
  constructor() {}

  ngOnInit() {}

  pageChange(ev: PageEvent) {
    const pageable = {
      page: ev.pageIndex * ev.pageSize,
      size: ev.pageSize
    };
    console.log(pageable);
  }

  handleItem(row: AuditVM) {
    console.log(row);
  }
}
