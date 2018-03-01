/**
 * Created by zhaowei on 2017/10/17.
 */
export class LoginVo {
  private _loginName: string;
  private _password: string;

  get loginName(): string {
    return this._loginName;
  }

  set loginName(value: string) {
    this._loginName = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
