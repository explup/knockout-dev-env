import ko from 'knockout';
import './gridComponent.css'
import template from './gridComponent.html'

class GridComponentViewModel {
    constructor() {
        this.rows = ko.observable();
        this.headers = ko.observable();
        this.helloworld = ko.observable("hello world");
    }
}

ko.components.register("grid-component", {
    template: template,
    viewModel: GridComponentViewModel
})
