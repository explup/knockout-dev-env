import * as ko from 'knockout';
import "../components/filterComponent/filter"

export class Contract{
    constructor()
    {
        ko.applyBindings();
    }
}


let contract = new Contract();