function handleSubmit(event) {
    event.preventDefault()
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //console.log(formText)

    Client.checkForName(formText)
    //console.log("::: Form Submitted :::")

    postData('/', {text: formText});
    }

// post data function that post to post route on server
const postData = async ( url = '', data = {}) =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    }catch(error){
        console.log("error at post data", error);
    }
}

export { handleSubmit }