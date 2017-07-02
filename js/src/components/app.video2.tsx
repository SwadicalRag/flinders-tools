/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as router from 'react-router';

let Semantify = require("react-semantify");

import {LectureList} from "./view.lecturelist";
let LZString = require("lz-string");
import * as b64 from "js-base64";

class LectureVideoStatic2 extends React.Component<{
    params: any,
    location: any,
    watchLecture:(url:string)=>void,
},{}> {
    initialise() {}

    options() {
        window["$"]("#optionsModal").modal("show");
    }

    player;
    componentDidMount() {
        let w:any = window;
        this.player = w.videojs(document.getElementById("stage-vid"), {
            playbackRates: [
                0.25,
                0.5,
                0.75,
                1,
                1.25,
                1.5,
                1.75,
                2,
                2.25,
                2.5,
                2.75,
                3.0,
                3.5,
                4.0,
                4.5,
            ]
        }, function() {
            // this.play();
            this.hotkeys({
                volumeStep: 0.1,
                seekStep: 3
            });

            this.player.ready(() => {
                let time = this.props.location.query.t;

                if(time) {
                    time = parseInt(time);

                    if(!isNaN(time) && isFinite(time)) {
                        this.player.currentTime(time);
                    }
                }
            });
        });
    }

    render() {
        let style = {
            width: "100%",
            // height: "100%",
        };

        let url = (b64.Base64.decode(this.props.params.url));
        let topicCode = this.props.params.topicCode;

        this.props.watchLecture(url);

        return <Semantify.Container>
            <router.Link to={`/topic/${topicCode}`}>
                <div className="ui right floated button">Back to Topic</div>
            </router.Link>
            <a className="ui right floated button" download href={url}>Direct Link</a>
            <br />
            <br />
            <div>
                <video style={style} className="video-js vjs-default-skin vjs-big-play-centered" id="stage-vid" controls>
                    <source src={url} type="video/mp4" />
                </video>
            </div>
            <div>
                <br />
                <h4>Tips:</h4>
                <ul>
                    <li>Use the arrow keys to skip forwards/backwards 3 seconds at a time</li>
                    <li>Speed up the lecture to save time</li>
                    <li>(reading lecture notes before watching a lecture is generally a good idea)</li>
                </ul>
            </div>
        </Semantify.Container>;
    }
}

import {watchLecture} from "../actions";

import {connect} from "react-redux";

import {IAppState} from "../reducers";

function mapStateToProps(state:IAppState) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        watchLecture: (url:string) => {
            dispatch(watchLecture(url));
        }
    }
}

export const LectureVideo2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(LectureVideoStatic2);


