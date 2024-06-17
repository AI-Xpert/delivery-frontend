import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpHeaders } from '@angular/common/http';
import { ConstantService } from './constant.service';
import { isEmptyString, valueExists } from 'bmx-pastebox';



@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly _jwtHelper: JwtHelperService = new JwtHelperService();

  private readonly _KEY_AUTH_SUCCESS_ROUTE: string = 'xdDBAFnwwTAaprYRtynv';
  private readonly _KEY_89: string = 'SCKhEWgcRnGyLnGQjWhG';
  private readonly _KEY_67: string = 'SpkFPFCmYKtzQukGHtAQ';
  private readonly _KEY_12: string = 'MzafYmpcLbpAtTxrGTfZ';
  private readonly _KEY_28: string = 'ZjtzcwpUbRGPUpUNafcY';
  private readonly _KEY_35: string = 'fdbjuUSJAKVxMDEhbmmG';
  private readonly _KEY_85: string = 'JdLyprHCahWcvASHgQJP';
  private readonly _KEY_14: string = 'ZJffTqTMRpxcousrgpqL';
  private readonly _KEY_96: string = 'nZWdwCygSHhmwpbHMoFv';
  private readonly _KEY_51: string = 'iHrSiGmpTuGeBAZdLwLv';
  private readonly _KEY_77: string = 'RmCcaHaGpvpXGKYQskxm';

  private _jwtToken: string | null = null;
  private _expirationDate: Date | null = null;
  private _isExpired: boolean | null = null;

  constructor(private _localStore: LocalStorageService) {}

  private static shatterToken(token: string): string[] | null {
    // return token.match(/.{1,67}/g);
    const shatteredStringSize: number = 10;
    const chunkSize = Math.ceil(token.length / shatteredStringSize);
    const tokenChunks = [];

    for (let i = 0; i < shatteredStringSize; i++) {
      const start = i * chunkSize;
      const end = (i + 1) * chunkSize;
      tokenChunks.push(token.substring(start, end));
    }

    return tokenChunks;
  }

  private static prepareSchemeToken(token: string): string {
    return ConstantService.AUTHORIZATION_SCHEME + token;
  }

  private storeChunk(chunk: string, storeKey: string): void {
    this._localStore.store(storeKey, chunk);
  }

  public retrieveChunk(storeKey: string): string {
    const chunk: string = this._localStore.retrieve(storeKey);
    return isEmptyString(chunk) ? '' : chunk;
  }

  private storeJWT(token: string): void {
    // this._localStore.store('accessToken', token);
    const tokenChunks: string[] | null = JwtService.shatterToken(token);
    if (tokenChunks !== null && tokenChunks.length === 10) {
      this.storeChunk(tokenChunks[0], this._KEY_89);
      this.storeChunk(tokenChunks[1], this._KEY_67);
      this.storeChunk(tokenChunks[2], this._KEY_12);
      this.storeChunk(tokenChunks[3], this._KEY_28);
      this.storeChunk(tokenChunks[4], this._KEY_35);
      this.storeChunk(tokenChunks[5], this._KEY_85);
      this.storeChunk(tokenChunks[6], this._KEY_14);
      this.storeChunk(tokenChunks[7], this._KEY_96);
      this.storeChunk(tokenChunks[8], this._KEY_51);
      this.storeChunk(tokenChunks[9], this._KEY_77);
    }
  }

  public retrieveJWT(): string {
    if (this._jwtToken !== null) {
      return this._jwtToken;
    }

    this._jwtToken =
      this.retrieveChunk(this._KEY_89) +
      this.retrieveChunk(this._KEY_67) +
      this.retrieveChunk(this._KEY_12) +
      this.retrieveChunk(this._KEY_28) +
      this.retrieveChunk(this._KEY_35) +
      this.retrieveChunk(this._KEY_85) +
      this.retrieveChunk(this._KEY_14) +
      this.retrieveChunk(this._KEY_96) +
      this.retrieveChunk(this._KEY_51) +
      this.retrieveChunk(this._KEY_77);
    // this._jwtToken = this._localStore.retrieve('accessToken')
    return this._jwtToken;
  }

  public prepareJWT(token: string) {
    this._jwtToken = token;
    this._expirationDate = this._jwtHelper.getTokenExpirationDate(token);
    this._isExpired = this._jwtHelper.isTokenExpired(token);

    if (this._isExpired) throw new Error('expired token recieved');
    else this.storeJWT(token);
  }

  public isJWTUnexpired(forceCheck: boolean = false): boolean {
    if (this._expirationDate !== null)
      return this._expirationDate.getTime() > new Date().getTime();
    if (forceCheck) return !this._jwtHelper.isTokenExpired(this.retrieveJWT());

    return false;
  }

  public hasValidJWT(): boolean {
    try {
      const token: string = this.retrieveJWT();
      if (isEmptyString(token)) return false;
      if (this._jwtHelper.isTokenExpired(token)) return false;
      this._jwtToken = token;
      return true;
    } catch (err) {
      return false;
    }
  }

  public destroySession(): void {
    this._jwtToken = null;
    this._expirationDate = null;
    this._isExpired = null;

    // this._localStore.removeItems([
    // 	this._KEY_AUTH_SUCCESS_ROUTE,
    // ]);
    this._localStore.clear();
  }

  public injectToken(requiresAuthentication: boolean = true): HttpHeaders {
    let authorizationToken: string;
    let headers: HttpHeaders = new HttpHeaders({
      // 'Ocp-Apim-Subscription-Key': environment.SERVER_APIM_SUBSCRIPTION_KEY
    });

    if (requiresAuthentication) {
      authorizationToken = !this.isJWTUnexpired(true)
        ? ConstantService.EXPIRED_TOKEN
        : JwtService.prepareSchemeToken(this.retrieveJWT());

      if (!valueExists(this._jwtToken))
        authorizationToken = ConstantService.NO_JWT_TOKEN;

      // headers.append('authorization', authorizationToken);
      headers = new HttpHeaders({
        // 'Ocp-Apim-Subscription-Key': environment.SERVER_APIM_SUBSCRIPTION_KEY,
        authorization: authorizationToken,
      });
    }

    return headers;
  }
}
