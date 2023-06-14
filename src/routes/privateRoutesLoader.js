import { store } from '../store';
import { getLoggedInUser } from '../store/slices/userSlice';

async function PrivateRoutesLoader() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            await store.dispatch(getLoggedInUser(token)).unwrap();
            return true;
        }
        catch (err) {
            return false;
        }
    }

    return false;
}

export default PrivateRoutesLoader;