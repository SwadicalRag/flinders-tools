/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as router from 'react-router';

let Semantify = require("react-semantify");

import {LectureList} from "./view.lecturelist";

export class TopicOverview extends React.Component<{
    params: any
},{}> {
    initialise() {}

    options() {
        window["$"]("#optionsModal").modal("show");
    }

    render() {
        return <Semantify.Container>
            <router.Link to="/">
                <div className="ui right floated button">Back</div>
            </router.Link>
            <h2>{this.props.params.topicCode}</h2>
            <LectureList topicCode={this.props.params.topicCode} />
        </Semantify.Container>;
    }
}
