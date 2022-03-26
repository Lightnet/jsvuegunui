http://jsbin.com/zoyalumawu/edit?html,js,console

```js
var gun = Gun();

// include .open
gun.get('person/mark').open(function(mark){
  mark; // {name: "Mark Nadal", pet: {name: "Frizzles", species: "kitty", slave: {...}}}
  console.log(mark);
});

var human = {
  name: "Mark Nadal",
  pet: {
    name: "Frizzles",
    species: "kitty" // for science!
  }
};
human.pet.slave = human;

gun.get('person/mark').put(human);
```