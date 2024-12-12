import { Component } from '@angular/core';
import { TransmissionService } from '../transmission/transmission.service';
import { RequestMapperService } from '../services/request-mapper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private _transmit: TransmissionService,
    private _router: Router
  ) {}

  clicked(): void {
    console.log("clicked")
    // this._transmit.executeGetRequestPromise(
    //   `${RequestMapperService.CHECK}`)
    //   .then((res: any) => {
    //     console.log(res)
    //   })
    //   .catch((err: any) => {
    //     console.log("err",err)
    //   })
    this._router.navigate([`${RequestMapperService.AUTH}/${RequestMapperService.LOGIN}`])
  }

}
