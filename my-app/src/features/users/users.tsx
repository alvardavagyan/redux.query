import { useState } from "react"
import { AddUser } from "../../utils/add-user"
import { EditUser } from "../../utils/edit-user"
import { useDeleteUserMutation, useGetUsersQuery } from "./users.api"

export const Users = () => {
    const { data, isLoading } = useGetUsersQuery(null)
    const [deleteUser] = useDeleteUserMutation()
    const [editing, setEditing] = useState(null)

    const handleDelete = (id: string) => {
        deleteUser(id)
    }
    return <>
        <h3>UserList</h3>
        <AddUser />
        {isLoading && <p>Loading...</p>}

        {
            data && <>
                {
                    data.map(user =>
                        <div key={user.id}>
                            <p>{user.name} {user.salary} AMD</p>
                            <button onClick={() => handleDelete(user.id)}>delete</button>
                            <button onClick={() => setEditing(user)}>edit</button>
                        </div>
                    )
                }
            </>
        }

        {
            editing && (
                <EditUser
                    user={editing}
                    onClose={() => setEditing(null)}
                />
            )}
    </>
}