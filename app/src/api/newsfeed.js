const feed2 = {
    method: 'GET',
    url: 'https://news-api14.p.rapidapi.com/top-headlines',
    
    headers: {
      'X-RapidAPI-Key': '833d2ff661mshd4400fdc2d90b6ap11dc6djsnb94ff7f3751b',
      'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
    }
};

export default feed2;

/*
    export default async function Feed () {
    /*    const feed = {
        method: 'GET',
        url: 'https://news67.p.rapidapi.com/v2/feed',
        headers: {
            'X-RapidAPI-Key': '833d2ff661mshd4400fdc2d90b6ap11dc6djsnb94ff7f3751b',
            'X-RapidAPI-Host': 'news67.p.rapidapi.com'
            }
        };
        axios.request(feed).then(function(response){
            console.log(response.data);
        }).catch(function (error){
            if (error.message === "Request failed with status code 429"){
                console.log("Quota finished");
            }
            else{
                console.log(error.message);
            }
        }) */
        /*
        const feed2 = {
            method: 'GET',
            url: 'https://news-api14.p.rapidapi.com/top-headlines',
            
            headers: {
            'X-RapidAPI-Key': '833d2ff661mshd4400fdc2d90b6ap11dc6djsnb94ff7f3751b',
            'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
            }
        };
        
        axios.request(feed2).then(function(response){
            console.log(response.data);
            //return(response.data)
            }).catch(function (error){
            if (error.message === "Request failed with status code 429"){
                console.log("Quota finished");
            }
            else{
                console.log(error.message);
            }
            //console.log("DATA", Data);
        });

    }

*/  
