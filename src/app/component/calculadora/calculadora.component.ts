import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  public calcButtons = [
    { name: 'action', value: 'AC' },
    { name: 'action', value: '+/-' },
    { name: 'action', value: '%' },
    { name: 'action', value: '/' },
    { name: 'num', value: '7' },
    { name: 'num', value: '8' },
    { name: 'num', value: '9' },
    { name: 'action', value: '*' },
    { name: 'num', value: '4' },
    { name: 'num', value: '5' },
    { name: 'num', value: '6' },
    { name: 'action', value: '-' },
    { name: 'num', value: '1' },
    { name: 'num', value: '2' },
    { name: 'num', value: '3' },
    { name: 'action', value: '+' },
    { name: 'action', value: '(  )' },
    { name: 'num', value: '0' },
    { name: 'action', value: '.' },
    { name: 'action', value: '=' },
  ];

  public calcValues: Array<any> = [];
  public calcScreenControl = false;
  public currentPercent = 0;

  currentValue = 0;
  operationValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  public calcClick(btnClicked = { name: 'num', value: '0' }) {
    if(btnClicked.name === 'action') {
      this.actionBtn(btnClicked);
    } else {
      if(this.calcValues.length == 2 && this.calcScreenControl) {
        this.currentValue = parseInt(btnClicked.value);
        this.calcScreenControl = false;
      } else {
        this.currentValue = parseInt(`${this.currentValue}${btnClicked.value}`);
      }
    }
  }

  public actionBtn(btnClicked = { name: '', value: '' }) {
    switch(btnClicked.value) {
      case 'AC':
        this.currentValue = 0;
        this.calcValues = [];
        this.calcScreenControl = false;
        break
      case '=':
        this.calcValues.push(this.currentValue);
        if(this.calcValues.length == 3)
          this.calculate(true);
        break;
      case '+/-':
        this.currentValue = this.currentValue * -1;
        break
      case '%':
        if(this.calcValues.length < 1) {
          this.currentValue = this.currentValue / 100;
        } else {
          this.currentPercent = this.calcValues[0] * this.currentValue / 100;
          this.calcValues.push(this.currentPercent);
          this.calculate();
        }
      break;
      default:
        this.calcValues.push(this.currentValue);

        if(this.calcValues.length == 3) {
          this.calculate();
        }
        this.calcValues.push(btnClicked.value);
        this.calcScreenControl = true;
        console.log(this.calcValues)
        break;
    }
  }

  public calculate(isEqual = false) {
    this.currentValue = eval(`${parseFloat(this.calcValues[0])} ${this.calcValues[1]} ${parseFloat(this.calcValues[2])}`);
    this.calcValues = [];
    if(!isEqual)
      this.calcValues.push(this.currentValue);
  }

}
