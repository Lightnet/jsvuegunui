# Guide

# Information:
 You need some basics understand of javascript. This project used babeljs and vuejs to keep thing simple to improve javascript layout and compile. As well some understand of node graph like trees and keys id tree nodes. That come from gun.js to handle keys since simalar to database but used graph like tree or web nodes. It depend how scripted. More on gunjs > https://gun.eco/docs/Introduction

 The project give some simple examples. Private message, chat message, todolist and others to make thing easy to learn.

# Install:
 To install and run a simple server and run client browser peer to peer with database. You need to install [nodejs](https://nodejs.org). Once install download the project by git clone command.

```
git clone https://github.com/Lightnet/jsvuegunui.git
```

# Command line:
It has to be in project folder to install correctly.
```
npm install
```
Run this comand line to install node packages from packages.json
```
gulp default
```
Run this command line to start auto build and server start.

# Notes:
 * Some time it fail to install is that some packages are outdate or os setup or bugs.

 storage/shared/baregunjsui

# .env

The file .env is for config since linux work on this config but for window it neeed to be install package to make it work. env = environment path variable.

```
DatabaseFile='./data.json'
Blocal=true
BDatabase=false
DBPort='27017'
DBHost='localhost'
DBName='gun'
DBCollection='gun-mongo'
```

# database:

## mongod:
 Starting Server command line.

```
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "C:\data\db"
```
Notes:
 * There option to install as service. 