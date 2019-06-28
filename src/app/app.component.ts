import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngControls';
  value: number = 0.3;
  ngOnInit(){


  }
  onChange = (val)=>{
    console.log("valueChange",val);
  }
}
