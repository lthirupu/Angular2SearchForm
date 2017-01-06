import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { CarService } from '../edmund.service';

@Component({
	selector: 'car-details',
	templateUrl: './edmund.component.html',
  styleUrls: ['../semantic.min.css'],	
	providers: [ CarService],
})

export class CarComponent {
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
  photos: Array<any[]>;
  details:Observable<any[]>;
  pic:string;


	public namesOfCars: Array<any> = [];
	public yearsLength: Array<any> = [];
  public currentModel: string;
  public title: string;
  public des: string;
  public link :string;
  public body :string;


	myForm: FormGroup;

  onSubmit(form: any): void {
    this.currentModel = form;
    this.carService.search(form)
      .debounceTime(400)
      .subscribe(results => this.parseResponse(results));
   
    this.carService.getPhotos(form)
    .debounceTime(400)
    .subscribe(results => {
      this.photos=results;
      this.pic = results[4].link.href
      console.log(this.pic);});

    this.carService.getDetails(form)
    .debounceTime(400)
    .subscribe(results => {this.details=results; console.log(results);
      this.title= results.title;
      this.des= results.description;
      this.link = results.link.href;
      this.body = results.introduction;
      console.log(this.title);});
  }

	parseResponse(input: any) {
    console.log(input);
    this.items = input;

	  var noOfYears = {};
    var newList = {};
    for (let item of this.items) {
        var newItem: any = item;
        let singleModels = newItem.name;
			  this.namesOfCars.push(singleModels);
			  this.doughnutChartLabels.push(singleModels);
        this.pieChartLabels.push(singleModels);
      }
    for (let item of this.items) {
        var newItem: any = item;
        let singleModels = parseInt(newItem.years.length);
			  this.yearsLength.push(singleModels);
      }
    let timeoutId = setTimeout(() => {
        this.doughnutChartData = this.yearsLength;
    }, 10);
    this.pieChartData = this.yearsLength;
		console.log(this.doughnutChartData);
	  this.lineChartData = [{data: this.yearsLength, label: 'Car data'}];
    this.lineChartLabels = this.doughnutChartLabels;
    console.log(this.lineChartData);
		console.log(this.lineChartLabels);
  }
  public doughnutChartLabels:string[]= this.namesOfCars;
  public doughnutChartData:number[]= [];
  public doughnutChartType:string = 'doughnut';
  private doughnutChartColors: any[] = [{ backgroundColor: ["#36A2EB","#b8436d", "#00d9f9", "#a4c73c", "#a4add3","#FF6384"] }];
 // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public pieChartLabels:string[] = this.namesOfCars;
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  public lineChartData:Array<any> = [{data: this.yearsLength, label: 'Different Models released in no. of different years'}];
  public lineChartLabels:Array<any> = new Array<any>();
	public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  colors: any[] = [{ 
    backgroundColor: ["red", "darkgray"] 
  }]; 
clickData(){
    this.lineChartLabels = this.lineChartLabels.slice();
    this.doughnutChartLabels = this.doughnutChartLabels.slice();
    this.pieChartLabels = this.pieChartLabels.slice();
  }
}
    

