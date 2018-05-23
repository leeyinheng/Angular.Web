import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatetimepickerComponent),
  multi: true
};


@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css'], 
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatetimepickerComponent implements ControlValueAccessor {
  @Input() Placeholder: string; 

  date: Date; 

  dateStruct: NgbDateStruct; 

  timeStruct: NgbTimeStruct; 

  datePicker: any; 

  private onChangeCallback: (date: Date) => void = () => {}; 
  
  constructor(private cdr: ChangeDetectorRef) { }

  writeValue(date: Date): void {
    this.date = date; 
    this.dateStruct = {
      day: getDate(date), 
      month: getMonth(date) + 1 , 
      year: getYear(date)
    }; 
    this.timeStruct = {
      second: getSeconds(date), 
      minute: getMinutes(date), 
      hour: getHours(date)
    }
    this.cdr.detectChanges(); 
  }

  registerOnChange(fn: any) : void{
    this.onChangeCallback = fn; 
  }

  registerOnTouched(fn: any) : void {}

  updateDate(): void {
    const newDate: Date = setYear(
      setMonth(
        setDate(this.date, this.dateStruct.day), 
        this.dateStruct.month -1 
      ), 
      this.dateStruct.year
    ); 
    this.writeValue(newDate); 
    this.onChangeCallback(newDate); 
    
  }

  updateTime(): void {
    const newDate: Date = setHours(
      setMinutes(
        setSeconds(this.date, this.timeStruct.second),
        this.timeStruct.minute
      ),
      this.timeStruct.hour
    );
    this.writeValue(newDate);
    this.onChangeCallback(newDate);
  }

  ngOnInit() {
  }

}
