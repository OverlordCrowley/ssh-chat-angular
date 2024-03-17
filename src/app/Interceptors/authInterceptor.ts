import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const user = localStorage.getItem("user");

    if (user) {
      let token = JSON.parse(user)

      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token.accessToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
