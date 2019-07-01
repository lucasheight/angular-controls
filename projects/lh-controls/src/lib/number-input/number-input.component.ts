import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy, AfterViewInit, ElementRef, forwardRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { fromEvent, Subject, pipe } from 'rxjs';
import { takeUntil, take, distinctUntilChanged, debounceTime } from "rxjs/operators";



@Component({
  selector: 'lh-numberInput',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NumberInputComponent), multi: true }
  ],
  host: {
    //'(blur)':'onTouched()',
    '[style.width]': '_width'
  }
})
export class NumberInputComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  private numberReg = /\d+/g;
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
  };
  @Input() set disabled(val: boolean) {
    this._disabled = val;
  }
  @Input() prefix: string = "";
  @Input() postfix: string = "";
  @Input() set width(val: number | string) {
    if (parseFloat(val.toString())) {
      this._width = `${val}px`;
    }
    else {
      this._width = val.toString();
    }
  };
  @Input("value") set value(val: number) {

    if (this._input) {
      this._input.nativeElement.value = val * this._factor;
    }
    if (this._display) {
      this._display.nativeElement.value = this.formatDisplay(val * this._factor);
    }
  };
  @Output("valueChange") valueOutput: EventEmitter<number> = new EventEmitter();
  @Output("blur") blurOutput: EventEmitter<FocusEvent> = new EventEmitter();
  @Output("focus") focusOutput: EventEmitter<FocusEvent> = new EventEmitter();
  @ViewChild("inputCtr", { static: true }) _input: ElementRef;
  @ViewChild("displayCtr", { static: true }) _display: ElementRef;
  private destroy$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {

    fromEvent<FocusEvent>(this._display.nativeElement, "focus").pipe(takeUntil(this.destroy$))
      .subscribe(s => {
        //console.log("focus", s)
        this.showInput = true;
        setTimeout(() => {
          this._input.nativeElement.focus()
          this.onTouched(s);
          this.focusOutput.emit(s)
        });
      });
    fromEvent<KeyboardEvent>(this._input.nativeElement, "input").pipe(
      takeUntil(this.destroy$),
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(s => {
        //console.log("input", s)
        let v = parseFloat(this._input.nativeElement.value) / this._factor;
        this._display.nativeElement.value = this.formatDisplay(parseFloat(this._input.nativeElement.value) || null);
        this.valueOutput.emit(v || null);
        this.onChanged(v || null);
      });

    fromEvent<FocusEvent>(this._input.nativeElement, "blur").pipe(takeUntil(this.destroy$))
      .subscribe(s => {
        // console.log("merged", s)
        this.showInput = false;
        this.blurOutput.emit(s);
        // this._input.nativeElement.focus()
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onChanged = (_: any) => { };
  onTouched = (_: any) => { };
  writeValue(obj: any): void {
    let _num = null;
    if (obj) {
      if (typeof obj == "number") {
        _num = obj as number;
      }
      else if (typeof obj == "string") {
        _num = parseFloat(obj);
      }
      else { throw "Unable to cast input to number" }

      if (this._input) {
        this._input.nativeElement.value = (obj as number) * this._factor;
      }
      if (this._display) {
        this._display.nativeElement.value = this.formatDisplay((obj as number) * this._factor);
      }


    }
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
  private formatDisplay = (val: string | number): string => {
    return val ? `${this.prefix}${val.toString()}${this.postfix}` : "Null";
  }
}
