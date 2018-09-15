# jquery

# Information:
 Simple tips and learning for jquery.

```
$('#view').html(html_privatemessage);//not used this way, might leak?
$('#view').empty().append(html_privatemessage);//use this way it clean up handlers
```

https://jsfiddle.net/fp7hLx7g/ jquery ui effect test.

```
$("#child2").css("height", ($("#parent").height()-$("#child1").height()));
$( window ).resize(function() {
    //child2 > parent > child1
    $("#child2").css("height", ($("#parent").height()-$("#child1").height()));
});
```

```
  // Dynamically building an unordered list from an array
  var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"],
  	list = $("ul.people"),
  	dynamicItems = "";

  $.each(localArr, function(index, value) {

    dynamicItems += "<li id=" + index + ">" + value + "</li>";

  });

  list.append(dynamicItems);
```

```

  var list = $("#longlist");

  list.on("mouseenter", "li", function(){

    $(this).text("Click me!");

  });

  list.on("click", "li", function() {

    $(this).text("Why did you click me?!");

  });

```