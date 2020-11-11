/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  forwardRef,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { fromEvent, Subject, Subscription } from "rxjs";
import { takeUntil, distinctUntilChanged, debounceTime } from "rxjs/operators";

@Component({
  selector: "lh-numberInput",
  templateUrl: "./number-input.component.html",
  styleUrls: ["./number-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ],
  host: {
    //'(blur)':'onTouched()',
    "[style.width]": "_width"
  }
})
export class NumberInputComponent
  implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  showInput: boolean = false;
  _disabled: boolean = false;
  _factor: number = 1;
  _width: string = undefined;
  @Input() placeholder: string = "";
  @Input() title: string = "";
  //@HostBinding("style.width") hostWidth = undefined;
  @Input() tabindex: number = 0;
  @Input() set factor(val: number) {
    this._factor = Math.round(val);
    this.cdr.markForCheck();
  }
  @Input() set disabled(val: boolean) {
    this._disabled = val;
    this.cdr.markForCheck();
  }
  @Input() prefix: string = "";
  @Input() postfix: string = "";
  @Input() set width(val: number | string) {
    if (parseFloat(val.toString())) {
      this._width = `${val}px`;
    } else {
      this._width = val.toString();
    }
    this.cdr.markForCheck();
  }
  @Input() decimals: number = 0;
  @Input("value") set value(val: number) {
    if (this._input && val) {
      this._input.nativeElement.value = (val * this._factor).toFixed(
        this.decimals
      );
    } else {
      this._input.nativeElement.value = null;
    }
    if (this._display && val) {
      this._display.nativeElement.value = this.formatDisplay(
        (val * this._factor).toFixed(this.decimals)
      );
    } else {
      this._display.nativeElement.value = null;
    }
    this.cdr.markForCheck();
  }
  @Output("valueChange") valueOutput: EventEmitter<
    number | string
  > = new EventEmitter();
  @Output("blur") blurOutput: EventEmitter<FocusEvent> = new EventEmitter();
  @Output("focus") focusOutput: EventEmitter<FocusEvent> = new EventEmitter();
  @ViewChild("inputCtr", { static: true }) _input: ElementRef;
  @ViewChild("displayCtr", { static: true }) _display: ElementRef;
  private subs$ = new Subscription();

  constructor(private cdr: ChangeDetectorRef) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
  private setFocus = (e: FocusEvent): void => {
    this.showInput = true;
    setTimeout(() => {
      this._input.nativeElement.focus();
      this.onTouched(e);
      this.focusOutput.emit(e);
      this.cdr.markForCheck();
    });
    this.cdr.markForCheck();
  };
  ngAfterViewInit(): void {
    this.subs$.add(
      fromEvent<FocusEvent>(this._display.nativeElement, "focus").subscribe(
        s => {
          this.setFocus(s);
        }
      )
    );
    this.subs$.add(
      fromEvent<KeyboardEvent>(this._input.nativeElement, "input")
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe(() => {
          const v = parseFloat(this._input.nativeElement.value) / this._factor;
          this._display.nativeElement.value = this._input.nativeElement.value
            ? this.formatDisplay(
                parseFloat(this._input.nativeElement.value).toFixed(
                  this.decimals
                )
              )
            : null;
          this.valueOutput.emit(v ?? null);
          this.onChanged(v ?? null);
          this.cdr.markForCheck();
        })
    );

    this.subs$.add(
      fromEvent<FocusEvent>(this._input.nativeElement, "blur").subscribe(s => {
        // console.log("merged", s)
        this.showInput = false;
        this.blurOutput.emit(s);
        this.cdr.markForCheck();
        // this._input.nativeElement.focus()
      })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  onChanged = (_: any): void => {};
  onTouched = (_: any): void => {};
  writeValue(obj: any): void {
    if (obj) {
      if (typeof obj == "number") {
        // eslint-disable-next-line no-empty
      } else if (typeof obj == "string") {
      } else {
        throw "Unable to cast input to number";
      }

      if (this._input) {
        this._input.nativeElement.value = (
          (obj as number) * this._factor
        ).toFixed(this.decimals);
      }
      if (this._display) {
        this._display.nativeElement.value = this.formatDisplay(
          ((obj as number) * this._factor).toFixed(this.decimals)
        );
      }
    } else {
      this._input.nativeElement.value = null;
      this._display.nativeElement.value = null;
    }
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
  public focus = (): void => {
    this.setFocus(new FocusEvent("focus"));
  };
  private formatDisplay = (val: string | number): string => {
    return val ? `${this.prefix}${val.toString()}${this.postfix}` : "Null";
  };
}
