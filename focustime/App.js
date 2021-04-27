import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/fontSizes';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/focus';
import { Timer } from './src/features/timer/timer';
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory , setFocusHistory] = useState([]);

  //changing
  useEffect(() => {
    if(focusSubject){
      setFocusHistory([...focusHistory,focusSubject]);
    }
  },[focusSubject]);

  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
          }}

          clearSubject={() => setFocusSubject(null)}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
