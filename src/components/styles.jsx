import {Dimensions} from 'react-native';

export const Colors = {
  primaryColor: '#2E7A86',
  lightPrimaryColor: 'rgba(15, 52, 96, 0.05)',
  whiteColor: '#FAF9F6',
  blackColor: '#000000',
  grayColor: '#484848',
  lightGrayColor: 'rgba(105, 105, 105, 0.3)',
  extraLightGrayColor: 'rgba(105, 105, 105, 0.05)',
  redColor: '#FF0000',
  pinkColor: '#E94560',
  blueColor: '#0047FF',
  greenColor: '#009D23',
};

export const Fonts = {
  whiteColor16Regular: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontWeight: '400',
  },

  whiteColor14Medium: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontWeight: '500',
  },

  whiteColor16Medium: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontWeight: '500',
  },

  whiteColor18SemiBold: {
    color: Colors.whiteColor,
    fontSize: 18.0,
    fontWeight:'600',
  },

  whiteColor19SemiBold: {
    color: Colors.whiteColor,
    fontSize: 19.0,
    fontWeight:'600',
  },

  whiteColor20SemiBold: {
    color: Colors.whiteColor,
    fontSize: 20.0,
    fontWeight:'600',
  },

  whiteColor20Bold: {
    color: Colors.whiteColor,
    fontSize: 20.0,
    fontWeight:'700',
  },

  blackColor14Regular: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontWeight: '400',
  },

  blackColor15Regular: {
    color: Colors.blackColor,
    fontSize: 15.0,
    fontWeight: '400',
  },

  blackColor16Regular: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontWeight: '400',
  },

  blackColor15Medium: {
    color: Colors.blackColor,
    fontSize: 15.0,
    fontWeight: '500',
  },

  blackColor16Medium: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontWeight: '500',
  },

  blackColor18Medium: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontWeight: '500',
  },

  blackColor17SemiBold: {
    color: Colors.blackColor,
    fontSize: 17.0,
    fontWeight:'600',
  },

  blackColor18SemiBold: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontWeight:'600',
  },

  blackColor19SemiBold: {
    color: Colors.blackColor,
    fontSize: 19.0,
    fontWeight:'600',
  },

  blackColor20SemiBold: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontWeight:'600',
  },

  blackColor20Bold: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontWeight:'700',
  },

  blackColor22Bold: {
    color: Colors.blackColor,
    fontSize: 22.0,
    fontWeight: '700',
  },

  grayColor13Regular: {
    color: Colors.grayColor,
    fontSize: 13.0,
    fontWeight: '400',
  },

  grayColor14Regular: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontWeight: '400',
  },

  grayColor15Regular: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontWeight: '400',
  },

  grayColor16Regular: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontWeight: '400',
  },

  grayColor14Medium: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontWeight: '500',
  },

  grayColor15Medium: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontWeight: '500',
  },

  grayColor16Medium: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontWeight: '500',
  },

  grayColor18SemiBold: {
    color: Colors.grayColor,
    fontSize: 18.0,
    fontWeight:'600',
  },

  grayColor19SemiBold: {
    color: Colors.grayColor,
    fontSize: 19.0,
    fontWeight:'600',
  },

  primaryColor16Medium: {
    color: Colors.primaryColor,
    fontSize: 16.0,
    fontWeight: '500',
  },

  primaryColor16SemiBold: {
    color: Colors.primaryColor,
    fontSize: 16.0,
    fontWeight:'600',
  },

  primaryColor18SemiBold: {
    color: Colors.primaryColor,
    fontSize: 18.0,
    fontWeight:'600',
  },

  primaryColor20SemiBold: {
    color: Colors.primaryColor,
    fontSize: 20.0,
    fontWeight:'600',
  },

  primaryColor16Bold: {
    color: Colors.primaryColor,
    fontSize: 16.0,
    fontWeight:'700',
  },

  primaryColor20Bold: {
    color: Colors.primaryColor,
    fontSize: 20.0,
    fontWeight:'700',
  },

  blueColor15Regular: {
    color: Colors.blueColor,
    fontSize: 15.0,
    fontWeight: '400',
  },

  redColor16Regular: {
    color: Colors.redColor,
    fontSize: 16.0,
    fontWeight: '400',
  },

  redColor15SemiBold: {
    color: Colors.redColor,
    fontSize: 15.0,
    fontWeight:'600',
  },

  greenColor15SemiBold: {
    color: Colors.greenColor,
    fontSize: 15.0,
    fontWeight:'600',
  },

  pinkColor16Bold: {
    color: Colors.pinkColor,
    fontSize: 16.0,
    fontWeight:'700',
  },

  pinkColor20Bold: {
    color: Colors.pinkColor,
    fontSize: 20.0,
    fontWeight:'700',
  },
};

export const Sizes = {
  fixPadding: 10.0,
};

export const CommonStyles = {
  buttonStyle: {
    elevation: 5.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 1.9,
    shadowColor: Colors.primaryColor,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  dialogStyle: {
    backgroundColor: Colors.whiteColor,
    padding: 0.0,
    width: '90%',
    borderRadius: Sizes.fixPadding,
  },
  headerTextStyle: {
    ...Fonts.blackColor20Bold,
    textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  textFieldWrapper: {
    backgroundColor: Colors.extraLightGrayColor,
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
  },
};

export const screenWidth = Dimensions.get('window').width;