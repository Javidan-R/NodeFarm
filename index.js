const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
};

// SERVER
const templateCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const templateOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const templateProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj
            .map((el) => replaceTemplate(templateCard, el))
            .join('');
        const output = templateOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml);
        res.end(output);

        // Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        if (product) {
            const output = replaceTemplate(templateProduct, product);
            res.end(output);
        } else {
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.end('<h1>Product not found</h1>');
        }

        // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

        // Not Found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world',
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8081, '127.0.0.1', () => {
    console.log('Listening to requests on port 8081');
});
