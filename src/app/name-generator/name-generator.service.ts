import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWords } from './IWords';

@Injectable()
export abstract class NameGeneratorService {
    getNext: () => string
    init: () => void
}

@Injectable()
export class SimpleNameGeneratorService implements NameGeneratorService {

    private firstWords: Array<string>;
    private secondWords: Array<string>;

    constructor(private http: HttpClient) {
    }

    public init(): void {
        this.getData().subscribe(data => {
            this.firstWords = data.firstWords;
            this.secondWords = data.secondWords;
        });
    }

    public getNext(): string {
        let first: string = this.firstWords[this.getRandomInt(0, this.firstWords.length - 1)];
        let second: string = this.secondWords[this.getRandomInt(0, this.secondWords.length - 1)];
        return first + ' ' + second;
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private getData() {
        return this.http.get<IWords>('./assets/words.json');
    }
}
