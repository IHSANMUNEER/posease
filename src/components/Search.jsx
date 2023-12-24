import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 2,
    borderColor: '#2E7A86', 
    marginVertical: 5,
    backgroundColor:  '#FAF9F6',
    height:  60// Replace 'yourBorderColor' with the desired color
  },
});

export default Search;
