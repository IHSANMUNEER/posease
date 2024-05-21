import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getAllCountries, getAllStatesByCountry, getCitiesOfState } from 'country-state-city';

const DoctorRegistration = () => {
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch all countries
    const allCountries = getAllCountries().map(country => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (country) {
      // Fetch all states when country changes
      const countryStates = getAllStatesByCountry(country);
      const formattedStates = countryStates.map(state => ({
        label: state.name,
        value: state.isoCode,
      }));
      setStates(formattedStates);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      // Fetch cities when state changes
      const stateCities = getCitiesOfState(state);
      const formattedCities = stateCities.map(city => ({
        label: city.name,
        value: city.name,
      }));
      setCities(formattedCities);
    }
  }, [state]);

  const registerDoctor = () => {
    console.log('Doctor Registered:', { name, education, experience, country, state, city });
    // Implement registration logic here
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Education"
        value={education}
        onChangeText={setEducation}
      />
      <TextInput
        placeholder="Experience"
        value={experience}
        onChangeText={setExperience}
      />
      <RNPickerSelect
        placeholder={{ label: 'Select Country', value: null }}
        onValueChange={(value) => setCountry(value)}
        items={countries}
      />
      <RNPickerSelect
        placeholder={{ label: 'Select State', value: null }}
        onValueChange={(value) => setState(value)}
        items={states}
      />
      <RNPickerSelect
        placeholder={{ label: 'Select City', value: null }}
        onValueChange={(value) => setCity(value)}
        items={cities}
      />
      <Button title="Register" onPress={registerDoctor} />
    </View>
  );
};

export default DoctorRegistration;
