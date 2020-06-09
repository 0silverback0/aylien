function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(function(res) {
        view(res.message)
        console.log(res.message)
    })
}

function view(data){
    let html = data;
    let img = document.querySelector('#results')
    img.setAttribute('src', data)

    //document.getElementById('results').innerHTML = html
}
export { handleSubmit }
