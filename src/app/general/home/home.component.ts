import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/*interface Article {
  description: string;
  courseListIcon:string;
  iconUrl:string;
  longDescription:string;
  url:string;
  id: number;
  title: string;
}
*/


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    
   
     
  }


  

}
