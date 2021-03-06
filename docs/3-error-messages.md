Error messages
==============

Reading error messages can be tricky. Npm doesn't fully help since it prints out a lot of boilerplate info, but we can find some common patterns.

As a general note, every time npm throws an error, it will write out the error to a file called `npm-debug.log` in your current working directory. The next time you successfully run an npm command, the file will be deleted. This file often crops up during merge conflicts. If you've either fixed the issue or documented its contents elsewhere, you can safely delete this file.

## Table of contents

* [npm command errors](#npm-command-errors)
* [Script errors](#script)
* [No module found errors](#no-module-found-errors)
* [Reading stack traces](#reading-stack-traces)

## npm command errors

These are errors that happen when you mistype an [npm script command](2-run-commands.md).

For example, let's say you are trying to do `npm run dev` but you have a typo and you write `dve` intead. Npm will give you the following

```
npm ERR! Darwin 15.3.0
npm ERR! argv "/usr/local/Cellar/node4-lts/4.4.3/bin/node" "/usr/local/bin/npm" "run" "dve"
npm ERR! node v4.4.3
npm ERR! npm  v3.8.8

npm ERR! missing script: dve
npm ERR!
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>

npm ERR! Please include the following file with any support request:
npm ERR!    /Users/username/my-project/npm-debug.log
```

We see three groups of text separated by line breaks. The first group is about our system setup: I'm running Darwin (OS X), I'm executing nodejs from my `/user/local/Cellar` folder, which means I used homebrew to install it. It gives the full path to where the `npm` command is stored in my `/usr/local/bin` folder. And I passed it the following arguments `run" "dve"`.

It also tells me what version of node and npm are running.

If you read that one carefully you could catch that you misspelled `dve`. But the next section is the most helpful. In this middle part, npm will generally give you an error message. `missing script: dve` gives us an indication that we passed it something that it wasn't expecting and that something was a script command. 

The rest of the text is boilerplate information on how to report an error.

**Main takeaway:** Look at the middle section to see if npm has given you a meaningful error message.

## No module found errors

A very common error is that a script you've written is calling a dependency that you have not installed. Replace the contents of your `index.js` file in your `my-project` folder with [`problem-files/no-module.js`](../problem-files/no-module.js) and run `npm start`. You should get the following error:

```
module.js:327
    throw err;
    ^

Error: Cannot find module 'underscore'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (/Users/mkeller52/wrk/code/npm-things/problem-files/no-module.js:2:18)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
```

Fortunatley this is fairly straightforward. If the project author installed the dependencies using `npm install --save <pkg name>` as discussed in [1-getting-started.md](1-getting-started.md), then the fix is easy: run `npm install`. This will install all the dependencies listed in `package.json`. If our underscore dependency is not listed in that file, then consult with the project author as to what version is required and then install that dependency with the `npm install --save` syntax.

## Script errors

These are generic JavaScript errors such as `ReferenceErrors` or `TypeErrors`. They are essentially simple errors that should look familiar to you if you're used to coding JavaScript in the browser. npm adds some extra junk, though, so let's see what we can safely ignore and which parts are relevant.

Replace the contents of your `index.js` file in your `my-project` folder with [`problem-files/reference-error.js`](../problem-files/reference-error.js) and run `npm start`. You should get the following error:

```
> my-project@1.0.0 start /Users/username/my-project
> node index.js

/Users/username/my-project/index.js:3
y.toUpperCase()
^

ReferenceError: y is not defined
    at Object.<anonymous> (/Users/username/my-project/index.js:3:1)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3

npm ERR! Darwin 15.3.0
npm ERR! argv "/usr/local/Cellar/node4-lts/4.4.3/bin/node" "/usr/local/bin/npm" "start"
npm ERR! node v4.4.3
npm ERR! npm  v3.8.8
npm ERR! code ELIFECYCLE
npm ERR! my-project@1.0.0 start: `node index.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the my-project@1.0.0 start script 'node index.js'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the my-project package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     node index.js
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs my-project
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls my-project
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!    /Users/username/my-project/npm-debug.log
```

Most of this is garbage and can be ignored. The only relevant part is where it gives you the file path and line number:

```
/Users/username/my-project/index.js:3
y.toUpperCase()
^

ReferenceError: y is not defined
    at Object.<anonymous> (/Users/username/my-project/index.js:3:1)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3
```

Like normal JavaScript errors, it tells you that we're trying to call `toUpperCase()` on a variable we haven't defined and gives us the line number.

**Main takeaway:** Scroll up to find the error that JavaScript is giving you and ignore all the stuff that is about npm telling you to report errors. If you run this script directly with `node index.js` you will just get the JavaScript error, which is sometimes easier to work with while developing or debugging.

## Reading stack traces

The previous error was fairly straightforward since it involved a single file. When your code involves callbacks, things can get tricky...

Replace the contents of your `index.js` with [`problem-files/stacktrace-index.js`](../problem-files/stacktrace-index.js). Copy the file [`problem-files/stacktrace-sumNumbers.js`](../problem-files/stacktrace-sumNumbers.js) into your projects root folder so it's a sibling of `index.js`.

Now run `npm start`. You should see this error 

```
> my-project@1.0.0 start /Users/mkeller52/wrk/test/my-project
> node index.js

/Users/username/my-project/index.js:17
    throw new Error(err)
    ^

Error: oh no!
    at handleResponse (/Users/username/my-project/problem-files/stacktrace-index.js:17:11)
    at sumNumbers (/Users/username/my-project/problem-files/stacktrace-sumNumbers.js:19:3)
    at Object.<anonymous> (/Users/username/my-project/problem-files/stacktrace-index.js:13:1)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3

npm ERR! Darwin 15.3.0
npm ERR! argv "/usr/local/Cellar/node4-lts/4.4.3/bin/node" "/usr/local/bin/npm" "start"
npm ERR! node v4.4.3
npm ERR! npm  v3.8.8
npm ERR! code ELIFECYCLE
npm ERR! my-project@1.0.0 start: `node index.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the my-project@1.0.0 start script 'node index.js'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the my-project package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     node index.js
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs my-project
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls my-project
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/username/my-project/npm-debug.log
```

Again, we scroll up to read the error that JavaScript sent us and we ignore the npm cruft. Unfortunately, this error isn't very helpful since it just says `oh no!`.

The first place to look is line 17 of our index.js file, as the message tells us up top. That isn't super helpful because that's merely the line that is telling us that it found an error, not the root cause. If your error is a jewelry thief fleeing from a height, line 17 is where the police officer caught him, we want to retrace his steps, though, to find the scene of the crime.

To go deeper we start reading k trace, which is the list of files below the line `Error: oh no!`.

The stack trace is a record of what functions were called, listed in verse chronological order.

We already looked at line 17 so we can skip that. Next is our `stacktrace-sumNumbers` file and line 19, let's take a look at that. If you read this function, what do you see? 

```js
function addNumbers (x, y, cb) {
  var err = null
  var sum = x + y
  if (sum < 10) {
    err = 'oh no!'
  }
  cb(err, sum)
}
```

This function is designed to throw an error if the sum of the two numbers is less than 10. You might have noticed that in one of the instances where we called that function, we passed it `1` and `2`, which would trigger the error condition. If you didn't notice that, or more realistically, it's not immediately obvious who passed this function bad arguments, go to the next line of the stack trace.

The next line tells us to look at line 13 of index.js. This line is really useful since we're calling `sumNumbers` twice and we want to know which one is causing us so much difficulty in our lives.

To double check, you could put `console.log(x, y)` on line 12 and see what those variables are as they're getting passed into `sumNumbers`.

**Main takeaway:** In looking at stack traces, there will be some files you don't recognize at all and a lot of nonsense. Look for files whose names look familiar to you and start inspecting who is calling those functions and what they're being passed.
