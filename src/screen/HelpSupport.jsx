import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../components/colors';

const Support = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.secondary, flex: 1 }}>
      <Text style={styles.title}>Help and Support</Text>
      <ScrollView>
        <View style={styles.container}>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              1. Frequently Asked Questions (FAQs):
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Find answers to common questions about [Your App Name]. Explore our FAQs for quick assistance.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              2. Contact Information:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Have a specific question or need assistance? Contact our support team at [support@example.com] or call us at [123-456-7890].
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              3. Troubleshooting Tips:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Encounter issues? Follow our troubleshooting guides to resolve common problems and improve your experience.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              4. User Guides and Tutorials:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Learn how to make the most of [Your App Name] with our detailed user guides and tutorials, including step-by-step instructions and visuals.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              5. App Version and Updates:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Check your current app version and stay informed about recent updates. We continually strive to enhance your experience.
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              6. Feedback and Suggestions:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              We value your feedback! Share your thoughts and suggestions to help us improve [Your App Name]. Use our feedback form or email us at [feedback@example.com].
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              7. Community Forums or User Groups:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Join our community forums or user groups to connect with other users, share tips, and discuss [Your App Name].
            </Text>
          </Text>

          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              8. App-related Resources:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              Explore additional resources, including a knowledge base, help articles, and video tutorials, to enrich your understanding of [Your App Name].
            </Text>
          </Text>

          {/* New Section for Help and Support */}
          <Text style={styles.section}>
            <Text style={[styles.subhead, { fontWeight: 'bold', fontSize: 20 }]}>
              9. Help and Support:
            </Text>
            {'\n'}
            <Text style={{ color: 'black' }}>
              For assistance, FAQs, or to contact our support team, please visit our Help and Support page at [support.example.com].
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
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
    borderColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: 80,
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
});

export default Support;
