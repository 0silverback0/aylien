
function handleSubmit(event) {
    event.preventDefault()
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        //document.getElementById('results').innerHTML = res.message
    })
    
    /*
     textapi.sentiment({
  text: 'John is a very good football player',
  mode: 'tweet'
}, function(error, response) {
  if (error === null) {
    console.log(response);
  }
});
*/
}

export { handleSubmit }