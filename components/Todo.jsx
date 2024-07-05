function Todo({ id, item, deleteTodo, completeTodo }) {
  const { _id: mongoId, title, description, isCompleted } = item;
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {title}
      </td>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {description}
      </td>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {isCompleted ? "Completed" : "Pending"}
      </td>
      <td className="px-6 py-4 flex gap-1">
        <button
          className="py-2 px-4 bg-red-500 text-white"
          onClick={() => deleteTodo(mongoId)}
        >
          Delete
        </button>
        {isCompleted ? null : (
          <button
            className="py-2 px-4 bg-green-500 text-white"
            onClick={() => completeTodo(mongoId)}
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
}

export default Todo;
