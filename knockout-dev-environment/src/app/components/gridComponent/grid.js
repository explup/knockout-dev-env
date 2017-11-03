import ko from 'knockout';
import './grid.css';
import './grid.less';
import template from './grid.html';

//class GridViewModel {
//    constructor() {
//        this.rows = ko.observable();
//        this.headers = ko.observable();
//        this.helloworld = ko.observable("hello world");
//    }
//}
function GridViewModel() {
    this.rows = ko.observable();
    this.headers = ko.observable();
    this.helloworld = ko.observable("hello world");

}
ko.components.register("grid-component", {
    template: template,
    viewModel: GridViewModel
})
