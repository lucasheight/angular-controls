# Angular-controls

## Number Input Component
A number input component.
**Features**
* Provides a 'factor' attribute to allow a display multiplication without change to model value.
This is useful when you want to display a decimal value as a percentage  (i.e. 01 * 100).
* Prefix and postfix inputs to allow display of additional strings.
* Supports template and reactive forms.

### Installation

Install the library from npm:

`npm install --save @lucasheight/angular-controls`

### Using component
Import the module into your angular application module.

`import {LhControlsModule} from "@lucasheight/angular-controls"`

`@NgModule({
    imports:[
      LhControlsModule
    ]
})
export class AppModule{}`

Add the control in you template:

`<lh-numberInput factor="1" prefix="$" postfix=" AUD" (valueChange)="onChange($event)" (focus)="onFocus($event)"
    (blur)="onBlur($event)" width="100" [(value)]="val"></lh-numberInput>`