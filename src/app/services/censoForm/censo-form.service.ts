import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CensoFormService<T> {

  private state = signal<T>({} as T);

  constructor() { }

  public set<K extends keyof T>(key: K, data: T[K]): void {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  public setState(partialState: Partial<T>): void {
    this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
  }

  public getState(): T {
    return this.state(); // Devuelve el valor actual del estado
  }

  public select<K extends keyof T>(key: K) {
    return computed(() => this.state()[key]);
  }
}
