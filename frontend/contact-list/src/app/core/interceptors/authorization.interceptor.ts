  import { HttpInterceptorFn } from '@angular/common/http';

  export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('authToken');

    const authReq = authToken ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    }) : req;

    return next(authReq);
  };
