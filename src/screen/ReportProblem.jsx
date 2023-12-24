import * as React from 'react';
import { StyleSheet, View, Text ,TouchableOpacity } from 'react-native';
import { TextInput, DefaultTheme } from 'react-native-paper';
import colors from '../components/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReportAni from '../components/ReportAni';
import { ScrollView } from 'react-native-gesture-handler';

const Report = () => {
  const [text, setText] = React.useState("");
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary, // Set your desired primary color
    },
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Report Problem</Text>
        <View style={styles.content}>
          <TextInput
            label="Describe the Problem"
            value={text}
            onChangeText={text => setText(text)}
            style={styles.input}
            multiline
            theme={theme}
          />
          <ReportAni/>
          
        </View>
        </ScrollView>
        <TouchableOpacity style={styles.continue}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginHorizontal: 30
  },
  input: {
    backgroundColor: 'white',
    
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
    borderColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: 80,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  continue:{
    width: '90%',
    height: 60,
    marginVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    fontWeight: '900'


  },
  buttontext:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  }
});

export default Report;
