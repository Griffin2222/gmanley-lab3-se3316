import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmcaService } from '../dmca.service';

@Component({
  selector: 'app-copyright-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copyright-info.component.html',
  styleUrl: './copyright-info.component.css'
})
export class CopyrightInfoComponent {
  constructor(private dmcaService: DmcaService){}

  async filedmca(notes:string) {
    
      const id= 123;
      const dateRequestReceived = new Date();
     const  dateDisputeReceived = new Date();
     const dateNoticeSent= new Date();
      const status= true;
    

   const response = await this.dmcaService.fileDmca(id, dateRequestReceived, dateDisputeReceived, dateNoticeSent, notes, status);
    console.log(response);
  }

}
