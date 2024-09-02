import React, {useState, useEffect} from "react";
const API = process.env.REACT_APP_API

export const Users = () => { 

  // STATES
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState('')
  const [users, setUsers] = useState([])

  // FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editing === false){
      await fetch(`${API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
    }else if(editing === true){
      await fetch(`${API}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      setId('')
      setEditing(false)
    }

    await getUsers()


    setName('')
    setEmail('')
    setPassword('')
  }

  const getUsers = async () => {
    const res = await fetch(`${API}/users`)
    const data = await res.json();
    setUsers(data)
  }

  const updateUser = async (id) => {
    const res = await fetch(`${API}/user/${id}`)
    const data = await res.json()

    setEditing(true)
    setId(data._id)
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
  }

  const deleteUser = async (id) => {
    const useResponse = window.confirm('Are yoy sure want to delete it?')
    if(useResponse){
      await fetch(`${API}/user/${id}`, {
        method: 'DELETE'
      })
      await getUsers()
    }
  }

  useEffect(() => {
    getUsers()
  },[])

  // FORM AND TABLE
  return (
    <div className="row">
      {/* FORM */}
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group m-2">
            <input 
            type="text" 
            onChange={e => setName(e.target.value)} 
            value={name} 
            className="form-control" 
            placeholder="name" 
            autoFocus
            />
          </div>
          <div className="form-group m-2">
            <input 
            type="email" 
            onChange={e => setEmail(e.target.value)} 
            value={email} 
            className="form-control" 
            placeholder="Email" 
            />
          </div>
          <div className="form-group m-2">
            <input 
            type="password" 
            onChange={e => setPassword(e.target.value)} 
            value={password} 
            className="form-control" 
            placeholder="password" 
            />
          </div>
          <button className="btn btn-primary btn-block">{editing === false ? 'Create' : 'update'}</button>
        </form>
      </div>
      {/* TABLE */}
      <div className="col-md-8">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, indice) => (
              <tr key={user._id}>
                <td>{indice + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => updateUser(user._id)} className="btn btn-secondary btn-sm btn-block">Editar</button>
                  <button onClick={() => deleteUser(user._id)} className="btn btn-danger btn-sm btn-block">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}