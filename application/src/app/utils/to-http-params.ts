import { HttpParams } from '@angular/common/http';

export const toHttpParams = (object) => {
  let httpParams = new HttpParams();

  Object.keys(object).forEach((key) => {
    if (typeof object[key] !== 'undefined') {
      httpParams = httpParams.append(key, object[key]);
    }
  });

  return httpParams;
};
