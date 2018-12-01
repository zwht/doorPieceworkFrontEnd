import {Injectable} from '@angular/core';

import {HttpServer} from '../service/HttpServer';
@Injectable()
export class AuthService {
  url = '/cfmy/user/:params1/:params2/:params3/:params4/:params5';
  urls = {
    login: {
      method: 'post',
      params: {
        params1: 'login'
      }
    }
  };

  constructor( httpServer: HttpServer) {
    httpServer.S(this);
  }
}
