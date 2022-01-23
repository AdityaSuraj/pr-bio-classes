import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './tab/home';
import CarouselsScreen from './carousel';
import StudyScreen from './tab/study';
import TestsScreen from './tab/tests';
import ProfileScreen from './tab/profile';
import { colorPrimary } from '../constants/colors';
import AboutScreen from './static/about';
import ViewAllAttempScreen from './dynamic/viewallattemp';
import InstructionScreen from './tab/Test/instruction';
import QuizScreen from './tab/Test/quiz';
import HelpScreen from './dynamic/help';
import MyContentScreen from './profile/mycontent';
import DoubtsScreen from './profile/mycontent/doubts';
import PDFScreen from './profile/pdf';
import StudentDetailScreen from './static/studentdetail';
import PhoneRegistrationScreen from './static/phoneregistration';
import JitsiScreen from './dynamic/jitsi';
import OtpScreen from './static/otp';
import SubjectPDFScreen from './profile/pdf/subjectpdf';
import ViewPDFScreen from './profile/pdf/viewpdf';

import WatchVideoScreen from './profile/classroom/watch';
import LiveClassesScreen from './dynamic/liveclasses';
import UpcomingClassesScreen from './dynamic/upcomingclasses';
import NotificationScreen from './dynamic/notification';
import HomeworkScreen from './profile/mycontent/homework';
import AssignmentScreen from './profile/mycontent/assignment';
import SubmitAssignment from './profile/mycontent/submitassignment';
import EditProfileScreen from './profile/editprofile';
import ViewAnswerScreen from './tab/Test/viewanswer';
import StudyPlanScreen from './dynamic/studyplan';
import PaymentScreen from './dynamic/payment';


import TeacherLogin from './institute/teacherLogin';
import TeacherHomeScreen from './institute/teacherHome';
import InstituteCoursesScreen from './institute/courses';
import AddCoursesScreen from './institute/addcourse';
import InstituteScheduleScreen from './institute/schedule/schedules';
import AddScheduleScreen from './institute/schedule/addschedule';
import InstituteGalleryScreen from './institute/gallery/gallery';
import AddGalleryScreen from './institute/gallery/addgallery';
import InstituteContentScreen from './institute/content/contents';
import AddContentScreen from './institute/content/addcontent';
import InstituteVideoScreen from './institute/video/videos';
import AddVideoScreen from './institute/video/addvideo';
import InstituteJitsiScreen from './institute/institutejitsi';
import StudentRegistrationScreen from './student/studentregistration';
import StudentLoginScreen from './student/studentlogin';
import StudentCoursesScreen from './student/courses';
import StudentPDFScreen from './student/pdfs';
import StudentClassVideoScreen from './student/classvideo';
import StudentBookmarkedVideoScreen from './student/bookmarkedvideo';
import CourseContentScreen from './student/course/coursecontent';
import InstituteProfileScreen from './institute/InstituteProfileScreen';
import PrivacyPolicy from './static/privacy';
import TandCScreen from './static/tandc';
import ContactUsScreen from './static/contactus';
import CoursePreviewScreen from './student/course/coursepreview';
import InstituteStudentsScreen from './institute/students';
import StudentForgetPasswordScreen from './student/studentforgetpassword';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigationManager = ()=>{
    return (
        <Tab.Navigator initialRouteName="HomeScreen" tabBarOptions={{
                activeBackgroundColor:colorPrimary,
                style:{height:60},
                tabStyle:{padding:6},
                activeTintColor:"white",
            }}>
            <Tab.Screen component={HomeScreen} 
                name="HomeScreen"
                options={{
                    tabBarLabel:"Home",
                    tabBarIcon:({color})=>(
                        <Icon name="home" color={color} size={30}/>
                    )
                }}
                />
            <Tab.Screen component={StudyScreen} 
                name="StudyScreen"
                options={{
                    tabBarLabel:"My Courses",
                    tabBarIcon:({color})=>(
                        <Icon name="book" color={color} size={30}/>
                    )
                }}
                />
         
            <Tab.Screen component={ProfileScreen} 
                name="ProfileScreen"
                options={{
                    tabBarLabel:"Profile",
                    tabBarIcon:({color})=>(
                        <Icon name="person" color={color} size={30}/>
                    )
                }}
                />
        </Tab.Navigator>
    )
}


const TeacherTabNavigationManager = ()=>{
    return (
        <Tab.Navigator initialRouteName="HomeScreen" tabBarOptions={{
                activeBackgroundColor:colorPrimary,
                style:{height:60},
                tabStyle:{padding:6},
                activeTintColor:"white",
            }}>
            <Tab.Screen component={TeacherHomeScreen} 
                name="HomeScreen"
                options={{
                    tabBarLabel:"Home",
                    tabBarIcon:({color})=>(
                        <Icon name="home" color={color} size={30}/>
                    )
                }}
                />
            <Tab.Screen component={InstituteScheduleScreen} 
                name="StudyScreen"
                options={{
                    tabBarLabel:"Classes",
                    tabBarIcon:({color})=>(
                        <Icon name="book" color={color} size={30}/>
                    )
                }}
                />
            {/* <Tab.Screen component={TestsScreen} 
                name="TestScreen"
                options={{
                    tabBarLabel:"Test",
                    tabBarIcon:({color})=>(
                        <Icon name="pending-actions" color={color} size={30}/>
                    )
                }}
                /> */}
            <Tab.Screen component={InstituteProfileScreen} 
                name="ProfileScreen"
                options={{
                    tabBarLabel:"Profile",
                    tabBarIcon:({color})=>(
                        <Icon name="person" color={color} size={30}/>
                    )
                }}
                />
        </Tab.Navigator>
    )
}


