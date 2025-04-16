import sessionService from '/js/src/sessionService.js';
import {mount} from '/js/src/index.js';
import HelloWorld from './HelloWorld.js';
import hyperstaticComponent from './hyperStatic.js';

sessionService.loadAndHideParameters();
const mount_element = document.body; // The element in which the virtual dom will be inserted
const component_function = hyperstaticComponent // The function that will return the virtual dom. Must take 1 argument;
const component_function_arg = new HelloWorld(); //

mount(mount_element,component_function,component_function_arg);



