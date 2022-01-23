import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView} from 'react-native';
import Header from '../../components/header';

const PrivacyPolicy = ()=>{
    return (
        <View style={{flex:1,backgroundColor:"rbga(0,0,255,0.1)"}}>
            <Header pagename="Privacy Policy"/>
            <ScrollView >
                <Image source={require('../../assets/prlogo.png')} style={{height:120,width:160,resizeMode:"contain"}}/>
                <View style={{paddingHorizontal:16,marginBottom:14}}>
                    <Text style={{fontSize:14,marginTop:12}}>
                    The PR Bio Classes app as a Free app. This SERVICE is provided by at no cost and is intended for use as is.{'\n'}
This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.{'\n'}
If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.{'\n'}
The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at PR Bio Classes unless otherwise defined in this Privacy Policy.{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Information Collection and Use</Text>{'\n'}
For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.{'\n'}
The app does use third party services that may collect information used to identify you.{'\n'}
Link to privacy policy of third party service providers used by the app{'\n'}
•	Google Play Services
•	Google Analytics for Firebase{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Log Data</Text>{'\n'}
I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Cookies</Text>{'\n'}
Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.{'\n'}
This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.{'\n'}
•	To assist us in analysing how our Service is used.{'\n'}
I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Security</Text>{'\n'}
I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
{'\n'}{'\n'}<Text style={{fontWeight:"bold"}}>Links to Other Sites</Text>{'\n'}
This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Children’s Privacy</Text>{'\n'}
These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13 years of age. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Changes to This Privacy Policy</Text>{'\n'}
I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.{'\n'}
This policy is effective as of 2021-09-10{'\n'}
{'\n'}<Text style={{fontWeight:"bold"}}>Contact Us</Text>{'\n'}
If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at mail@prbioclasses.com.
This privacy policy page was created at privacypolicytemplate.net and modified/generated by App Privacy Policy Generator.

</Text>
                    
                    {/* <Text style={{fontSize:18,fontWeight:"bold",marginTop:16}}>Follow us on</Text> */}
                    {/* <View style={{flexDirection:"row",marginVertical:12}}>
                        <Icon name="facebook" size={32} color="gray"style={{paddingHorizontal:8}}/>
                        <Icon name="twitter" size={32} color="gray" style={{paddingHorizontal:8}}/>
                        <Icon name="youtube-play" size={32} color="gray" style={{paddingHorizontal:8}}/>
                    </View> */}

                </View>
            </ScrollView>
        </View>
    )
}

export default PrivacyPolicy;