function NavigationManager(){

    return (
        <NavigationContainer>
            <Stack.Navigator  initialRouteName={"CarouselScreen"} headerMode="none">
                <Stack.Screen component={StudentLoginScreen} name="StudentLoginScreen"/>
                <Stack.Screen component={StudentRegistrationScreen} name="StudentRegistrationScreen"/>
                <Stack.Screen component={StudentForgetPasswordScreen} name="StudentForgetPasswordScreen"/>
                <Stack.Screen component={StudentCoursesScreen} name="StudentCourseScreen"/>
                <Stack.Screen component={StudentPDFScreen} name="StudentPDFScreen"/>
                <Stack.Screen component={StudentClassVideoScreen} name="StudentClassVideoScreen"/>
                <Stack.Screen component={StudentBookmarkedVideoScreen} name="StudentBookmarkedVideoScreen"/>
                <Stack.Screen component={CourseContentScreen} name="CourseContentScreen"/>
                <Stack.Screen component={CoursePreviewScreen} name="CoursePreviewScreen"/>
                <Stack.Screen component={TabNavigationManager} name="TabNavigation"/>
                <Stack.Screen component={CarouselsScreen} name="CarouselScreen"/>
                <Stack.Screen component={PhoneRegistrationScreen} name="PhoneRegistrationScreen"/>
                <Stack.Screen component={OtpScreen} name="OtpScreen"/>
                <Stack.Screen component={StudentDetailScreen} name="StudentDetailScreen"/>
                <Stack.Screen component={HomeScreen} name="HomeScreen"/>
                <Stack.Screen component={AboutScreen} name="AboutScreen"/>
                <Stack.Screen component={PrivacyPolicy} name="PrivacyPolicyScreen"/>
                <Stack.Screen component={TandCScreen} name="TermsAndConditionsScreen"/>
                <Stack.Screen component={ContactUsScreen} name="ContactUsScreen"/>
                <Stack.Screen component={ViewAllAttempScreen} name="ViewAllAttempScreen"/>
                <Stack.Screen component={InstructionScreen} name="InstructionScreen"/>
                <Stack.Screen component={QuizScreen} name="QuizScreen"/>
                <Stack.Screen component={HelpScreen} name="HelpScreen"/>
                <Stack.Screen component={MyContentScreen} name="MyContentScreen"/>
                <Stack.Screen component={DoubtsScreen} name="DoubtsScreen"/>
                <Stack.Screen component={PDFScreen} name="PDFScreen" />
                <Stack.Screen component={JitsiScreen} name="JitsiScreen"/>
                <Stack.Screen component={SubjectPDFScreen} name="SubjectPDFScreen"/>
                <Stack.Screen component={ViewPDFScreen} name="ViewPDFScreen"/>
                <Stack.Screen component={WatchVideoScreen} name="WatchVideoScreen"/>
                <Stack.Screen component={LiveClassesScreen} name="LiveClassesScreen"/>
                <Stack.Screen component={UpcomingClassesScreen} name="UpcomingClassesScreen"/>
                <Stack.Screen component={NotificationScreen} name="NotificationScreen"/>
                <Stack.Screen component={HomeworkScreen} name="HomeworkScreen"/>
                <Stack.Screen component={AssignmentScreen} name="AssignmentScreen"/>
                <Stack.Screen component={SubmitAssignment} name="SubmitAssignmentScreen"/>
                <Stack.Screen component={EditProfileScreen} name="EditProfileScreen"/>
                <Stack.Screen component={ViewAnswerScreen} name="ViewAnswerScreen"/>
                <Stack.Screen component={StudyPlanScreen} name="StudyPlanScreen"/>
                <Stack.Screen component={PaymentScreen} name="PaymentScreen"/>


                {/* Institute */}
                <Stack.Screen component={TeacherLogin} name="TeacherLoginScreen"/>
                <Stack.Screen component={TeacherTabNavigationManager} name="TeacherTabNavigation"/>
                <Stack.Screen component={InstituteCoursesScreen} name="InstituteCoursesScreen"/>
                <Stack.Screen component={AddCoursesScreen} name="AddCourseScreen"/>
                <Stack.Screen component={InstituteScheduleScreen} name="InstituteScheduleScreen"/>
                <Stack.Screen component={AddScheduleScreen} name="AddScheduleScreen"/>
                <Stack.Screen component={InstituteGalleryScreen} name="InstituteGalleryScreen"/>
                <Stack.Screen component={AddGalleryScreen} name="AddGalleryScreen"/>
                <Stack.Screen component={InstituteContentScreen} name="InstituteContentScreen"/>
                <Stack.Screen component={AddContentScreen} name="AddContentScreen"/>
                <Stack.Screen component={InstituteVideoScreen} name="InstituteVideoScreen"/>
                <Stack.Screen component={AddVideoScreen} name="AddVideoScreen" />
                <Stack.Screen component={InstituteJitsiScreen} name="InstituteJitsiScreen"/>
                <Stack.Screen component={InstituteStudentsScreen} name="InstituteStudentsScreen"/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationManager;