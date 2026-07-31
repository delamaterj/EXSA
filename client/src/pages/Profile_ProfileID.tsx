import {useState} from 'react';
import {getUser, updateCredential, clearSession} from '../utils/storage';
import {updateUser, deleteUser} from '../api/users.api';
import type {UpdateUserRequest, UpdateUserResponse, DeleteUserResponse} from '../types/users';
import {formatPhone} from '../utils/phone';
import {useNavigate} from 'react-router-dom';
import { ApiError } from '../types/ApiError';

export default function Profile() {
    
    const user = getUser();
    const [error, setError] = useState("");
    const [editingField, setEditingField] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    if (!user) {
        return;
    }

    async function handleDeleteUser() {
        try {
            const result : DeleteUserResponse = await deleteUser();
            alert(result.message);
            clearSession();
            navigate("/", { replace: true } );
        } catch(err) {
            if (err instanceof ApiError) {
                alert(err.message);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    }

    const deleteUserWindow = () => {
        const isOk = window.confirm("Delete account? This action cannot be undone");

        if (isOk) {
            handleDeleteUser();
        }
    };

    const handleUpdate = async (type: string, value: string) => {
        const credential = {
            type: type,
            value: value
        }
        try {
            const request : UpdateUserRequest = {
                userId: user.id,
                credential: credential
            }
            const update : UpdateUserResponse = await updateUser(request);
            const value = update.email || update.name || update.phone;
            alert(`Credentials updated with ${value}!`);
            updateCredential(credential);
            console.log(`credential type: ${credential.type}, value: ${credential.value}`);
            window.location.reload();
        }
        catch(err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    return (
        <>
            <article className="profile-page">
                <section className="profile-row">
                    <label>Name</label>
                    <div className="edit-controls">
                        <p>{user.name}<button onClick={() => setEditingField("name")}>Edit</button></p>
                        {editingField === "name" && (
                            <>
                                <input value={name} onChange={(e) => setName(e.target.value)} required/>
                                <button onClick={() => handleUpdate("name", name)}>
                                    Update Name
                                </button>
                            </>
                        )}
                    </div>
                </section>
                <section className="profile-row">
                    <label>Email</label>
                    <div className="edit-controls">
                        <p>{user.email}<button onClick={() => setEditingField("email")}>Edit</button></p>
                        {editingField === "email" && (
                            <>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <button onClick={() => handleUpdate("email", email)}>
                                    Update Email
                                </button>
                            </>
                        )}
                    </div>
                </section>
                <section className="profile-row">
                    <label>Phone</label>
                    <div className="edit-controls">
                        <p>{user.phone}<button onClick={() => setEditingField("phone")}>Edit</button></p>
                        {editingField === "phone" && (
                            <>
                                <input value={phone} onChange={handlePhoneChange} required/>
                                <button onClick={() => handleUpdate("phone", phone)}>
                                    Update Phone
                                </button>
                            </>
                        )}
                    </div>
                </section>
                {error && (<p className="error-text">{error}</p>)}
                <button onClick={deleteUserWindow}>
                    Delete Item
                </button>
            </article>
        </>
    );
}