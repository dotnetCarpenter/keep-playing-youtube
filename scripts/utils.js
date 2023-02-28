const add = a => b => a + b
const addOne = add (1)
const compose = f => g => x => f (g (x))
const map = f => iterative => iterative.map (f)
const reduce = f => x => iterative => iterative.reduce (f, x)
const zipWith = f => xs => ys => {
	if(xs.length === 0) return []
  	if(ys.length === 0) return []

	const x = xs[0],
    	  y = ys[0]

	xs = xs.slice(1)
	ys = ys.slice(1)

	return [f (x) (y)].concat (zipWith (f) (xs) (ys))
}

const convertToNumber = map (Number)

export {
	add,
	addOne,
	compose,
	convertToNumber,
	map,
	reduce,
	zipWith,
}
