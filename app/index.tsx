import { Image, StyleSheet, Platform, View, ImageBackground, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
export default function IntroScreen() {
  const router = useRouter();
  return (
    <ImageBackground source= {require('@/assets/images/introbg.png')} style={styles.splashbg}>
      <StatusBar style='dark'/>
      <View style={styles.info}>
        <Text style={styles.heading1}>To-Do List App</Text>
        <Text style={styles.cap}>Your ultimate companion for staying organized and getting things done effortlessly.</Text>
        <LinearGradient
        colors={['#f1330a', '#e37c1c']}
        style={ styles.button}>
        <Pressable onPress = {() => {router.replace('/home')}} android_ripple={{ color: '#ff9999', borderless: false}}>
        <Text style={styles.text}>Get Started!</Text>
        </Pressable>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    splashbg: {
      flex:1
    },
    info: {
      position:'absolute',
      bottom:50,
      width:'100%',
      alignItems:'center'
    },
    button: {
      borderRadius:25,
      width:'75%',
      overflow:'hidden'
    },
    text: {
      color: 'white',
      fontSize: 18,
      alignSelf:'center',
      fontWeight:'800',
      margin:13
    },
    heading1: {
      color:'#444',
      fontWeight:'700',
      fontSize:27
    },
    cap: {
      color:'#888',
      fontWeight:'500',
      fontSize:17,
      width:'85%',
      textAlign:'center',
      margin:20,
      marginBottom:40
    }
  });