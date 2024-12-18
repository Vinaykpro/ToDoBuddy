import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { ImageBackground, StyleSheet, View, Text, Image, TextInput, Pressable, Animated, Dimensions, Alert,  } from "react-native";
import { ScrollView } from "react-native";

export default () => {
    const [selectMode, setSelectMode] = useState(false);

    return (
        <ImageBackground style={styles.mainbg} source={require('@/assets/images/homebg.png')}>
          <ScrollView>
            <StatusBar style="dark"></StatusBar>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:30, height:30, margin: 15}} source={require('@/assets/images/backbtn.png')}></Image>
                <Text style={styles.mainHeading}>Choose Group</Text>
            </View>
            <GroupItemTab selected={true}></GroupItemTab>
            <GroupItemTab></GroupItemTab>
            <GroupItemTab></GroupItemTab>
            <GroupItemTab></GroupItemTab>
            <GroupItemTab></GroupItemTab>
            <View style={{height:80}}></View>
        </ScrollView>
        <LinearGradient colors={['#ff3c3c', '#fc9636']} style={styles.addBtn}>
                <Text style={[styles.mainHeading, {color:'white', width:'100%', pointerEvents:'none'}]}>Done</Text>
                <Pressable android_ripple={{color: 'rgba(220,235,245,0.5)', borderless: false}} style={styles.btnPressable}></Pressable>
        </LinearGradient>
        </ImageBackground>
    )
}

function GroupItemTab({selected = false}) {
    return (
      <View style={styles.groupTabItem}>
        <Image style={styles.groupTabIcon} source={require('@/assets/images/iconalpha.png')}></Image>
        <View style={{flex:1}}>
          <Text style={styles.GTName}>Group Name</Text>
          <Text style={styles.GTTasks}>12 Tasks</Text>
        </View>
        <Image style={{height:35, width:35, display: selected ? 'flex' : 'none' }} source={require('@/assets/images/selected.png')}></Image>
      </View>
    )
}

const styles = StyleSheet.create({
    mainbg: {
      height:'100%',
      width:'100%',
      flex: 1
    },
    mainHeading: {
      position:'absolute',
      fontSize:22,
      fontWeight:'700',
      color:'#111',
      width:'100%',
      textAlign:'center',
    },
    groupTabItem: {
      flexDirection:'row',
      backgroundColor:'#fff',
      borderRadius:20,
      marginTop:10,
      alignItems:'center',
      elevation:1,
      paddingVertical:6,
      paddingEnd:20
    },
    groupTabIcon: {
      height:80,
      width:80,
      marginStart:10,
    },
    GTName: {
      fontSize:18,
      color:'#333',
      marginBottom:3,
      fontWeight:'500'
    },
    GTTasks: {
      fontSize:14,
      color:'#555',
      marginBottom:5,
      fontWeight:'400'
    },
    addBtn: {
      position:'absolute',
      bottom:25,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:15,
      width:'90%',
      alignSelf:'center',
      overflow:'hidden'
  },
  btnPressable: {
      height:'100%',
      width:'100%',
      padding:28,
      borderRadius:15,
  },
})