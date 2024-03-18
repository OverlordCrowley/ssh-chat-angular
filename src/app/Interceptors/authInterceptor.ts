import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const user = localStorage.getItem("user");

    if (user) {
      let token = JSON.parse(user)
      if(new Date() > new Date(token.expires) ){
        localStorage.setItem('user','')
        this.router.navigate(['login'])
      }
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
