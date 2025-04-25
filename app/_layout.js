//importa componentes essenciais do React Native para estruturação da interface do usuário
import { View, Text } from 'react-native'
//importa React e hook useEffect para gerenciar efeitos colaterais no ciclo de vida do componente
import React, { useEffect } from 'react'
//importa Slot para renderizar o conteudo da rota atual, useRouter para navegação e useSegments para monitorar segmentos de rota
import { Slot, useRouter, useSegments } from 'expo-router';
//importa o arquivo de estilo global (CSS). Para estilizar o aplicativo
import "../global.css";
//importa o contexto de atenticação e o provider para gerenciar o estado de autenticação no aplicativo
import { AuthContextProvider, useAuth } from '../context/authContext';
//importa MenuProvider para fornecer suporte a menus pop-up em todo o aplicativo
import { MenuProvider } from 'react-native-popup-menu';

//Componente principal que gerencia a navegação e autenticação do usuário
const MainLayout = () => {
    //Obtém o estado de atenticação do usuário a partir do contexto de autenticação
    const { isAuthenticaded } = useAuth();
    //Obtém os segmentos dá rota atuais
    const segments = useSegments();
    //Hook para navegação entre rotas
    const router = useRouter();
}

// useEffect que é executado sempre que o estado de autenticação muda
useeffect(() => {
    // Verifica se o estado de autenticação está indefinido
    if (typeof isAuthenticaded == 'undefined') return;

    // Verifica se o usuário está em uma rota dentro da aplicação (app)
    const InApp = segments[0] == '(app)';

    // Se o usuário está autenticado e não está em uma rota dentro da aplicação, redireciona para a rota 'home'
    if (isAuthenticaded && !InApp) {
        router.replace('home');
    }
    // Se o usuário não está autenticado, redireciona para a rota de login (signIn)
    else if (isAuthenticaded == false) {
        router.replace('signIn');
    }

}, [isAuthenticaded]) // Hook é executado novamente se 'isAutheticated' mudar

//retorna o slot, que renderiza a rota ativa com base no roteamento do expo router
return <Slot />

// componente raiz que envolve o aplicativo com provedores de contexto
export default function RootLayout() {
    return (
        // MenuProvider oference suporte a menus pop-up em todo o aplicativo
        <MenuProvider>
            {/* AuthContextProvider oferece o contexto de autenticação para todo o aplicativo */}
            <AuthContextProvider>
                {/*MainLayout gerencia a navegação baseada na autenticação*/}
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}
