import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import CardAni from '../components/CardAni';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, DefaultTheme} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import PaymentSuccess from './PaymentSuccess';


const CreditCardInputScreen = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [isCardNumberFocused, setIsCardNumberFocused] = useState(false);
  const [isExpiryDateFocused, setIsExpiryDateFocused] = useState(false);

  const navigation = useNavigation();

  // const fetchPaymentIntentClientSecret = async ({ amount, gateway }) => {
  //   const res =  await fetch(`http://localhost:3001/products/create-setup-intent`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       amount: (amount * 100).toString(),
  //       currency: 'EUR',
  //       gateway: gateway,
  //     }),
  //   }).then((response) => response.json())
  //   .then((data) => data)
  //   .catch((error) => {
  //    console.log(error)
  //   });
  //   return res?.client_secret;
  //   navigation.navigate('PaymentSuccess');
  // };

  const handleNameChange = input => {
    setName(input);
  };

  const handleCardNumberFocus = () => {
    setIsCardNumberFocused(true);
    setIsExpiryDateFocused(false);
  };

  const handleExpiryDateFocus = () => {
    setIsCardNumberFocused(false);
    setIsExpiryDateFocused(true);
  };

  const handleCardNumberChange = input => {
    const cleanedInput = input.replace(/\D/g, '');
    let formattedCardNumber = '';
    for (let i = 0; i < cleanedInput.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedCardNumber += ' ';
      }
      formattedCardNumber += cleanedInput[i];
    }

    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = input => {
    const cleanedInput = input.replace(/\D/g, '');
    if (cleanedInput.length <= 2) {
      setExpiryDate(cleanedInput);
    } else if (cleanedInput.length <= 4) {
      setExpiryDate(`${cleanedInput.slice(0, 2)}/${cleanedInput.slice(2, 4)}`);
    }
  };

  const handleCVCChange = input => {
    setCVC(input);
  };

  const handleSave = () => {
  
    console.log('Name:', name);
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVC:', cvc);

  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary, 
    },
  };

  return (

//     <StripeProvider
//     publishableKey="pk_test_51OzFxnEh5u89PsHoKGbPhpprRSYgC7Un1RuiUu1V5K4NKtbJUWOPylSK34ekLHH5HyOvgSyOCeb57EwsnTVOTsCJ00KTAxTdjz"
//     urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
//     merchantIdentifier="merchant.com.{{PosEase}}" // required for Apple Pay
// >

    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Connect to bank</Text>
      <ScrollView>
        <View style={styles.container}>
        
          <CardAni style={styles.animation} />

          <View style={styles.labelContainer}>
            <TextInput
              mode="outlined"
              label="Name"
              placeholder="John Doe"
              placeholderTextColor="grey"
              value={name}
              onChangeText={handleNameChange}
              theme={theme}
              style={styles.textInput}
             
            />
          </View>

          <View style={styles.labelContainer}>
            <TextInput
              mode="outlined"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              placeholderTextColor="grey"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              theme={theme}
              maxLength={19}
              onFocus={handleCardNumberFocus}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inlineContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                mode="outlined"
                label="Expiry Date"
                placeholder="MM/YY"
                keyboardType="numeric"
                placeholderTextColor="grey"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                theme={theme}
                maxLength={5}
                onFocus={handleExpiryDateFocus}
                style={styles.textInput}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'stretch' }}>
              <TextInput
                mode="outlined"
                label="CVC"
                placeholder="501"
                keyboardType="numeric"
                placeholderTextColor="grey"
                value={cvc}
                onChangeText={handleCVCChange}
                theme={theme}
                maxLength={3}
                style={[styles.textInput,{ borderRadius: 40}]}
              
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('PaymentSuccess') }>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
     
    //   // Your app code here
    // </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.secondary,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animation: {
    
  },
  textInput:{
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 25,
    
  }
});

export default CreditCardInputScreen;
