import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader({ user, router }) {
    return (
        // Configurações específicas de tela no stack navigator
        <Stack.Screen
            options={{
                title: '', // Remove título padrão
                headerShadowVisible: false, // Remove sombra do header

                // Componente exibido à esquerda do header
                headerLeft: () => (
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            {/* Ícone de voltar */}
                            <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-3">
                            {/* Avatar do usuário */}
                            <Image
                                source={user?.profileUrl}
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                            />
                            {/* Nome do usuário ao lado do avatar */}
                            <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-medium">
                                {user?.username}
                            </Text>
                        </View>
                    </View>
                ),

                // Componente exibido à direita do header
                headerRight: () => (
                    <View className="flex-row items-center gap-8">
                        {/* Ícone de chamada de voz */}
                        <Ionicons name="call" size={hp(2.8)} color={'#737373'} />
                        {/* Ícone de chamada de vídeo */}
                        <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} />
                    </View>
                )
            }}
        />
    );
}