import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler):any{
    const modifiedRequest = request.clone({
      headers:request.headers.append(
        'authorization',
        `Bearer ${this.auth.getToken()}`
      )
    });
    return handler.handle(modifiedRequest);
  }
}
