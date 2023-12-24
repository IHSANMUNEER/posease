import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../components/colors';

const Privacy = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.secondary, flex: 1 }}>
      <Text style={styles.title}>Privacy Policy</Text>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              1. Information We Collect:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              We collect [list types of information, e.g., name, email, location] to [explain the purpose, e.g., provide personalized services].
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              2. How We Use Your Information:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Your information is used for [list specific purposes, e.g., improving app functionality, delivering targeted content, etc.].
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              3. Data Security:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              We employ industry-standard measures to safeguard your data against unauthorized access and ensure the integrity of your information.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              4. Third-Party Services:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              We may use third-party services for analytics, advertising, or other purposes. Please review the privacy policies of these services for more information.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              5. Cookies and Similar Technologies:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Our app may use cookies or similar technologies to enhance your experience. You can manage cookie preferences in your device settings.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              6. Your Choices:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              You have the right to [list user rights, e.g., access, correct, delete personal information]. Use [app settings/contacts] to manage your preferences.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              7. Children's Privacy:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Our app is not intended for users under the age of [specify age]. We do not knowingly collect or store information from children.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              8. Updates to Privacy Policy:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Our privacy policy may be updated to reflect changes in our practices. Check this page regularly for the latest information.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              9. Contact Us:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              If you have any questions or concerns about our privacy practices, please contact us at [privacy@example.com].
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
    fontSize: 30,
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
    borderColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: 80,
    borderRadius:20,
    
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

export default Privacy;
