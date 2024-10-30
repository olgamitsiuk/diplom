import React from 'react';

export class SimpleImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [] // Removed unused state properties
        }
    }

    sendFileData() {
        let formData = new FormData();
        const fileInput = document.getElementById("fileData");
        if (!fileInput.files[0]) return;

        formData.append("fileData", fileInput.files[0]);
        fetch("/api/files",
            {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(fileName => {
                console.log(fileName);
                this.setState(prevState => ({
                    items: [...prevState.items, fileName]
                }));
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <input
                    type="file"
                    name="fileData"
                    id="fileData"
                    accept="image/*"
                    aria-label="Choose file to upload"
                />
                <input
                    type="button"
                    onClick={this.sendFileData.bind(this)}
                    value="Upload"
                    aria-label="Upload file"
                />
                <hr />
                {
                    this.state.items.map((item, index) => (
                        <img
                            src={'/upload/' + item}
                            key={index}
                            alt={`Uploaded file ${index + 1}`}
                        />
                    ))
                }
            </div>
        );
    }
}