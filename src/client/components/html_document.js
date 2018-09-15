//display message effect
export var html_document = `
<div id="document_parent" style="height:100%;width:100%;">
    <div id="document_child1">
        <button id="authback">Back Auth</button>
        <button id="documentsback">Back Documents</button>
        <button id="savedocument">Save Document</button>
    </div>
    <div id="document_child2">
        <div>
        <span>Document ID</span> <input id="iddoc" readonly>
        </div>
        <textarea style="height:100%;width:100%;" id="documentcontent"></textarea>
    </div>
</div>
`;
//#endregion