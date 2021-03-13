import React, { useMemo, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const baseStyle = {
    // flex: 1,
    // display: 'grid',
    // flexDirection: 'column',
    // alignItems: 'center',
    padding: '10vh',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function MyDropzone(props) {

    const classes = useStyles();

    const [isClicked, setIsClicked] = useState(false);

    const [StartUpload, setStartUpload] = useState(false);

    const [EnableUpload, setEnableUpload] = useState(false);

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles[0]);
        setEnableUpload(true)
    };


    useEffect(() => {

        const sendFile = (e) => {
            const formData = new FormData();

            formData.append(
                "file",
                acceptedFiles[0],
                acceptedFiles[0].name
            );

            axios({
                method: 'put',
                url: '/upload',
                responseType: 'json',
                data: formData,
                headers: {
                    'Content-Type': 'application/zip',
                    'Content-Disposition': 'attachment; filename=' + "'" + acceptedFiles[0].name + "'",
                    'Access-Control-Allow-Origin': '*',
                    'X-CSRFTOKEN': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentCompleted);
                }
            })
                .then(function (response) {

                    if (response.status == 200) {
                        props.upload(response)
                        setEnableUpload(false)
                    }


                });
        };

        if (isClicked) {
            sendFile();
            console.log("sendfile")
        }

        return () => {
            // cleanup
            console.log("cleanup")
        };
    }, [isClicked]);


    const onclickHandler = () => {
        setIsClicked(true);
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({ onDrop, accept: '.zip', multiple: false });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <div>
                            {acceptedFiles.length > 0 ?

                                <div>

                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {acceptedFiles[0].name}
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            {/* <Button size="small">Learn More</Button> */}
                                            {/* <Button variant="contained" onClick={onclickHandler}>Upload</Button> */}
                                        </CardActions>
                                    </Card>
                                    {/* {acceptedFiles[0].name} */}
                                    {/* <Button variant="contained" onClick={onclickHandler}>Upload</Button> */}
                                </div>


                                :
                                <div>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Drag 'n' drop zip files here, or click to select zip files
                                    </Typography>

                                    <CloudUploadIcon />
                                </div>
                            }
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    {/* <Button variant="contained" disabled={!acceptedFiles[0]} onClick={onclickHandler}>Upload</Button> */}

                    {EnableUpload ?
                        <Button variant="contained" color="primary" onClick={onclickHandler}>Upload</Button>
                        :
                        <div>
                        </div>
                    }
                </Grid>


                {/* <button type="button" disabled={!acceptedFiles[0]} onClick={onclickHandler}>Upload</button> */}
            </Grid>

        </div>
    );
}

<MyDropzone />