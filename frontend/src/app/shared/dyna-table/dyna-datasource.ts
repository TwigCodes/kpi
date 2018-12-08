import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs';

export class DynaDatasource<T> extends DataSource<T> {
  public constructor(private data$: Observable<T[]>) {
    super();
  }

  public connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.data$; // .do(console.log.bind(console))
  }

  public disconnect(collectionViewer: CollectionViewer): void {}
}
