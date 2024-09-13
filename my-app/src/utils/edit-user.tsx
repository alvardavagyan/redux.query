import { useState } from "react"
import { useEditUserMutation } from "../features/users/users.api"
import { InputUser, IUser } from "../features/users/types"

type Props = {
    user: {
        id: string
        name: string
        salary: number
    },
    onClose: () => void
}

export const EditUser = ({ user, onClose }: Props) => {
    const [editUser] = useEditUserMutation()
    const [data, setData] = useState<InputUser>({
        name: user.name,
        salary: user.salary
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editUser({ id: user.id, updatedUser: data })
        onClose()
    }

    return <>
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                name="salary"
                value={data.salary}
                onChange={handleChange}
            />
            <br />
            <button>save</button>
            <button onClick={onClose}>cancel</button>


        </form>
    </>
}