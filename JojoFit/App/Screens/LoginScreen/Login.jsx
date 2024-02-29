import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={require('../../../assets/phone-login.png')} 
      style={styles.loginImage}/>
      <View style={styles.subContainer}>
        <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>Bienvenue sur JojoFit !</Text>
            <Text style={styles.welcomeDescription}>Merci de vous connecter pour utiliser JojoFit.</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.loginButton}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
   loginImage:{
      width: 190,
      height: 400,
      marginTop:70,
   },

   subContainer:{
    width: '100%',
    height: '70%',
    backgroundColor:Colors.appblue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    gap: 90,
    alignItems: 'center',
   },

   welcomeText:{
    display: 'flex',
    gap: 10,
   },

   welcomeTitle:{
    color: Colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'center',
   },

   welcomeDescription:{
    color: Colors.white,
    fontSize: 14,
   },

   loginButton:{
    backgroundColor: Colors.white,
    color: Colors.appblue,
    width: 300,
    height: 65,
    borderRadius: 40,
    textAlign: 'center',
    paddingTop: 14,
    fontWeight: 'bold',
    fontSize: 25,
   }
})