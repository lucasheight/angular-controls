import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval } from "rxjs"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'ngControls';
  value: number = 0.3;
  val: number = 20;
  valUndefined: number = 0.14;
  inputControl: FormControl;
  formGroup: FormGroup;
  ngOnInit() {
    this.formGroup = new FormGroup({
      inputControl: new FormControl(.21)
    });


  }
  onChange = (val) => {
    console.log("valueChange", val);
  }
  onFocus = (e) => {
    console.log("Focus", e);
  }

  onBlur = (e) => {
    console.log("Blur", e);
  }
  onClick = (e) => {
    console.log("Button Clicked", e);
    //  interval(2000).subscribe(() => {

    let ran = Math.random();
    this.val = ran
    this.value = ran;
    this.valUndefined = ran;
    this.formGroup.get("inputControl").setValue(ran);
    console.log("new number", ran);
    //})
  }
  onNull = () => {
    const ran = null;
    this.val = ran;
    this.value = ran;
    this.valUndefined = ran;
    this.formGroup.get("inputControl").setValue(ran);
  }
}
