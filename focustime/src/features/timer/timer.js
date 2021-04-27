import React, { useState } from 'react';
import { Text, View, StyleSheet,Alert,Vibration ,Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/fontSizes';
import {useKeepAwake} from 'expo-keep-awake';
import {CountDown} from '../../components/CountDown'
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from './Timing';

const DEFAULT_TIME = 0.1 ;
export const Timer = ({focusSubject ,onTimerEnd,clearSubject}) => {

  useKeepAwake();
  const [minutes , setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

 //const onPress = (state) => setIsStarted(state);
const vibrate =() =>{
  if(Platform.OS ==='ios'){
    const interval = setInterval(() => Vibration.vibrate(),1000); 
    setTimeout(() => clearInterval(interval),10000)
  }
  else{
    Vibration.vibrate('10000') ;
  }
}

const onEnd =() => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
}
 const onPress = (state) => {
   // alert(`clicked ${state}`); 
    setIsStarted(state);
  }

  const onProgress =(progress) => {
    setProgress(progress)
  }

  const changeTime =(min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }
  return (
    <View style={styles.container}>
    <View style ={styles.countdown}>
      <CountDown 
      minutes={minutes} 
      isPaused ={!isStarted} 
      onProgress={onProgress} 
      onEnd={onEnd}/>
    </View>

      <View style ={{paddingTop:spacing.xxl}}>
        <Text style ={styles.title}> Focusing on :  </Text>
        <Text style={styles.task}> {focusSubject}</Text> 
      </View>

      <View> 
        <View style={{paddingTop: spacing.xl}}>
          <ProgressBar progress={progress} color='#5E84E2' style={{ height:  10 }}/>
        </View>

        <View style={styles.buttonsWrraper}>
          <Timing onChangeTime={changeTime}/>
         </View>

      </View>

      <View style ={styles.buttonsWrraper}>
      {!isStarted ?
     ( <RoundedButton title="start" size={50} onPress={()=>onPress(true)} > </RoundedButton> ):

        (<RoundedButton title="pause" size={50} onPress={()=>onPress(false)}> </RoundedButton> )
      }
      </View>

      <View styles ={styles.clearSubject}> 
        <RoundedButton title="-" size={50} onPress={ () => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  title: {
    color :colors.white ,
    textAlign: 'center'
  },
   task: {
    color :colors.white ,
    textAlign: 'center',
    fontWeight: 'bold'
  },  
   countdown: {
    flex :0.5 ,
    alignItems: 'center',
    justifyContent: 'center'
  },
    buttonsWrraper: {
    flex :0.3 ,
    flexDirection:"row",
    padding : 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearSubject : {
    paddingBottom: 25 , 
    paddingLeft: 25
  }
  

});
