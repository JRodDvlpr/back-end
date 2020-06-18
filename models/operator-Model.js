const db = require('../database/dbConfig');

const add = (operator) => {
    return db('operators')
    .insert(operator)
    .then(([id]) => db('operators').where({ id }).first());
}

const findBy = (filter) => {
    return db('operators')
    .select('id', 'username', 'password')
    .where(filter)
}

const findById = (id) => {
    return db('operators')
    .select('id', 'username')
    .where({ id })
    .first()
}

const update = (changes, id) => {
    return db('operators')
    .where({ id })
    .update(changes)
    
}

const remove = (id) => {
    return db('operators')
    .where({ id })
    .del()
}

module.exports = {
    add,
    findBy,
    findById,
    update,
    remove
}