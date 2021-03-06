[![npm version](https://badge.fury.io/js/%40lucasheight%2Fangular-controls.svg)](https://badge.fury.io/js/%40lucasheight%2Fangular-controls)
# Angular-controls

## Number Input Component
A number input component.
**Features**
* Provides a 'factor' attribute to allow a display multiplication without change to model value.
This is useful when you want to display a decimal value as a percentage  (i.e. 01 * 100).
* Prefix and postfix inputs to allow display of additional strings.
* Supports template and reactive forms.
* Attributes for title, placeholder, disabled and decimals.

### Installation

Install the library from npm:

`npm install --save @lucasheight/angular-controls`

### Using component
Import the module into your angular application module.

```javascript 
import {LhControlsModule} from "@lucasheight/angular-controls"
```

```javascript
@NgModule({
    imports:[
      LhControlsModule
    ]
})
export class AppModule{}
```

Add the control in you template:

```html
<lh-numberInput factor="1" decimals="2" title="Hello numbers" placeholder="Please enter" prefix="$" postfix=" AUD" (valueChange)="onChange($event)" (focus)="onFocus($event)"
    (blur)="onBlur($event)" width="100" [(value)]="val"></lh-numberInput>
```
