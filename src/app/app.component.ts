import { Component, ViewEncapsulation } from '@angular/core';
import { CookiesService } from 'src/app/services/cookie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


//type Language = 'en' | 'de' | 'fr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-starter';
  version = 'Angular version 13.2.1';

  //translate: TranslateService;
  cookiesService: CookiesService;

  constructor(/*private bnIdle: BnNgIdleService, private router: Router*/){
   // this.translate = translate;
   // translate.setDefaultLang('en');
   
  }

  /*switchLanguage = (lang: Language) => {
    this.translate.use(lang);
  }*/


 /* ngOnInit(): void {
    this.bnIdle.startWatching(environment.session_time).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.router.navigate([""]);
      }
    });
  }*/
}