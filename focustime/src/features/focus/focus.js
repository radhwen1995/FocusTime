import React ,{useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {fontSizes ,paddingSizes} from '../../utils/fontSizes' ;
import { TextInput } from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton'

export const Focus = ({addSubject}) => {
  const [subject ,setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>what do you want to focus on ?</Text>
        <View style ={styles.inputContainer}> 
          <TextInput style={{flex:1 ,marginRight:10}} 
          onSubmitEditing={
          ({  nativeEvent }) => {
            setSubject(nativeEvent.text)
          }}/> 
          <RoundedButton size ={50}title="+" onPress={() => {addSubject(subject)}}> 
          </RoundedButton>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  titleContainer :{
    flex: 0.5 ,
    padding: paddingSizes.md ,
    justifyContent: 'center'
  },
  title: {
    color :"white" ,
    fontWeight:"bold",
    fontSize:fontSizes.lg
  },
  inputContainer :{
    paddingTop: paddingSizes.md,
    flexDirection: "row",
    alignItems :"center"
  }
});
