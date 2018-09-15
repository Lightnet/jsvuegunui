import { html_aliasprofile } from './html_aliasprofile';
    
//#region html view auth / main area
export var html_auth = `
<button id="logout" style="float:right;">Logout</button>
<button id="passwordhint">Password Hint</button>
<button id="changepassword">Change Password</button>
<button id="privatemessage">Private Message</button>
<button id="documents">Documents</button>
<button id="chatroom">Chat Room</button>
<button id="todolist">To Do List</button>
<br><span id="alias">User Alias</span>
<br><span>Public Key: <input id="publickey" style="width:700px;" readonly> </span>
<button id="copykey">Copy Key</button>
<br>
<table><tr><td>
    <label>Name:</label>
    </td><td>
        <input id="name">
    </td><td>
        <button id="gname">+</button>
    </td></tr><tr><td>
        <label>Born:</label>
    </td><td>
        <input id="born">
    </td><td>
        <button id="gborn">+</button>
    </td></tr><tr><td>
        <label>Education:</label>
    </td><td>
        <input id="education">
    </td><td>
        <button id="geducation">+</button>
    </td></tr><tr><td>
        <label>Skills:</label>
    </td><td>
        <input id="skills">
    </td><td>
        <button id="gskills">+</button>
    </td></tr>
</table>
` + html_aliasprofile;
//#endregion