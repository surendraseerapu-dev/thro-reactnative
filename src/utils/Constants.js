export const ACTIVITY = [
  {name: 'All'},
  {name: 'Sports'},
  {name: 'Entertainment'},
  {name: 'Meet Up'},
  {name: 'Outdoor'},
];
/* AIzaSyASl1Ll7ah3mMer0lEUagpIVSfQPrQEdkE */
export const GOOGLE_SIGN_IN_KEY =
  '244527580612-d6ikn4a3tggt8hs6hr7r0lh60u2cgfts.apps.googleusercontent.com';
export const GOOGLE_PLACE_API_KEY = 'AIzaSyB_rrDXoMDUPwFyd683ZsEHuHVbgu7TA4U';

/* LOCAL STORAGE OBJECTS */
export const USER_SESSION_FOR_SIGNUP = '@sessionForSignUp';
export const PROFILE_COMPLETION = '@profileCompletion';
export const SESSION_TOKEN = '@sessionToken';

/* NAVIGATION ROUTES */
export const ROUTE_SPLASH = 'Splash';
export const ROUTE_SIGN_IN = 'SignIn';
export const ROUTE_JOIN_US = 'JoinUs';
export const ROUTE_LOGIN_R0UTE = 'login';
export const ROUTE_BOTTOM_NAVIGATION_HOST = 'BottomNavHost';
export const ROUTE_PERSONAL_DETAILS = 'PersonalDetails';
export const ROUTE_VERIFY_OTP = 'OTPVerify';
export const ROUTE_THRO_DETAILS = 'ThroDetails';
export const ROUTE_FILTER_THRO = 'FilterThro';
export const ROUTE_CREATE_THRO_COMPLETE = 'CreateThroComplete';
export const ROUTE_WHAT_A_THRO = 'WhatAThro';
export const ROUTE_PROFILE_SETUP = 'ProfileSetup';
export const ROUTE_CHOOSE_INTERESTS = 'ChooseInterests';
export const ROUTE_WEBVIEW = 'Webview';
export const ROUTE_GROUP_CHAT = 'GroupChat';

export const ROUTE_DASHBOARD = 'Dashboard';
export const ROUTE_PROFILE = 'Profile';
export const ROUTE_CREATE = 'Create';
export const ROUTE_CHAT = 'Chats';
export const ROUTE_ACTIVITY = 'Activity';

/* BASE URL */
export const UAT_URL =
  'http://ec2-13-60-34-131.eu-north-1.compute.amazonaws.com:4002';
export const API_VERSION = '/v1';
export const BASE_URL = UAT_URL + API_VERSION;

/* End Points */
export const SEND_OTP_FOR_SIGNUP = '/user/mobileSignup';
export const VERIFY_SIGNUP_OTP = '/user/verifyOtp';
export const CHECK_USERNAME = '/user/checkUserName';
export const CHECK_EMAIL = '/user/checkEmail';
export const COMPLETE_PERSONAL_DETAILS = '/user/personalDetails';
export const CHOOSE_INTERESTS = '/user/chooseInterests';
export const SEND_OTP_FOR_LOGIN = '/user/SendOtpForlogin';
export const VERIFY_LOGIN_OTP = '/user/verifyLoginOtp';

export const UPLOAD_PICTURE = '/user/uploadPicture';

export const GET_INTERESTS = '/interests';
export const GET_SUB_INTERESTS = '/interests/getSubInterests';

export const GET_THROS = '/throEvents';
export const CREATE_THRO = '/throEvents'; //
export const THRO_USER_ACTION = '/throEvents/userAction'; //
export const THRO_CREATOR_ACTION = '/throEvents/creatorAction'; //

export const GET_PROFILE = '/user/profile';

export const GOOGLE_SIGN_IN_WEB_CLIENT_ID = "815001829271-dl7ugkitf8uk2t95m0urn2hnkgmpmpj6.apps.googleusercontent.com";
export const GOOGLE_SIGN_IN_IOS_CLIENT_ID = "815001829271-lc26t0mk631klf48876t76241au2isni.apps.googleusercontent.com";
export const GOOGLE_SIGN_IN_ANDROID_CLIENT_ID = "815001829271-1o0o4q180aioskkt1u2m2c9aou706v4b.apps.googleusercontent.com";  
