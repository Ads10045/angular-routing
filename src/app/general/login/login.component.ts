import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


type Language = 'en' | 'de' | 'fr';
const LANG_KEY = 'Language';
const Langue = sessionStorage.getItem(LANG_KEY);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  translate: TranslateService;

  constructor(/*private userIdle: UserIdleService,*/ translate: TranslateService, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) {
    this.translate = translate;
    
       
        if (Langue) {
          translate.setDefaultLang(Langue);
        }else{
          translate.setDefaultLang('fr');
        }  

   }

  ngOnInit(): void {

    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

     
    
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }


  switchLanguage = (lang: Language) => {
    sessionStorage.setItem(LANG_KEY, lang); 
    this.translate.use(lang);
  }



}
