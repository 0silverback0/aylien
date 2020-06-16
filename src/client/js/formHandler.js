function handleSubmit(event) {
    event.preventDefault()
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //console.log(formText)

    Client.checkForName(formText)
    //console.log("::: Form Submitted :::")

    postData('/', {text: formText})
        .then(function() {
            getSentiment('/sentiment')
            })
        .then(function(){
            updateUI()
        })
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
        //console.log(data)
        return data;
    } catch(error) {
        console.log("error at getSentiment", error);
    }
}

// Update UI function
const updateUI = async () => {
  const request = await fetch('/sentiment');
  try{
    const allData = await request.json();
    console.log(allData.polarity);
      document.getElementById('polarity').innerHTML = allData.polarity;
      document.getElementById('subjectivity').innerHTML = allData.subjectivity;
      document.getElementById('text').innerHTML = allData.text;
      document.getElementById('polarity_confidence').innerHTML = allData.polarity_confidence;
      document.getElementById('subjectivity_confidence').innerHTML = allData.subjectivity_confidence

  }catch(error){
    console.log("error at updateUI", error);
  }
}

export { handleSubmit }