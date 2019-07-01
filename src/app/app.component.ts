import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngControls';
  value: number = 0.3;
  val:number = 20;
  valUndefined:number = 0.14;
  inputControl:FormControl;
  formGroup:FormGroup;
  ngOnInit(){
    this.formGroup = new FormGroup({
      inputControl: new FormControl(.21)
    });
   

  }
  onChange = (val)=>{
    console.log("valueChange",val);
  }
  onFocus =(e)=>{
    console.log("Focus", e);
  }
  
  onBlur =(e)=>{
    console.log("Blur", e);
  }
}
