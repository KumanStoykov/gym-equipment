import { Component, OnInit } from '@angular/core';

import { faFacebook, faTwitter, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    icons = {
        faPhone,
        faFacebook,
        faTwitter,
        faInstagram,
        faPinterest,
        faGoogle,
        faGift
    }

  constructor() { }

  ngOnInit(): void {
  }

}
