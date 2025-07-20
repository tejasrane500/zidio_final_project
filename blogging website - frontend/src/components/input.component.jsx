import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon, disable = false }) => {

    const [ PasswordVisible, setPasswordVisible ] = useState(false);
    return(
        <div className="relative w-[100%] mb-4">
            <input 
                name={name}
                type={ type == "password" ? PasswordVisible ? "text" : "password" : type }
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                disabled={disable}
                className="input-box"
            />

            <i className={"fi " + icon + " input-icon"}></i>

            {

                type == "password" ?
                <i className={"fi fi-rr-eye" + (!PasswordVisible ?  "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
                onClick={() => setPasswordVisible(currentval => !currentval)}
                ></i>
                : ""
            }
        </div>
    )
}

export default InputBox;