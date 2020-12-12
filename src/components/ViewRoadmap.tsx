import React, {useEffect, useState} from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import {Checkbox, IconButton} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import StepView from "./StepView";
import {JsonTypes, StepType} from "../type";
import {Star, StarOutline} from "@material-ui/icons";
import {RouteComponentProps} from 'react-router'
import {db} from "../firebase";
import {initData} from "../utils/mock";

type urlProps = {} & RouteComponentProps<{ uid: string }>;

const ViewRoadmap: React.FC<urlProps> = (props) => {
    const history = useHistory();
    const [nowOpen, setNowOpen] = useState('');
    const [data, setData] = useState<JsonTypes | undefined>(initData);
    const [steps, setSteps] = useState<StepType[] | undefined>(initData.data.steps);
    useEffect(() => {
        let docRef = db.collection("flows").doc(props.match.params.uid)
        docRef.get().then((doc) => {
            if (doc.exists) {
                setData(doc.data() as JsonTypes);
                setNowOpen(doc.data()?.data.steps[0].uid)
                setSteps(doc.data()?.data.steps)
            } else {
                history.push('/')
            }
        }).catch((error) => {
            alert(error)
        })
    }, [history,props.match.params.uid]);
    const handleOpen = (uid: string) => {
        setNowOpen(uid);
    };

    return (
        <>
            {(!data) ? (
                <h1>Now Loading...</h1>
            ) : (
                <div className="editRoadmap">
                    <div className="nav">
                        <div className="nav__backAndTitle">
                            <IconButton onClick={() => history.goBack()}>
                                <ArrowBackIcon style={{color: "white"}}/>
                            </IconButton>
                            <h1>{data.data.title}</h1>
                        </div>
                        <Checkbox
                            icon={<StarOutline style={{color: "white"}}/>}
                            checkedIcon={<Star style={{color: "yellow"}}/>}
                            style={{marginRight: 16}}
                        />
                    </div>
                    <div className="edit">
                        <div className="edgePoint begin">
                            <p>{data.data.title}</p>
                            <PlayArrowIcon style={{color: "var(--cimicine-main)"}}/>
                        </div>
                        <div className="border"/>

                        {// @ts-ignore
                            steps.map((step: StepType) => (
                            <StepView
                                open={step.uid === nowOpen}
                                onOpen={() => handleOpen(step.uid)}
                                key={step.uid}
                                step={step}
                            />
                        ))}

                        <div className="edgePoint finish">
                            <p>{data.data.title}</p>
                            <PauseIcon style={{color: "var(--cimicine-main)"}}/>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
        ;
};

export default ViewRoadmap;
