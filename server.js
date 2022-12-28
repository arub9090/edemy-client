const express = require('express')
const next = require('next')
const {createProxyMiddleware} = require("http-proxy-middleware")
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server= express()

    if(dev){
        server.use('/api', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));
    }

    server.all("*", (req, res)=>{
        return handle(req, res)
    })

    server.listen(3000, (err)=> {
        if (err) {
            throw err;
        }else{
            console.log("Listening on Port 3000 and Proxy to Port 8000")
        }
    });

}).catch((err)=>{
    console.log("Error Found", err)
})