import { Component } from '@angular/core';
import { TransmissionService } from '../transmission/transmission.service';
import { RequestMapperService } from '../services/request-mapper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private _transmit: TransmissionService
  ) {}

  clicked(): void {
    console.log("clicked")
    this._transmit.executeGetRequestPromise(
      `${RequestMapperService.CHECK}`)
      .then((res: any) => {
        console.log(res)
      })
      .catch((err: any) => {
        console.log("err",err)
      })
  }

}
