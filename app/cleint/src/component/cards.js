import React from "react";
//import Feed from "../api/newsfeed";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import feed2 from "../api/newsfeed";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Cards (){

    const SAVE_URL = 'http://localhost:5000/saving';
    let [resData, setResData] = React.useState();
    const navigate = useNavigate()
    React.useEffect(() =>{
        axios.request(feed2).then(function(response){
            console.log(response.data.articles);
            const Data = response.data.articles
            setResData(Data);
            }).catch(function (error){
            if (error.message === "Request failed with status code 429"){
                console.log("Quota finished");
            }
            else{
                console.log(error.message);
            }
        });
    }, []);
 
    async function save(url){
        //e.preventDefault();
        const user = window.localStorage.getItem("userInfo");
       if (window.localStorage.getItem("userInfo") !== null || 
       window.localStorage.getItem("userInfo") !== undefined){
        let sent = [];
        let page = resData.map((element) =>{
            if (element.url === url){
                //update the database
                sent = element;
            }
        })
            try{
                const response = await axios.post(SAVE_URL,
                    { Username: user, Url: sent }
                );
                console.log("sent", user, sent);
                console.log("From Saving", response);
            }
            catch(err){
                console.log(err.message);
            }
            navigate('/saved')
       }
       else{
        navigate('/login')
       }

    }

    function checker(){
        if (resData !== undefined){
            return(
            resData.map((element) =>{
                return(
                    <div style={{ width: '300px', margin: '20px'}}>
                        <Card style={{ width: '300px', margin: '20px' }}>
                        <Card.Img variant="top" style={{width: "300px", height: "100px"}}
                        src={element.Img == null ? "https://www.onu.ro/wp/wp-content/uploads/2020/03/react-native-logo-768x890.png" : element.Img} />
                        <Card.Body>
                            <Card.Title>{element.title}</Card.Title>
                            <Card.Text>
                               
                                    {element.title}
                        
                            </Card.Text>
                            <Card.Text className="news-date">
                                Date: {element.published_date.slice(0, 10)}
                            </Card.Text>
                            <Card.Text className="news-agency">
                                Publisher: {element.publisher.name}
                            </Card.Text>
                            <Button className="btn-read" variant="primary" a href= {element.url} target="_blank" >Read full article</Button>
                            <Button className="btn-save" variant="primary" onClick={ () => {save(element.url)} }>Save</Button>
                        </Card.Body>
                        </Card>
                    </div>
                );
            })
        );}
        else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }
    return(
        <div className="news-card" >
            {checker()}
        </div>
        
    );
}