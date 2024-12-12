import { Component, OnInit } from '@angular/core';
import { ITransmissionResponse } from 'src/app/interface/transmission-response';
import { RequestMapperService } from 'src/app/services/request-mapper.service';
import { TransmissionService } from 'src/app/transmission/transmission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(
    private _transmit: TransmissionService
  ) { }

  public phoneNumber!: any

  ngOnInit() {}

  public async sendOTP(): Promise<void> {
    console.log("phone Number: ",this.phoneNumber);
    console.log("type of phone Number: ",typeof this.phoneNumber);
    const payload = {
      phone: this.phoneNumber
    }
    await this._transmit.executePostRequestPromise(`${RequestMapperService.CHECK}`, payload)
    .then((res: ITransmissionResponse) => {
      console.log("res: ",res);
    })
    .catch((err: any) => {
      console.log("err: ",err)
    })
  }
}
