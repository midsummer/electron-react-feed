import React from 'react';
const ipcRenderer = require("electron").ipcRenderer;
const XMLParser = require('react-xml-parser');

export class FeedWrapper extends React.Component {

    constructor() {
        super();
        this.state = {
            data: null
        };
    }

    componentWillMount() {
        ipcRenderer.on('rss', (event, data) => {
            this.setState({data: data});
        });
    }

    render() {
        let data = this.state.data,
            parsedData = data ? parseXML(data) : null;

        return parsedData ? <RSSNode value={ parsedData } className={parsedData.name} /> : <div className="placeholder">RSS is empty or not valid</div>;
    }
}


class RSSNode extends React.Component {

    render() {
        return this.getNodeContent();
    }

    getNodeContent() {
        let nodeData = this.props.value,
            nodeChildren = nodeData.children || [],
            nestedNodes = [];

        nodeChildren.forEach((childNodeData, index) => {
            nestedNodes.push(
                <RSSNode value={ childNodeData } key={index} />
            );
        });

        return nodeChildren.length ? (<div className={nodeData.name}> {nestedNodes} </div>) : this.getElement(nodeData);
    }

    getElement(nodeData) {
        switch(nodeData.name) {
            case 'image':
                return <img className={nodeData.name} src={nodeData.value}/>;
            case 'link':
                return <a className={nodeData.name} href={nodeData.value} target="_blank"> {nodeData.value} </a>;
            default:
                return <div className={nodeData.name}> {nodeData.value} </div>;
        }
    }
}

const parseXML = (xmlText) => {
    try {
        let xmlParser = new XMLParser();
        return xmlParser.parseFromString(xmlText);
    } catch(error) {
        console.log(error);
    }

};


