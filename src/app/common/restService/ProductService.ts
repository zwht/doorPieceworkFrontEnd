/**
 * Created by zhaowei on 2017/10/16.
 */
import {Injectable} from '@angular/core';
import {HttpServer} from '../service/HttpServer';
@Injectable()
export class ProductService {

  url = '/cfmy/product/:params1/:params2/:params3/:params4/:params5';
  urls = {
    add: {
      method: 'post',
      params: {
        params1: 'add'
      }
    },
    addList: {
      method: 'post',
      params: {
        params1: 'addList'
      }
    },
    list: {
      method: 'post',
      params: {
        params1: 'list'
      }
    },
    getById: {
      method: 'get',
      params: {
        params1: 'getById'
      }
    },
    update: {
      method: 'post',
      params: {
        params1: 'update'
      }
    },
    del: {
      method: 'get',
      params: {
        params1: 'del'
      }
    }
  };
  constructor( httpServer: HttpServer) {
    httpServer.S(this);
  }
}
