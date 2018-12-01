import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  INIT,
  UPDATE
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';

import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { LocalStorageService } from './local-storage/local-storage.service';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer
};

export function getMetaReducers(
  localStorageService: LocalStorageService
): MetaReducer<AppState>[] {
  const metaReducers: MetaReducer<AppState>[] = [];
  const storage = reducer => {
    return (state, action) => {
      const newState = reducer(state, action);
      if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
        return { ...newState, ...localStorageService.loadInitialState() };
      }
      return newState;
    };
  };
  metaReducers.unshift(storage);
  if (!environment.production) {
    metaReducers.unshift(storeFreeze);
    if (!environment.test) {
      metaReducers.unshift(debug);
    }
  }

  return metaReducers;
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}
