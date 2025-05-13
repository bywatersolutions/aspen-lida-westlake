import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LibrarySystemContext, ThemeContext } from '../context/initialContext';
import { ChevronLeftIcon, CloseIcon, Pressable, Icon, HStack, VStack } from 'native-base';
import { View, Image, StyleSheet, Text, useColorMode } from '@gluestack-ui/themed';
import { Platform, useWindowDimensions } from 'react-native';
import Constants from 'expo-constants';

let topPadding = 7;
if (Platform.OS === 'android') {
     topPadding = 3;
}

const HeaderLogoBar = (props) => {
     const { theme, colorMode } = React.useContext(ThemeContext);
     const { library } = React.useContext(LibrarySystemContext);
     const { width, height } = useWindowDimensions();
     if (library.headerLogoApp){
          const localBrandingLogoUri = library.headerLogoApp;

          //Assume an image that is 1536 x 200
          const ratio = width/1536;
          const imageHeight = 200 * ratio;
          const colorMode = useColorMode();
          let backgroundColor = '#000000';
          if (colorMode == 'light') {
               backgroundColor = '#FFFFFF';
          }

          return (
               <HStack backgroundColor={backgroundColor} safeAreaTop='1' safeAreaBottom='1' >
                     <Image
                        source={{uri: localBrandingLogoUri}} alt={library.displayName} placeholder=""  style={{ resizeMode: 'contain', maxHeight:imageHeight, maxWidth:'100%', width: '100%', backgroundColor:{backgroundColor}}}
                      />
               </HStack>
          );
     }else{
          return null;
     }
};



export default function TitleWithLogo(props) {
     const { theme } = React.useContext(ThemeContext);
     const navigation = useNavigation();
     const hideBack = props.hideBack ?? false;

     const colorMode = useColorMode();
     let backgroundColor = '#000000';
     if (colorMode == 'dark') {
          backgroundColor = '#FFFFFF';
     }

     return (
          <VStack safeAreaTop={topPadding}  backgroundColor={backgroundColor} >
               <HeaderLogoBar />
               <HStack safeAreaLeft={7} safeAreaRight={7} safeAreaBottom={2} safeAreaTop={2} alignItems="left" style={{ backgroundColor:theme['colors']['primary']['base'] }} >
                    {navigation.canGoBack() && !hideBack && (
                       <Pressable onPress={() => navigation.goBack()} mr={3} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} >
                            <ChevronLeftIcon size={5} color={theme['colors']['primary']['baseContrast']} />
                       </Pressable>
                     )}
                    <Text style={{color:theme['colors']['primary']['baseContrast'], fontSize:18, lineHeight:22, fontWeight:'bold'}} numberOfLines={1} ellipsizeMode="tail">{props.title}</Text>
               </HStack>
          </VStack>
     );
}
