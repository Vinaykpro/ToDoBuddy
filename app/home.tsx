import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, Button, ProgressBarAndroidBase, ScrollView, Pressable, Animated, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from 'expo-linear-gradient';
import * as ProgressBar from 'react-native-progress'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router'
import * as SQLite from 'expo-sqlite';

const { width, height } = Dimensions.get('window');
const groupIcons = [
  require('@/assets/images/personalgroup.png'),
  require('@/assets/images/workgroup.png'),
  require('@/assets/images/healthgroup.png'),
  require('@/assets/images/studygroup.png'),
]
const groupColors = [
  ['#EBDCF8', '#D3B4F1'],
  ['#FDE6F0', '#F9CADA'],
  ['#E6F5FF', '#A6DFFF'],
  ['#FFF3E6', '#FFD8A6']
]
export default function HomeScreen() {
  const router = useRouter();
  const [isHome, setIsHome] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const db = SQLite.openDatabaseAsync('vkpro.db')
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists tasks (
          id text primary key, 
          name text, 
          desc text, 
          groupname text, 
          groupid text, 
          status text
        );`
      );

      tx.executeSql("select * from tasks", [], (_, { rows }) => {
        let data = rows._array;
        setTasks(data);
      });
    }, 
    (e: { message: string | undefined; }) => Alert.alert("Error", e.message));
  }, []);

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  
  return (
    <ImageBackground style={styles.homebg} source={require('@/assets/images/homebg.png')}>
    <StatusBar style='dark'/>
    { isHome ?
    <Animated.ScrollView showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}>
    <View style={styles.brandingContainer}>
    <Image source={require('@/assets/images/iconalpha.png')} style={styles.logo} />
    <Text style={styles.appName}>To-Do Buddy</Text>
    </View>
    <LinearGradient colors={['#ff3c3c', '#fc9636']}style={styles.currentProgressHeader}>
    <View style = {styles.PHSec1}>
      <Text style={styles.PHText}>Your today's tasks were almost complete!</Text>
      <View style={styles.PHBtn}><Pressable onPress={()=>{setIsHome(false)}}><Text style={styles.PHBtnText}>View Tasks</Text></Pressable></View>
    </View>
    <CircularProgress
    value={60}
    radius={42}
    duration={500}
    progressValueColor={'#fff'}
    progressValueFontSize={18}
    inActiveStrokeColor='rgba(255,255,255,0.3)'
    activeStrokeColor='#fff'
    maxValue={100}
    valueSuffix='%'
    titleColor={'black'}
    titleStyle={{fontWeight: 'bold'}}
    activeStrokeWidth={9}
    inActiveStrokeWidth={7}>
    </CircularProgress>
    </LinearGradient>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={styles.mainhead}>In Progress</Text>
    <Text style={styles.mainheadcount}>4</Text>
    </View>
    <ScrollView horizontal={true} style={styles.mainRow} showsHorizontalScrollIndicator={false}>
      <InProgressTaskTab></InProgressTaskTab>
      <InProgressTaskTab></InProgressTaskTab>
      <InProgressTaskTab></InProgressTaskTab>
      <InProgressTaskTab></InProgressTaskTab>
      <View style={{width:20}}></View>
    </ScrollView>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={styles.mainhead}>Task Groups</Text>
    <Text style={styles.mainheadcount}>4</Text>
    </View>
    <View style={styles.groupsContainer}>
      <GroupItemTab name={'Personal'} i={1}></GroupItemTab>
      <GroupItemTab name={'Work'} i={2}></GroupItemTab>
      <GroupItemTab name={'Health'} i={3}></GroupItemTab>
      <GroupItemTab name={'Study'} i={4}></GroupItemTab>
    </View>
    </Animated.ScrollView> 
    :
    <View>
      <Text style={[styles.appName, {margin:20, fontSize:22}]}>Today's Tasks</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.taskListType]}><Text style={[styles.taskListName, {color:'#fff'}]}>All</Text></View>
        <View style={[styles.taskListType, {backgroundColor:'#ffecec'}]}><Text style={[styles.taskListName, {color:'#edacac'}]}>To do</Text></View>
        <View style={[styles.taskListType, {backgroundColor:'#ffecec'}]}><Text style={[styles.taskListName, {color:'#edacac'}]}>In Progress</Text></View>
        <View style={[styles.taskListType, {backgroundColor:'#ffecec'}]}><Text style={[styles.taskListName, {color:'#edacac'}]}>Completed</Text></View>
      </ScrollView>
    </View>
    }
    <Animated.View
        style={[
          styles.bottomNav,
          {
            transform: [{ translateY: translateY }],
          },
        ]}>
    <LinearGradient colors={['#efefef', '#fff']} style={styles.bottomNav}>
      <Pressable
        android_ripple={{color:'#ccc'}}
        onPress={()=>{setIsHome(true)}}
        style={[styles.navItem, {marginEnd:15, opacity: isHome ? 1 : 0.25}]}>
        <Image source={require('@/assets/images/homeicon.png')} style={styles.navIcon}></Image>
        <Text style={[styles.navItemName]}>Home</Text>
      </Pressable>
      <Pressable
        android_ripple={{color:'#ccc'}}
        onPress={()=>{setIsHome(false)}}
        style={[styles.navItem, {opacity: isHome ? 0.25 : 1}]}>
        <Image source={require('@/assets/images/scheduleicon.png')} style={styles.navIcon}></Image>
        <Text style={[styles.navItemName]}>Tasks</Text>
      </Pressable>
      <LinearGradient onTouchEnd = {() => {router.push('/addProject')}} colors={['#ff3c3c', '#fc9636']} style={styles.addBtn}>
      <Image source={require('@/assets/images/plusicon.png')} style={styles.navIcon}></Image>
      </LinearGradient>
    </LinearGradient>
    </Animated.View>
  </ImageBackground>
  );
}

function InProgressTaskTab() {
  return (
    <LinearGradient colors={['#e3f1ff', '#c4f3ff']} style={styles.inProgressTab}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={styles.groupName}>General Group</Text>
        <Image style={styles.groupImg} source={require('@/assets/images/iconalpha.png')}></Image>
      </View>
      <Text style={styles.taskTitle}>Groceries</Text>
      <Text numberOfLines={2} ellipsizeMode='tail' style={styles.taskDesc}>Need to hurry up and take groceries from the store early this morning.</Text>
      </LinearGradient>
  )
}

function GroupItemTab({name = 'Group Name', i = 1}) {
  return (
    <LinearGradient colors={groupColors[i-1]} style={styles.groupTabItem}>
      <Image style={styles.groupTabIcon} source={groupIcons[i-1]}></Image>
      <View style={{flex:1}}>
        <Text style={styles.GTName}>{name}</Text>
        <Text style={styles.GTTasks}>12 Tasks</Text>
      </View>
      <CircularProgress
      value={45}
      radius={30}
      duration={500}
      progressValueColor={'#555'}
      progressValueFontSize={15}
      inActiveStrokeColor='rgba(20,190,255, 0.1)'
      activeStrokeColor='rgba(255,255,255, 0.9)'
      maxValue={100}
      valueSuffix='%'
      activeStrokeWidth={7}
      inActiveStrokeWidth={5}>
    </CircularProgress>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  homebg: {
    flex : 1
  },
  brandingContainer: {
    flexDirection: 'row',
    alignItems:'center',
    paddingStart:13
  },
  logo: {
    width: 65,
    height: 65,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  currentProgressHeader: {
    width:'92%',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:20,
    margin:12,
    flexDirection:'row',
    shadowColor:'#444',
    shadowOffset:{width: 10,height: 10},
    shadowOpacity:0.5,
    elevation:5
  },
  PHSec1: {
    width:'65%',
    paddingStart:20,
    alignItems:'flex-start',
    paddingVertical:20,
  },
  PHText: {
    color: 'white',
    fontWeight: '600',
    fontSize:18,
    marginBottom:20
  },
  PHBtn: {
    backgroundColor:'white',
    alignContent:'center',
    padding:7,
    paddingHorizontal:20,
    borderRadius:12,
    marginBottom:10
  },
  PHBtnText: {
    color:'#ff3c3c',
    fontWeight:'600',
    fontSize:15
  },
  mainhead: {
    margin:8,
    marginStart:15,
    fontSize:20,
    fontWeight:'800',
    color:'#555'
  },
  mainheadcount: {
    padding:5,
    paddingHorizontal:8,
    backgroundColor:'rgba(255,44,44,0.4)',
    borderRadius:10,
    fontSize:14,
    fontWeight:'600',
    color:'white'
  },
  mainRow: {
    flexDirection:'row'
  },
  inProgressTab: {
    width:width * 0.62,
    height:150,
    borderRadius:18,
    padding:5,
    paddingHorizontal:15,
    paddingBottom:5,
    margin:12,
    marginEnd:0,
    shadowColor:'#444',
    shadowOffset:{width: 10,height: 10},
    shadowOpacity:0.5,
    elevation:2
  },
  groupName: {
    color:'#666',
    fontSize:14,
    fontWeight:'500'
  },
  groupImg: {
    height:35,
    width:35
  },
  taskTitle: {
    color:'#000',
    fontSize:18,
    fontWeight:'500'
  },
  taskDesc: {
    lineHeight: 20,
    color:'#555',
    fontSize:13,
  },
  groupsContainer: {
    width:'95%',
    alignSelf:'center',
    paddingBottom:10,
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
    height:70,
    width:70,
    marginStart:10,
    marginHorizontal:10,
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
  bottomNav: {
    position:'absolute',
    bottom:0,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    elevation:5,
  },
  addBtn: {
    position:'absolute',
    alignSelf:'center',
    backgroundColor:'#ff3c3c',
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    height:60,
    width:60,
    bottom:32,
    elevation:3
  },
  navItem: {
    flex:1,
    flexDirection:'row',
    padding:20,
    alignItems:'center',
    justifyContent:'center',
  },
  navIcon: {
    height:28,
    width:28
  },
  navItemName: {
    color:'#ff3c3c',
    fontWeight:'800',
    fontSize:16,
    marginStart:8
  },
  taskListType: {
    width: width*0.30,
    padding:10,
    backgroundColor:'#ff3c3c',
    borderRadius:12,
    margin:10,
    marginEnd:0
  },
  taskListName: {color:'#fff', textAlign:'center', fontWeight:'700', fontSize:16}
})