import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransmissionResponse } from '../interface/transmission-response';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtService } from '../services/jwt.service';
import { catchError, firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TransmissionService {
  constructor(
    private _http: HttpClient,
		private _httpErrorHandler: HttpErrorHandlerService,
		private _localStorage: LocalStorageService,
		private _jwt: JwtService,
  ) { }

  public executeGetRequest<T extends ITransmissionResponse>(
		url: string,
		params?: { [key: string]: any },
		requiresAuthentication: boolean = true
	) {
		return this._http.get<T>(url, {
			headers: this._jwt.injectToken(requiresAuthentication),
			params
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		);
	}

  public async executeGetRequestPromise<T extends ITransmissionResponse>(
		url: string,
		params?: { [key: string]: any },
		requiresAuthentication: boolean = true
	) {
		console.log("entered here: ",url)
		return await firstValueFrom(this._http.get<T>(url, {
			headers: this._jwt.injectToken(requiresAuthentication),
			params
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		));
	}

  public executePostRequest<T>(
		url: string,
		payload: any,
		requiresAuthentication: boolean = true
	) {
		return this._http.post<ITransmissionResponse>(url, payload, {
			headers: this._jwt.injectToken(requiresAuthentication)
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		);
	}

  public async executePostRequestPromise<T>(
		url: string,
		payload: any,
		requiresAuthentication: boolean = true
	) {
		return await firstValueFrom(this._http.post<ITransmissionResponse>(url, payload, {
			headers: this._jwt.injectToken(requiresAuthentication)
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		));
	}

  public executePatchRequest<T>(
		url: string,
		payload: any,
		requiresAuthentication: boolean = true
	) {
		return this._http.patch<ITransmissionResponse>(url, payload, {
			headers: this._jwt.injectToken(requiresAuthentication)
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		);
	}

	public async executePatchRequestPromise<T>(
		url: string,
		payload: any,
		requiresAuthentication: boolean = true
	) {
		return await firstValueFrom(this._http.patch<ITransmissionResponse>(url, payload, {
			headers: this._jwt.injectToken(requiresAuthentication)
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		));
	}

  public executeDeleteRequest<T>(
		url: string,
		params?: { [key: string]: any },
		requiresAuthentication: boolean = true
	) {
		return this._http.delete<ITransmissionResponse>(url, {
			headers: this._jwt.injectToken(requiresAuthentication),
			params
		}).pipe(
			catchError((error) => this._httpErrorHandler.intercept(error))
		);
	}
}
