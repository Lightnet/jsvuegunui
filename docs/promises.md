# Promises

Links:
 * https://scotch.io/tutorials/javascript-promises-for-dummies

```
const isMomHappy = true;

	// Promise
	const willIGetNewPhone = new Promise(
		(resolve, reject) => { // fat arrow
			if (isMomHappy) {
				const phone = {
					brand: 'Samsung',
					color: 'black'
				};
				resolve(phone);
			} else {
				const reason = new Error('mom is not happy');
				reject(reason);
			}
		}
	);

	const showOff = function (phone) {
		const message = 'Hey friend, I have a new ' +
					phone.color + ' ' + phone.brand + ' phone';
		return Promise.resolve(message);
	};

	// call our promise
	const askMom = function () {
		willIGetNewPhone
			.then(showOff)
			.then(fulfilled => console.log(fulfilled)) // fat arrow
			.catch(error => console.log(error.message)); // fat arrow
	};

	askMom();
```

```
async function checkcontactexist(pub){
		return new Promise(
			async (resolve, reject) => {
				if(user.is){
					console.log(pub);
					user.get('contact').once().map().once((data,id)=>{
						console.log(data);
					});
					user.get('contact').map().get(pub).once((data)=>{
						console.log(data);
					})

					//let list = await user.get('contact').once().map().once((data,id)
					//);





					/*
					console.log(list);
					let bfound = false;
					
					for(let p in list){
						//console.log(p);
						if(list[p] == pub){
							console.log("FOUND!");
							bfound = true;
							break;
						}
					}
					resolve(bfound);
					*/
				}else{
					const reason = new Error('No Alias!');
					reject(reason);
				}				
			}
		);
	}

```