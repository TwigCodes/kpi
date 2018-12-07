import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlCn extends MatPaginatorIntl {
  itemsPerPageLabel = '每页记录数';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';
  firstPageLabel = '首页';
  lastPageLabel = '尾页';

  getRangeLabel = function(page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return `${length} 条中的 0`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${length} 条中的 ${startIndex + 1} - ${endIndex}`;
  };
}
