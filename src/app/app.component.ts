import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = "ngControls";
  value: number = 0.3;
  val: number = 20;
  valUndefined: number = 0.14;
  inputControl: FormControl;
  formGroup: FormGroup;
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      inputControl: new FormControl(0.21)
    });
  }
  onChange = (val): void => {
    console.log("valueChange", val);
  };
  onFocus = (e): void => {
    console.log("Focus", e);
  };

  onBlur = (e): void => {
    console.log("Blur", e);
  };
  onClick = (e): void => {
    console.log("Button Clicked", e);
    //  interval(2000).subscribe(() => {

    const ran = Math.random();
    this.val = ran;
    this.value = ran;
    this.valUndefined = ran;
    this.formGroup.get("inputControl").setValue(ran);
    console.log("new number", ran);
    //})
  };
  onNull = (): void => {
    const ran = null;
    this.val = ran;
    this.value = ran;
    this.valUndefined = ran;
    this.formGroup.get("inputControl").setValue(ran);
  };
}
