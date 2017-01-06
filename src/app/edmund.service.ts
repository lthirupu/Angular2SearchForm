import { Injectable} from '@angular/core';
import{ Http, Response } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
const key1 = 'qfcv6yg438vgz4xq2yuqjsdt';//qfcv6yg438vgz4xq2yuqjsdt   9nqrbr5sq4qu7mzjtyhr2qwn
const key = 'cnk6gcuk2as2m7z75argaxkv';//2bj2jnhv6m9j7bnut7uu3txu
@Injectable()
export class CarService {
    constructor(private _http: Http) {}
    search(term: string){

		var url = 'https://api.edmunds.com/api/vehicle/v2/'+term+'?fmt=json&api_key='+key
		
		return this._http.get(url)
							.map(res => {
								console.log(res.json().models);
								return res.json().models});
							
	}
	 repairshopsInfo(zip: string){

		var url = 'http://api.edmunds.com/api/dealer/v2/repairshops/?zipcode='+zip+'&radius=100&sortby=distance%3AASC&view=basic&api_key='+key
		return this._http.get(url)
			.map(res => {
					console.log(res.json().repairshops);
								return res.json().repairshops});
							
	}
  dealersInfo(tag: string){

		var url = 'https://api.edmunds.com/v1/api/drrrepository/getdrrbyzipcodeandmake?zipcode=60604&make='+tag+'&fmt=json&api_key='+key
		return this._http.get(url)
			.map(res => {
					console.log(res.json().salesRewiews);
								return res.json().salesReviews});
							
	}
  getPhotos(tag: string){

		var url = 'https://api.edmunds.com/api/media/v2/photoset?tag='+tag+'&category=exterior&api_key='+key1+'&fmt=json'
		return this._http.get(url)
			.map(res => {
					console.log(res.json().photos);
								return res.json().photos[5].sources});
							
	}
  getCarDetails(tag: string){

		var url = 'https://api.edmunds.com/api/editorial/v2/articles?tag=editor-reviews&make='+tag+'&fmt=json&api_key='+key1
		return this._http.get(url)
			.map(res => {
					console.log(res.json().articles);
								return res.json().articles});
							
	}
  getDetails(tag: string){

		var url = 'https://api.edmunds.com/api/editorial/v2/'+tag+'?view=basic&fmt=json&api_key='+key
		return this._http.get(url)
			.map(res => {
					console.log(res.json());
								return res.json()});
							
	}
}
//https://api.edmunds.com/api/editorial/v2/audi?view=basic&fmt=json&api_key=cnk6gcuk2as2m7z75argaxkv
//https://api.edmunds.com/api/editorial/v2/audi?view=basic&fmt=json&api_key=cnk6gcuk2as2m7z75argaxkv
// 'https://api.edmunds.com/api/dealer/v2/repairshops?zipcode={'+zip+'}&fmt=json&api_key={'+key+'}&fmt=json'
// 'https://api.edmunds.com/api/media/v2/photoset?tag={'+zip+'}&api_key={'+key+'}&fmt=json'
// https://api.edmunds.com/api/media/v2/photoset?tag=audi&category=interior&pagenum=1&pagesize=10&view=basic&fmt=json&api_key=qfcv6yg438vgz4xq2yuqjsdt


