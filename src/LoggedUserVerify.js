import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import { useNavigate  } from "react-router-dom";

export default function Verification(userinfo, setUserinfo){
    const { config, setConfig } = useContext(UserContext);
    const navigate = useNavigate();

    if (Object.keys(config).length === 0){
        if (localStorage.getItem("UserData") === null){
            navigate('/');
        }else{
            const userData = JSON.parse(localStorage.getItem("UserData"));
            setUserinfo(userinfo = userData);
            setConfig({headers:{...config, Authorization: `Bearer ${userinfo.token}`}});
        }
    } 
}