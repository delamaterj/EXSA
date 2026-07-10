import { useState } from "react";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [error, setError] = useState("");
    const [editingField, setEditingField] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, "");
        let formatted = input;
        if (input.length > 3 && input.length <= 6) {
            formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
        } 
        else if (input.length > 6) {
            formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
        }
        setPhone(formatted);
    };

    const updateProfile = async (
        field: string,
        value: string
    ) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [field]: value }),
            });

      const data = await res.json();

      if (res.ok) {
        alert(`${field} has been modified`);
        const updatedUser = {
            ...user,
            [field]: value,
        };
        localStorage.setItem("user",JSON.stringify(updatedUser));
        setEditingField(null);
      } 
      else {
        setError(data.error);
      }

    } catch (err) {
      setError("An error occurred while logging in. Please try again later.");
    }
  };

    if (!user) return null;

    return (
        <>
            <div className="profile-page">
                <div className="profile-row">
                    <label>Name</label>
                    <div className="edit-controls">
                        <p>{user.name}<button onClick={() => setEditingField("name")}>Edit</button></p>
                        {editingField === "name" && (
                            <>
                                <input value={name} onChange={(e) => setName(e.target.value)} required/>
                                <button onClick={() => updateProfile("name", name)}>
                                    Update Name
                                </button>
                                {error && (<p className="error-text">{error}</p>)}
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-row">
                    <label>Email</label>
                    <div className="edit-controls">
                        <p>{user.email}<button onClick={() => setEditingField("email")}>Edit</button></p>
                        {editingField === "email" && (
                            <>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <button onClick={() => updateProfile("email", email)}>
                                    Update Email
                                </button>
                                {error && (<p className="error-text">{error}</p>)}
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-row">
                    <label>Phone</label>
                    <div className="edit-controls">
                        <p>{user.phone}<button onClick={() => setEditingField("phone")}>Edit</button></p>
                        {editingField === "phone" && (
                            <>
                                <input value={phone} onChange={handlePhoneChange} required/>
                                <button onClick={() => updateProfile("phone", phone)}>
                                    Update Phone
                                </button>
                                {error && (<p className="error-text">{error}</p>)}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Profile;