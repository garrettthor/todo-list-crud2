const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('.todoItem span')
const todoComplete = document.querySelectorAll('.todoItem span.completed')

Array.from(deleteBtn).forEach( (element) => {
    element.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach( (element) => {
    element.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach( (element) => {
    element.addEventListener('click', undo)
})

async function deleteTodo() {
    const todoText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bananaStrawberry': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}

async function markComplete() {
    const todoText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bananaStrawberry': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}

async function undo() {
    const todoText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('undo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bananaStrawberry': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}