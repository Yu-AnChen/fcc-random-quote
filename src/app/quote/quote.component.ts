import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuoteService } from '../quote.service';

import { Subscription } from 'rxjs/Subscription';
import { style, state, animate, transition, trigger } from '@angular/animations';


@Component({
	selector: 'app-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss'],
	animations: [
		trigger('fadeInOut', [
			state('in', style({ opacity: 1 })),
			transition('void => *', [
				style({ opacity: 0 }),
				animate(600)
			]),
			transition('* => void', [
				animate(200, style({ opacity: 0 }))
			])
		])
	]
})
export class QuoteComponent implements OnInit, OnDestroy {
	quotes: Array<object>;
	numberOfQuotes = 25;
	showing = 0;
	subscription: Subscription;

	constructor(private quoteService: QuoteService) { }

	ngOnInit(): void {
		this.getQuotes();
	}

	getQuotes() {
		this.subscription = this.quoteService.getQuotes(this.numberOfQuotes)
			.subscribe(data => {
				this.quotes = data;
			});
	}

	next() {
		let num = this.showing >= this.numberOfQuotes - 1 ?
			0 : this.showing + 1;
		return this.animate(num);
	}

	prev() {
		let num = this.showing <= 0 ?
			this.numberOfQuotes - 1 : this.showing - 1;
		return this.animate(num);
	}

	animate(num) {
		this.showing = null;
		setTimeout(() => this.showing = num, 500);
	}

	ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
