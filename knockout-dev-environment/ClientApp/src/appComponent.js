import $ from 'jquery';
import _ from 'lodash';
import './appComponent.css';
import './Site.css';
import ko from 'knockout';
//import respond from 'respond.js/dest/respond.min.js';
//import Modernizr from 'modernizr';

//import jqueryValidation from 'jquery-validation';
//import jqueryValidationUnobtrusive from 'jquery-validation-unobtrusive';

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], '');
    $(element).css("background-color", "red");
    element.classList.add('hello');
    //Modernizr.on('testname', function (result) {
    //    if (result) {
    //        console.log('The test passed!');
    //    }
    //    else {
    //        console.log('The test failed!');
    //    }
    //});
   
    return element;
}

document.body.appendChild(component());
