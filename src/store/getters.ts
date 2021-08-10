import { auth } from '@/services/firebase.service';


export const getCurrentUser = () => {
    return auth.currentUser
}

export const getCurrentUserId = () => {
    return getCurrentUser()?.uid
}