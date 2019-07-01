import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputComponent } from './number-input.component';
import { DebugElement } from '@angular/core';

describe('PercentInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("value should be '.55'", () => {

    //component.value = .55;
    component.writeValue(.55);
    fixture.detectChanges();
    const el: DebugElement = fixture.debugElement;
    let ip = el.nativeElement.querySelector("input.lh-input");
    let dp = el.nativeElement.querySelector("input.lh-display");
    expect(dp.value).toBe(55);
    // setTimeout(() => {

    //}, 100)

  })
})
