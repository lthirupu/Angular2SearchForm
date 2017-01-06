import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { CarService } from '../edmund.service';

@Component({
	selector: 'dealer-details',
	templateUrl: './edmund-dealer.component.html',
  styleUrls: ['../semantic.min.css'],	
	providers: [ CarService],
})

export class DealersComponent {
	isVisible: boolean = false;	
  edmundsForm : FormGroup;
  name: AbstractControl;
	private searchTermStream = new Observable<Array<string>>();

	constructor (private carService: CarService,fb: FormBuilder) {
    this.edmundsForm = fb.group({
    'name' : [' ',Validators.required]
    });
  this.name = this.edmundsForm.controls['name'];
  }

	items: Array<any[]>;
	public dealerNames: Array<any> = [];
	public avgRatings: Array<any> = [];
  public tagName: string;
  public zip: string;
	myForm: FormGroup;

  onSubmit(form): void {
    this.tagName = form;
    this.carService.dealersInfo(this.tagName)
      .debounceTime(400)
      .subscribe(results => this.parseResponse(results));
  }

	parseResponse(input: any) {
    console.log(input);
    this.items = input;

	  var noOfYears = {};
    var newList = {};
    for (let item of this.items) {
        var newItem: any = item;
        let dealerName = newItem.dealerName;
        console.log(dealerName);
			  this.dealerNames.push(dealerName);
	      this.doughnutChartLabels.push(dealerName);
        this.pieChartLabels.push(dealerName);
      }
    for (let item of this.items) {
        var newItem: any = item;
        let rating = parseInt(newItem.averageRating);
        console.log(rating);
			  this.avgRatings.push(rating);
      }
    let timeoutId = setTimeout(() => {
        this.doughnutChartData = this.avgRatings;
    }, 10);
    this.pieChartData = this.avgRatings;
		console.log(this.doughnutChartData);
	  this.barChartData = [{data: this.avgRatings, label: 'Car data'}];
    this.barChartLabels = this.doughnutChartLabels;
    console.log(this.barChartData);
		console.log(this.barChartLabels);
  }
  public doughnutChartLabels:string[]= this.dealerNames;
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
  public pieChartLabels:string[] = this.dealerNames;
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  public barChartData:Array<any> = [{data: this.avgRatings, label: 'Car data'}];
  public barChartLabels:Array<any> = new Array<any>();
	public barChartLegend:boolean = true;
  public barChartType:string = 'bar';
  public barChartOptions:any = {
    animation: false,
    responsive: true
  };
  colors: any[] = [{ 
    backgroundColor: ["red", "darkgray"] 
  }]; 
clickData(){
    this.barChartLabels = this.barChartLabels.slice();
    this.doughnutChartLabels = this.doughnutChartLabels.slice();
    this.pieChartLabels = this.pieChartLabels.slice();
  }
}
    

