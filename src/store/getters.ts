import { auth } from '@/services/firebase.service';


export const getCurrentUser = () => {
    return auth.currentUser
}