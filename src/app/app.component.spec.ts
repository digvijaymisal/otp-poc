import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { Component, OnInit, ViewChildren, ElementRef ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataLayerService } from './data-layer.service';
import { OverlayModule } from '@angular/cdk/overlay';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        OverlayModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [DataLayerService,MatSnackBar],
    }).compileComponents();
  });

    let component: AppComponent;
    let service: DataLayerService;
    let snack : MatSnackBar;
    let spy: any;
    let formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];

    beforeEach(() => {
        component = new AppComponent(service,snack);
    });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'otp-poc'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('otp-poc');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toolbar span').textContent).toContain('November First');
  });

  it(`should have formSubmitted to be false intially`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.formSubmitted).toBe(false);
  });

  it(`should have check dummyMailId`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.dummyMailId).toEqual('dummy_user@dummy.dk');
  });

  it(`from input array should have length 6`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const fromLength = app.formInput.length;
    expect(fromLength).toEqual(6);

  });

  it('should call toFormGroup function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'toFormGroup');
    fixture.detectChanges();
    app.toFormGroup(formInput);
    expect(app.toFormGroup).toHaveBeenCalled();
    expect(app.toFormGroup).toHaveBeenCalledTimes(1);
  });

  it('should called keyUpEvent function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'keyUpEvent');
    fixture.detectChanges();
    let event ={
      keyCode:37,
      which:37
    };
    let index = 1;
    app.keyUpEvent(event,index);
    expect(app.keyUpEvent).toHaveBeenCalled();
  });

  it('should called validateInput function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'validateInput');
    fixture.detectChanges();
    let event ={
      keyCode:37,
      which:37
    };
    let index = 1;
    app.validateInput(event,index);
    expect(app.validateInput).toHaveBeenCalled();
  });

  it('should called keyUpEvent function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'onSubmit');
    app.onSubmit();
    expect(app.form.valid).toBeFalse();
  });

  it('should called openSnackBar function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'openSnackBar');
    let msg = "dummy_msg";
    let dumyObj = {
      duration: 3000,
      panelClass: ['nf-snackbar']
    }
    app.openSnackBar(msg);
    expect(app.openSnackBar).toHaveBeenCalledWith(msg);
  });
  
  
});
