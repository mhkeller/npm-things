Run commands
============

One of the great things about npm is its ability to run tasks for you similar to a make file. For example, if your project is to scrape a website, you could say `npm start` and it will execute a list of commands in the proper order.

This workflow is nice because it means all of your projects can be started with the same command so you don't have to remember things like "Do I run the download.js script and then the fetch.js or vice versa?" When you come to an old project, it can follow consistent conventions.

## Specifying run commands

From your previous step, your `package.json` should look like this:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My cool project.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael Keller",
  "license": "MIT",
  "dependencies": {
    "underscore": "^1.8.3"
  }
}
```

Let's create a new file called `index.js` and have it print "Hello, World."

```shell
touch index.js
echo "console.log('Hello, World')" > index.js
```

Test this by running `node index.js`

![hello, world](../assets/hello-world.gif)

Add the following to your `package.json` as the first item in `scripts`:

```
"start": "node index.js",
```

Your `package.json` should look like the following:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My cool project.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael Keller",
  "license": "MIT",
  "dependencies": {
    "underscore": "^1.8.3"
  }
}
```

Now do `npm start`

![npm start](../assets/npm-start.gif)

You'll notice it does the same thing but adds a bit of information about the task such as the project name, its version and the command it runs. If for some reason you want to hide this, append `--silent` to your command such as:

```shell
npm start --silent
```

### Custom run commands

The script commands `start` and `test` are special cases in that they can be run by simply doing `npm <command name>`

Any custom commands added to the `scripts` hash are run via `npm run <command name>`.

These scripts need not be Node scripts, either. They can be anything that you would type onto the command line. For example, let's make one that runs `ls`.

With a `package.json` of the following, do `npm run list-files`

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My cool project.",
  "main": "index.js",
  "scripts": {
    "list-files": "ls",
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael Keller",
  "license": "MIT",
  "dependencies": {
    "underscore": "^1.8.3"
  }
}
```

### Advanced run commands

You can get fancy with run commands. In the list below, we have `do-all` which runs our other npm commands.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My cool project.",
  "main": "index.js",
  "scripts": {
    "do-all": "npm start && npm run list-files",
    "list-files": "ls",
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael Keller",
  "license": "MIT",
  "dependencies": {
    "underscore": "^1.8.3"
  }
}
```

Similar to make files, you can also add post and pre hooks. In the file below, if we ran `npm start`, it would first run the command under `prestart` and when `start` finished, it would run `poststart`.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My cool project.",
  "main": "index.js",
  "scripts": {
    "prestart": "echo 'Getting ready to start...",
    "start": "node index.js",
    "poststart": "echo 'Finished!",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael Keller",
  "license": "MIT",
  "dependencies": {
    "underscore": "^1.8.3"
  }
}
```

Here is some more info on [npm scripts](https://docs.npmjs.com/misc/scripts) and running [custom scripts](https://docs.npmjs.com/cli/run-script).
