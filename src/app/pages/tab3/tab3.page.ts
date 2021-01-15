import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  noticias: Article[] = [];

  slideOpts = {
    allowSlidePrev: false,
    alloSlideNext: false,
    
  };

  constructor(public dataLocalService: DataLocalService) {
  }

}
