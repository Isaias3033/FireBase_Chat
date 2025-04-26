import { Text, View } from 'react-native';
import {
    MenuOption,
  } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Componente genérico de item de menu para o popup menu
export const MenuItem = ({ text, action, value, icon }) => {
    return (
        // Quando selecionado, executa a ação passada como prop
        <MenuOption onSelect={() => action(value)}>
            <View className="px-4 py-1 flex-row justify-between items-center">
                {/* Texto do item com tamanho responsivo */}
                <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">
                    {text}
                </Text>
                {/* Ícone fornecido como prop para personalização */}
                {icon}
            </View>
        </MenuOption>
    );
};