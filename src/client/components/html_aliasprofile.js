import { html_contacts } from './html_contacts';

//#region html view Alias Profile 
export var html_aliasprofile = `
<br><label>Profile Search:</label><input id="profilesearch" style="width:700px;"><label>Status:</label><label id="searchstatus">None</label>
<br>` + html_contacts + `
<table><tr><td>
    <label>Name:</label>
    </td><td>
        <input id="aname">
    </td></tr><tr><td>
        <label>Born:</label>
    </td><td>
        <input id="aborn">
    </td></tr><tr><td>
        <label>Education:</label>
    </td><td>
        <input id="aeducation">
    </td></tr><tr><td>
        <label>Skills:</label>
    </td><td>
        <input id="askills">
    </td></tr>
</table>
`;
//#endregion