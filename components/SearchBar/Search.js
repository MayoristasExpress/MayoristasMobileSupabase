import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const Search = ({ searchQuery, setSearchQuery }) => {

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchbarInput}
      />
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
  },
  searchBar: {
    height: 32,
    marginTop:10
  },
  searchbarInput: {
    paddingBottom: 23,
  },
};

export default Search;
