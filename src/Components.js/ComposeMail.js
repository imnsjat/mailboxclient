import React, { useRef, useState } from "react";
import classes from './ComposeMail.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from "draft-js";

const ComposeMail = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
const [vis,setVisible]=useState(false);
const reciver=useRef();
const subject=useRef();
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    if(editorState)
    {
        setVisible(true);
    }
  };
  const mailHandler=()=>{
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const plainText = rawContentState.blocks
      .map((block) => block.text.trim())
      .filter(Boolean)
      .join('\n');
      let sender=localStorage.getItem("email");
      let mail={
        sender,
        reciver:reciver.current.value,
        subject:subject.current.value,
        mail:plainText,
        read:false,
        unread:true,
        starred:false,
        time:props.time,
        send:true,
        receive:false
      }
      console.log(mail);
      toast.success("Mail sent successfully");

      setEditorState("");
  }

  return (
    <div className={classes.backdrop}>
      <div className={classes.maincomposer}>
        <div className={classes.msg}>
          <h3>New Message</h3>
          <div className={classes.closecomposer}>
            {/* <span>-</span>
            <span>Resize</span> */}
            <span
              onClick={() => {
                props.onClick(false);
              }}
            >
              X
            </span>
          </div>
        </div>

        <div className={classes.to}>
          <span >To</span>
          <input type="email" name="email" id="email" className={classes.w90} ref={reciver}/>
          {/* <span>
            <a href="#cc">CC</a> <a href="#BCC">BCC</a>
          </span> */}
        </div>
        <div className={classes.subject}>
          <input
            type="text"
            name="subject"
            id="subject"
            className={classes.w90}
            placeholder="Subject"
            ref={subject}
          />
        </div>
        <div className={classes.editorcontainer}>
      <Editor
        editorState={editorState}
        toolbarClassName={classes.toolbar}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
    {vis && <button className={classes.send} onClick={mailHandler}>Send</button>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ComposeMail;