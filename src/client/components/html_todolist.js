//#region html view To Do List
export var html_todolist = `
	<div id="todolist_parent" style="height:100%;width:100%;">
		<div id="todolist_child1">
			<button id="authback">Back</button>
			<br>To Do List:
			<br><input id="inputtodolist"><button id="addtodolist">Add</button>
		</div>
		<div id="todolist_child2" style="overflow:auto;">
			<ul id="todolist"></ul>
		</div>
	</div>
`;
//#endregion