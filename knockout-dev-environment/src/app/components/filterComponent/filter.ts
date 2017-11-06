import * as ko from 'knockout';

import './filter.css';
import htmlContent from './filter.html';

export class FilterViewModel {
    rows: any;
    headers: any;
    helloworld:any;
    
    constructor() {
        //_.padStart("Hello TypeScript!", 20, " ");
         this.rows = ko.observable();
         this.headers = ko.observable();
         this.helloworld = ko.observable("hello filter 234 sdf in type script");
    }
}

export class FilterComponent{
    constructor(){
         return {
            viewModel: FilterViewModel,
            template: htmlContent
        }
    }
}

ko.components.register("filter-component", new FilterComponent());
