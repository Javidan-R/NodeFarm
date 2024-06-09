const replaceTemplate = (temp, pruduct) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, pruduct.pruductName);
	output = temp.replace(/{%IMAGE%}/g, pruduct.image);
	output = temp.replace(/{%PRICE%}/g, pruduct.price);
	output = temp.replace(/{%FROM%}/g, pruduct.from);
	output = temp.replace(/{%NUTRIENTS%}/g, pruduct.nutrients);
	output = temp.replace(/{%QUANTITY%}/g, pruduct.quantity);
	output = temp.replace(/{%DESCRIPTION%}/g, pruduct.decription);
	output = temp.replace(/{%ID%}/g, pruduct.id);
	if (!pruduct.organic) {
		output = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}
    return output;
};
module.exports = replaceTemplate