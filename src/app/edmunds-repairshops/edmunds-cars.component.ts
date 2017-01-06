
import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { CarService } from '../edmund.service';

@Component({
	selector: 'repairstore-details',
	templateUrl: './edmund-cars-component.html',
  styleUrls: ['../semantic.min.css'],	
	providers: [ CarService],
})

export class CarRepairStoreComponent {
	isVisible: boolean = false;	
  edmundsForm : FormGroup;
  name: AbstractControl;
	 private searchTermStream = new Observable<Array<string>>();

	constructor (private carService: CarService,fb: FormBuilder) {
    this.edmundsForm = fb.group({
    'name' : [' ',Validators.required],
  });
  this.name = this.edmundsForm.controls['name'];
  }

	items: Array<any[]>;
	public namesOfCars: Array<any> = [];
	public yearsLength: Array<any> = [];
  public currentModel: string;
	myForm: FormGroup;

  onSubmit(form: any): void {
    this.currentModel = form;
    this.carService.repairshopsInfo(form)
      .debounceTime(400)
      .subscribe(results => this.items=results);
  }

}
    

