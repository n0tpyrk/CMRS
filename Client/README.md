# CMRS Client
The CMRS Client is a mobile application built with Ionic + Angular + Cordova. Due to the number of dependency files being too large, only the application's source codes have been uploaded to this repository. To re-implement this application, please follow the steps in this readme file. The final version was released and has been thoroughly tested on Android 10. However, the final release won't be uploaded due to the pravicy issue.
# Re-implementation
To re-implement the application, the Ionic environment need to be installed first. Then, create an app template and replace the source codes in the template with the codes in this repository. After that, install all dependencies. At last, build and run the application.
## Install Ionic & Create an App Template
1. Install Inoic CLI according to this [guide](https://ionicframework.com/getting-started#install).
2. Create a new application with tabs using the Ionic CLI.   
   <code>ionic start applicationName tabs --type angular</code>    
   If it asks "Integrate your new app with Capacitor to target native iOS and Android?", choose "N".
3. Download the source codes and replace the <code>src</code> folder of the template application.
## Choose and Install a Platform
4. Change to the app directory and install the Android platform with Cordova.   
   (The Android platform is used here to make an example.)    
   <code>cd applicationName</code>   
   <code>ionic cordova platform add android</code>   
   If it asks "Are you sure you want to continue?", choose "Y".
## 
5. 
