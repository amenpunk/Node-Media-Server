const NodeMediaServer = require('./');
const axios = require("axios")


axios({
    method: 'POST',
    url: 'https://us-central1-firstfire-f0b06.cloudfunctions.net/API/GetStream',
    data: {
        Mail : "admin@admin.com",
        apikey : "admin@admin.com" 
    }
}).then( links => {
    console.log(links.data)
    const config = {
        logType : 3,
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 30,
            ping_timeout: 60
        },
        http: {
            port: 8000,
            // mediaroot: './media',
            // webroot: './www',
            allow_origin: '*',
            // api: true
        },
        https: {
            port: 8443,
            key: './privatekey.pem',
            cert: './certificate.pem',
        },
        auth: {
            // api: true,
            // api_user: 'admin',
            // api_pass: 'sudo',
            play: true,
            publish: true,
            secret: 'reactnative'
        },
        relay : {
            ffmpeg: '/usr/bin/ffmpeg',
            tasks: links.data
        }
    };


    let nms = new NodeMediaServer(config)
    nms.run();

    nms.on('preConnect', (id, args) => {
        console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
        // let session = nms.getSession(id);
        // session.reject();
    });

    nms.on('postConnect', (id, args) => {
        console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    nms.on('doneConnect', (id, args) => {
        console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    nms.on('prePublish', (id, StreamPath, args) => {
        console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        // let session = nms.getSession(id);
        // session.reject();
    });

    nms.on('postPublish', (id, StreamPath, args) => {
        console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    nms.on('donePublish', (id, StreamPath, args) => {
        console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    nms.on('prePlay', (id, StreamPath, args) => {
        console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        // let session = nms.getSession(id);
        // session.reject();
    });

    nms.on('postPlay', (id, StreamPath, args) => {
        console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    nms.on('donePlay', (id, StreamPath, args) => {
        console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
} )


