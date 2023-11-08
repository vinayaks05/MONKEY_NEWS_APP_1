import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Saved() {
    const SAVED_URL = "http://localhost:5000/saved"
    const storedItems = window.localStorage.getItem("userInfo");
    const [userInfo, setUserInfo] = React.useState(storedItems)
    let [resData, setResData] = React.useState();
    React.useEffect(() => {
        localStorage.setItem("userInfo", userInfo)
    }, [userInfo])

    React.useEffect(() =>{
        async function fetch(){
            try {
                const response = await axios.post(SAVED_URL,
                    { Username: storedItems });
                console.log(response?.data);
                const Data = response?.data
                setResData(Data);
                console.log("Data", Data)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetch();
    }, []);
   
    
    /*
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [userInfo])
    */

    function checker() {
        if (resData !== undefined && resData.error !== "no data") {
            return (
                resData.Data.map((element) => {
                    return (
                        <div style={{ width: '300px', margin: '20px' }}>
                            <Card style={{ width: '300px', margin: '20px' }}>
                                <Card.Img variant="top" style={{ width: "300px", height: "100px" }}
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
                                    <Button className="btn-read" variant="primary" a href={element.url} target="_blank" >Read full article</Button>
                                    <Button className="btn-save" variant="primary" >Remove</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })
            );
        }
        else {
            return (
                <div>
                    <h2>Loading Your News...</h2>
                </div>
            )
        }
    }
    return (
        <div className="news-card" >
            {checker()}
        </div>

    );
}
