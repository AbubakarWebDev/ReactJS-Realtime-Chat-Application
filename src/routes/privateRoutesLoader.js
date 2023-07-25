import { store } from '../store';
import { getLoggedInUser } from '../store/slices/userSlice';

async function PrivateRoutesLoader() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const user = await store.dispatch(getLoggedInUser(token)).unwrap();
            
            return {
                user,
                isUserLoggedIn: true
            };
        }
        catch (err) {
            return {
                isUserLoggedIn: false
            };
        }
    }

    return false;
}

export default PrivateRoutesLoader;