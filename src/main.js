"use strict";
var ProjectObject = /** @class */ (function () {
    function ProjectObject() {
    }
    ProjectObject.prototype.helloWorld = function () {
        var element = document.createElement('h1');
        var text = document.createTextNode('Hello, World!');
        element.appendChild(text);
        document.body.appendChild(element);
    };
    return ProjectObject;
}());
Window.prototype.project = (function () {
    return new ProjectObject();
})();
window.onload = function () {
    window.project.helloWorld();
};
