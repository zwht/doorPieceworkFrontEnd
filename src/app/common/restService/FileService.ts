/**
 * Created by zhaowei on 2017/10/16.
 */
import {Injectable} from '@angular/core';
import {HttpServer} from '../service/HttpServer';
@Injectable()
export class FileService {

  url = './cfmy/file/:params1/:params2/:params3/:params4/:params5';
  urls = {
    upToken: {
      method: 'get',
      params: {
        params1: 'upToken'
      }
    }
  };
  constructor( httpServer: HttpServer) {
    httpServer.S(this);
  }
}
