import React, { Fragment, useEffect, useState, useMemo } from 'react';
import MyDropzone from './Dropzone'

import axios from 'axios';

export default function App() {
    const [Data, setData] = useState(null);
    const [Url, setUrl] = useState(null);
    const [Mode, setMode] = useState("upload")
    const [Downloadid, setDownloadid] = useState(null)
    const [Uploadid, setUploadid] = useState(null)

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

    const copyToClipboard = (e) => {
        console.log(e.target.value)
        console.log(window.location.href + Uploadid)
    }


    return (
        <Fragment>
            {Mode === "upload" ?
                <div>
                    <MyDropzone upload={uploadfinished}></MyDropzone>
                </div>
                :
                <div>
                    <br></br>
                </div>
            }

            {Mode === "download" ?
                <div>
                    <Downloadbutton downloadfile={downloadfile}></Downloadbutton>
                </div>
                :
                <div>
                    {Uploadid ?
                        <div>
                            {/* <a href={'/' + Uploadid} onClick={copyToClipboard}> copy </a> */}
                            <button onClick={copyToClipboard}>
                                copy link
                            </button>
                        </div>
                        :
                        <div>
                        </div>
                    }

                </div>
            }
        </Fragment>
    );
}

function Downloadbutton(props) {
    return (
        <Fragment>
            <button type="button" onClick={props.downloadfile}>Download</button>
        </Fragment>
    );
}