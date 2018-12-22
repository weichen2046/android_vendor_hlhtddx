import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IModuleInfo {
  module_name: string;
  class: string[];
  path: string[];
  tags: string[];
  installed: string[];
  compatibility_suites: string[];
  auto_test_config: boolean[];
  test_config: string[];
  dependencies: string[];
  srcs: string[];
}

export interface IModulesInfo {
  [key: string]: IModuleInfo;
}

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  modulesInfo: IModulesInfo;
  constructor(private http: HttpClient) { }

  public loadDataFile(): Observable<boolean> {
    if (this.modulesInfo) {
      return of(true);
    }
    return this.http.get('assets/module-info.json').pipe(
      map(resp => {
        this.modulesInfo = resp as IModulesInfo;
        return true;
      }),
      catchError(err => of(false))
    );
  }

  public getModuleNames(): string[] {
    const names = [];
    if (this.modulesInfo) {
      for (const key in this.modulesInfo) {
        if (this.modulesInfo.hasOwnProperty(key)) {
          const moduleInfo = this.modulesInfo[key];
          names.push(moduleInfo.module_name);
        }
      }
    }
    return names;
  }

}
