const { authReducer } = require("./modules/auth/authReducer");
const { useEffect, useReducer } = require("react");
const { AuthContext } = require("./modules/auth/authContext");
const { AppRouter } = require("./shared/components/AppRouter");

const init = () => {
    return JSON.parse(
        localStorage.getItem('user')) || {isLogged: true} 

};

const App = () => {
    const [user,dispatch] = useReducer(authReducer, {},init);
    useEffect(()=>{
        if (!user) return;
        localStorage.setItem('user',JSON.stringify(user));
            },[user]);

    return (
        <AuthContext.Provider value={{dispatch, user}}>
        <AppRouter/>
    </AuthContext.Provider>
    );
};

export default App;

