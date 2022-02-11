class SimpleImg extends React.Component {

    constructor(props) {
        super(props); //

        this.state = {
            error: null, //
            isLoaded: false, //
            items: [] //
        }

    }

    sendFileData () {
        let formData = new FormData();
        formData.append("fileData", document.getElementById("fileData").files[0]);
        fetch("/api/files",
        {
                method: 'POST',
                body: formData
        })
            .then(response => response.text())
            .then(fileName => {
                console.log(fileName);
                const items = this.state.items;
                items.push(fileName);
                this.setState ({items: items});

            })
            .catch(err => console.log(err));
    }

    render(){
        return (
            <div className="container">
                <input type="file" name="fileData" id="fileData"/>
                <input type="button" onClick={this.sendFileData.bind(this)}/>
                <hr/>
                {
                this.state.items.map((item, index) => (
                    <img src={'/upload/' + item} key={index}/>
                    ))
                }
            </div>
        );
    }
}