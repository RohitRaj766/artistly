'use client'
import { useEffect, useState } from 'react'

export default function ManagerDashboard() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users').then(res=>res.json()).then(data=>setUsers(data.users))
  }, [])

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <table className="min-w-full text-sm bg-white rounded overflow-hidden shadow">
        <thead className="bg-indigo-50">
          <tr>
            {['Name','Email','Role','Actions'].map(h=>(
              <th key={h} className="p-3 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">
                <button className="text-indigo-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
