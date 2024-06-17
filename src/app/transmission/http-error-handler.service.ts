import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../services/constant.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {
  constructor() {
	}

	private static prepareErrorMessage(
		error: HttpErrorResponse
	): string {

		// if (!environment.production) console.trace();
    // console.log('Error Handler: ', error)

		let errorMessage: string;

		if (error.error instanceof HttpErrorResponse) errorMessage = error.error.message;
		else if (error.status === 0) errorMessage = ConstantService.COULD_NOT_CONNECT_TO_SERVER_ERROR;
		else errorMessage = error.error.message;

		return errorMessage;
	}

	public intercept(error: HttpErrorResponse): Observable<any> {
		return throwError(
			() => HttpErrorHandlerService.prepareErrorMessage(error)
		);
	}
}
