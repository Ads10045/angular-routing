import { Component, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
type Language = 'en' | 'de' | 'fr';
const LANG_KEY = 'Language';
const Langue = sessionStorage.getItem(LANG_KEY);
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent  {
  home = 'Home';
  name= 'Youness Abach';
  translate: TranslateService;

  constructor(translate: TranslateService){
    this.translate = translate;
   
    if (Langue) {
      translate.setDefaultLang(Langue);
    }else{
      translate.setDefaultLang(LANG_KEY);
    }   

    sessionStorage.setItem(LANG_KEY, Langue || 'en'); 
  }

  switchLanguage = (lang: Language) => {
    this.translate.use(lang);
  }
}
