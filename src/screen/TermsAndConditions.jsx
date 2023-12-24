import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../components/colors';

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.secondary, flex: 1 }}>
      <Text style={styles.title}>Terms and Policies</Text>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Introduction:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Briefly explain the purpose of the terms and conditions. Specify that by using the app, users agree to abide by these terms.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              User Eligibility:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Clearly state the age and other eligibility criteria for using the app. Specify that users must comply with local laws and regulations.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              User Responsibilities:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Outline user responsibilities, such as providing accurate information during registration, compliance with laws, and maintaining respectful behavior.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Intellectual Property:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Specify the ownership of intellectual property rights (e.g., trademarks, copyrights) related to the app. Define how users can use the app's content and any restrictions on usage.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Prohibited Activities:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              List activities that are not allowed, such as hacking, data scraping, or any illegal activities. Specify the consequences of violating these terms, including the right to terminate user accounts.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Termination:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Outline conditions under which the app provider can terminate user accounts. Specify the process for termination.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Disclaimers and Limitations of Liability:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Clearly state disclaimers regarding the accuracy of information provided through the app. Limit the app provider's liability in certain situations.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Governing Law and Dispute Resolution:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Specify the jurisdiction governing the terms and conditions. Define the process for resolving disputes, which may include arbitration or mediation.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              Updates and Modifications:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Reserve the right to update and modify the terms and conditions. Specify how users will be informed of changes, such as through notifications or by checking the app.
            </Text>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    borderColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: 60,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  subhead: {
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    color: colors.primary,
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});

export default TermsAndConditions;
