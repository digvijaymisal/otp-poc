import { Component, OnInit, ViewChildren, ElementRef ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataLayerService } from './data-layer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'otp-poc';
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  @ViewChild('otpForm')
  otpForm!: ElementRef<HTMLElement>;
  formSubmitted : boolean = false;
  dummyMailId : string = "dummy_user@dummy.dk";

  ngOnInit() {
  }

  constructor(private dataService: DataLayerService, private _snackBar: MatSnackBar) {
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements:any) {
    const group: any = {};
    elements.forEach((key: string | number) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event:any, index:number) {
    let pos = index;
    if ((event.keyCode === 37 && event.which === 37)) {
      pos = index - 1 ;
    } else if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
      pos = index + 1 ;
      let currentValue = this.form.get('input'+index)?.value; 
      if(currentValue != ""){
        this.form.get('input'+pos)?.setValue(event.key);
        if(this.form.valid){
          let el: HTMLElement = this.otpForm.nativeElement;
          el.click();
        }
      }
    }else if ((event.keyCode === 39 && event.which === 39)){
      pos = index + 1 ;
    }else if((event.keyCode === 8 && event.which === 8)){
      pos = index - 1 ;
      this.form.get('input'+(index+1))?.setValue("");
    }
    if (pos > -1 && pos < this.formInput.length ) {
      this.rows._results[pos].nativeElement.focus();
    }
  }
  
  validateInput(event:any, index:number){
    let regexStr = '^[0-9]*$';
    let ch = String.fromCharCode(event.keyCode);
    let regEx =  new RegExp(regexStr);    
    if(regEx.test(ch)){
      return;
    }else{
       event.preventDefault();
    }
  }

  openSnackBar(msg:any) {
    this._snackBar.open(msg,'',{
      duration: 3000,
      panelClass: ['nf-snackbar']
    });
  }

  onSubmit() {
    if(this.form.valid){
    this.formSubmitted = true;
    this.openSnackBar("Please wait while verifying the code");
    this.dataService.getDummyResponse()
      .subscribe(data => {
        setTimeout(() =>{
          this.formSubmitted = false;
          this.openSnackBar("Verified Successfully");
        },2000);
      });
    }
  }
}
