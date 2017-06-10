import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class QuoteService {
	private quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=';
	showingTest = 0;
	quote;

	constructor(private http: Http) { }

	getQuotes(num: number): Observable<object[]>/*Promise<String[]>*/ {
		const number = num.toString() || '1';
		return this.http.get(this.quoteUrl + number)
			.map(this.extractData);
	}

	private extractData(res: Response): object {
		let body = res.json();
		return body || {};
	}
 }
