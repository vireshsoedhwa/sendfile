import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function App() {
    const [Data, setData] = useState(null);

    const [gitlabData, setgitlabData] = useState(null);

    const [Url, setUrl] = useState(null);

    const classes = useStyles();

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

    const ChangeURL = (value) => {
        // console.log(value.target.value)
        setUrl(value.target.value)
    }



    const getGitlabRepos = () => {

        fetch("/api")
            .then(response => {
                if (response.status > 400) {

                }
                return response.json();
            })
            .then(data => {
                console.log("adsfads")
                console.log(data)





                let testdata = data.map((item) => (
                    <Fragment key={item.page}>
                        <ListItemText primary={item.page} secondary={item.page} />
                    </Fragment>
                ))
                console.log(testdata)

                setgitlabData(testdata)

            });
    }

    return (
        <React.Fragment>
            <Grid container
                alignItems="flex-end"
                className={classes.root}
                justify="center"
                spacing={6}>

                {/* <Grid item xs={2}>
                    <List component="nav" aria-label="main mailbox folders">
                        {Data}
                    </List>
                </Grid> */}

                <Grid item xs={6}>
                    {/* <List component="nav" aria-label="main mailbox folders"> */}

                    {/* <Button size="small" variant="contained" color="primary"
                            onClick={getGitlabRepos}
                        >
                            check
                        </Button>
                        {gitlabData} */}


                    {/* </List> */}

                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Standard" onChange={ChangeURL}/>
                        <Button size="small" variant="contained" color="primary"
                            onClick={PostUrl}
                        >
                            send
                        </Button>
                    </form>


                </Grid>

            </Grid>

        </React.Fragment>
    );
}
