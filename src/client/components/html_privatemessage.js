//#region html view private message
import { html_contacts } from './html_contacts';

export var html_privatemessage = `
<div id="messsage_parent" style="height:100%;width:100%;">
    <div id="messsage_child1">
        <button id="authback">Back</button>
        ` + html_contacts + `
        <br><label>Alias Public Key:</label><input id="pub"><label id="publickeystatus">Status: None</label>
        <br><label>Private Message:</label><input id="message"><button id="send">Send</button>
        <div style="width:100%;">Messages:</div>
    </div>
    <div id="messagelist">
        <ul id="messages"></ul>
    </div>
<div>
`;
//#endregion