import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeAnimations, selectAuth } from '@app/core';
import { State as BaseSettingsState } from '@app/settings';

import { State as BaseExamplesState } from '../examples.state';

interface State extends BaseSettingsState, BaseExamplesState {}

@Component({
  selector: 'nwcdkpi-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'nwcdkpi.examples.menu.todos' },
    { link: 'stock-market', label: 'nwcdkpi.examples.menu.stocks' },
    { link: 'theming', label: 'nwcdkpi.examples.menu.theming' },
    { link: 'crud', label: 'nwcdkpi.examples.menu.crud' },
    { link: 'form', label: 'nwcdkpi.examples.menu.form' },
    { link: 'notifications', label: 'nwcdkpi.examples.menu.notifications' },
    { link: 'authenticated', label: 'nwcdkpi.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(selectAuth),
      map(auth => auth.isAuthenticated)
    );
  }
}
