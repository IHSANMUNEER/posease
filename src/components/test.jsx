import * as React from 'react';
import { Drawer, Avatar, useTheme } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';

const MyComponent = () => {
  const [active, setActive] = React.useState('');
  const theme = useTheme();

  const drawerWidth = Dimensions.get('window').width * 0.7; // Calculate 70% of screen width

  return (
    <Drawer.Section style={[styles.drawerSection, { width: drawerWidth }]}>
      {/* Cricket Section */}
      <Drawer.Item
        icon={({ color, size }) => <Avatar.Icon icon="cricket" size={size} color={color} />}
        label="Cricket"
        active={active === 'cricket'}
        onPress={() => setActive('cricket')}
      />

      {/* Crypto Section */}
      <Drawer.Item
        icon={({ color, size }) => <Avatar.Icon icon="currency-usd" size={size} color={color} />}
        label="Crypto"
        active={active === 'crypto'}
        onPress={() => setActive('crypto')}
      />
    </Drawer.Section>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  drawerSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent white background
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100, // Ensure the Drawer appears above other content
  },
});
