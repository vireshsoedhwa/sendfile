import React, { Fragment, useEffect, useState } from 'react';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         height: 140,
//         width: 100,
//     },
//     control: {
//         padding: theme.spacing(2),
//     },
// }));

export default function App() {
    const [Data, setData] = useState(null);
    const [Url, setUrl] = useState(null);

    useEffect(() => {
        // GetLatestData();
    }, []);

    const GetLatestData = () => {
        fetch("/api/index")
            .then(response => {
                if (response.status > 400) {
                }
                return response.json();
            })
            .then(data => {
                let testdata = data.map((item) => (
                    <Fragment key={item.url}>
                        <ListItemText primary={item.name} secondary={item.url} />
                    </Fragment>
                ))
                console.log(testdata)
                setData(testdata)
            });
    };

    const PostUrl = () => {
        const data = { query: Url };
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
        // console.log(csrftoken)

        fetch('/api/', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-CSRFTOKEN': csrftoken
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

 

    return (
        <Fragment>
            <div>
                {document.querySelector('[name=csrfmiddlewaretoken]').value}
                <br></br>
                {document.cookie}
            </div>
        </Fragment>
    );
}
