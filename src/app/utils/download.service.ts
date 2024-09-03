import { Injectable } from '@angular/core';
import html2canvas from "html2canvas";
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadInvitation(): void {
    const invitationCard = document.getElementById('invitation-card');
    if (invitationCard) {
      html2canvas(invitationCard).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, 'wedding-invitation.png');
          }
        });
      });
    }
  }
}
