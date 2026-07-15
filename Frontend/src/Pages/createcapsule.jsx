import { useState } from "react";
import "./CreateCapsule.css";

function CreateCapsule() {

    const [title, setTitle] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [unlockDate, setUnlockDate] = useState("");
    const [image, setImage] = useState(null);

    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    function handleImage(e) {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

    function handleSubmit(e) {

        e.preventDefault();

        setFormError("");
        setSuccessMessage("");

        if (
            title.trim() === "" ||
            recipientName.trim() === "" ||
            recipientEmail.trim() === "" ||
            category === "" ||
            message.trim() === "" ||
            unlockDate === ""
        ) {
            setFormError("Please fill all required fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(recipientEmail)) {
            setFormError("Please enter a valid recipient email.");
            return;
        }

        if (message.length < 20) {
            setFormError("Message should contain at least 20 characters.");
            return;
        }

        setLoading(true);

        setTimeout(() => {

            setLoading(false);

            setSuccessMessage(
                `🎉 Time Capsule created successfully! It will be delivered to ${recipientName} on ${unlockDate}.`
            );

            console.log({
                title,
                recipientName,
                recipientEmail,
                category,
                message,
                unlockDate,
                image
            });

        }, 2000);

    }

    return (

        <div className="capsule-container">

            <div className="capsule-card">

                <h1>Create Time Capsule</h1>

                <p>
                    Create a memory today that will be opened in the future.
                </p>

                {formError &&
                    <div className="form-error">
                        {formError}
                    </div>
                }

                {successMessage &&
                    <div className="success-message">
                        {successMessage}
                    </div>
                }

                <form
                    className="capsule-form"
                    onSubmit={handleSubmit}
                >

                    <label>Capsule Title</label>

                    <input
                        type="text"
                        placeholder="Enter capsule title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />

                    <label>Recipient Name</label>

                    <input
                        type="text"
                        placeholder="Enter recipient name"
                        value={recipientName}
                        onChange={(e)=>setRecipientName(e.target.value)}
                    />

                    <label>Recipient Email</label>

                    <input
                        type="email"
                        placeholder="Enter recipient email"
                        value={recipientEmail}
                        onChange={(e)=>setRecipientEmail(e.target.value)}
                    />

                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option>Birthday</option>
                        <option>Friendship</option>
                        <option>Wedding</option>
                        <option>Travel</option>
                        <option>Graduation</option>
                        <option>Family</option>
                        <option>Personal</option>
                    </select>

                    <label>Your Message</label>

                    <textarea

                        rows="7"

                        maxLength="1000"

                        placeholder="Write your memory..."

                        value={message}

                        onChange={(e)=>setMessage(e.target.value)}

                    />

                    <div className="counter">

                        {message.length}/1000

                    </div>

                    <label>Unlock Date</label>

                    <input

                        type="date"

                        min={today}

                        value={unlockDate}

                        onChange={(e)=>setUnlockDate(e.target.value)}

                    />

                    <label>Upload Memory Photo</label>

                    <input

                        type="file"

                        accept="image/*"

                        onChange={handleImage}

                    />

                    {image &&

                        <img

                            className="preview"

                            src={URL.createObjectURL(image)}

                            alt="preview"

                        />

                    }

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {loading ?

                            "Creating Capsule..."

                            :

                            "Create Capsule"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateCapsule;