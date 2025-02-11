import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const useUserType = () => {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const db = getDatabase();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = ref(db, `users/${user.uid}`);

                onValue(userRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        if (userData.userType) {
                            setUserType(userData.userType);
                        } else {
                            setUserType(null);
                        }
                    } else {
                        setUserType(null);
                    }
                });
            } else {
                setUserType(null);
            }
        });
    }, []);

    return userType;
};

export default useUserType;