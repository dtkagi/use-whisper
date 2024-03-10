'use strict';

var chunk57AVKP4H_cjs = require('./chunk-57AVKP4H.cjs');
var reactHooksAsync = require('@chengsokdara/react-hooks-async');
var react = require('react');

var ee={apiKey:"",autoStart:!1,autoTranscribe:!0,mode:"transcriptions",nonStop:!1,removeSilence:!1,stopTimeout:5e3,streaming:!1,timeSlice:1e3,onDataAvailable:void 0,onTranscribe:void 0},re={stop:void 0},te={blob:void 0,text:void 0},ue=_=>{let{apiKey:l,autoStart:v,autoTranscribe:A,mode:w,nonStop:C,removeSilence:ne,stopTimeout:F,streaming:y,timeSlice:M,whisperConfig:c,onDataAvailable:P,onTranscribe:h}={...ee,..._};if(!l&&!h)throw new Error("apiKey is required if onTranscribe is not provided");let p=react.useRef([]),a=react.useRef(),i=react.useRef(),r=react.useRef(),o=react.useRef(),f=react.useRef(re),[q,S]=react.useState(!1),[I,U]=react.useState(!1),[K,T]=react.useState(!1),[O,m]=react.useState(te);react.useEffect(()=>()=>{p.current&&(p.current=[]),a.current&&(a.current.flush(),a.current=void 0),r.current&&(r.current.destroy(),r.current=void 0),g("stop"),i.current&&(i.current.off("speaking",k),i.current.off("stopped_speaking",R)),o.current&&(o.current.getTracks().forEach(e=>e.stop()),o.current=void 0);},[]),reactHooksAsync.useEffectAsync(async()=>{v&&await W();},[v]);let L=async()=>{await W();},$=async()=>{await G();},j=async()=>{await x();},W=async()=>{try{if(o.current||await z(),o.current){if(!r.current){let{default:{RecordRTCPromisesHandler:t,StereoAudioRecorder:n}}=await import('recordrtc'),s={mimeType:"audio/wav",numberOfAudioChannels:1,recorderType:n,sampleRate:44100,timeSlice:y?M:void 0,type:"audio",ondataavailable:A&&y?Q:void 0};r.current=new t(o.current,s);}if(!a.current){let{Mp3Encoder:t}=await import('lamejs');a.current=new t(1,44100,96);}let e=await r.current.getState();(e==="inactive"||e==="stopped")&&await r.current.startRecording(),e==="paused"&&await r.current.resumeRecording(),C&&B("stop"),S(!0);}}catch{}},z=async()=>{try{if(o.current&&o.current.getTracks().forEach(e=>e.stop()),o.current=await navigator.mediaDevices.getUserMedia({audio:!0}),!i.current){let{default:e}=await import('hark');i.current=e(o.current,{interval:100,play:!1}),i.current.on("speaking",k),i.current.on("stopped_speaking",R);}}catch{}},B=e=>{f.current[e]||(f.current[e]=setTimeout(x,F));},k=()=>{U(!0),g("stop");},R=()=>{U(!1),C&&B("stop");},G=async()=>{try{r.current&&(await r.current.getState()==="recording"&&await r.current.pauseRecording(),g("stop"),S(!1));}catch{}},x=async()=>{try{if(r.current){let e=await r.current.getState();if((e==="recording"||e==="paused")&&await r.current.stopRecording(),J(),g("stop"),S(!1),A)await N();else {let t=await r.current.getBlob();m({blob:t});}await r.current.destroy(),p.current=[],a.current&&(a.current.flush(),a.current=void 0),r.current=void 0;}}catch{}},J=()=>{i.current&&(i.current.off("speaking",k),i.current.off("stopped_speaking",R),i.current=void 0),o.current&&(o.current.getTracks().forEach(e=>e.stop()),o.current=void 0);},g=e=>{f.current[e]&&(clearTimeout(f.current[e]),f.current[e]=void 0);},N=async()=>{try{if(a.current&&r.current&&await r.current.getState()==="stopped"){T(!0);let t=await r.current.getBlob();{let n=await t.arrayBuffer(),s=a.current.encodeBuffer(new Int16Array(n));t=new Blob([s],{type:"audio/mpeg"});}if(typeof h=="function"){let n=await h(t);m(n);}else {let n=new File([t],"speech.mp3",{type:"audio/mpeg"}),s=await E(n);m({blob:t,text:s});}T(!1);}}catch{T(!1);}},Q=async e=>{try{if(y&&r.current){if(P?.(e),a.current){let n=await e.arrayBuffer(),s=a.current.encodeBuffer(new Int16Array(n)),d=new Blob([s],{type:"audio/mpeg"});p.current.push(d);}if(await r.current.getState()==="recording"){let n=new Blob(p.current,{type:"audio/mpeg"}),s=new File([n],"speech.mp3",{type:"audio/mpeg"}),d=await E(s);d&&m(V=>({...V,text:d}));}}}catch{}},E=reactHooksAsync.useMemoAsync(async e=>{let t=new FormData;t.append("file",e),t.append("model","whisper-1"),w==="transcriptions"&&t.append("language",c?.language??"en"),c?.prompt&&t.append("prompt",c.prompt),c?.response_format&&t.append("response_format",c.response_format),c?.temperature&&t.append("temperature",`${c.temperature}`);let n={};n["Content-Type"]="multipart/form-data",l&&(n.Authorization=`Bearer ${l}`);let{default:s}=await import('axios');return (await s.post(chunk57AVKP4H_cjs.d+w,t,{headers:n})).data.text},[l,w,c]);return {recording:q,speaking:I,transcribing:K,transcript:O,pauseRecording:$,startRecording:L,stopRecording:j}};

exports.a = ue;
