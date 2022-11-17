const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const file_path = 'app/task.json'

const lists = () => {
  const buffer = fs.readFileSync(file_path)
  return buffer ? JSON.parse(buffer.toString()) : []
}
const show = (id) => {
  return getTaskById(id)
}
const create = (title, desc) => {
  let param = {
    id: uuidv4(),
    title: title,
    desc: desc,
  }
  let data = lists()
  data = [...data, param]
  console.log('data: ', data)
  fs.writeFileSync(file_path, JSON.stringify(data), function (err) {
    if (err) throw err
    console.log('Save success')
  })

  return param
}
const update = (id, title, desc) => {
  let data = lists()
  let index = getIndexTaskById(id)

  if (index > -1) {
    data[index].title = title
    data[index].desc = desc
    fs.writeFileSync(file_path, JSON.stringify(data))

    return true
  }

  return false
}

const remove = (id) => {
  const data = lists()
  let index = getIndexTaskById(id)
  if (index > -1) {
    var news = _.remove(data, function (task) {
      return task.id == id
    })
    fs.writeFileSync(file_path, JSON.stringify(data), function (err) {
      if (err) throw err
      console.log('Save success')
    })
    return true
  }

  return false
}

const getTaskById = (id) => {
  const data = lists()
  let index = _.findIndex(data, function (task) {
    return task.id === id
  })

  return index > -1 ? data[index] : {}
}

const getIndexTaskById = (id) => {
  const data = lists()
  let index = _.findIndex(data, function (task) {
    return task.id === id
  })

  return index
}

module.exports = {
  lists: lists,
  show: (id) => {
    return show(id)
  },
  create: (title, desc) => {
    return create(title, desc)
  },
  update: (id, title, desc) => {
    return update(id, title, desc)
  },
  remove: (id) => {
    return remove(id)
  },
}
