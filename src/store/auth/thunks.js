import { signInWithGoogle, resgisterUserWithEmailAndPassword, loginWithEmailAndPassword, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());
        const result = await signInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await resgisterUserWithEmailAndPassword({
            email,
            password,
            displayName
        });

        let finalErrorMessage = errorMessage;

        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            finalErrorMessage = "El correo ingresado ya está en uso.";
        }

        if (!ok) return dispatch(logout({ errorMessage: finalErrorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));
    };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailAndPassword({ email, password });

        if (!result.ok) {
            let finalErrorMessage = result.errorMessage;

            if (finalErrorMessage === 'Firebase: Error (auth/user-not-found).') {
                finalErrorMessage = 'Usuario o contraseña incorrectos';
            }

            return dispatch(logout({ errorMessage: finalErrorMessage }));
        }

        dispatch(login(result));
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout({}));
    }
}

