import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { States } from 'src/app/common/enums/states';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CardsComponent implements OnInit {
  results: any = [];
   errorMessage = '';
   
   isHideMajor = "hide";
   isHideMinor = "hide";
  constructor(public restApi: RestApiService, private logger: NGXLogger) {

    /*this.logger.debug("Debug message");
    this.logger.info("Info message");
    this.logger.log("Default log message");
    this.logger.warn("Warning message");
    this.logger.error("Error message");*/

  }

  ngOnInit() {
    this.loadCards();
  }

  // Get card list
  loadCards() {

    return this.restApi.getCards().subscribe((data: {}) => {
      this.results = data;
      //console.log('loadCards' + this.results.cards);
      this.logger.warn("Warning results card : ", this.results.entities);
      
    }, error => {
      console.log(error); 
      this.errorMessage = error;
      this.isHideMajor = "";
      this.isHideMinor = "hide";
    
    });


 }
 
  objectKeys(obj: any) {

    if (obj) {
      return Object.keys(obj);
    }

    return null;

   
  }
  



   getStatusCode(value: number): string {
    switch (value) {
      case 51:  return States.VB 
      case 52:  return States.VG
      case 53:  return States.VC 
      default:
        return States.VC
    }
  }



 

}
