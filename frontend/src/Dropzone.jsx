import React, { useMemo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
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

    const [isClicked, setIsClicked] = useState(false);

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles[0]);
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
                    props.upload(response)
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
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div>
                    {acceptedFiles.length > 0 ?
                        <div>
                            {acceptedFiles[0].name}
                        </div>
                        :
                        <div>
                            Drag 'n' drop some files here, or click to select files
                    </div>
                    }
                </div>
            </div>

            <button type="button" disabled={!acceptedFiles[0]} onClick={onclickHandler}>Upload</button>

        </div>
    );
}

<MyDropzone />