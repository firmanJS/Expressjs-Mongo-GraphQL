const { TodoTask, TodoTaskTC } = require('../../database/models/todo')

TodoTaskTC.addResolver({
  name: 'create',
  kind: 'mutation',
  type: TodoTaskTC.getResolver('createOne').getType(),
  args: TodoTaskTC.getResolver('createOne').getArgs(),
  resolve: async ({ args }) => {
    const todoTask = await TodoTask.create(args.record);

    return {
      record: todoTask,
      recordId: TodoTaskTC.getRecordIdFn()(todoTask),
    };
  },
});

const TodoTaskQuery = {
  todoList: TodoTaskTC.getResolver('findMany'),
  todoById: TodoTaskTC.getResolver('findById'),
  todoOne: TodoTaskTC.getResolver('findOne'),
  todoCount: TodoTaskTC.getResolver('count'),
  todoConnection: TodoTaskTC.getResolver('connection'),
  todoPagination: TodoTaskTC.getResolver('pagination'),
};

const TodoTaskMutation = {
  todoWithFile: TodoTaskTC.getResolver('create'),
  todoCreateOne: TodoTaskTC.getResolver('createOne'),
  todoCreateMany: TodoTaskTC.getResolver('createMany'),
  todoUpdateById: TodoTaskTC.getResolver('updateById'),
  todoUpdateOne: TodoTaskTC.getResolver('updateOne'),
  todoUpdateMany: TodoTaskTC.getResolver('updateMany'),
  todoRemoveById: TodoTaskTC.getResolver('removeById'),
  todoRemoveOne: TodoTaskTC.getResolver('removeOne'),
  todoRemoveMany: TodoTaskTC.getResolver('removeMany'),
};

module.exports = { TodoTaskQuery, TodoTaskMutation }
