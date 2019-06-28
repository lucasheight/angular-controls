import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentInputComponent } from './percent-input.component';
import { DebugElement } from '@angular/core';

describe('PercentInputComponent', () => {
  let component: PercentInputComponent;
  let fixture: ComponentFixture<PercentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercentInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("value should be '.55'", () => {

    component.value = .55;
    fixture.detectChanges();
  

    fixture.whenStable().then(n=>{
      const el: DebugElement = fixture.debugElement;
      let ip = el.nativeElement.querySelector("input.lh-input");
      expect(ip.value).toBe(55);
    })
   // setTimeout(() => {
      
   //}, 100)

  })
})
