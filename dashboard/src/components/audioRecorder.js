import React, { Component } from 'react';
import { Button } from 'reactstrap';

class AudioRecorder extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isRecording: false,
            audioChunks: [],
            mediaRecorder: null
        };
    }

    componentDidUpdate(){
       // console.log(this.state)
    }

    handleStartRecording = () => {
        console.log('start recording')
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            this.setState({ mediaRecorder });

            mediaRecorder.addEventListener("dataavailable", event => {
                this.setState(prevState => ({
                    audioChunks: [...prevState.audioChunks, event.data]
                }));
            });

            mediaRecorder.start();
            this.setState({ isRecording: true });
        });
    }

    handleStopRecording = () => {
        console.log('stop recording')
        this.state.mediaRecorder.stop();
        this.setState({ isRecording: false });

        const audioBlob = new Blob(this.state.audioChunks, { type: "audio/wav" });
//        if(this.props.saveAudio) this.props.saveAudio(audioBlob);
        const file = new File([audioBlob], "audio.wav", { type: "audio/wav" })
        console.log(file)
        if(this.props.saveAudio) this.props.saveAudio(file);
    }

    render() {
        return (
            <div>
                {this.state.isRecording ? (
                    <Button color="danger" onClick={this.handleStopRecording}>Stop Recording</Button>
                ) : (
                    <Button color="primary" onClick={this.handleStartRecording}>Start Recording</Button>
                )}
            </div>
        );
    }
}

export default AudioRecorder;