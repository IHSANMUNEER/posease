// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import { Rating } from 'react-native-ratings';

// const YourComponent = () => {
//   const [value, setValue] = useState(0);
//   const [hover, setHover] = useState(-1);

//   const labels = {
//     1: 'Terrible',
//     2: 'Bad',
//     3: 'OK',
//     4: 'Good',
//     5: 'Great',
//   };

//   return (
//     <View>
//       <Rating
//         type="star"
//         ratingCount={6}
//         startingValue={value}
//         imageSize={30}
//         showRating
//         onFinishRating={(newValue) => setValue(newValue)}
//         onStartRating={(newHover) => setHover(newHover)}
//         ratingBackgroundColor="#2E7A86"
//       />
//       {value !== null && <Text style={{ marginLeft: 10 }}>{labels[hover !== -1 ? hover : value]}</Text>}
//     </View>
//   );
// };

// export default YourComponent;
