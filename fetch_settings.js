const http = require('http');

http.get('http://localhost:81/api/settings', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(data);
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
