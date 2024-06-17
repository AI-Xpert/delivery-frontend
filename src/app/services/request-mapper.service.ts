import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.local';


@Injectable({
  providedIn: 'root'
})
export class RequestMapperService {
    // URL for App Routing
    public static readonly BASE_RELATIVE_URL: string = '';
    public static readonly ROOT_URL: string = '/';
    
    //URL for API endpoints
    public static readonly REGISTER_URL: string = environment.SERVER_ENDPOINT + 'auth/register';
    public static readonly CHECK: string = environment.SERVER_ENDPOINT + 'auth/check';
    
    constructor() {}
  
    public static getAbsoluteUrl(url: string): string {
      return RequestMapperService.ROOT_URL + url;
    }
}
