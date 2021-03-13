import React, { Fragment, useEffect, useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import MyDropzone from './Dropzone'

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& > *': {
            // margin: theme.spacing(4),
            // padding: theme.spacing(1)
        },
    },
    // paper: {
    //     padding: theme.spacing(4),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
}));



export default function App() {

    const classes = useStyles();

    const [Data, setData] = useState(null);
    const [Url, setUrl] = useState(null);
    const [Mode, setMode] = useState("upload")
    const [Downloadid, setDownloadid] = useState(null)
    const [Uploadid, setUploadid] = useState(null)
    const [Downloadpage, setDownloadpage] = useState(null)

    const [LinkCopied, setLinkCopied] = useState(false)

    const triggerdownload = (response) => {
        console.log(response)
        let filename = response.headers['content-disposition'].split("filename=\"")[1]
        filename = filename.substring(0, filename.length - 1)

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    }

    const processresponse = (response) => {
        triggerdownload(response)
    }

    const downloadfile = () => {
        let hostparts = window.location.href.split("/")
        let hostfull = hostparts[0] + "/" + hostparts[1] + "/" + hostparts[2] +
            "/download/" + Downloadid

        const link = document.createElement('a');
        link.href = hostfull;
        document.body.appendChild(link);
        link.click();
    }

    const uploadfinished = (response) => {

        // console.log(window.location.href + Uploadid)
        setDownloadpage(window.location.href + response.data)
        setUploadid(response.data)

    }

    useEffect(() => {

        if (window.location.pathname.length > 2) {
            axios({
                method: 'get',
                url: '/find' + window.location.pathname,
                responseType: 'json'
            })
                .then(function (response) {
                    console.log("download found")
                    // console.log(response.data)
                    setDownloadid(response.data)
                    setMode("download")
                })
                .catch(function (error) {
                    console.log(error);
                    // window.location.replace("/");
                });
        }


    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLinkCopied(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, [LinkCopied]);


    const copyToClipboard = (e) => {
        // var copyText = document.getElementById("thelink");
        // copyText.select();
        // copyText.setSelectionRange(0, 99999); /* For mobile devices */
        // document.execCommand("copy");
        // alert("link Copied: " + Downloadpage);
        navigator.clipboard.writeText(Downloadpage)
        setLinkCopied(true)
    }


    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* <Paper className={classes.paper}>xs=12</Paper> */}
                        {/* <Button variant="contained">Default</Button> */}

                        {Mode === "upload" ?
                            <div>
                                <MyDropzone upload={uploadfinished}></MyDropzone>
                            </div>
                            :
                            <div>
                                <br></br>
                            </div>
                        }

                    </Grid>

                    <Grid item xs={12}>
                        {Mode === "download" ?
                            <div>
                                <Downloadbutton downloadfile={downloadfile}></Downloadbutton>
                            </div>
                            :
                            <div>
                                {Uploadid ?

                                    <div>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {Downloadpage}
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={copyToClipboard}>
                                            {LinkCopied ?
                                                <Fragment>
                                                    link copied
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    copy link
                                                </Fragment>

                                            }


                                        </Button>

                                        {/* <a href={'/' + Uploadid} onClick={copyToClipboard}> copy </a> */}
                                        {/* <textarea value={Downloadpage} id="thelink" readOnly></textarea>
                                        <button onClick={copyToClipboard}>
                                            copy link
                                        </button> */}



                                    </div>

                                    :
                                    <div>
                                    </div>
                                }

                            </div>
                        }
                    </Grid>

                </Grid>

            </div>
        </Fragment>
    );
}

function Downloadbutton(props) {
    return (
        <Fragment>
            <Button variant="contained" color="primary" onClick={props.downloadfile}>
                Download
            </Button>
            {/* <button type="button" onClick={props.downloadfile}>Download</button> */}
        </Fragment>
    );
}