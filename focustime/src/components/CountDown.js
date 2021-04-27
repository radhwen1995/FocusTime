import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet,Platform } from 'react-native';
import {colors} from '../utils/colors' ;
import {spacing} from '../utils/fontSizes' ;



const minutesToMilliSec = (min) => min * 1000*60 ;
const formatTime =(time) => time<10? `0${time}`: time ;

export const  CountDown =({
  minutes =2 ,
  isPaused  ,
  onProgress,
  onEnd
}) => {

const interval =React.useRef(null) ;

const countDown =() => {
  setMillis((time) => {
    if(time ===0){
      clearInterval(interval.current);
      onEnd();
      return time ;
    }
    const timeLeft =time - 1000;
    //report the progress 
    onProgress( timeLeft / minutesToMilliSec(minutes) )

    return timeLeft ;
  })
}

useEffect( () => {
  setMillis(minutesToMilliSec(minutes))
},[minutes]);

useEffect( () => {
  if(isPaused) {
    return ;
  }
  interval.current = setInterval(countDown ,1000);

  return () => clearInterval(interval.current)
},[isPaused]) ;

const [millis , setMillis] = useState(null) ; 
const minutesLeft = Math.floor(millis /1000/60) % 60 ;
const secondsLeft = Math.floor(millis /1000) % 60 ;
  return (
    <View style={styles.container}>
  
      <Text style={styles.text}> {formatTime(minutesLeft)} :{formatTime(secondsLeft)}  </Text>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
  },
  text: {
    fontSize: spacing.xxxxl ,
    fontWeight: 'bold',
    color : colors.white ,
    padding : spacing.lg , 
    backgroundColor: 'rgba(94,132,226,0.3)'
  }
});