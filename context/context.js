import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Cria o contexto de autenticação para ser usado pela aplicação
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Estado local para armazenar o usuário autenticado
    const [user, setUser] = useState(null);
    // Estado para indicar se o usuário está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // Observa mudanças no estado de autenticação do Firebase
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Se há usuário, atualiza estados e obtém dados adicionais
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                // Se não há usuário, limpa estados
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        // Remove listener quando o componente desmonta
        return unsub;
    }, []);

    // Função para buscar e atualizar dados adicionais do usuário no Firestore
    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            // Mescla dados adicionais (username, profileUrl, userId) no objeto user
            setUser({
                ...user,
                username: data.username,
                profileUrl: data.profileUrl,
                userId: data.userId
            });
        }
    };

    // Função para login usando email e senha
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            // Mapeia códigos de erro do Firebase para mensagens amigáveis
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/invalid-credential)')) msg = 'E-mail ou Senha errada';
            return { success: false, msg };
        }
    };

    // Função para logout do usuário
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            // Em caso de erro, retorna mensagem e objeto de erro bruto
            return { success: false, msg: e.message, error: e };
        }
    };

    // Função para registrar novo usuário e salvar dados em Firestore
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Após criar conta, armazena informações adicionais no Firestore
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                profileUrl,
                userId: response.user.uid
            });
            return { success: true, data: response.user };
        } catch (e) {
            // Mapeia erros de registro para mensagens amigáveis
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Esse e-mail já está em uso';
            return { success: false, msg };
        }
    };

    // Provê os valores e funções de autenticação para toda a árvore de componentes
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para consumir o contexto de autenticação de forma simplificada
export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
};