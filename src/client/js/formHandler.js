function handleSubmit(event) {
    event.preventDefault()
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //console.log(formText)

    Client.checkForName(formText)
    //console.log("::: Form Submitted :::")

    postData('/', {text: formText})
        .then(
            getSentiment('/sentiment')
            )
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
        //console.log(newData)
        return newData;
    }catch(error){
        console.log("error at post data", error);
    }
}

//get request for all data from sentiment route
const getSentiment = async (url) =>{
    const res = await fetch('/sentiment')
    try{
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error at getSentiment", error);
    }
}

export { handleSubmit }