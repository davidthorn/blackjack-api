interface Project {
    helloWorld(): void
}

interface Window {
    project: Project
}

class ProjectObject implements Project {

    constructor() {  }

    helloWorld(): void {
        const element = document.createElement('h1')
        let text = document.createTextNode('Hello, World!')
        element.appendChild(text)
        document.body.appendChild(element)
    }

}

Window.prototype.project = ((): Project =>  {
    return new ProjectObject()
})()

window.onload = () => {
    window.project.helloWorld()
}