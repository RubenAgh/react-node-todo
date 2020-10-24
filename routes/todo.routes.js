const { Router } = require('express');
const Todos = require('../models/Todos');

const router = Router();

router.get('/', async (req, res) => {
    const todos = await Todos.find();

    res.json(todos);
});

router.post('/', async (req, res) => {
    const { title } = req.body;

    const todo = new Todos({ title, completed: false });
    await todo.save();

    res.status(201).json({ todo });
});

router.delete('/:id', async (req, res) => { 
    const { id } = req.params;

    const deleted = await Todos.findByIdAndRemove(id);
    res.json({ success: true, deletedTodo: deleted });
});

router.put('/', async (req, res) => {
    const { id, value } = req.body;

    const todo = await Todos.findById(id);
    todo.title = value;
    await todo.save()


    res.json({ success: true, changedTodo: todo });
});

router.post('/complete', async (req, res) => {
    const { id, value } = req.body;

    const todo = await Todos.findById(id);
    todo.completed = value;
    await todo.save()


    res.json({ success: true, changedTodo: todo });
});

module.exports = router;