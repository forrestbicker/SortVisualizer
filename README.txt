Dev notes:
To debug typescript, build with `npm run build`, then use F5 to launch debugger in chrome with the default setup

        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch HTML in chrome",
            "url": "file://${file}",
            "webRoot": "${workspaceFolder}"
        },