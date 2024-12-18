import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { ImageBackground, StyleSheet, View, Text, Image, TextInput, Pressable, Animated, Dimensions, Alert,  } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export default function Screen() {
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;
    const marginLeft = useRef(new Animated.Value(0)).current;
    const [currProg, setcurrProg] = useState(0);
    const [showGroups, setShowGroups] = useState(true);

  const animateTo = (perc: number) => {
    Animated.timing(marginLeft, {
      toValue: (screenWidth*0.95) * (perc / 100),
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  animateTo(currProg)
    return(
        <ImageBackground style={styles.mainbg} source={require('@/assets/images/homebg.png')}>
            <StatusBar style="dark"></StatusBar>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:30, height:30, margin: 15}} source={require('@/assets/images/backbtn.png')}></Image>
                <Text style={styles.mainHeading}>Add Task</Text>
            </View>
            <View onTouchEnd={()=> {router.push('/chooseGroup')}} style={styles.tabBg}>
                <Image style={{width:50, height:50, marginEnd:10}} source={require('@/assets/images/iconalpha.png')}></Image>
                <View style={{flex: 1}}>
                    <Text style={{color:'#555', fontSize:13, fontWeight:'400'}}>Task group</Text>
                    <Text style={styles.groupName}>General</Text>
                </View>
                <Image style={{width:20, height:20, marginEnd:10, opacity: 0.6, transform:[{rotateZ: '-90deg'}] }} source={require('@/assets/images/arrowdown.png')}></Image>
            </View>
            <View style={styles.tabBg}>
                <View style={{marginStart:10, width:'100%'}}>
                    <Text style={{color:'#555', fontSize:15, fontWeight:'600'}}>Task Name</Text>
                    <TextInput
                    cursorColor={'#222'}
                    maxLength={20}
                    placeholder="Enter Task Name" placeholderTextColor={'#ccc'}
                    style={styles.taskNameInput}></TextInput>
                </View>
            </View>

            <View style={styles.tabBg}>
                <View style={{marginStart:10, width:'100%'}}>
                    <Text style={{color:'#555', fontSize:14, fontWeight:'600'}}>Description (optional)</Text>
                    <TextInput
                    cursorColor={'#222'}
                    placeholder="Enter Description" placeholderTextColor={'#ccc'}
                    multiline
                    selectionHandleColor={'#ff3c3c'}
                    style={[styles.taskNameInput, styles.taskDescInput]}></TextInput>
                </View>
            </View>
            
            <Text style={[styles.groupName, {color:'#334334', fontSize:18, marginStart:15, marginTop:20}]}>Progress</Text>
            <View style={[styles.tabBg, {padding: 0, paddingVertical: 0, margin:15, borderRadius:12}]}>
                <Animated.View style={[styles.taskProgressState, { marginLeft }]}></Animated.View>
                <Pressable onPress={() => setcurrProg(0)} style={styles.taskProgressInactive}>
                    <Text onPressOut={()=>{setcurrProg(0)}} style={{fontWeight:'700', textAlign:'center', color: currProg == 0 ? '#fff' : '#000'}}>To do</Text>
                </Pressable>
                <Pressable onPress={() => setcurrProg(33)} style={styles.taskProgressInactive}>
                    <Text onPressOut={()=>{setcurrProg(0)}} style={{fontWeight:'700', textAlign:'center', color: currProg == 33 ? '#fff' : '#000'}}>In Progress</Text>
                </Pressable>
                <Pressable onPress={() => setcurrProg(66)} style={styles.taskProgressInactive}>
                    <Text onPressOut={()=>{setcurrProg(0)}} style={{fontWeight:'700', textAlign:'center', color: currProg == 66 ? '#fff' : '#000'}}>Completed</Text>
                </Pressable>
            </View>
            <LinearGradient colors={['#ff3c3c', '#fc9636']} style={styles.addBtn}>
                <Text style={[styles.mainHeading, {color:'white', width:'100%', pointerEvents:'none'}]}>Add task</Text>
                <Pressable android_ripple={{color: 'rgba(220,235,245,0.5)', borderless: false}} style={styles.btnPressable}></Pressable>
            </LinearGradient>
            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainbg: {
        flex:1
    },
    mainHeading: {
        position:'absolute',
        fontSize:22,
        fontWeight:'700',
        color:'#111',
        width:'100%',
        textAlign:'center',
    },
    tabBg: {
        flexDirection:'row',
        padding:10,
        paddingVertical:15,
        backgroundColor:'#fff',
        elevation:1,
        borderRadius:20,
        alignSelf:'center',
        width:'95%',
        alignItems:'center',
        marginTop:20,
    },
    groupName: {
        color:'#111',
        fontWeight:'700',
        fontSize:18,
        width:'100%'
    },
    taskNameInput: {
        fontSize:20,
        width:'80%',
        marginTop:3
    },
    taskDescInput: {
        fontSize:17,
        maxHeight:120
    },
    taskProgressState: {
        position:'absolute',
        width:'34%', height:'100%',
        backgroundColor:'#ff3c3c',
        borderRadius:12,
        padding:10,
    },
    taskProgressInactive: {
        flex: 1,
        textAlign:'center',
        padding:10,
        color:'black',
        fontWeight:'700'
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