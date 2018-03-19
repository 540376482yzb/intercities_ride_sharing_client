async function doSomething() {
	await dothis()
	await dothat()
	dofinal()
}

async function dothis() {
	setTimeout(() => {
		console.log(1)
	}, 1000)
}

async function dothat() {
	setTimeout(() => {
		console.log(2)
	}, 1000)
}

function dofinal() {
	console.log(3)
}

doSomething()
