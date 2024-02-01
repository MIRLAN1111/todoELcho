import React, { useState, useEffect } from "react";
import axios from "axios";
import scss from './TodoList.module.scss'

const Url = "https://elchocrud.pro/api/v1/b1e0f0578e859d001ff0fbc48eae26ee/mufa";

const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedItemId, setEditedItemId] = useState("");
	
 const [titleVlue , setTitleValue]= useState('');
 const [imageVlue , setImageValue]= useState('');
 const [descriptionValue , setDescriptionValue]= useState('');

  const handleAdd = async () => {
    const newData = {
      title: title,
      image: image,
      description: description,
    };
    const response = await axios.post(Url, newData);
    setTodo(response.data);
    setTitle("");
    setImage("");
    setDescription("");
  };

  const getTodos = async () => {
    const response = await axios.get(Url);
    setTodo(response.data);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`${Url}/${id}`);
    setTodo(response.data);
  };

  const updateTodoValue = (id) => {
    const filterData = todo.find((item) => item._id === id);
    setEditedItemId(id);
    setTitle(filterData.title);
    setImage(filterData.image);
    setDescription(filterData.description);
  };

  const updateTodo = async () => {
    const updatedData = {
      title: titleVlue,
      image: imageVlue,
      description: descriptionValue,
    };
    const response = await axios.put(`${Url}/${editedItemId}`, updatedData);
    setTodo(response.data);
    setIsEdit(false);
    setTitle("");
    setImage("");
    setDescription("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <center>
        <h1 className={scss.mufa}>TodoList</h1>
        <input className={scss.inputs1}
          type="text"
          placeholder="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <input className={scss.inputs2}
          type="url"
          placeholder="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <br />
        <input className={scss.inputs3}
          type="text"
          placeholder="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleAdd}>Add</button>
      </center>

      {todo.map((item) => (
        <div key={item._id}>
          {isEdit && editedItemId === item._id ? (
            <>
              <center>
                <h1>TodoList</h1>
                <input
                  type="text"
                  placeholder="text"
                  value={titleVlue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
                <br />
                <br />
                <input
                  type="url"
                  placeholder="image"
                  value={imageVlue}
                  onChange={(e) => setImageValue(e.target.value)}
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="title"
                  value={descriptionValue }
                  onChange={(e) => setDescriptionValue(e.target.value)}
                />
                <br />
                <br />
                <button onClick={handleAdd}>Add</button>
                <button onClick={updateTodo}>Save</button>
              </center>
            </>
          ) : (
            <>
              <h1>{item.title}</h1>
              <img src={item.image} alt={item.title} />
              <p>{item.description}</p>
            </>
          )}
          <button
            onClick={() => {
              deleteTodo(item._id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsEdit(!isEdit);
              updateTodoValue(item._id);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
