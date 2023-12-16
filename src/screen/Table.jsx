import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import colors from '../components/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

class Table1 extends Component {

  
  
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ID', 'Description'],
      widthArr: [160, 168],
      data: [],
    };
  }

  componentDidMount() {
    this.generateData();
  }

  generateData = () => {
    const data = [];
    for (let i = 1; i < 11; i += 1) {
      const dataRow = [`ID${i}`, `Description${i}`];
      data.push(dataRow);
    }
    this.setState({ data });
  };
   

  render() {
   
    const { tableHead, widthArr, data } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Records</Text>
        <Table borderStyle={{ borderColor: colors.primary }}>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.head}
            textStyle={styles.headtext}
          />
        </Table>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity >
              <View
                style={[
                  styles.row,
                  index % 2 && { backgroundColor: colors.secondary },
                ]}
              >
                <Row
                  data={item}
                  widthArr={widthArr}
                  textStyle={styles.text} // Change here to use styles.text
                />
              </View>
            </TouchableOpacity>
          )}
        />

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: colors.secondary,
  },
  title: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
  },
  head: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: '200',
    color: colors.text,
  },
  headtext: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary,
  },
  row: {
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Table1;
