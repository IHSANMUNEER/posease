const {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} = require('react-native');
import { yellow100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
const {create} = require('react-test-renderer');
const {default: colors} = require('./colors');


function Doctors() {
    const navigation = useNavigation()
    const data = [
        {
          id: '1',
          doctorName: 'Dr. Haris',
          type: 'Orthopedic Specialist',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          rating: 3,
          education: ['MD in Orthopedics', 'Fellowship in Spine Surgery'],
        },
        {
          id: '2',
          doctorName: 'Dr. Ihsan',
          type: 'Ergonomic Consultant',
          image: 'https://randomuser.me/api/portraits/men/2.jpg',
          rating: 2,
          education: ['Ph.D. in Ergonomics', 'Certification in Posture Therapy'],
        },
        {
          id: '3',
          doctorName: 'Dr. Sarah',
          type: 'Physical Therapist',
          image: 'https://randomuser.me/api/portraits/women/3.jpg',
          rating: 1,
          education: ['MPT in Physical Therapy', 'Certification in Sports Rehabilitation'],
        },
        {
          id: '4',
          doctorName: 'Dr. John',
          type: 'Orthopedic Specialist',
          image: 'https://randomuser.me/api/portraits/men/4.jpg',
          rating: 3,
          education: ['MD in Orthopedics', 'Fellowship in Joint Replacement'],
        },
        {
          id: '5',
          doctorName: 'Dr. Emma',
          type: 'Ergonomic Consultant',
          image: 'https://randomuser.me/api/portraits/women/5.jpg',
          rating: 4,
          education: ['Ph.D. in Ergonomics', 'Certification in Workplace Wellness'],
        },
        {
          id: '6',
          doctorName: 'Dr. Alex',
          type: 'Physical Therapist',
          image: 'https://randomuser.me/api/portraits/men/6.jpg',
          rating: 5,
          education: ['MPT in Physical Therapy', 'Certification in Geriatric Rehabilitation'],
        },
        {
          id: '7',
          doctorName: 'Dr. Olivia',
          type: 'Cardiologist',
          image: 'https://randomuser.me/api/portraits/women/7.jpg',
          rating: 4,
          education: ['MD in Cardiology', 'Fellowship in Heart Health'],
        },
        {
          id: '8',
          doctorName: 'Dr. William',
          type: 'Dermatologist',
          image: 'https://randomuser.me/api/portraits/men/8.jpg',
          rating: 2,
          education: ['MD in Dermatology', 'Certification in Aesthetic Medicine'],
        },
        {
          id: '9',
          doctorName: 'Dr. Sophia',
          type: 'Psychiatrist',
          image: 'https://randomuser.me/api/portraits/women/9.jpg',
          rating: 5,
          education: ['MD in Psychiatry', 'Fellowship in Behavioral Health'],
        },
        {
          id: '10',
          doctorName: 'Dr. James',
          type: 'Neurologist',
          image: 'https://randomuser.me/api/portraits/men/10.jpg',
          rating: 3,
          education: ['MD in Neurology', 'Fellowship in Brain Disorders'],
        },
        {
          id: '11',
          doctorName: 'Dr. Ava',
          type: 'Gastroenterologist',
          image: 'https://randomuser.me/api/portraits/women/11.jpg',
          rating: 4,
          education: ['MD in Gastroenterology', 'Fellowship in Digestive Health'],
        },
        {
          id: '12',
          doctorName: 'Dr. Ethan',
          type: 'Urologist',
          image: 'https://randomuser.me/api/portraits/men/12.jpg',
          rating: 1,
          education: ['MD in Urology', 'Fellowship in Kidney Disorders'],
        },
        {
          id: '13',
          doctorName: 'Dr. Mia',
          type: 'Ophthalmologist',
          image: 'https://randomuser.me/api/portraits/women/13.jpg',
          rating: 5,
          education: ['MD in Ophthalmology', 'Fellowship in Eye Care'],
        },
        {
          id: '14',
          doctorName: 'Dr. Noah',
          type: 'Rheumatologist',
          image: 'https://randomuser.me/api/portraits/men/14.jpg',
          rating: 3,
          education: ['MD in Rheumatology', 'Fellowship in Joint Disorders'],
        },
        {
          id: '15',
          doctorName: 'Dr. Amelia',
          type: 'Pediatrician',
          image: 'https://randomuser.me/api/portraits/women/15.jpg',
          rating: 4,
          education: ['MD in Pediatrics', 'Fellowship in Child Health'],
        },
        {
          id: '16',
          doctorName: 'Dr. Oliver',
          type: 'Allergist',
          image: 'https://randomuser.me/api/portraits/men/16.jpg',
          rating: 2,
          education: ['MD in Allergy Medicine', 'Certification in Immunotherapy'],
        },
        {
          id: '17',
          doctorName: 'Dr. Lily',
          type: 'Endocrinologist',
          image: 'https://randomuser.me/api/portraits/women/17.jpg',
          rating: 5,
          education: ['MD in Endocrinology', 'Fellowship in Hormone Health'],
        },
        {
          id: '18',
          doctorName: 'Dr. Henry',
          type: 'Pulmonologist',
          image: 'https://randomuser.me/api/portraits/men/18.jpg',
          rating: 3,
          education: ['MD in Pulmonology', 'Fellowship in Respiratory Medicine'],
        },
        {
          id: '19',
          doctorName: 'Dr. Grace',
          type: 'Hematologist',
          image: 'https://randomuser.me/api/portraits/women/19.jpg',
          rating: 1,
          education: ['MD in Hematology', 'Fellowship in Blood Disorders'],
        },
        {
          id: '20',
          doctorName: 'Dr. Samuel',
          type: 'Geriatrician',
          image: 'https://randomuser.me/api/portraits/men/20.jpg',
          rating: 4,
          education: ['MD in Geriatrics', 'Certification in Elderly Care'],
        },
      ];
      

  return (
    <View style={styles.professionalsList}>
      <View style={styles.header}>
        <Text style={styles.headerTextLeft}>Health Professionals</Text>
        {/* <Text style={styles.headerTextRight} onPress={()=>{navigation.navigate('MentalHealthProfessionalsScreen')}}>See All</Text> */}
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.professionalsItemContainer, {height: 180}]}
            onPress={() => navigation.navigate('DoctorDetail', {item})}>
            <View style={styles.professionalsImageContainer}>
              <Image
                source={{uri: item.image}}
                style={styles.professionalsItemImage}
                containerStyle={styles.professionalsImageBorder}
                
              />
            </View>
            <Text style={styles.professionalsItemName}>{item.doctorName}</Text>
            <Text style={styles.professionalsItemSpecialization}>{item.type}</Text>
            <View style={styles.ratingContainer}>
              {Array.from({length: Math.floor(item.rating)}, (v, i) => (
                <Icon key={i} name="star" size={10} color={colors.star} />
              ))}
              {item.rating % 1 !== 0 && (
                <Icon name="star-half" size={20} color={colors.star}  backgroundColor={colors.star}/>
              )}
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerTextLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 20,
  },
  headerTextRight: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: colors.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  professionalsItemContainer: {
    color: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#358b99',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  professionalsImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    color: colors.primary,
    borderWidth: 2,
    marginHorizontal: 15,
    borderColor: colors.secondary
  },
  professionalsItemImage: {
    width: 80,
    height: 80,
  },
  professionalsImageBorder: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  professionalsItemName: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  professionalsItemSpecialization: {
    color: colors.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,

  },
  ratingText: {
    color: colors.star,
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Doctors;
