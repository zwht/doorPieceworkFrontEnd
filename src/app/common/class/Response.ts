/**
 * Created by zhaowei on 2017/10/17.
 */
export class Response<D> {
  code: number;
  message: string;
  messageObj: Object;
  data: D;
}
