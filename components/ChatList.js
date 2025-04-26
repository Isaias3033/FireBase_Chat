import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

// Componente que exibe a lista de chats
export default function ChatList({ users, currentUser }) {
    const router = useRouter(); // Hook para navegação

    return (
        // Container principal ocupando todo o espaço disponível
        <View className="flex-1">
            <FlatList
                data={users} // Array de usuários para listar
                contentContainerStyle={{ flex: 1, paddingVertical: 25 }} // Estilo do container da lista
                keyExtractor={item => Math.random()} // Gera uma chave única (não recomendado, ideal usar um id único do item)
                showsVerticalScrollIndicator={false} // Esconde a barra de rolagem vertical
                // Renderiza cada item da lista usando o componente ChatItem
                renderItem={({ item, index }) => (
                    <ChatItem
                        noBorder={index + 1 == users.length} // Remove a borda do último item
                        router={router} // Passa o objeto de navegação
                        currentUser={currentUser} // Usuário atual
                        item={item} // Dados do usuário do chat
                        index={index} // Índice do item na lista
                    />
                )}
            />
        </View>
    )
}