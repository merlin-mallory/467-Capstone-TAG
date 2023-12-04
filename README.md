<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/merlin-mallory/467-capstone-tag">
    <img src="src/img/splash_img.png" alt="Logo" height = "50%" width = "50%">
  </a>

<h3 align="center">Text Adventure Game For Education</h3>

  <p align="center">
    Our project is to build a web app that will enable users to create and play text-based games, for educational purposes. 
    <br />
    <a href="https://github.com/merlin-mallory/467-capstone-tag"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://text-adventure-game-for-ed.web.app/">View Demo</a>
    ·
    <a href="https://github.com/merlin-mallory/467-capstone-tag/issues">Report Bug</a>
    ·
    <a href="https://github.com/merlin-mallory/467-capstone-tag/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Home Page Screenshot

<div align="center">
  <a href="https://github.com/merlin-mallory/467-capstone-tag">
    <a href="https://text-adventure-game-for-ed.web.app/"><img src="src/img/Screenshot 2023-12-05.png" alt="Logo"></a>
  </a>
</div>

<h2>Introduction</h2> 
This project will use a text game format to allow users to create games they can use for educational purposes. Users will be able to log in so that they can create a new game or edit one they previously created. Users will be able to publish their games onto a web server so it can be played by the public. 

<h2>User’s Perspective</h2>
From the user’s perspective, our project will allow users to build their own text adventure game that will gamify learning for students. They will be able to customize the game for the subject and topic they are teaching. From the student’s perspective, they will be able to select a game and use text prompts to navigate through the game.  


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->


### Installing and Running Frontend Dev

1. Navigate your command line to the parent directory where you want to clone this repo.

2. Clone the repo via HTTPS.
   ```sh
   git clone https://github.com/merlin-mallory/467-capstone-tag.git
   ```
2. Navigate your command line into the 467-capstone-tag folder.

4. Create a "firebase.js" file in the /src folder, and paste in the code from the "Firebase.js Credentials & DB Access" Doc on Google Drive. Check out the "firebase_example.js" file in the same folder to verify what it should look like.

5. Install NPM packages
   ```sh
   npm install
   ```

6. Run the web app.
    ```sh
    npm start
    ```

### Installing and Running Backend Dev

(Note that Backend Dev is temporarily unavailable because we searched to Railways for production)

1. Open a new instance of the terminal, and navigate to the /server directory.

2. Create ".env" file in the server directory, and paste in the .env code from "Firebase.js Credentials" Doc on Google Drive.

3. Install NPM packages
   ```sh
   npm install
   ```

4. Start the server.
    ```sh
    npm start
    ```

### Installing and Deploying Frontend Prod

1. Install Firebase CLI.
  ```sh
  brew install firebase-cli
  ```

2. Navigate to the root directory, and login to Firebase using the project's username and password (see Firebase Credentials & DB access doc).
  ```sh
  firebase login
  ```

3. This should prompt your browser to log into the project's gmail account. Finish that, and you should get a success message in the console.

4. Navigate to the root folder, and build the app
  ```
  npm run build
  ```

5. Navigate to the root folder, and deploy the changes to the app.
   Note: You can ignore the "build failed" error message in Github for now, automatic builds are not set up yet. This command will manually deploy your current directory to prod. Please make sure to pull master before doing this.
  ```sh
  firebase deploy --only hosting
  ```

6. Wait a few minutes (and possible refresh your cache), and then visit https://text-adventure-game-for-ed.web.app/ to see if your changes successfully deployed.

### Installing and Running Backend Prod

We are currently using Railways to deploy all of the files under /server. Any change mades to the master branch of this repo will automatically trigger a rebuild and redeploy to the following domain: https://467-capstone-tag-production-bd6a.up.railway.app . Please contact the repo admin if you wish to see the Railway access credentials.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/merlin-mallory/467-capstone-tag/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/merlin-mallory/467-capstone-tag](https://github.com/merlin-mallory/467-capstone-tag)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/merlin-mallory/467-capstone-tag.svg?style=for-the-badge
[contributors-url]: https://github.com/merlin-mallory/467-capstone-tag/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/merlin-mallory/467-capstone-tag.svg?style=for-the-badge
[forks-url]: https://github.com/merlin-mallory/467-capstone-tag/network/members
[stars-shield]: https://img.shields.io/github/stars/merlin-mallory/467-capstone-tag.svg?style=for-the-badge
[stars-url]: https://github.com/merlin-mallory/467-capstone-tag/stargazers
[issues-shield]: https://img.shields.io/github/issues/merlin-mallory/467-capstone-tag.svg?style=for-the-badge
[issues-url]: https://github.com/merlin-mallory/467-capstone-tag/issues
[license-shield]: https://img.shields.io/github/license/merlin-mallory/467-capstone-tag.svg?style=for-the-badge
[license-url]: https://github.com/merlin-mallory/467-capstone-tag/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
