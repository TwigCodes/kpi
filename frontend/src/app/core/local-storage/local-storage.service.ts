import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const APP_PREFIX = 'NWCDKPI-';

@Injectable()
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId) {}

  loadInitialState() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  setItem(key: string, value: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  removeItem(key: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  testLocalStorage() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const testValue = 'testValue';
    const testKey = 'testKey';
    let retrievedValue: string;
    const errorMessage = 'localStorage did not return expected value';

    this.setItem(testKey, testValue);
    retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
