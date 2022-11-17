const yargs = require('yargs')
const { v4: uuidv4 } = require('uuid')
var fs = require('fs')
const _ = require('lodash')

const { lists, show, create, update, remove } = require('./../model/task')

let file_path = 'app/task.json'
yargs.command({
  command: 'test',
  handler: () => {
    console.log('test a')
  },
})
yargs.command({
  command: 'list',
  handler: () => {
    const data = lists()
    console.log('data: ', data)
  },
})
yargs.command({
  command: 'show',
  builder: {
    id: {
      type: 'string',
    },
  },
  handler: (args) => {
    const { id } = args
    let task = show(id)
    if (_.isEmpty(task)) {
      console.log('id: ' + id + ' not found in lists task')
      return
    }
    console.log('task: ', task)
  },
})
yargs.command({
  command: 'create',
  builder: {
    title: {
      type: 'string',
    },
    desc: {
      type: 'string',
    },
  },
  handler: (args) => {
    const { title, desc } = args
    const newTask = create(title, desc)
    console.log('Save success: ', newTask)
  },
})
yargs.command({
  command: 'update',
  builder: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    desc: {
      type: 'string',
    },
  },
  handler: (args) => {
    let { id, title, desc } = args
    let res = update(id, title, desc)
    if (res) {
      console.log('Update success')
      return
    }
    console.log('id: ' + id + ' not found in lists task')
  },
})
yargs.command({
  command: 'delete',
  builder: {
    id: {
      type: 'string',
    },
  },
  handler: (args) => {
    const { id } = args
    let res = remove(id)
    if (res) {
      console.log('Delete success')
      return
    }
    console.log('id: ' + id + ' not found in lists task')
  },
})

// Lưu lại các lệnh vừa tạo bên trên
yargs.parse()
