# Information:
    Not used. Outdate. Used by gun RAD format. https://gun.eco/docs/RAD

//gun.get('@').time((data, key, time)=>{ // subscribe to all incoming posts
	//console.log(data);
    // data might be a soul that you have to GET, I haven't made `time` be chainable yet
//}, 99); // grab the last 99 items


pass it back to JS Date function, although I think it defaults to local not UTC
so like
new Date(Date.UTC(time))

and then lookup the various APIs on Date
I use something something like toLocaleTimeString
it is in the example/chat code
Lightnet @Lightnet 12:25
oh ok
Mark Nadal @amark 12:25
but there are different APIs for different string parsing
