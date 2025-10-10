import React, { Component } from "react";
import { Button } from "reactstrap";

interface AudioRecorderProps {
    saveAudio?: (file: File) => void;
}

interface AudioRecorderState {
    isRecording: boolean;
    audioChunks: Blob[];
    mediaRecorder: MediaRecorder | null;
}

class AudioRecorder extends Component<AudioRecorderProps, AudioRecorderState> {
    constructor(props: AudioRecorderProps) {
        super(props);
        this.state = {
            isRecording: false,
            audioChunks: [],
            mediaRecorder: null,
        };
    }

    handleStartRecording = () => {
        console.log("start recording");
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream: MediaStream) => {
                const mediaRecorder = new MediaRecorder(stream);
                this.setState({ mediaRecorder, audioChunks: [] });

                mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
                    this.setState((prevState) => ({
                        audioChunks: [...prevState.audioChunks, event.data],
                    }));
                });

                mediaRecorder.start();
                this.setState({ isRecording: true });
            })
            .catch((err) => {
                console.error("Error accessing microphone:", err);
            });
    };

    handleStopRecording = () => {
        console.log("stop recording");
        const { mediaRecorder, audioChunks } = this.state;

        if (mediaRecorder) {
            mediaRecorder.stop();
            this.setState({ isRecording: false });

            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            const file = new File([audioBlob], "audio.wav", { type: "audio/wav" });

            if (this.props.saveAudio) {
                this.props.saveAudio(file);
            }
        }
    };

    render() {
        return (
            <div>
                {this.state.isRecording ? (
                    <Button color="danger" onClick={this.handleStopRecording}>
                        Stop Recording
                    </Button>
                ) : (
                    <Button color="primary" onClick={this.handleStartRecording}>
                        Start Recording
                    </Button>
                )}
            </div>
        );
    }
}

export default AudioRecorder;
