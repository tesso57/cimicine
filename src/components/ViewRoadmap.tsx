import React, {useEffect, useState, useContext, useCallback} from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import {Checkbox, IconButton} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import StepView from "./StepView";
import {JsonTypes, StepType, UserStaredList, StaredList} from "../type";
import {Star, StarOutline} from "@material-ui/icons";
import {RouteComponentProps} from 'react-router'
import {db} from "../firebase";
import {AuthContext} from "../auth/AuthProvider";

type urlProps = {} & RouteComponentProps<{ uid: string }>;

const ViewRoadmap: React.FC<urlProps> = (props) => {
    const history = useHistory();
    const [nowOpen, setNowOpen] = useState('');
    const [data, setData] = useState<JsonTypes | undefined>(undefined);
    const [steps, setSteps] = useState<StepType[] | undefined>(undefined);
    const [isStar, setIsStar] = useState<boolean | undefined>(undefined)
    const [staredList, setStaredList] = useState<StaredList | undefined>(undefined)
    const {currentUser} = useContext(AuthContext)
    //各種データの取得
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
        docRef = db.collection('StaredList').doc(currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let temp = doc.data()
                if (temp !== undefined && data !== undefined) {
                    setStaredList(temp.list as StaredList)
                    if (temp.list.includes(data.data.uid)) {
                        setIsStar(true)
                    } else {
                        setIsStar(false)
                    }
                }
            } else {
                setIsStar(false)
                console.log('create New')
                db.collection("StaredList")
                    .doc(currentUser.uid)
                    .set({list: []} as UserStaredList)
                    .then((r) => {
                        setStaredList([])
                    });
            }
        }).catch((error) => {
            alert('create')
        })
    }, [history, props.match.params.uid, currentUser.uid, data]);
    const addStar = useCallback(() => {
        if (data !== undefined && staredList !== undefined && isStar !== undefined) {
            if (isStar) {
                if (!staredList.includes(data.data.uid)) {
                    staredList?.push(data?.data.uid);
                    data.data.star += 1
                }
            } else {
                if (staredList.includes(data.data.uid)) {
                    staredList.splice(staredList.indexOf(data.data.uid))
                    data.data.star -= 1
                }
            }
            let docRef = db.collection("flows").doc(props.match.params.uid)
            docRef.update(data).then(r => {
            }).catch((error) => alert('addStar'));
            docRef = db.collection('StaredList').doc(currentUser.uid);
            docRef.update({list: staredList}).then(r => {
            }).catch((error) => alert('List'));
        }
    }, [isStar, staredList, currentUser.uid, data, props.match.params.uid])

    useEffect(() => {
        addStar()
    }, [isStar, addStar]);

    const handleOpen = (uid: string) => {
        setNowOpen(uid);
    };


    return (
        <>
            {(data === undefined || steps === undefined || isStar === undefined) ? (
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
                            checked={isStar}
                            onClick={() => setIsStar(!isStar)}
                        />
                    </div>
                    <div className="edit">
                        <div className="edgePoint begin">
                            <p>{data.data.title}</p>
                            <PlayArrowIcon style={{color: "var(--cimicine-main)"}}/>
                        </div>
                        <div className="border"/>
                        {
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
