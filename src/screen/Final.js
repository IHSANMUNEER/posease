import React, {useState} from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {FlatList, StyleSheet, View , TextInput} from 'react-native';
import colors from '../components/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const data = [
  {
    BY: 1959,
    CEEY: 1977,
    NBP: 1635,
    UEE: 0,
    'GDP-BY': 550,
    'GDP-CEEY': 1749.4,
    CEEP: 570,
    CEEA: 27,
    CEEAR: '4.74%',
    GER: '1.65%',
  },
  {
    BY: 1960,
    CEEY: 1978,
    NBP: 1402,
    UEE: 0,
    'GDP-BY': 597.2,
    'GDP-CEEY': 1495.4,
    CEEP: 610,
    CEEA: 40.2,
    CEEAR: '6.59%',
    GER: '2.87%',
  },
  {
    BY: 1961,
    CEEY: 1979,
    NBP: 949,
    UEE: 0,
    'GDP-BY': 500.6,
    'GDP-CEEY': 1782.8,
    CEEP: 468,
    CEEA: 28,
    CEEAR: '5.98%',
    GER: '2.95%',
  },
  {
    BY: 1962,
    CEEY: 1980,
    NBP: 2451,
    UEE: 0,
    'GDP-BY': 472.1,
    'GDP-CEEY': 1911.5,
    CEEP: 333,
    CEEA: 28,
    CEEAR: '8.41%',
    GER: '1.14%',
  },
  {
    BY: 1963,
    CEEY: 1981,
    NBP: 2934,
    UEE: 0,
    'GDP-BY': 507.1,
    'GDP-CEEY': 1958.7,
    CEEP: 259,
    CEEA: 28,
    CEEAR: '10.81%',
    GER: '0.95%',
  },
  {
    BY: 1964,
    CEEY: 1982,
    NBP: 2721,
    UEE: 0,
    'GDP-BY': 597.1,
    'GDP-CEEY': 2050.9,
    CEEP: 187,
    CEEA: 32,
    CEEAR: '17.11%',
    GER: '1.18%',
  },
  {
    BY: 1965,
    CEEY: 1983,
    NBP: 2679,
    UEE: 0,
    'GDP-BY': 704.4,
    'GDP-CEEY': 2306.9,
    CEEP: 167,
    CEEA: 39,
    CEEAR: '23.35%',
    GER: '1.46%',
  },
  {
    BY: 1966,
    CEEY: 1984,
    NBP: 2554,
    UEE: 0,
    'GDP-BY': 767.2,
    'GDP-CEEY': 2599.5,
    CEEP: 164,
    CEEA: 48,
    CEEAR: '29.27%',
    GER: '1.88%',
  },
  {
    BY: 1967,
    CEEY: 1985,
    NBP: 2543,
    UEE: 0,
    'GDP-BY': 728.8,
    'GDP-CEEY': 3094.9,
    CEEP: 176,
    CEEA: 62,
    CEEAR: '35.23%',
    GER: '2.44%',
  },
  {
    BY: 1968,
    CEEY: 1986,
    NBP: 2731,
    UEE: 0,
    'GDP-BY': 708.5,
    'GDP-CEEY': 3007.6,
    CEEP: 191,
    CEEA: 57,
    CEEAR: '29.84%',
    GER: '2.09%',
  },
  {
    BY: 1969,
    CEEY: 1987,
    NBP: 2690,
    UEE: 0,
    'GDP-BY': 797.1,
    'GDP-CEEY': 2729.7,
    CEEP: 228,
    CEEA: 62,
    CEEAR: '27.19%',
    GER: '2.30%',
  },
];

const Final = () => {
  const navigation = useNavigation();
  const [isTabularView, setIsTabularView] = useState(false);
  const [filter, setFilter] = useState('');

  

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Card style={styles.card}>
        <Card.Content>
          {Object.entries(item).map(([key, value]) => (
            <View style={styles.row} key={key}>
              <Text variant="bodyMedium" style={styles.cellHeading}>
                {key}
              </Text>
              <Text variant="titleLarge" style={styles.cellValue}>
                {value}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderTabularView = () => (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}`}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { color: colors.primary }]}>Title</Text>
          <Text style={[styles.headerCell, { color: colors.primary, padding: -200 }]}>Year</Text>
        </View>
      )}
    />
  );

  const renderFlatListView = () => (
    <FlatList
      data={filteredData}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text
            variant="bodyMedium"
            style={[styles.cellHeading, { color: colors.primary }]}>
            Year
          </Text>
          <Text
            variant="titleLarge"
            style={[styles.cellValue, { color: colors.primary }]}>
            {item.BY}
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.cellHeading, { color: colors.primary }]}>
            GER
          </Text>
          <Text
            variant="titleLarge"
            style={[styles.cellValue, { color: colors.primary }]}>
            {item.BY}
          </Text>
        </View>
      )}
      keyExtractor={item => item.BY.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter by..."
          value={filter}
          placeholderTextColor={colors.primary}
          onChangeText={(text) => setFilter(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setIsTabularView(true)} style={styles.button}>
          <Text style={styles.buttonText}>Tabular View</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsTabularView(false)} style={styles.button}>
          <Text style={styles.buttonText}>Flat List View</Text>
        </TouchableOpacity>
      </View>

      {isTabularView ? renderTabularView() : renderFlatListView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginRight: 10,
    width: '98%',
    backgroundColor: '#358b99',
    marginTop: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cellHeading: {
    fontWeight: 'bold',
    width: '40%',
  },
  cellValue: {
    width: '40%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerCell: {
    fontWeight: 'bold',
    width: '60%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterInput: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.primary,
    color: colors.primary,
  },
});

export default Final;